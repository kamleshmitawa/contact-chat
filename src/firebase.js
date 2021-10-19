// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbLUN1Scy3vmyo7du_hgERvfyfHsZ4z4M",
  authDomain: "contacts-chat.firebaseapp.com",
  projectId: "contacts-chat",
  storageBucket: "contacts-chat.appspot.com",
  messagingSenderId: "599452150338",
  appId: "1:599452150338:web:d9d42cb1fb9665abc01bdb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export default getFirestore();

