import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./portalLanding.css";
import { API_ENDPOINTS } from "../../config/api";
import Footer from "../../components/layout/Footer/Footer";
import heroDojo from "../../assets/images/hero-dojo.png";

function PortalLanding() {
  const [weeklyEvents, setWeeklyEvents] = useState([]);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.EVENTS);
        if (!response.ok) return;
        const data = await response.json();
        const events = data.events || [];
        const now = new Date();
        const weekLimit = new Date(now);
        weekLimit.setDate(now.getDate() + 7);

        const upcoming = events
          .filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate >= now && eventDate <= weekLimit;
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 6);

        setWeeklyEvents(upcoming);
      } catch {
        setWeeklyEvents([]);
      }
    };

    fetchPreview();
  }, []);

  return (
    <div className="portal-landing">
      {/* ── Nav ── */}
      <header className="portal-nav">
        <div className="portal-nav-inner">
          <div className="portal-nav-brand">
            <span className="portal-wordmark">MHKTRAINING</span>
            <span className="portal-subline">Mile High Karate Academy</span>
          </div>
          <Link to="/login" className="portal-nav-signin">
            Sign In
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section
        className="portal-hero"
        style={{ backgroundImage: `url(${heroDojo})` }}
      >
        <div className="portal-hero-overlay" />
        <div className="portal-hero-inner">
          <p className="portal-kicker">Mile High Karate Academy</p>
          <h1>
            Train With Precision.
            <br />
            Progress With Purpose.
          </h1>
          <p className="portal-hero-sub">
            Your classes, curriculum, and training progress — organized into one
            focused member workspace.
          </p>
          <div className="portal-hero-actions">
            <Link to="/login" className="portal-cta-primary">
              Sign In
            </Link>
            <a href="#schedule-preview" className="portal-cta-secondary">
              Preview Schedule
            </a>
          </div>
        </div>

        {/* Decorative accent line */}
        <div className="portal-hero-accent" aria-hidden="true" />
      </section>

      {/* ── Product Highlights ── */}
      <section className="portal-highlights">
        <div className="portal-highlights-inner">
          <article className="portal-highlight-card">
            <span className="highlight-label">Schedule</span>
            <h3>Class-First Workflow</h3>
            <p>
              Scan upcoming sessions, check capacity, and stay on top of your
              weekly training blocks in real time.
            </p>
          </article>
          <article className="portal-highlight-card">
            <span className="highlight-label">Curriculum</span>
            <h3>Structured Progression</h3>
            <p>
              Follow defined training paths from Level 1 foundations through
              advanced forms and Black Belt conditionals.
            </p>
          </article>
          <article className="portal-highlight-card">
            <span className="highlight-label">Academy</span>
            <h3>Connected Operations</h3>
            <p>
              One portal for students, competitors, and families — aligned to
              academy standards and performance goals.
            </p>
          </article>
        </div>
      </section>

      {/* ── Schedule Preview ── */}
      <section className="portal-schedule" id="schedule-preview">
        <div className="portal-schedule-inner">
          <div className="portal-section-head">
            <div>
              <h2>Upcoming Sessions</h2>
              <p>Live class schedule for the next 7 days.</p>
            </div>
            <Link to="/login" className="portal-inline-link">
              Sign in for full schedule
            </Link>
          </div>

          <div className="portal-schedule-grid">
            {weeklyEvents.length > 0 ? (
              weeklyEvents.map((event, index) => (
                <article
                  key={event._id || index}
                  className="portal-session-card"
                >
                  <p className="portal-session-date">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <h3>{event.title}</h3>
                  <p className="portal-session-time">{event.time}</p>
                  <p className="portal-session-capacity">
                    {event.currentParticipants || 0}
                    {event.maxParticipants &&
                      ` / ${event.maxParticipants}`}{" "}
                    enrolled
                  </p>
                </article>
              ))
            ) : (
              <p className="portal-empty">
                Schedule data loading — sign in for full access.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Training Paths ── */}
      <section className="portal-paths">
        <div className="portal-paths-inner">
          <div className="portal-section-head">
            <div>
              <h2>Training Pathways</h2>
              <p>
                Structured progression from foundational technique to
                competitive discipline.
              </p>
            </div>
          </div>

          <div className="portal-paths-grid">
            <article className="portal-path-card">
              <span className="path-level">Level 1</span>
              <h3>Foundation Technique</h3>
              <p>
                Core forms, basic combinations, structure, and movement
                standards.
              </p>
            </article>
            <article className="portal-path-card">
              <span className="path-level">Level 2</span>
              <h3>Intermediate Progression</h3>
              <p>
                Expanded combinations, positional transitions, and pace control.
              </p>
            </article>
            <article className="portal-path-card">
              <span className="path-level">Level 3</span>
              <h3>Advanced Application</h3>
              <p>
                High-pressure execution, advanced forms, and competitive
                discipline.
              </p>
            </article>
            <article className="portal-path-card">
              <span className="path-level">Black Belt</span>
              <h3>Conditionals</h3>
              <p>
                Assessment standards, refinements, and elite consistency checks.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="portal-bottom-cta">
        <div className="portal-bottom-cta-inner">
          <h2>Ready to Train?</h2>
          <p>
            Sign in to access your schedule, curriculum, and training workspace.
          </p>
          <Link to="/login" className="portal-cta-primary">
            Enter Portal
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PortalLanding;
