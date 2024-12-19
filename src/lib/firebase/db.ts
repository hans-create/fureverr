import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { getFirebaseApp } from './config';
import type { Memorial } from '../types/memorial';

const getDbInstance = () => {
  try {
    const app = getFirebaseApp();
    return app ? getFirestore(app) : null;
  } catch (error) {
    console.warn('Firestore initialization failed:', error);
    return null;
  }
};

// Collection references
const MEMORIALS_COLLECTION = 'memorials';

export const createMemorial = async (memorial: Omit<Memorial, 'id' | 'createdAt'>) => {
  const db = getDbInstance();
  if (!db) throw new Error('Database can only be accessed in the browser');

  try {
    const memorialsRef = collection(db, MEMORIALS_COLLECTION);
    const docRef = await addDoc(memorialsRef, {
      ...memorial,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMemorial = async (id: string): Promise<Memorial | null> => {
  const db = getDbInstance();
  if (!db) throw new Error('Database can only be accessed in the browser');

  try {
    const docRef = doc(db, MEMORIALS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Memorial;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserMemorials = async (userId: string): Promise<Memorial[]> => {
  const db = getDbInstance();
  if (!db) throw new Error('Database can only be accessed in the browser');

  try {
    const memorialsRef = collection(db, MEMORIALS_COLLECTION);
    const q = query(
      memorialsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Memorial[];
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getPublicMemorials = async (): Promise<Memorial[]> => {
  const db = getDbInstance();
  if (!db) throw new Error('Database can only be accessed in the browser');

  try {
    const memorialsRef = collection(db, MEMORIALS_COLLECTION);
    const q = query(
      memorialsRef,
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Memorial[];
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateMemorial = async (id: string, data: Partial<Memorial>) => {
  const db = getDbInstance();
  if (!db) throw new Error('Database can only be accessed in the browser');

  try {
    const docRef = doc(db, MEMORIALS_COLLECTION, id);
    await updateDoc(docRef, data);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteMemorial = async (id: string) => {
  const db = getDbInstance();
  if (!db) throw new Error('Database can only be accessed in the browser');

  try {
    const docRef = doc(db, MEMORIALS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error: any) {
    throw new Error(error.message);
  }