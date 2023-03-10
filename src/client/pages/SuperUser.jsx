import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import * as mediasoupClient from 'mediasoup-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StatsList from './components/super_user/StatsList.jsx';
import VideosTab from './components/super_user/VideosTab.jsx';
import ScheduleStreams from './components/super_user/ScheduleStreams.jsx';
import AddTourDates from './components/super_user/AddTourDates.jsx';
import NavigationDrawer from './components/super_user/NavigationDrawer.jsx';
import LiveStream from './components/super_user/LiveStream.jsx';
import AddVideoForm from './components/super_user/AddVideoForm.jsx';

const SERVER = 'http://localhost:3001';

export default function SuperUser({ messages, setMessages }) {
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

    socket.emit('stream-start');
  };

  const createSendTransport = async () => {
    await socket.emit('createWebRtcTransport', { id: false }, ({ params }) => {
      if (params.error) {
        console.error('error creating webRTC transport: ', params.error);
        return;
      }
      console.log('params: ', params);

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
    startStream();
  };

  // ESTABLISHES SOCKET CONNECTION
  useEffect(() => {
    const newSocket = io(SERVER);

    newSocket.on('connection-success', ({ socketId, allMessages }) => {
      // console.log(socketId);
      setMessages(allMessages);
      newSocket.emit('new-user', { id: socketId, name: 'test' });
    });
    setSocket(newSocket);

    // cleans up connection on page change
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // CHAT FEATURE SOCKET LISTENERS
  socket?.on('user-connected', (name) => {
    setMessages(() => [...messages, `new user: ${name}`]);
  });

  socket?.on('chat-message', (message) => {
    setMessages(() => [...messages, message]);
  });

  return (
    <div className="h-screen flex">
      <div className="w-1/4 max-w-xs">
        <NavigationDrawer />
      </div>
      <div className="w-3/4 items-center">
        <Routes>
          <Route
            exact
            path="/"
            element={(
              <LiveStream
                handleStream={handleStream}
                messages={messages}
                setMessages={setMessages}
                socket={socket}
              />
            )}
          />
          <Route exact path="/stats" element={<StatsList />} />
          <Route exact path="/add-tour-dates" element={<AddTourDates />} />
          <Route exact path="/add-video-form" element={<AddVideoForm />} />
          <Route exact path="/schedule-streams" element={<ScheduleStreams />} />
          <Route exact path="/videos" element={<VideosTab />} />
        </Routes>
      </div>
    </div>
  );
}
