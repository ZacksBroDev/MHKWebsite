// MHK Karate Main App - React SPA with authentication and routing
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Critical components loaded immediately
import NavBar from "./components/layout/NavBar/NavBar";
import Footer from "./components/layout/Footer/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthForm from "./components/auth/AuthForm/AuthForm";
import PortalLanding from "./pages/portalLanding/PortalLanding";

// Direct imports for AWS compatibility
import Home from "./pages/home/Home.jsx";
import Schedule from "./pages/schedule/Schedule.jsx";
import NotFound from "./pages/notFoundPage/NotFound.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Academy from "./pages/academy/Academy.jsx";
import Level1 from "./pages/fightStyle/level1/Level1.jsx";
import Level2 from "./pages/fightStyle/level2/Level2.jsx";
import Level3 from "./pages/fightStyle/level3/Level3.jsx";
import Conditional from "./pages/fightStyle/blackBelts/conditionals/Conditionals.jsx";
import Deg1 from "./pages/fightStyle/blackBelts/deg1/Deg1.jsx";
import Deg2 from "./pages/fightStyle/blackBelts/deg2/Deg2.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

// Main application content with authentication logic
const AppContent = () => {
  const { isAuthenticated, loading, error } = useAuth();

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.2rem",
          backgroundColor: "#0b1018",
        }}
      >
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#121a25",
            borderRadius: "12px",
            border: "1px solid rgba(154, 167, 184, 0.24)",
            boxShadow: "0 18px 40px rgba(8, 12, 18, 0.24)",
            color: "#e9eef5",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #223146",
              borderTop: "4px solid #2e6bff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 15px",
            }}
          ></div>
          <p>Loading your martial arts dashboard...</p>
        </div>
      </div>
    );
  }

  // Show authentication error if present
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#0b1018",
        }}
      >
        <div
          style={{
            padding: "30px",
            textAlign: "center",
            backgroundColor: "#121a25",
            borderRadius: "12px",
            border: "1px solid rgba(154, 167, 184, 0.24)",
            boxShadow: "0 18px 40px rgba(8, 12, 18, 0.24)",
            maxWidth: "400px",
          }}
        >
          <h2 style={{ color: "#f0a2a2", marginBottom: "15px" }}>
            Authentication Error
          </h2>
          <p style={{ color: "#a7b3c2", marginBottom: "20px" }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: "#2e6bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "999px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If not authenticated, show portal landing + login routes
  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <Routes>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/" element={<PortalLanding />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    );
  }

  // If authenticated, show the full website with navigation and routing
  return (
    <ErrorBoundary>
      <NavBar />
      <main>
        <Routes>
          {/* Home routes - both root and /home lead to Home component */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* Public pages */}
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected admin route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

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
