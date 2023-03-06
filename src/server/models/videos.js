const { collection, getDocs, doc, setDoc } = require('firebase/firestore');

const dbPromise = require('../../config/firebase');

module.exports = {
  getAllVideos: async () => {
    try {
      const db = await dbPromise;
      const videoRef = collection(db, 'videos');
      const querySnapshot = await getDocs(videoRef);
      const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return documents;
    } catch (err) {
      console.error(err);
    }
  },
  addVideo: async (videoBody) => {
    try {
      const db = await dbPromise;
      const videoRef = collection(db, 'videos');
      // doc takes a second param, the name of a document ID if you wish to provide it. otherwise it randomly generates one.
      await setDoc(doc(videoRef), videoBody);
    } catch (err) {
      console.error(err);
    }
  },
  updateVideo: async () => {
    console.log('in videos updateVideo')
  },
  deleteVideo: async () => {
    console.log('in videos deleteVideo')
  },
};
