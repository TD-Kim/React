// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDu1fjryomjfIm9X88IoO3nabnkbJ-niz0",
  authDomain: "test-project-f17b0.firebaseapp.com",
  projectId: "test-project-f17b0",
  storageBucket: "test-project-f17b0.appspot.com",
  messagingSenderId: "583340958593",
  appId: "1:583340958593:web:cefd0ce966359ac095be80",
  measurementId: "G-2RETRH4RHT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
