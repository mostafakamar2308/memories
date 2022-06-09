import { Link } from "react-router-dom";
import logo from "../images/Memories.png";

export function Header() {
  return (
    <header>
      <div>
        <img src={logo}></img>
      </div>
      <button
        onClick={() => {
          window.location.href = "http://localhost:3000/sign-in";
        }}
      >
        <Link to="/sign-in">Sign In</Link>
      </button>
    </header>
  );
}
