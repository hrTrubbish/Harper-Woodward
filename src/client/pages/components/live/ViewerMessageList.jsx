import React from 'react';
import ViewerMessageItem from './ViewerMessageItem.jsx';

export default function ViewerMessageList({ messages }) {
  return (
    <div className="flex flex-col justify-start border-solid border-2 border-current p-6">
      <h2 className="self-center mb-6">Viewer Messages</h2>
      <div>
        {/* {messages.map((message) => {
          return <ul><ViewerMessageItem key={message._id} id={message._id} message={message}/></ul>
        })} */}
        <ViewerMessageItem className="border-solid border-2 border-current">message 1</ViewerMessageItem>
        <ViewerMessageItem className="border-solid border-2 border-current">message 2</ViewerMessageItem>
        <ViewerMessageItem className="border-solid border-2 border-current">message 3</ViewerMessageItem>
        <ViewerMessageItem className="border-solid border-2 border-current">message 4</ViewerMessageItem>
      </div>
    </div>
  );
}
