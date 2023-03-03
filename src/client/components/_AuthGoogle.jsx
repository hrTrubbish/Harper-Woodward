import React, { useState } from 'react';
import {
  auth,
  googleProvider,
} from '../../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

// signInWithRedirect, signInWithPopup

export const AuthGoogle = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(auth?.currentUser?.email);

  const signInWithGoogle = async () => {
    console.log(auth?.currentUser?.email);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  const logOutGoogle = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signInWithGoogle}>
        Sign In Google
      </button>

      <button onClick={logOutGoogle}>Log Out Google</button>
    </div>
  );
};
