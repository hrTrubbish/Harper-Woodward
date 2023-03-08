const {
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} = require('firebase/firestore');
const dbPromise = require('../../config/firebaseBE');

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

      return setDoc(doc(superUsersRef), {
        ...payload,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  patch: async (id, payload) => {
    try {
      const db = await dbPromise;
      const superUserRef = doc(db, 'superUsers', id);
      await updateDoc(superUserRef, {
        ...payload,
        updatedAt: serverTimestamp(),
      });

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
