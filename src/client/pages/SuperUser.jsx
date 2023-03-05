import React from 'react';

export default function SuperUser() {
  return (
    <div className="flex mt-5 h-5/6 ">
      <div className="flex flex-col w-1/2 h-3/6 ml-8 mr-8 border-solid border-2 border-rose-100">
        <button className="text-3xl">
          Start Livestream
        </button>
      </div>

      <div className="flex flex-col justify-start w-1/2 border-solid border-2 border-rose-100 p-6">
        <div className="border-solid border-2 border-rose-100">
          stats 1
        </div>
        <div className="border-solid border-2 border-rose-100">
          stats 2
        </div>
        <div className="border-solid border-2 border-rose-100">
          stats 3
        </div>
        <div className="border-solid border-2 border-rose-100">
          stats 4
        </div>
      </div>
    </div>
  );
}
