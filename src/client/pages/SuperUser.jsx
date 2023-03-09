import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StatsList from './components/super_user/StatsList.jsx';
import VideosTab from './components/super_user/VideosTab.jsx';
import ScheduleStreams from './components/super_user/ScheduleStreams.jsx';
import AddTourDates from './components/super_user/AddTourDates.jsx';
import NavigationDrawer from './components/super_user/NavigationDrawer.jsx';
import LiveStream from './components/super_user/LiveStream.jsx';
import AddVideoForm from './components/super_user/AddVideoForm';

export default function SuperUser() {
  return (
    <div className="h-screen flex">
      <div className="w-1/4 max-w-xs">
        <NavigationDrawer />
      </div>
      <div className="w-3/4 items-center">
        <Routes>
          <Route exact path="/" element={<LiveStream />} />
          <Route exact path="/stats" element={<StatsList />} />
          <Route exact path="/add-tour-dates" element={<AddTourDates />} />
        </Routes>
      </div>
    </div>
  );
}
