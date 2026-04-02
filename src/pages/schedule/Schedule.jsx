import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from '../../contexts/AuthContext';
import { API_ENDPOINTS } from '../../config/api';
import './schedule.css';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const toDateKey = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const getStatus = (event, registered) => {
  if (registered) {
    return 'joined';
  }
  if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
    return 'full';
  }
  if (event.maxParticipants && event.currentParticipants >= Math.floor(event.maxParticipants * 0.8)) {
    return 'waitlist';
  }
  return 'open';
};

const Schedule = () => {
  const { user, token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [message, setMessage] = useState({ text: '', type: '' });
  const [joinLoading, setJoinLoading] = useState({});

  const currentYear = currentMonthDate.getFullYear();
  const currentMonth = currentMonthDate.getMonth();

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.EVENTS);
      if (!response.ok) {
        setEvents([]);
        setMessage({ text: 'Unable to load events right now.', type: 'error' });
        return;
      }
      const data = await response.json();
      setEvents(data.events || []);
    } catch (error) {
      setEvents([]);
      setMessage({ text: 'Network error while loading events.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (!message.text) {
      return;
    }
    const timer = setTimeout(() => setMessage({ text: '', type: '' }), 4000);
    return () => clearTimeout(timer);
  }, [message]);

  const eventsByDate = useMemo(() => {
    const map = {};
    events.forEach((event) => {
      const key = toDateKey(new Date(event.date));
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(event);
    });

    Object.keys(map).forEach((key) => {
      map[key].sort((a, b) => a.time.localeCompare(b.time));
    });

    return map;
  }, [events]);

  const selectedDateKey = toDateKey(selectedDate);
  const selectedEvents = eventsByDate[selectedDateKey] || [];

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const list = [];
    const cursor = new Date(startDate);
    for (let i = 0; i < 42; i += 1) {
      list.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    return list;
  }, [currentMonth, currentYear]);

  const isRegistered = (event) => {
    if (!user || !event.participants) {
      return false;
    }
    return event.participants.some((participant) => participant.id === user.id);
  };

  const updateEventParticipation = async (eventId, type) => {
    if (!user || !token) {
      setMessage({ text: 'Please log in to manage RSVP.', type: 'error' });
      return;
    }

    setJoinLoading((prev) => ({ ...prev, [eventId]: true }));
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch(`${API_ENDPOINTS.EVENTS}/${eventId}/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const fallback = type === 'join' ? 'Unable to join class.' : 'Unable to leave class.';
        setMessage({ text: fallback, type: 'error' });
        return;
      }

      setMessage({ text: type === 'join' ? 'Class joined successfully.' : 'Class removed from your schedule.', type: 'success' });
      loadEvents();
    } catch (error) {
      setMessage({ text: 'Network issue while updating RSVP.', type: 'error' });
    } finally {
      setJoinLoading((prev) => ({ ...prev, [eventId]: false }));
    }
  };

  const previousMonth = () => {
    const next = new Date(currentMonthDate);
    next.setMonth(next.getMonth() - 1);
    setCurrentMonthDate(next);
  };

  const nextMonth = () => {
    const next = new Date(currentMonthDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonthDate(next);
  };

  if (loading) {
    return <div className="schedule-portal"><p className="schedule-loading">Loading schedule...</p></div>;
  }

  return (
    <section className="schedule-portal">
      <div className="schedule-shell">
        <header className="schedule-header">
          <div className="month-controls">
            <button onClick={previousMonth} className="month-btn">Prev</button>
            <h1>{MONTH_LABELS[currentMonth]} {currentYear}</h1>
            <button onClick={nextMonth} className="month-btn">Next</button>
          </div>
          <div className="portal-legend">
            <span className="legend open">Open</span>
            <span className="legend waitlist">Waitlist</span>
            <span className="legend full">Full</span>
            <span className="legend joined">Joined</span>
          </div>
        </header>

        <div className="schedule-layout">
          <aside className="calendar-pane">
            <div className="calendar-grid">
              {DAY_LABELS.map((day) => (
                <p key={day} className="day-label">{day}</p>
              ))}

              {calendarDays.map((day, index) => {
                const key = toDateKey(day);
                const dayEvents = eventsByDate[key] || [];
                const inMonth = day.getMonth() === currentMonth;
                const selected = key === selectedDateKey;
                return (
                  <button
                    key={`${key}-${index}`}
                    className={`day-cell ${inMonth ? '' : 'outside'} ${selected ? 'selected' : ''}`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <span className="day-number">{day.getDate()}</span>
                    <div className="chips">
                      {dayEvents.slice(0, 2).map((event, chipIndex) => (
                        <span className="event-chip" key={`${event.id || event._id || chipIndex}`}>{event.title}</span>
                      ))}
                      {dayEvents.length > 2 && <span className="event-chip overflow">+{dayEvents.length - 2}</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="agenda-pane">
            <div className="agenda-header">
              <h2>
                Agenda • {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </h2>
            </div>

            {selectedEvents.length === 0 ? (
              <div className="empty-state">
                <p>No classes scheduled for this date.</p>
                <small>Use this day for mobility, review, or drilling fundamentals.</small>
              </div>
            ) : (
              <div className="agenda-list">
                {selectedEvents.map((event, index) => {
                  const eventId = event.id || event._id || index;
                  const registered = isRegistered(event);
                  const status = getStatus(event, registered);
                  const isBusy = joinLoading[eventId];
                  return (
                    <article className={`agenda-card ${status}`} key={eventId}>
                      <div className="agenda-main">
                        <p className="agenda-time">{event.time}</p>
                        <h3>{event.title}</h3>
                        <p className="agenda-meta">{event.description || 'Structured class session'} • Type: {event.type || 'General'}</p>
                      </div>

                      <div className="agenda-side">
                        <span className={`status-pill ${status}`}>{status}</span>
                        <p className="capacity">
                          {event.currentParticipants || 0}
                          {event.maxParticipants && ` / ${event.maxParticipants}`} enrolled
                        </p>
                        {user ? (
                          registered ? (
                            <button
                              className="rsvp-btn leave"
                              onClick={() => updateEventParticipation(eventId, 'leave')}
                              disabled={isBusy}
                            >
                              {isBusy ? 'Updating...' : 'Leave'}
                            </button>
                          ) : (
                            <button
                              className="rsvp-btn join"
                              onClick={() => updateEventParticipation(eventId, 'join')}
                              disabled={isBusy || status === 'full'}
                            >
                              {isBusy ? 'Updating...' : status === 'full' ? 'Full' : 'Join'}
                            </button>
                          )
                        ) : (
                          <p className="guest-note">Log in to RSVP</p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </main>
        </div>

        {message.text && <p className={`portal-message ${message.type}`}>{message.text}</p>}
      </div>
    </section>
  );
};

export default Schedule;
