import React, { useState, useContext } from 'react';
import { AuthContext } from './_AuthProvider.jsx';

export function SignUp() {
  const {
    handleSignUpWithEmail, handleLogInWithGoogle, userId, status,
  } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUpWithEmail(email, password);
  };

  return (
    <div>
      {status === 'authenticated' && userId ? <div className="m-4 flex items-center justify-center">Already Log In</div>
        : (
          <form className="m-2 flex flex-col border-2 border-black items-center" onSubmit={handleSubmit}>
            <label htmlFor="log-email" className="m-1 p-1 tracking-wider border-2 border-black">
              Email:
              <input
                id="log-email"
                type="email"
                value={email}
                placeholder="Email ..."
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label htmlFor="log-pass" className="m-1 p-1 tracking-wider border-2 border-black">
              Email:
              <input
                id="log-pass"
                type="password"
                value={password}
                placeholder="Password ..."
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="text-1xl m-5 border-2 border-black p-2">Sign Up with Email</button>
            <button type="button" className="text-1xl mb-1 border-2 border-black p-2" onClick={handleLogInWithGoogle}>Sign Up with Google</button>
          </form>
        )}
    </div>
  );
}
