// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Modal } from "../components/modal";

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
const auth = getAuth(app);

export function signInFn(email, pass) {
  console.log({ email, pass });
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCreditials) => {
      console.log(userCreditials.user);
      console.log(`Welcome Back Master ${userCreditials.user.email}`);
      return userCreditials.user;
    })
    .catch((err) => {
      return <Modal msg={err} />;
    });
}
