// API Configuration - centralized endpoint definitions for frontend
// Uses environment variable or defaults to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// All API endpoints organized by feature
export const API_ENDPOINTS = {
  // Authentication endpoints
  LOGIN: `${API_BASE_URL}/api/login`,
  SIGNUP: `${API_BASE_URL}/api/signup`,
  ADMIN_SIGNUP: `${API_BASE_URL}/api/admin-signup`,
  PROFILE: `${API_BASE_URL}/api/profile`,
  VALIDATE_ACCESS_CODE: `${API_BASE_URL}/api/validate-access-code`,
  
  // Access code management
  ACCESS_CODES: `${API_BASE_URL}/api/access-codes`,
  GENERATE_ACCESS_CODE: `${API_BASE_URL}/api/generate-access-code`,
  
  // User management (admin only)
  USERS: `${API_BASE_URL}/api/users`,
  
  // Event and class management
  EVENTS: `${API_BASE_URL}/api/events`,
};

export default API_ENDPOINTS;
