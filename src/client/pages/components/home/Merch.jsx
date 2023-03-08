import React from 'react';

export default function Merch() {
  return (
    <div>
      <div className="merch flex flex-col p-10 border-t-2 border-current">
        <span className="text-3xl self-center">merch</span>
        <div className="flex justify-around mb-20 p-5">
          <div className="w-40 cursor-pointer hover:scale-125 transition-transform border-solid">
            <span className="text-sm self-center">Books</span>
            <img src="src/client/styles/img/BGBook.jpg" alt="" />
          </div>
          <div className="w-40 cursor-pointer hover:scale-125 transition-transform border-solid">
            <span className="text-sm self-center">Masks</span>
            <img src="src/client/styles/img/BGFacemask.jpg" alt="" />
          </div>
          <div className="w-40 cursor-pointer hover:scale-125 transition-transform border-solid">
            <span className="text-sm self-center">Albums</span>
            <img src="src/client/styles/img/BGRecord.jpg" alt="" />
          </div>
          <div className="w-40 cursor-pointer hover:scale-125 transition-transform border-solid">
            <span className="text-sm self-center">Clothes</span>
            <img src="src/client/styles/img/BGSweatshirt.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
