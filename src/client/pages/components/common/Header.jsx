import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../_AuthProvider.jsx';

export default function Header() {
  const {
    status, userId, handleLogOut,
  } = useContext(AuthContext);

  return (
    <>
      <header id="header">
        <div className="header-top">
          <div className="header-left">
            <a href="www.google.com">tour info</a>
          </div>
          <Link to="/" id="logo" className="mb-4">Brooks Garth</Link>
          {status === 'authenticated' && userId ? (
            <button type="button" onClick={handleLogOut}>
              <Link to="/">Log Out</Link>
            </button>
          ) : (
            <div className="header-right">
              <Link to="/login" id="login">login</Link>
              {/* <Link to="/signup">sign up</Link>  ----- move signup to login page */}
            </div>
          )}
        </div>
      </header>
      <div className="header-bottom">
        <nav id="main-nav">
          <Link to="/live">livestream</Link>
          <Link to="/videos">videos</Link>
          <a href="www.google.com">tickets</a>
        </nav>
      </div>
    </>
  );
}
