/**
 * Schedule Component Documentation
 * 
 * Purpose: Interactive calendar and event management system
 * Location: /src/pages/schedule/Schedule.jsx
 * 
 * Features:
 * - Interactive monthly calendar view
 * - Expandable day view with full event details
 * - Hierarchical events list (Week → Day → Event)
 * - Event registration (join/leave) functionality
 * - Real-time participant count updates
 * - Responsive design for all devices
 * 
 * State Management:
 * - currentDate: Date - Currently selected date
 * - currentYear: number - Current year for calendar
 * - currentMonth: number - Current month for calendar
 * - events: array - All events loaded from API
 * - loading: boolean - Loading state for API calls
 * - joinLoading: object - Loading states for join/leave actions
 * - message: object - Success/error messages
 * - expandedDay: string - Currently expanded calendar day
 * - expandedWeeks: Set - Set of expanded week keys
 * - expandedDays: Set - Set of expanded day keys
 * 
 * Key Functions:
 * - loadScheduleData(): Fetch events from API
 * - previousMonth/nextMonth(): Calendar navigation
 * - getCalendarDays(): Generate calendar grid
 * - getEventsForDate(date): Filter events by date
 * - getCurrentMonthEventsByWeeks(): Organize events by weeks
 * - joinEvent(eventId): Register for event
 * - leaveEvent(eventId): Unregister from event
 * - handleDayClick(date): Expand/collapse calendar day
 * - toggleWeekExpansion(weekKey): Expand/collapse week
 * - toggleDayExpansion(dayKey): Expand/collapse day
 * 
 * Calendar Features:
 * - Monthly grid view with 7x6 layout
 * - Today highlighting
 * - Event indicators on calendar days
 * - Click to expand days with events
 * - Escape key to close expanded view
 * - Smooth animations for expand/collapse
 * 
 * Events List Features:
 * - Three-level hierarchy: Week → Day → Event
 * - Progressive disclosure for better UX
 * - Event counts at week and day levels
 * - Collapsible sections with visual indicators
 * - Full event details in expanded view
 * 
 * Event Card Information:
 * - Event title and time
 * - Event description
 * - Event type (class, workshop, seminar, etc.)
 * - Instructor information
 * - Participant count and limits
 * - Join/Leave buttons (when authenticated)
 * - Login prompts for unauthenticated users
 * 
 * API Integration:
 * - GET /api/events: Load all events
 * - POST /api/events/:id/join: Join event
 * - POST /api/events/:id/leave: Leave event
 * - JWT authentication for protected actions
 * 
 * Responsive Design:
 * - Mobile-first approach
 * - Touch-friendly interface
 * - Optimized calendar layout for small screens
 * - Responsive typography and spacing
 * 
 * Performance Optimizations:
 * - Efficient event filtering and sorting
 * - Memoized calendar calculations
 * - Debounced API calls
 * - Optimistic UI updates
 * 
 * Accessibility:
 * - Keyboard navigation support
 * - ARIA labels for interactive elements
 * - Screen reader friendly calendar
 * - Focus management for modal views
 * 
 * Error Handling:
 * - Network error recovery
 * - User-friendly error messages
 * - Loading state management
 * - Graceful degradation
 */
