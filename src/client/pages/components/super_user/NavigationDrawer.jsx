import React from 'react';
import { Link } from 'react-router-dom';

function NavigationDrawer() {
  return (
    <nav className="flex flex-col">
      <ul className="mx-auto">
        <li className="my-5">
          <Link to="/superuser">Live Stream</Link>
        </li>
        <li className="my-5">
          <Link to="/superuser/stats">Stats List</Link>
        </li>
        <li className="my-5">
          <Link to="/superuser/add-tour-dates">Add Tour Dates</Link>
        </li>
        <li className="my-5">
          <Link to="/superuser/add-video-form">Add Video Form</Link>
        </li>
        <li className="my-5">
          <Link to="/superuser/schedule-streams">Schedule Streams</Link>
        </li>
        <li className="my-5">
          <Link to="/superuser/videos">Videos</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationDrawer;
