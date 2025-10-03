import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  onValue,
  serverTimestamp,
  remove,
} from "firebase/database";
import {
  getAuth,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// 🔥 Replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: "your-api-key-from-firebase-console",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id-from-firebase-console",
};

// Initialize Firebase
let app, database, auth;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
  auth = getAuth(app);
} catch (error) {
  console.warn("Firebase not configured properly:", error.message);
}

export { database, auth };

// Chat functions with error handling
export const sendMessage = async (user, message) => {
  try {
    if (!database) throw new Error("Firebase not configured");

    const chatRef = ref(database, "globalChat");
    await push(chatRef, {
      user,
      message,
      timestamp: serverTimestamp(),
      isSystem: false,
    });

    // Keep only last 100 messages to stay in free tier
    cleanupOldMessages();
  } catch (error) {
    console.error("Failed to send message:", error);
    throw error;
  }
};

// Auto-cleanup to stay FREE
const cleanupOldMessages = async () => {
  try {
    if (!database) return;

    const chatRef = ref(database, "globalChat");
    onValue(
      chatRef,
      (snapshot) => {
        const messages = [];
        snapshot.forEach((child) => {
          messages.push({ key: child.key, ...child.val() });
        });

        // Keep only latest 100 messages
        if (messages.length > 100) {
          const oldMessages = messages.slice(0, messages.length - 100);
          oldMessages.forEach((msg) => {
            remove(ref(database, `globalChat/${msg.key}`));
          });
        }
      },
      { onlyOnce: true }
    );
  } catch (error) {
    console.error("Cleanup failed:", error);
  }
};

export const listenToChat = (callback) => {
  try {
    if (!database) throw new Error("Firebase not configured");

    const chatRef = ref(database, "globalChat");
    return onValue(chatRef, (snapshot) => {
      const messages = [];
      snapshot.forEach((child) => {
        messages.push({
          id: child.key,
          ...child.val(),
        });
      });
      callback(messages.slice(-50)); // Last 50 messages
    });
  } catch (error) {
    console.error("Failed to listen to chat:", error);
    callback([]); // Return empty messages on error
    return () => {}; // Return empty unsubscribe function
  }
};

// Anonymous login for guests
export const loginAsGuest = () => {
  try {
    if (!auth) throw new Error("Firebase not configured");
    return signInAnonymously(auth);
  } catch (error) {
    console.error("Anonymous login failed:", error);
    throw error;
  }
};

// Google login
export const loginWithGoogle = () => {
  try {
    if (!auth) throw new Error("Firebase not configured");
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Google login failed:", error);
    throw error;
  }
};
