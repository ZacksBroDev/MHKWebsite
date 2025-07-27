import mongoose from 'mongoose';
import Event from './models/Event.js';
import User from './models/User.js';

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/mhk_karate';

// Event templates for different days of the week
const eventTemplates = {
  // Monday Events
  monday: [
    { title: "Beginner Karate", time: "6:00 PM", type: "class", instructor: "Sensei Johnson", description: "Introduction to basic karate techniques", maxParticipants: 20 },
    { title: "Advanced Sparring", time: "7:30 PM", type: "class", instructor: "Sensei Williams", description: "Advanced sparring techniques and practice", maxParticipants: 15 },
    { title: "Youth Martial Arts", time: "4:00 PM", type: "class", instructor: "Sensei Davis", description: "Martial arts for children ages 8-14", maxParticipants: 25 },
    { title: "Adult Self-Defense", time: "8:30 PM", type: "class", instructor: "Sensei Brown", description: "Practical self-defense techniques", maxParticipants: 18 },
    { title: "Meditation & Focus", time: "5:30 PM", type: "workshop", instructor: "Master Chen", description: "Mental training and meditation", maxParticipants: 12 }
  ],
  
  // Tuesday Events
  tuesday: [
    { title: "Weapons Training", time: "6:00 PM", type: "class", instructor: "Sensei Rodriguez", description: "Traditional weapons forms and techniques", maxParticipants: 16 },
    { title: "Fitness Kickboxing", time: "7:00 PM", type: "class", instructor: "Instructor Martinez", description: "High-energy cardio kickboxing", maxParticipants: 30 },
    { title: "Little Dragons", time: "4:30 PM", type: "class", instructor: "Sensei Taylor", description: "Martial arts for ages 4-7", maxParticipants: 15 },
    { title: "Black Belt Club", time: "8:00 PM", type: "class", instructor: "Master Kim", description: "Advanced training for black belts only", maxParticipants: 10 },
    { title: "Forms Competition Prep", time: "5:00 PM", type: "workshop", instructor: "Sensei Anderson", description: "Preparation for upcoming tournaments", maxParticipants: 12 },
    { title: "Adult Beginner", time: "6:30 PM", type: "class", instructor: "Sensei White", description: "Beginner-friendly adult classes", maxParticipants: 20 }
  ],
  
  // Wednesday Events
  wednesday: [
    { title: "Traditional Karate", time: "6:00 PM", type: "class", instructor: "Master Tanaka", description: "Classical karate forms and philosophy", maxParticipants: 18 },
    { title: "MMA Fundamentals", time: "7:30 PM", type: "class", instructor: "Coach Thompson", description: "Mixed martial arts basics", maxParticipants: 20 },
    { title: "Teen Leadership", time: "5:00 PM", type: "class", instructor: "Sensei Garcia", description: "Leadership training for teen students", maxParticipants: 15 },
    { title: "Women's Self-Defense", time: "8:00 PM", type: "workshop", instructor: "Sensei Lopez", description: "Self-defense specifically for women", maxParticipants: 25 },
    { title: "Tai Chi", time: "4:00 PM", type: "class", instructor: "Master Liu", description: "Gentle martial art focusing on flow and balance", maxParticipants: 20 }
  ],
  
  // Thursday Events
  thursday: [
    { title: "Competition Team", time: "6:00 PM", type: "class", instructor: "Coach Robinson", description: "Training for tournament competitors", maxParticipants: 12 },
    { title: "Cardio Combat", time: "7:00 PM", type: "class", instructor: "Instructor Clark", description: "High-intensity martial arts fitness", maxParticipants: 25 },
    { title: "Family Class", time: "5:30 PM", type: "class", instructor: "Sensei Walker", description: "Parents and children train together", maxParticipants: 20 },
    { title: "Advanced Weapons", time: "8:00 PM", type: "class", instructor: "Master Suzuki", description: "Advanced weapon forms and techniques", maxParticipants: 14 },
    { title: "Flexibility & Conditioning", time: "4:30 PM", type: "workshop", instructor: "Instructor Hall", description: "Improve flexibility and strength", maxParticipants: 18 },
    { title: "Street Defense", time: "7:30 PM", type: "class", instructor: "Sensei Adams", description: "Real-world self-defense scenarios", maxParticipants: 16 }
  ],
  
  // Friday Events
  friday: [
    { title: "Open Mat Sparring", time: "6:00 PM", type: "class", instructor: "Various Instructors", description: "Open sparring session for all levels", maxParticipants: 30 },
    { title: "Belt Testing Prep", time: "7:00 PM", type: "workshop", instructor: "Master Park", description: "Preparation for upcoming belt tests", maxParticipants: 15 },
    { title: "After School Program", time: "3:30 PM", type: "class", instructor: "Sensei Young", description: "After school martial arts program", maxParticipants: 25 },
    { title: "Adult Tournament Team", time: "8:00 PM", type: "class", instructor: "Coach Miller", description: "Advanced tournament preparation", maxParticipants: 12 },
    { title: "Grappling Basics", time: "5:00 PM", type: "class", instructor: "Instructor Turner", description: "Introduction to ground fighting", maxParticipants: 18 },
    { title: "Stress Relief Martial Arts", time: "6:30 PM", type: "workshop", instructor: "Sensei Bell", description: "Use martial arts to reduce stress", maxParticipants: 20 }
  ],
  
  // Saturday Events
  saturday: [
    { title: "Saturday Morning Warriors", time: "9:00 AM", type: "class", instructor: "Sensei Cooper", description: "Energetic morning training session", maxParticipants: 25 },
    { title: "Advanced Forms", time: "10:30 AM", type: "class", instructor: "Master Honda", description: "Complex kata and forms training", maxParticipants: 16 },
    { title: "Family Self-Defense", time: "11:30 AM", type: "workshop", instructor: "Sensei Reed", description: "Self-defense for the whole family", maxParticipants: 30 },
    { title: "Sparring Tournament", time: "2:00 PM", type: "tournament", instructor: "Tournament Officials", description: "Monthly sparring competition", maxParticipants: 40 },
    { title: "Weapon Sparring", time: "3:30 PM", type: "class", instructor: "Sensei Bailey", description: "Sparring with traditional weapons", maxParticipants: 12 },
    { title: "Board Breaking Workshop", time: "1:00 PM", type: "workshop", instructor: "Master Stone", description: "Learn proper board breaking techniques", maxParticipants: 20 },
    { title: "Meditation Session", time: "8:00 AM", type: "workshop", instructor: "Master Zen", description: "Morning meditation and mindfulness", maxParticipants: 15 }
  ],
  
  // Sunday Events
  sunday: [
    { title: "Sunday Fundamentals", time: "10:00 AM", type: "class", instructor: "Sensei Rivera", description: "Back to basics training", maxParticipants: 22 },
    { title: "Forms Seminar", time: "2:00 PM", type: "seminar", instructor: "Grandmaster Lee", description: "In-depth forms instruction", maxParticipants: 35 },
    { title: "Youth Leadership Workshop", time: "11:30 AM", type: "workshop", instructor: "Sensei Price", description: "Leadership development for young students", maxParticipants: 18 },
    { title: "Mixed Level Sparring", time: "3:30 PM", type: "class", instructor: "Sensei Collins", description: "Sparring for all skill levels", maxParticipants: 25 },
    { title: "Philosophy & History", time: "1:00 PM", type: "seminar", instructor: "Master Kim", description: "Martial arts philosophy and history", maxParticipants: 30 },
    { title: "Recovery & Stretching", time: "4:30 PM", type: "workshop", instructor: "Instructor Green", description: "Recovery techniques and flexibility", maxParticipants: 20 }
  ]
};

