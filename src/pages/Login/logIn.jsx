import React from "react";
import { Link } from "react-router-dom";
import './logIn.css';

function Login() {
  return (
    <>
      <h1>Login</h1>
      <form action="some" className="login-form">
        <h2 className="cred-label">Enter your credentials to access your account</h2>
        <input className="userIn" type="text" placeholder="UserName"/>
        <input className="pwIn" type="password" placeholder="Password"/>
        <input type="password" placeholder="Desk Password" />
        <Link to="/signup"><button id="signUp" className="submit-button">SIGN UP</button></Link>
        <button id="logIn" className="submit-button">LOG IN</button>
      </form>
    </>
  );
}
export default Login;
  