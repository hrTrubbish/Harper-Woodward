import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  doc, getDoc, updateDoc, serverTimestamp,
} from 'firebase/firestore';

import SuperUser from '../SuperUser.jsx';
import { db } from '../../../config/firebaseFE';
import { AuthContext } from './_AuthProvider.jsx';

export function LogIn() {
  const {
    handleLogInWithGoogle,
    handleLogInWithEmail, userId, status,
  } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getUserInfo = async () => {
    try {
      const docRef = doc(db, 'users', email);
      const response = await getDoc(docRef);
      if (response?.data()?.email) {
        await updateDoc(docRef, { updatedAt: serverTimestamp() });
      }
      return response?.data();
    } catch (err) {
      return console.error(err);
    }
  };

  const handleEmailLogIn = (e) => {
    e.preventDefault();
    // setSession(email);
    getUserInfo().then((data) => {
      handleLogInWithEmail(email, password, data?.userName);
    })
      .catch((err) => console.error(err));
  };

  const handleGoogleLogIn = () => {
    getUserInfo().then(({ userName }) => {
      handleLogInWithGoogle(userName)
        .then(() => { })
        .catch((err) => console.error(err));
    })
      .catch((err) => console.error(err));
  };

  if (status === 'authenticated' && userId === import.meta.env.VITE_SUPERUSER_UID) {
    // return (
    //   <Link
    //     to="../superuser"
    //     className="flex justify-center"
    //   >
    //     Click To Go To Admin Page
    //   </Link>
    // );
    return <SuperUser />;
  }

  return (
    <div className="h-screen">
      {status === 'authenticated' && userId ? <div className="m-4 flex items-center justify-center">Successfully Log In!</div>
        : (
          <form className="flex flex-col items-center" onSubmit={handleEmailLogIn}>
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
            <button type="submit" className="text-1xl m-2 tracking-wider bg-[#fafaf9] text-[#78350f]">Login With Email</button>
            <div>Don&apos;t have account ?</div>
            <Link to="/signup" className="mt-2 bg-[#fafaf9] text-[#78350f]">Create Account With Email and Password</Link>
            <div className="my-1">Or</div>
            <button type="button" className="text-1xl mb-2 bg-[#fafaf9] text-[#78350f]" onClick={handleGoogleLogIn}>Sign Up and Log In with Google</button>
          </form>
        )}
    </div>
  );
}
