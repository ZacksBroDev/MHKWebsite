# MHK Martial Arts Website - Developer Guide

## 📋 Project Overview

This is a full-stack martial arts dojo management system built with React, Node.js, Express, and Mo## 🏗️ Component Architecture

### Organized Structure
Components are organized by purpose in a clean, scalable structure:

```
src/components/
├── index.js              # Central export file for all components
├── auth/                 # Authentication related components
│   ├── AuthForm/         # Login/signup form with validation
│   └── ProtectedRoute/   # Route-level authentication wrapper
├── layout/               # Layout and navigation components
│   ├── NavBar/           # Responsive navigation with mobile menu
│   └── Footer/           # Site footer
├── events/               # Event-related components
│   └── EventCard/        # Reusable event display component
└── ui/                   # Reusable UI components
    ├── Button/           # Flexible button with variants and states
    ├── Input/            # Input component with validation
    ├── Form/             # Form wrapper with validation
    ├── LoadingSpinner/   # Loading indicator with size options
    └── Message/          # Alert/notification component
```

### Component Design Principles

#### 1. **Reusability First**
- All UI components accept variant props for different styles
- Flexible APIs that work across different contexts
- Consistent prop naming and behavior patterns

#### 2. **Accessibility Built-in**
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management and screen reader compatibility
- High contrast and reduced motion support

#### 3. **Performance Optimized**
- Lightweight components with minimal dependencies
- Efficient re-render patterns
- Lazy loading where appropriate

#### 4. **Developer Experience**
- Comprehensive JSDoc documentation
- TypeScript-style prop definitions
- Clear usage examples in each component
- Organized imports through index files

### Component Usage Patterns

#### Centralized Imports
```jsx
// Import multiple components from central index
import { Button, Input, Form, Message } from '../components';

// Or import specific components
import Button from '../components/ui/Button';
import { AuthForm } from '../components';
```

#### Variant System
```jsx
// Button variants
<Button variant="primary">Primary Action</Button>
<Button variant="danger" size="small">Delete</Button>
<Button variant="success" loading={isLoading}>Save</Button>

// Input variants
<Input type="email" error={emailError} />
<Input type="password" size="large" />
<Input type="textarea" rows={5} />

// Message variants
<Message type="success" text="Action completed!" />
<Message type="error" text="Something went wrong" />
```m provides user authentication, event management, schedule viewing, and administrative features.

## 🏗️ Architecture

### Frontend (React + Vite)
- **Framework**: React 18 with Vite for build tooling
- **Routing**: React Router v6 for client-side navigation
- **State Management**: React Context API for authentication state
- **Styling**: CSS Modules and custom CSS with responsive design
- **Build Tool**: Vite for fast development and optimized builds

### Backend (Node.js + Express)
- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js for RESTful API
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt for password hashing
- **SMS Integration**: Twilio for access code delivery

### Database (MongoDB)
- **Collections**: Users, Events, AccessCodes
- **ODM**: Mongoose for schema validation and queries
- **Indexing**: Optimized indexes for performance

## 📁 Project Structure

```
MHKWebsite/
├── src/                          # Frontend React application
│   ├── components/               # Reusable React components
│   │   ├── AuthForm.jsx         # Login/signup form component
│   │   ├── NavBar.jsx           # Navigation bar with mobile support
│   │   ├── Footer.jsx           # Site footer component
│   │   └── ProtectedRoute.jsx   # Route protection wrapper
│   ├── contexts/                # React Context providers
│   │   └── AuthContext.jsx     # Authentication state management
│   ├── pages/                   # Page components (route handlers)
│   │   ├── admin/               # Admin dashboard and management
│   │   ├── contact/             # Contact page
│   │   ├── fightStyle/          # Martial arts curriculum pages
│   │   ├── home/                # Home page with today's schedule
│   │   ├── schedule/            # Interactive calendar and events
│   │   └── notFoundPage/        # 404 error page
│   ├── config/                  # Configuration files
│   │   └── api.js               # API endpoints configuration
│   └── assets/                  # Static assets (images, icons, CSS)
├── models/                      # MongoDB schema definitions
│   ├── User.js                 # User model with authentication
│   ├── Event.js                # Event model for scheduling
│   └── AccessCode.js           # Access code model for registration
├── config/                     # Backend configuration
│   └── database.js             # MongoDB connection setup
├── services/                   # External service integrations
│   └── smsService.js           # Twilio SMS functionality
├── scripts/                    # Database utilities and tools
│   ├── populate-yearly-events.mjs  # Database seeding script
│   └── README.md               # Script documentation
├── server.js                   # Express server entry point
├── package.json                # Dependencies and scripts
└── README.md                   # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud)
- Git

### Installation & Setup

1. **Clone Repository**
   ```bash
   git clone [repository-url]
   cd MHKWebsite
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env` file in root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/mhk_karate
   JWT_SECRET=your-jwt-secret-key
   ADMIN_SECRET=your-admin-password
   DEFAULT_ACCESS_CODE=MARTIAL2025
   TWILIO_ACCOUNT_SID=your-twilio-sid
   TWILIO_AUTH_TOKEN=your-twilio-token
   TWILIO_PHONE_NUMBER=your-twilio-phone
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB
   npm run start:mongo

   # Populate with sample data (first time only)
   node scripts/populate-yearly-events.mjs
   ```

5. **Start Development**
   ```bash
   # Terminal 1: Start backend server
   node server.js

   # Terminal 2: Start frontend development server
   npm run dev
   ```

6. **Access Application**
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:3001

## 🔐 Authentication System

### User Roles
- **Regular Users**: Can view schedules, join/leave events
- **Admins**: Full access to user management, event creation, access codes

### Access Code System
- New users require valid access codes to register
- Admins can generate and manage access codes
- SMS integration for code delivery via Twilio

