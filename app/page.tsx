"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import CyberBackground from "@/components/cyberbackground";

export default function Home() {
  return (
    <>
      <Navbar />
      <CyberBackground />

      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-green-500/10 blur-3xl rounded-full top-[-200px] left-[-200px] animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full bottom-[-150px] right-[-150px] animate-pulse"></div>

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#00ff99 1px, transparent 1px), linear-gradient(90deg, #00ff99 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <main className="min-h-[calc(100vh_-_90px)] flex flex-col items-center justify-center text-center px-6">

        {/* HERO */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-bold text-green-400"
        >
          <motion.span
            animate={{
              textShadow: [
                "0 0 6px rgba(34,197,94,0.4)",
                "0 0 18px rgba(34,197,94,1)",
                "0 0 6px rgba(34,197,94,0.4)",
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity }}
          >
            Stay Cyber Safe
          </motion.span>
        </motion.h1>

        {/* QUESTION */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-6 text-2xl font-semibold text-green-300"
        >
          Are you being phished?
        </motion.p>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-6 text-lg text-gray-300 max-w-2xl"
        >
          Phishing attacks trick users into revealing passwords, OTPs,
          and financial information. Analyze suspicious messages instantly
          with CyberSatark.
        </motion.p>

        {/* PRIMARY CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-10"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/tools"
              className="px-10 py-4 rounded-xl bg-green-500 text-black font-semibold 
                         shadow-lg shadow-green-500/30 hover:shadow-green-400/60 
                         transition"
            >
              Check Now
            </Link>
          </motion.div>
        </motion.div>

        {/* GLOW DIVIDER */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 h-px w-40 bg-gradient-to-r from-transparent via-green-400 to-transparent"
        />

        {/* TAGLINE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
          className="mt-8 flex flex-col items-center gap-6"
        >
          <div>
            <p className="font-semibold text-lg text-gray-200">
              Think Before You Click
            </p>

            <p className="text-sm text-gray-400">
              Stay alert. Stay secure. Stay CyberSatark.
            </p>
          </div>

          {/* SECOND CTA */}
          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-6">

            {/* Start Learning */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/learn"
                className="px-10 py-4 rounded-xl border border-green-400 text-green-300 font-semibold 
                          hover:bg-green-400/10 hover:shadow-green-400/40 hover:shadow-lg 
                          transition"
              >
                Start Learning
              </Link>
            </motion.div>

            {/* Take Awareness Quiz */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/quiz"
                className="px-10 py-4 rounded-xl border border-green-400 text-green-300 font-semibold 
                          hover:bg-green-400/10 hover:shadow-green-400/40 hover:shadow-lg 
                          transition"
              >
                Take Awareness Quiz
              </Link>
            </motion.div>

          </div>
          </motion.div>
      </main>
    </>
  );
}