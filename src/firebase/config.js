// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers/getEnvironments";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const env = getEnvironments();
console.log(env);
// console.log(import.meta.env);
// console.log(process.env);

// Your web app's Firebase configuration
//Dev/Production
// const firebaseConfig = {
//   apiKey: "AIzaSyDYj4wTiEPBN2R-OHoSRhvPvT2kvKvSgBk",
//   authDomain: "react-cursos-4ced7.firebaseapp.com",
//   projectId: "react-cursos-4ced7",
//   storageBucket: "react-cursos-4ced7.firebasestorage.app",
//   messagingSenderId: "1019564355243",
//   appId: "1:1019564355243:web:e1335a7281afbc639b91ee"
// };

//Testing
const firebaseConfig = {
  apiKey: "AIzaSyBelozPja7up7p-wYRYICPMrDvnEEIjCCo",
  authDomain: "prueba-journal-c7ab8.firebaseapp.com",
  projectId: "prueba-journal-c7ab8",
  storageBucket: "prueba-journal-c7ab8.firebasestorage.app",
  messagingSenderId: "18550841169",
  appId: "1:18550841169:web:ddeaeec6374855a9c43d70",
  measurementId: "G-G8QD25J0WQ"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);