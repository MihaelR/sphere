import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyiGk8H-St2n6ZQg9KfQ9NTkGfbIJZ7lw",
  authDomain: "moonr-sphere-chat.firebaseapp.com",
  projectId: "moonr-sphere-chat",
  storageBucket: "moonr-sphere-chat.firebasestorage.app",
  messagingSenderId: "353740380953",
  appId: "1:353740380953:web:2815d1014e5b759c6ec388",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
