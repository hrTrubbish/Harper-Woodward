import React from 'react';

export default function Live () {
  return (
  <div className='flex mt-5 h-5/6 '>
    <div className='flex flex-col w-8/12 h-3/6 ml-8 mr-8 border'>
      <video className='border-4'>
      </video>
      <div className='text-3xl'>
        brooks garth free show for charity
      </div>
      <div>
        <p>{`Views: ${500000}`}</p>
      </div>
    </div>

    <div className='border-2 flex flex-col justify-end w-3/12'>
      <div className='border-2'>
        chat
      </div>
      <div className='border-2'>
        chat
      </div>
      <div className='border-2'>
        chat
      </div>
      <div className='border-2'>
        send
      </div>
    </div>
  </div>
  );
};


