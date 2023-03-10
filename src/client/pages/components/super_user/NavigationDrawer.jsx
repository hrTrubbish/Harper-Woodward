import React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationDrawer() {
  return (
    <nav className="flex flex-col">
      <ul className="mx-auto">
        <li className="my-5">
          <NavLink to="/admin">Live Stream</NavLink>
        </li>
        <li className="my-5">
          <NavLink to="/admin/stats">Stats List</NavLink>
        </li>
        <li className="my-5">
          <NavLink to="/admin/add-tour-dates">
            Add Tour Dates
          </NavLink>
        </li>
        <li className="my-5">
          <NavLink to="/admin/add-video-form">
            Add Video Form
          </NavLink>
        </li>
        <li className="my-5">
          <NavLink to="/admin/schedule-streams">
            Schedule Streams
          </NavLink>
        </li>
        <li className="my-5">
          <NavLink to="/admin/videos">Videos</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationDrawer;
