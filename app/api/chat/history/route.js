import connectDB from "@/lib/db";
import Chat from "@/models/Chat";

//get all the msgs from the chat
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

//delete the chat for a day
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const chatId = searchParams.get("chatId");
    const userId = searchParams.get("userId");

    if (!chatId || !userId) {
      return Response.json(
        { message: "Missing chatId or userId" },
        { status: 400 }
      );
    }

    const deletedChat = await Chat.findOneAndDelete({
      _id: chatId,
      clerkId: userId,
    });

    if (!deletedChat) {
      return Response.json(
        { message: "Chat not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Chat deleted successfully",
    });

  } catch (error) {
    console.error("Delete Chat Error:", error);

    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}