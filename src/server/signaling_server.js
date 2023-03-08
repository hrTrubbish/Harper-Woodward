const express = require('express');
const http = require('http');
const mediasoup = require('mediasoup');
const socketIO = require('socket.io');

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
let consumerTransport;
let producerTransport;
let producer;
let consumer;

// MEDIASOUP IMPLEMENTATION
const mediaCodecs = [
  {
    kind: 'audio',
    mimeType: 'audio/opus',
    clockRate: 48000,
    channels: 2,
  },
  {
    kind: 'video',
    mimeType: 'video/H264',
    clockRate: 90000,
    parameters:
    {
      'packetization-mode': 1,
      'profile-level-id': '42e01f',
      'level-asymmetry-allowed': 1,
    },
  },
];

const createWorker = async () => {
  worker = await mediasoup.createWorker();

  worker.on('died', (err) => {
    console.error('mediasoup worker has died: ', err);
    setTimeout(() => process.exit(1), 2000); // exits in 2 seconds
  });

  return worker;
};

const createWebRtcTransport = async (callback) => {
  try {
    const webRtcTransport_options = {
      listenIps: [
        {
          ip: '127.0.0.1', // replace with relevant IP address
          announcedIp: '127.0.0.1',
        },
      ],
      enableUdp: true,
      enableTcp: true,
      preferUdp: true,
    };

    const transport = await router.createWebRtcTransport(webRtcTransport_options);

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

    return transport;
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
    console.log(rtpCapabilities);

    // send rtpCapabilities back to client
    callback({ rtpCapabilities });
  });

  socket.on('createWebRtcTransport', async ({ sender }, callback) => {
    if (sender) {
      producerTransport = await createWebRtcTransport(callback);
    } else {
      consumerTransport = await createWebRtcTransport(callback);
    }
  });

  // HOST SPECIFIC STREAM SOCKET EVENTS
  socket.on('transport-connect', async ({ dtlsParameters }) => {
    console.log('DTLS PARAMS: ', { dtlsParameters });
    await producerTransport.connect({ dtlsParameters });
  });

  socket.on('transport-produce', async ({ kind, rtpParameters, appData }, callback) => {
    // call produce based on the prameters from the client
    producer = await producerTransport.produce({
      kind,
      rtpParameters,
    });

    console.log('Producer ID: ', producer.id, producer.kind);

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
  socket.on('transport-recv-connect', async ({ dtlsParameters }) => {
    console.log('DTLS PARAMS: ', { dtlsParameters });
    await consumerTransport.connect({ dtlsParameters });
  });

  socket.on('consume', async ({ rtpCapabilities }, callback) => {
    try {
      if (router.canConsume({
        producerId: producer.id,
        rtpCapabilities,
      })) {
        consumer = await consumerTransport.consume({
          producerId: producer.id,
          rtpCapabilities,
          paused: true,
        });

        consumer.on('transportclose', () => {
          console.log('consumer transport closed');
        });

        consumer.on('producerclose', () => {
          console.log('producer of consumer closed');
        });

        const params = {
          id: consumer.id,
          producerId: producer.id,
          kind: consumer.kind,
          rtpParameters: consumer.rtpParameters,
        };

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

  socket.on('consumer-resume', async () => {
    console.log('resume consumer stream');
    await consumer.resume();
  });
});

// START SERVER
server.listen(3001, () => {
  console.log('signaling listening on port 3001');
});

module.exports = server;
