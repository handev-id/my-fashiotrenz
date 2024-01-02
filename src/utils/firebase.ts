// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiy9Z_mwv4yKxwZI3EEsLCPMf8J23oi5E",
  authDomain: "fashio-apps-5c84c.firebaseapp.com",
  projectId: "fashio-apps-5c84c",
  storageBucket: "fashio-apps-5c84c.appspot.com",
  messagingSenderId: "268898403775",
  appId: "1:268898403775:web:fbf3a8f10236fe5f8f8d0a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)

