import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

import SuperUser from '../SuperUser.jsx';
import { db } from '../../../config/firebaseFE';
import { AuthContext } from './_AuthProvider.jsx';

export function LogIn() {
  const {
    handleLogInWithGoogle,
    handleLogInWithEmail,
    userId,
    status,
  } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getUserInfo = async () => {
    try {
      const docRef = doc(db, 'users', email);
      const response = await getDoc(docRef);
      if (response?.data()?.email) {
        await updateDoc(docRef, {
          updatedAt: serverTimestamp(),
        });
      }
      return response?.data();
    } catch (err) {
      return console.error(err);
    }
  };

  const handleEmailLogIn = (e) => {
    e.preventDefault();
    // setSession(email);
    getUserInfo()
      .then((data) => {
        handleLogInWithEmail(
          email,
          password,
          data?.userName,
        );
      })
      .catch((err) => console.error(err));
  };

  const handleGoogleLogIn = () => {
    getUserInfo()
      .then(({ userName }) => {
        handleLogInWithGoogle(userName)
          .then(() => {})
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  if (
    status === 'authenticated' &&
    userId === import.meta.env.VITE_SUPERUSER_UID
  ) {
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
    <div className="flex justify-center h-screen">
      {status === 'authenticated' && userId ? (
        <div className="m-4 flex items-center justify-start">
          Successfully Log In!
        </div>
      ) : (
        <form
          className="flex flex-col items-left"
          onSubmit={handleEmailLogIn}
        >
          <label
            htmlFor="log-email"
            className="mt-2 p-1 tracking-wider"
          >
            Email:
            <input
              className="w-full"
              id="log-email"
              type="email"
              value={email}
              placeholder="Email ..."
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label
            htmlFor="log-pass"
            className="mb-2 mt-2 p-1 tracking-wider"
          >
            Password:
            <input
              className="w-full"
              id="log-pass"
              type="password"
              value={password}
              placeholder="Password ..."
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="text-1xl mb-4 mt-2 tracking-wider bg-garthbeige text-garthbrown"
          >
            Login With Email
          </button>
          <div>Don&apos;t have account ?</div>
          <Link
            to="/signup"
            className="mb-2 mt-2  bg-garthbeige text-garthbrown"
          >
            Create Account With Email and Password
          </Link>
          <div className="my-1">Or you can</div>
          <button
            type="button"
            className="text-1xl mb-2 bg-garthbeige text-garthbrown"
            onClick={handleGoogleLogIn}
          >
            Sign Up and Log In with Google
          </button>
        </form>
      )}
    </div>
  );
}
