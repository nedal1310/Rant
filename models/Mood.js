import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },

  mood:{type : String,
    required:true
  },
  intensity:{
    type:Number,
    required:true
  },
  content:{
    type:String,
    required:true
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

// this will make a mood per day to a user (clerkId+DATE must have to be unique)
moodSchema.index({ clerkId: 1, date: 1 }, { unique: true });

export default mongoose.models.Mood ||
  mongoose.model("Mood", moodSchema);