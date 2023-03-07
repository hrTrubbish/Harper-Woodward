const {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} = require('firebase/firestore');

const exampleVideos = require('../examples/exampleVideos');
const db = require('../../config/firebase');

// iterate through examplevideos
// for each video obj, add to db
async function seedVideos(videos) {
  const videosCollection = collection(db, 'videos');
  videos.forEach(async (video) => {
    try {
      await addDoc(videosCollection, video);
      console.log(`Added video "${video.title}" to Firestore`);
    } catch (err) {
      console.error(err);
    }
  });
}

seedVideos(exampleVideos);