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
  
  // New access code form
  const [newCodeForm, setNewCodeForm] = useState({
    code: '',
    description: '',
    maxUses: ''
  });

  // New event form
  const [newEventForm, setNewEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxParticipants: ''
  });

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

    try {
      const response = await fetch('http://localhost:3001/api/access-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          code: newCodeForm.code,
          description: newCodeForm.description,
          maxUses: newCodeForm.maxUses ? parseInt(newCodeForm.maxUses) : null
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setNewCodeForm({ code: '', description: '', maxUses: '' });
        fetchAccessCodes();
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to create access code');
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
          location: newEventForm.location,
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
          location: '',
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
          onClick={() => setActiveTab('access-codes')}
        >
          Access Codes
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => setActiveTab('events')}
        >
          Events
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {activeTab === 'access-codes' && (
        <div className="tab-content">
          <div className="section">
            <h2>Create New Access Code</h2>
            <form onSubmit={createAccessCode} className="create-form">
              <div className="form-row">
                <div className="code-input-group">
                  <input
                    type="text"
                    placeholder="Access Code (e.g., MARTIAL2025)"
                    value={newCodeForm.code}
                    onChange={(e) => setNewCodeForm({...newCodeForm, code: e.target.value})}
                    required
                  />
                  <button 
                    type="button" 
                    onClick={generateRandomCode}
                    className="generate-btn"
                    title="Generate random access code"
                  >
                    🎲 Generate
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={newCodeForm.description}
                  onChange={(e) => setNewCodeForm({...newCodeForm, description: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Max uses (optional)"
                  value={newCodeForm.maxUses}
                  onChange={(e) => setNewCodeForm({...newCodeForm, maxUses: e.target.value})}
                />
                <button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Code'}
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
                    <th>Max Uses</th>
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
                      <td>{code.maxUses || '∞'}</td>
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
                <input
                  type="text"
                  placeholder="Event Title"
                  value={newEventForm.title}
                  onChange={(e) => setNewEventForm({...newEventForm, title: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newEventForm.description}
                  onChange={(e) => setNewEventForm({...newEventForm, description: e.target.value})}
                />
                <input
                  type="date"
                  value={newEventForm.date}
                  onChange={(e) => setNewEventForm({...newEventForm, date: e.target.value})}
                  required
                />
                <input
                  type="time"
                  value={newEventForm.time}
                  onChange={(e) => setNewEventForm({...newEventForm, time: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newEventForm.location}
                  onChange={(e) => setNewEventForm({...newEventForm, location: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Max Participants (optional)"
                  value={newEventForm.maxParticipants}
                  onChange={(e) => setNewEventForm({...newEventForm, maxParticipants: e.target.value})}
                />
              </div>
              <button type="submit" disabled={loading} className="create-event-btn">
                {loading ? 'Creating...' : 'Create Event'}
              </button>
            </form>
          </div>

          <div className="section">
            <h2>Existing Events</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Participants</th>
                    <th>Created By</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event.id}>
                      <td>{event.title}</td>
                      <td>{new Date(event.date).toLocaleDateString()}</td>
                      <td>{event.time}</td>
                      <td>{event.location || '-'}</td>
                      <td>
                        {event.currentParticipants}
                        {event.maxParticipants && ` / ${event.maxParticipants}`}
                      </td>
                      <td>{event.createdBy}</td>
                    </tr>
                  ))}
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
