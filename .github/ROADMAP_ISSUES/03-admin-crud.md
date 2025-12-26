# Implement Admin CRUD Operations

## 🎯 Feature Description

Build a fully functional **Admin Dashboard** with Create, Read, Update, Delete (CRUD) operations for events, users, and training sessions. Enable instructors/admins to manage the dojo directly from the web interface.

## 💡 Motivation

**Current State:**
- Admin dashboard is **view-only** (displays data but cannot modify)
- No way to create new events (classes, tournaments, belt tests)
- Cannot edit user roles or deactivate accounts
- Static 1700 events require code changes to update

**Business Value:**
- **Operational Efficiency:** Admins manage events without developer intervention
- **Real-Time Updates:** Schedule changes immediately visible to all students
- **User Management:** Promote students to instructors, manage access codes
- **Ownership Proof:** Demonstrates full-stack capability (frontend + backend + CRUD logic)

## 🛠️ Technical Approach

### 1. Admin Dashboard UI Components

**Event Management:**
```
/admin/events
├─ Event List Table (sortable, filterable)
│  ├─ "Create Event" button → modal form
│  ├─ Edit icon per row → pre-filled form
│  └─ Delete icon → confirmation dialog
└─ Event Form (shared: create/edit)
   ├─ Title, Date, Time, Type, Location
   ├─ Capacity, Description, Instructor
   └─ Save / Cancel buttons
```

**User Management:**
```
/admin/users
├─ User Table (search, role filter)
│  ├─ Email, Name, Role, Belt, Join Date
│  ├─ "Change Role" dropdown → API call
│  ├─ "Deactivate" button → soft delete
│  └─ "View Progress" → training history modal
└─ User Detail Modal
   ├─ Profile info
   ├─ Attendance history (chart)
   └─ Belt progression timeline
```

**Access Code Management:**
```
/admin/access-codes
├─ Code List Table
│  ├─ Code, Type (admin/student), Status, Usage Count
│  ├─ "Generate Code" button → creates new code
│  ├─ "Deactivate" button → marks code inactive
└─ Code Generator Form
   ├─ Code Type (admin/student)
   ├─ Expiration Date
   └─ Usage Limit
```

### 2. API Integration (Frontend)

**Event CRUD:**
```javascript
// src/api/events.js
export const createEvent = async (eventData, token) => {
  const response = await fetch(API_ENDPOINTS.EVENTS, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  });
  return response.json();
};

export const updateEvent = async (eventId, updates, token) => {
  const response = await fetch(`${API_ENDPOINTS.EVENTS}/${eventId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  return response.json();
};

export const deleteEvent = async (eventId, token) => {
  await fetch(`${API_ENDPOINTS.EVENTS}/${eventId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
};
```

**User Management:**
```javascript
// src/api/users.js
export const updateUserRole = async (userId, newRole, token) => {
  const response = await fetch(`${API_ENDPOINTS.USERS}/${userId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ role: newRole })
  });
  return response.json();
};

export const deactivateUser = async (userId, token) => {
  await fetch(`${API_ENDPOINTS.USERS}/${userId}/deactivate`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
};
```

### 3. Backend API Endpoints (Express)

**Event CRUD (Admin Only):**
```javascript
// routes/events.js
router.post('/events', authenticateToken, requireAdmin, async (req, res) => {
  const { title, date, time, type, location, capacity } = req.body;
  
  // Validation
  if (!title || !date || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const event = await Event.create({
    title, date, time, type, location, capacity,
    createdBy: req.user.id,
    createdAt: new Date()
  });
  
  res.status(201).json({ event });
});

router.put('/events/:id', authenticateToken, requireAdmin, async (req, res) => {
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: new Date() },
    { new: true, runValidators: true }
  );
  
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json({ event });
});

router.delete('/events/:id', authenticateToken, requireAdmin, async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json({ message: 'Event deleted' });
});
```

**Authorization Middleware:**
```javascript
// middleware/auth.js
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
```

### 4. Form Validation

**Client-Side (React Hook Form + Zod):**
```javascript
import { z } from 'zod';

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
  type: z.enum(['class', 'tournament', 'seminar', 'belt-test']),
  location: z.string().min(3, 'Location required'),
  capacity: z.number().min(1).max(500).optional()
});
```

**Server-Side (Express Validator):**
```javascript
const { body, validationResult } = require('express-validator');

