import React from 'react';
import Chat from '../chat/Chat.jsx';

function LiveStream({
  handleStream, messages, setMessages, socket,
}) {
  return (
    <div className="flex justify-center w-1/2">
      <video id="live-stream" className="border-solid border-2 border-current mt-2" autoPlay />
      <button
        type="button"
        className="bg-garthbeige hover:bg-white text-garthbrown font-bold py-2 px-4 rounded p-6 m-8 self-center"
        onClick={handleStream}
      >
        Start Livestream
      </button>
      <Chat messages={messages} setMessages={setMessages} socket={socket} />
    </div>
  );
}

export default LiveStream;
