import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAY5CxGftMCoZ3eEOiQn4CPdkDbNCHUpfM",
  authDomain: "raizing-sovereign.firebaseapp.com",
  projectId: "raizing-sovereign",
  storageBucket: "raizing-sovereign.firebasestorage.app",
  messagingSenderId: "373973634773",
  appId: "1:373973634773:web:dc183d5a092fb289e21c5c",
  measurementId: "G-KXFMGXVZE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign Out Error:", error);
    throw error;
  }
};