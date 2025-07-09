// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/login`,
  SIGNUP: `${API_BASE_URL}/api/signup`,
  ADMIN_SIGNUP: `${API_BASE_URL}/api/admin-signup`,
  PROFILE: `${API_BASE_URL}/api/profile`,
  VALIDATE_ACCESS_CODE: `${API_BASE_URL}/api/validate-access-code`,
  
  // Access code endpoints
  ACCESS_CODES: `${API_BASE_URL}/api/access-codes`,
  GENERATE_ACCESS_CODE: `${API_BASE_URL}/api/generate-access-code`,
  
  // User endpoints
  USERS: `${API_BASE_URL}/api/users`,
  
  // Event endpoints
  EVENTS: `${API_BASE_URL}/api/events`,
};

export default API_ENDPOINTS;
