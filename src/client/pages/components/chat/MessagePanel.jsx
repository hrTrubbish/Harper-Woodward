import React from 'react';
import Message from './Message.jsx';

export default function MessagePanel({ messages }) {
  return (

    <div className="overflow-y-auto message-background max-h-full">
      {messages.map((message, index) => <Message key={index} message={message} />)}
    </div>
  );
}
