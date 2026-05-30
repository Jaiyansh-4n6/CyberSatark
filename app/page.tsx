"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import CyberBackground from "@/components/cyberbackground";
import { 
  Globe, 
  Mail, 
  Lock, 
  ShieldAlert, 
  ArrowRight,
  BookOpen,
  ChevronRight,
  Activity,
  ShieldCheck
} from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "URL Threat Scanner",
      sub: "SCANNER_01",
      desc: "Inspect suspected hyperlinks against real-time domain risk tables and typosquatting registers.",
      href: "/tools/url-checker",
      icon: Globe,
      color: "text-blue-400"
    },
    {
      title: "Email Header Audit",
      sub: "SCANNER_02",
      desc: "Verify routing headers, DKIM alignment tags, and SPF authorization records.",
      href: "/tools/email-checker",
      icon: Mail,
      color: "text-cyan-400"
    },
    {
      title: "Password Entropy Hub",
      sub: "ANALYZER_01",
      desc: "Compute computational strength, guess-resistance, and brute-force time values.",
      href: "/tools/password-analyzer",
      icon: Lock,
      color: "text-green-400"
    },
    {
      title: "Tactical Quizzes",
      sub: "EVALUATION_01",
      desc: "Test your awareness against real-world social engineering vectors and save profile scores.",
      href: "/quiz",
      icon: ShieldAlert,
      color: "text-yellow-400"
    }
  ];

  return (
    <>
      <Navbar />
      <CyberBackground />

      {/* VIEWPORT CONTROLLER WITH TOP NAVBAR SPACING */}
      <main className="min-h-screen pt-32 pb-16 px-6 relative z-10 flex flex-col items-center justify-center max-w-7xl mx-auto w-full">
        
        {/* TELEMETRY ONLINE BADGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-green-500/25 bg-green-500/5 text-green-400 font-mono text-xs uppercase tracking-widest mb-6"
        >
          <Activity size={12} className="animate-pulse" />
          SYSTEM_PORTAL_ONLINE // VER_1.2.5
        </motion.div>

        {/* HERO CONTAINER */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black font-mono uppercase text-white tracking-tight"
          >
            Stay <span className="text-green-400 drop-shadow-[0_0_12px_rgba(34,197,94,0.2)]">Cyber Safe</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base md:text-lg text-gray-300 leading-relaxed font-sans"
          >
            Phishing bypasses mechanical code firewalls by exploiting human cognitive trust protocols. 
            CyberSatark is a tactical evaluation gateway providing sandbox link audits and interactive awareness training.
          </motion.p>
        </div>

        {/* ACTION PANEL BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/tools"
              className="px-8 py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-black font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-green-500/10 transition-all duration-300"
            >
              <span>Initialize Scanners</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/learn"
              className="px-8 py-3.5 rounded-xl border border-white/10 hover:border-green-500/25 hover:bg-white/[0.02] text-white font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300"
            >
              <span>Launch Learn Guide</span>
              <BookOpen size={14} className="text-purple-400" />
            </Link>
          </motion.div>
        </div>

        {/* GLOW SPLITTER ACCENT */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 h-px w-40 bg-gradient-to-r from-transparent via-green-500/20 to-transparent"
        />

        {/* INTERACTIVE LAUNCHPAD BENTO GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-16 pt-8 border-t border-white/5">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="relative group"
            >
              <Link
                href={f.href}
                className="glass-card p-7 flex flex-col justify-between min-h-[260px] text-left hover:border-green-500/20 transition-all duration-300 block"
              >
                <div>
                  <f.icon className={`${f.color} mb-4`} size={24} />
                  <span className="text-xs font-mono text-gray-400 block uppercase tracking-widest">
                    {f.sub}
                  </span>
                  <h3 className="text-sm md:text-base font-mono font-bold text-white uppercase tracking-wider mt-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-300 mt-2.5 font-sans leading-relaxed">
                    {f.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-green-400 pt-3 select-none">
                  <span>DEPLOY_MODULE</span>
                  <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </main>
    </>
  );
}