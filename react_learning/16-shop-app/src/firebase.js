import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
  getDoc,
  runTransaction,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
  writeBatch,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAeVAA1GOql8fn9OuSe2LrhG2pzNLBWdF8',
  authDomain: 'shop-app-c8539.firebaseapp.com',
  projectId: 'shop-app-c8539',
  storageBucket: 'shop-app-c8539.appspot.com',
  messagingSenderId: '533245681338',
  appId: '1:533245681338:web:43d2e784635de86099ac83',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

export function getUserAuth() {
  return auth;
}

async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, 'desc'),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  if (lastDoc.docs.length === 0) {
    return 0;
  }
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}

function getQuery(collectionName, queryOption) {
  const { conditions = [], orderBys = [], limits } = queryOption;
  const collect = getCollection(collectionName);
  let q = query(collect);

  // where 조건
  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });

  // orderBy 조건
  orderBys.forEach((order) => {
    q = query(q, orderBy(order.field, order.direction || 'asc'));
  });

  // limit 조건
  q = query(q, limit(limits));

  return q;
}

export async function getDatas(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const resultData = docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
  return resultData;
}

export async function joinUser(userObj) {
  await setDoc(doc(db, 'users', userObj.uid), {
    email: userObj.email,
    cart: userObj.cart,
  });
}

export async function asyncCart(uid, cartArr) {
  const cartRef = collection(db, 'users', uid, 'cart');
  const batch = writeBatch(db);

  cartArr.forEach((item) => {
    const itemRef = doc(cartRef, item.id.toString());
    batch.set(itemRef, item);
  });

  await batch.commit();

  // await setDoc(doc(db, 'users', uid), cartObj, { merge: true });
}

export async function addItemToCart() {
  // const itemRef = doc(db, 'users', userId, 'cart', item.id.toString());
  // await setDoc(itemRef, item, { merge: true });
  // console.log('장바구니 아이템 추가 성공');
}

export async function removeItemFromCart(itemId) {
  // const userId = getAuth().currentUser.uid;
  // const itemRef = doc(db, 'users', userId, 'cart', itemId.toString());
  // await itemRef.delete();
  // console.log('장바구니 아이템 삭제 성공');
}

export async function updateItemInCart(item) {
  // const userId = getAuth().currentUser.uid;
  // const itemRef = doc(db, 'users', userId, 'cart', item.id.toString());
  // await setDoc(itemRef, item, { merge: true });
  // console.log('장바구니 아이템 수정 성공');
}
