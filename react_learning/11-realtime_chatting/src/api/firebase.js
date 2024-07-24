import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAUJi9jIZPjM-KEdjDMklAtdiLskWH11fY',
  authDomain: 'chatting-326ef.firebaseapp.com',
  projectId: 'chatting-326ef',
  storageBucket: 'chatting-326ef.appspot.com',
  messagingSenderId: '641366352174',
  appId: '1:641366352174:web:056eb800b27e60253b1abf',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function getUserAuth() {
  return auth;
}

async function getDatasOrderByLimit(collectionName, orderByField, limitValue) {
  const collect = getCollection(collectionName);
  const q = query(collect, orderBy(orderByField), limit(limitValue));
  const snapshot = await getDocs(q);
  const resultData = snapshot.docs.map((doc) => ({ ...doc.data() }));
  return resultData;
}

async function addDatas(collectionName, addObj) {
  const collect = getCollection(collectionName);
  await addDoc(collect, addObj);
}

async function getRealTimeMessages(collectionName, orderField, limits) {
  let messages = [];
  const q = query(
    collection(db, collectionName),
    orderBy(orderField),
    limit(limits)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const datas = [];
    querySnapshot.forEach((doc) => {
      datas.push(doc.data());
    });
    messages = datas;
  });
  return [messages, unsubscribe];
}

export { db, getUserAuth, getDatasOrderByLimit, addDatas, getRealTimeMessages };
