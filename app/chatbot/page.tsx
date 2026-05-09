"use client"
import { useUser } from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";
import OliWidget from "@/components/OliWidget";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/chat/history?userId=${user.id}`)
      .then(res => res.json())
      .then(data => setChats(data.chats || []));
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    setMessages([]);
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
    if (!input.trim() || loading || !isToday) return;
    setLoading(true);
    const userMsg: Message = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, userId: user?.id }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      fetch(`/api/chat/history?userId=${user?.id}`)
        .then(res => res.json())
        .then(data => setChats(data.chats || []));
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please try again 💙" }]);
    } finally {
      setLoading(false);
    }
  };

const deleteChat = async (chatId: string) => {

  const confirmed = window.confirm(
    "Are you sure you want to delete this chat?"
  );

  if (!confirmed) return;

  try {
    const res = await fetch(
      `/api/chat/history?chatId=${chatId}&userId=${user?.id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.success) {
      setChats((prev) =>
        prev.filter((chat) => chat._id !== chatId)
      );
    }

  } catch (error) {
    console.error(error);
  }
};

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="relative flex min-h-[86vh] w-full overflow-hidden">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:relative z-30 md:z-auto
          h-full md:h-auto
          bg-gray-900
          transition-all duration-300 ease-in-out
          flex flex-col
          ${sidebarOpen ? "w-56" : "w-0 md:w-12"}
          overflow-hidden
        `}
      >
        {/* Sidebar header */}
        <div className="bg-stone-900 flex text-white p-3 items-center gap-2 shrink-0 min-w-max">
          <button
            onClick={() => setSidebarOpen(prev => !prev)}
            className="text-white focus:outline-none flex flex-col gap-1 hover:cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <span className="block w-5 h-0.5 bg-white" />
            <span className="block w-5 h-0.5 bg-white" />
            <span className="block w-5 h-0.5 bg-white" />
          </button>
          {sidebarOpen && <h2 className="text-sm whitespace-nowrap">Chat History</h2>}
        </div>

        {/* Sidebar list */}
        {sidebarOpen && (
          <ul className="text-sm text-white flex flex-col gap-2 p-2 overflow-y-auto chat-scroll">
            {chats.length === 0 ? (
              <li className="text-white/40 text-xs p-2 whitespace-nowrap">No history yet</li>
            ) : (
              chats.map(chat => (
                <li
                  key={chat._id}
                  className={`p-2 transition-all duration-300 rounded-2xl whitespace-nowrap flex items-center justify-between gap-2
    ${selectedDate === chat.date
                      ? "bg-stone-600 text-white"
                      : "hover:bg-stone-700 hover:text-stone-200 hover:-translate-y-0.5"
                    }`}
                >
                  {/* Left Side */}
                  <div
                    onClick={() => {
                      setSelectedDate(chat.date);
                      setSidebarOpen(false);
                    }}
                    className="flex-1 cursor-pointer overflow-hidden text-ellipsis"
                  >
                    {formatDate(chat.date)}

                    {chat.date === new Date().toISOString().split("T")[0] && (
                      <span className="ml-1 text-blue-400 text-xs">Today</span>
                    )}
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat._id);
                    }}
                    className="text-gray-400 hover:text-red-300 hover:scale-110 transition-all duration-200 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 7h12M9 7V4h6v3m-7 4v6m4-6v6m4-6v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12"
                      />
                    </svg>
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {/* Chatbox */}
      <div className="flex-1 bg-gray-900/30 text-white flex flex-col h-[86vh] overflow-hidden min-w-0">

        {/* Header */}
        <div className="bg-stone-900 p-3 shrink-0 flex items-center gap-2">
          {/* Hamburger button — visible on md+ when sidebar is closed */}
          <button
            onClick={() => setSidebarOpen(prev => !prev)}
            className="md:hidden text-white flex flex-col gap-1 focus:outline-none mr-1"
            aria-label="Toggle sidebar"
          >
            <span className="block w-5 h-0.5 bg-white" />
            <span className="block w-5 h-0.5 bg-white" />
            <span className="block w-5 h-0.5 bg-white" />
          </button>
          💬 {isToday ? "Today's Chat" : formatDate(selectedDate)}
        </div>

        {/* Messages */}
        <div className="chat-scroll flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="flex flex-col md:justify-center items-center h-full">
              {isToday ? (
                <div className="text-center">
                  <OliWidget />
                  <p className="text-2xl text-white/80">Hey there! I am Oli.</p>
                  <p className="text-xl text-white/80">What do you want to talk about, {user?.firstName}?</p>
                </div>
              ) : (
                <p className="text-2xl text-white/70 text-center mt-10 px-5">
                  No messages on this day.
                </p>
              )}
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className="flex">
                <div
                  className={`
                    px-6 py-3 rounded-2xl text-sm wrap-break-word
                    max-w-[80%] sm:max-w-[60%] md:max-w-[50%] w-fit animate-fadeInUp
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

        {/* Input */}
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
              className="bg-white/10 hover:bg-white/20 hover:cursor-pointer px-4 py-2 rounded-xl disabled:opacity-50"
            >
              {loading ? "..." : "➤"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;