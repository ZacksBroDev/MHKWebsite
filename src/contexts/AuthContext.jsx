/**
 * AuthContext - Authentication Context Provider
 * 
 * Provides authentication state and methods throughout the application.
 * Manages user login, logout, registration, and authentication status.
 * Automatically restores session from localStorage on app start.
 * 
 * @module AuthContext
 * @requires React
 * @requires api
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

/**
 * Authentication context for managing user state
 * @type {React.Context}
 */
const AuthContext = createContext(null);

/**
 * Custom hook to access authentication context
 * @returns {Object} Authentication context value
 * @throws {Error} If used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Authentication Provider Component
 * 
 * Wraps the application to provide authentication state and methods.
 * Automatically restores user session from localStorage on mount.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} AuthContext.Provider with authentication state
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('mhk_token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Restore user session from localStorage on app start
   */
  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  /**
   * Fetch user profile using stored token
   * Enhanced with comprehensive HTTP status code error handling
   * @async
   * @function fetchProfile
   */
  const fetchProfile = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PROFILE, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setError(null);
      } else {
        // Handle specific HTTP status codes
        localStorage.removeItem('mhk_token');
        setToken(null);
        setUser(null);
        
        switch (response.status) {
          case 401:
            setError('Your session has expired. Please log in again.');
            break;
          case 403:
            setError('Access forbidden. Please contact support.');
            break;
          case 404:
            setError('User account not found. Please contact support.');
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          case 502:
            setError('Service temporarily unavailable. Please try again.');
            break;
          case 503:
            setError('Service maintenance in progress. Please try again later.');
            break;
          case 504:
            setError('Request timeout. Please check your connection and try again.');
            break;
          default:
            setError(`Server error (${response.status}). Please try again later.`);
        }
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      // Network or server error
      localStorage.removeItem('mhk_token');
      setToken(null);
      setUser(null);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login function with enhanced HTTP status code error handling
   * @param {string} username - User's username
   * @param {string} password - User's password
   * @returns {Promise<{success: boolean, error?: string}>} Login result
   */
  const login = async (username, password) => {
    try {
      setError(null);
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('mhk_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        // Handle specific HTTP status codes
        switch (response.status) {
          case 400:
            return { success: false, error: data.error || 'Invalid login credentials provided.' };
          case 401:
            return { success: false, error: 'Invalid username or password.' };
          case 403:
            return { success: false, error: 'Account access restricted. Contact support.' };
          case 404:
            return { success: false, error: 'User account not found.' };
          case 429:
            return { success: false, error: 'Too many login attempts. Please try again later.' };
          case 500:
            return { success: false, error: 'Server error. Please try again later.' };
          case 502:
            return { success: false, error: 'Service temporarily unavailable.' };
          case 503:
            return { success: false, error: 'Service maintenance in progress.' };
          case 504:
            return { success: false, error: 'Login request timeout. Please try again.' };
          default:
            return { success: false, error: data.error || `Server error (${response.status}). Please try again.` };
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  };

  /**
   * Signup function with enhanced HTTP status code error handling
   * @param {string} username - User's username
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} phone - User's phone number
   * @param {string} accessCode - Access code for registration
   * @param {string} firstName - User's first name
   * @param {string} lastName - User's last name
   * @returns {Promise<{success: boolean, error?: string}>} Signup result
   */
  const signup = async (username, email, password, phone, accessCode, firstName, lastName) => {
    try {
      const response = await fetch(API_ENDPOINTS.SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, phone, accessCode, firstName, lastName }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('mhk_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        // Handle specific HTTP status codes
        switch (response.status) {
          case 400:
            return { success: false, error: data.error || 'Invalid registration data provided.' };
          case 401:
            return { success: false, error: 'Invalid access code.' };
          case 403:
            return { success: false, error: 'Registration not allowed. Contact support.' };
          case 409:
            return { success: false, error: 'Username or email already exists.' };
          case 429:
            return { success: false, error: 'Too many registration attempts. Please try again later.' };
          case 500:
            return { success: false, error: 'Server error during registration. Please try again.' };
          case 502:
            return { success: false, error: 'Registration service temporarily unavailable.' };
          case 503:
            return { success: false, error: 'Registration service maintenance in progress.' };
          default:
            return { success: false, error: data.error || `Registration error (${response.status}). Please try again.` };
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Network error during registration. Please check your connection.' };
    }
  };

  // Add adminSignup function with enhanced HTTP status code error handling
  const adminSignup = async (username, email, password, adminPassword, firstName, lastName, phone) => {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, adminPassword, firstName, lastName, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('mhk_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        // Handle specific HTTP status codes
        switch (response.status) {
          case 400:
            return { success: false, error: data.error || 'Invalid admin registration data provided.' };
          case 401:
            return { success: false, error: 'Invalid admin password.' };
          case 403:
            return { success: false, error: 'Admin registration not allowed.' };
          case 409:
            return { success: false, error: 'Admin username or email already exists.' };
          case 429:
            return { success: false, error: 'Too many admin registration attempts. Please try again later.' };
          case 500:
            return { success: false, error: 'Server error during admin registration. Please try again.' };
          case 502:
            return { success: false, error: 'Admin registration service temporarily unavailable.' };
          case 503:
            return { success: false, error: 'Admin registration service maintenance in progress.' };
          default:
            return { success: false, error: data.error || `Admin registration error (${response.status}). Please try again.` };
        }
      }
    } catch (error) {
      console.error('Admin signup error:', error);
      return { success: false, error: 'Network error during admin registration. Please check your connection.' };
    }
  };

  /**
   * Logout function - clears all authentication state
   */
  const logout = () => {
    localStorage.removeItem('mhk_token');
    setToken(null);
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    token,
    login,
    signup,
    adminSignup,
    logout,
    loading,
    error,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};