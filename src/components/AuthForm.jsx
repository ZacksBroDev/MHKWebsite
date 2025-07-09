import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './AuthForm.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdminSignup, setIsAdminSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    accessCode: '',
    adminPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [accessCodeStatus, setAccessCodeStatus] = useState('');
  const [accessCodeValid, setAccessCodeValid] = useState(null);

  const { login, signup, adminSignup } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    
    // Validate access code when it changes
    if (e.target.name === 'accessCode') {
      setAccessCodeStatus('');
      setAccessCodeValid(null);
      if (e.target.value.trim()) {
        validateAccessCode(e.target.value.trim(), formData.email, formData.username);
      }
    }
  };

  const validateAccessCode = async (accessCode, email, username) => {
    if (!accessCode) return;

    try {
      const response = await fetch('http://localhost:3001/api/validate-access-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessCode, email, username }),
      });

      const data = await response.json();

      if (data.valid) {
        setAccessCodeStatus('✅ Valid access code');
        setAccessCodeValid(true);
      } else {
        setAccessCodeStatus(`❌ ${data.error}`);
        setAccessCodeValid(false);
      }
    } catch (error) {
      setAccessCodeStatus('❌ Error validating access code');
      setAccessCodeValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let result;
    if (isLogin) {
      result = await login(formData.username, formData.password);
    } else if (isAdminSignup) {
      // Admin signup
      const username = `${formData.firstName.toLowerCase()}${formData.lastName.toLowerCase()}`;
      result = await adminSignup(username, formData.email, formData.password, formData.adminPassword, formData.firstName, formData.lastName);
    } else {
      // Regular user signup (requires access code)
      const username = `${formData.firstName.toLowerCase()}${formData.lastName.toLowerCase()}`;
      result = await signup(username, formData.email, formData.password, formData.phone, formData.accessCode, formData.firstName, formData.lastName);
    }

    if (!result.success) {
      setError(result.error);
    }

    setLoading(false);
  };

  const toggleMode = () => {
    if (isLogin) {
      setIsLogin(false);
      setIsAdminSignup(false);
    } else {
      setIsLogin(true);
      setIsAdminSignup(false);
    }
    setError('');
    setAccessCodeStatus('');
    setAccessCodeValid(null);
    setFormData({ username: '', email: '', password: '', firstName: '', lastName: '', phone: '', accessCode: '', adminPassword: '' });
  };

  const toggleAdminMode = () => {
    setIsAdminSignup(!isAdminSignup);
    setError('');
    setAccessCodeStatus('');
    setAccessCodeValid(null);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Mile High Karate</h2>
        <h3>{isLogin ? 'Login' : (isAdminSignup ? 'Admin Sign Up' : 'Sign Up')}</h3>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {isLogin ? (
            // Login fields
            <>
              <div className="form-group">
                <label>Email:<span style={{color: 'red'}}>*</span></label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password:<span style={{color: 'red'}}>*</span></label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </>
          ) : (
            // Signup fields
            <div className='signup-form'>
              <div className="form-group">
                <label>First Name:<span style={{color: 'red'}}>*</span></label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name:<span style={{color: 'red'}}>*</span></label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email:<span style={{color: 'red'}}>*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Phone:<span style={{color: 'red'}}>*</span></label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required/>
              </div>

              <div className="form-group">
                <label>Password:<span style={{color: 'red'}}>*</span></label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password (min 6 characters)"
                  required
                  minLength="6"
                />
              </div>

              {/* Access Code field - only show for regular signup */}
              {!isAdminSignup && (
                <div className="form-group">
                  <label>Access Code: <span style={{color: 'red'}}>*</span></label>
                  <input
                    type="text"
                    name="accessCode"
                    value={formData.accessCode}
                    onChange={handleChange}
                    placeholder="Enter access code provided by admin"
                    required
                    style={{
                      borderColor: accessCodeValid === false ? '#dc3545' : 
                                   accessCodeValid === true ? '#28a745' : '#ced4da'
                    }}
                  />
                  {accessCodeStatus && (
                    <small style={{
                      color: accessCodeValid ? '#28a745' : '#dc3545', 
                      fontSize: '0.8rem',
                      display: 'block',
                      marginTop: '5px'
                    }}>
                      {accessCodeStatus}
                    </small>
                  )}
                  <small style={{color: '#666', fontSize: '0.8rem', display: 'block', marginTop: '3px'}}>
                    ⚠️ Required: Contact your administrator for an access code. Each user can only use one access code.
                  </small>
                </div>
              )}

              {/* Admin password field - only show for admin signup */}
              {isAdminSignup && (
                <div className="form-group admin-field">
                  <label>Admin Password:</label>
                  <input
                    type="password"
                    name="adminPassword"
                    value={formData.adminPassword}
                    onChange={handleChange}
                    placeholder="Enter admin secret password"
                    required
                  />
                  <small style={{color: '#f57c00', fontSize: '0.8rem'}}>
                    Contact your system administrator for the admin password
                  </small>
                </div>
              )}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading || (!isLogin && !isAdminSignup && accessCodeValid === false)} 
            className="submit-btn"
          >
            {loading ? 'Processing...' : (isLogin ? 'LOGIN' : (isAdminSignup ? 'CREATE ADMIN' : 'SIGN UP'))}
          </button>
        </form>

        <div className="auth-links">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              className="link-button"
              onClick={toggleMode}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>

          {!isLogin && (
            <p>
              <button 
                type="button" 
                className="link-button admin-link"
                onClick={toggleAdminMode}
              >
                {isAdminSignup ? 'Regular Sign Up' : 'Admin Sign Up'}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;