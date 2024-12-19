import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCw5IzGHcBshM3xnkvgtr320eQebR9tn5I",
  authDomain: "furever-bedda.firebaseapp.com",
  projectId: "furever-bedda",
  storageBucket: "furever-bedda.firebasestorage.app",
  messagingSenderId: "911202300816",
  appId: "1:911202300816:web:c5c4e98092bd4f390a3915",
  measurementId: "G-J28J7WPVH9"
};

let firebaseInitialized = false;
let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export const initializeFirebase = () => {
  if (typeof window === 'undefined') return null;
  if (firebaseInitialized) return app;

  try {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    auth = getAuth(app);
    firebaseInitialized = true;
    return app;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    return null;
  }
};

export const getFirebase = () => {
  try {
    if (!firebaseInitialized) {
      initializeFirebase();
    }

    return { auth: auth! };
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error;
  }
};