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
  apiKey: "AIzaSyCnRFZ4zgIysNMP6WaBoO0Ix6JxK13BA74",
  authDomain: "myblog-78d94.firebaseapp.com",
  projectId: "myblog-78d94",
  storageBucket: "myblog-78d94.appspot.com",
  messagingSenderId: "492552783702",
  appId: "1:492552783702:web:abcb8bc8b010841b0a38f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// DB, 인증, 스토리지 연결
export const firestoreDB = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
// 구글 전용
export const provider = new GoogleAuthProvider();
