import { FirebaseConfig } from '@lubycon/utils';

export const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ?? '',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID ?? '',
  appId: process.env.FIREBASE_APP_ID ?? '',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID ?? '',
};

export default firebaseConfig;