import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import User from "./models/User.js";
import AccessCode from "./models/AccessCode.js";
import Event from "./models/Event.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "mhk-secret-key-2025";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "admin123";

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// SIGNUP ROUTE
app.post("/api/signup", async (req, res) => {
  console.log("Signup request received:", req.body);

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }

  try {
    const users = getUsers();

    // Check if user already exists
    const existingUser = users.find(
      (u) => u.username === username || u.email === email
    );
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    // Save user
    users.push(newUser);
    saveUsers(users);

    // Create token
    const token = jwt.sign({ id: newUser.id, username, email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    console.log("User created successfully:", newUser.id);

    res.json({
      success: true,
      message: "User created successfully",
      token,
      user: { id: newUser.id, username, email },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN ROUTE
app.post("/api/login", async (req, res) => {
  console.log("Login request received:", req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const users = getUsers();

    // Find user by username or email
    const user = users.find(
      (u) => u.username === username || u.email === username
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log("Login successful for user:", user.username);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET USER PROFILE (Protected Route)
app.get("/api/profile", authenticateToken, (req, res) => {
  const users = getUsers();
  const user = users.find((u) => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Test at: http://localhost:${PORT}/api/test`);
  console.log(`📝 Signup: POST http://localhost:${PORT}/api/signup`);
  console.log(`🔐 Login: POST http://localhost:${PORT}/api/login`);
  console.log(`👤 Profile: GET http://localhost:${PORT}/api/profile`);
});