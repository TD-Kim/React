import { initializeApp } from 'firebase/app';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  runTransaction,
  updateDoc,
  where,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBnKOmRe8nCHzIAlU38vDfP61o3XAUTqU4',
  authDomain: 'diary-1ee59.firebaseapp.com',
  projectId: 'diary-1ee59',
  storageBucket: 'diary-1ee59.appspot.com',
  messagingSenderId: '676574775281',
  appId: '1:676574775281:web:a1cba8d84e00ebc027a650',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

async function getDatas(collectionName) {
  const q = query(
    getCollection(collectionName),
    where('userEmail', '==', 'kjy.devops@gmail.com'),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const lastQuery = docs[docs.length - 1];
  const resultData = docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
  return { resultData, lastQuery };
}

async function getData(collectionName, docId) {
  const docRef = doc(db, collectionName, docId);
  const snapshot = await getDoc(docRef);
  const resultData = { ...snapshot.data(), docId: snapshot.id };
  return resultData;
}

async function addDatas(collectionName, addObj) {
  try {
    const resultData = await runTransaction(db, async (transaction) => {
      const lastId = (await getLastNum('diary', 'id')) + 1;
      addObj.id = lastId;
      const docRef = await addDoc(getCollection(collectionName), addObj);
      const snapshot = await getDoc(docRef);
      const resultData = { ...snapshot.data(), docId: snapshot.id };
      return resultData;
    });
    return resultData;
  } catch (error) {
    console.log('Error transaction: ', error);
  }
}

async function updateDatas(collectionName, docId, updateObj) {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, updateObj);
  const snapshot = await getDoc(docRef);
  const resultData = { ...snapshot.data(), docId: snapshot.id };
  return resultData;
}

async function deleteDatas(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return docId;
  } catch (error) {
    return null;
  }
}

async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, 'desc'),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}

export { getDatas, getData, addDatas, updateDatas, deleteDatas };
