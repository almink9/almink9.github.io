import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAKZfmhhb0bSdqHntlEPhvfgngU1gtj7Gw",
    authDomain: "instagram-app-be82c.firebaseapp.com",
    projectId: "instagram-app-be82c",
    storageBucket: "instagram-app-be82c.appspot.com",
    messagingSenderId: "45400850658",
    appId: "1:45400850658:web:1384602a1018881a2cdebb"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };