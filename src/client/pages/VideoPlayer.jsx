import React from 'react';

export default function VideoPlayer () {
  return (
    <div className="flex">
      <div className="flex w-2/3 border-solid border-2 border-inherit p-6">
        <div className="flex flex-col w-full border-solid border-2 border-rose-100 gap-6">
          <video className="border-solid border-2 border-rose-100"></video>
          <h2>Dancing in a Bar</h2>
          <p>{`Views: ${125000} Likes: ${1000}`}</p>
        </div>
      </div>
      <div className="flex flex-col w-1/3 border-solid border-2 border-inherit p-6 gap-6">
        <div className="w-1/2 self-center border-solid border-2 border-rose-100">
          <img className="h-24"></img>
        </div>
        <div className="w-1/2 self-center border-solid border-2 border-rose-100">
          <img className="h-24"></img>
        </div>
        <div className="w-1/2 self-center border-solid border-2 border-rose-100">
          <img className="h-24"></img>
        </div>
        <div className="w-1/2 self-center border-solid border-2 border-rose-100">
          <img className="h-24"></img>
        </div>
        <button>More</button>
      </div>
    </div>
  );
};
