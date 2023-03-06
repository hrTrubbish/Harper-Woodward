import React from 'react';

export default function LivePage() {
  return (
    <div className="flex h-5/6">
      <div className="flex flex-col w-8/12 h-3/6 ml-8 mr-8 border-black">
        <video className="border-4 border-black"/>
        <div className="text-3xl">
          brooks garth free show for charity
        </div>
        <div>
          <p>{`Views: ${500000}`}</p>
        </div>
      </div>

      <div className="border-2 border-black flex flex-col justify-end w-3/12">
        <div className="border-2 border-black">chat</div>
        <div className="border-2 border-black">chat</div>
        <div className="border-2 border-black">chat</div>
        <div className="border-2 border-black">send</div>
      </div>
    </div>
  );
}
