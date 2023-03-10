import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import * as mediasoupClient from 'mediasoup-client';
import Chat from './components/chat/Chat.jsx';
import { AuthContext } from './components/_AuthProvider.jsx';

const SERVER = 'http://localhost:3001';

export default function LivePage({ messages, setMessages }) {
  // IMPORTANT VARIABLES
  const [socket, setSocket] = useState(null);
  const [streamLive, setStream] = useState(false);
  const [watching, setWatching] = useState(false);
  const { userName } = useContext(AuthContext);
  const [viewerCount, setViewers] = useState(0);

  // SUPPORTING MEDIASOUP VARIABLES
  let rtpCapabilities;
  let device;
  let consumerTransport;
  let consumer;

  // STREAM FUNCTIONS
  const connectRecvTransport = async () => {
    await socket.emit('consume', {
      rtpCapabilities: device.rtpCapabilities,
      id: socket.id,
    }, async ({ params }) => {
      if (params.error) {
        console.error(`error connecting recieve transport: ${params.error}`);
        return;
      }

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
      socket.emit('consumer-resume', { id: socket.id });

      document.getElementById('stream-btn').innerHTML = 'Stop Stream';
      setWatching(true);
    });
  };

  const createRecvTransport = async () => {
    await socket.emit('createWebRtcTransport', { id: socket.id }, ({ params }) => {
      if (params.error) {
        console.error(`error creating recieve transport: ${params.error}`);
        return;
      }

      consumerTransport = device.createRecvTransport(params);

      consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
        try {
          await socket.emit('transport-recv-connect', {
            dtlsParameters,
            id: socket.id,
          });

          callback();
        } catch (error) {
          errback(error);
        }
      });

      connectRecvTransport();
    });
  };

  const createDevice = async () => {
    try {
      device = new mediasoupClient.Device();
      await device.load({
        routerRtpCapabilities: rtpCapabilities,
      });

      createRecvTransport();
    } catch (error) {
      console.error('error creating device: ', error);
      if (error.name === 'UnsupportedError') console.warn('browser not supported');
    }
  };

  const getRtpCapabilites = () => {
    socket.emit('getRtpCapabilities', (data) => {
      rtpCapabilities = data.rtpCapabilities;
      createDevice();
    });
  };

  // HELPER FUNCTIONS
  const stopWatching = () => {
    const stream = document.getElementById('watch-stream');
    stream.srcObject = null;
    document.getElementById('stream-btn').innerHTML = 'Watch Live Stream';
    setWatching(false);

    socket.emit('stop-watching', { id: socket.id });
  };

  const closeStream = () => {
    const stream = document.getElementById('watch-stream');
    stream.srcObject = null;
    document.getElementById('stream-btn').innerHTML = 'Watch Live Stream';
    setWatching(false);
  };

  const handleStream = () => {
    if (!watching) {
      getRtpCapabilites();
    } else {
      stopWatching();
    }
  };

  // ESTABLISH SOCKET CONNECTION
  useEffect(() => {
    const newSocket = io(SERVER);

    newSocket.on('connection-success', ({ socketId, allMessages }) => {
      setMessages(allMessages);
      newSocket.emit('new-user', { id: socketId, name: 'user' });

      newSocket.emit('check-stream-status', (streamStatus, viewers) => {
        if (streamStatus && !watching) {
          setStream(true);
          setViewers(viewers);
        }
      });
    });

    newSocket.on('stream-started', (viewers) => {
      setStream(true);
      setViewers(viewers);
    });

    newSocket.on('stream-stopped', () => {
      closeStream();
      setStream(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      rtpCapabilities = undefined;
      device = undefined;
      consumerTransport = undefined;
      consumer = undefined;
    };
  }, []);

  // CHAT FEATURE SOCKET LISTENERS
  socket?.on('user-connected', (name) => {
    setMessages(() => [...messages, `new user: ${name}`]);
  });

  socket?.on('chat-message', (message) => {
    setMessages(() => [...messages, message]);
  });

  socket?.on('update-views', (viewers) => {
    setViewers(viewers);
  });

  return (
    <div id="live-background" className="flex-col md:flex md:flex-row h-screen w-screen">
      <div className="flex flex-col w-8/12 h-3/6 ml-8 mr-8 border-solid border-2 border-transparent mt-2">
        <div id="live-stream-container">
          {streamLive
            ? (
              <>
                <video id="watch-stream" className="hide-stream border-solid border-2 border-current mt-2 w-11/12" autoPlay />
                <button
                  id="stream-btn"
                  type="button"
                  onClick={handleStream}
                  className="hover:bg-garthbeige hover:text-garthbrown"
                >
                  Watch Live Stream

                </button>
              </>
            )
            : (
              <div id="stream-placeholder" className="flex flex-col border-solid border-2 border-current">
                <h1 id="placeholder-heading" className="self-center text-3xl">Check Back Later</h1>
              </div>
            )}
        </div>
        <h4 className="text-sm md:text-3xl">
          *Live* Brooks Garth free show to raise awareness about dangling commas
        </h4>
        <span>{`Viewers: ${viewerCount}`}</span>
      </div>
      <div className="flex flex-col justify-between border-solid border-2 border-current md:h-[78vh] md:mt-4 md:mb-2 md:w-3/12 md:p-6">
        <Chat
          socket={socket}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
}
