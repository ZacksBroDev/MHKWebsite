/**
 * App Component
 * 
 * Main application component that handles routing and authentication flow.
 * Provides authentication context to all child components and manages
 * route protection based on user authentication status.
 * 
 * @component
 * @returns {JSX.Element} Main application with routing and authentication
 * 
 * Features:
 * - Centralized authentication management
 * - Protected route system
 * - Loading state handling
 * - Conditional rendering based on auth status
 * - Comprehensive route definitions for all pages
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
// Direct imports for critical components (needed immediately)
import NavBar from './components/layout/NavBar/NavBar';
import Footer from './components/layout/Footer/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import AuthForm from './components/auth/AuthForm/AuthForm';

// Lazy load page components for better code splitting
const Home = lazy(() => import('./pages/home/Home'));
const Schedule = lazy(() => import('./pages/schedule/Schedule'));
const NotFound = lazy(() => import('./pages/notFoundPage/NotFound'));
const Contact = lazy(() => import('./pages/contact/Contact'));
const Level1 = lazy(() => import('./pages/fightStyle/level1/Level1'));
const Level2 = lazy(() => import('./pages/fightStyle/level2/Level2'));
const Level3 = lazy(() => import('./pages/fightStyle/level3/Level3'));
const Conditional = lazy(() => import('./pages/fightStyle/blackBelts/conditionals/Conditionals'));
const Deg1 = lazy(() => import('./pages/fightStyle/blackBelts/deg1/Deg1'));
const Deg2 = lazy(() => import('./pages/fightStyle/blackBelts/deg2/Deg2'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

/**
 * AppContent Component
 * 
 * Internal component that renders the main application content based on authentication state.
 * Handles loading states, unauthenticated users, and authenticated application flow.
 * Enhanced with comprehensive error handling and fallback UI components.
 * 
 * @component
 * @returns {JSX.Element} Application content based on authentication status
 */
const AppContent = () => {
  const { isAuthenticated, loading, error } = useAuth();

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          padding: '20px',
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 15px'
          }}></div>
          <p>Loading your martial arts dashboard...</p>
        </div>
      </div>
    );
  }

  // Show authentication error if present
  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          padding: '30px',
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          maxWidth: '400px'
        }}>
          <h2 style={{ color: '#dc3545', marginBottom: '15px' }}>
            🔒 Authentication Error
          </h2>
          <p style={{ color: '#6c757d', marginBottom: '20px' }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <AuthForm />
      </ErrorBoundary>
    );
  }

  // If authenticated, show the full website with navigation and routing
  return (
    <ErrorBoundary>
      <NavBar />
      <main>
        <Suspense 
          fallback={
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60vh',
              fontSize: '1.1rem',
              flexDirection: 'column'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '30px',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                maxWidth: '300px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #667eea',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 15px'
                }}></div>
                <p style={{ margin: 0, color: '#666' }}>Loading page...</p>
                <small style={{ color: '#999' }}>Optimizing for performance</small>
              </div>
            </div>
          }
        >
          <Routes>
            {/* Home routes - both root and /home lead to Home component */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            
            {/* Public pages */}
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected admin route */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Fighting style curriculum pages */}
            <Route path="/level1" element={<Level1 />} />
            <Route path="/level2" element={<Level2 />} />
            <Route path="/level3" element={<Level3 />} />
            
            {/* Black belt curriculum pages */}
            <Route path="/conditionals" element={<Conditional />} />
            <Route path="/deg1" element={<Deg1 />} />
            <Route path="/deg2" element={<Deg2 />} />
            
            {/* 404 fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </ErrorBoundary>
  );
};

/**
 * App Component - Main Application Wrapper
 * 
 * Wraps the entire application with authentication provider context and error boundary.
 * This ensures all child components have access to authentication state and are protected
 * from JavaScript errors that could crash the application.
 * 
 * @component
 * @returns {JSX.Element} Application wrapped with AuthProvider and ErrorBoundary
 */
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
      
      {/* Add CSS animation for loading spinners */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </ErrorBoundary>
  );
}

export default App;
