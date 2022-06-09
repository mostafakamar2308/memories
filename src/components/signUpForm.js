import { Link } from "react-router-dom";

export function SignUpForm() {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label htmlFor="Name">Your Name</label>
        <input name="Name"></input>
        <label htmlFor="email">Email</label>
        <input type="email" name="email"></input>
        <label htmlFor="pass">password</label>
        <input type="password" name="pass"></input>
        <input type="submit" />
      </form>
      <p>
        Have an Email? <Link to="/sign-in">Sign In</Link> Now{" "}
      </p>
    </div>
  );
}
