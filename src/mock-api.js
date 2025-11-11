// Mock API for frontend-only deployment
// This disables backend calls and provides mock responses

const MOCK_MODE = true; // Set to false when backend is ready

const mockResponses = {
  login: { success: true, token: 'mock-token', user: { email: 'admin', role: 'admin' } },
  signup: { success: true, message: 'Mock signup successful' },
  profile: { success: true, user: { email: 'admin', role: 'admin' } },
  accessCodes: { 
    success: true, 
    codes: [
      { _id: '1', code: 'MOCK123', type: 'general', isActive: true, usageCount: 5 },
      { _id: '2', code: 'ADMIN456', type: 'admin', isActive: true, usageCount: 1 }
    ] 
  },
  users: { 
    success: true, 
    users: [
      { _id: '1', email: 'admin@test.com', role: 'admin', createdAt: new Date() },
      { _id: '2', email: 'user@test.com', role: 'user', createdAt: new Date() }
    ] 
  },
  events: { 
    success: true, 
    events: [
      { 
        _id: '1', 
        title: 'Beginner Class', 
        date: '2025-11-12', 
        time: '6:00 PM', 
        instructor: 'Sensei Mike',
        description: 'Introduction to martial arts fundamentals'
      },
      { 
        _id: '2', 
        title: 'Advanced Training', 
        date: '2025-11-14', 
        time: '7:00 PM', 
        instructor: 'Sensei Sarah',
        description: 'Advanced techniques and sparring'
      }
    ] 
  }
};

// Mock fetch function
const mockFetch = async (endpoint, options) => {
  console.log(`Mock API call to: ${endpoint}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (endpoint.includes('/login')) {
    return {
      ok: true,
      json: async () => mockResponses.login
    };
  }
  
  if (endpoint.includes('/signup')) {
    return {
      ok: true,
      json: async () => mockResponses.signup
    };
  }
  
  if (endpoint.includes('/profile')) {
    return {
      ok: true,
      json: async () => mockResponses.profile
    };
  }

  if (endpoint.includes('/access-codes')) {
    return {
      ok: true,
      json: async () => mockResponses.accessCodes
    };
  }

  if (endpoint.includes('/users')) {
    return {
      ok: true,
      json: async () => mockResponses.users
    };
  }

  if (endpoint.includes('/events')) {
    return {
      ok: true,
      json: async () => mockResponses.events
    };
  }
  
  // Default response for any other API calls
  return {
    ok: true,
    json: async () => ({ success: true, message: 'Mock response', data: [] })
  };
};

// Override fetch for API calls when in mock mode
const originalFetch = window.fetch;
if (MOCK_MODE) {
  window.fetch = (url, options) => {
    if (url.includes('/api/')) {
      return mockFetch(url, options);
    }
    return originalFetch(url, options);
  };
}

console.log('Mock API initialized. Backend calls will be mocked.');