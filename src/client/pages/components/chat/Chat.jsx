import React, { useState } from 'react';
import MessagePanel from './MessagePanel.jsx';

export default function Chat({
  socket, messages,
}) {
  // STATE DATA
  const [input, setInput] = useState('');

  // EVENT HANDLERS
  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('new-message', { id: socket.id, message: input });
    setInput('');
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <MessagePanel className="overflow-auto overscroll-contain h-full max-h-full" messages={messages} />
      <form className="flex flex-row mt-2 space-x-3 space-y-2 content-center" onSubmit={handleSubmit}>
        <input className="w-10/12" onChange={handleInput} value={input} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
