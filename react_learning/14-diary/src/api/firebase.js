import { initializeApp } from 'firebase/app';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
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

export { getDatas, getData };
