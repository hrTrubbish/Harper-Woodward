import React, {
  createContext, useState, useEffect,
} from 'react';
import {
  googleSignUpAndLogIn, emailSignUp, emailLogIn, emailLogOut, authStateChange,
} from '../../../config/provider';

const initialState = {
  status: 'checking',
  currEmail: '',
  userId: null,
};

export const AuthContext = createContext({
  ...initialState,
  handleLogInWithGoogle: () => { },
  handleLogInWithEmail: () => { },
  handleSignUpWithEmail: () => { },
  handleLogOut: () => { },
});

function AuthProvider({ children }) {
  const [session, setSession] = useState(initialState);

  useEffect(() => {
    authStateChange(setSession, session.currEmail);
  }, []);

  const handleLogOut = async () => {
    emailLogOut();
    setSession({
      userId: null,
      currEmail: '',
      status: 'no-authenticated',
    });
  };

  const validateAuth = (userId, currEmail) => {
    if (userId) {
      return setSession({
        userId,
        currEmail,
        status: 'authenticated',
      });
    }

    return handleLogOut();
  };

  const checking = () => {
    setSession((prev) => ({ ...prev, status: 'checking' }));
  };

  const handleLogInWithGoogle = async () => {
    checking();
    const user = await googleSignUpAndLogIn();
    validateAuth(user.uid, user.email);
    return user.email;
  };

  const handleLogInWithEmail = async (email, password) => {
    checking();
    const userId = await emailLogIn({
      email,
      password,
    });
    validateAuth(userId, email);
  };

  const handleSignUpWithEmail = async (email, password) => {
    checking();
    const userId = await emailSignUp({
      email,
      password,
    });
    validateAuth(userId, email);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
