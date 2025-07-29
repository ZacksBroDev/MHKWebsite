// MongoDB initialization script for Mile High Karate
print('Initializing Mile High Karate database...');

// Switch to the application database
db = db.getSiblingDB('mhk_karate');

// Create collections with proper indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });

db.accessCodes.createIndex({ code: 1 }, { unique: true });
db.accessCodes.createIndex({ isActive: 1 });

db.events.createIndex({ date: 1 });
db.events.createIndex({ createdBy: 1 });

// Insert default access code
db.accessCodes.insertOne({
  code: 'MARTIAL2025',
  isActive: true,
  used: false,
  createdAt: new Date(),
  description: 'Default access code for new users'
});

print('Database initialization completed!');
print('Default access code: MARTIAL2025');
