"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MatrixBackground from "@/components/MatrixBackground";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleReset = async () => {
    if (!email) {
      setStatus("Enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setStatus("Reset link sent. Check your email.");
    } catch {
      setStatus("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-6 relative z-10">
        <MatrixBackground />

        <div className="w-full max-w-md glass-card p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-black text-green-400 text-center font-mono tracking-tight uppercase">
              Reset Password
            </h1>
            <p className="text-gray-400 text-center text-xs mt-2 font-mono leading-relaxed">
              INITIATE_PASSWORD_RECOVERY_PROTOCOL
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter operator email"
              className="w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-400/40 backdrop-blur-md transition duration-300 font-mono text-xs"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-xl bg-green-500 text-black font-bold hover:bg-green-400 transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-400/40 cursor-pointer font-mono text-sm"
            >
              SEND_RESET_LINK
            </button>
          </div>

          {status && (
            <p className="text-xs text-green-300 mt-4 text-center font-mono animate-pulse">{status}</p>
          )}

          <div className="mt-6 text-xs text-center font-mono">
            <Link href="/auth" className="text-green-400 hover:underline transition">
              // RETURN_TO_LOGIN
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}