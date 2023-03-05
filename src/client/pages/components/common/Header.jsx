import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header id="header">
      <div className="header-top">
        <a href="">tour info</a>
        <Link to='/home' id="logo">Brooks Garth</Link>
        <Link to='/login'>login</Link>
      </div>
      <div className="header-bottom">
        <nav id="main-nav">
          <Link to='/live'>livestream</Link>
          <a href="">videos</a>
          <a href="">tickets</a>
        </nav>
      </div>
    </header>
  )
};

export default Header;