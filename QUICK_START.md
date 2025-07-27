# Quick Start Guide

## 🚀 Get Up and Running in 5 Minutes

### Prerequisites
- Node.js v16+ installed
- MongoDB installed locally
- Git

### Installation Steps

1. **Clone & Install**
   ```bash
   git clone [repository-url]
   cd MHKWebsite
   npm install
   ```

2. **Environment Setup**
   Create `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/mhk_karate
   JWT_SECRET=your-secret-key-here
   ADMIN_SECRET=admin123
   DEFAULT_ACCESS_CODE=MARTIAL2025
   ```

3. **Start MongoDB**
   ```bash
   # MongoDB must be running locally
   mongod
   ```

4. **Populate Database (First Time Only)**
   ```bash
   node scripts/populate-yearly-events.mjs
   ```

5. **Start Application**
   ```bash
   # Terminal 1: Backend
   node server.js

   # Terminal 2: Frontend
   npm run dev
   ```

6. **Access Application**
   - Frontend: http://localhost:5174
   - Backend: http://localhost:3001

### Test Accounts

**Admin User** (created by population script):
- Username: `admin`
- Password: `admin123`

**Regular User** (register with access code):
- Access Code: `MARTIAL2025`

### Common Commands

```bash
# Development
npm run dev              # Start frontend dev server
node server.js           # Start backend server
npm run start:mongo      # Start MongoDB (if configured)

# Database
node scripts/populate-yearly-events.mjs  # Seed database
mongosh mhk_karate       # Access MongoDB shell

# Building
npm run build            # Build for production
npm run preview          # Preview production build
```

### Quick Testing

1. Visit http://localhost:5174
2. Click "Login" in navigation
3. Try admin login (admin/admin123)
4. Or register new user with code: MARTIAL2025
5. Navigate to Schedule to see events
6. Click on calendar days to expand events

### Troubleshooting

**Port Already in Use:**
- Frontend uses 5174 (or next available)
- Backend uses 3001
- Check for other running processes

**MongoDB Connection Issues:**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify database name: `mhk_karate`

**Build Errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version`
- Ensure all dependencies installed

### Next Steps

- Read [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for detailed documentation
- Check [docs/](./docs/) folder for component documentation
- Review API endpoints in [server.js](./server.js)
- Explore component structure in [src/](./src/)

### Need Help?

- Check [docs/guides/troubleshooting.md](./docs/guides/troubleshooting.md)
- Review console logs for error details
- Verify all services are running correctly
