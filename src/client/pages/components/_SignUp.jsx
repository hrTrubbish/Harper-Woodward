import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './_AuthProvider.jsx';

export function SignUp() {
  const navigate = useNavigate();

  const {
    handleSignUpWithEmail, handleLogInWithGoogle, userId, status, currEmail,
  } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUpWithEmail(email, password);
  };

  const handleGoogleLogIn = () => {
    handleLogInWithGoogle()
      .then(() => { })
      .catch((err) => console.error(err));
  };

  if (status === 'authenticated' && userId && (currEmail === 'fakeemail@qq.com' || currEmail === 'wangchanghua13@gmail.com')) {
    return navigate('/superuser');
  }

  return (
    <div>
      {status === 'authenticated' && userId ? <div className="m-4 flex items-center justify-center">Successfully Log In!</div>
        : (
          <form className="m-2 flex flex-col items-center" onSubmit={handleSubmit}>
            <label htmlFor="log-email" className="m-1 p-1 tracking-wider">
              Email:
              <input
                className="m-2"
                id="log-email"
                type="email"
                value={email}
                placeholder="Email ..."
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label htmlFor="log-pass" className="m-1 p-1 tracking-wider">
              Email:
              <input
                className="m-2"
                id="log-pass"
                type="password"
                value={password}
                placeholder="Password ..."
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="text-1xl m-3 p-2">Sign Up with Email</button>
            <button type="button" className="text-1xl mb-2 p-2" onClick={handleGoogleLogIn}>Sign Up with Google</button>
          </form>
        )}
    </div>
  );
}
