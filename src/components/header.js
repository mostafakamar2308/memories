import { Link } from "react-router-dom";
import { user } from "../data/firebase";
import logo from "../images/Memories.png";
import photo from "../images/streamlinehq-book-essential-icons-48.PNG";
export function Header() {
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
          <img src={photo} />
        </div>
      )}
    </header>
  );
}
