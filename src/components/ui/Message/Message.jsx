/**
 * Message Component
 * 
 * Reusable component for displaying success, error, and info messages
 * 
 * @param {string} type - Message type: 'success', 'error', 'info', 'warning'
 * @param {string} message - Message text to display
 * @param {Function} onClose - Optional close handler
 * @param {boolean} autoClose - Whether to auto-close after delay (default: true)
 * @param {number} autoCloseDelay - Auto-close delay in milliseconds (default: 5000)
 * @param {string} className - Additional CSS classes
 */

import React, { useEffect, useState } from 'react';
import './Message.css';

const Message = ({ 
  type = 'info', 
  message, 
  onClose, 
  autoClose = true, 
  autoCloseDelay = 5000,
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible || !message) {
    return null;
  }

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info':
      default: return 'ℹ️';
    }
  };

  return (
    <div className={`message message--${type} ${className}`}>
      <div className="message__content">
        <span className="message__icon">{getIcon()}</span>
        <span className="message__text">{message}</span>
      </div>
      {onClose && (
        <button 
          className="message__close"
          onClick={handleClose}
          aria-label="Close message"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Message;
