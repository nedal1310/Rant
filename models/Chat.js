import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },

  title: {
    type: String,
    default: "New Chat",
  },

  date: {
    type: String, // "2026-05-01"
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// this will make a chat per day to a user (clerkId+DATE must have to be unique)
chatSchema.index({ clerkId: 1, date: 1 }, { unique: true });

export default mongoose.models.Chat ||
  mongoose.model("Chat", chatSchema);