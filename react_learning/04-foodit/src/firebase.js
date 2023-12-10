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
  doc,
  exists,
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
  let foods;
  let lastQuery;
  if (options === undefined) {
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
      foods = querySnapshot.docs.map((doc) => doc.data());
      return { foods, lastQuery };
    } else {
      foods = [];
      lastQuery = null;
      return { foods, lastQuery };
    }
  } else {
    const firstQuery = query(
      collection(db, collectionName),
      orderBy(options.order, "desc"),
      limit(options.limit)
    );
    querySnapshot = await getDocs(firstQuery);
    lastQuery = querySnapshot.docs[querySnapshot.docs.length - 1];
    foods = querySnapshot.docs.map((doc) => doc.data());
    return { foods, lastQuery };
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

async function addDatas(collectionName, formData) {
  const storage = getStorage();
  const uuid = crypto.randomUUID();
  const path = `food/${uuid}`;
  // const path = `movie/movie-thumb`;
  const lastId = (await getLastId(collectionName)) + 1;
  const time = new Date().getTime();

  const imageRef = ref(storage, path);
  await uploadBytes(imageRef, formData.imgUrl).then(async (snapshot) => {
    console.log("Uploaded a blob or file!");
    await getDownloadURL(imageRef).then(async (url) => {
      formData.imgUrl = url;
      formData.id = lastId;
      formData.createdAt = time;
      formData.updatedAt = time;
    });
  });
  const result = await addDoc(collection(db, collectionName), formData);
  // addDoc 의 return 으로 doc 의 ref 객체가 나옴
  const docSnap = await getDoc(result);
  if (docSnap.exists()) {
    const review = docSnap.data();
    return { review };
  }
}

export { db, getDatas, addDatas };
