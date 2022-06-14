import { Link } from "react-router-dom";
import { db, user } from "../data/firebase";
import logo from "../images/Memories.png";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useRef } from "react";
export function Header() {
  const userSnap = useRef(0);
  async function getUserData() {
    if (user) {
      let userRef = doc(db, "users", user.uid);
      userSnap.current = await getDoc(userRef);
      console.log(userSnap.current.data());
      return userSnap.current.data();
    }
  }
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <header>
      <div>
        <img src={logo}></img>
      </div>
      {!user ? (
        <button
          onClick={() => {
            window.location.href = "http://localhost:3000/sign-in";
          }}
        >
          <Link to="/sign-in">Sign In</Link>
        </button>
      ) : (
        <div className="user-photo">
          <h3>{userSnap.current.data().displayName}</h3>
        </div>
      )}
    </header>
  );
}