router.post('/events',
  authenticateToken,
  requireAdmin,
  [
    body('title').trim().isLength({ min: 3 }),
    body('date').isISO8601(),
    body('type').isIn(['class', 'tournament', 'seminar', 'belt-test'])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // ... create event
  }
);
```

### 5. Optimistic UI Updates

```javascript
// src/pages/admin/AdminDashboard.jsx
const handleDeleteEvent = async (eventId) => {
  // Optimistically remove from UI
  setEvents(events.filter(e => e._id !== eventId));
  
  try {
    await deleteEvent(eventId, token);
    showNotification('Event deleted successfully', 'success');
  } catch (error) {
    // Revert on error
    setEvents(prevEvents);
    showNotification('Failed to delete event', 'error');
  }
};
```

## ✅ Acceptance Criteria

**Event Management:**
- [ ] Admin can create new event via modal form (all fields validated)
- [ ] Event list updates in real-time after creation (no page refresh)
- [ ] Admin can edit event → form pre-fills with existing data
- [ ] Delete event shows confirmation dialog ("Are you sure?")
- [ ] Deleted events removed from database and UI immediately
- [ ] Non-admin users cannot see edit/delete buttons
- [ ] Event form validates date (cannot create past events)
- [ ] Capacity field validates max 500 attendees

**User Management:**
- [ ] Admin sees table of all users (sortable by join date)
- [ ] Search bar filters users by email/name
- [ ] "Change Role" dropdown: student → instructor → admin
- [ ] Role change shows success toast notification
- [ ] "Deactivate User" button soft-deletes (user can be restored)
- [ ] User detail modal shows training history (events attended)
- [ ] Belt progression timeline visualized (white → yellow → green → black)

**Access Code Management:**
- [ ] Admin can generate new access codes (admin/student type)
- [ ] Generated code displayed with "Copy to Clipboard" button
- [ ] Code list shows usage count (how many signups used this code)
- [ ] Deactivated codes cannot be used for signup
- [ ] Codes expire after set date (auto-deactivate)

**Security:**
- [ ] All CRUD endpoints require `Authorization: Bearer <token>` header
- [ ] Non-admin API calls return 403 Forbidden
- [ ] SQL injection prevented (parameterized queries)
- [ ] XSS prevented (input sanitization)
- [ ] CSRF tokens for state-changing operations

**UX:**
- [ ] Loading spinners during API calls (create/update/delete)
- [ ] Success/error toast notifications for all actions
- [ ] Form errors displayed inline (red text below fields)
- [ ] Optimistic UI updates (instant feedback, reverts on error)
- [ ] Keyboard shortcuts: Ctrl+S to save form, Esc to close modal

**Testing:**
- [ ] Integration tests: Create → Edit → Delete event flow
- [ ] Role permission tests (student attempts admin action → 403)
- [ ] Form validation tests (missing fields, invalid dates)
- [ ] API error handling (network failure, server 500)

## 📅 Timeline

**Target:** Q2 2026  
**Estimate:** 40-50 hours
- Event CRUD UI: 12-15 hours
- User management UI: 10-12 hours
- Access code management: 6-8 hours
- API integration: 8-10 hours
- Testing & bug fixes: 8-10 hours

**Dependencies:**
- Issue #2 (Database persistence must be complete)
- Issue #1 (Cognito auth for role validation)

## 📚 Resources

- [React Hook Form + Zod](https://react-hook-form.com/get-started#SchemaValidation)
- [Express Validator](https://express-validator.github.io/docs/)
- [OWASP Top 10 Security](https://owasp.org/www-project-top-ten/)
- [Optimistic UI Pattern](https://www.apollographql.com/docs/react/performance/optimistic-ui/)

## 🔗 Related Issues

- #1 AWS Cognito (Role-based access control)
- #2 Database Persistence (Backend API required)
- Future: Audit log for admin actions (track who edited what)

---

**Labels:** `enhancement`, `frontend`, `backend`, `admin`, `roadmap`, `q2-2026`  
**Priority:** High (key feature for operational use)
