import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../_AuthProvider.jsx';

export default function Header() {
  const { status, userId, handleLogOut } = useContext(AuthContext);
  return (
    <header id="header">
      <div className="header-top">
        <a href="www.google.com">tour info</a>
        <Link to="/" id="logo">Brooks Garth</Link>
        {status === 'authenticated' && userId ? (
          <button type="button" onClick={handleLogOut}>
            <Link to="/">Log Out</Link>
          </button>
        ) : (
          <>
            <Link to="/login">login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
      <div className="header-bottom">
        <nav id="main-nav">
          <Link to="/live">livestream</Link>
          <Link to="/videos">videos</Link>
          <a href="www.google.com">tickets</a>
        </nav>
      </div>
    </header>
  );
}
