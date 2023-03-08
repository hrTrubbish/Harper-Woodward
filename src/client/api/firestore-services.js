import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  orderBy,
  setDoc,
  limit,
  startAfter,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firestore-instance';

export const get = async (
  table,
  count = 10,
  start = null,
) => {
  try {
    let dbRef = collection(db, table);
    if (start) {
      dbRef = query(
        collection(db, table),
        orderBy('createdAt', 'desc'),
        startAfter(start),
        limit(count),
      );
    } else {
      dbRef = query(
        collection(db, table),
        orderBy('createdAt', 'desc'),
        limit(count),
      );
    }

    const dbSnapShot = await getDocs(dbRef);
    const res = dbSnapShot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    return {
      success: true,
      message: `Successfully fetched ${table}`,
      res,
    };
  } catch (error) {
    return { success: false, error };
  }
};

export const getOne = async (id, table) => {
  try {
    const dbRef = doc(db, table, id);
    const res = await getDoc(dbRef);

    return {
      success: true,
      message: `Successfully fetched ${table}`,
      id: res.id,
      ...res.data(),
    };
  } catch (error) {
    return { success: false, error };
  }
};

export const post = async (payload, table) => {
  try {
    const dbRef = collection(db, table);

    await setDoc(doc(dbRef), {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      message: `Successfully posted to ${table}`,
    };
  } catch (error) {
    return { success: false, error };
  }
};

export const update = async (id, payload, table) => {
  try {
    const dbRef = doc(db, table, id);
    await updateDoc(dbRef, {
      ...payload,
      updatedAt: serverTimestamp(),
    });

    const res = await getDoc(dbRef);
    return {
      success: true,
      message: `Successfully updated ${table}`,
      id: res.id,
      ...res.data(),
    };
  } catch (error) {
    return { success: false, error };
  }
};

export const remove = async (id, table) => {
  try {
    const dbRef = doc(db, table, id);
    await deleteDoc(dbRef);
    return {
      success: true,
      message: `Successfully delete from ${table}`,
      id,
    };
  } catch (error) {
    return { success: false, error };
  }
};
