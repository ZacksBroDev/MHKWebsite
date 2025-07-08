import React, { useState, useEffect } from "react";
import '/src/pages/home/home.css'
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';

function Home() {
  const { user, token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch users if current user is admin
  const fetchUsers = async () => {
    if (!user || user.role !== 'admin') return;
    
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/users', {
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

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchUsers();
    }
  }, [user, token]);

  // Admin view - shows users table
  if (user && user.role === 'admin') {
    return (
      <>
        <div className="admin-home">
          <h1>Admin Dashboard - User Management</h1>
          <div className="stats-cards">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p className="stat-number">{users.length}</p>
            </div>
            <div className="stat-card">
              <h3>Regular Users</h3>
              <p className="stat-number">{users.filter(u => u.role === 'user').length}</p>
            </div>
            <div className="stat-card">
              <h3>Admins</h3>
              <p className="stat-number">{users.filter(u => u.role === 'admin').length}</p>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : (
            <div className="users-table-container">
              <h2>Registered Users</h2>
              <table className="users-table">
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
                      <td className="username">{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone || '-'}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                          {user.role === 'admin' && ' 👑'}
                        </span>
                      </td>
                      <td className="access-code">{user.accessCodeUsed || '-'}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {users.length === 0 && (
                <p className="no-data">No users found.</p>
              )}
            </div>
          )}

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <Link to="/admin" className="action-btn primary">
                🛠️ Full Admin Dashboard
              </Link>
              <Link to="/schedule" className="action-btn secondary">
                📅 View Schedule
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Regular user view - shows current curriculum
  return (
    <>
      <h1>Current Curriculum</h1>
      <table>
      <tbody>
        <tr>
          <th>Class Name</th>
          <th>Instructor</th>
          <th>Time</th>
          <th>Location</th>
        </tr>
        <tr>
          <td>Karate Basics</td>
          <td>Sensei John</td>
          <td>5:00 PM</td>
          <td>Room 101</td>
        </tr>
        <tr>
          <td>Advanced Karate</td>
          <td>Sensei Jane</td>
          <td>6:00 PM</td>
          <td>Room 102</td>
        </tr>
        <tr>
          <td>Kids Karate</td>
          <td>Sensei Mike</td>
          <td>4:00 PM</td>
          <td>Room 103</td>
        </tr>
        <tr>
          <td>Self-Defense</td>
          <td>Sensei Sarah</td>
          <td>7:00 PM</td>
          <td>Room 104</td>
        </tr>
        <tr>
          <td>Kickboxing</td>
          <td>Sensei Alex</td>
          <td>8:00 PM</td>
          <td>Room 105</td>
        </tr>
        <tr>
          <td>Weapons Training</td>
          <td>Sensei Tom</td>
          <td>9:00 PM</td>
          <td>Room 106</td>
        </tr>
      </tbody>
      </table>
      <br></br>
      <br></br>
      <h1>Fighting Styles</h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <Link to='/level1' className={css.btn}>Level 1</Link>
          </div>
          <div className="col">
            <Link to='/level2' className={css.btn}>Level 2</Link>
          </div>
          <div className="col">
            <Link to='/level3' className={css.btn}>Level 3</Link>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Link to='/conditionals' className={css.btn}>Conditionals</Link>
          </div>
          <div className="col">
            <Link to='/deg1' className={css.btn}>1st Degree Black Belt</Link>
          </div>
          <div className="col">
            <Link to='/deg2' className={css.btn}>2nd Degree Black Belt</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
