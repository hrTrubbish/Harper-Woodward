const { getAuth } = require('firebase/auth');
const firebase = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyAhUitqkMWsvY05hPgdSS7-z941xwNZSWU',
  authDomain: 'blue-ocean-2023.firebaseapp.com',
  projectId: 'blue-ocean-2023',
  storageBucket: 'blue-ocean-2023.appspot.com',
  messagingSenderId: '895578740083',
  appId: '1:895578740083:web:aaf0af294c4312ab14a106',
  measurementId: 'G-ENY3R8JZP8',
};

const FirebaseApp = firebase.initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);

const db = getFirestore();

module.exports = db;
