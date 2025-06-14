import React, { useState, useEffect } from "react";
import './schedule.css';

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [events, setEvents] = useState({});

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Sample events data - you can modify this or load from an API
  useEffect(() => {
    setEvents({
      '2025-01-15': [
        { title: 'Karate Class', time: '6:00 PM', type: 'class' },
        { title: 'Belt Test', time: '7:30 PM', type: 'test' }
      ],
      '2025-01-16': [
        { title: 'Kids Class', time: '4:00 PM', type: 'class' }
      ],
      '2025-01-20': [
        { title: 'Tournament', time: '10:00 AM', type: 'tournament' }
      ],
      // Add more events here
    });
  }, []);

  // Function to add a new event
  const addEvent = (dateString, event) => {
    setEvents(prevEvents => ({
      ...prevEvents,
      [dateString]: prevEvents[dateString] 
        ? [...prevEvents[dateString], event] 
        : [event]
    }));
  };

  // Function to get events for a specific date
  const getEventsForDate = (dateString) => {
    return events[dateString] || [];
  };

  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const calendarDays = [];

    // Add day headers
    daysOfWeek.forEach((day, index) => {
      calendarDays.push(
        <li key={`header-${index}`} className="day-header">
          <strong>{day}</strong>
        </li>
      );
    });

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push(
        <li key={`empty-${i}`} className="empty-day"></li>
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = getEventsForDate(dateString);
      
      calendarDays.push(
        <li key={`day-${day}`} className="calendar-day" onClick={() => handleDayClick(dateString)}>
          <time dateTime={dateString}>
            <div className="date">{day}</div>
            <div className="events">
              {dayEvents.map((event, index) => (
                <div key={index} className={`event event-${event.type}`}>
                  <div className="event-title">{event.title}</div>
                  <div className="event-time">{event.time}</div>
                </div>
              ))}
            </div>
          </time>
        </li>
      );
    }

    return calendarDays;
  };

  // Handle clicking on a day (could open a modal to add events)
  const handleDayClick = (dateString) => {
    const eventTitle = prompt('Enter event title:');
    const eventTime = prompt('Enter event time:');
    const eventType = prompt('Enter event type (class/test/tournament):') || 'class';
    
    if (eventTitle && eventTime) {
      addEvent(dateString, {
        title: eventTitle,
        time: eventTime,
        type: eventType
      });
    }
  };

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

  return (
    <div className="schedule">
      <div className="calendar-nav">
        <button className="nav-button" onClick={previousMonth}>‹</button>
        <h1>{monthNames[currentMonth]} {currentYear}</h1>
        <button className="nav-button" onClick={nextMonth}>›</button>
      </div>
      <ul className="schedule-list">
        {generateCalendarDays()}
      </ul>
    </div>
  );
};

export default Schedule;