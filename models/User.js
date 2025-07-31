// User Data Model - MongoDB schema for user accounts
import mongoose from "mongoose";

// Define user schema with validation rules
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Prevent duplicate usernames
      trim: true, // Remove whitespace
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Prevent duplicate emails
      trim: true,
      lowercase: true, // Store in lowercase
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum security requirement
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: function () {
        return this.role === "user";
      },
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    accessCodeUsed: {
      type: String,
      required: function () {
        return this.role === "user";
      },
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });

export default mongoose.model("User", userSchema);
