import firebase from 'firebase';

import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD0Un2eet0VfUSS8ehbOr-v3g4vp12hZ9Q",
  authDomain: "mycommerce-81e0d.firebaseapp.com",
  projectId: "mycommerce-81e0d",
  storageBucket: "mycommerce-81e0d.appspot.com",
  messagingSenderId: "140200452947",
  appId: "1:140200452947:web:69b909ac6dbd05242937a6",
  measurementId: "G-GLS9R00BV6"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();


export { auth, db }