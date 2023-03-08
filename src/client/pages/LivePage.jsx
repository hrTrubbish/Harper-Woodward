import React from 'react';
import AddMessage from './components/live/AddMessage.jsx';
import ViewerMessageList from './components/live/ViewerMessageList.jsx';

export default function LivePage() {
  return (
    <div className="h-screen w-screen">
      <div className="flex max-w-7xl m-auto">
        <div className="flex flex-col w-8/12 h-3/6 ml-8 mr-8 border-solid border-2 border-transparent mt-2">
          <video className="border-solid border-2 border-current mt-2" />
          <div className="text-3xl">
            *Live* Brooks Garth free show to raise awareness
            about dangling commas
          </div>
          <div>
            <p>{`Views: ${500000}`}</p>
          </div>
        </div>
        <div className="flex flex-col justify-start border-solid border-2 border-current mt-4 mb-2 w-3/12 p-6">
          <ViewerMessageList />
          <div className="p-6">
            <AddMessage />
          </div>
        </div>
      </div>
    </div>
  );
}
