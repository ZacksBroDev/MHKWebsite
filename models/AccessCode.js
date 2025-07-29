import mongoose from "mongoose";

const accessCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    usedBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        usedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    expiresAt: {
      type: Date,
      default: null, // null means never expires
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
accessCodeSchema.index({ code: 1 });
accessCodeSchema.index({ isActive: 1 });
accessCodeSchema.index({ createdBy: 1 });

export default mongoose.model("AccessCode", accessCodeSchema);
