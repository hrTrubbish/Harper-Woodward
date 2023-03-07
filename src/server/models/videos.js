const {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} = require('firebase/firestore');

const dbPromise = require('../../config/firebase');

module.exports = {
  getAllVideos: async () => {
    try {
      const db = await dbPromise;
      const videoRef = collection(db, 'videos');
      const querySnapshot = await getDocs(videoRef);
      const documents = querySnapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      return documents;
    } catch (err) {
      return err;
    }
  },
  addVideo: async (videoBody) => {
    try {
      const db = await dbPromise;
      const videoRef = collection(db, 'videos');
      // doc takes a second param, the name of a document ID
      // if you wish to provide it. otherwise it randomly generates one.
      return setDoc(doc(videoRef), videoBody);
    } catch (err) {
      return err;
    }
  },
  updateVideo: async (id, updatedBody) => {
    try {
      const db = await dbPromise;
      const videoRef = doc(db, 'videos', id);
      return updateDoc(videoRef, updatedBody);
    } catch (err) {
      return err;
    }
  },
  deleteVideo: async (id) => {
    try {
      const db = await dbPromise;
      const videoRef = doc(db, 'videos', id);
      return deleteDoc(videoRef);
    } catch (err) {
      return err;
    }
  },
};
