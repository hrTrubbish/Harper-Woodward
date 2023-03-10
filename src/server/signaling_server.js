const express = require('express');
const http = require('http');
const mediasoup = require('mediasoup');
const socketIO = require('socket.io');
const config = require('../../mediasoup.config');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});

// COUNTS NUMBER OF CONNECTIONS
let peers = 0;

// CHAT FUNCTION VARIABLES
let users = {};
let messages = [];

const checkPeers = () => {
  if (!peers) {
    messages = [];
    users = {};
  }
};

// SUPPORTING MEDIASOUP VARIABLES
let streaming = false;
let worker;
let router;
let producerTransport;
let producer;
let consumerTransports = [];
let consumers = [];

// MEDIASOUP IMPLEMENTATION
const { mediaCodecs } = config.router;

const createWorker = async () => {
  worker = await mediasoup.createWorker(config.worker);

  worker.on('died', (err) => {
    console.error('mediasoup worker has died: ', err);
    setTimeout(() => process.exit(1), 2000); // exits in 2 seconds
  });

  return worker;
};

const createWebRtcTransport = async (callback, id) => {
  try {
    const transport = await router.createWebRtcTransport(config.webRtcOptions);

    transport.on('dtlsstatechange', (dtlsState) => {
      if (dtlsState === 'closed') {
        transport.close();
      }
    });

    transport.on('close', () => {
      console.log('transport closed');
    });

    // send params to client
    callback({
      params: {
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      },
    });

    // if id, make a new consumer, else, make the host transport
    if (id) {
      const newConsumerTransport = {
        id,
        transport,
      };
      consumerTransports.push(newConsumerTransport);
      return;
    }

    producerTransport = transport;
  } catch (error) {
    console.error(error);
    callback({
      params: {
        error,
      },
    });
  }
};

// creates a worker and a router
(async () => {
  worker = await createWorker();
  router = await worker.createRouter({ mediaCodecs });
})();

// FINDS CORRECT CONSUMER OR CONSUMER TRANSPORT FOR VARIOUS USES
const findTransport = (id) => consumerTransports.filter((transport) => transport.id === id);
const findConsumer = (id) => consumers.filter((consumer) => consumer.id === id);
const removeConsumer = (id) => {
  const targetIndex = consumers.findIndex((consumer) => consumer.id === id);
  const target = consumers.splice(targetIndex, 1);
  return target[0].consumer;
};
const removeTransport = (id) => {
  const targetIndex = consumerTransports.findIndex((transport) => transport.id === id);
  const target = consumerTransports.splice(targetIndex, 1);
  return target[0].transport;
};

// SOCKET IO FUNCTIONS
io.on('connection', async (socket) => {
  console.log('A user connected');

  // add one to connection count
  peers += 1;

  socket.emit('connection-success', {
    socketId: socket.id,
    allMessages: messages,
  });

  socket.on('stream-start', () => {
    console.log('starting stream');
    streaming = true;
    io.emit('stream-started');
  });

  // adds new user to user storage
  socket.on('new-user', ({ id, name }) => {
    users[id] = name;
    socket.emit('user-connected', name);
  });

  socket.on('new-message', ({ id, message }) => {
    const newMessage = `${users[id]}: ${message}`;
    messages.push(newMessage);
    io.emit('chat-message', newMessage);
  });

  socket.on('check-stream-status', (callback) => {
    console.log('checking stream');
    callback(streaming);
  });

  socket.on('disconnect', (id) => {
    checkPeers();

    delete users[id];
    console.log('A user has disconnected');
  });

  socket.on('getRtpCapabilities', (callback) => {
    const { rtpCapabilities } = router;

    // send rtpCapabilities back to client
    callback({ rtpCapabilities });
  });

  socket.on('createWebRtcTransport', async ({ id }, callback) => {
    await createWebRtcTransport(callback, id);
  });

  // HOST SPECIFIC STREAM SOCKET EVENTS
  socket.on('transport-connect', async ({ dtlsParameters }) => {
    await producerTransport.connect({ dtlsParameters });
  });

  socket.on('transport-produce', async ({ kind, rtpParameters, appData }, callback) => {
    // call produce based on the prameters from the client
    producer = await producerTransport.produce({
      kind,
      rtpParameters,
    });

    producer.on('transportclose', () => {
      console.log('transport for this producer closed ');
      producer.close();
    });

    // Send Producer Id to client
    callback({
      id: producer.id,
    });
  });

  socket.on('stop-live-stream', () => {
    console.log('stopping stream');
    streaming = false;

    // Stop the producer and close the producer transport
    producer?.close();
    producerTransport?.close();
    producer = null;
    producerTransport = null;
    // Stop all consumers and close their transports
    consumers.forEach((consumerObj) => {
      consumerObj.consumer?.close();
      const [transportObj] = findTransport(consumerObj.id);
      transportObj?.transport?.close();
    });

    consumers = [];
    consumerTransports = [];

    io.emit('stream-stopped');
  });

  // AUDIENCE SPECIFIC STREAM SOCKET EVENTS
  socket.on('transport-recv-connect', async ({ dtlsParameters, id }) => {
    const [target] = findTransport(id);
    await target.transport.connect({ dtlsParameters });
  });

  socket.on('consume', async ({ rtpCapabilities, id }, callback) => {
    try {
      if (router.canConsume({
        producerId: producer.id,
        rtpCapabilities,
      })) {
        const [target] = findTransport(id);
        const newConsumer = await target.transport.consume({
          producerId: producer.id,
          rtpCapabilities,
          paused: true,
        });

        newConsumer.on('transportclose', () => {
          console.log('consumer transport closed');
        });

        newConsumer.on('producerclose', () => {
          console.log('producer of consumer closed');
        });

        const params = {
          id: newConsumer.id,
          producerId: producer.id,
          kind: newConsumer.kind,
          rtpParameters: newConsumer.rtpParameters,
        };

        consumers.push({ id, consumer: newConsumer });

        // send new consumer stream to client
        callback({ params });
      }
    } catch (error) {
      console.error(`error starting recieve stream consume: ${error}`);
      callback({
        params: {
          error,
        },
      });
    }
  });

  socket.on('consumer-resume', async ({ id }) => {
    const [target] = findConsumer(id);
    await target.consumer.resume();
  });

  socket.on('stop-watching', async ({ id }) => {
    const consumer = removeConsumer(id);
    const transport = removeTransport(id);
    await consumer.close();
    await transport.close();
  });
});

// START SERVER
server.listen(3001, () => {
  console.log('signaling listening on port 3001');
});

module.exports = server;
