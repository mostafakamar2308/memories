// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

import { getFirestore, doc, setDoc } from "firebase/firestore";

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
const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export let user;

export async function signInFn(email, pass) {
  await signInWithEmailAndPassword(auth, email, pass).then((userCreditials) => {
    console.log(userCreditials.user);
    console.log(`Welcome Back Master ${userCreditials.user.email}`);
    user = userCreditials.user;
    return user;
  });
}

export async function signUpFn(name, email, pass) {
  await createUserWithEmailAndPassword(auth, email, pass)
    .then((userCreditials) => {
      userCreditials.user.displayName = name;
      console.log(userCreditials.user);
      user = userCreditials.user;
      return user;
    })
    .then((user) => {
      setDoc(doc(db, "users", user.uid), {
        displayName: name,
        memory: {},
        tags: [],
      });
      //collection(db, "users", user.uid, "memories");
      setDoc(
        doc(
          db,
          "users",
          user.uid,
          "memories",
          `${new Date().getUTCDate()}-${
            new Date().getMonth() + 1
          }-${new Date().getFullYear()}`
        ),
        {
          title: "First Memory",
          description: "You have 1 memory per day",
          date: "14-6-2022",
          img: "https://via.placeholder.com/350x150",
        }
      );
    })
    .then(() => {
      signInFn(email, pass);
    });
}
