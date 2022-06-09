// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZNfoMxHrmbnja_yRW4RuM0C7GJsDFyL0",
  authDomain: "people-memories.firebaseapp.com",
  projectId: "people-memories",
  storageBucket: "people-memories.appspot.com",
  messagingSenderId: "1052020437108",
  appId: "1:1052020437108:web:032c3b69db5fbcad676121",
  measurementId: "G-TGKZHTDB30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
