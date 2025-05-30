import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css';
const NavBar = () => {
  return (
    <>
    <header>
        <h4 className='title'>Martial Arts Classes at Mile High Karate</h4>
        <Link to='https://www.facebook.com/MHKThornton'><img src="/src/assets/img/FB-Logo.png" alt="FB-Logo" className='fb-logo'/></Link>
      </header>
      <nav>
        <img src="/src/assets/img/logo.png" alt="Mile High Karate Logo" className='mhk-logo'/>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/classes">Classes</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </>
  );
}
export default NavBar;