### API Authentication
- JWT tokens for session management
- Protected routes require Bearer token in Authorization header
- Automatic token refresh on login

## 📅 Event Management

### Features
- **Calendar View**: Interactive calendar with expandable day views
- **Hierarchical Events**: Week → Day → Event structure for organization
- **Event Registration**: Users can join/leave events with participant limits
- **Real-time Updates**: Immediate participant count updates

### Event Types
- `class`: Regular martial arts classes
- `workshop`: Special training sessions
- `seminar`: Educational events
- `tournament`: Competition events
- `special`: Community events

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach with breakpoints at 768px and 480px
- Hamburger menu for mobile navigation
- Touch-friendly interface elements

### Visual Design
- Glass-morphism design theme with blur effects
- Smooth animations and transitions
- Consistent color scheme using CSS custom properties
- Accessibility-focused contrast and spacing

### Interactive Elements
- Expandable calendar days for detailed event viewing
- Collapsible week/day hierarchy in events section
- Hover effects and visual feedback
- Loading states and error handling

## 🛠️ Component Architecture

### Reusable Components
- `AuthForm`: Handles login/signup with validation
- `NavBar`: Responsive navigation with mobile menu
- `Footer`: Site footer with social links
- `ProtectedRoute`: Route protection wrapper

### Page Components
- `Home`: Dashboard with today's events and curriculum links
- `Schedule`: Interactive calendar and event management
- `AdminDashboard`: User and event management interface
- `Contact`: Contact information and form

### Context Providers
- `AuthContext`: Global authentication state management

## 🔧 API Documentation

### Authentication Endpoints
```
POST /api/signup          # User registration with access code
POST /api/admin-signup    # Admin registration
POST /api/login           # User authentication
GET  /api/profile         # Get user profile
```

### Event Endpoints
```
GET    /api/events        # Get all events
POST   /api/events        # Create new event (admin only)
POST   /api/events/:id/join   # Join an event
POST   /api/events/:id/leave  # Leave an event
```

### Admin Endpoints
```
GET    /api/users         # Get all users (admin only)
DELETE /api/users/:id     # Delete user (admin only)
GET    /api/access-codes  # Get access codes (admin only)
POST   /api/access-codes  # Create access code (admin only)
```

## 🧪 Development Guidelines

### Code Style
- ES6+ JavaScript with modules
- Functional React components with hooks
- JSX for component templates
- CSS custom properties for theming

### File Naming
- Components: PascalCase (e.g., `AuthForm.jsx`)
- Pages: PascalCase (e.g., `Schedule.jsx`)
- Utilities: camelCase (e.g., `api.js`)
- Styles: kebab-case (e.g., `schedule.css`)

### Component Structure
```jsx
// Component imports
import React, { useState, useEffect } from 'react';
import './ComponentName.css';

// Main component
const ComponentName = ({ prop1, prop2 }) => {
  // State and hooks
  const [state, setState] = useState(initialValue);

  // Event handlers
  const handleEvent = () => {
    // Handler logic
  };

  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // Render
  return (
    <div className="component-name">
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

## 🔍 Debugging & Troubleshooting

### Common Issues
1. **MongoDB Connection**: Ensure MongoDB is running locally
2. **Port Conflicts**: Frontend (5174) and Backend (3001) ports
3. **Environment Variables**: Check `.env` file configuration
4. **CORS Issues**: Ensure proper CORS setup in server.js

### Logging
- Frontend: Console logging for debug information
- Backend: Structured logging with error details
- Database: Mongoose connection logs

### Testing
- Manual testing through browser interface
- API testing with tools like Postman or curl
- Database queries with MongoDB Compass

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Ensure all production environment variables are set:
- MongoDB connection string
- JWT secret (secure random string)
- Twilio credentials (if SMS features used)

### Deployment Checklist
- [ ] Build frontend assets
- [ ] Set production environment variables
- [ ] Configure MongoDB for production
- [ ] Set up domain and SSL
- [ ] Configure server for static file serving

## 📈 Performance Considerations

### Frontend Optimizations
- Vite build optimization and code splitting
- Lazy loading for route components
- Efficient React re-renders with proper dependencies

### Backend Optimizations
- Database indexing for fast queries
- Connection pooling for MongoDB
- Efficient API response structures

### Database Optimizations
- Indexes on frequently queried fields
- Proper aggregation pipelines
- Efficient data structures

## 🔒 Security Features

### Authentication Security
- Bcrypt password hashing
- JWT token expiration
- Protected API routes

### Input Validation
- Server-side validation for all inputs
- Mongoose schema validation
- XSS prevention through proper escaping

### Access Control
- Role-based permissions
- Route protection on frontend and backend
- Admin-only endpoints properly secured

## 📚 Dependencies

### Frontend Dependencies
- `react`: UI library
- `react-router-dom`: Client-side routing
- `vite`: Build tool and development server

### Backend Dependencies
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT authentication
- `cors`: Cross-origin request handling
- `dotenv`: Environment variable management

### Development Dependencies
- `eslint`: Code linting
- `@vitejs/plugin-react`: Vite React plugin

## 🤝 Contributing Guidelines

### Code Review Process
1. Create feature branch from main
2. Implement changes with proper documentation
3. Test functionality thoroughly
4. Submit pull request with detailed description

### Commit Messages
Use conventional commit format:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code formatting
- `refactor:` Code restructuring

## 📞 Support & Maintenance

### Monitoring
- Server logs for error tracking
- Database performance monitoring
- User feedback collection

### Regular Maintenance
- Database backups
- Security updates
- Performance optimization
- Feature updates based on user needs

---

**Last Updated**: July 26, 2025
**Version**: 1.0.0
**Maintainer**: [Your Name/Team]
