import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB6iI6GCh8idCxzVNL_oLG09KbyZXsgkGQ",
    authDomain: "social-photo-7711.firebaseapp.com",
    projectId: "social-photo-7711",
    storageBucket: "social-photo-7711.appspot.com",
    messagingSenderId: "684007706346",
    appId: "1:684007706346:web:47b703619f452569315193",
    measurementId: "G-1VGYRMWQ3L"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage };