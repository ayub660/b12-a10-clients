// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwkaahI8Ufs4fy2f4pUDEw6PrqY_XHpks",
  authDomain: "reporting-portal-b4034.firebaseapp.com",
  projectId: "reporting-portal-b4034",
  storageBucket: "reporting-portal-b4034.appspot.com",
  messagingSenderId: "989443962850",
  appId: "1:989443962850:web:69b84e9ee96e4ff21f2bbb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;
