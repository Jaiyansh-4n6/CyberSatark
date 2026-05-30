"use client";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function BrandLogo() {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="fixed top-6 left-6 z-50"
    >
      <Link
        href="/"
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full 
                   bg-white/[0.02] border border-white/10 backdrop-blur-2xl 
                   shadow-[0_20px_50px_rgba(0,0,0,0.65)] 
                   hover:border-green-500/25 transition-all duration-300 group text-decoration-none"
      >
        <ShieldCheck size={16} className="text-green-400 group-hover:scale-110 transition-transform duration-300" />
        <span className="text-[10px] tracking-widest font-mono font-bold text-white uppercase group-hover:text-green-300 transition-colors">
          CyberSatark
        </span>
      </Link>
    </motion.div>
  );
}