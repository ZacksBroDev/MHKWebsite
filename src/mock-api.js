// Mock API for frontend-only deployment
// This disables backend calls and provides mock responses

const MOCK_MODE = true; // Set to false when backend is ready

const mockResponses = {
  login: { success: true, token: 'mock-token', user: { email: 'admin', role: 'admin' } },
  signup: { success: true, message: 'Mock signup successful' },
  profile: { success: true, user: { email: 'admin', role: 'admin' } },
  accessCodes: { 
    success: true, 
    accessCodes: [
      { _id: '1', code: 'MOCK123', type: 'general', isActive: true, usageCount: 5 },
      { _id: '2', code: 'ADMIN456', type: 'admin', isActive: true, usageCount: 1 },
      { _id: '3', code: 'STUDENT789', type: 'student', isActive: false, usageCount: 12 }
    ] 
  },
  users: { 
    success: true, 
    users: [
      { _id: '1', email: 'admin@mhktraining.com', role: 'admin', createdAt: new Date().toISOString() },
      { _id: '2', email: 'sensei@mhktraining.com', role: 'admin', createdAt: new Date().toISOString() },
      { _id: '3', email: 'john.doe@example.com', role: 'user', createdAt: new Date().toISOString() },
      { _id: '4', email: 'jane.smith@example.com', role: 'user', createdAt: new Date().toISOString() },
      { _id: '5', email: 'student@example.com', role: 'user', createdAt: new Date().toISOString() }
    ] 
  },
  events: { 
    success: true, 
    events: [
      { 
        _id: '1', 
        title: 'Beginner Karate Class', 
        date: '2025-11-12', 
        time: '6:00 PM', 
        instructor: 'Sensei Mike',
        description: 'Introduction to martial arts fundamentals and basic techniques',
        level: 'Beginner'
      },
      { 
        _id: '2', 
        title: 'Advanced Training', 
        date: '2025-11-14', 
        time: '7:00 PM', 
        instructor: 'Sensei Sarah',
        description: 'Advanced techniques, sparring, and form practice',
        level: 'Advanced'
      },
      { 
        _id: '3', 
        title: 'Youth Karate', 
        date: '2025-11-15', 
        time: '5:00 PM', 
        instructor: 'Sensei Tom',
        description: 'Karate class designed specifically for children ages 6-12',
        level: 'Youth'
      },
      { 
        _id: '4', 
        title: 'Black Belt Testing', 
        date: '2025-11-20', 
        time: '10:00 AM', 
        instructor: 'Master Chen',
        description: 'Black belt promotion testing and evaluation',
        level: 'Testing'
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

  if (endpoint.includes('/generate-access-code')) {
    return {
      ok: true,
      json: async () => ({ 
        success: true, 
        code: 'NEW' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        message: 'Access code generated successfully' 
      })
    };
  }

  if (endpoint.includes('/validate-access-code')) {
    return {
      ok: true,
      json: async () => ({ 
        success: true, 
        valid: true, 
        message: 'Access code is valid' 
      })
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