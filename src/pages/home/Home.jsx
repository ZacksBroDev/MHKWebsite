/**
 * Home Component
 * 
 * Main dashboard page displaying today's events and admin user management.
 * Shows different content based on user role (admin vs regular user).
 * Fetches and displays real-time event data and user information.
 * 
 * @component
 * @returns {JSX.Element} Home page with events and user management
 * 
 * Features:
 * - Today's events display with real-time filtering
 * - Admin user management (if user has admin role)
 * - Loading states and error handling
 * - Local date formatting to avoid timezone issues
 * - Responsive design with conditional content
 */

import React, { useState, useEffect } from "react";
import './home.css'
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { API_ENDPOINTS } from '../../config/api';

/**
 * Home Component - Main landing page after authentication
 * @returns {JSX.Element} Home page component
 */
function Home() {
  const { user, token } = useAuth();
  const [users, setUsers] = useState([]);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Fetches all users from the API (admin only)
   * Updates the users state with fetched data
   */
  const fetchUsers = async () => {
    if (!user || user.role !== 'admin') {
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.USERS, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      } else {
        setError('Failed to load users');
      }
    } catch (error) {
      setError('Error loading users');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches today's events and filters them by current date
   * Uses local date formatting to avoid timezone conversion issues
   */
  const fetchTodaysEvents = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.EVENTS);
      
      if (response.ok) {
        const data = await response.json();
        const events = data.events || [];
        
        // Filter events for today
        const today = new Date();
        const todayStr = today.getFullYear() + '-' + 
                        String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                        String(today.getDate()).padStart(2, '0');
        
        const todaysClasses = events.filter(event => {
          const eventDate = new Date(event.date);
          const eventDateStr = eventDate.getFullYear() + '-' + 
                              String(eventDate.getMonth() + 1).padStart(2, '0') + '-' + 
                              String(eventDate.getDate()).padStart(2, '0');
          return eventDateStr === todayStr;
        }).sort((a, b) => {
          // Sort by time
          const timeA = a.time.replace(/[^\d:]/g, '');
          const timeB = b.time.replace(/[^\d:]/g, '');
          return timeA.localeCompare(timeB);
        });
        
        setTodaysEvents(todaysClasses);
      }
    } catch (error) {
      console.error('Error loading today\'s events:', error);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchUsers();
    }
    fetchTodaysEvents();
    
    // Set up interval to refresh events every hour
    const interval = setInterval(fetchTodaysEvents, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [user, token]);

  // Get current date for display
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Regular user view - shows current curriculum
  return (
    <div className="background">
      <h1>Today's Schedule - {getCurrentDate()}</h1>
      {todaysEvents.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Time</th>
              <th>Type</th>
              <th>Participants</th>
            </tr>
            {todaysEvents.map((event, index) => (
              <tr key={event._id || index}>
                <td>{event.title}</td>
                <td>{event.time}</td>
                <td style={{ textTransform: 'capitalize' }}>{event.type}</td>
                <td>
                  {event.currentParticipants || 0}
                  {event.maxParticipants && ` / ${event.maxParticipants}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2rem', color: 'var(--text)' }}>
          <p>No classes scheduled for today.</p>
          <p>Check the <Link to="/schedule" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>schedule page</Link> for upcoming events!</p>
        </div>
      )}
      <br></br>
      <br></br>
      <h1>Forms and Combos</h1>
      <div className="container">
        <div className="col">
          <Link to='/level1' className="belt" id="lev1">
            <div className="deg" style={{ backgroundColor: '#000' }}></div>
          </Link>
        </div>
        <div className="col">
          <Link to='/level2' className="belt" id="lev2">
            <div className="deg" style={{ backgroundColor: '#000' }}></div>
            <div className="deg" style={{ backgroundColor: '#000' }}></div>
          </Link>
        </div>
        <div className="col">
          <Link to='/level3' className="belt" id="lev3">
            <div className="deg" style={{ backgroundColor: '#000' }}></div>
            <div className="deg" style={{ backgroundColor: '#000' }}></div>
            <div className="deg" style={{ backgroundColor: '#000' }}></div>
          </Link>
        </div>
        <div className="col">
          <Link to='/conditionals' className="belt" id="cond">
          <div className="deg" style={{ backgroundColor: 'white' }}></div>
          </Link>
        </div>
        <div className="col">
          <Link to='/deg2' className="belt" id="deg1">
            <div className="deg"></div>
          </Link>
        </div>
        <div className="col">
          <Link to='/deg2' className="belt" id="deg2">
            <div className="deg"></div>
            <div className="deg"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
