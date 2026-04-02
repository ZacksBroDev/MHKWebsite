import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-brand">
          <h3>MHKTRAINING</h3>
          <p>Competitive martial arts academy portal for members, fighters, and families committed to disciplined progress.</p>
        </div>

        <div className="footer-column">
          <h4>Product</h4>
          <Link to="/">Dashboard</Link>
          <Link to="/schedule">Schedule</Link>
          <Link to="/level1">Training</Link>
          <Link to="/academy">Academy</Link>
          <Link to="/contact">Support</Link>
        </div>

        <div className="footer-column">
          <h4>Training Paths</h4>
          <Link to="/level1">Level 1 Foundation</Link>
          <Link to="/level2">Level 2 Progression</Link>
          <Link to="/level3">Level 3 Advanced</Link>
          <Link to="/conditionals">Black Belt Conditionals</Link>
        </div>

        <div className="footer-column">
          <h4>Academy</h4>
          <p>3979 E 120th Ave, Thornton, CO 80233</p>
          <p>(555) 123-KICK</p>
          <p>support@milehighkarate.com</p>
        </div>
      </div>

      <div className="footer-subrow">
        <p>© {new Date().getFullYear()} Mile High Karate. All rights reserved.</p>
        <p>Portal build: MHKTraining v2</p>
      </div>
    </footer>
  );
};

export default Footer;
