import React from 'react';
import StatsList from './components/super_user/StatsList.jsx';
import ScheduleStreams from './components/super_user/ScheduleStreams.jsx';
import AddTourDates from './components/super_user/AddTourDates.jsx';

export default function SuperUser() {
  return (
    <div className="h-screen w-screen">
      <div className="flex">
        <div className="flex justify-center w-1/2">
          <button
            type="button"
            className="bg-garthbeige hover:bg-white text-garthbrown font-bold py-2 px-4 rounded m-8 self-center"
          >
            Start Livestream
          </button>
        </div>
        <StatsList />
      </div>
      <div className="flex justify-end p-8">
        <AddTourDates />
      </div>
    </div>
  );
}
