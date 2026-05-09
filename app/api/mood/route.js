import connectDB from "@/lib/db";
import Mood from "@/models/Mood";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    await connectDB();
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("userId:", userId);
    console.log("body:", body);

    const mood = await Mood.findOneAndUpdate(
      { clerkId: userId, date: body.date },
      { $set: body },
      { upsert: true, new: true }
    );

    return Response.json(mood);
  } catch (err) {
    console.error("POST /api/mood error:", err.message); 
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const { userId } = await auth();

    const moods = await Mood.find({ clerkId: userId });
    return Response.json(moods);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}