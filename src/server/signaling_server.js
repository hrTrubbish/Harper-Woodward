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

// SUPPORTING MEDIASOUP VARIABLES
let worker;
let router;
let producerTransport;
let producer;
// let newConsumer;
const consumerTransports = [];
const consumers = [];

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

// SOCKET IO FUNCTIONS
io.on('connection', async (socket) => {
  console.log('A user connected');

  socket.emit('connection-success', {
    socketId: socket.id,
  });

  socket.on('disconnect', () => {
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
});

// START SERVER
server.listen(3001, () => {
  console.log('signaling listening on port 3001');
});

module.exports = server;
