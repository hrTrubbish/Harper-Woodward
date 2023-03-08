import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import * as mediasoupClient from 'mediasoup-client';
import AddMessage from './components/live/AddMessage.jsx';
import ViewerMessageList from './components/live/ViewerMessageList.jsx';

export default function LivePage() {
  // STATE DATA
  const [socket, setSocket] = useState(null);
  const [watching, setWatching] = useState(false);

  // SUPPORTING MEDIASOUP VARIABLES
  let rtpCapabilities;
  let device;
  let consumerTransport;
  let consumer;

  // STREAM FUNCTIONS
  const connectRecvTransport = async () => {
    await socket.emit('consume', {
      rtpCapabilities: device.rtpCapabilities,
    }, async ({ params }) => {
      if (params.error) {
        console.error(`error connecting recieve transport: ${params.error}`);
        return;
      }

      console.log(`consume params: ${params}`);

      consumer = await consumerTransport.consume({
        id: params.id,
        producerId: params.producerId,
        kind: params.kind,
        rtpParameters: params.rtpParameters,
      });

      // get tracks from the producer
      const { track } = consumer;

      const stream = document.getElementById('watch-stream');
      stream.srcObject = new MediaStream([track]);

      // starts live stream for consumer
      socket.emit('consumer-resume');
    });
  };

  const createRecvTransport = async () => {
    await socket.emit('createWebRtcTransport', { sender: false }, ({ params }) => {
      if (params.error) {
        console.error(`error creating recieve transport: ${params.error}`);
        return;
      }

      console.log('recieve transport params: ', params);

      consumerTransport = device.createRecvTransport(params);

      consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
        try {
          await socket.emit('transport-recv-connect', {
            dtlsParameters,
          });

          callback();
        } catch (error) {
          errback(error);
        }
      });

      console.log('consumer transport: ', consumerTransport);
      connectRecvTransport();
    });
  };

  const createDevice = async () => {
    try {
      device = new mediasoupClient.Device();
      await device.load({
        routerRtpCapabilities: rtpCapabilities,
      });
      console.log('RTP Capabilities', device.rtpCapabilities);

      createRecvTransport();
    } catch (error) {
      console.log('error creating device: ', error);
      if (error.name === 'UnsupportedError') { console.warn('browser not supported'); }
    }
  };

  const getRtpCapabilites = () => {
    socket.emit('getRtpCapabilities', (data) => {
      console.log(`Router RTP Capabilities ${data.rtpCapabilities}`);

      rtpCapabilities = data.rtpCapabilities;
      createDevice();
    });
  };

  const startStream = () => {
    getRtpCapabilites();
  };

  // HELPER FUNCTIONS
  const watchStream = () => {
    if (!watching) {
      startStream();
      setWatching(true);
    }
  };

  // ESTABLISH SOCKET CONNECTION
  useEffect(() => {
    const newSocket = io('http://localhost:3001');

    newSocket.on('connection-success', ({ socketId }) => {
      console.log(`audience: ${socketId}`);
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="flex max-w-7xl m-auto">
        <div className="flex flex-col w-8/12 h-3/6 ml-8 mr-8 border-solid border-2 border-transparent mt-2">
          <video id="watch-stream" className="border-solid border-2 border-current mt-2" autoPlay />
          <button type="button" onClick={watchStream}>Watch Stream</button>
          <div className="text-3xl">
            *Live* Brooks Garth free show to raise awareness
            about dangling commas
          </div>
          <div>
            <p>{`Views: ${500000}`}</p>
          </div>
        </div>
        <div className="flex flex-col justify-start border-solid border-2 border-current mt-4 mb-2 w-3/12 p-6">
          <ViewerMessageList />
          <div className="p-6">
            <AddMessage />
          </div>
        </div>
      </div>
    </div>
  );
}
