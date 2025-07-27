/**
 * API Configuration Documentation
 * 
 * Purpose: Centralized API endpoint configuration
 * Location: /src/config/api.js
 * 
 * This file provides a centralized configuration for all API endpoints
 * used throughout the frontend application.
 * 
 * Structure:
 * ```javascript
 * const BASE_URL = 'http://localhost:3001';
 * 
 * export const API_ENDPOINTS = {
 *   // Authentication endpoints
 *   LOGIN: `${BASE_URL}/api/login`,
 *   SIGNUP: `${BASE_URL}/api/signup`,
 *   ADMIN_SIGNUP: `${BASE_URL}/api/admin-signup`,
 *   PROFILE: `${BASE_URL}/api/profile`,
 *   
 *   // Event endpoints
 *   EVENTS: `${BASE_URL}/api/events`,
 *   
 *   // Admin endpoints
 *   USERS: `${BASE_URL}/api/users`,
 *   ACCESS_CODES: `${BASE_URL}/api/access-codes`,
 *   SEND_SMS: `${BASE_URL}/api/send-access-code-sms`,
 *   
 *   // Utility endpoints
 *   TEST: `${BASE_URL}/api/test`,
 *   VALIDATE_ACCESS_CODE: `${BASE_URL}/api/validate-access-code`
 * };
 * ```
 * 
 * Usage Examples:
 * 
 * Basic GET request:
 * ```javascript
 * import { API_ENDPOINTS } from '../config/api';
 * 
 * const response = await fetch(API_ENDPOINTS.EVENTS);
 * const data = await response.json();
 * ```
 * 
 * Authenticated POST request:
 * ```javascript
 * import { API_ENDPOINTS } from '../config/api';
 * 
 * const response = await fetch(API_ENDPOINTS.LOGIN, {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'Authorization': `Bearer ${token}`
 *   },
 *   body: JSON.stringify(data)
 * });
 * ```
 * 
 * Dynamic endpoint (with ID):
 * ```javascript
 * const joinEventUrl = `${API_ENDPOINTS.EVENTS}/${eventId}/join`;
 * ```
 * 
 * Environment Configuration:
 * - Development: http://localhost:3001
 * - Production: Update BASE_URL for production domain
 * 
 * Benefits:
 * - Single source of truth for API URLs
 * - Easy environment switching
 * - Reduced typos and inconsistencies
 * - Simplified endpoint management
 * - Better maintainability
 * 
 * Best Practices:
 * - Always import from this file rather than hardcoding URLs
 * - Update BASE_URL for different environments
 * - Add new endpoints here when adding new API routes
 * - Use descriptive, consistent naming conventions
 * 
 * Future Enhancements:
 * - Environment variable support
 * - Automatic API versioning
 * - Request/response interceptors
 * - Error handling utilities
 */
