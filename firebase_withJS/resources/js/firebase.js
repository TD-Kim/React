import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";

// Add Firebase products that you want to use
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyChTHSbAjDu1N7t98jK01Hc9SWHB_MJ1lo",
  authDomain: "t-01-d1b15.firebaseapp.com",
  projectId: "t-01-d1b15",
  storageBucket: "t-01-d1b15.appspot.com",
  messagingSenderId: "207422918508",
  appId: "1:207422918508:web:d8a73303fb892186fbed49",
  measurementId: "G-7W31LLPQQ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, getDocs, collection };
