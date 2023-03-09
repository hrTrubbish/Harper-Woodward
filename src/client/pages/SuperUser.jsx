import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import * as mediasoupClient from 'mediasoup-client';
import StatsList from './components/super_user/StatsList.jsx';
import VideosTab from './components/super_user/VideosTab.jsx';
import ScheduleStreams from './components/super_user/ScheduleStreams.jsx';
import AddTourDates from './components/super_user/AddTourDates.jsx';
import AddVideoForm from './components/super_user/AddVideoForm';

export default function SuperUser() {
  // STATE DATA
  const [socket, setSocket] = useState(null);
  const [streaming, setStreaming] = useState(false);

  // SUPPORTING MEDIASOUP VARIABLES
  let rtpCapabilities;
  let device;
  let producerTransport;
  let producer;
  let streamParams = {
    // mediasoup params
    encodings: [
      {
        rid: 'r0',
        maxBitrate: 100000,
        scalabilityMode: 'S1T3',
      },
      {
        rid: 'r1',
        maxBitrate: 300000,
        scalabilityMode: 'S1T3',
      },
      {
        rid: 'r2',
        maxBitrate: 900000,
        scalabilityMode: 'S1T3',
      },
    ],
    codecOptions: {
      videoGoogleStartBitrate: 1000,
    },
  };

  // STREAM FUNCTIONS
  const connectSendTransport = async () => {
    producer = await producerTransport.produce(streamParams);

    producer.on('trackended', () => {
      console.log('track ended');
    });

    producer.on('transportclose', () => {
      console.log('transport ended');
    });
  };

  const createSendTransport = async () => {
    await socket.emit('createWebRtcTransport', { id: null }, ({ params }) => {
      if (params.error) {
        console.error('error creating webRTC transport: ', params.error);
        return;
      }

      producerTransport = device.createSendTransport(params);

      producerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
        try {
          // Send DTLS parameters to server side transport
          await socket.emit('transport-connect', {
            dtlsParameters,
          });

          // Tell the transport that parameters were transmitted.
          callback();
        } catch (error) {
          errback(error);
        }
      });

      producerTransport.on('produce', async (parameters, callback, errback) => {
        try {
          // tell the server to create a Producer
          await socket.emit('transport-produce', {
            kind: parameters.kind,
            rtpParameters: parameters.rtpParameters,
            appData: parameters.appData,
          }, ({ id }) => {
            // Tell the transport that parameters were transmitted
            callback({ id });
          });
        } catch (error) {
          errback(error);
        }
      });

      connectSendTransport();
    });
  };

  const createDevice = async () => {
    try {
      device = new mediasoupClient.Device();
      await device.load({
        routerRtpCapabilities: rtpCapabilities,
      });

      createSendTransport();
    } catch (error) {
      console.error('error creating device: ', error);
      if (error.name === 'UnsupportedError') { console.warn('browser not supported'); }
    }
  };

  const getRtpCapabilities = () => {
    socket.emit('getRtpCapabilities', (data) => {
      rtpCapabilities = data.rtpCapabilities;
      createDevice();
    });
  };

  const streamSuccess = (stream) => {
    const videoPlayer = document.getElementById('live-stream');
    videoPlayer.srcObject = stream;
    const track = stream.getVideoTracks()[0];
    streamParams = {
      track,
      ...streamParams,
    };
    getRtpCapabilities();
  };

  const startStream = async () => {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: {
          min: 640,
          max: 1920,
        },
        height: {
          min: 400,
          max: 1080,
        },
      },
    })
      .then(streamSuccess)
      .catch((err) => console.error('error starting host stream: ', err));
  };

  // HELPER FUNCTIONS
  const handleStream = () => {
    if (!streaming) {
      startStream();
      setStreaming(true);
    }
  };

  // ESTABLISHES SOCKET CONNECTION
  useEffect(() => {
    const newSocket = io('http://localhost:3001');

    newSocket.on('connection-success', ({ socketId }) => {
      console.log(`host: ${socketId}`);
    });
    setSocket(newSocket);

    // cleans up connection on page change
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className="flex ">
      <div className="flex flex-col w-1/2 h-3/6 ml-8 mr-8 mt-8 border-solid border-2 border-black">
        <video id="live-stream" className="border-4 border-black" autoPlay />
        <button
          id="stream-btn"
          type="button"
          className="bg-garthbeige hover:bg-white text-garthbrown font-bold py-2 px-4 rounded m-8 self-center"
          onClick={handleStream}
        >
          Start Livestream
        </button>
      </div>
      <StatsList />
      <div>
        <AddTourDates />
      </div>
      <div className="flex h-4/6 justify-between gap-3 p-12">
        <VideosTab />
        <AddVideoForm />
      </div>
    </div>
  );
}
