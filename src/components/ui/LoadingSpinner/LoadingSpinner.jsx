/**
 * LoadingSpinner Component
 * 
 * Reusable loading indicator for async operations
 * 
 * @param {string} size - Size variant: 'small', 'medium', 'large'
 * @param {string} message - Optional loading message to display
 * @param {string} className - Additional CSS classes
 */

import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', message, className = '' }) => {
  return (
    <div className={`loading-spinner loading-spinner--${size} ${className}`}>
      <div className="loading-spinner__circle"></div>
      {message && <p className="loading-spinner__message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
