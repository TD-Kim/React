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

function getCollection(...path) {
  let newPath = path;
  if (typeof path[0] !== 'string') {
    // [newPath] = path;
    newPath = path.flat();
  }
  return collection(db, ...newPath);
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

export async function getData(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const doc = snapshot.docs[0];
  const resultData = { ...doc.data(), docId: doc.id };
  return resultData;
}

export async function joinUser(uid, email) {
  await setDoc(doc(db, 'users', uid), { email: email });
}

export async function asyncCart(uid, cartArr) {
  const cartRef = getCollection('users', uid, 'cart');
  const batch = writeBatch(db);

  for (const item of cartArr) {
    const result = await updateQuantity(uid, item);
    if (!result) {
      const itemRef = doc(cartRef, item.id.toString());
      batch.set(itemRef, item);
    }
  }

  await batch.commit();
  // const snapshot = await getDocs(cartRef);
  const resultData = await getDatas(['users', uid, 'cart'], {});
  return resultData;
}

export async function updateQuantity(uid, cartItem) {
  const cartRef = getCollection('users', uid, 'cart');
  const itemRef = doc(cartRef, cartItem.id.toString());
  // 문서가 존재하는지 확인
  const itemDoc = await getDoc(itemRef);
  if (itemDoc.exists()) {
    const currentData = itemDoc.data();
    const updatedQuantity = (currentData.quantity || 0) + 1;
    const updatedTotal = currentData.price * updatedQuantity;
    await updateDoc(itemRef, {
      quantity: updatedQuantity,
      total: updatedTotal,
    });
    return true;
  } else {
    return false;
  }
}

export async function deleteDatas(collectionName, docId) {
  try {
    const cartRef = getCollection(collectionName);
    const docRef = doc(cartRef, docId.toString());
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.log('Error Delete: ', error);
  }
}

export async function addCart(collectionName, cartObj) {
  const collectionRef = getCollection(collectionName);
  const cartRef = doc(collectionRef, cartObj.id.toString());
  await setDoc(cartRef, cartObj);
}

export async function createOrder(uid, orderObj) {
  try {
    const orderRef = collection(db, 'users', uid, 'orders');
    const createObj = {
      ...orderObj,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      cancelYn: 'N',
    };
    const docRef = await addDoc(orderRef, createObj);
    const batch = writeBatch(db);
    orderObj.products.forEach((product) => {
      const cartRef = getCollection('users', uid, 'cart');
      const docRef = doc(cartRef, product.id.toString());
      batch.delete(docRef);
    });
    await batch.commit();
    return docRef.id;
  } catch (error) {
    console.log('CREATE Order Error: ', error);
  }
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
