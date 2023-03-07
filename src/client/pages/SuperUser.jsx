import React from 'react';
import StatsList from './components/super_user/StatsList.jsx';

export default function SuperUser() {
  return (
    <div className="flex">
      <div className="flex flex-col w-1/2 ml-8 mr-8 mt-8 border-solid border-2 border-black">
        <button type="button" className="text-3xl">Start Livestream</button>
      </div>
      <StatsList />
    </div>
  );
}
