import Groq from "groq-sdk";
import connectDB from "@/lib/db";
import Chat from "@/models/Chat";
import Message from "@/models/Message";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ✅ Per-user rate limit (better)
const userLimits = new Map();

function checkRateLimit(userId) {
  const now = Date.now();
  const oneDay = 86400000;

  if (!userLimits.has(userId)) {
    userLimits.set(userId, { count: 0, lastReset: now });
  }

  const user = userLimits.get(userId);

  if (now - user.lastReset > oneDay) {
    user.count = 0;
    user.lastReset = now;
  }

  if (user.count >= 30) return false; // better limit

  user.count++;
  return true;
}

export async function POST(req) {
  try {
    await connectDB();

    // ✅ FIX: extract userId
    const { messages, userId } = await req.json();

    if (!userId) {
      return Response.json(
        { reply: "User not authenticated" },
        { status: 401 }
      );
    }

    // ✅ rate limit per user
    if (!checkRateLimit(userId)) {
      return Response.json(
        { reply: "Daily limit reached 💙" },
        { status: 429 }
      );
    }

    if (!messages || messages.length === 0) {
      return Response.json({ reply: "Say something 🙂" });
    }

    const today = new Date().toISOString().split("T")[0];

    // 1️⃣ Get or create chat
    let chat = await Chat.findOne({ clerkId: userId, date: today });

    if (!chat) {
      chat = await Chat.create({
        clerkId: userId,
        date: today,
        title: "Daily Chat",
      });
    }

    // 2️⃣ Save user message
    const lastUserMessage = messages[messages.length - 1]?.content;

    if (!lastUserMessage) {
      return Response.json({ reply: "Empty message ❌" });
    }

    await Message.create({
      chatId: chat._id,
      role: "user",
      content: lastUserMessage,
    });

    // 3️⃣ AI response (optimized context)
    const context = messages.slice(-3).map(m => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.content,
    }));

    const result = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are Oli, an therapy owl friend who is wise and kind. Keep replies to 2-3 sentences. Rarely say hoot.",
        },
        ...context,
      ],
      max_tokens: 120,
    });

    const reply =
      result.choices[0]?.message?.content || "I'm here for you 💙";

    // 4️⃣ Save AI message
    await Message.create({
      chatId: chat._id,
      role: "ai",
      content: reply,
    });

    return Response.json({ reply });

  } catch (error) {
    console.error("Groq Error:", error);

    if (error?.status === 429) {
      return Response.json(
        { reply: "Too many requests. Slow down 💙" },
        { status: 429 }
      );
    }

    return Response.json(
      { reply: "Something went wrong 💙" },
      { status: 500 }
    );
  }
}