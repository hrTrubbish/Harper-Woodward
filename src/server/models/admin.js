const {
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} = require('firebase/firestore');
const dbPromise = require('../../config/firebase');

module.exports = {
  get: async () => {
    try {
      const db = await dbPromise;
      const superUserRef = collection(db, 'superUsers');
      const superUserSnapShot = await getDocs(superUserRef);
      const superUsers = superUserSnapShot.docs.map(
        (d) => ({
          id: d.id,
          ...d.data(),
        }),
      );

      return superUsers;
    } catch (error) {
      throw new Error(error);
    }
  },
  post: async (payload) => {
    try {
      const db = await dbPromise;
      const superUsersRef = collection(db, 'superUsers');

      const newsuperUserRef = await setDoc(
        doc(superUsersRef),
        payload,
      );

      const newsuperUser = await getDoc(newsuperUserRef);
      return {
        id: newsuperUser.id,
        ...newsuperUser.data(),
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  patch: async (id, payload) => {
    try {
      const db = await dbPromise;
      const superUserRef = doc(db, 'superUsers', id);
      await updateDoc(superUserRef, payload);

      const updatedsuperUser = await getDoc(superUserRef);
      return {
        id: updatedsuperUser.id,
        ...updatedsuperUser.data(),
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};
