import React from "react";
import { Link } from "react-router-dom";
import { signInFn } from "../data/firebase";

export function SignInForm() {
  const [input, setInput] = React.useState({
    email: "",
    pass: "",
  });

  function updateInput(e) {
    setInput((old) => {
      return {
        ...old,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    signInFn(input.email, input.pass);
  }
  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={updateInput}
          required
        ></input>
        <label htmlFor="pass">password</label>
        <input
          type="password"
          name="pass"
          onChange={updateInput}
          required
        ></input>
        <input type="submit" onClick={handleSubmit} />
      </form>
      <p>
        Don't Have an Email, <Link to="/sign-up">Register</Link> Now{" "}
      </p>
    </div>
  );
}
