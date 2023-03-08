import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebaseBE';

const testCollectionRef = collection(db, 'test');
const testCollectionRefWithTag = doc(
  db,
  'test',
  'testid_1',
);

const newTestData = {
  title: 'test again',
  num: 2,
  isTrue: false,
};

export const getData = async () => {
  try {
    // Get Return Format
    const data = await getDocs(testCollectionRef);
    // console.log(data);

    // Get Real Data in Array Format
    const tableData = data.docs.map((document) => ({
      ...document.data(),
      id: document.id,
    }));
    console.log(tableData);
  } catch (err) {
    console.error(err);
  }
};

export const addData = async () => {
  try {
    // await addDoc(testCollectionRef, newTestData);
    await setDoc(testCollectionRefWithTag, newTestData);
  } catch (err) {
    console.error(err);
  }
};

export const delData = async () => {
  try {
    const delDataRef = doc(db, 'test', 'testid_1');
    console.log(delDataRef);
    await deleteDoc(delDataRef);
    // doc(db, 'test', 'yhWh61jZ0NdGiZwm4S4M'),
  } catch (err) {
    console.error(err);
  }
};

export const updateData = async () => {
  try {
    await updateDoc(doc(db, 'test', 'testid_1'), {
      title: 'test_3',
    });
  } catch (err) {
    console.error(err);
  }
};
