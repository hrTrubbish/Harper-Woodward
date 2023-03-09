import React from 'react';

export default function Merch() {
  return (
    <div>
      <div className="merch flex flex-col p-10">
        <span className="text-3xl self-center mb-8">merch</span>
        <div className="flex justify-around flex-wrap gap-4 mb-20 p-5">
          <div className="flex group justify-center align-center w-48 relative z-2 cursor-pointer hover:scale-105 transition-transform border-solid">
            <img src="src/client/styles/img/BGBook.jpg" alt="Book" />
            <div className="w-full absolute top-0 left-0 right-0 bottom-0 group-hover:bg-gray-700 hover:opacity-75 opacity-0 transition-opacity duration-500" />
            <div className="absolute bottom-[86px] w-full text-center pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500">BOOKS</div>
          </div>
          <div className="flex group justify-center align-center w-48 relative z-2 cursor-pointer hover:scale-105 transition-transform border-solid">
            <img src="src/client/styles/img/BGFacemask.jpg" alt="Facemasks" />
            <div className="w-full absolute top-0 left-0 right-0 bottom-0 group-hover:bg-gray-700 hover:opacity-75 opacity-0 transition-opacity duration-500" />
            <div className="absolute bottom-[86px] w-full text-center pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500">MASKS</div>
          </div>
          <div className="flex group justify-center align-center w-48 relative z-2 cursor-pointer hover:scale-105 transition-transform border-solid">
            <img src="src/client/styles/img/BGRecord.jpg" alt="Albums" />
            <div className="w-full absolute top-0 left-0 right-0 bottom-0 group-hover:bg-gray-700 hover:opacity-75 opacity-0 transition-opacity duration-500" />
            <div className="absolute bottom-[86px] w-full text-center pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500">ALBUMS</div>
          </div>
          <div className="flex group justify-center align-center w-48 relative z-2 cursor-pointer hover:scale-105 transition-transform border-solid">
            <img src="src/client/styles/img/BGSweatshirt.jpg" alt="Sweatshirts" />
            <div className="w-full absolute top-0 left-0 right-0 bottom-0 group-hover:bg-gray-700 hover:opacity-75 opacity-0 transition-opacity duration-500" />
            <div className="absolute bottom-[86px] w-full text-center pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500">CLOTHES</div>
          </div>
        </div>
      </div>
    </div>
  );
}
