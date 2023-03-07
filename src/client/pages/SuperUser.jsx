import React from 'react';
import StatsList from './components/super_user/StatsList.jsx';

export default function SuperUser() {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex w-1/2 m-8 border-solid border-2 border-current">
        <button type="button" className="flex-1 text-3xl">Start Livestream</button>
      </div>
      <StatsList />
    </div>
  );
}
