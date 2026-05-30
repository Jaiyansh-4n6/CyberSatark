"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  // Avoid SSR/client mismatch by waiting for mount before reading localStorage
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light") setDark(false);
      else if (saved === "dark") setDark(true);
      else {
        // Respect user preference if available
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDark(prefersDark ?? true);
      }
    } catch {
      setDark(true);
    }
  }, []);

  // Apply theme when we have a concrete value
  useEffect(() => {
    if (dark === null) return;
    if (dark) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  // Do not render interactive UI until mounted to prevent hydration flash
  if (dark === null) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 99999,
      }}
    >
      <button
        onClick={() => setDark(!dark)}
        className={`relative flex items-center justify-between w-20 h-10 px-2.5 rounded-full border backdrop-blur-md cursor-pointer select-none transition-all duration-300 ${
          dark
            ? "border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.15)] bg-slate-950/80"
            : "border-blue-500/20 shadow-[0_4px_20px_rgba(59,130,246,0.15)] bg-white/80"
        }`}
        title="Toggle system theme"
      >
        {/* Sun Icon (Light Mode indicator) */}
        <Sun
          size={15}
          className={`z-10 transition-colors duration-300 ${
            dark ? "text-gray-500 hover:text-gray-300" : "text-blue-500 font-bold"
          }`}
        />

        {/* Sliding Indicator Knob */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className={`absolute w-8 h-8 rounded-full flex items-center justify-center z-0 ${
            dark
              ? "left-10 bg-green-500/10 border border-green-500/30"
              : "left-1 bg-blue-500/10 border border-blue-500/30"
          }`}
          style={{
            top: "3px",
          }}
        />

        {/* Moon Icon (Dark Mode indicator) */}
        <Moon
          size={15}
          className={`z-10 transition-colors duration-300 ${
            dark ? "text-green-400 font-bold" : "text-gray-400 hover:text-gray-600"
          }`}
        />
      </button>
    </div>
  );
}