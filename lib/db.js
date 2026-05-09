"use server"
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
console.log("connected with thhe MONGODB_URI");
export default async function connectDB() {
  console.log("Connecting to MongoDB...");
  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "rant", //  important for Next.js apps
      bufferCommands: false, //  prevents weird hanging
    });
  }

  cached.conn = await cached.promise;
console.log("MongoDB connected");
return cached.conn;
}