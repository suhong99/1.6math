import { initializeApp, getApp, getApps } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTO_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGEING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID,
      });

export const auth = getAuth(app);
export const store = getFirestore(app);
