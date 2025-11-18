# 🥋 Mile High Karate - Learning Platform# 🥋 Mile High Karate - Complete Learning Platform

> **About:** A React-based web application built to help karate students learn and prepare for belt tests. Features comprehensive event scheduling and interactive learning modules.> **About:** A full-stack web application built to help karate students learn and prepare for belt tests. Built with React, Node.js, and MongoDB.

> >

> **Live Site:** [https://www.mhktraining.com](https://www.mhktraining.com)> **Follow me:** [GitHub @ZacksBroDev](https://github.com/ZacksBroDev) | [LinkedIn](https://linkedin.com/in/zackaryzbrown) | [Instagram] (https://www.instagram.com/zackfullstack/) | [Youtube] (https://www.youtube.com/@ZackFullStack)

A comprehensive web application designed to help karate students learn, practice, and prepare for belt tests. This platform modernizes martial arts education with interactive learning modules and comprehensive event management.

A comprehensive web application designed to help karate students learn, practice, and prepare for belt tests. This all-in-one platform modernizes martial arts education with interactive learning modules, event management, and community features.

## 🎯 Project Vision

## 🎯 Project Vision

Mile High Karate bridges traditional martial arts with modern technology, providing students with structured learning materials, practice resources, and comprehensive scheduling in one centralized platform.

Mile High Karate bridges traditional martial arts with modern technology, providing students with structured learning materials, practice resources, and community engagement in one centralized platform.

### 🌟 Core Features

### 🌟 Core Features

- **📚 Interactive Learning System** - Belt-level progression from beginner to advanced

- **📅 Comprehensive Event Scheduling** - Year-round class schedules with 1700+ events- **📚 Interactive Learning System** - Belt-level progression from beginner to advanced

- **🥋 Fighting Style Modules** - Detailed technique breakdowns by belt level- **📅 Event & Class Management** - Schedule training, seminars, and belt tests

- **📱 Fully Responsive** - Mobile-first design for all devices- **👥 Student Community** - Connect with practitioners and instructors

- **⚡ Fast Performance** - Frontend-only architecture for optimal speed- **🔐 Role-Based Access** - Students, Instructors, and Administrators

- **🎨 Modern UI** - Clean, accessible design with tabbed navigation- **📱 Fully Responsive** - Mobile-first design for all devices

- **⚡ Real-time Updates** - Live notifications and schedule changes

## 🏗️ Technical Stack- **🛡️ Enterprise Security** - JWT auth, password hashing, input validation

**Frontend:** React 19, React Router, Vite ## 🏗️ Technical Stack

**Styling:** CSS Modules, Modern CSS

**Build:** Vite 6.3.5 **Frontend:** React 19, React Router, Vite, CSS Modules

**Hosting:** AWS Amplify **Backend:** Node.js, Express.js, MongoDB, Mongoose

**Analytics:** Google Analytics 4 **Infrastructure:** Docker, Nginx, JWT Authentication

**Security:** bcrypt, CORS, Environment Variables

## 🚀 Quick Start

## 🚀 Quick Start

### Development

### Option 1: Docker (Recommended)

```````bash

# Clone the repository```bash

git clone https://github.com/bmxbro01/MHKWebsite.git# Clone and start

cd MHKWebsitegit clone https://github.com/ZacksBroDev/MHKWebsite.git

cd MHKWebsite

# Install dependenciescp .env.example .env

npm installdocker compose up -d



# Start development server# Access at www.mhktraining/com

npm run dev```



# Build for production### Option 2: Development

npm run build

``````bash

# Install dependencies

### Project Structurenpm install



```# Start servers

src/npm run server:dev    # Backend (Terminal 1)

├── components/          # Reusable UI componentsnpm run dev          # Frontend (Terminal 2)

│   ├── auth/           # Authentication components

│   ├── events/         # Event display components# Access at www.mhktraining/com

│   ├── layout/         # Navigation and footer```

│   └── ui/             # Basic UI elements

├── pages/              # Main application pages### Authentication

│   ├── fightStyle/     # Belt technique modules

│   ├── schedule/       # Event scheduling```bash

│   ├── contact/        # Contact formPOST /api/signup          # User registration

│   └── admin/          # Admin dashboardPOST /api/login           # User authentication

├── contexts/           # React contextsPOST /api/forgot-password # Password reset

├── config/             # API configuration```

└── mock-api.js         # Event data generation

```### Events



## 📚 Learning Modules```bash

GET    /api/events           # List all events

### Fighting Style ProgressionPOST   /api/events           # Create event (admin)

POST   /api/events/:id/join  # Join event

- **Level 1** - White Belt techniques and fundamentalsPOST   /api/events/:id/leave # Leave event

- **Level 2** - Yellow Belt combinations and forms```

- **Level 3** - Orange Belt advanced techniques with tabbed interface

- **Black Belt Degrees** - Advanced practitioner modules### Administration



Each module includes:```bash

- Detailed technique descriptionsGET    /api/users       # List users (admin)

- Belt-specific requirementsDELETE /api/users/:id   # Remove user (admin)

- Progressive skill buildingGET    /api/profile     # User profile

- Interactive expandable cards```



## 📅 Event System## 👥 User Roles & Permissions



The platform features a comprehensive mock API generating over 1700 realistic events including:### Students



- **Classes:** Beginner, Intermediate, Advanced, Black Belt- ✅ Access belt-appropriate learning materials - with video instruction

- **Special Events:** Tournaments, Seminars, Workshops- ✅ Join/leave events and classes

- **Testing:** Belt promotion ceremonies

- **Community:** Open training sessions### Instructors



### Event Features- ✅ Create and manage content

- ✅ Schedule events

- Year-round scheduling (14 months of content)

- Deterministic generation for testing### Administrators

- Realistic class distribution

- Special event integration- ✅ Full system management

- ✅ User account administration

## 🎨 Design System- ✅ Content moderation

- ✅ Analytics and reporting

### Components

## 🛡️ Security Features

- **Responsive Navigation** - Mobile-friendly hamburger menu

- **Event Cards** - Clean, informative event display- **Password Security** - bcrypt hashing with salt rounds

- **Tabbed Interface** - Organized content presentation- **JWT Authentication** - Secure token-based sessions

- **Loading States** - Smooth user experience- **Role-Based Access** - Granular permission system

- **Error Boundaries** - Graceful error handling- **Input Validation** - Server-side data sanitization

- **CORS Protection** - Cross-origin request security

### Styling- **Environment Variables** - Sensitive data protection



- CSS Modules for component isolation## 🏗️ Component Architecture

- Mobile-first responsive design

- Consistent color scheme and typography### Frontend Structure

- Accessibility-focused implementation

```````

## 🚀 Deploymentsrc/

├── components/

The application is deployed on AWS Amplify with:│ ├── auth/ # Authentication components

│ ├── layout/ # Navigation and layout

- **Automatic builds** from main branch│ ├── events/ # Event management

- **Custom domain** at www.mhktraining.com│ ├── ui/ # Reusable UI components

- **SSL certificate** for secure connections│ └── pages/ # Main application pages

- **Global CDN** for fast worldwide access├── contexts/ # React context providers

├── config/ # API configuration

### Build Configuration└── assets/ # Images and styles

````

```javascript

// amplify.yml### Key Components

version: 1

frontend:- **AuthForm** - Login/signup with validation

  phases:- **EventCard** - Reusable event display

    preBuild:- **NavBar** - Responsive navigation

      commands:- **ProtectedRoute** - Route-level authentication

        - npm install- **AdminDashboard** - Complete admin interface

    build:

      commands:## 🚢 Deployment

        - npm run build

  artifacts:### Environment Variables

    baseDirectory: dist

    files:```bash

      - '**/*'# Database

```MONGODB_URI=mongodb://localhost:27017/mhk_karate

MONGO_ROOT_PASSWORD=your-secure-password

## 🔧 Development

# Authentication

### Available ScriptsJWT_SECRET=your-jwt-secret

ADMIN_SECRET=your-admin-secret

- `npm run dev` - Start development server

- `npm run build` - Build for production# Email (Gmail)

- `npm run preview` - Preview production buildEMAIL_USER=your-email@gmail.com

EMAIL_APP_PASSWORD=your-app-password

### Code Quality

# Frontend

- ESLint configuration for React best practicesFRONTEND_URL=https://yourdomain.com

- Modern React features (Hooks, Context)```

- Clean, maintainable component structure

- Consistent naming conventions### Production Deployment



## 📊 Analytics```bash

# Build and deploy

Google Analytics 4 integration provides insights into:npm run build

- User engagement and navigation patternsdocker compose up -d

- Popular content and learning modules

- Device and browser usage statistics# Recommended hosting

- Performance metrics and optimization opportunitiesRailway    # Easy Docker + Database ($5-10/month)

DigitalOcean App Platform ($12+/month)

## 🤝 ContributingAWS ECS    # Enterprise scaling

````

1. Fork the repository

2. Create a feature branch (`git checkout -b feature/amazing-feature`)## 📊 Database Models

3. Commit your changes (`git commit -m 'Add some amazing feature'`)

4. Push to the branch (`git push origin feature/amazing-feature`)### User Schema

5. Open a Pull Request

````javascript

## 📝 License{

  username: String (unique),

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.  email: String (unique),

  password: String (hashed),

## 👨‍💻 Author  role: "student" | "instructor" | "admin",

  accessCodeUsed: String,

**Zackary Brown**  joinedEvents: [ObjectId]

- GitHub: [@bmxbro01](https://github.com/bmxbro01)}

- LinkedIn: [zackaryzbrown](https://linkedin.com/in/zackaryzbrown)```

- Instagram: [@zackfullstack](https://www.instagram.com/zackfullstack/)

- YouTube: [@ZackFullStack](https://www.youtube.com/@ZackFullStack)### Event Schema



---```javascript

{

Built with ❤️ for the martial arts community  title: String,
  description: String,
  date: Date,
  time: String,
  location: String,
  participants: [ObjectId],
  maxParticipants: Number
}
````

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
