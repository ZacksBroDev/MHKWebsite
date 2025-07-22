import React, { useState } from "react";
import { Link } from "react-router-dom";
import './NavBar.css';
import { useAuth } from '../contexts/AuthContext';

// Inside your NavBar component, add this:
const NavBar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false); // Close menu on logout
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header>        
        <div className="nav-user">
          <span>Welcome, {user?.username}! {user?.role === 'admin' && '👑'}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
        <nav className="navbar">
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
          <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
            <li><Link className="nav-link" to="/" onClick={closeMobileMenu}>Home</Link></li>
            <li><Link className="nav-link" to="/schedule" onClick={closeMobileMenu}>Schedule</Link></li>
            <li><Link className="nav-link" to="/contact" onClick={closeMobileMenu}>Contact</Link></li>
            {user?.role === 'admin' && (
              <li><Link className="nav-link admin-link" to="/admin" onClick={closeMobileMenu}>Admin</Link></li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};
export default NavBar;
