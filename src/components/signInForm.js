import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInFn } from "../data/firebase";

export function SignInForm() {
  const [input, setInput] = React.useState({
    email: "",
    pass: "",
  });
  const navigate = useNavigate();

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
    document.querySelector(".sign-in-form").classList.add("progressing");
    signInFn(input.email, input.pass).then(() => {
      navigate("/memories");
    });
  }
  return (
    <div className="form">
      <h1>Sign In</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={updateInput}
          required
        ></input>
        <label htmlFor="pass">Password</label>
        <input
          type="password"
          name="pass"
          id="pass"
          onChange={updateInput}
          required
        ></input>
        <input type="submit" className="sign-in-form" onClick={handleSubmit} />
      </form>
      <p>
        Don't Have an Email, <Link to="/sign-up">Register</Link> Now{" "}
      </p>
    </div>
  );
}
