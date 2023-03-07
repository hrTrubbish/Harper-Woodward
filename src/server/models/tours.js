const {
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} = require('firebase/firestore');
const dbPromise = require('../../config/firebase');

module.exports = {
  get: async () => {
    try {
      const db = await dbPromise;
      const tourRef = collection(db, 'tours');
      const tourSnapShot = await getDocs(tourRef);
      const tours = tourSnapShot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      return tours;
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (id) => {
    try {
      const db = await dbPromise;
      const tourRef = doc(db, 'tours', id);
      const tour = await getDoc(tourRef);

      return { id: tour.id, ...tour.data() };
    } catch (error) {
      throw new Error(error);
    }
  },
  post: async (payload) => {
    try {
      const db = await dbPromise;
      const toursRef = collection(db, 'tours');

      const newtourRef = await setDoc(
        doc(toursRef),
        payload,
      );

      const newtour = await getDoc(newtourRef);
      return { id: newtour.id, ...newtour.data() };
    } catch (error) {
      throw new Error(error);
    }
  },
  patch: async (id, payload) => {
    try {
      const db = await dbPromise;
      const tourRef = doc(db, 'tours', id);
      await updateDoc(tourRef, payload);

      const updatedtour = await getDoc(tourRef);
      return {
        id: updatedtour.id,
        ...updatedtour.data(),
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  remove: async (id) => {
    try {
      const db = await dbPromise;
      const tourRef = doc(db, 'tours', id);
      await deleteDoc(tourRef);
      return { id };
    } catch (error) {
      throw new Error(error);
    }
  },
};
