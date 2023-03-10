import React from 'react';

function Message({ message }) {
  return (
    <div className="flex">
      <p className="font-bold text-randomColor pr-2">{`${message}`}</p>
      {/* <p className="text-white font-thin">{message.message}</p> */}
    </div>
  );
}

export default Message;
