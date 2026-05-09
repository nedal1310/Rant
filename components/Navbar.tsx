"use client";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-gray-900 relative z-50">
      <div className="flex justify-between items-center px-4 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={closeMenu}>
          <img src="/logo.png" alt="logo" className="w-6 h-6 md:w-10 md:h-10 animate-pulse" />
          <h2 className="text-xl md:text-2xl text-white font-semibold">Rant</h2>
        </Link>

        {/* for medium + devices*/}
        <div className="hidden md:flex items-center gap-6 text-white text-sm">

          {!isLoaded && (
            <div className="w-16 h-8 bg-gray-700 rounded-lg animate-pulse" />
          )}

          {isLoaded && (
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
          )}

          {isLoaded && !isSignedIn && (
            <Link
              href="/sign-in"
              className="bg-blue-700 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Login
            </Link>
          )}

          {isLoaded && isSignedIn && (
            <>
              <Link href="/moodtracker" className="hover:text-blue-400 transition-colors">Mood Tracker</Link>
              <Link href="/chatbot" className="hover:text-blue-400 transition-colors">Talk With Oli</Link>
              <Link href="/breathing" className="hover:text-blue-400 transition-colors">Breathing</Link>
              <UserButton />
            </>
          )}
        </div>

        {/* hamburger feature for mobile  */}
        <div className="flex md:hidden items-center gap-3">

          {!isLoaded && (
            <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse" />
          )}

          {isLoaded && isSignedIn && <UserButton />}

          {isLoaded && !isSignedIn && (
            <Link
              href="/sign-in"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors text-sm"
            >
              Login
            </Link>
          )}

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-white p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown with all features */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 px-4 py-3 flex flex-col gap-1 text-white">
          <Link href="/" onClick={closeMenu} className="hover:text-blue-400 transition-colors py-2 border-b border-gray-700">
            Home
          </Link>
          {isLoaded && isSignedIn && (
            <>
              <Link href="/moodtracker" onClick={closeMenu} className="hover:text-blue-400 transition-colors py-2 border-b border-gray-700">Mood Tracker</Link>
              <Link href="/chatbot" onClick={closeMenu} className="hover:text-blue-400 transition-colors py-2 border-b border-gray-700">Talk With Oli</Link>
              <Link href="/breathing" onClick={closeMenu} className="hover:text-blue-400 transition-colors py-2">Breathing</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;