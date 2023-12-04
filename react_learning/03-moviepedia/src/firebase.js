import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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
    reviews = querySnapshot.docs.map((doc) => doc.data());
    return { reviews, lastQuery };
  }
}

export { db, getDatas };
