const {
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
} = require('firebase/firestore');
const dbPromise = require('../../config/firebase');

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

      const newtransactionRef = await setDoc(
        doc(transactionsRef),
        payload,
      );

      const newtransaction = await getDoc(
        newtransactionRef,
      );
      return {
        id: newtransaction.id,
        ...newtransaction.data(),
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};
