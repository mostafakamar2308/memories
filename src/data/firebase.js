// Import the functions you need from the SDKs you need
import App from "../App";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Modal } from "../components/modal";
import { useNavigate } from "react-router-dom";

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
export let user;

export async function signInFn(email, pass) {
  console.log({ email, pass });
  await signInWithEmailAndPassword(auth, email, pass).then((userCreditials) => {
    console.log(userCreditials.user);
    console.log(`Welcome Back Master ${userCreditials.user.email}`);
    user = userCreditials.user;
    return user;
  });
}

export async function signUpFn(name, email, pass) {
  await createUserWithEmailAndPassword(auth, email, pass).then(
    (userCreditials) => {
      userCreditials.user.displayName = name;
      console.log(userCreditials.user);
      user = userCreditials.user;
      return user;
    }
  );
}
