import { collection, addDoc } from 'firebase/firestore';
import { getFirebase } from './firebase';

export const subscribeToNewsletter = async (email: string) => {
  const { db } = getFirebase();
  
  try {
    await addDoc(collection(db, 'newsletter_subscribers'), {
      email,
      subscribedAt: new Date(),
      status: 'active'
    });
    return true;
  } catch (error) {
    console.error('Failed to subscribe:', error);
    throw error;
  }
};