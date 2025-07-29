import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import User from "./models/User.js";
import AccessCode from "./models/AccessCode.js";
import Event from "./models/Event.js";
import { sendAccessCodeSMS, sendWelcomeSMS } from "./services/smsService.js";
import { sendPasswordResetEmail, sendWelcomeEmail } from "./services/emailService.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "mhk-secret-key-2025";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "admin123";
const DEFAULT_ACCESS_CODE = process.env.DEFAULT_ACCESS_CODE || "MARTIAL2025";

// Utility function to generate random access codes
const generateRandomAccessCode = (length = 8) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Middleware to verify admin role
const authenticateAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

// Initialize default access code if none exist
const initializeDefaultAccessCode = async () => {
  try {
    const existingCodes = await AccessCode.find({});
    if (existingCodes.length === 0) {
      const defaultCode = new AccessCode({
        code: process.env.DEFAULT_ACCESS_CODE || "MARTIAL2025",
        createdBy: null,
        description: "Default access code for initial users",
        isActive: true,
      });
      await defaultCode.save();
      console.log("Default access code created:", defaultCode.code);
    }
  } catch (error) {
    console.error("Error initializing default access code:", error);
  }
};

// Initialize default access code on startup
initializeDefaultAccessCode();

// Health check endpoint for Docker
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    const mongoose = await import('mongoose');
    if (mongoose.default.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      service: 'Mile High Karate API'
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// Regular signup route

// AUTH ROUTES

// Register new user (requires access code)
app.post("/api/signup", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      accessCode,
      firstName,
      lastName,
    } = req.body;

    // Validate required fields - access code is MANDATORY
    if (
      !username ||
      !email ||
      !password ||
      !phone ||
      !accessCode ||
      !firstName ||
      !lastName
    ) {
      return res
        .status(400)
        .json({ error: "All fields are required, including access code" });
    }

    // Trim and validate access code format
    const cleanAccessCode = accessCode.trim().toUpperCase();
    if (!cleanAccessCode) {
      return res.status(400).json({ error: "Access code cannot be empty" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Check if this email/username has already used ANY access code
    const userWithAccessCode = await User.findOne({
      $or: [{ username }, { email }],
      accessCodeUsed: { $exists: true, $ne: null, $ne: "" },
    });

    if (userWithAccessCode) {
      return res
        .status(400)
        .json({ error: "This user has already used an access code" });
    }

    // Check if access code exists and is valid
    const validAccessCode = await AccessCode.findOne({
      code: cleanAccessCode,
      isActive: true,
    });

    if (!validAccessCode) {
      return res.status(400).json({ error: "Invalid or expired access code" });
    }

    // Check if access code has already been used (one use per code)
    if (validAccessCode.usedBy && validAccessCode.usedBy.length > 0) {
      return res
        .status(400)
        .json({ error: "This access code has already been used" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      accessCodeUsed: cleanAccessCode,
      role: "user",
    });

    await newUser.save();

    // Update access code usage - add this user to the used list
    validAccessCode.usedBy.push({
      user: newUser._id,
      usedAt: new Date(),
    });
    validAccessCode.usedCount = validAccessCode.usedBy.length;
    await validAccessCode.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser._id,
        username: newUser.username,
        role: newUser.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Register new admin (requires admin password)
app.post("/api/admin-signup", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      adminPassword,
      firstName,
      lastName,
      phone,
    } = req.body;

    // Validate required fields
    if (
      !username ||
      !email ||
      !password ||
      !adminPassword ||
      !firstName ||
      !lastName
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Verify admin password
    if (adminPassword !== ADMIN_SECRET) {
      return res.status(400).json({ error: "Invalid admin password" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user
    const newAdmin = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone: phone || "Admin - No Phone Set", // Default placeholder for admin
      role: "admin",
      accessCodeUsed: ADMIN_SECRET, // Record the admin secret as their access code
    });

    await newAdmin.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newAdmin._id,
        username: newAdmin.username,
        role: newAdmin.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Admin user created successfully",
      token,
      user: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error("Admin signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Login user
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get user profile
app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ACCESS CODE ROUTES (Admin only)

// Generate random access code
app.get(
  "/api/generate-access-code",
  authenticateToken,
  authenticateAdmin,
  async (req, res) => {
    try {
      let randomCode;
      let isUnique = false;
      let attempts = 0;
      const maxAttempts = 10;

      // Generate a unique code (try up to 10 times)
      while (!isUnique && attempts < maxAttempts) {
        randomCode = generateRandomAccessCode();
        const existingCode = await AccessCode.findOne({ code: randomCode });
        if (!existingCode) {
          isUnique = true;
        }
        attempts++;
      }

      if (!isUnique) {
        return res
          .status(500)
          .json({ error: "Failed to generate unique access code" });
      }

      res.json({
        code: randomCode,
        message: "Random access code generated successfully",
      });
    } catch (error) {
      console.error("Generate access code error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Send access code via SMS
app.post(
  "/api/send-access-code-sms",
  authenticateToken,
  authenticateAdmin,
  async (req, res) => {
    try {
      const { phoneNumber, accessCode, userName } = req.body;

      // Validate required fields
      if (!phoneNumber || !accessCode) {
        return res.status(400).json({
          error: "Phone number and access code are required",
        });
      }

      // Format phone number (ensure it starts with +1 for US)
      let formattedPhone = phoneNumber.replace(/\D/g, ""); // Remove non-digits
      if (formattedPhone.length === 10) {
        formattedPhone = "+1" + formattedPhone;
      } else if (
        formattedPhone.length === 11 &&
        formattedPhone.startsWith("1")
      ) {
        formattedPhone = "+" + formattedPhone;
      } else {
        return res.status(400).json({
          error: "Invalid phone number format. Use 10-digit US number.",
        });
      }

      // Verify the access code exists and is active
      const validAccessCode = await AccessCode.findOne({
        code: accessCode.toUpperCase(),
        isActive: true,
      });

      if (!validAccessCode) {
        return res.status(400).json({
          error: "Access code not found or inactive",
        });
      }

      // Send SMS
      await sendAccessCodeSMS(formattedPhone, accessCode, userName || "");

      res.json({
        message: "Access code sent successfully via SMS",
        phoneNumber: formattedPhone,
        accessCode: accessCode,
      });
    } catch (error) {
      console.error("Send SMS error:", error);
      res.status(500).json({
        error: "Failed to send SMS. Check Twilio configuration.",
      });
    }
  }
);

// Create new access code
app.post(
  "/api/access-codes",
  authenticateToken,
  authenticateAdmin,
  async (req, res) => {
    try {
      const { code, description } = req.body;

      if (!code) {
        return res.status(400).json({ error: "Access code is required" });
      }

      // Check if code already exists
      const existingCode = await AccessCode.findOne({ code });
      if (existingCode) {
        return res.status(400).json({ error: "Access code already exists" });
      }

      const newAccessCode = new AccessCode({
        code,
        description: description || "",
        createdBy: req.user.userId,
        isActive: true,
      });

      await newAccessCode.save();

      res.status(201).json({
        message: "Access code created successfully",
        accessCode: {
          id: newAccessCode._id,
          code: newAccessCode.code,
          description: newAccessCode.description,
          usedCount: newAccessCode.usedCount,
          isActive: newAccessCode.isActive,
          createdAt: newAccessCode.createdAt,
        },
      });
    } catch (error) {
      console.error("Create access code error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Get all access codes
app.get(
  "/api/access-codes",
  authenticateToken,
  authenticateAdmin,
  async (req, res) => {
    try {
      const accessCodes = await AccessCode.find({})
        .populate("createdBy", "username")
        .sort({ createdAt: -1 });

      res.json({
        accessCodes: accessCodes.map((code) => ({
          id: code._id,
          code: code.code,
          description: code.description,
          usedCount: code.usedCount,
          isActive: code.isActive,
          createdBy: code.createdBy ? code.createdBy.username : "System",
          createdAt: code.createdAt,
        })),
      });
    } catch (error) {
      console.error("Get access codes error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Toggle access code active status
app.patch(
  "/api/access-codes/:id",
  authenticateToken,
  authenticateAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      const accessCode = await AccessCode.findById(id);
      if (!accessCode) {
        return res.status(404).json({ error: "Access code not found" });
      }

      accessCode.isActive = isActive;
      await accessCode.save();

      res.json({
        message: "Access code updated successfully",
        accessCode: {
          id: accessCode._id,
          code: accessCode.code,
          isActive: accessCode.isActive,
        },
      });
    } catch (error) {
      console.error("Update access code error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Delete access code (Admin only)
app.delete(
  "/api/access-codes/:id",
  authenticateToken,
  authenticateAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      const accessCode = await AccessCode.findById(id);
      if (!accessCode) {
        return res.status(404).json({ error: "Access code not found" });
      }

      // Prevent deletion of the default access code
      if (
        accessCode.code === DEFAULT_ACCESS_CODE ||
        accessCode.code === ADMIN_SECRET
      ) {
        return res.status(400).json({
          error: "Cannot delete default system access codes",
        });
      }

      await AccessCode.findByIdAndDelete(id);

      res.json({
        message: "Access code deleted successfully",
        deletedCode: accessCode.code,
      });
    } catch (error) {
      console.error("Delete access code error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// EVENT ROUTES

// Add new event (admin only)
app.post(
  "/api/events",
  authenticateToken,
  authenticateAdmin,
  async (req, res) => {
    try {
      const { title, description, date, time, maxParticipants } = req.body;

      if (!title || !date || !time) {
        return res
          .status(400)
          .json({ error: "Title, date, and time are required" });
      }

      const newEvent = new Event({
        title,
        description: description || "",
        date: new Date(date),
        time,
        maxParticipants: maxParticipants || null,
        createdBy: req.user.userId,
      });

      await newEvent.save();

      res.status(201).json({
        message: "Event created successfully",
        event: {
          id: newEvent._id,
          title: newEvent.title,
          description: newEvent.description,
          date: newEvent.date,
          time: newEvent.time,
          maxParticipants: newEvent.maxParticipants,
          currentParticipants: newEvent.registeredParticipants.length,
          createdAt: newEvent.createdAt,
        },
      });
    } catch (error) {
      console.error("Create event error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Get all events
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find({})
      .populate("createdBy", "username")
      .populate("registeredParticipants.user", "username email")
      .sort({ date: 1 });

    res.json({
      events: events.map((event) => ({
        id: event._id,
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        maxParticipants: event.maxParticipants,
        currentParticipants: event.registeredParticipants.length,
        participants: event.registeredParticipants
          .filter((p) => p.user) // Filter out null users
          .map((p) => ({
            id: p.user._id,
            username: p.user.username,
            email: p.user.email,
            registeredAt: p.registeredAt,
          })),
        createdBy: event.createdBy ? event.createdBy.username : "System",
        createdAt: event.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get events error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Join event
app.post("/api/events/:id/join", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check if user is already registered
    const isAlreadyRegistered = event.registeredParticipants.some(
      (participant) => participant.user.toString() === userId
    );

    if (isAlreadyRegistered) {
      return res
        .status(400)
        .json({ error: "Already registered for this event" });
    }

    // Check if event is full
    if (
      event.maxParticipants &&
      event.registeredParticipants.length >= event.maxParticipants
    ) {
      return res.status(400).json({ error: "Event is full" });
    }

    // Add user to participants using findByIdAndUpdate to avoid validation issues
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        $push: {
          registeredParticipants: {
            user: userId,
            registeredAt: new Date(),
          },
        },
      },
      { new: true }
    );

    res.json({
      message: "Successfully joined event",
      event: {
        id: updatedEvent._id,
        title: updatedEvent.title,
        currentParticipants: updatedEvent.registeredParticipants.length,
      },
    });
  } catch (error) {
    console.error("Join event error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Leave event
app.post("/api/events/:id/leave", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check if user is registered
    const isRegistered = event.registeredParticipants.some(
      (participant) => participant.user.toString() === userId
    );

    if (!isRegistered) {
      return res.status(400).json({ error: "Not registered for this event" });
    }

    // Remove user from participants using findByIdAndUpdate to avoid validation issues
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        $pull: {
          registeredParticipants: { user: userId },
        },
      },
      { new: true }
    );

    res.json({
      message: "Successfully left event",
      event: {
        id: updatedEvent._id,
        title: updatedEvent.title,
        currentParticipants: updatedEvent.registeredParticipants.length,
      },
    });
  } catch (error) {
    console.error("Leave event error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// USER MANAGEMENT ROUTES (Admin only)

// Update existing admin users to show admin secret (one-time fix)
app.post(
  "/api/update-admin-access-codes",
  authenticateToken,
  authenticateAdmin,
  async (req, res) => {
    try {
      // Update all admin users that don't have an accessCodeUsed field
      const result = await User.updateMany(
        {
          role: "admin",
          $or: [
            { accessCodeUsed: { $exists: false } },
            { accessCodeUsed: null },
            { accessCodeUsed: "" },
          ],
        },
        {
          $set: { accessCodeUsed: ADMIN_SECRET },
        }
      );

      res.json({
        message: `Updated ${result.modifiedCount} admin users with access code`,
        modifiedCount: result.modifiedCount,
      });
    } catch (error) {
      console.error("Update admin access codes error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Update admin users without phone numbers (one-time fix)
app.post(
  "/api/update-admin-phones",
  authenticateToken,
  authenticateAdmin,
  async (req, res) => {
    try {
      // Update all admin users that don't have phone numbers
      const result = await User.updateMany(
        {
          role: "admin",
          $or: [{ phone: { $exists: false } }, { phone: null }, { phone: "" }],
        },
        {
          $set: { phone: "Admin - No Phone Set" },
        }
      );

      res.json({
        message: `Updated ${result.modifiedCount} admin users with phone placeholder`,
        modifiedCount: result.modifiedCount,
      });
    } catch (error) {
      console.error("Update admin phones error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Get all users
app.get(
  "/api/users",
  authenticateToken,
  authenticateAdmin,
  async (req, res) => {
    try {
      const users = await User.find({})
        .select("-password")
        .sort({ createdAt: -1 });

      res.json({
        users: users.map((user) => ({
          id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          role: user.role,
          accessCodeUsed: user.accessCodeUsed,
          createdAt: user.createdAt,
        })),
      });
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Delete user (Admin only)
app.delete(
  "/api/users/:id",
  authenticateToken,
  authenticateAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Prevent admin from deleting themselves
      if (id === req.user.userId) {
        return res.status(400).json({
          error: "You cannot delete your own account",
        });
      }

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Delete the user
      await User.findByIdAndDelete(id);

      res.json({
        message: `User ${user.username} has been permanently deleted`,
        deletedUser: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Check if user can use access code (helper endpoint for frontend validation)
app.post("/api/validate-access-code", async (req, res) => {
  try {
    const { accessCode, email, username } = req.body;

    if (!accessCode || (!email && !username)) {
      return res
        .status(400)
        .json({ error: "Access code and user identifier required" });
    }

    const cleanAccessCode = accessCode.trim().toUpperCase();

    // Check if user already has used any access code
    const existingUserWithCode = await User.findOne({
      $or: [...(email ? [{ email }] : []), ...(username ? [{ username }] : [])],
      accessCodeUsed: { $exists: true, $ne: null, $ne: "" },
    });

    if (existingUserWithCode) {
      return res.status(400).json({
        valid: false,
        error:
          "This user has already used an access code and cannot use another",
      });
    }

    // Check if access code exists and is valid
    const validAccessCode = await AccessCode.findOne({
      code: cleanAccessCode,
      isActive: true,
    });

    if (!validAccessCode) {
      return res.status(400).json({
        valid: false,
        error: "Invalid or expired access code",
      });
    }

    // Check usage limit
    if (
      validAccessCode.usageLimit &&
      validAccessCode.usedBy.length >= validAccessCode.usageLimit
    ) {
      return res.status(400).json({
        valid: false,
        error: "Access code usage limit reached",
      });
    }

    // Check expiration
    if (validAccessCode.expiresAt && validAccessCode.expiresAt < new Date()) {
      return res.status(400).json({
        valid: false,
        error: "Access code has expired",
      });
    }

    res.json({
      valid: true,
      message: "Access code is valid and available for use",
      description: validAccessCode.description,
    });
  } catch (error) {
    console.error("Validate access code error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// LEGACY ROUTES (for backward compatibility)
app.get("/api/schedule", async (req, res) => {
  try {
    const events = await Event.find({}).sort({ date: 1 });
    res.json({
      schedule: events.map((event) => ({
        id: event._id,
        title: event.title,
        date: event.date,
        time: event.time,
      })),
    });
  } catch (error) {
    console.error("Get schedule error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Password Reset Routes
app.post("/api/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json({ message: "If an account exists with this email, a password reset link has been sent." });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // In a real app, you'd send an email here
    // For now, we'll log the reset link to console
    const resetLink = `http://localhost:5173/?token=${resetToken}`;
    
    // Send password reset email
    const emailResult = await sendPasswordResetEmail(user.email, resetLink, user.username);
    
    if (!emailResult.success) {
      console.error('Failed to send reset email:', emailResult.error);
    }
    
    res.json({ 
      message: "If an account exists with this email, a password reset link has been sent.",
      // Remove this in production - only for testing
      resetLink: process.env.NODE_ENV === 'development' ? resetLink : undefined
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: "Token and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Verify the reset token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    // Find the user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });

    console.log(`✅ Password reset successful for user: ${user.email}`);

    res.json({ message: "Password reset successful" });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "MongoDB Server is working!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 MongoDB connected`);
  console.log(`🔐 Admin secret: ${ADMIN_SECRET}`);
  console.log(
    `📝 Default access code: ${
      process.env.DEFAULT_ACCESS_CODE || "MARTIAL2025"
    }`
  );
});
