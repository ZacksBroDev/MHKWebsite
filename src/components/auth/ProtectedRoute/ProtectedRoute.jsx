/**
 * ProtectedRoute Component
 * 
 * A wrapper component that handles route-level authentication.
 * Ensures only authenticated users can access protected pages.
 * Shows loading state during authentication checks.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The component to render if authenticated
 * @param {string} [props.requiredRole] - Required user role (future enhancement)
 * @returns {JSX.Element} Protected route content or auth prompt
 * 
 * @example
 * <ProtectedRoute>
 *   <AdminDashboard />
 * </ProtectedRoute>
 */

import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
// Direct imports - no need for complex index.js files
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner.jsx';
import Message from '../../ui/Message/Message.jsx';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh'
      }}>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Message 
          type="error" 
          text="You must be logged in to access this page." 
        />
      </div>
    );
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Message 
          type="warning" 
          text={`Access denied. Required role: ${requiredRole}. Your role: ${user.role}`} 
        />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
