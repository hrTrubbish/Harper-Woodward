import React from 'react';
import { Link } from 'react-router-dom';

function NavigationDrawer() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/superuser">Live Stream</Link>
        </li>
        <li>
          <Link to="/superuser/stats">Stats List</Link>
        </li>
        <li>
          <Link to="/superuser/add-tour-dates">Add Tour Dates</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationDrawer;
