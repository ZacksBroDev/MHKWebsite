# 🥋 Mile High Karate - Complete Learning Platform

> **About:** A full-stack web application built to help karate students learn and prepare for belt tests. Built with React, Node.js, and MongoDB.
> 
> **Follow me:** [GitHub @ZacksBroDev](https://github.com/ZacksBroDev) | [LinkedIn](https://linkedin.com/in/zackaryzbrown) | [Instagram] (https://www.instagram.com/zackfullstack/) | [Youtube] (https://www.youtube.com/@ZackFullStack) 


A comprehensive web application designed to help karate students learn, practice, and prepare for belt tests. This all-in-one platform modernizes martial arts education with interactive learning modules, event management, and community features.

## 🎯 Project Vision

Mile High Karate bridges traditional martial arts with modern technology, providing students with structured learning materials, practice resources, and community engagement in one centralized platform.

### 🌟 Core Features

- **📚 Interactive Learning System** - Belt-level progression from beginner to advanced
- **📅 Event & Class Management** - Schedule training, seminars, and belt tests
- **👥 Student Community** - Connect with practitioners and instructors
- **🔐 Role-Based Access** - Students, Instructors, and Administrators
- **📱 Fully Responsive** - Mobile-first design for all devices
- **⚡ Real-time Updates** - Live notifications and schedule changes
- **🛡️ Enterprise Security** - JWT auth, password hashing, input validation

## 🏗️ Technical Stack

**Frontend:** React 19, React Router, Vite, CSS Modules  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Infrastructure:** Docker, Nginx, JWT Authentication  
**Security:** bcrypt, CORS, Environment Variables

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone and start
git clone https://github.com/ZacksBroDev/MHKWebsite.git
cd MHKWebsite
cp .env.example .env
docker compose up -d

# Access at http://localhost
```

### Option 2: Development

```bash
# Install dependencies
npm install

# Start servers
npm run server:dev    # Backend (Terminal 1)
npm run dev          # Frontend (Terminal 2)

# Access at http://localhost:5173
```

### Authentication

```bash
POST /api/signup          # User registration
POST /api/login           # User authentication
POST /api/forgot-password # Password reset
```

### Events

```bash
GET    /api/events           # List all events
POST   /api/events           # Create event (admin)
POST   /api/events/:id/join  # Join event
POST   /api/events/:id/leave # Leave event
```

### Administration

```bash
GET    /api/users       # List users (admin)
DELETE /api/users/:id   # Remove user (admin)
GET    /api/profile     # User profile
```

## 👥 User Roles & Permissions

### Students

- ✅ Access belt-appropriate learning materials - with video instruction
- ✅ Join/leave events and classes

### Instructors

- ✅ Create and manage content
- ✅ Schedule events

### Administrators

- ✅ Full system management
- ✅ User account administration
- ✅ Content moderation
- ✅ Analytics and reporting

## 🛡️ Security Features

- **Password Security** - bcrypt hashing with salt rounds
- **JWT Authentication** - Secure token-based sessions
- **Role-Based Access** - Granular permission system
- **Input Validation** - Server-side data sanitization
- **CORS Protection** - Cross-origin request security
- **Environment Variables** - Sensitive data protection

## 🏗️ Component Architecture

### Frontend Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── layout/         # Navigation and layout
│   ├── events/         # Event management
│   ├── ui/             # Reusable UI components
│   └── pages/          # Main application pages
├── contexts/           # React context providers
├── config/             # API configuration
└── assets/             # Images and styles
```

### Key Components

- **AuthForm** - Login/signup with validation
- **EventCard** - Reusable event display
- **NavBar** - Responsive navigation
- **ProtectedRoute** - Route-level authentication
- **AdminDashboard** - Complete admin interface

## 🚢 Deployment

### Environment Variables

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/mhk_karate
MONGO_ROOT_PASSWORD=your-secure-password

# Authentication
JWT_SECRET=your-jwt-secret
ADMIN_SECRET=your-admin-secret

# Email (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password

# Frontend
FRONTEND_URL=https://yourdomain.com
```

### Production Deployment

```bash
# Build and deploy
npm run build
docker compose up -d

# Recommended hosting
Railway    # Easy Docker + Database ($5-10/month)
DigitalOcean App Platform ($12+/month)
AWS ECS    # Enterprise scaling
```

## 📊 Database Models

### User Schema

```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: "student" | "instructor" | "admin",
  accessCodeUsed: String,
  joinedEvents: [ObjectId]
}
```

### Event Schema

```javascript
{
  title: String,
  description: String,
  date: Date,
  time: String,
  location: String,
  participants: [ObjectId],
  maxParticipants: Number
}
```

## 🎛️ Available Scripts

```bash
# Development
npm run dev          # Start frontend dev server
npm run server:dev   # Start backend with nodemon
npm start            # Production server

