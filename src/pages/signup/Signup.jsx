import React from "react";
 const Signup = () => {
  return (
    <>
      <h1>Sign Up</h1>
      <form action="some" className="login-form">
        <h2 className="cred-label">Enter your credentials to make your account</h2>
        <input type="name" placeholder="First Name"/>
        <input className="pwIn" type="name" placeholder="Last Name"/>
        <input type="email" placeholder="Email"/>
        <input type="password" placeholder="Password"/>
        <button id="signUp" className="submit-button">SIGN UP</button>
      </form>
    </>
  );
}
export default Signup;