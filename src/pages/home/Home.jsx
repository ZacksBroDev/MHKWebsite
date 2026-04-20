import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { useAuth } from "../../contexts/AuthContext";
import { API_ENDPOINTS } from "../../config/api";

function Home() {
  const { user, token } = useAuth();
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [weeklyEvents, setWeeklyEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.EVENTS);
      if (!response.ok) {
        setTodaysEvents([]);
        setWeeklyEvents([]);
        return;
      }

      const data = await response.json();
      const events = data.events || [];
      const now = new Date();
      const todayStr = now.toISOString().slice(0, 10);
      const weekLimit = new Date(now);
      weekLimit.setDate(now.getDate() + 7);

      const todayItems = events
        .filter((event) => {
          const eventDate = new Date(event.date).toISOString().slice(0, 10);
          return eventDate === todayStr;
        })
        .sort((a, b) => a.time.localeCompare(b.time));

      const upcoming = events
        .filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate >= now && eventDate <= weekLimit;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 8);

      setTodaysEvents(todayItems);
      setWeeklyEvents(upcoming);
    } catch {
      setTodaysEvents([]);
      setWeeklyEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user, token]);

  const upcomingPrimary = todaysEvents[0] || weeklyEvents[0];

  return (
    <section className="home-redesign">
      <div className="home-shell">
        <section className="hero-band">
          <div className="hero-copy">
            <p className="hero-kicker">Mile High Karate Academy Portal</p>
            <h1>Train With Precision. Compete With Confidence.</h1>
            <p>
              Your classes, progression, and curriculum are now organized into
              one performance-first member workspace.
            </p>
            <div className="hero-actions">
              <Link to="/schedule" className="primary-cta">
                Open Schedule
              </Link>
              <Link to="/level1" className="secondary-cta">
                Continue Training Path
              </Link>
            </div>
          </div>

          <aside className="hero-upcoming">
            <h2>Next Session</h2>
            {upcomingPrimary ? (
              <div className="upcoming-card">
                <p className="upcoming-time">{upcomingPrimary.time}</p>
                <h3>{upcomingPrimary.title}</h3>
                <p className="upcoming-meta">
                  {new Date(upcomingPrimary.date).toLocaleDateString()} •{" "}
                  {upcomingPrimary.currentParticipants || 0}
                  {upcomingPrimary.maxParticipants &&
                    ` / ${upcomingPrimary.maxParticipants}`}{" "}
                  enrolled
                </p>
                <Link to="/schedule" className="inline-link">
                  View details
                </Link>
              </div>
            ) : (
              <p className="empty-inline">
                No upcoming classes found. Check back later today.
              </p>
            )}
          </aside>
        </section>

        <section className="member-stats">
          <article>
            <p>Today</p>
            <strong>{todaysEvents.length} Classes</strong>
          </article>
          <article>
            <p>Next 7 Days</p>
            <strong>{weeklyEvents.length} Sessions</strong>
          </article>
          <article>
            <p>Current Track</p>
            <strong>Level Progression</strong>
          </article>
          <article>
            <p>Portal Focus</p>
            <strong>Member Performance</strong>
          </article>
        </section>

        <section className="upcoming-strip">
          <div className="section-head">
            <h2>Upcoming Training Blocks</h2>
            <Link to="/schedule">Open full calendar</Link>
          </div>

          <div className="upcoming-grid">
            {weeklyEvents.length > 0 ? (
              weeklyEvents.map((event, index) => (
                <article key={event._id || index} className="session-card">
                  <p className="session-date">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <h3>{event.title}</h3>
                  <p className="session-time">{event.time}</p>
                  <p className="session-capacity">
                    Capacity {event.currentParticipants || 0}
                    {event.maxParticipants && ` / ${event.maxParticipants}`}
                  </p>
                </article>
              ))
            ) : (
              <p className="empty-inline">No sessions scheduled this week.</p>
            )}
          </div>
        </section>

        <section className="pathways-grid">
          <div className="section-head">
            <h2>Training Pathways</h2>
            <p>Choose the lane that matches your current progression stage.</p>
          </div>

          <div className="paths">
            <Link to="/level1" className="path-card">
              <span>Level 1</span>
              <h3>Foundation Technique</h3>
              <p>
                Core forms, basic combinations, structure, and movement
                standards.
              </p>
            </Link>
            <Link to="/level2" className="path-card">
              <span>Level 2</span>
              <h3>Intermediate Progression</h3>
              <p>
                Expanded combinations, positional transitions, and pace control.
              </p>
            </Link>
            <Link to="/level3" className="path-card">
              <span>Level 3</span>
              <h3>Advanced Application</h3>
              <p>
                High-pressure execution, advanced forms, and competitive
                discipline.
              </p>
            </Link>
            <Link to="/conditionals" className="path-card">
              <span>Black Belt</span>
              <h3>Conditionals</h3>
              <p>
                Assessment standards, refinements, and elite consistency checks.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Home;
