# Persist Events and User Data to Database

## 🎯 Feature Description

Replace static mock API with a **real backend API + database** (MongoDB or PostgreSQL) to persist events, user profiles, and training progress. Enable real-time CRUD operations for event management and user data.

## 💡 Motivation

**Current State:**
- 1700+ events hardcoded in `src/mock-api.js` (static)
- No ability to create, edit, or delete events via admin dashboard
- User data (profile, progress) lost on page refresh
- Mock API returns same data for all users

**Business Value:**
- **Dynamic Content:** Admins can create events (classes, tournaments, seminars) in real-time
- **User Profiles:** Store training history, belt progress, attendance records
- **Scalability:** Support growing dojo with hundreds of students
- **Data Integrity:** Single source of truth in database, not static files

## 🛠️ Technical Approach

### 1. Backend Stack Selection

**Option A: Node.js + Express + MongoDB (Recommended)**
```
Frontend (React) → REST API (Express) → MongoDB Atlas
```
- **Pros:** JavaScript full-stack, fast prototyping, flexible schema
- **Cons:** NoSQL may require schema migration later

**Option B: Node.js + Express + PostgreSQL**
```
Frontend (React) → REST API (Express) → PostgreSQL (AWS RDS)
```
- **Pros:** ACID compliance, relational data (users ↔ events ↔ attendance)
- **Cons:** More complex migrations, heavier infrastructure

### 2. Database Schema

**MongoDB Collections:**
```javascript
// users collection
{
  _id: ObjectId,
  cognitoId: String,  // Link to Cognito user
  email: String,
  role: String,       // 'admin' | 'instructor' | 'student'
  profile: {
    name: String,
    currentBelt: String,
    joinDate: Date
  },
  progress: [{
    eventId: ObjectId,
    attended: Boolean,
    completedAt: Date
  }]
}

// events collection
{
  _id: ObjectId,
  title: String,
  type: String,       // 'class' | 'tournament' | 'seminar' | 'belt-test'
  date: Date,
  time: String,
  location: String,
  capacity: Number,
  attendees: [ObjectId], // User IDs
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. API Endpoints

```javascript
// Events
POST   /api/events              // Create event (admin only)
GET    /api/events              // List all events (with filters)
GET    /api/events/:id          // Get single event
PUT    /api/events/:id          // Update event (admin only)
DELETE /api/events/:id          // Delete event (admin only)

// Users (Admin)
GET    /api/users               // List all users (admin only)
GET    /api/users/:id           // Get user profile
PUT    /api/users/:id           // Update user profile
DELETE /api/users/:id           // Delete user (admin only)

// User Progress
POST   /api/users/:id/progress  // Mark event attended
GET    /api/users/:id/progress  // Get training history
```

### 4. Migration Strategy

**Phase 1:** Backend + DB setup (2 weeks)
- Deploy Express API to AWS Elastic Beanstalk or Vercel
- Set up MongoDB Atlas (free tier)
- Migrate 1700 events from `mock-api.js` to database (seed script)

**Phase 2:** Frontend integration (1 week)
- Update `src/config/api.js` to point to real API
- Replace fetch calls in components with real endpoints
- Add loading states, error handling

**Phase 3:** Admin CRUD UI (1 week)
- Enable "Create Event" form in admin dashboard
- Add edit/delete buttons to event cards
- Implement user management table

### 5. Deployment

```yaml
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - COGNITO_USER_POOL_ID=${COGNITO_USER_POOL_ID}
    depends_on:
      - mongo
  
  mongo:
    image: mongo:7
    volumes:
      - mongo_data:/data/db

  frontend:
    build: ./
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://backend:3000
```

## ✅ Acceptance Criteria

**Backend:**
- [ ] Express API deployed and accessible at `https://api.mhktraining.com`
- [ ] MongoDB Atlas cluster provisioned with production connection string
- [ ] All 1700 mock events migrated to database (seed script + verification)
- [ ] JWT token validation middleware (Cognito integration)
- [ ] Role-based access control (admin endpoints require admin role)
- [ ] API documentation (Swagger/Postman collection)

**Frontend:**
- [ ] `VITE_API_URL` environment variable configurable (local vs production)
- [ ] Event list fetches from real API (not mock-api.js)
- [ ] Loading spinners while fetching data
- [ ] Error handling for network failures (show user-friendly message)
- [ ] Event detail page fetches single event by ID

**Admin Features:**
- [ ] "Create Event" form in admin dashboard (title, date, time, type, location)
- [ ] "Edit Event" modal pre-fills existing data
- [ ] "Delete Event" button with confirmation dialog
- [ ] User management table shows all users with roles
- [ ] Admins can change user roles (student ↔ instructor)

**Testing:**
- [ ] Unit tests for API routes (Jest + Supertest)
- [ ] Integration tests for event CRUD flow
- [ ] Load testing: API handles 100 concurrent requests
- [ ] Data validation: Cannot create event with missing fields

**Documentation:**
- [ ] README updated with backend setup instructions
- [ ] `.env.example` includes `MONGODB_URI`, `COGNITO_USER_POOL_ID`
- [ ] API endpoint documentation (Swagger UI)

## 📅 Timeline

**Target:** Q1-Q2 2026  
**Estimate:** 60-80 hours
- Backend setup: 16-20 hours
- Database schema & seed data: 8-10 hours
- API development: 20-24 hours
- Frontend integration: 12-16 hours
- Testing: 8-10 hours
- Deployment & DevOps: 6-8 hours

## 📚 Resources

- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [MongoDB University (Free Course)](https://university.mongodb.com/)
- [JWT Authentication with Express](https://jwt.io/introduction)
- [AWS Elastic Beanstalk Node.js](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create-deploy-nodejs.html)

## 🔗 Related Issues

- #1 AWS Cognito (JWT tokens required for API authentication)
- #3 Admin CRUD (Backend enables CRUD operations)
- Future: WebSocket support for real-time event updates

---

**Labels:** `enhancement`, `backend`, `database`, `roadmap`, `q1-2026`  
**Priority:** Critical (enables all future features)
