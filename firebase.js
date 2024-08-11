// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkN0aVClTVKCnYsO-t7q8DXBCOsCunrGs",
  authDomain: "invent-tracker-46464.firebaseapp.com",
  projectId: "invent-tracker-46464",
  storageBucket: "invent-tracker-46464.appspot.com",
  messagingSenderId: "875478474934",
  appId: "1:875478474934:web:ef7f519d7c5145a2634617",
  measurementId: "G-R4PSYGPMWV"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {firestore}