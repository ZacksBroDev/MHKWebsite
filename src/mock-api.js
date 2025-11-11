// Mock API for frontend-only deployment
// This disables backend calls and provides mock responses

// Mock API Configuration - Set to true for frontend-only deployment
const MOCK_MODE = true;

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
      // November 2025 Events - Full Month Schedule
      { 
        _id: '1', 
        title: 'Beginner Karate Class', 
        date: '2025-11-01', 
        time: '6:00 PM', 
        instructor: 'Sensei Mike',
        description: 'Introduction to martial arts fundamentals and basic techniques',
        level: 'Beginner'
      },
      { 
        _id: '2', 
        title: 'Youth Karate', 
        date: '2025-11-02', 
        time: '4:00 PM', 
        instructor: 'Sensei Tom',
        description: 'Karate class designed specifically for children ages 6-12',
        level: 'Youth'
      },
      { 
        _id: '3', 
        title: 'Advanced Training', 
        date: '2025-11-04', 
        time: '7:00 PM', 
        instructor: 'Sensei Sarah',
        description: 'Advanced techniques, sparring, and form practice',
        level: 'Advanced'
      },
      { 
        _id: '4', 
        title: 'Self-Defense Workshop', 
        date: '2025-11-05', 
        time: '6:30 PM', 
        instructor: 'Sensei Lisa',
        description: 'Learn practical self-defense techniques and situational awareness',
        level: 'All Levels'
      },
      { 
        _id: '5', 
        title: 'Family Karate Class', 
        date: '2025-11-06', 
        time: '4:00 PM', 
        instructor: 'Sensei Mike',
        description: 'Fun karate class for parents and children to train together',
        level: 'Family'
      },
      { 
        _id: '6', 
        title: 'Beginner Karate Class', 
        date: '2025-11-08', 
        time: '6:00 PM', 
        instructor: 'Sensei Mike',
        description: 'Basic stances, blocks, and fundamental techniques',
        level: 'Beginner'
      },
      { 
        _id: '7', 
        title: 'Youth Leadership Training', 
        date: '2025-11-09', 
        time: '4:30 PM', 
        instructor: 'Sensei Tom',
        description: 'Teaching young students leadership through martial arts',
        level: 'Youth'
      },
      { 
        _id: '8', 
        title: 'Beginner Karate Class', 
        date: '2025-11-11', 
        time: '6:00 PM', 
        instructor: 'Sensei Mike',
        description: 'Introduction to martial arts fundamentals and basic techniques',
        level: 'Beginner'
      },
      { 
        _id: '9', 
        title: 'Advanced Training', 
        date: '2025-11-11', 
        time: '7:00 PM', 
        instructor: 'Sensei Sarah',
        description: 'Advanced techniques, sparring, and form practice',
        level: 'Advanced'
      },
      { 
        _id: '10', 
        title: 'Youth Karate', 
        date: '2025-11-12', 
        time: '5:00 PM', 
        instructor: 'Sensei Tom',
        description: 'Karate class designed specifically for children ages 6-12',
        level: 'Youth'
      },
      { 
        _id: '11', 
        title: 'Black Belt Testing', 
        date: '2025-11-13', 
        time: '10:00 AM', 
        instructor: 'Master Chen',
        description: 'Black belt promotion testing and evaluation',
        level: 'Testing'
      },
      { 
        _id: '12', 
        title: 'Self-Defense Workshop', 
        date: '2025-11-14', 
        time: '6:30 PM', 
        instructor: 'Sensei Lisa',
        description: 'Learn practical self-defense techniques and situational awareness',
        level: 'All Levels'
      },
      { 
        _id: '13', 
        title: 'Kata Competition Prep', 
        date: '2025-11-15', 
        time: '8:00 PM', 
        instructor: 'Master Chen',
        description: 'Prepare for upcoming kata competitions with advanced form training',
        level: 'Intermediate'
      },
      { 
        _id: '14', 
        title: 'Family Karate Class', 
        date: '2025-11-16', 
        time: '4:00 PM', 
        instructor: 'Sensei Mike',
        description: 'Fun karate class for parents and children to train together',
        level: 'Family'
      },
      { 
        _id: '15', 
        title: 'Sparring Practice', 
        date: '2025-11-18', 
        time: '7:30 PM', 
        instructor: 'Sensei Sarah',
        description: 'Controlled sparring practice with protective gear',
        level: 'Intermediate'
      },
      { 
        _id: '16', 
        title: 'Women\'s Self-Defense', 
        date: '2025-11-19', 
        time: '7:00 PM', 
        instructor: 'Sensei Lisa',
        description: 'Self-defense techniques specifically for women',
        level: 'Women Only'
      },
      { 
        _id: '17', 
        title: 'Youth Karate', 
        date: '2025-11-20', 
        time: '5:00 PM', 
        instructor: 'Sensei Tom',
        description: 'Fun and engaging karate for kids',
        level: 'Youth'
      },
      { 
        _id: '18', 
        title: 'Advanced Weapons Training', 
        date: '2025-11-21', 
        time: '7:00 PM', 
        instructor: 'Sensei Sarah',
        description: 'Traditional weapons forms including bo staff and nunchaku',
        level: 'Advanced'
      },
      { 
        _id: '19', 
        title: 'Beginner Karate Class', 
        date: '2025-11-22', 
        time: '6:00 PM', 
        instructor: 'Sensei Mike',
        description: 'Fundamentals of karate for new students',
        level: 'Beginner'
      },
      { 
        _id: '20', 
        title: 'Family Fun Tournament', 
        date: '2025-11-23', 
        time: '2:00 PM', 
        instructor: 'All Instructors',
        description: 'Thanksgiving weekend family tournament and games',
        level: 'Family'
      },
      { 
        _id: '21', 
        title: 'Meditation and Mindfulness', 
        date: '2025-11-25', 
        time: '6:00 PM', 
        instructor: 'Master Chen',
        description: 'Mental training and meditation techniques',
        level: 'All Levels'
      },
      { 
        _id: '22', 
        title: 'Youth Karate', 
        date: '2025-11-26', 
        time: '5:00 PM', 
        instructor: 'Sensei Tom',
        description: 'Post-Thanksgiving karate practice for kids',
        level: 'Youth'
      },
      { 
        _id: '23', 
        title: 'Advanced Training', 
        date: '2025-11-27', 
        time: '7:00 PM', 
        instructor: 'Sensei Sarah',
        description: 'Advanced techniques and conditioning',
        level: 'Advanced'
      },
      { 
        _id: '24', 
        title: 'Pre-Holiday Sparring', 
        date: '2025-11-29', 
        time: '7:30 PM', 
        instructor: 'Sensei Sarah',
        description: 'Last sparring session before holiday break',
        level: 'Intermediate'
      },
      { 
        _id: '25', 
        title: 'Month-End Promotion Prep', 
        date: '2025-11-30', 
        time: '6:00 PM', 
        instructor: 'Master Chen',
        description: 'Final preparation for December belt testing',
        level: 'All Levels'
      },

      // December 2025 Events
      { 
        _id: '26', 
        title: 'Holiday Tournament', 
        date: '2025-12-07', 
        time: '10:00 AM', 
        instructor: 'Master Chen',
        description: 'Annual holiday karate tournament for all belt levels',
        level: 'Tournament'
      },
      { 
        _id: '27', 
        title: 'Beginner Karate Class', 
        date: '2025-12-09', 
        time: '6:00 PM', 
        instructor: 'Sensei Mike',
        description: 'Basic stances, blocks, and kicks for new students',
        level: 'Beginner'
      },
      { 
        _id: '28', 
        title: 'Advanced Weapons Training', 
        date: '2025-12-14', 
        time: '7:00 PM', 
        instructor: 'Sensei Sarah',
        description: 'Traditional weapons forms including bo staff and nunchaku',
        level: 'Advanced'
      },
      { 
        _id: '29', 
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
        _id: '31', 
        title: 'Youth Leadership Training', 
        date: '2026-03-29', 
        time: '4:30 PM', 
        instructor: 'Sensei Tom',
        description: 'Teaching young students leadership through martial arts',
        level: 'Youth'
      }

      // Let me generate a comprehensive year-long schedule
    ].concat(generateYearlyEvents())
  }
};

