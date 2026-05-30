"use client";
import Link from "next/link";
import { Home } from "lucide-react";
import { motion } from "framer-motion";

export default function HomeButton() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <Link
        href="/"
        className="flex items-center justify-center
                   w-10 h-10 rounded-full
                   bg-white/[0.02] border border-white/10 backdrop-blur-2xl
                   shadow-[0_20px_50px_rgba(0,0,0,0.65)]
                   hover:border-green-500/25
                   text-green-400 hover:text-green-300
                   transition-all duration-300 group"
      >
        <Home size={16} className="group-hover:scale-110 transition-transform duration-300" />
      </Link>
    </motion.div>
  );
}