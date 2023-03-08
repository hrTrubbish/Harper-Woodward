import React from 'react';
import StatsList from './components/super_user/StatsList.jsx';
import VideosTab from './components/super_user/VideosTab.jsx';
import ScheduleStreams from './components/super_user/ScheduleStreams.jsx';
import AddTourDates from './components/super_user/AddTourDates.jsx';
import AddVideoForm from './components/super_user/AddVideoForm';

export default function SuperUser() {
  return (
    <div className="h-screen w-screen">
      <div className="max-w-7xl m-auto">
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
      <div className="flex h-2/6 justify-between gap-3 p-12">
        <VideosTab />
        <AddVideoForm />
      </div>
    </div>
  );
}
