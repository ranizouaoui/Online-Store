// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC9U3wFhA1od2MeUo0Ml4NK6p8y9Kt9oxQ",
  authDomain: "tech-geeks-platform.firebaseapp.com",
  projectId: "tech-geeks-platform",
  storageBucket: "tech-geeks-platform.appspot.com",
  messagingSenderId: "370674725030",
  appId: "1:370674725030:web:c1974bdf49cfb5fe888467",
  measurementId: "G-RNMVDE40F7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db;
