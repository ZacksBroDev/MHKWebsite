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

  // Get current month events for the list view
  const getCurrentMonthEvents = () => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  if (loading) {
    return <div className="schedule">Loading schedule...</div>;
  }

  const calendarDays = getCalendarDays();
  const currentMonthEvents = getCurrentMonthEvents();

  return (
    <div className="schedule">
      <div className="calendar-nav">
        <button className="nav-button" onClick={previousMonth}>‹</button>
        <h1>{monthNames[currentMonth]} {currentYear}</h1>
        <button className="nav-button" onClick={nextMonth}>›</button>
      </div>
      
      <div className="calendar-grid">
        <div className="calendar-header">
          {daysOfWeek.map(day => (
            <div key={day} className="day-header">{day}</div>
          ))}
        </div>

        <div className="calendar-body">
          {calendarDays.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isCurrentMonth = day.getMonth() === currentMonth;
            const isToday = day.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`calendar-day ${
                  isCurrentMonth ? 'current-month' : 'other-month'
                } ${isToday ? 'today' : ''}`}
              >
                <div className="day-number">{day.getDate()}</div>
                <div className="day-events">
                  {dayEvents.slice(0, 2).map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className="event-item"
                      title={`${event.title} - ${event.time}`}
                    >
                      <span className="event-time">{event.time}</span>
                      <span className="event-title">{event.title}</span>
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="more-events">+{dayEvents.length - 2} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Events List */}
      <div className="events-list">
        <h2>Events for {monthNames[currentMonth]} {currentYear}</h2>
        {currentMonthEvents.length === 0 ? (
          <p className="no-events">No events scheduled for this month.</p>
        ) : (
          <div className="events-container">
            {currentMonthEvents.map((event, index) => (
              <div key={event.id || index} className="event-card">
                <div className="event-date">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div className="event-details">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-time">⏰ {event.time}</p>
                  {event.location && (
                    <p className="event-location">📍 {event.location}</p>
                  )}
                  {event.description && (
                    <p className="event-description">{event.description}</p>
                  )}
                  {event.maxParticipants && (
                    <p className="event-participants">
                      👥 {event.currentParticipants || 0}/{event.maxParticipants} participants
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
