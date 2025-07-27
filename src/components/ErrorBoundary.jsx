/**
 * ErrorBoundary Component
 * 
 * React Error Boundary to catch JavaScript errors anywhere in the component tree.
 * Provides a fallback UI when components crash and logs error details.
 * Prevents the entire application from crashing due to component errors.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Error boundary wrapper component
 * 
 * Features:
 * - Catches and handles React component errors
 * - Displays user-friendly error message
 * - Provides reload functionality
 * - Logs errors for debugging
 * - Prevents application crashes
 */

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  /**
   * Static method called when an error occurs during rendering
   * @param {Error} error - The error that was thrown
   * @returns {Object} New state object
   */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  /**
   * Called when an error has been thrown by a descendant component
   * @param {Error} error - The error that was thrown
   * @param {Object} errorInfo - Information about which component threw the error
   */
  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  /**
   * Reloads the page to reset the error state
   */
  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            width: '100%'
          }}>
            <h1 style={{ color: '#dc3545', marginBottom: '20px' }}>
              ⚠️ Something went wrong
            </h1>
            <p style={{ color: '#6c757d', marginBottom: '30px', lineHeight: '1.6' }}>
              We're sorry, but something unexpected happened. This error has been logged 
              and we'll work to fix it as soon as possible.
            </p>
            
            <div style={{ marginBottom: '30px' }}>
              <button
                onClick={this.handleReload}
                style={{
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginRight: '10px',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5a67d8'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
              >
                🔄 Reload Page
              </button>
              
              <button
                onClick={() => window.history.back()}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
              >
                ← Go Back
              </button>
            </div>
            
            {/* Development error details */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ 
                textAlign: 'left', 
                backgroundColor: '#f8f9fa', 
                padding: '15px', 
                borderRadius: '5px',
                border: '1px solid #dee2e6',
                marginTop: '20px'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}>
                  🐛 Error Details (Development Only)
                </summary>
                <pre style={{ 
                  fontSize: '12px', 
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