// Generate comprehensive yearly events (1700+ events)
function generateYearlyEvents() {
  const events = [];
  let eventId = 32;
  
  // Event templates for different days of the week
  const eventTemplates = {
    monday: [
      { title: "Beginner Karate", time: "6:00 PM", instructor: "Sensei Johnson", description: "Introduction to basic karate techniques", level: "Beginner" },
      { title: "Advanced Sparring", time: "7:30 PM", instructor: "Sensei Williams", description: "Advanced sparring techniques and practice", level: "Advanced" },
      { title: "Youth Martial Arts", time: "4:00 PM", instructor: "Sensei Davis", description: "Martial arts for children ages 8-14", level: "Youth" },
      { title: "Adult Self-Defense", time: "8:30 PM", instructor: "Sensei Brown", description: "Practical self-defense techniques", level: "Adult" }
    ],
    tuesday: [
      { title: "Weapons Training", time: "6:00 PM", instructor: "Master Chen", description: "Traditional weapons forms and techniques", level: "Intermediate" },
      { title: "Forms Competition Prep", time: "5:00 PM", instructor: "Sensei Johnson", description: "Preparation for upcoming tournaments", level: "Competition" },
      { title: "Little Dragons", time: "4:30 PM", instructor: "Sensei Davis", description: "Martial arts for ages 4-7", level: "Little Dragons" },
      { title: "Fitness Kickboxing", time: "7:00 PM", instructor: "Sensei Brown", description: "High-energy cardio kickboxing", level: "Fitness" }
    ],
    wednesday: [
      { title: "MMA Fundamentals", time: "7:30 PM", instructor: "Sensei Williams", description: "Mixed martial arts basics", level: "MMA" },
      { title: "Women's Self-Defense", time: "8:00 PM", instructor: "Sensei Johnson", description: "Self-defense specifically for women", level: "Women" },
      { title: "Traditional Karate", time: "6:00 PM", instructor: "Master Chen", description: "Classical karate forms and philosophy", level: "Traditional" },
      { title: "Teen Leadership", time: "5:00 PM", instructor: "Sensei Davis", description: "Leadership training for teen students", level: "Teen" }
    ],
    thursday: [
      { title: "Competition Team", time: "6:00 PM", instructor: "Master Chen", description: "Training for tournament competitors", level: "Competition" },
      { title: "Cardio Combat", time: "7:00 PM", instructor: "Sensei Brown", description: "High-intensity martial arts fitness", level: "Fitness" },
      { title: "Family Class", time: "5:30 PM", instructor: "Sensei Johnson", description: "Parents and children train together", level: "Family" },
      { title: "Street Defense", time: "7:30 PM", instructor: "Sensei Williams", description: "Real-world self-defense scenarios", level: "Adult" }
    ],
    friday: [
      { title: "Open Mat Sparring", time: "6:00 PM", instructor: "All Instructors", description: "Open sparring session for all levels", level: "All Levels" },
      { title: "Adult Tournament Team", time: "8:00 PM", instructor: "Master Chen", description: "Advanced tournament preparation", level: "Advanced" },
      { title: "After School Program", time: "3:30 PM", instructor: "Sensei Davis", description: "After school martial arts program", level: "Youth" },
      { title: "Belt Testing Prep", time: "7:00 PM", instructor: "Sensei Johnson", description: "Preparation for upcoming belt tests", level: "Testing" }
    ],
    saturday: [
      { title: "Saturday Morning Warriors", time: "9:00 AM", instructor: "Sensei Johnson", description: "Energetic morning training session", level: "All Levels" },
      { title: "Advanced Forms", time: "10:30 AM", instructor: "Master Chen", description: "Complex kata and forms training", level: "Advanced" },
      { title: "Family Self-Defense", time: "11:30 AM", instructor: "Sensei Williams", description: "Self-defense for the whole family", level: "Family" },
      { title: "Board Breaking Workshop", time: "1:00 PM", instructor: "Sensei Brown", description: "Learn proper board breaking techniques", level: "Workshop" },
      { title: "Sparring Tournament", time: "2:00 PM", instructor: "All Instructors", description: "Monthly sparring competition", level: "Tournament" }
    ],
    sunday: [
      { title: "Sunday Fundamentals", time: "10:00 AM", instructor: "Sensei Johnson", description: "Back to basics training", level: "Fundamentals" },
      { title: "Youth Leadership Workshop", time: "11:30 AM", instructor: "Sensei Davis", description: "Leadership development for young students", level: "Youth" },
      { title: "Philosophy & History", time: "1:00 PM", instructor: "Master Chen", description: "Martial arts philosophy and history", level: "Education" },
      { title: "Forms Seminar", time: "2:00 PM", instructor: "Master Chen", description: "In-depth forms instruction", level: "Seminar" }
    ]
  };

  // Special events throughout the year
  const specialEvents = [
    { title: "New Year Kick-off", date: "2026-01-01", time: "10:00 AM", instructor: "Master Chen", description: "Start the new year with martial arts", level: "Special" },
    { title: "Valentine's Day Couples Class", date: "2026-02-14", time: "7:00 PM", instructor: "Sensei Johnson", description: "Martial arts for couples", level: "Special" },
    { title: "Spring Break Camp", date: "2026-03-15", time: "9:00 AM", instructor: "All Instructors", description: "Week-long martial arts camp", level: "Camp" },
    { title: "Easter Egg Hunt Tournament", date: "2026-04-20", time: "2:00 PM", instructor: "All Instructors", description: "Fun tournament with prizes", level: "Special" },
    { title: "Mother's Day Self-Defense", date: "2026-05-11", time: "1:00 PM", instructor: "Sensei Williams", description: "Self-defense workshop for moms", level: "Special" },
    { title: "Father's Day Sparring", date: "2026-06-15", time: "2:00 PM", instructor: "Master Chen", description: "Father-child sparring session", level: "Special" },
    { title: "Independence Day Demo", date: "2026-07-04", time: "11:00 AM", instructor: "All Instructors", description: "Public martial arts demonstration", level: "Demo" },
    { title: "Back to School Prep", date: "2026-08-25", time: "4:00 PM", instructor: "Sensei Davis", description: "Get ready for school year", level: "Youth" },
    { title: "Halloween Costume Tournament", date: "2026-10-31", time: "6:00 PM", instructor: "All Instructors", description: "Tournament in costume", level: "Special" },
    { title: "Thanksgiving Gratitude Class", date: "2026-11-26", time: "10:00 AM", instructor: "Master Chen", description: "Give thanks through martial arts", level: "Special" },
    { title: "Holiday Spectacular", date: "2026-12-20", time: "7:00 PM", instructor: "All Instructors", description: "Annual holiday performance", level: "Performance" }
  ];

  // Generate events for entire year
  const startDate = new Date('2025-12-01');
  const endDate = new Date('2026-12-31');
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    let dayName;
    switch(dayOfWeek) {
      case 0: dayName = 'sunday'; break;
      case 1: dayName = 'monday'; break;
      case 2: dayName = 'tuesday'; break;
      case 3: dayName = 'wednesday'; break;
      case 4: dayName = 'thursday'; break;
      case 5: dayName = 'friday'; break;
      case 6: dayName = 'saturday'; break;
    }

    // Check if it's a special event day
    const specialEvent = specialEvents.find(event => event.date === dateStr);
    if (specialEvent) {
      events.push({
        _id: (eventId++).toString(),
        title: specialEvent.title,
        date: dateStr,
        time: specialEvent.time,
        instructor: specialEvent.instructor,
        description: specialEvent.description,
        level: specialEvent.level
      });
    }

    // Add regular scheduled classes for this day
    const dayTemplates = eventTemplates[dayName];
    if (dayTemplates) {
      // Add 2-4 classes per day randomly
      const numClasses = Math.floor(Math.random() * 3) + 2;
      const selectedTemplates = dayTemplates.slice(0, numClasses);
      
      selectedTemplates.forEach(template => {
        events.push({
          _id: (eventId++).toString(),
          title: template.title,
          date: dateStr,
          time: template.time,
          instructor: template.instructor,
          description: template.description,
          level: template.level
        });
      });
    }
  }

  return events;
}

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