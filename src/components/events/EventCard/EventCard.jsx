/**
 * EventCard Component
 * 
 * Reusable component for displaying event information with join/leave functionality
 * Used in Schedule page, AdminDashboard, and Home page
 * 
 * @param {Object} event - Event object containing title, time, description, etc.
 * @param {Object} user - Current user object (null if not logged in)
 * @param {Function} onJoin - Handler for joining event
 * @param {Function} onLeave - Handler for leaving event
 * @param {Object} joinLoading - Loading states for join/leave actions
 * @param {boolean} isUserRegistered - Whether current user is registered for event
 * @param {boolean} showActions - Whether to show join/leave buttons (default: true)
 * @param {string} variant - Visual variant: 'default', 'compact', 'expanded'
 */

import React from 'react';
import './EventCard.css';

const EventCard = ({ 
  event, 
  user, 
  onJoin, 
  onLeave, 
  joinLoading, 
  isUserRegistered, 
  showActions = true,
  variant = 'default',
  className = ''
}) => {
  const handleJoin = (e) => {
    e.stopPropagation();
    onJoin(event.id);
  };

  const handleLeave = (e) => {
    e.stopPropagation();
    onLeave(event.id);
  };

  const eventId = event.id || event._id;
  const isLoading = joinLoading && joinLoading[eventId];
  const isEventFull = event.maxParticipants && event.currentParticipants >= event.maxParticipants;

  return (
    <div className={`event-card event-card--${variant} ${className}`}>
      <div className="event-card__content">
        <div className="event-card__header">
          <h3 className="event-card__title">{event.title}</h3>
          <span className="event-card__time">⏰ {event.time}</span>
        </div>

        {event.description && (
          <p className="event-card__description">{event.description}</p>
        )}

        <div className="event-card__details">
          {event.type && (
            <span className="event-card__type">
              Type: {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </span>
          )}
          
          <span className="event-card__participants">
            👥 {event.currentParticipants || 0}
            {event.maxParticipants && ` / ${event.maxParticipants}`} participants
          </span>

          {event.instructor && (
            <span className="event-card__instructor">
              👨‍🏫 {event.instructor}
            </span>
          )}
        </div>
      </div>

      {showActions && (
        <div className="event-card__actions">
          {user ? (
            isUserRegistered ? (
              <button
                className="event-card__button event-card__button--leave"
                onClick={handleLeave}
                disabled={isLoading}
              >
                {isLoading ? 'Leaving...' : '✖ Leave Event'}
              </button>
            ) : (
              <button
                className="event-card__button event-card__button--join"
                onClick={handleJoin}
                disabled={isLoading || isEventFull}
              >
                {isLoading 
                  ? 'Joining...' 
                  : isEventFull
                  ? '🚫 Event Full'
                  : '✓ Join Event'
                }
              </button>
            )
          ) : (
            <div className="event-card__login-prompt">
              <a href="/login" className="event-card__login-link">
                Login to join events
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventCard;
