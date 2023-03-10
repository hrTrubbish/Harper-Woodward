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
    <div className="flex flex-col justify-between h-full">
      <MessagePanel className="overflow-auto overscroll-contain h-full max-h-full" messages={messages} />
      <form className="flex flex-row mt-2 space-x-3 space-y-2 content-center" onSubmit={handleSubmit}>
        <input className="w-10/12" onChange={handleInput} value={input} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
