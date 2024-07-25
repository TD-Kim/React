// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCnZr28gbjgasb9mYvZspy7hZNpw38-sWo',
  authDomain: 'mylog-437d4.firebaseapp.com',
  projectId: 'mylog-437d4',
  storageBucket: 'mylog-437d4.appspot.com',
  messagingSenderId: '841431168640',
  appId: '1:841431168640:web:ff1d51c93dba0601401865',
  measurementId: 'G-6ZKVYYKKGX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// DB, 인증, 스토리지 연결
export const firestoreDB = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
// 구글 전용
export const provider = new GoogleAuthProvider();
