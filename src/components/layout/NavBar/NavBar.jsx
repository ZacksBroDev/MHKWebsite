/**
 * NavBar Component
 * 
 * Main navigation component with responsive mobile menu.
 * Displays different navigation options based on user role and authentication status.
 * Includes logout functionality and mobile-friendly hamburger menu.
 * 
 * @component
 * @returns {JSX.Element} Navigation bar component
 * 
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Role-based navigation (admin gets admin link)
 * - User authentication status display
 * - Logout functionality
 * - Auto-close mobile menu on navigation
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import './NavBar.css';
import { useAuth } from '../../../contexts/AuthContext';

/**
 * NavBar Component - Main site navigation
 * @returns {JSX.Element} Navigation bar with responsive menu
 */
const NavBar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Handles user logout and closes mobile menu
   */
  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false); // Close menu on logout
  };

  /**
   * Toggles mobile menu visibility
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * Closes mobile menu (used when navigating)
   */
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
