"use client"
import { useUser } from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";
import OliWidget from "@/components/OliWidget";
import { div } from "framer-motion/client";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Chat = {
  _id: string;
  date: string;
  title: string;
};

const Chatbot = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // today
  );

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch sidebar chat list
  useEffect(() => {
    if (!user?.id) return;

    fetch(`/api/chat/history?userId=${user.id}`)
      .then(res => res.json())
      .then(data => setChats(data.chats || []));
  }, [user?.id]);

  // Fetch messages when selected date changes
  useEffect(() => {
    if (!user?.id) return;

    setMessages([]); // clear while loading

    fetch(`/api/chat/${selectedDate}?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        const formatted = (data.messages || []).map((m: any) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.content,
        }));
        setMessages(formatted);
      });
  }, [selectedDate, user?.id]);

  const isToday = selectedDate === new Date().toISOString().split("T")[0];

  const sendMessage = async () => {
    if (!input.trim() || loading || !isToday) return; // can't send on past dates

    setLoading(true);

    const userMsg: Message = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          userId: user?.id,
        }),
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);

      // Refresh sidebar to show today if it's new
      fetch(`/api/chat/history?userId=${user?.id}`)
        .then(res => res.json())
        .then(data => setChats(data.chats || []));

    } catch {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Connection error. Please try again 💙" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div>
      <div className="min-w-full grid grid-cols-6 min-h-[86vh]">

        {/* Sidebar */}
        <div className="col-span-1 bg-gray-900">
          <div className="bg-stone-900 flex text-white p-3 flex-col mb-3">
            <h2>Chat History</h2>
          </div>

          <ul className="text-sm text-white flex flex-col gap-2 p-2">
            {chats.length === 0 ? (
              <li className="text-white/40 text-xs p-2">No history yet</li>
            ) : (
              chats.map(chat => (
                <li
                  key={chat._id}
                  onClick={() => setSelectedDate(chat.date)}
                  className={`p-2 transition-all duration-300 cursor-pointer rounded-2xl
                    ${selectedDate === chat.date
                      ? "bg-stone-600 text-white"
                      : "hover:bg-stone-700 hover:text-stone-200 hover:-translate-y-0.5"
                    }`}
                >
                  {formatDate(chat.date)}
                  {chat.date === new Date().toISOString().split("T")[0] && (
                    <span className="ml-1 text-blue-400 text-xs">Today</span>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Chatbox */}
        <div className="w-full col-span-5 bg-gray-900/30 text-white flex flex-col h-[86vh] overflow-hidden">

          {/* Header */}
          <div className="bg-stone-900 p-3 shrink-0 flex items-center gap-2">
            💬 {isToday ? "Today's Chat" : formatDate(selectedDate)}
            {!isToday && (
              <span className="text-xs text-white/40 ml-1">(read-only)</span>
            )}
          </div>

          {/* Messages */}
          <div className="chat-scroll flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-full">
                {isToday ? (
                  <>
                    
                    <div className="text-center ">
                      <OliWidget />
                      <p className="text-2xl text-white/80">Hey there! I am Oli. </p>
                      <p className="text-xl text-white/80">What do you want to talk about, {user?.firstName}?</p>
                    </div>
                  </>
                ) : (
                  <p className="text-2xl text-white/70 text-center mt-10 px-5">
                    No messages on this day.
                  </p>
                )}
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className="flex ">
                  <div
                    className={`
                      px-6 py-3 rounded-2xl text-sm wrap-break-word
                      max-w-[50%] w-fit animate-fadeInUp
                      ${msg.role === "user" ? "bg-blue-600 ml-auto" : "bg-gray-700"}
                    `}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input — hidden on past dates */}
          {isToday && (
            <div className="p-4 border-t border-white/10 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                className="flex-1 bg-gray-900 border border-white/20 px-4 py-2 rounded-xl text-white"
                placeholder="What is on your mind?"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl disabled:opacity-50"
              >
                {loading ? "..." : "➤"}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Chatbot;