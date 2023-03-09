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

async function seedFeatured(videos) {
  const featuredCollection = collection(db, 'featured');
  try {
    await addDoc(featuredCollection, videos[1]);
    console.log(`Added video "${videos[0].title}" to Firestore collection featured}`);
  } catch (err) {
    console.error(err);
  }
}

seedVideos(exampleVideos);
seedFeatured(exampleVideos);
