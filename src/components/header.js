import { Link } from "react-router-dom";
import arrow from "../images/downward-arrow.png";
import { auth, db, user } from "../data/firebase";
import logo from "../images/lgoo.png";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
export function Header() {
  const [userName, setUserName] = useState("");
  const [signOutVisible, setSignOutVisible] = useState(false);

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
        <img className="logo" src={logo}></img>
      </div>
      {!user ? (
        <button
          onClick={() => {
            document.querySelector("#sign-in-header").click();
          }}
        >
          <Link id="sign-in-header" to="/sign-in">
            Sign In
          </Link>
        </button>
      ) : (
        <div className="user-photo">
          <h3
            onClick={() => {
              setSignOutVisible((old) => !old);
            }}
          >
            {userName} <img src={arrow} width="20px" alt="arrow" />
          </h3>
          {signOutVisible && (
            <div className="user-menu">
              <button
                onClick={() => {
                  signOut(auth).then(
                    () => (window.location.href = "http://localhost:3000/")
                  );
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
