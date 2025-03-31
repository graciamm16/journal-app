// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYj4wTiEPBN2R-OHoSRhvPvT2kvKvSgBk",
  authDomain: "react-cursos-4ced7.firebaseapp.com",
  projectId: "react-cursos-4ced7",
  storageBucket: "react-cursos-4ced7.firebasestorage.app",
  messagingSenderId: "1019564355243",
  appId: "1:1019564355243:web:e1335a7281afbc639b91ee"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);