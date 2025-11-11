import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj_yukn83iyyVy3MWZlfTIH8iVy3u-VuA",
  authDomain: "cciteam-caf99.firebaseapp.com",
  projectId: "cciteam-caf99",
  storageBucket: "cciteam-caf99.firebasestorage.app",
  messagingSenderId: "720167463425",
  appId: "1:720167463425:web:45e2088acc84cfaff22e00",
  measurementId: "G-EPTVC3RZ1K"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics only in client-side and if supported
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, analytics };

export default {
  app,
  auth,
  db,
  analytics
};
