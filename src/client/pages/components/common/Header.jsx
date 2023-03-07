import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header id="header">
      <div className="header-top">
        <a href="">tour info</a>
        <Link to="/" id="logo">Brooks Garth</Link>
        <Link to="/login">login</Link>
      </div>
      <div className="header-bottom">
        <nav id="main-nav">
          <Link to="/live">livestream</Link>
          <Link to="/videos">videos</Link>
          <a href="">tickets</a>
        </nav>
      </div>
    </header>
  );
}
