/**
 * Event Model Documentation
 * 
 * Purpose: Defines event schema for martial arts classes and activities
 * Location: /models/Event.js
 * 
 * Schema Fields:
 * 
 * Required Fields:
 * - title: String (event name, 3-100 chars)
 * - date: Date (event date)
 * - time: String (event time, e.g., "6:00 PM")
 * - createdBy: ObjectId (reference to User who created the event)
 * 
 * Optional Fields:
 * - description: String (detailed event description, max 500 chars)
 * - type: String (enum: 'class', 'workshop', 'seminar', 'tournament', 'special')
 * - instructor: String (instructor name, max 100 chars)
 * - maxParticipants: Number (participant limit, min 1, max 200)
 * - registeredParticipants: Array of embedded participant objects
 * - createdAt: Date (auto-generated timestamp)
 * - updatedAt: Date (auto-updated timestamp)
 * 
 * Embedded Participant Schema:
 * - user: ObjectId (reference to User)
 * - registeredAt: Date (registration timestamp, default: now)
 * 
 * Indexes:
 * - date: index for date-based queries
 * - type: index for filtering by event type
 * - createdBy: index for user's events
 * - compound index: (date, type) for optimized filtering
 * 
 * Validation Rules:
 * - Title: 3-100 characters, required
 * - Date: Valid date object, required
 * - Time: String format (flexible for different time formats)
 * - Type: Must be one of the predefined enum values
 * - maxParticipants: Positive integer, max 200
 * - Description: Max 500 characters
 * 
 * Virtual Fields:
 * - currentParticipants: Number (computed from registeredParticipants.length)
 * - isFull: Boolean (computed from currentParticipants >= maxParticipants)
 * - spotsRemaining: Number (computed from maxParticipants - currentParticipants)
 * 
 * Event Types:
 * - 'class': Regular martial arts classes
 * - 'workshop': Special training sessions
 * - 'seminar': Educational events
 * - 'tournament': Competition events
 * - 'special': Community events, open houses, etc.
 * 
 * Usage Examples:
 * 
 * Create new event:
 * ```javascript
 * const event = new Event({
 *   title: 'Beginner Karate Class',
 *   description: 'Introduction to basic karate techniques',
 *   date: new Date('2025-07-26'),
 *   time: '6:00 PM',
 *   type: 'class',
 *   instructor: 'Sensei Johnson',
 *   maxParticipants: 20,
 *   createdBy: adminUserId
 * });
 * await event.save();
 * ```
 * 
 * Find events by date range:
 * ```javascript
 * const events = await Event.find({
 *   date: {
 *     $gte: new Date('2025-07-01'),
 *     $lte: new Date('2025-07-31')
 *   }
 * }).sort({ date: 1, time: 1 });
 * ```
 * 
 * Add participant to event:
 * ```javascript
 * await Event.findByIdAndUpdate(eventId, {
 *   $push: {
 *     registeredParticipants: {
 *       user: userId,
 *       registeredAt: new Date()
 *     }
 *   }
 * });
 * ```
 * 
 * Remove participant from event:
 * ```javascript
 * await Event.findByIdAndUpdate(eventId, {
 *   $pull: {
 *     registeredParticipants: { user: userId }
 *   }
 * });
 * ```
 * 
 * Find events by type:
 * ```javascript
 * const classes = await Event.find({ type: 'class' });
 * const workshops = await Event.find({ type: 'workshop' });
 * ```
 * 
 * Population Examples:
 * 
 * Populate creator and participants:
 * ```javascript
 * const event = await Event.findById(eventId)
 *   .populate('createdBy', 'username email')
 *   .populate('registeredParticipants.user', 'username email firstName lastName');
 * ```
 * 
 * Aggregation Examples:
 * 
 * Events by type statistics:
 * ```javascript
 * const stats = await Event.aggregate([
 *   { $group: { _id: '$type', count: { $sum: 1 } } }
 * ]);
 * ```
 * 
 * Monthly event count:
 * ```javascript
 * const monthlyStats = await Event.aggregate([
 *   {
 *     $group: {
 *       _id: {
 *         year: { $year: '$date' },
 *         month: { $month: '$date' }
 *       },
 *       count: { $sum: 1 }
 *     }
 *   }
 * ]);
 * ```
 * 
 * Business Logic:
 * 
 * Registration Rules:
 * - Users can only register once per event
 * - Cannot register if event is full (maxParticipants reached)
 * - Cannot register for past events
 * - Only authenticated users can register
 * 
 * Admin Capabilities:
 * - Create, update, delete events
 * - View all participants
 * - Override participant limits
 * - Bulk event operations
 * 
 * User Capabilities:
 * - View all events
 * - Register/unregister for events
 * - View their registered events
 * - Filter events by date/type
 * 
 * Related Models:
 * - User: Events are created by users and have user participants
 * - AccessCode: Event creation restricted to authenticated users
 * 
 * Performance Considerations:
 * - Indexed queries for date ranges and types
 * - Efficient participant lookup with embedded documents
 * - Pagination for large event lists
 * - Caching for frequently accessed events
 */
