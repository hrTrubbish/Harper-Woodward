import React, { useState, useContext } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import SuperUser from '../SuperUser.jsx';
import { AuthContext } from './_AuthProvider.jsx';
import { db } from '../../../config/firebaseFE';

export function SignUp() {
  const {
    handleSignUpWithEmail, handleLogInWithGoogle, userId, status,
  } = useContext(AuthContext);

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const addUserInfo = async (currUser, currEmail, currPassword) => {
    try {
      const docRef = doc(db, 'users', currEmail);
      await setDoc(docRef, {
        userName: currUser,
        email: currEmail,
        password: currPassword,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUserInfo(user, email, password);
    handleSignUpWithEmail(email, password, user);
  };

  const handleGoogleLogIn = () => {
    handleLogInWithGoogle(user)
      .then(() => { })
      .catch((err) => console.error(err));
  };

  if (status === 'authenticated' && userId === import.meta.env.VITE_SUPERUSER_UID) {
    return <SuperUser />;
  }

  return (
    <div>
      {status === 'authenticated' && userId ? <div className="m-4 flex items-center justify-center">Successfully Log In!</div>
        : (
          <form className="m-2 flex flex-col items-center" onSubmit={handleSubmit}>
            <label htmlFor="log-userName" className="m-1 p-1 tracking-wider">
              UserName:
              <input
                className="m-2"
                id="log-userName"
                type="text"
                value={user}
                placeholder="User Name ..."
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </label>
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
              Password:
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
            <button type="submit" className="text-1xl m-3 p-2 bg-[#fafaf9] text-[#78350f]">Sign Up with Email</button>
            <button type="button" className="text-1xl mb-2 p-2 bg-[#fafaf9] text-[#78350f]" onClick={handleGoogleLogIn}>Sign Up with Google</button>
          </form>
        )}
    </div>
  );
}
