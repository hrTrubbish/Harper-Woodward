import React from 'react';
import ViewerMessageItem from './ViewerMessageItem.jsx';

export default function ViewerMessageList({ messages }) {
  return (
    <div className="flex flex-col justify-start p-6">
      <h2 className="self-center mb-6">Viewer Messages</h2>
      <div>
        {/* {messages.map((message) => {
          return <ul><ViewerMessageItem key={message._id} id={message._id} message={message}/></ul>
        })} */}
        <ViewerMessageItem />
        <ViewerMessageItem />
        <ViewerMessageItem />
        <ViewerMessageItem />
      </div>
    </div>
  );
}
