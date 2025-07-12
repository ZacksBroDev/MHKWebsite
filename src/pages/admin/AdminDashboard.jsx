import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('access-codes');
  const [accessCodes, setAccessCodes] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // SMS functionality
  const [smsForm, setSmsForm] = useState({
    phoneNumber: '',
    accessCode: '',
    userName: ''
  });
  const [showSmsModal, setShowSmsModal] = useState(false);
  
  // New access code form
  const [newCodeForm, setNewCodeForm] = useState({
    code: '',
    description: ''
  });

  // New event form
  const [newEventForm, setNewEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    maxParticipants: ''
  });

  // Calendar navigation state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'year'

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchAccessCodes();
      fetchUsers();
      fetchEvents();
    }
  }, [user]);

  const fetchAccessCodes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/access-codes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setAccessCodes(data.accessCodes);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to fetch access codes');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to fetch users');
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/events');
      const data = await response.json();
      if (response.ok) {
        setEvents(data.events);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to fetch events');
    }
  };

  const createAccessCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('Creating access code with data:', {
        code: newCodeForm.code,
        description: newCodeForm.description
      });
      console.log('Using token:', token);

      const response = await fetch('http://localhost:3001/api/access-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          code: newCodeForm.code,
          description: newCodeForm.description
        })
      });

      const data = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', data);
      
      if (response.ok) {
        setNewCodeForm({ code: '', description: '' });
        setSuccess('Access code created successfully!');
        fetchAccessCodes();
      } else {
        setError(data.error || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Create access code error:', error);
      setError(`Failed to create access code: ${error.message}`);
    }
    
    setLoading(false);
  };

  const toggleAccessCode = async (id, isActive) => {
    try {
      const response = await fetch(`http://localhost:3001/api/access-codes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !isActive })
      });

      if (response.ok) {
        fetchAccessCodes();
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to update access code');
    }
  };

  const generateRandomCode = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/generate-access-code', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setNewCodeForm({...newCodeForm, code: data.code});
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to generate random code');
    }
  };

  const createEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newEventForm.title,
          description: newEventForm.description,
          date: newEventForm.date,
          time: newEventForm.time,
          maxParticipants: newEventForm.maxParticipants ? parseInt(newEventForm.maxParticipants) : null
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setNewEventForm({
          title: '',
          description: '',
          date: '',
          time: '',
          maxParticipants: ''
        });
        fetchEvents();
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to create event');
    }
    
    setLoading(false);
  };

  const sendAccessCodeSMS = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3001/api/send-access-code-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          phoneNumber: smsForm.phoneNumber,
          accessCode: smsForm.accessCode,
          userName: smsForm.userName
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccess(`SMS sent successfully to ${data.phoneNumber}`);
        setSmsForm({ phoneNumber: '', accessCode: '', userName: '' });
        setShowSmsModal(false);
      } else {
        setError(data.error || 'Failed to send SMS');
      }
    } catch (error) {
      console.error('Send SMS error:', error);
      setError('Failed to send SMS: ' + error.message);
    }
    
    setLoading(false);
  };

  // Calendar navigation functions
  const getFilteredEvents = () => {
    if (viewMode === 'year') {
      return events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === selectedDate.getFullYear();
      });
    } else {
      return events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === selectedDate.getFullYear() &&
               eventDate.getMonth() === selectedDate.getMonth();
      });
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + direction);
    } else {
      newDate.setFullYear(newDate.getFullYear() + direction);
    }
    setSelectedDate(newDate);
  };

  const getDisplayPeriod = () => {
    if (viewMode === 'year') {
      return selectedDate.getFullYear().toString();
    } else {
      return selectedDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-dashboard">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You must be an admin to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user.username}</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'access-codes' ? 'active' : ''}
          onClick={() => {
            setActiveTab('access-codes');
            setError('');
            setSuccess('');
          }}
        >
          Access Codes
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => {
            setActiveTab('users');
            setError('');
            setSuccess('');
          }}
        >
          Users
        </button>
        <button 
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => {
            setActiveTab('events');
            setError('');
            setSuccess('');
          }}
        >
          Events
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {activeTab === 'access-codes' && (
        <div className="tab-content">
          <div className="section">
            <h2>Create New Access Code</h2>

            <form onSubmit={createAccessCode} className="create-form">
              <div className='code-input'>
                <input type="text" placeholder="Access Code (e.g., MARTIAL2025)" value={newCodeForm.code}
                onChange={(e) => {
                  setNewCodeForm({...newCodeForm, code: e.target.value});
                  setError('');
                  setSuccess(''); }} required/>
                <button type="button" onClick={generateRandomCode} className="generate-btn" title="Generate random access code">🎲 Generate</button>
              </div>
              <div className='desc-input'>
                <input type="text" placeholder="Description (optional)" value={newCodeForm.description} onChange={(e) => setNewCodeForm({...newCodeForm, description: e.target.value})}/>
                <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Code'}</button>
              </div>
            </form>

            <h2>Send Access Code via SMS</h2>
            <form onSubmit={sendAccessCodeSMS} className="create-form">
              <div className="form-row">
                <input
                  type="tel"
                  placeholder="Phone Number (e.g., 1234567890)"
                  value={smsForm.phoneNumber}
                  onChange={(e) => setSmsForm({...smsForm, phoneNumber: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Access Code"
                  value={smsForm.accessCode}
                  onChange={(e) => setSmsForm({...smsForm, accessCode: e.target.value.toUpperCase()})}
                  required
                />
                <input
                  type="text"
                  placeholder="User Name (optional)"
                  value={smsForm.userName}
                  onChange={(e) => setSmsForm({...smsForm, userName: e.target.value})}
                />
                <button type="submit" disabled={loading}>
                  {loading ? 'Sending...' : '📱 Send SMS'}
                </button>
              </div>
            </form>
          </div>

          <div className="section">
            <h2>Existing Access Codes</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Description</th>
                    <th>Used</th>
                    <th>Status</th>
                    <th>Created By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accessCodes.map(code => (
                    <tr key={code.id}>
                      <td className="code-text">{code.code}</td>
                      <td>{code.description || '-'}</td>
                      <td>{code.usedCount}</td>
                      <td>
                        <span className={`status ${code.isActive ? 'active' : 'inactive'}`}>
                          {code.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>{code.createdBy}</td>
                      <td>
                        <button 
                          onClick={() => toggleAccessCode(code.id, code.isActive)}
                          className={`toggle-btn ${code.isActive ? 'deactivate' : 'activate'}`}
                        >
                          {code.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="tab-content">
          <div className="section">
            <h2>Registered Users</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Access Code Used</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone || '-'}</td>
                      <td>
                        <span className={`role ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{user.accessCodeUsed || '-'}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="tab-content">
          <div className="section">
            <h2>Create New Event</h2>
            <form onSubmit={createEvent} className="create-form">
              <div className="form-grid">
                <input className='title'
                  type="text"
                  placeholder="Event Title"
                  value={newEventForm.title}
                  onChange={(e) => setNewEventForm({...newEventForm, title: e.target.value})}
                  required
                />
                <input className='participants'
                  type="number"
                  placeholder="Max Participants (optional)"
                  value={newEventForm.maxParticipants}
                  onChange={(e) => setNewEventForm({...newEventForm, maxParticipants: e.target.value})}
                />

                <input className='date'
                  type="date"
                  value={newEventForm.date}
                  onChange={(e) => setNewEventForm({...newEventForm, date: e.target.value})}
                  required
                />
                <input className='time'
                  type="time"
                  value={newEventForm.time}
                  onChange={(e) => setNewEventForm({...newEventForm, time: e.target.value})}
                  required
                />
                 <input className='desc'
                  type="text"
                  placeholder="Description"
                  value={newEventForm.description}
                  onChange={(e) => setNewEventForm({...newEventForm, description: e.target.value})}
                />
                
              </div>
              <button type="submit" disabled={loading} className="create-event-btn">
                {loading ? 'Creating...' : 'Create Event'}
              </button>
            </form>
          </div>

          <div className="section">
            <h2>Existing Events</h2>
            
            {/* Calendar Navigation */}
            <div className="calendar-nav">
              <div className="nav-controls">
                <button 
                  className="nav-btn" 
                  onClick={() => navigateMonth(-1)}
                  title={viewMode === 'month' ? 'Previous month' : 'Previous year'}
                >
                  ◀
                </button>
                <div className="current-period">
                  <span className="period-text">{getDisplayPeriod()}</span>
                  <div className="view-mode-toggle">
                    <button 
                      className={`mode-btn ${viewMode === 'month' ? 'active' : ''}`}
                      onClick={() => setViewMode('month')}
                    >
                      Month
                    </button>
                    <button 
                      className={`mode-btn ${viewMode === 'year' ? 'active' : ''}`}
                      onClick={() => setViewMode('year')}
                    >
                      Year
                    </button>
                  </div>
                </div>
                <button 
                  className="nav-btn" 
                  onClick={() => navigateMonth(1)}
                  title={viewMode === 'month' ? 'Next month' : 'Next year'}
                >
                  ▶
                </button>
              </div>
              
              <div className="event-summary">
                <span className="event-count">
                  {getFilteredEvents().length} event{getFilteredEvents().length !== 1 ? 's' : ''} 
                  {viewMode === 'month' ? ' this month' : ' this year'}
                </span>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Participants</th>
                    <th>Created By</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredEvents().map(event => (
                    <tr key={event.id}>
                      <td>{event.title}</td>
                      <td>{new Date(event.date).toLocaleDateString()}</td>
                      <td>{event.time}</td>
                      <td>
                        {event.currentParticipants}
                        {event.maxParticipants && ` / ${event.maxParticipants}`}
                      </td>
                      <td>{event.createdBy}</td>
                    </tr>
                  ))}
                  {getFilteredEvents().length === 0 && (
                    <tr>
                      <td colSpan="5" className="no-events">
                        No events found for {getDisplayPeriod().toLowerCase()}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
