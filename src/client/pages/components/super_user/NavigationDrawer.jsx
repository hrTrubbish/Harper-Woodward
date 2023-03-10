import React from 'react';
import { Link } from 'react-router-dom';

function NavigationDrawer() {
  return (
    <nav className="flex flex-col">
      <ul className="mx-auto">
        <li className="my-5">
          <Link to="/admin">Live Stream</Link>
        </li>
        <li className="my-5">
          <Link to="/admin/stats">Stats List</Link>
        </li>
        <li className="my-5">
          <Link to="/admin/add-tour-dates">
            Add Tour Dates
          </Link>
        </li>
        <li className="my-5">
          <Link to="/admin/add-video-form">
            Add Video Form
          </Link>
        </li>
        <li className="my-5">
          <Link to="/admin/schedule-streams">
            Schedule Streams
          </Link>
        </li>
        <li className="my-5">
          <Link to="/admin/videos">Videos</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationDrawer;
