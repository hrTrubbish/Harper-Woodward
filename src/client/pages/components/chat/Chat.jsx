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
    <div>
      <MessagePanel messages={messages} />
      <form onSubmit={handleSubmit}>
        <input onChange={handleInput} id="message-input" value={input} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
