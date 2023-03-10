import React, { useState, useContext } from 'react';
import MessagePanel from './MessagePanel.jsx';
import { AuthContext } from '../_AuthProvider.jsx';

export default function Chat({
  socket,
  messages,
  streamLive,
}) {
  // STATE DATA
  const [input, setInput] = useState('');
  // const { userName } = useContext(AuthContext);

  // EVENT HANDLERS
  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('new-message', {
      id: socket.id,
      message: input,
    });
    setInput('');
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      {streamLive ?
        userName ? (
          <div>
            <MessagePanel
              className="overflow-auto overscroll-contain h-full max-h-full"
              messages={messages}
            />
            <form
              className="flex flex-row mt-2 space-x-3 space-y-2 content-center"
              onSubmit={handleSubmit}
            >
              <input
                className="w-10/12"
                onChange={handleInput}
                value={input}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        ) : (
          <div>
            <MessagePanel
              className="overflow-auto overscroll-contain h-full max-h-full"
              messages={messages}
            />
            <form
              className="flex flex-row mt-2 space-x-3 space-y-2 content-center"
              onSubmit={handleSubmit}
            >
              <input
                disabled
                className="w-10/12"
                onChange={handleInput}
                value={input}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        ) : (
        <h3 className="self-center text-3xl">
          Chat Disabled
        </h3>
      )}
    </div>
  );
}
