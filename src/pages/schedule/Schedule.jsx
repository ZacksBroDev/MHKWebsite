import React, { useState, useEffect } from "react";
import './schedule.css';
import Papa from 'papaparse';

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(true);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Load CSV data
  useEffect(() => {
    const loadScheduleData = async () => {
      try {
        const response = await fetch('/data/schedule.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const eventsData = {};
            results.data.forEach(row => {
              if (row.date && row.title) {
                const dateKey = row.date.trim();
                if (!eventsData[dateKey]) {
                  eventsData[dateKey] = [];
                }
                eventsData[dateKey].push({
                  title: row.title.trim(),
                  time: row.time ? row.time.trim() : '',
                  type: row.type ? row.type.trim() : 'class'
                });
              }
            });
            
            setEvents(eventsData);
            setLoading(false);
          },
          error: (error) => {
            console.error('CSV parsing error:', error);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error loading schedule:', error);
        setLoading(false);
      }
    };

    loadScheduleData();
  }, []);

  // Filter events for current month only
  const getCurrentMonthEvents = () => {
    const currentMonthKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
    
    const monthEvents = {};
    Object.keys(events).forEach(dateKey => {
      if (dateKey.startsWith(currentMonthKey)) {
        monthEvents[dateKey] = events[dateKey];
      }
    });
    
    // Sort dates
    const sortedDates = Object.keys(monthEvents).sort();
    const sortedEvents = {};
    sortedDates.forEach(date => {
      sortedEvents[date] = monthEvents[date];
    });
    
    return sortedEvents;
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

    // Add empty cells
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push(
        <li key={`empty-${i}`} className="empty-day"></li>
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events[dateString] || [];
      
      calendarDays.push(
        <li key={`day-${day}`} className="calendar-day">
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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

  if (loading) {
    return <div className="schedule">Loading schedule...</div>;
  }

  const currentMonthEvents = getCurrentMonthEvents();


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

      <div className="event-form">
        <h2>Add Event</h2>
        <input type="text" placeholder="Event Title" />
        <input type="time" placeholder="Event Time" />
        <select>
          <option value="class">Class</option>
          <option value="test">Test</option>
          <option value="tournament">Tournament</option>
        </select>
        <button>Add Event</button>
      </div>
      
      <div className="events-section">
          <h2>Events for {monthNames[currentMonth]} {currentYear}</h2>
          {Object.keys(currentMonthEvents).length === 0 ? (
            <p className="no-events-message">No events this month</p>
          ) : (
            <div className="events-list">
              {Object.entries(currentMonthEvents).map(([date, dayEvents]) => (
                <div key={date} className="date-group">
                  <h3 className="date-header">{formatDate(date)}</h3>
                  <div className="events-for-date">
                    {dayEvents.map((event, index) => (
                      <div key={index} className={`event-item event-${event.type}`}>
                        <div className="event-details">
                          <span className="event-title">{event.title}</span>
                          <span className="event-time">{event.time}</span>
                          <span className="event-type">{event.type}</span>
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
  );
};

export default Schedule;