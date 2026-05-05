import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: String,
  username: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User ||
  mongoose.model("User", userSchema);