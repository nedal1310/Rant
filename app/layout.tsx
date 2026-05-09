import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuroraBackground } from "@/components/AuroraBackground";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import 'flowbite';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rant - Unburden your Heart",
  description: "Your Mental Health Tracker App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up">
     <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">

        {/*  Background (lowest layer) */}
        <AuroraBackground />

        {/*  All UI goes ABOVE background */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />

          <div className="grow flex flex-col">
            {children}
          </div>

          <Footer />
        </div>

      </body>
    </html>
    </ClerkProvider>

  );
}
