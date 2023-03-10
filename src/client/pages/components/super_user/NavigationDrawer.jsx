import React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationDrawer() {
  return (
    <nav className="flex flex-col">
      <ul className="mx-auto">
        <li className="my-5">
          <NavLink
            to="/admin"
            activeClassName="active-link"
          >
            Live Stream
          </NavLink>
        </li>
        <li className="my-5">
          <NavLink
            to="/admin/stats"
            activeClassName="active-link"
          >
            Stats List
          </NavLink>
        </li>
        <li className="my-5">
          <NavLink
            to="/admin/add-tour-dates"
            activeClassName="active-link"
          >
            Add Tour Dates
          </NavLink>
        </li>
        <li className="my-5">
          <NavLink
            to="/admin/add-video-form"
            activeClassName="active-link"
          >
            Add Video Form
          </NavLink>
        </li>
        <li className="my-5">
          <NavLink
            to="/admin/schedule-streams"
            activeClassName="active-link"
          >
            Schedule Streams
          </NavLink>
        </li>
        <li className="my-5">
          <NavLink
            to="/admin/videos"
            activeClassName="active-link"
          >
            Videos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationDrawer;
