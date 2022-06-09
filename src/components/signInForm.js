export function SignInForm() {
  return (
    <div className="form-container">
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email"></input>
        <label htmlFor="pass">password</label>
        <input type="password" name="pass"></input>
        <input type="submit" />
      </form>
    </div>
  );
}
