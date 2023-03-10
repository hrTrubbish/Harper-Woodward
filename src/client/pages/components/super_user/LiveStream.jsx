import React from 'react';
import Chat from '../chat/Chat.jsx';

function LiveStream({
  handleStream, messages, setMessages, socket,
}) {
  return (
    <div className="flex flex-col gap-2 md:flex md:flex-row">
      <div className="flex flex-col justify-center w-11/12 md:w-3/4">
        <video id="live-stream" className="border-solid border-2 border-current rounded-lg" autoPlay />
        <button
          id="start-live-btn"
          type="button"
          className="bg-garthbeige hover:bg-white text-garthbrown font-bold py-2 px-4 rounded p-6 m-8 self-center"
          onClick={handleStream}
        >
          Start Livestream
        </button>
      </div>
      <Chat messages={messages} setMessages={setMessages} socket={socket} />
    </div>
  );
}

export default LiveStream;
