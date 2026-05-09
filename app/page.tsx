import { FiArrowRight, FiActivity, FiMessageCircle, FiBookOpen } from "react-icons/fi";
import { auth, currentUser } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const user = await currentUser();

  const username =
    user?.firstName
      ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
      : "User";

  if (userId && user) {
    await connectDB();

    const existingUser = await User.findOne({ clerkId: userId });

    if (!existingUser) {
      await User.create({
        clerkId: userId,
        email: user.emailAddresses[0].emailAddress,
        username: user.firstName || "User",
      });
      console.log("User created ");
    } else {
      console.log("User already exists");
    }
  }

  return (
    <>
      <div>
        <div className="herosection min-h-[80vh] flex flex-col items-center justify-center gap-8 md:gap-10 text-center px-4">

          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="relative">
                {/* Oli svg */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 220" width="55" height="55" className="shrink-0 animate-bounce">
                  <rect x="20" y="45" width="160" height="155" rx="42" ry="42" fill="#9dd4d4" stroke="#6aabab" strokeWidth="3" />
                  <path d="M38,55 Q30,10 58,30 Q50,42 42,52 Z" fill="#9dd4d4" stroke="#6aabab" strokeWidth="3" />
                  <path d="M162,55 Q170,10 142,30 Q150,42 158,52 Z" fill="#9dd4d4" stroke="#6aabab" strokeWidth="3" />
                  <ellipse cx="100" cy="122" rx="62" ry="68" fill="#aedddd" opacity="0.3" />
                  <circle cx="72" cy="105" r="30" fill="#ede5d8" stroke="#c8b89a" strokeWidth="2.5" />
                  <circle cx="72" cy="105" r="11" fill="#2a2a3e" />
                  <circle cx="66" cy="98" r="4" fill="white" opacity="0.85" />
                  <circle cx="79" cy="112" r="2" fill="white" opacity="0.4" />
                  <circle cx="128" cy="105" r="30" fill="#ede5d8" stroke="#c8b89a" strokeWidth="2.5" />
                  <circle cx="128" cy="105" r="11" fill="#2a2a3e" />
                  <circle cx="122" cy="98" r="4" fill="white" opacity="0.85" />
                  <circle cx="135" cy="112" r="2" fill="white" opacity="0.4" />
                  <polygon points="100,118 83,148 117,148" fill="#7a4030" stroke="#5a2e22" strokeWidth="2" />
                  <polygon points="100,122 88,138 100,138" fill="#9a5540" opacity="0.5" />
                  <ellipse cx="52" cy="128" rx="14" ry="9" fill="#f4a0a0" opacity="0.18" />
                  <ellipse cx="148" cy="128" rx="14" ry="9" fill="#f4a0a0" opacity="0.18" />
                  <path d="M40,185 Q100,195 160,185" fill="none" stroke="#6aabab" strokeWidth="1.5" opacity="0.4" strokeDasharray="4,4" />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-transparent mb-3">
              Welcome Back, {username}!
            </h1>

            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="h-px w-8 bg-linear-to-r from-transparent to-blue-500/50"></div>
              <p className="text-sm sm:text-base md:text-lg text-white/60">
                You can talk to Oli about anything
              </p>
              <div className="h-px w-8 bg-linear-to-l from-transparent to-blue-500/50"></div>
            </div>
          </div>

        </div>

        {/* Cards container */}
        <div className="container mx-auto min-h-[95vh] w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[70vw] flex flex-col justify-center items-center gap-6 md:gap-10 px-4 mt-5 mb-10 z-10">

          {/* Daily Mood Tracker */}
          <div className="group relative w-full bg-[#0c0c0f] rounded-2xl px-5 sm:px-8 py-6 sm:py-7 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 overflow-hidden border border-violet-500/60 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-10px_rgba(167,139,250,0.25)] transition-all duration-300">
            <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full bg-violet-500/10 blur-2xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center gap-4 sm:contents w-full">
              {/* icon */}
              <div className="relative z-10 shrink-0 w-11 h-11 sm:w-13 sm:h-13 p-2.5 sm:p-3 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xl group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
                <FiActivity className="w-full h-full" />
              </div>
              {/* text on mobile sits next to icon */}
              <div className="relative z-10 flex-1 min-w-0 sm:hidden">
                <p className="text-[10px] tracking-[0.2em] font-mono text-violet-400/60 mb-0.5">01</p>
                <h2 className="text-lg font-semibold text-white">Daily Mood Tracker</h2>
              </div>
            </div>

            {/* divider — desktop only */}
            <div className="hidden sm:block w-px h-12 bg-linear-to-b from-transparent via-violet-500/30 to-transparent shrink-0" />

            {/* text — desktop */}
            <div className="relative z-10 flex-1 min-w-0 hidden sm:block">
              <p className="text-[10px] tracking-[0.2em] font-mono text-violet-400/60 mb-1">01</p>
              <h2 className="text-2xl font-semibold text-white">Daily Mood Tracker</h2>
              <p className="text-sm text-white/50 mt-1 leading-relaxed">Track your daily emotions effortlessly.</p>
            </div>

            {/* description — mobile only, full width */}
            <p className="relative z-10 text-sm text-white/50 leading-relaxed sm:hidden -mt-2">Track your daily emotions effortlessly.</p>

            <Link href="/moodtracker" className="relative z-10 shrink-0 flex items-center gap-2 text-xs tracking-widest text-violet-400 border border-violet-500/30 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 bg-violet-500/10 hover:bg-violet-400 hover:text-[#0c0c0f] hover:border-violet-400 transition-all duration-300 group/btn sm:ml-auto hover:scale-105 self-start sm:self-auto">
              Track Now
              <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Chat with Oli */}
          <div className="group relative w-full bg-[#0c0c0f] rounded-2xl px-5 sm:px-8 py-6 sm:py-7 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 overflow-hidden border border-cyan-400/60 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-10px_rgba(103,232,249,0.2)] transition-all duration-300">

            {/* Glow */}
            <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Icon */}
            <div className="relative z-10 shrink-0 w-11 h-11 sm:w-12 sm:h-12 p-2.5 sm:p-3 rounded-xl bg-cyan-400/10 border border-cyan-400/28 text-cyan-300 text-xl group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
              <FiMessageCircle className="w-full h-full" />
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-12 bg-linear-to-b from-transparent via-cyan-400/28 to-transparent shrink-0" />

            {/* Content */}
            <div className="relative z-10 flex-1 min-w-0">
              <p className="text-[10px] tracking-[0.2em] font-mono text-cyan-400/60 mb-1">
                02
              </p>

              <h2 className="text-2xl font-semibold text-white">
                Chat with Oli
              </h2>

              <p className="text-sm text-white/50 mt-1 leading-relaxed">
                Talk to Oli, your supportive AI companion for honest thoughts and emotional comfort.
              </p>
            </div>

            {/* Button */}
            <Link
              href="/chatbot"
              className="relative z-10 shrink-0 flex items-center gap-2 text-xs tracking-widest text-cyan-300 border border-cyan-400/28 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 bg-cyan-400/10 hover:bg-cyan-300 hover:text-[#0c0c0f] hover:border-cyan-300 transition-all duration-300 group/btn hover:scale-105 self-start sm:self-auto"
            >
              Chat Now

              <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Breathwork */}
          <div className="group relative w-full bg-[#0c0c0f] rounded-2xl px-5 sm:px-8 py-6 sm:py-7 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 overflow-hidden border border-green-400/60 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-10px_rgba(134,239,172,0.2)] transition-all duration-300">
            <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full bg-green-400/10 blur-2xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center gap-4 sm:contents w-full">
              <div className="relative z-10 shrink-0 w-11 h-11 sm:w-13 sm:h-13 p-2.5 sm:p-3 rounded-xl bg-green-400/10 border border-green-400/28 text-green-300 text-xl group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
                <FiBookOpen className="w-full h-full" />
              </div>
              <div className="relative z-10 flex-1 min-w-0 sm:hidden">
                <p className="text-[10px] tracking-[0.2em] font-mono text-green-400/60 mb-0.5">03</p>
                <h2 className="text-lg font-semibold text-white">Breathwork</h2>
              </div>
            </div>

            <div className="hidden sm:block w-px h-12 bg-linear-to-b from-transparent via-green-400/28 to-transparent shrink-0" />

            <div className="relative z-10 flex-1 min-w-0 hidden sm:block">
              <p className="text-[10px] tracking-[0.2em] font-mono text-green-400/60 mb-1">03</p>
              <h2 className="text-2xl font-semibold text-white">Breathwork</h2>
              <p className="text-sm text-white/50 mt-1 leading-relaxed">Scientifically proven techniques to reduce stress and restore calm.</p>
            </div>

            <p className="relative z-10 text-sm text-white/50 leading-relaxed sm:hidden -mt-2">Calm your mind, control anxiety, and clear your mind.</p>

            <Link href="/breathing" className="relative z-10 shrink-0 flex items-center gap-2 text-xs tracking-widest text-green-300 border border-green-400/28 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 bg-green-400/10 hover:bg-green-300 hover:text-[#0c0c0f] hover:border-green-300 transition-all duration-300 group/btn sm:ml-auto hover:scale-105 self-start sm:self-auto">
              Start Now
              <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}