import connectDB from "@/lib/db";
import Chat from "@/models/Chat";
import Message from "@/models/Message";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { date } = await params; 

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) return Response.json({ messages: [] }, { status: 401 });

    const chat = await Chat.findOne({ clerkId: userId, date });

    if (!chat) return Response.json({ messages: [] });

    const messages = await Message.find({ chatId: chat._id })
      .sort({ createdAt: 1 });

    return Response.json({ messages });

  } catch (error) {
    console.error("Date Error:", error);
    return Response.json({ messages: [] }, { status: 500 });
  }
}