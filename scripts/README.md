# Database Scripts

This folder contains utility scripts for database management and setup.

## populate-yearly-events.mjs

**Purpose**: One-time script to populate the database with a full year of martial arts events.

**What it does**:
- Creates 1,732 events for the year 2025
- Generates 3-7 events per day across all days of the week
- Creates varied event types (classes, tournaments, seminars, etc.)
- Sets up an admin user if none exists

**When to use**:
- ✅ Initial database setup for new environments
- ✅ Setting up local development databases
- ✅ Creating test data for development
- ✅ Recovering from database corruption/loss

**When NOT to use**:
- ❌ On production databases that already have data
- ❌ Multiple times on the same database (creates duplicates)

## Usage

```bash
# Make sure MongoDB is running
npm run start:mongo

# Run the population script from the project root
node scripts/populate-yearly-events.mjs
```

## Important Notes

- **One-time use**: Only run this script once per database instance
- **Data safety**: The script will warn if events already exist
- **Admin user**: Creates an admin user (admin/admin123) if needed
- **Environment**: Make sure you're connected to the correct database

## Database Connection

The script connects to: `mongodb://localhost:27017/mhk_karate`

Make sure this matches your application's database configuration.
