import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

// const davidConfig = {
//   apiKey: 'AIzaSyB8-g7a9rGWYaw6SJywqP8osQLGqoCK43A',
//   authDomain: 'brooks-garth.firebaseapp.com',
//   projectId: 'brooks-garth',
//   storageBucket: 'brooks-garth.appspot.com',
//   messagingSenderId: '449723328129',
//   appId: '1:449723328129:web:e7069477a6b957a18b4f80',
//   measurementId: 'G-RMPRH2MFG5',
// };

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// Get the Firebase Auth instance
export const FirebaseAuth = getAuth(FirebaseApp);

// Get the Firebase Firestore instance
export const db = getFirestore(FirebaseApp);