// Special events that occur monthly/quarterly
const specialEvents = [
  { title: "Belt Testing Ceremony", type: "test", description: "Quarterly belt advancement testing", maxParticipants: 50 },
  { title: "Dojo Open House", type: "special", description: "Community open house event", maxParticipants: 100 },
  { title: "Instructor Workshop", type: "workshop", description: "Professional development for instructors", maxParticipants: 15 },
  { title: "Self-Defense Seminar", type: "seminar", description: "Public self-defense demonstration", maxParticipants: 60 },
  { title: "Tournament Preparation", type: "workshop", description: "Intensive tournament training", maxParticipants: 25 },
  { title: "Guest Master Workshop", type: "seminar", description: "Special seminar with visiting master", maxParticipants: 40 },
  { title: "Parent-Child Training", type: "special", description: "Special bonding classes for families", maxParticipants: 30 },
  { title: "Meditation Retreat", type: "workshop", description: "Extended meditation and mindfulness session", maxParticipants: 20 }
];

// Generate random participants for each event
function generateRandomParticipants(maxParticipants) {
  return Math.floor(Math.random() * Math.min(maxParticipants, 15));
}

// Get day of week name
function getDayName(date) {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[date.getDay()];
}

// Generate events for a specific date
function generateEventsForDate(date, createdBy) {
  const dayName = getDayName(date);
  const dayEvents = eventTemplates[dayName];
  
  // Randomly select 3-7 events for this day
  const numEvents = Math.floor(Math.random() * 5) + 3; // 3-7 events
  const selectedEvents = [];
  
  // Shuffle and select events
  const shuffled = [...dayEvents].sort(() => 0.5 - Math.random());
  for (let i = 0; i < Math.min(numEvents, shuffled.length); i++) {
    const event = { ...shuffled[i] };
    event.date = new Date(date);
    event.currentParticipants = generateRandomParticipants(event.maxParticipants);
    event.createdBy = createdBy;
    selectedEvents.push(event);
  }
  
  // Occasionally add a special event (10% chance)
  if (Math.random() < 0.1) {
    const specialEvent = { ...specialEvents[Math.floor(Math.random() * specialEvents.length)] };
    specialEvent.date = new Date(date);
    specialEvent.time = "7:00 PM";
    specialEvent.instructor = "Special Guest";
    specialEvent.currentParticipants = generateRandomParticipants(specialEvent.maxParticipants);
    specialEvent.createdBy = createdBy;
    selectedEvents.push(specialEvent);
  }
  
  return selectedEvents;
}

