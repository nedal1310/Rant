// import { useUser } from "@clerk/nextjs";

import { FiArrowRight, FiActivity, FiMessageCircle, FiBookOpen } from "react-icons/fi";
import { auth, currentUser } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Image from "next/image";

export default async function Home() {
  const { userId } = await auth();
  const user = await currentUser();

  if (userId && user) {
    await connectDB();

    const existingUser = await User.findOne({ clerkId: userId });

    if (!existingUser) {
      await User.create({
        clerkId: userId,
        email: user.emailAddresses[0].emailAddress,
        username: user.firstName || "User",
      });
      console.log("User created ✅");
    } else {
      console.log("User already exists");
    }
  }


  return (
    <>
      <div>
        <div className="herosection min-h-[80vh] flex flex-col items-center justify-center gap-10 text-center">

          <div>
            <h1 className="text-5xl font-semibold bg-linear-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="relative text-xl text-white/70 p-4">
              Write what you cant say out loud to Oli.
            </p></div>


          <div className="relative w-full max-w-sm">
  
  {/* Input */}
  <input
    type="text"
    placeholder="How are you feeling...?"
    className="bg-stone-700 block shadow-md shadow-white/20 text-white pl-4 pr-12 py-2 mt-9 w-full rounded-full border-2 border-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
    style={{ caretColor: 'white' }}
  />

  {/* Oli Button */}
  <button
    className="absolute right-2 -bottom-4 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full hover:scale-105 active:scale-95  hover:cursor-pointer transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 220"
      width="38"
      height="38"
    >
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
  </button>



          </div>


     </div>
          {/* <div className="bg-black/80 h-0.5  w-full"></div> */}
          {/* container */}
          {/* container */}
          <div className="container mx-auto min-h-[95vh] max-w-[70vw] flex flex-col flex-wrap justify-center items-center gap-15 px-4 mt-5 mb-5 z-10">

            {/* Daily Mood Tracker */}
            <div className="group relative w-full max-w-4xl bg-[#0c0c0f] rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center gap-8 overflow-hidden border border-violet-500/60 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-10px_rgba(167,139,250,0.25)] transition-all duration-300 cursor-pointer">
              {/* glow orb */}
              <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full bg-violet-500/10 blur-2xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              {/* icon */}
              <div className="relative z-10 shrink-0 w-13 h-13 p-3 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xl group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
                <FiActivity className="w-full h-full" />
              </div>
              {/* divider */}
              <div className="hidden md:block w-px h-12 bg-linear-to-b from-transparent via-violet-500/30 to-transparent shrink-0" />
              {/* text */}
              <div className="relative z-10 flex-1 min-w-0">
                <p className="text-[10px] tracking-[0.2em] font-mono text-violet-400/60 mb-1">01</p>
                <h2 className="text-2xl font-semibold text-white">Daily Mood Tracker</h2>
                <p className="text-sm text-white/50 mt-1 leading-relaxed">Track your daily emotions effortlessly.</p>
              </div>
              {/* button */}
              <button className="relative z-10 shrink-0 flex items-center gap-2 text-xs tracking-widest text-violet-400 border border-violet-500/30 rounded-full px-5 py-2.5 bg-violet-500/10 hover:bg-violet-400 hover:text-[#0c0c0f] hover:border-violet-400 transition-all duration-300 group/btn ml-auto hover:scale-105">
                Track Now
                <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Chat with AI */}
            <div className="group relative w-full max-w-4xl bg-[#0c0c0f] rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center gap-8 overflow-hidden border border-cyan-400/60 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-10px_rgba(103,232,249,0.2)] transition-all duration-300 cursor-pointer">
              <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 shrink-0 w-13 h-13 p-3 rounded-xl bg-cyan-400/10 border border-cyan-400/28 text-cyan-300 text-xl group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
                <FiMessageCircle className="w-full h-full" />
              </div>
              <div className="hidden md:block w-px h-12 bg-linear-to-b from-transparent via-cyan-400/28 to-transparent shrink-0" />
              <div className="relative z-10 flex-1 min-w-0">
                <p className="text-[10px] tracking-[0.2em] font-mono text-cyan-400/60 ">02</p>

                <div className="flex items-center gap-2"> <h2 className="text-2xl font-semibold text-white ">Chat with Oli  </h2>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 220" width="50" height="50">
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
                  </svg></div>

                <p className="text-sm text-white/50 mt-1 leading-relaxed">Talk freely and express your thoughts in a safe, judgment-free space.</p>
              </div>
              <button className="relative z-10 shrink-0 flex items-center gap-2 text-xs tracking-widest text-cyan-300 border border-cyan-400/28 rounded-full px-5 py-2.5 bg-cyan-400/10 hover:bg-cyan-300 hover:text-[#0c0c0f] hover:border-cyan-300 transition-all duration-300 group/btn ml-auto hover:scale-105">
                Chat Now
                <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Journal */}
            <div className="group relative w-full max-w-4xl bg-[#0c0c0f] rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center gap-8 overflow-hidden border border-green-400/60 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-10px_rgba(134,239,172,0.2)] transition-all duration-300 cursor-pointer">
              <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full bg-green-400/10 blur-2xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 shrink-0 w-13 h-13 p-3 rounded-xl bg-green-400/10 border border-green-400/28 text-green-300 text-xl group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
                <FiBookOpen className="w-full h-full" />
              </div>
              <div className="hidden md:block w-px h-12 bg-linear-to-b from-transparent via-green-400/28 to-transparent shrink-0" />
              <div className="relative z-10 flex-1 min-w-0">
                <p className="text-[10px] tracking-[0.2em] font-mono text-green-400/60 mb-1">03</p>
                <h2 className="text-2xl font-semibold text-white">Journal</h2>
                <p className="text-sm text-white/50 mt-1 leading-relaxed">Write your thoughts, reflect deeply, and clear your mind.</p>
              </div>
              <button className="relative z-10 shrink-0 flex items-center gap-2 text-xs tracking-widest text-green-300 border border-green-400/28 rounded-full px-5 py-2.5 bg-green-400/10 hover:bg-green-300 hover:text-[#0c0c0f] hover:border-green-300 transition-all duration-300 group/btn ml-auto hover:scale-105">
                Write Now
                <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

          </div>
        </div>
      </>
      );
}
