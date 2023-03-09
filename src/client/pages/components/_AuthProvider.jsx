import React, {
  createContext, useState, useEffect,
} from 'react';
import {
  googleSignUpAndLogIn, emailSignUp, emailLogIn, emailLogOut, authStateChange,
} from '../../../config/provider';
import { getSession, setSession } from './sessionStorage';

const initialState = {
  status: 'checking',
  currEmail: '',
  userId: null,
  userName: '',
};

export const AuthContext = createContext({
  ...initialState,
  handleLogInWithGoogle: () => { },
  handleLogInWithEmail: () => { },
  handleSignUpWithEmail: () => { },
  handleLogOut: () => { },
  setSession: () => { },
});

function AuthProvider({ children }) {
  const [session, setSessionState] = useState(getSession());

  // useEffect(() => {
  //   const data = window.localStorage.getItem('session');
  //   if (data !== 'undefined') {
  //     const newSession = JSON.parse(data);
  //     setSession(newSession);
  //   }
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem('session', JSON.stringify(session));
  // }, [session]);

  useEffect(() => {
    setSession(session);
  }, [session]);

  useEffect(() => {
    if (session?.currEmail?.length) return;
    authStateChange(setSessionState, session?.currEmail);
  }, []);

  const handleLogOut = async () => {
    emailLogOut();
    setSessionState({
      userId: null,
      currEmail: '',
      userName: '',
      status: 'no-authenticated',
    });
  };

  const validateAuth = (userId, currEmail, userName) => {
    if (userId) {
      return setSessionState({
        ...session,
        userId,
        currEmail,
        userName,
        status: 'authenticated',
      });
    }
    return handleLogOut();
  };

  const checking = () => {
    setSessionState((prev) => ({ ...prev, status: 'checking' }));
  };

  const handleLogInWithGoogle = async (userName) => {
    checking();
    const user = await googleSignUpAndLogIn();
    validateAuth(user?.uid, user?.email, userName);
    return user.email;
  };

  const handleLogInWithEmail = async (email, password, userName) => {
    checking();
    const userId = await emailLogIn({
      email,
      password,
    });

    validateAuth(userId, email, userName);
  };

  const handleSignUpWithEmail = async (email, password, userName) => {
    checking();
    const userId = await emailSignUp({
      email,
      password,
    });
    validateAuth(userId, email, userName);
  };

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        ...session,
        handleLogInWithGoogle,
        handleLogInWithEmail,
        handleSignUpWithEmail,
        handleLogOut,
        setSession: setSessionState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
