import React from 'react';

const Header = () => {
  return (
    <header id="header">
      <div className="header-top">
        <a href="">tour info</a>
        <h1 id="logo">Brooks Garth</h1>
        <a href="">login</a>
      </div>
      <div className="header-bottom">
        <nav id="main-nav">
          <a href="">livestream</a>
          <a href="">videos</a>
          <a href="">tickets</a>
        </nav>
      </div>
    </header>
  )
};

export default Header;