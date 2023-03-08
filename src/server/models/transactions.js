const {
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} = require('firebase/firestore');
const dbPromise = require('../../config/firebaseBE');

module.exports = {
  get: async () => {
    try {
      const db = await dbPromise;
      const transactionRef = collection(db, 'transactions');
      const transactionSnapShot = await getDocs(
        transactionRef,
      );
      const transactions = transactionSnapShot.docs.map(
        (d) => ({
          id: d.id,
          ...d.data(),
        }),
      );

      return transactions;
    } catch (error) {
      throw new Error(error);
    }
  },
  post: async (payload) => {
    try {
      const db = await dbPromise;
      const transactionsRef = collection(
        db,
        'transactions',
      );

      return setDoc(doc(transactionsRef), {
        ...payload,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
