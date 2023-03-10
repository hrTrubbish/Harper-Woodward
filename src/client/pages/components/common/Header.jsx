import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { AuthContext } from '../_AuthProvider.jsx';

export default function Header() {
  const { status, userId, handleLogOut } =
    useContext(AuthContext);

  const isAuthenticated =
    userId === import.meta.env.VITE_SUPERUSER_UID;

  return (
    <>
      <header id="header">
        <div className="header-top">
          <div className="header-left">
            <HashLink smooth to="/#tours-section">
              tour info
            </HashLink>
          </div>
          <Link to="/" id="logo" className="mb-4">
            Brooks Garth
          </Link>
          {status === 'authenticated' && userId ? (
            <div className="header-right">
              <div className="flex flex-col space-y-2">
                {isAuthenticated && (
                  <Link to="/admin">admin</Link>
                )}
                <button type="button" onClick={handleLogOut}>
                  <Link to="/">log out</Link>
                </button>
              </div>
            </div>
          ) : (
            <div className="header-right">
              <Link to="/login" id="login">
                login
              </Link>
              {/* <Link to="/signup">sign up</Link>  ----- move signup to login page */}
            </div>
          )}
        </div>
      </header>
      <div className="header-bottom">
        <nav id="main-nav">
          <Link to="/live">livestream</Link>
          <Link to="/videos">videos</Link>
          <HashLink smooth to="/#upcoming-stream">
            tickets
          </HashLink>
        </nav>
      </div>
    </>
  );
}
