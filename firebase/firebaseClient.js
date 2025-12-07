import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfLtYyM7kjG4D0EsRyPTWEfUVeppqPCU0",
  authDomain: "fiscalia-f0c9a.firebaseapp.com",
  projectId: "fiscalia-f0c9a",
  storageBucket: "fiscalia-f0c9a.firebasestorage.app",
  messagingSenderId: "217736999436",
  appId: "1:217736999436:web:ca436921f7dae38288b429",
  measurementId: "G-ZM6P89TV0Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Analytics solo navegador
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => yes && (analytics = getAnalytics(app)));
}

export { app, db, auth, googleProvider, analytics };
