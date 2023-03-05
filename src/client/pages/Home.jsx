import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col border-t-2">
      <div className="featured flex flex-col p-10">
        <span className="text-3xl self-center">
          featured video
        </span>
        <video className="h-90 mr-5 ml-5 border-dotted border-2 border" />
        <div className="flex justify-between mr-5 ml-5">
          <span className="font-bold text-3xl">
            Dancing in a Bar
          </span>
          <div className="flex gap-2">
            <span>{`Views: ${500000}`}</span>
            <span>{`Likes: ${100000}`}</span>
          </div>
        </div>
      </div>
      <div className="info flex flex-col p-10 border-t-2">
        <span className="text-3xl self-center">info</span>
        <div className="flex justify-around h-60">
          <img className="w-3/12 border-dotted border-2" />
          <div className="flex flex-col self-center">
            <span>
              THIS IS SOME INFO ABOUT BROOKS GARTH
            </span>
            <span>NEXT EVENT: 3/10/23</span>
          </div>
        </div>
      </div>
      <div className="tour flex flex-col p-10 border-t-2">
        <span className="text-3xl self-center">tour</span>
      </div>
      <div className="merch flex flex-col p-10 border-t-2">
        <span className="text-3xl self-center">merch</span>
        <div className="flex justify-around mb-20 p-5">
          <img className="h-20 w-20 border-solid border-2 border" />
          <img className="h-20 w-20 border-solid border-2 border" />
          <img className="h-20 w-20 border-solid border-2 border" />
          <img className="h-20 w-20 border-solid border-2 border" />
        </div>
      </div>
    </div>
  );
}
