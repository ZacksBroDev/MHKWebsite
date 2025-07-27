/**
 * User Model Documentation
 * 
 * Purpose: Defines user schema for authentication and authorization
 * Location: /models/User.js
 * 
 * Schema Fields:
 * 
 * Required Fields:
 * - username: String (unique, 3-50 chars, alphanumeric + underscore)
 * - email: String (unique, valid email format)
 * - password: String (hashed with bcrypt, min 6 chars)
 * - firstName: String (1-50 chars)
 * - lastName: String (1-50 chars)
 * - phone: String (phone number for contact)
 * - role: String (enum: 'user', 'admin', default: 'user')
 * 
 * Optional Fields:
 * - accessCodeUsed: String (tracks which access code was used for registration)
 * - createdAt: Date (auto-generated timestamp)
 * - updatedAt: Date (auto-updated timestamp)
 * 
 * Indexes:
 * - username: unique index for fast lookup
 * - email: unique index for fast lookup
 * - role: index for role-based queries
 * 
 * Validation Rules:
 * - Username: 3-50 characters, alphanumeric and underscore only
 * - Email: Must be valid email format
 * - Password: Minimum 6 characters (hashed before storage)
 * - Names: 1-50 characters each
 * - Phone: Required for contact purposes
 * - Role: Must be 'user' or 'admin'
 * 
 * Security Features:
 * - Password hashing with bcrypt (cost factor 10)
 * - Unique constraints prevent duplicate accounts
 * - Input validation prevents malformed data
 * - Role-based access control
 * 
 * Methods:
 * - comparePassword(candidatePassword): Compare plain text with hashed password
 * - generateAuthToken(): Generate JWT token for user
 * - toPublicJSON(): Return user data without sensitive fields
 * 
 * Usage Examples:
 * 
 * Create new user:
 * ```javascript
 * const user = new User({
 *   username: 'johndoe',
 *   email: 'john@example.com',
 *   password: 'securepassword',
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   phone: '+1234567890',
 *   accessCodeUsed: 'MARTIAL2025'
 * });
 * await user.save();
 * ```
 * 
 * Find user by email:
 * ```javascript
 * const user = await User.findOne({ email: 'john@example.com' });
 * ```
 * 
 * Update user role:
 * ```javascript
 * await User.findByIdAndUpdate(userId, { role: 'admin' });
 * ```
 * 
 * Password verification:
 * ```javascript
 * const isValid = await bcrypt.compare(plainPassword, user.password);
 * ```
 * 
 * Role-based queries:
 * ```javascript
 * const admins = await User.find({ role: 'admin' });
 * const regularUsers = await User.find({ role: 'user' });
 * ```
 * 
 * Registration Process:
 * 1. Validate access code
 * 2. Check for existing username/email
 * 3. Hash password with bcrypt
 * 4. Create user record
 * 5. Mark access code as used
 * 6. Generate JWT token
 * 
 * Authentication Process:
 * 1. Find user by username or email
 * 2. Compare provided password with hashed password
 * 3. Generate JWT token if valid
 * 4. Return user data (excluding password)
 * 
 * Related Models:
 * - AccessCode: Users consume access codes during registration
 * - Event: Users can register for events (registeredParticipants)
 * 
 * Database Relationships:
 * - One-to-Many: User → Events (as creator)
 * - Many-to-Many: User ↔ Events (as participant)
 * - One-to-One: User → AccessCode (used for registration)
 */