// Main function to populate the database
async function populateYearlyEvents() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully!');
    
    // Find or create an admin user to use as createdBy
    let adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('No admin user found, creating a system admin user...');
      adminUser = await User.create({
        username: 'system-admin',
        email: 'admin@mhkdojo.com',
        password: 'temporaryPassword123!',
        role: 'admin',
        firstName: 'System',
        lastName: 'Administrator'
      });
      console.log('System admin user created.');
    }
    console.log(`Using admin user: ${adminUser.username} (${adminUser._id})`);
    
    // Clear existing events (optional - comment out if you want to keep existing events)
    console.log('Clearing existing events...');
    await Event.deleteMany({});
    console.log('Existing events cleared.');
    
    const events = [];
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-12-31');
    
    console.log('Generating events for the entire year...');
    
    // Generate events for each day of the year
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dayEvents = generateEventsForDate(new Date(date), adminUser._id);
      events.push(...dayEvents);
    }
    
    console.log(`Generated ${events.length} events. Inserting into database...`);
    
    // Insert events in batches for better performance
    const batchSize = 100;
    for (let i = 0; i < events.length; i += batchSize) {
      const batch = events.slice(i, i + batchSize);
      await Event.insertMany(batch);
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(events.length / batchSize)}`);
    }
    
    console.log(`Successfully populated database with ${events.length} events for the entire year!`);
    
    // Display some statistics
    const eventsByType = await Event.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    
    console.log('\nEvent statistics by type:');
    eventsByType.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} events`);
    });
    
  } catch (error) {
    console.error('Error populating events:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
populateYearlyEvents();
