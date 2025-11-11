import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Mile High Karate</h3>
          <p>3979 E 120th Ave, Thornton, CO 80233.</p>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📞 (555) 123-KICK</p>
          <p>✉️ info@milehighkarate.com</p>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://www.facebook.com/MHKThornton/" aria-label="Facebook">📘</a>
            <a href="https://www.instagram.com/explore/locations/49737510/mile-high-karate/" aria-label="Instagram">📷</a>
            <a href="https://x.com/MileHighKarate" aria-label="Twitter">🐦</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Mile High Karate. All rights reserved. Developed by ZackFullStack</p>
      </div>
    </footer>
  );
};

export default Footer;
