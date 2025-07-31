// Event Data Model - MongoDB schema for karate events and classes
import mongoose from "mongoose";

// Define event schema for classes, tests, and tournaments
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true, // Event date is mandatory
    },
    time: {
      type: String,
      required: true, // Event time as string (e.g., "7:00 PM")
    },
    type: {
      type: String,
      enum: [ // Predefined event types
        "class",
        "test",
        "tournament",
        "seminar",
        "special",
        "workshop",
        "demo",
      ],
      default: "class",
    },
    description: {
      type: String,
      trim: true,
    },
    instructor: {
      type: String,
      trim: true,
    },
    maxParticipants: {
      type: Number,
      default: null,
    },
    registeredParticipants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        registeredAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
eventSchema.index({ date: 1 });
eventSchema.index({ type: 1 });
eventSchema.index({ isActive: 1 });

export default mongoose.model("Event", eventSchema);
