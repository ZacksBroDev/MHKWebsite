import React from "react";

function Login() {
  return (
    <div className="logIn">
      <h2 className="SIL">Sign in</h2>
      <h4 className="cred-label">Enter your credentials to access your account</h4>
      <div>
          <div><label className="userLabel">User Name</label></div>
          <input className="userIn" type="text" placeholder="UserName" />
      </div>
      <div>
        <div><label className="userLabel">Password</label></div>
      <input className="pwIn" type="password" placeholder="Password" />
      </div>
      <div className="userLabel"><input type="checkbox" /><label>Remember Me</label></div>
      <div className="SUB"><button>Sign up</button></div>
      <a to="/home"/><button>home</button>
    </div>
  );
}
export default Login;
  