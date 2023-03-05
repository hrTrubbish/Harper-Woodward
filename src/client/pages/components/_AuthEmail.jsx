import React, { useState, useEffect } from 'react';
import { auth } from '../../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  getData,
  addData,
  delData,
  updateData,
} from '../../../server/db/db';

const AuthEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    // addData();
    // delData();
    // updateData();
  }, []);

  return (
    <div>
      <input
        // type="email"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
    </div>
  );
};

export default AuthEmail;
