const {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} = require('firebase/firestore');

const exampleVideos = require('../examples/exampleVideos');
const db = require('../../config/firebaseBE');

// iterate through examplevideos
// for each video obj, add to db

// TODO: DELETE VIDEOS COLLECTION BEFORE ADDING
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