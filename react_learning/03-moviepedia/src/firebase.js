import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  addDoc,
  setDoc,
  doc,
  exists,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdHy-PY5GiXz7B73eiyeL8FT0udOmhBkM",
  authDomain: "moviepedia-c1462.firebaseapp.com",
  projectId: "moviepedia-c1462",
  storageBucket: "moviepedia-c1462.appspot.com",
  messagingSenderId: "452125101812",
  appId: "1:452125101812:web:40b9aedb70d1e7e97e98a1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName, options) {
  let querySnapshot;
  let reviews;
  let lastQuery;
  // throw new Error("에러가 아니라 기능입니다.");
  if (options === undefined) {
    // querySnapshot = await getDocs(collection(db, collectionName));
    // dataList = querySnapshot.docs.map((doc) => doc.data());
    // return dataList;
    return await getDocs(collection(db, collectionName)).then((result) =>
      result.docs.map((doc) => doc.data())
    );
  } else if (options.lq !== undefined) {
    const firstQuery = query(
      collection(db, collectionName),
      orderBy(options.order, "desc"),
      startAfter(options.lq),
      limit(options.limit)
    );
    querySnapshot = await getDocs(firstQuery);
    if (querySnapshot.size > 0) {
      lastQuery = querySnapshot.docs[querySnapshot.docs.length - 1];
      reviews = querySnapshot.docs.map((doc) => doc.data());
      return { reviews, lastQuery };
    } else {
      reviews = [];
      lastQuery = null;
      return { reviews, lastQuery };
    }
  } else {
    const firstQuery = query(
      collection(db, collectionName),
      orderBy(options.order, "desc"),
      limit(options.limit)
    );
    querySnapshot = await getDocs(firstQuery);
    lastQuery = querySnapshot.docs[querySnapshot.docs.length - 1];
    reviews = querySnapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));
    return { reviews, lastQuery };
  }
}

async function getLastId(collectionName) {
  const lastQuery = await query(
    collection(db, collectionName),
    orderBy("id", "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(lastQuery);
  const lastId = lastDoc.docs[0].data().id;
  return lastId;
}

async function addDatas(collectionName, ...args) {
  const uuid = crypto.randomUUID();
  const path = `movie/${uuid}`;
  // const path = `movie/movie-thumb`;
  const lastId = (await getLastId(collectionName)) + 1;
  const time = new Date().getTime();
  const [formData, docId, imgUrl] = args;
  let result;
  if (args.length == 1) {
    const url = await uploadImage(path, formData.imgUrl);
    formData.imgUrl = url;
    formData.id = lastId;
    formData.createdAt = time;
    formData.updatedAt = time;
    result = await addDoc(collection(db, collectionName), formData);
    // addDoc 의 return 으로 doc 의 ref 객체가 나옴
  } else {
    if (formData.imgUrl !== null && typeof formData.imgUrl === "object") {
      const url = await uploadImage(path, formData.imgUrl);
      formData.imgUrl = url;
    } else if (formData.imgUrl === null || formData.imgUrl === undefined) {
      formData.imgUrl = imgUrl;
    }
    formData.updatedAt = time;
    await updateDoc(doc(db, collectionName, docId), formData);
    result = await doc(db, collectionName, docId);
  }

  const docSnap = await getDoc(result);
  if (docSnap.exists()) {
    const review = docSnap.data();
    return { review };
  }
}

async function uploadImage(path, imgUrl) {
  const storage = getStorage();
  const imageRef = ref(storage, path);
  await uploadBytes(imageRef, imgUrl);
  const url = await getDownloadURL(imageRef);
  return url;
}

async function updateDatas(collectionName, docId, formData) {
  console.log(docId, formData);
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, formData);
}

async function getImageURL(imgUrl) {
  const storage = getStorage();
  const imageRef = ref(storage, imgUrl);
  const url = await getDownloadURL(imageRef);
  console.log(url);
  return url;
}

export { db, getDatas, addDatas };
