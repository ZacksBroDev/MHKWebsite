import React from 'react';
import { Link } from 'react-router-dom';
import './academy.css';

const Academy = () => {
  return (
    <section className="academy-page">
      <div className="academy-shell">
        <header className="academy-hero">
          <p className="academy-kicker">About the Academy</p>
          <h1>Engineered for disciplined progression, not drop-in chaos.</h1>
          <p>
            Mile High Karate is built around standards: technical coaching, measurable advancement, and a culture that rewards consistency.
          </p>
        </header>

        <section className="academy-grid">
          <article className="academy-card">
            <h2>Training Philosophy</h2>
            <p>
              Fundamentals are non-negotiable. We layer mechanics, timing, and controlled pressure in phases so students build skill that holds up under stress.
              The goal is simple: cleaner execution, better decisions, and visible progress every training cycle.
            </p>
          </article>

          <article className="academy-card">
            <h2>Program Tracks</h2>
            <ul>
              <li>Level 1: Build movement quality, balance, and discipline.</li>
              <li>Level 2: Connect combinations with sharper control.</li>
              <li>Level 3: Train advanced pressure and competitive readiness.</li>
              <li>Black Belt: Master conditionals and degree progression standards.</li>
            </ul>
          </article>

          <article className="academy-card academy-contact-cta">
            <h2>Need member support?</h2>
            <p>
              For membership, billing, attendance, and account help, contact the support desk directly so your request is routed immediately.
            </p>
            <Link to="/contact">Contact Support</Link>
          </article>
        </section>
      </div>
    </section>
  );
};

export default Academy;
