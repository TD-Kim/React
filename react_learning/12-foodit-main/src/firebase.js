import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  startAt,
  endAt,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAdHy-PY5GiXz7B73eiyeL8FT0udOmhBkM',
  authDomain: 'moviepedia-c1462.firebaseapp.com',
  projectId: 'moviepedia-c1462',
  storageBucket: 'moviepedia-c1462.appspot.com',
  messagingSenderId: '452125101812',
  appId: '1:452125101812:web:40b9aedb70d1e7e97e98a1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function getQuery(collectionName, queryOption) {
  const { conditions = [], orderBys = [], limits, lastQuery } = queryOption;
  const collect = getCollection(collectionName);
  let q = query(collect);

  const condition = [
    { field: 'text', operator: '==', value: 'test' },
    { field: 'uid', operator: '==', value: 'xjdiwjKDJ2jdkxJND2J' },
  ];

  // where 조건
  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });

  // orderBy 조건
  orderBys.forEach((order) => {
    q = query(q, orderBy(order.field, order.direction || 'asc'));
  });

  // startAfter 조건
  if (lastQuery) {
    q = query(q, startAfter(lastQuery));
  }

  // limit 조건
  q = query(q, limit(limits));

  return q;
}

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultData;
}

async function getDatasByOrder(collectionName, options) {
  const collect = await collection(db, collectionName);
  // const q = query(컬렉션정보, 조건1, 조건2, 조건3...);
  const q = query(collect, orderBy(options.order, 'desc'));
  const snapshot = await getDocs(q);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultData;
}

async function getDatasByOrderLimit(collectionName, queryOptions) {
  // const collect = await collection(db, collectionName);
  const q = getQuery(collectionName, queryOptions);
  // let q;
  // if (options.lq) {
  //   q = query(
  //     collect,
  //     orderBy(options.fieldName, 'desc'),
  //     startAfter(options.lq),
  //     limit(options.limits)
  //   );
  // } else if (!options.lq && options.search) {
  //   q = query(
  //     collect,
  //     // orderBy(options.search),
  //     orderBy(options.fieldName, 'desc'),
  //     // startAt(options.search),
  //     // endAt(options.search + '\uf8ff'),
  //     where('title', '>=', options.search),
  //     where('title', '<=', options.search + '\uf8ff'),
  //     limit(options.limits)
  //   );
  // } else {
  //   q = query(
  //     collect,
  //     orderBy(options.fieldName, 'desc'),
  //     limit(options.limits)
  //   );
  // }
  const snapshot = await getDocs(q);
  const lastQuery = snapshot.docs[snapshot.docs.length - 1];
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  // debugger;
  return { resultData, lastQuery };
}

function createPath(path) {
  const uuid = crypto.randomUUID();
  return path + uuid;
}

async function addDatas(collectionName, dataObj) {
  try {
    const path = createPath('food/');
    const url = await uploadImage(path, dataObj.imgUrl);
    dataObj.imgUrl = url;

    // createdAt, updatedAt ==> 현재 날짜 밀리세컨즈로 바꿔서
    const time = new Date().getTime();
    dataObj.createdAt = time;
    dataObj.updatedAt = time;

    // id 필드의 값 ==> 가장 큰 id + 1
    const lastId = await getLastNum(collectionName, 'id');
    dataObj.id = lastId + 1;

    // 문서 ID 자동
    console.log(dataObj);
    const result = await addDoc(getCollection(collectionName), dataObj);
    const docSnap = await getDoc(result); // result == > documentReference
    const resultData = { ...docSnap.data(), docId: docSnap.id };
    return resultData;
  } catch (error) {
    return false;
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

async function uploadImage(path, imgFile) {
  // 스토리지 객체 가져오기
  const storage = getStorage();
  // 저장할 이미지 객체 생성
  const imageRef = ref(storage, path);
  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, imgFile);
  // 저장한 File의 url 가져오기
  const url = await getDownloadURL(imageRef);
  return url;
}

async function deleteDatas(collectionName, docId, imgUrl) {
  // 스토리이제 있는 이미지를 삭제할 때 필요한 것 ==> 파일명(경로포함) or 파일 url
  // 스토리지 객체 생성
  const storage = getStorage();
  let message;
  try {
    message = '이미지 삭제에 실패했습니다. \n관리자에게 문의하세요.';
    // 삭제할 파일의 참조객체 생성(ref 함수 사용)
    const deleteRef = ref(storage, imgUrl);
    // 파일 삭제
    await deleteObject(deleteRef);

    message = '문서 삭제에 실패했습니다. \n관리자에게 문의하세요.';
    // 삭제할 문서의 참조객체 생성(doc 함수 사용)
    const deleteDocRef = doc(db, collectionName, docId);
    // 문서 삭제
    await deleteDoc(deleteDocRef);

    return { result: true, message: message };
  } catch (error) {
    return { result: false, message: message };
  }
}

async function updateDatas(collectionName, docId, updateObj, imgUrl) {
  const docRef = await doc(db, collectionName, docId);
  // 저장되어있는 시간 관련 필드들의 값이 밀리세컨드로 되어있기 때문에 getTime() 함수 사용
  const time = new Date().getTime();

  // 사진 파일을 변경하지 않았을 때
  if (updateObj.imgUrl === null) {
    // 사진이 변경되지 않았을 때 imgUrl 값이 null 로 넘어오기 때문에
    // 그 상태로 문서를 update 해버리면 imgUrl 값이 null 로 바뀐다.
    // 그렇기 때문에 updateObj 에서 imgUrl 프로퍼티를 삭제해준다.
    delete updateObj['imgUrl'];
  } else {
    // 사진 파일을 변경했을 때
    // 기존 사진 삭제
    const storage = getStorage();
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);

    // 변경한 사진을 스토리지에 저장
    const url = await uploadImage(createPath('food/'), updateObj.imgUrl);
    // 스토리지에 저장하고 그 파일의 url 을 가져와서 updateObj 의 imgUrl 값을 변경해준다.
    // 왜? 기존 updateObj에 있는 imgUrl 은 'File' 객체이고,
    // 우리가 데이터베이스에 저장해야 할 imgUrl 은 문자열 url 이기 때문에
    updateObj.imgUrl = url;
  }

  // updatedAt 필드에 넣어줄 시간 데이터를 updateObj 에 넣어준다.
  updateObj.updatedAt = time;

  // 문서 필드 데이터 수정
  await updateDoc(docRef, updateObj);
  const docSnap = await getDoc(docRef);
  const resultData = { ...docSnap.data(), docId: docSnap.id };
  return resultData;
}

export {
  db,
  getDatas,
  addDatas,
  deleteDatas,
  updateDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
};
