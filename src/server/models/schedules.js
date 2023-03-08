const {
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} = require('firebase/firestore');
const dbPromise = require('../../config/firebaseBE');

module.exports = {
  get: async () => {
    try {
      const db = await dbPromise;
      const scheduleRef = collection(db, 'schedules');
      const scheduleSnapShot = await getDocs(scheduleRef);
      const schedules = scheduleSnapShot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      return schedules;
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (id) => {
    try {
      const db = await dbPromise;
      const scheduleRef = doc(db, 'schedules', id);
      const schedule = await getDoc(scheduleRef);

      return { id: schedule.id, ...schedule.data() };
    } catch (error) {
      throw new Error(error);
    }
  },
  post: async (payload) => {
    try {
      const db = await dbPromise;
      const schedulesRef = collection(db, 'schedules');

      return setDoc(doc(schedulesRef), {
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
      const scheduleRef = doc(db, 'schedules', id);
      await updateDoc(scheduleRef, {
        ...payload,
        updatedAt: serverTimestamp(),
      });

      const updatedSchedule = await getDoc(scheduleRef);
      return {
        id: updatedSchedule.id,
        ...updatedSchedule.data(),
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  remove: async (id) => {
    try {
      const db = await dbPromise;
      const scheduleRef = doc(db, 'schedules', id);
      await deleteDoc(scheduleRef);
      return { id };
    } catch (error) {
      throw new Error(error);
    }
  },
};
