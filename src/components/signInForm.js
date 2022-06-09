import { Link } from "react-router-dom";

export function SignInForm() {
  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email"></input>
        <label htmlFor="pass">password</label>
        <input type="password" name="pass"></input>
        <input type="submit" />
      </form>
      <p>
        Don't Have an Email, <Link to="/sign-up">Register</Link> Now{" "}
      </p>
    </div>
  );
}
