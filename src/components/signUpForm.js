import { Link, useNavigate } from "react-router-dom";
import React from "react";

import { signUpFn } from "../data/firebase";

export function SignUpForm() {
  const [input, setInput] = React.useState({
    name: "",
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
    signUpFn(input.name, input.email, input.pass).then(() => {
      navigate("/memories");
    });
  }
  return (
    <div className="form">
      <h1>Sign Up</h1>
      <form>
        <label htmlFor="name">Your Name</label>
        <input name="name" id="name" onChange={updateInput}></input>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={updateInput}
        ></input>
        <label htmlFor="pass">password</label>
        <input
          type="password"
          name="pass"
          id="pass"
          onChange={updateInput}
        ></input>
        <input type="submit" onClick={handleSubmit} />
      </form>
      <p>
        Have an Email? <Link to="/sign-in">Sign In</Link> Now{" "}
      </p>
    </div>
  );
}