# Docker
npm run docker:up    # Start all containers
npm run docker:down  # Stop all containers
npm run docker:logs  # View container logs

# Building
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🔍 Troubleshooting

### Common Issues

**MongoDB Connection Failed**

```bash
# Check if MongoDB is running
docker ps | grep mongo
# Restart if needed
docker compose restart mongodb
```

**CORS Errors**

```bash
# Check ALLOWED_ORIGINS in .env
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com
```

**Authentication Issues**

```bash
# Verify JWT_SECRET is set
echo $JWT_SECRET
# Check token in browser localStorage
```

## 📈 Performance Features

- **Code Splitting** - Vite-optimized chunks
- **Lazy Loading** - Route-based component loading
- **Database Indexing** - Optimized queries
- **Nginx Caching** - Static asset optimization
- **Gzip Compression** - Reduced bundle sizes

## 🤝 Contributing

This project welcomes contributions! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is developed for educational and community purposes. Please use responsibly and respect the martial arts community.

---

````

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
````

3. **Deploy with Docker**

   ```bash
   docker compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:3001
   - Admin Panel: http://localhost/admin

### Development Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development servers**

   ```bash
   # Terminal 1: Backend
   npm run server:dev

   # Terminal 2: Frontend
   npm run dev
   ```

## 🔧 API Endpoints

### Authentication

- `POST /api/signup` - User registration
- `POST /api/login` - User authentication
- `POST /api/forgot-password` - Password reset

### Events

- `GET /api/events` - List all events
- `POST /api/events` - Create new event (admin)
- `POST /api/events/:id/join` - Join an event
- `POST /api/events/:id/leave` - Leave an event

### Users

- `GET /api/users` - List users (admin)
- `DELETE /api/users/:id` - Remove user (admin)
- `GET /api/profile` - User profile

## 🛡️ Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Role-based Access** - Granular permission system
- **Input Validation** - Server-side data validation
- **CORS Protection** - Cross-origin request security
- **Environment Variables** - Sensitive data protection

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Mobile devices** (320px+)
- **Tablets** (768px+)
- **Desktop computers** (1024px+)
- **Large displays** (1440px+)

## 🚢 Deployment

### Production Deployment

1. Set production environment variables
2. Build the application: `npm run build`
3. Deploy with Docker: `docker compose up -d`

### Recommended Hosting

- **Railway** - Easy Docker deployment with database
- **DigitalOcean** - App Platform with container support
- **AWS ECS** - Enterprise container hosting

## 📊 Project Status

### Completed Features ✅

- User authentication and authorization
- Event management system
- Learning module structure
- Admin dashboard
- Responsive UI design
- Docker containerization
- Email notifications
- Password reset functionality

### Future Enhancements 🔮

- Progress tracking analytics
- Advanced reporting dashboard

## 🤝 Contributing

This project was developed as a comprehensive solution for martial arts education. If you're interested in contributing or have suggestions for improvements, please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is developed for educational and community purposes. Please respect the martial arts community and use responsibly.

## 🙏 Acknowledgments

- Built with love for the martial arts community
- Inspired by traditional karate teaching methods
- Designed to bridge the gap between traditional and modern learning

---

**Made with 🥋 for karate students everywhere**

_"The ultimate aim of karate lies not in victory nor defeat, but in the perfection of the character of its participants."_ - Gichin Funakoshi
