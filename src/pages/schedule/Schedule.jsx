/**
 * Schedule Component
 * 
 * Interactive calendar component with expandable days and hierarchical event organization.
 * Features clickable calendar days with modal expansion and collapsible event sections.
 * Handles event registration (join/leave) with authentication integration.
 * 
 * @component
 * @requires React
 * @requires AuthContext
 * @requires api
 * 
 * @example
 * <Schedule />
 */

import React, { useState, useEffect } from "react";
import { useAuth } from '../../contexts/AuthContext';
import { API_ENDPOINTS } from '../../config/api';
import { Button } from '../../components';
import './schedule.css';

const Schedule = () => {
  const { user, token } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinLoading, setJoinLoading] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedWeeks, setExpandedWeeks] = useState(new Set());
  const [expandedDays, setExpandedDays] = useState(new Set());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Load events from MongoDB with enhanced HTTP status code error handling
  const loadScheduleData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.EVENTS);
      
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
      } else {
        // Handle specific HTTP status codes
        let errorMessage;
        switch (response.status) {
          case 401:
            errorMessage = 'Authentication required to view events.';
            break;
          case 403:
            errorMessage = 'Access denied to events.';
            break;
          case 404:
            errorMessage = 'Events service not found.';
            break;
          case 429:
            errorMessage = 'Too many requests. Please try again later.';
            break;
          case 500:
            errorMessage = 'Server error loading events.';
            break;
          case 502:
            errorMessage = 'Events service temporarily unavailable.';
            break;
          case 503:
            errorMessage = 'Events service maintenance in progress.';
            break;
          default:
            errorMessage = `Failed to load events (${response.status}).`;
        }
        console.error('Failed to load events:', errorMessage);
        setMessage({ text: errorMessage, type: 'error' });
        setEvents([]);
      }
    } catch (error) {
      console.error('Error loading schedule:', error);
      setMessage({ text: 'Network error loading events. Please check your connection.', type: 'error' });
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScheduleData();
  }, []);

  // Navigation functions
  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Get calendar data
  const getCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    const dateStr = date.getFullYear() + '-' + 
                   String(date.getMonth() + 1).padStart(2, '0') + '-' + 
                   String(date.getDate()).padStart(2, '0');
    return events.filter(event => {
      const eventDate = new Date(event.date);
      const eventDateStr = eventDate.getFullYear() + '-' + 
                          String(eventDate.getMonth() + 1).padStart(2, '0') + '-' + 
                          String(eventDate.getDate()).padStart(2, '0');
      return eventDateStr === dateStr;
    });
  };

  // Get current month events grouped by date for the list view
  const getCurrentMonthEvents = () => {
    const monthEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    // Group events by date
    const groupedEvents = {};
    monthEvents.forEach(event => {
      const eventDate = new Date(event.date);
      const dateKey = eventDate.getFullYear() + '-' + 
                     String(eventDate.getMonth() + 1).padStart(2, '0') + '-' + 
                     String(eventDate.getDate()).padStart(2, '0');
      if (!groupedEvents[dateKey]) {
        groupedEvents[dateKey] = [];
      }
      groupedEvents[dateKey].push(event);
    });

    return groupedEvents;
  };

  // Get current month events organized by weeks
  const getCurrentMonthEventsByWeeks = () => {
    const monthEvents = getCurrentMonthEvents();
    const weeks = {};

    Object.entries(monthEvents).forEach(([dateKey, dayEvents]) => {
      const date = new Date(dateKey + 'T00:00:00');
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
      
      const weekKey = startOfWeek.toISOString().split('T')[0];
      const weekLabel = `Week of ${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      
      if (!weeks[weekKey]) {
        weeks[weekKey] = {
          label: weekLabel,
          startDate: startOfWeek,
          days: {},
          totalEvents: 0
        };
      }
      
      weeks[weekKey].days[dateKey] = dayEvents;
      weeks[weekKey].totalEvents += dayEvents.length;
    });

    // Sort weeks by start date
    return Object.entries(weeks)
      .sort(([, a], [, b]) => a.startDate - b.startDate)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  };

  // Toggle week expansion
  const toggleWeekExpansion = (weekKey) => {
    const newExpandedWeeks = new Set(expandedWeeks);
    if (expandedWeeks.has(weekKey)) {
      newExpandedWeeks.delete(weekKey);
      // Also collapse all days in this week
      const weekData = getCurrentMonthEventsByWeeks()[weekKey];
      if (weekData) {
        Object.keys(weekData.days).forEach(dayKey => {
          expandedDays.delete(dayKey);
        });
        setExpandedDays(new Set(expandedDays));
      }
    } else {
      newExpandedWeeks.add(weekKey);
    }
    setExpandedWeeks(newExpandedWeeks);
  };

  // Toggle day expansion
  const toggleDayExpansion = (dayKey) => {
    const newExpandedDays = new Set(expandedDays);
    if (expandedDays.has(dayKey)) {
      newExpandedDays.delete(dayKey);
    } else {
      newExpandedDays.add(dayKey);
    }
    setExpandedDays(newExpandedDays);
  };

  // Join event function
  const joinEvent = async (eventId) => {
    if (!user || !token) {
      setMessage({ text: 'Please log in to join events', type: 'error' });
      return;
    }

    setJoinLoading(prev => ({ ...prev, [eventId]: true }));
    setMessage({ text: '', type: '' });

    try {
      console.log('Joining event:', eventId, 'with token:', token ? 'present' : 'missing');
      
      const response = await fetch(`${API_ENDPOINTS.EVENTS}/${eventId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('Join response:', response.status, data);

      if (response.ok) {
        setMessage({ text: 'Successfully joined event!', type: 'success' });
        // Reload events to update participant count
        loadScheduleData();
      } else {
        // Handle specific HTTP status codes
        let errorMessage;
        switch (response.status) {
          case 400:
            errorMessage = data.error || 'Invalid request to join event.';
            break;
          case 401:
            errorMessage = 'Session expired. Please log in again.';
            break;
          case 403:
            errorMessage = 'You are not authorized to join this event.';
            break;
          case 404:
            errorMessage = 'Event not found.';
            break;
          case 409:
            errorMessage = 'You are already registered for this event.';
            break;
          case 429:
            errorMessage = 'Too many requests. Please try again later.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          case 502:
            errorMessage = 'Event service temporarily unavailable.';
            break;
          case 503:
            errorMessage = 'Event service maintenance in progress.';
            break;
          default:
            errorMessage = data.error || `Failed to join event (${response.status}).`;
        }
        setMessage({ text: errorMessage, type: 'error' });
      }
    } catch (error) {
      console.error('Join event error:', error);
      setMessage({ text: 'Network error. Please check your connection and try again.', type: 'error' });
    } finally {
      setJoinLoading(prev => ({ ...prev, [eventId]: false }));
    }
  };

  // Leave event function
  const leaveEvent = async (eventId) => {
    if (!user || !token) {
      setMessage({ text: 'Please log in to leave events', type: 'error' });
      return;
    }

    setJoinLoading(prev => ({ ...prev, [eventId]: true }));
    setMessage({ text: '', type: '' });

    try {
      console.log('Leaving event:', eventId, 'with token:', token ? 'present' : 'missing');
      
      const response = await fetch(`${API_ENDPOINTS.EVENTS}/${eventId}/leave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('Leave response:', response.status, data);

      if (response.ok) {
        setMessage({ text: 'Successfully left event!', type: 'success' });
        // Reload events to update participant count
        loadScheduleData();
      } else {
        // Handle specific HTTP status codes
        let errorMessage;
        switch (response.status) {
          case 400:
            errorMessage = data.error || 'Invalid request to leave event.';
            break;
          case 401:
            errorMessage = 'Session expired. Please log in again.';
            break;
          case 403:
            errorMessage = 'You are not authorized to leave this event.';
            break;
          case 404:
            errorMessage = 'Event not found.';
            break;
          case 409:
            errorMessage = 'You are not registered for this event.';
            break;
          case 429:
            errorMessage = 'Too many requests. Please try again later.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          case 502:
            errorMessage = 'Event service temporarily unavailable.';
            break;
          case 503:
            errorMessage = 'Event service maintenance in progress.';
            break;
          default:
            errorMessage = data.error || `Failed to leave event (${response.status}).`;
        }
        setMessage({ text: errorMessage, type: 'error' });
      }
    } catch (error) {
      console.error('Leave event error:', error);
      setMessage({ text: 'Network error. Please check your connection and try again.', type: 'error' });
    } finally {
      setJoinLoading(prev => ({ ...prev, [eventId]: false }));
    }
  };

  // Check if user is already registered for an event
  const isUserRegistered = (event) => {
    if (!user || !event.participants) {
      return false;
    }
    return event.participants.some(participant => participant.id === user.id);
  };

  // Handle calendar day click to expand/collapse
  const handleDayClick = (date) => {
    const dayEvents = getEventsForDate(date);
    // Only allow expansion if there are events
    if (dayEvents.length === 0) return;
    
    const dateStr = date.getFullYear() + '-' + 
                   String(date.getMonth() + 1).padStart(2, '0') + '-' + 
                   String(date.getDate()).padStart(2, '0');
    if (expandedDay === dateStr) {
      setExpandedDay(null); // Collapse if already expanded
    } else {
      setExpandedDay(dateStr); // Expand this day
    }
  };

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Handle escape key to close expanded view
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && expandedDay) {
        setExpandedDay(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [expandedDay]);

  if (loading) {
    return <div className="schedule"><div className="schedule-loading">Loading schedule...</div></div>;
  }

  const calendarDays = getCalendarDays();
  const currentMonthEvents = getCurrentMonthEvents();
  const currentMonthEventsByWeeks = getCurrentMonthEventsByWeeks();
  const hasEvents = Object.keys(currentMonthEvents).length > 0;

  return (
    <div className="schedule">
      <div className="schedule-container">
        <div className="calendar-section">
          <div className="calendar-nav">
            <button className="nav-button" onClick={previousMonth}>‹</button>
            <h1>{monthNames[currentMonth]} {currentYear}</h1>
            <button className="nav-button" onClick={nextMonth}>›</button>
          </div>
          
          <ul className="schedule-list">
            {daysOfWeek.map(day => (
              <li key={day} className="day-header">{day}</li>
            ))}
            {calendarDays.map((day, index) => {
              const dayEvents = getEventsForDate(day);
              const isCurrentMonth = day.getMonth() === currentMonth;
              const isToday = day.toDateString() === new Date().toDateString();
              const dateStr = day.getFullYear() + '-' + 
                             String(day.getMonth() + 1).padStart(2, '0') + '-' + 
                             String(day.getDate()).padStart(2, '0');
              const isExpanded = expandedDay === dateStr;

              if (!isCurrentMonth) {
                return <li key={index} className="empty-day"></li>;
              }

              return (
                <li
                  key={index}
                  className={`calendar-day ${isToday ? 'today' : ''} ${isExpanded ? 'expanded' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  <div className="date">{day.getDate()}</div>
                  
                  {!isExpanded ? (
                    // Collapsed view - show limited events
                    <div className="events">
                      {dayEvents.slice(0, 2).map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className="event"
                          title={`${event.title} - ${event.time}`}
                        >
                          <strong>{event.title}</strong>
                          <time>{event.time}</time>
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="more-events">+{dayEvents.length - 2} more</div>
                      )}
                    </div>
                  ) : (
                    // Expanded view - show all events with full details
                    <div className="events-expanded">
                      <div className="expanded-header">
                        <h3>
                          {day.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </h3>
                        <button className="close-expanded" onClick={(e) => {
                          e.stopPropagation();
                          setExpandedDay(null);
                        }}>✕</button>
                      </div>
                      
                      {dayEvents.length === 0 ? (
                        <div className="no-events-expanded">No events scheduled for this day</div>
                      ) : (
                        <div className="events-list-expanded">
                          {dayEvents.map((event, eventIndex) => (
                            <div key={event.id || eventIndex} className="event-item-expanded">
                              <div className="event-details-expanded">
                                <div className="event-title-expanded">{event.title}</div>
                                <div className="event-time-expanded">⏰ {event.time}</div>
                                {event.description && (
                                  <div className="event-description-expanded">{event.description}</div>
                                )}
                                <div className="event-type-expanded">Type: {event.type || 'General'}</div>
                                
                                {/* Participant Info */}
                                <div className="event-participants-expanded">
                                  👥 {event.currentParticipants || 0}
                                  {event.maxParticipants && ` / ${event.maxParticipants}`} participants
                                </div>
                              </div>
                              
                              {/* Join/Leave Actions */}
                              {user ? (
                                <div className="event-actions-expanded">
                                  {isUserRegistered(event) ? (
                                    <button
                                      className="leave-button-expanded"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        leaveEvent(event.id);
                                      }}
                                      disabled={joinLoading[event.id]}
                                    >
                                      {joinLoading[event.id] ? 'Leaving...' : '✖ Leave'}
                                    </button>
                                  ) : (
                                    <button
                                      className="join-button-expanded"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        joinEvent(event.id);
                                      }}
                                      disabled={
                                        joinLoading[event.id] || 
                                        (event.maxParticipants && event.currentParticipants >= event.maxParticipants)
                                      }
                                    >
                                      {joinLoading[event.id] 
                                        ? 'Joining...' 
                                        : event.maxParticipants && event.currentParticipants >= event.maxParticipants
                                        ? '🚫 Full'
                                        : '✓ Join'
                                      }
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <div className="login-prompt-expanded">
                                  <a href="/login" className="login-link-expanded">Login to join</a>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Events Section - Hierarchical Collapsible */}
        <div className="events-section">
          <h2>Events for {monthNames[currentMonth]} {currentYear}</h2>
          {!hasEvents ? (
            <div className="no-events">
              <p>No events scheduled for this month.</p>
            </div>
          ) : (
            <div className="events-list-hierarchical">
              {Object.entries(currentMonthEventsByWeeks).map(([weekKey, weekData]) => (
                <div key={weekKey} className="week-group">
                  {/* Week Header - Clickable */}
                  <div 
                    className={`week-header ${expandedWeeks.has(weekKey) ? 'expanded' : ''}`}
                    onClick={() => toggleWeekExpansion(weekKey)}
                  >
                    <div className="week-info">
                      <span className="week-toggle">{expandedWeeks.has(weekKey) ? '▼' : '▶'}</span>
                      <span className="week-label">{weekData.label}</span>
                      <span className="week-count">({weekData.totalEvents} events)</span>
                    </div>
                  </div>

                  {/* Week Content - Collapsible Days */}
                  {expandedWeeks.has(weekKey) && (
                    <div className="week-content">
                      {Object.entries(weekData.days).map(([dateKey, dayEvents]) => (
                        <div key={dateKey} className="day-group-hierarchical">
                          {/* Day Header - Clickable */}
                          <div 
                            className={`day-header-hierarchical ${expandedDays.has(dateKey) ? 'expanded' : ''}`}
                            onClick={() => toggleDayExpansion(dateKey)}
                          >
                            <div className="day-info">
                              <span className="day-toggle">{expandedDays.has(dateKey) ? '▼' : '▶'}</span>
                              <span className="day-label">
                                {new Date(dateKey + 'T00:00:00').toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                              <span className="day-count">({dayEvents.length} events)</span>
                            </div>
                          </div>

                          {/* Day Content - Events */}
                          {expandedDays.has(dateKey) && (
                            <div className="day-content">
                              {dayEvents.map((event, index) => (
                                <div key={event.id || index} className="event-item-hierarchical">
                                  <div className="event-details-hierarchical">
                                    <div className="event-title-hierarchical">{event.title}</div>
                                    <div className="event-time-hierarchical">⏰ {event.time}</div>
                                    {event.description && (
                                      <div className="event-description-hierarchical">{event.description}</div>
                                    )}
                                    <div className="event-type-hierarchical">Type: {event.type || 'General'}</div>
                                    
                                    {/* Participant Info */}
                                    <div className="event-participants-hierarchical">
                                      👥 {event.currentParticipants || 0}
                                      {event.maxParticipants && ` / ${event.maxParticipants}`} participants
                                    </div>
                                  </div>
                                  
                                  {/* Join/Leave Actions */}
                                  {user ? (
                                    <div className="event-actions-hierarchical">
                                      {isUserRegistered(event) ? (
                                        <button
                                          className="leave-button-hierarchical"
                                          onClick={() => leaveEvent(event.id)}
                                          disabled={joinLoading[event.id]}
                                        >
                                          {joinLoading[event.id] ? 'Leaving...' : '✖ Leave Event'}
                                        </button>
                                      ) : (
                                        <button
                                          className="join-button-hierarchical"
                                          onClick={() => joinEvent(event.id)}
                                          disabled={
                                            joinLoading[event.id] || 
                                            (event.maxParticipants && event.currentParticipants >= event.maxParticipants)
                                          }
                                        >
                                          {joinLoading[event.id] 
                                            ? 'Joining...' 
                                            : event.maxParticipants && event.currentParticipants >= event.maxParticipants
                                            ? '🚫 Event Full'
                                            : '✓ Join Event'
                                          }
                                        </button>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="login-prompt-hierarchical">
                                      <a href="/login" className="login-link-hierarchical">Login to join events</a>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
