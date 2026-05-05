import connectDB from "@/lib/db";
import Chat from "@/models/Chat";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) return Response.json({ chats: [] }, { status: 401 });

    const chats = await Chat.find({ clerkId: userId })
      .sort({ date: -1 }) // newest first
      .select("date title _id");

    return Response.json({ chats });

  } catch (error) {
    console.error("History Error:", error);
    return Response.json({ chats: [] }, { status: 500 });
  }
}