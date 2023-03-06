import React from 'react';
import AddMessage from './components/live/AddMessage.jsx';
import ViewerMessageList from './components/live/ViewerMessageList.jsx';

export default function LivePage() {
  return (
    <div className="flex h-5/6">
      <div className="flex flex-col w-8/12 h-3/6 ml-8 mr-8 border-black">
        <video className="border-4 border-black"/>
        <div className="text-3xl">
          *Live* Brooks Garth free show to raise awareness about dangling commas
        </div>
        <div>
          <p>{`Views: ${500000}`}</p>
        </div>
      </div>

      <div className="border-2 border-black flex flex-col justify-end w-3/12 p-6">
        <ViewerMessageList />
        <div className="p-6">
          <AddMessage />
        </div>
      </div>
    </div>
  );
}
