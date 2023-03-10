import React from 'react';

function Message({ message }) {
  return (
    <div className="flex">
      <p className="font-bold text-randomColor pr-2">{`${message.id}:`}</p>
      <p className="text-white font-thin">{message.message}</p>
    </div>
  );
}

export default function MessagePanel({ messages }) {
  return (

    <div className="overflow-y-auto" className="message-background overflow-scroll max-h-full">
      {messages.map((message, index) => <Message key={index} message={message} />)}
    </div>
  );
}
