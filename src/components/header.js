import logo from "../images/Memories.png";

export function Header() {
  return (
    <header>
      <div>
        <img src={logo}></img>
      </div>
      <button>
        <a href="##">Sign In</a>
      </button>
    </header>
  );
}
