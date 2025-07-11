import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
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
