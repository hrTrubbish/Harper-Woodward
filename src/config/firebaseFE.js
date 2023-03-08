import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAhUitqkMWsvY05hPgdSS7-z941xwNZSWU',
  authDomain: 'blue-ocean-2023.firebaseapp.com',
  projectId: 'blue-ocean-2023',
  storageBucket: 'blue-ocean-2023.appspot.com',
  messagingSenderId: '895578740083',
  appId: '1:895578740083:web:aaf0af294c4312ab14a106',
  measurementId: 'G-ENY3R8JZP8',
};

const davidConfig = {
  apiKey: 'AIzaSyB8-g7a9rGWYaw6SJywqP8osQLGqoCK43A',
  authDomain: 'brooks-garth.firebaseapp.com',
  projectId: 'brooks-garth',
  storageBucket: 'brooks-garth.appspot.com',
  messagingSenderId: '449723328129',
  appId: '1:449723328129:web:e7069477a6b957a18b4f80',
  measurementId: 'G-RMPRH2MFG5',
};

export const FirebaseApp = initializeApp(davidConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
