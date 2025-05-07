import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDt0oaHS2C_cuzj3SVDOhY76L0N_L5SnBg",
  authDomain: "lux-portfolio.firebaseapp.com",
  projectId: "lux-portfolio",
  storageBucket: "lux-portfolio.appspot.com",
  messagingSenderId: "106844717198",
  appId: "1:106844717198:web:2f86b7d8f58ef711f309df",
  measurementId: "G-GHYL1X02XL"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app, "gs://lux-portfolio.firebasestorage.app");
export const db = getFirestore(app);
export default app; 