import React from 'react';
import Message from './Message.jsx';

export default function MessagePanel({ messages }) {
  return (

    <div className="message-background overflow-scroll max-h-full">
      {messages.map((message, index) => <Message key={index} message={message} />)}
    </div>
  );
}
