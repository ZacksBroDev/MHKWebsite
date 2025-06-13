import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css';
const NavBar = () => {
  return (
    <>
      <header>
        <nav>
          <ul className='nav-links'>
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/about">About</Link></li>
            <li><Link className="nav-link" to="/classes">Classes</Link></li>
            <li><Link className="nav-link" to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className="login-container">
          <Link to="/login" className="login-link">Login</Link>
        </div>
      </header>
    </>
  );
}
export default NavBar;