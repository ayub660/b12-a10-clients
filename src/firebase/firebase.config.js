import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwkaahI8Ufs4fy2f4pUDEw6PrqY_XHpks",
  authDomain: "reporting-portal-b4034.firebaseapp.com",
  projectId: "reporting-portal-b4034",
  storageBucket: "reporting-portal-b4034.appspot.com",
  messagingSenderId: "989443962850",
  appId: "1:989443962850:web:69b84e9ee96e4ff21f2bbb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
