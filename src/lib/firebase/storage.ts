import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { getFirebaseApp } from './config';

const getStorageInstance = () => {
  try {
    const app = getFirebaseApp();
    return app ? getStorage(app) : null;
  } catch (error) {
    console.warn('Storage initialization failed:', error);
    return null;
  }
};

export const uploadFile = async (file: File, path: string): Promise<string> => {
  const storage = getStorageInstance();
  if (!storage) throw new Error('Storage can only be accessed in the browser');

  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteFile = async (path: string): Promise<void> => {
  const storage = getStorageInstance();
  if (!storage) throw new Error('Storage can only be accessed in the browser');

  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error: any) {
    throw new Error(error.message);
  }