// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  getDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  runTransaction,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadString,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBIkutTtwY8K4geJ3xI3u0B2NqKUjmO63A",
//   authDomain: "e-farmas.firebaseapp.com",
//   projectId: "e-farmas",
//   storageBucket: "e-farmas.appspot.com",
//   messagingSenderId: "278743064106",
//   appId: "1:278743064106:web:b8011f1e5f715bfe346d53",
//   measurementId: "G-Y889XNW0S4",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCN4AEXmj8zL2Q51EMoD4fjwEm8B04487o",
  authDomain: "efarmas-dd2b0.firebaseapp.com",
  projectId: "efarmas-dd2b0",
  storageBucket: "efarmas-dd2b0.appspot.com",
  messagingSenderId: "643731203535",
  appId: "1:643731203535:web:273ac7da29e91c272cdeba",
  measurementId: "G-3EQP5GK6HZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

const auth = getAuth(app);

export {
  app,
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getDoc,
  doc,
  signOut,
  query,
  collection,
  where,
  getDocs,
  runTransaction,
  setDoc,
  addDoc,
  updateDoc,
  getStorage,
  ref,
  uploadString,
  uploadBytes,
  storage,
  getDownloadURL,
  deleteDoc,
};
