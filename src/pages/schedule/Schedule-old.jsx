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

  // Load CSV data
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

  useEffect(() => {
    loadScheduleData();
  }, []);

  // Handle form input changes
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Change this line to include the full URL
      const response = await fetch('http://localhost:3001/api/add-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Event added successfully!');
        setFormData({ date: '', title: '', time: '', type: 'class' });
        setShowForm(false);
        loadScheduleData(); // Reload events
      } else {
        const errorData = await response.json();
        alert(`Error adding event: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Network error: ${error.message}`);
    }
  };

  // Filter events for current month only
  const getCurrentMonthEvents = () => {
    const currentMonthKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
    
    const monthEvents = {};
    Object.keys(events).forEach(dateKey => {
      if (dateKey.startsWith(currentMonthKey)) {
        monthEvents[dateKey] = events[dateKey];
      }
    });
    
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
        <button className="add-event-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Hide Form' : 'Add Event'}
        </button>
      </div>
      
      {/* Event Form */}
      {showForm && (
        <div className="event-form-container">
          <h2>Add New Event</h2>
          <form onSubmit={handleFormSubmit} className="event-form">
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Event Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Enter event title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Event Type:</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleFormChange}
              >
                <option value="class">Class</option>
                <option value="test">Belt Test</option>
                <option value="tournament">Tournament</option>
                <option value="seminar">Seminar</option>
                <option value="special">Special Event</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">
              Add Event
            </button>
          </form>
        </div>
      )}
      
      <div className="schedule-container">
        {/* Calendar */}
        <div className="calendar-section">
          <ul className="schedule-list">
            {generateCalendarDays()}
          </ul>
        </div>
        
        {/* Event List for Current Month */}
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
    </div>
  );
};

export default Schedule;