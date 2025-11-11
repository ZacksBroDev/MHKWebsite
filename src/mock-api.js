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
      // November 2025 Events
      { 
        _id: '1', 
        title: 'Beginner Karate Class', 
        date: '2025-11-11', 
        time: '6:00 PM', 
        instructor: 'Sensei Mike',
        description: 'Introduction to martial arts fundamentals and basic techniques',
        level: 'Beginner'
      },
      { 
        _id: '2', 
        title: 'Advanced Training', 
        date: '2025-11-11', 
        time: '7:00 PM', 
        instructor: 'Sensei Sarah',
        description: 'Advanced techniques, sparring, and form practice',
        level: 'Advanced'
      },
      { 
        _id: '3', 
        title: 'Youth Karate', 
        date: '2025-11-12', 
        time: '5:00 PM', 
        instructor: 'Sensei Tom',
        description: 'Karate class designed specifically for children ages 6-12',
        level: 'Youth'
      },
      { 
        _id: '4', 
        title: 'Black Belt Testing', 
        date: '2025-11-13', 
        time: '10:00 AM', 
        instructor: 'Master Chen',
        description: 'Black belt promotion testing and evaluation',
        level: 'Testing'
      },
      { 
        _id: '5', 
        title: 'Self-Defense Workshop', 
        date: '2025-11-14', 
        time: '6:30 PM', 
        instructor: 'Sensei Lisa',
        description: 'Learn practical self-defense techniques and situational awareness',
        level: 'All Levels'
      },
      { 
        _id: '6', 
        title: 'Kata Competition Prep', 
        date: '2025-11-15', 
        time: '8:00 PM', 
        instructor: 'Master Chen',
        description: 'Prepare for upcoming kata competitions with advanced form training',
        level: 'Intermediate'
      },
      { 
        _id: '7', 
        title: 'Family Karate Class', 
        date: '2025-11-16', 
        time: '4:00 PM', 
        instructor: 'Sensei Mike',
        description: 'Fun karate class for parents and children to train together',
        level: 'Family'
      },
      { 
        _id: '8', 
        title: 'Sparring Practice', 
        date: '2025-11-18', 
        time: '7:30 PM', 
        instructor: 'Sensei Sarah',
        description: 'Controlled sparring practice with protective gear',
        level: 'Intermediate'
      },

      // December 2025 Events
      { 
        _id: '9', 
        title: 'Holiday Tournament', 
        date: '2025-12-07', 
        time: '10:00 AM', 
        instructor: 'Master Chen',
        description: 'Annual holiday karate tournament for all belt levels',
        level: 'Tournament'
      },
      { 
        _id: '10', 
        title: 'Beginner Karate Class', 
        date: '2025-12-09', 
        time: '6:00 PM', 
        instructor: 'Sensei Mike',
        description: 'Basic stances, blocks, and kicks for new students',
        level: 'Beginner'
      },
      { 
        _id: '11', 
        title: 'Advanced Weapons Training', 
        date: '2025-12-14', 
        time: '7:00 PM', 
        instructor: 'Sensei Sarah',
        description: 'Traditional weapons forms including bo staff and nunchaku',
        level: 'Advanced'
      },
      { 
        _id: '12', 
        title: 'Year-End Promotion Ceremony', 
        date: '2025-12-21', 
        time: '6:00 PM', 
        instructor: 'Master Chen',
        description: 'Belt advancement ceremony and achievement recognition',
        level: 'All Levels'
      },

      // January 2026 Events  
      { 
        _id: '13', 
        title: 'New Year Kickoff Class', 
        date: '2026-01-06', 
        time: '6:00 PM', 
        instructor: 'Master Chen',
        description: 'Welcome new students and set goals for the year',
        level: 'All Levels'
      },
      { 
        _id: '14', 
        title: 'Youth Winter Training', 
        date: '2026-01-11', 
        time: '4:00 PM', 
        instructor: 'Sensei Tom',
        description: 'Indoor training focused on forms and flexibility',
        level: 'Youth'
      },
      { 
        _id: '15', 
        title: 'Self-Defense for Women', 
        date: '2026-01-18', 
        time: '7:00 PM', 
        instructor: 'Sensei Lisa',
        description: 'Specialized self-defense techniques for women',
        level: 'Women Only'
      },
      { 
        _id: '16', 
        title: 'Brown Belt Intensive', 
        date: '2026-01-25', 
        time: '8:00 AM', 
        instructor: 'Master Chen',
        description: 'All-day intensive training for brown belt candidates',
        level: 'Brown Belt'
      },

      // February 2026 Events
      { 
        _id: '17', 
        title: 'Valentine\'s Day Partner Training', 
        date: '2026-02-14', 
        time: '6:00 PM', 
        instructor: 'Sensei Mike',
        description: 'Couples and friends train together in partner exercises',
        level: 'All Levels'
      },
      { 
        _id: '18', 
        title: 'Regional Kata Championship', 
        date: '2026-02-22', 
        time: '9:00 AM', 
        instructor: 'Master Chen',
        description: 'Regional kata competition hosted at our dojo',
        level: 'Competition'
      },
      { 
        _id: '19', 
        title: 'Beginner\'s Workshop', 
        date: '2026-02-26', 
        time: '6:30 PM', 
        instructor: 'Sensei Tom',
        description: 'Introduction workshop for potential new students',
        level: 'Beginner'
      },

      // March 2026 Events
      { 
        _id: '20', 
        title: 'Spring Belt Testing', 
        date: '2026-03-08', 
        time: '10:00 AM', 
        instructor: 'Master Chen',
        description: 'Quarterly belt advancement testing for all levels',
        level: 'Testing'
      },
      { 
        _id: '21', 
        title: 'Women\'s History Month Demo', 
        date: '2026-03-15', 
        time: '2:00 PM', 
        instructor: 'Sensei Lisa',
        description: 'Demonstration of women in martial arts history',
        level: 'Demonstration'
      },
      { 
        _id: '22', 
        title: 'Advanced Grappling', 
        date: '2026-03-22', 
        time: '7:30 PM', 
        instructor: 'Sensei Sarah',
        description: 'Ground fighting and submission techniques',
        level: 'Advanced'
      },
      { 
        _id: '23', 
        title: 'Youth Leadership Training', 
        date: '2026-03-29', 
        time: '4:30 PM', 
        instructor: 'Sensei Tom',
        description: 'Teaching young students leadership through martial arts',
        level: 'Youth'
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