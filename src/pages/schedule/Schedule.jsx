import React, { useState, useEffect } from "react";
import './schedule.css';

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Load events from MongoDB
  const loadScheduleData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/events');
      
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
      } else {
        console.error('Failed to load events');
        setEvents([]);
      }
    } catch (error) {
      console.error('Error loading schedule:', error);
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
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => {
      const eventDate = new Date(event.date).toISOString().split('T')[0];
      return eventDate === dateStr;
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
      const dateKey = new Date(event.date).toISOString().split('T')[0];
      if (!groupedEvents[dateKey]) {
        groupedEvents[dateKey] = [];
      }
      groupedEvents[dateKey].push(event);
    });

    return groupedEvents;
  };

  if (loading) {
    return <div className="schedule"><div className="schedule-loading">Loading schedule...</div></div>;
  }

  const calendarDays = getCalendarDays();
  const currentMonthEvents = getCurrentMonthEvents();
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

              if (!isCurrentMonth) {
                return <li key={index} className="empty-day"></li>;
              }

              return (
                <li
                  key={index}
                  className={`calendar-day ${isToday ? 'today' : ''}`}
                >
                  <div className="date">{day.getDate()}</div>
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
                </li>
              );
            })}
          </ul>
        </div>

        {/* Events Section */}
        <div className="events-section">
          <h2>Events for {monthNames[currentMonth]} {currentYear}</h2>
          {!hasEvents ? (
            <div className="no-events">
              <p>No events scheduled for this month.</p>
            </div>
          ) : (
            <div className="events-list">
              {Object.entries(currentMonthEvents).map(([dateKey, dayEvents]) => (
                <div key={dateKey} className="date-group">
                  <div className="date-header">
                    {new Date(dateKey + 'T00:00:00').toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="events-for-date">
                    {dayEvents.map((event, index) => (
                      <div key={event.id || index} className="event-item">
                        <div className="event-details">
                          <div className="event-title">{event.title}</div>
                          <div className="event-time">⏰ {event.time}</div>
                          {event.description && (
                            <div className="event-description">{event.description}</div>
                          )}
                          <div className="event-type">Type: {event.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
