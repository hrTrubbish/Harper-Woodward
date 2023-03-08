import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessagePanel from './MessagePanel.jsx';

const SERVER = 'http://localhost:8000';

export default function Chat({ socketNum, messages, input, setInput }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    socketNum.emit('send-message', input);
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
