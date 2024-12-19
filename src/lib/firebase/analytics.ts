import { getAnalytics, logEvent } from 'firebase/analytics';
import { getFirebaseApp } from './config';

const getAnalyticsInstance = () => {
  try {
    const app = getFirebaseApp();
    return app ? getAnalytics(app) : null;
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
    return null;
  }
};

export const logMemorialCreated = (memorialId: string) => {
  try {
    const analytics = getAnalyticsInstance();
    if (!analytics) return;

    logEvent(analytics, 'memorial_created', {
      memorial_id: memorialId
    });
  } catch (error) {
    console.warn('Failed to log memorial creation:', error);
  }
};

export const logMemorialViewed = (memorialId: string) => {
  try {
    const analytics = getAnalyticsInstance();
    if (!analytics) return;

    logEvent(analytics, 'memorial_viewed', {
      memorial_id: memorialId
    });
  } catch (error) {
    console.warn('Failed to log memorial view:', error);
  }
};

export const logTributeAdded = (memorialId: string) => {
  try {
    const analytics = getAnalyticsInstance();
    if (!analytics) return;

    logEvent(analytics, 'tribute_added', {
      memorial_id: memorialId
    });
  } catch (error) {
    console.warn('Failed to log tribute addition:', error);
  }
};