// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-document.firebaseapp.com",
  projectId: "mern-document",
  storageBucket: "mern-document.firebasestorage.app",
  messagingSenderId: "822672867574",
  appId: "1:822672867574:web:8e014453a793a18e452cd7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
