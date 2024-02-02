// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-7f43f.firebaseapp.com",
  projectId: "mern-blog-7f43f",
  storageBucket: "mern-blog-7f43f.appspot.com",
  messagingSenderId: "124133054136",
  appId: "1:124133054136:web:ee84ff79df695b448fc64d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);