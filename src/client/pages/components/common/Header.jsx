import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { AuthContext } from '../_AuthProvider.jsx';

export default function Header() {
  const {
    status, userId, handleLogOut,
  } = useContext(AuthContext);
  return (
    <header id="header">
      <div className="header-top">
        <div className="">
          <HashLink smooth to="/#tours-section">tour info</HashLink>
        </div>
        <Link to="/" id="logo" className="mb-4">Brooks Garth</Link>
        {status === 'authenticated' && userId ? (
          <button type="button" onClick={handleLogOut}>
            <Link to="/">Log Out</Link>
          </button>
        ) : (
          <div>
            <Link to="/login" id="login">login</Link>
            {/* <Link to="/signup">sign up</Link>  ----- move signup to login page */}
          </div>
        )}
      </div>
      <div className="header-bottom">
        <nav id="main-nav">
          {status === 'authenticated' && userId === import.meta.env.VITE_SUPERUSER_UID ? <Link to="/superuser">Admin</Link> : null}
          <Link to="/live">livestream</Link>
          <Link to="/videos">videos</Link>
          <a href="www.google.com">tickets</a>
        </nav>
      </div>
    </header>
  );
}
