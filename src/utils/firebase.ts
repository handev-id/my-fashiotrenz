// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "ecommerce-nextjs-ed19d.firebaseapp.com",
  projectId: "ecommerce-nextjs-ed19d",
  storageBucket: "ecommerce-nextjs-ed19d.appspot.com",
  messagingSenderId: "15925435889",
  appId: "1:15925435889:web:ca332a2747aa987d3cf850"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)

