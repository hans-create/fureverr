import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, type Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCw5IzGHcBshM3xnkvgtr320eQebR9tn5I",
  authDomain: "furever-bedda.firebaseapp.com",
  projectId: "furever-bedda",
  storageBucket: "furever-bedda.firebasestorage.app",
  messagingSenderId: "911202300816",
  appId: "1:911202300816:web:c5c4e98092bd4f390a3915",
  measurementId: "G-J28J7WPVH9"
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export const initFirebase = () => {
  if (typeof window === 'undefined') return null;
  
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  }
  
  return app;
};

export const getFirebaseAuth = () => {
  if (typeof window === 'undefined') return null;
  
  if (!auth) {
    const app = initFirebase();
    if (!app) return null;
    
    auth = getAuth(app);
    setPersistence(auth, browserLocalPersistence).catch(console.error);
  }
  
  return auth;
};

export const getFirebaseDb = () => {
  const app = initFirebase();
  return app ? getFirestore(app) : null;
};

export const getFirebaseStorage = () => {
  const app = initFirebase();
  return app ? getStorage(app) : null;
};