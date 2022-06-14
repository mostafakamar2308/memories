import { Link } from "react-router-dom";
import { db, user } from "../data/firebase";
import logo from "../images/Memories.png";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
export function Header() {
  const [userName, setUserName] = useState("");

  getUserData();
  async function getUserData() {
    if (user) {
      let userRef = doc(db, "users", user.uid);
      let userNamePro = await getDoc(userRef);
      setUserName(userNamePro.data().displayName);
    }
  }
  useEffect(() => {
    getUserData();
  });

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
          <h3> {userName}</h3>
        </div>
      )}
    </header>
  );
}
