import React, { useState, useEffect } from "react";
import './home.css'
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

  // Regular user view - shows current curriculum
  return (
    <div className="background">
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
        <div className="col">
          <Link to='/level1' className="btn">Level 1</Link>
        </div>
        <div className="col">
          <Link to='/level2' className="btn">Level 2</Link>
        </div>
        <div className="col">
          <Link to='/level3' className="btn">Level 3</Link>
        </div>
        <div className="col">
          <Link to='/conditionals' className="btn">Conditionals</Link>
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
