import React from 'react';

const AllVideos = () => {
  return (
    <div className="p-6">
      <div className="grid gap-4 grid-cols-2 grid-rows-auto">
        <div className="border-solid border-2 border-rose-100">
          <video className="h-60"></video>
          <div className="border-solid border-2 border-rose-100 p-2 text-center">
            <h2>Dancing in a Bar</h2>
          </div>
        </div>
        <div className="border-solid border-2 border-rose-100">
          <video className="h-60"></video>
          <div className="border-solid border-2 border-rose-100 p-2 text-center">
            <h2>Dancing in a Bar</h2>
          </div>
        </div>
        <div className="border-solid border-2 border-rose-100">
          <video className="h-60"></video>
          <div className="border-solid border-2 border-rose-100 p-2 text-center">
            <h2>Dancing in a Bar</h2>
          </div>
        </div>
        <div className="border-solid border-2 border-rose-100">
          <video className="h-60"></video>
          <div className="border-solid border-2 border-rose-100 p-2 text-center">
            <h2>Dancing in a Bar</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllVideos;