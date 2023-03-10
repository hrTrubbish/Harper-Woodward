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
        <div className="flex text-3xl justify-center mt-12">
          Successfully Logged In!
        </div>
      ) : (
        <div>
          <div className="bg-[#1c1111] py-8 px-10 rounded-lg mt-12 shadow-md">
            <div className="flex text-3xl justify-center">
              Sign In
            </div>
            <form
              className="flex flex-col items-left mt-4"
              onSubmit={handleEmailLogIn}
            >
              <label
                htmlFor="log-email"
                className="mt-2 p-1 tracking-wider"
              >
                Email:
                <input
                  className="w-full mt-2 py-2 px-3 rounded text-garthbrown"
                  id="log-email"
                  type="email"
                  value={email}
                  placeholder="Email..."
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
                  className="w-full mt-2 py-2 px-3 rounded text-garthbrown"
                  id="log-pass"
                  type="password"
                  value={password}
                  placeholder="Password..."
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <button
                type="submit"
                className="bg-garthbeige hover:bg-white text-garthbrown font-bold py-2 px-4 rounded p-6 m-6 self-center"
              >
                Login
              </button>
              <div className="flex flex-col justify-center mt-8">
                <div className="text-center">Don&apos;t have account ?</div>
                <Link
                  to="/signup"
                  className="bg-garthbeige hover:bg-white text-garthbrown font-bold py-2 px-4 rounded p-6 mb-8 mt-2 self-center"
                >
                  Create Account
                </Link>
                <div className="text-center">Or</div>
                <button
                  type="button"
                  className="bg-garthbeige hover:bg-white text-garthbrown font-bold py-2 px-4 rounded p-6 mb-8 mt-2 self-center"
                  onClick={handleGoogleLogIn}
                >
                  Log In with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
