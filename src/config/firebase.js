// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAhUitqkMWsvY05hPgdSS7-z941xwNZSWU',
  authDomain: 'blue-ocean-2023.firebaseapp.com',
  projectId: 'blue-ocean-2023',
  storageBucket: 'blue-ocean-2023.appspot.com',
  messagingSenderId: '895578740083',
  appId: '1:895578740083:web:aaf0af294c4312ab14a106',
  measurementId: 'G-ENY3R8JZP8',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
