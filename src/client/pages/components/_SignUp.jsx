import React, { useState, useContext } from 'react';
import {
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import SuperUser from '../SuperUser.jsx';
import { AuthContext } from './_AuthProvider.jsx';
import { db } from '../../../config/firebaseFE';

export function SignUp() {
  const {
    handleSignUpWithEmail,
    handleLogInWithGoogle,
    userId,
    status,
  } = useContext(AuthContext);

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const addUserInfo = async (
    currUser,
    currEmail,
    currPassword,
  ) => {
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
      .then(() => {})
      .catch((err) => console.error(err));
  };

  if (
    status === 'authenticated' &&
    userId === import.meta.env.VITE_SUPERUSER_UID
  ) {
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
              Create Account
            </div>
            <form
              className="flex flex-col items-left mt-4"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="log-userName"
                className="mb-2 mt-2 p-1 tracking-wider"
              >
                UserName:
                <input
                  className="w-full mt-2 py-2 px-3 rounded text-garthbrown"
                  id="log-userName"
                  type="text"
                  value={user}
                  placeholder="User Name..."
                  onChange={(e) => setUser(e.target.value)}
                  required
                />
              </label>
              <label
                htmlFor="log-email"
                className="mb-2 mt-2 p-1 tracking-wider"
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
                className="bg-garthbeige hover:bg-white text-garthbrown font-bold py-2 px-4 rounded p-6 mb-8 mt-8 self-center"
              >
                Sign Up with Email
              </button>
              <button
                type="button"
                className="bg-garthbeige hover:bg-white text-garthbrown font-bold py-2 px-4 rounded p-6 mb-8 mt-2 self-center"
                onClick={handleGoogleLogIn}
              >
                Sign Up with Google
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
