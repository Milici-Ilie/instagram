// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"; //⏭⏭[Firebase and NextAuth]⏭⏭
import { getStorage } from "firebase/storage"; //⏭⏭[Firebase and NextAuth]⏭⏭
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//⏭⏭[Firebase and NextAuth]⏭⏭ this configuration contains the API_KEY and all the others data in the '.env.local', to not make them accesible to everyone ==== also note that all the data are taken from the Firebase server, regarding to this connection I mean, there at the Settings Project you will find all you need to connect the Firebase with the app, also you'l need the Google Cloud
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); // ternary operator= if there is no 'getApps' than 'initializeApp otherwise simply 'getApp''
const db = getFirestore(); // db=data base
const storage = getStorage();

export { app, db, storage };
