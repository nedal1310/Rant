"use client";
import { Show, UserButton, useClerk } from "@clerk/nextjs";
import Link from "next/link";

import { useRouter } from "next/navigation";

const Navbar = () => {
  const { signOut } = useClerk();
  const router = useRouter();



  const handleSignOut = async () => {
    await signOut();
    router.push("/"); //  custom redirect
  };

  return (
    <div className="bg-gray-900 flex justify-between gap-4 items-center px-6 py-3">
      
      <Link href="/" className="flex items-center gap-3">
        <img src="/logo.png" alt="logo" className="w-10 h-10" />
        <h2 className="text-2xl text-white font-semibold">Rant</h2>
      </Link>

      <ul className="flex gap-7 text-white items-center">
        
        <Show when="signed-out">
          <li>
            <Link href="/sign-in">LogIn</Link>
          </li>
        </Show>

        <Show when="signed-in">
          <li><Link href="/moodtracker">Mood Tracker</Link></li>
          <li><Link href="/chatbot">Talk With Oli</Link></li>
          <li><Link href="/breathing">Breathing</Link></li>

          

          {/* Optional profile button */}
          <li>
            <UserButton />
          </li>
        </Show>

      </ul>
    </div>
  );
};

export default Navbar;