"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Shield, 
  Link2, 
  Mail, 
  Lock, 
  GraduationCap, 
  Activity, 
  Loader2, 
  Terminal, 
  Cpu, 
  Radio, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import CyberBackground from "@/components/cyberbackground";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserProfile, UserProfile } from "@/lib/db";
import { 
  Button, 
  ProgressBar, 
  ProgressCircle, 
  Tooltip 
} from "@heroui/react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Diagnostics Scan Simulator State
  const [scanState, setScanState] = useState<"idle" | "scanning" | "done">("idle");
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uProfile = await getUserProfile(user.uid);
          setProfile(uProfile);
        } catch (err) {
          console.error("Failed to load profile", err);
        } finally {
          setLoading(false);
        }
      } else {
        router.push("/auth");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const startScan = async () => {
    if (scanState === "scanning") return;
    setScanState("scanning");
    setScanProgress(0);
    setScanLogs([]);

    const logMessages = [
      "Initializing CyberSatark Security Audit...",
      "Resolving database handshake variables...",
      "Establishing link with Firebase database protocols...",
      "Inspecting operator session token integrity...",
      "Auditing average quiz response telemetry...",
      "Analyzing password entropy diagnostics...",
      "Auditing URL scanning sandbox environment...",
      "Compiling recent activity records...",
      "Verification complete. Security index calculation generated successfully."
    ];

    for (let i = 0; i < logMessages.length; i++) {
      await new Promise(r => setTimeout(r, 450 + Math.random() * 200));
      setScanProgress(Math.round(((i + 1) / logMessages.length) * 100));
      setScanLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logMessages[i]}`]);
    }
    setScanState("done");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <CyberBackground />
        <div className="min-h-[calc(100vh-90px)] flex items-center justify-center text-white">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-green-400 h-10 w-10" />
            <p className="text-green-300 font-mono tracking-widest text-xs animate-pulse">
              LOADING_SECURE_HUD_TELEMETRY...
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!profile) {
    return null;
  }

  const score = profile.stats.securityScore;

  return (
    <>
      <Navbar />
      <CyberBackground />

      <main className="min-h-screen px-6 py-12 text-white relative z-10 max-w-7xl mx-auto w-full space-y-8">
        
        {/* TACTICAL DIAGNOSTIC TOP HUD */}
        <section className="grid lg:grid-cols-4 gap-6">
          
          {/* USER WELCOME & DIAGNOSTIC GENERAL DETAILS */}
          <div className="lg:col-span-2 glass-card p-8 flex flex-col justify-between relative overflow-hidden group hover:border-green-500/20">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 via-green-400/30 to-blue-500/20" />
            <div>
              <p className="text-blue-400 font-mono text-base uppercase tracking-widest flex items-center gap-2 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                SEC_CONSOLE_ONLINE
              </p>
              <h1 className="text-5xl font-black mt-4 tracking-tight text-white font-mono uppercase">
                {profile.username} <span className="text-green-400">HUD</span>
              </h1>
              <p className="text-gray-200 mt-4 text-base leading-relaxed max-w-md font-mono">
                System operator dashboard interface. Monitor real-time quiz evaluations, diagnostic checks, sandbox logs, and security indices.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/5 pt-6 font-mono text-sm text-gray-400">
              <div>
                <span>REGISTRATION_STAMP</span>
                <p className="text-white mt-0.5 truncate font-bold">{new Date(profile.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <span>SYSTEM_ROLE</span>
                <p className="text-green-400 mt-0.5 font-bold uppercase">{profile.role}</p>
              </div>
            </div>
          </div>

          {/* ACTIVE RADIAL SECURITY SCORE GAUGE USING HEROUI */}
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-green-500/20">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            <p className="text-gray-355 text-gray-400 font-mono text-sm uppercase tracking-wider mb-4 font-bold">SECURITY_INDEX</p>
            
            <div className="relative w-36 h-36 flex items-center justify-center">
              <ProgressCircle value={score} aria-label="Security Index">
                <ProgressCircle.Track className="w-36 h-36 drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]">
                  <ProgressCircle.TrackCircle className="stroke-white/5" />
                  <ProgressCircle.FillCircle className={score >= 80 ? "stroke-green-400" : score >= 50 ? "stroke-yellow-400" : "stroke-red-400"} />
                </ProgressCircle.Track>
              </ProgressCircle>
              
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-black font-mono tracking-tight">{score}%</span>
                <span className={`text-sm font-bold uppercase tracking-widest mt-1.5 ${
                  score >= 80 ? "text-green-400" : score >= 50 ? "text-yellow-400" : "text-red-400"
                }`}>
                  {score >= 80 ? "Secure" : score >= 50 ? "Vulnerable" : "Critical"}
                </span>
              </div>
            </div>
          </div>

          {/* TELEMETRY DIAGNOSTICS */}
          <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group hover:border-green-500/20">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-gray-300 font-mono text-sm uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Cpu size={14} className="text-blue-400" />
                SYSTEM_TELEMETRY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
            </div>

            <div className="space-y-3.5 font-mono text-sm text-gray-300 py-4">
              <div className="flex justify-between border-b border-white/[0.02] pb-1.5">
                <span className="text-gray-400">HANDSHAKE_ENCRYPTION</span>
                <span className="text-white font-semibold">AES-256-GCM</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.02] pb-1.5">
                <span className="text-gray-400">HANDSHAKE_STATUS</span>
                <span className="text-green-400 font-semibold">ENFORCED</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.02] pb-1.5">
                <span className="text-gray-400">SSL_TOKEN_HANDSHAKE</span>
                <span className="text-white font-semibold truncate max-w-[110px]">VAL_VALIDATED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">SYS_PORTAL_STABILITY</span>
                <span className="text-blue-400 font-semibold">99.98%</span>
              </div>
            </div>

            <div className="bg-black/35 rounded-xl border border-white/5 px-3 py-2.5 flex items-center gap-2">
              <Radio size={14} className="text-green-400 animate-pulse" />
              <span className="text-xs font-mono text-gray-300 tracking-wider">SECURE FEED PIPES INGESTING</span>
            </div>
          </div>

        </section>

        {/* INTERACTIVE SCANNER & DYNAMIC CONSOLE SECTION */}
        <section className="grid lg:grid-cols-3 gap-8">
          
          {/* INTERACTIVE SYSTEM SCANNER TERMINAL */}
          <div className="lg:col-span-2 glass-card p-6 flex flex-col h-[480px] relative overflow-hidden group hover:border-green-500/20">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500/20 via-green-400/30 to-green-500/20" />
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <Terminal size={16} className="text-green-400" />
                <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wide">
                  Tactical Diagnostics System Audit
                </h2>
              </div>
              
              <Button 
                onPress={startScan}
                isDisabled={scanState === "scanning"}
                variant="outline"
                className="font-mono text-sm tracking-wider uppercase border border-green-500/20 font-bold px-5 py-2.5 rounded-xl hover:bg-green-500 hover:text-black shadow-lg shadow-green-500/10 cursor-pointer flex items-center gap-1.5"
              >
                {scanState === "scanning" ? (
                  <>
                    <Loader2 className="animate-spin text-green-400 h-3.5 w-3.5" />
                    <span>RUNNING_AUDIT ({scanProgress}%)</span>
                  </>
                ) : (
                  <>
                    <RefreshCw size={12} />
                    <span>INITIALIZE_SYSTEM_AUDIT</span>
                  </>
                )}
              </Button>
            </div>

            {/* CONSOLE DISPLAY */}
            <div className="flex-1 bg-black/45 rounded-2xl border border-white/5 p-5 font-mono text-sm text-green-300 overflow-y-auto space-y-2.5 custom-scrollbar shadow-inner select-text">
              {scanLogs.length > 0 ? (
                scanLogs.map((log, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-green-500 font-semibold">[SEC_AUDIT]</span>
                    <span>{log}</span>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2 text-sm">
                  <Terminal size={24} className="opacity-40" />
                  <p>// DIRECTIVE: Run SYSTEM_AUDIT to test security layer controls.</p>
                </div>
              )}
              {scanState === "scanning" && (
                <div className="flex items-center gap-1 text-green-400 animate-pulse mt-2">
                  <span>●</span>
                  <span>Scanning active...</span>
                </div>
              )}
            </div>
          </div>

          {/* DYNAMIC RECENT ACTIVITY LOGS */}
          <div className="glass-card p-6 flex flex-col h-[480px] relative overflow-hidden group hover:border-green-500/20">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
            <div className="flex items-center gap-3 mb-6">
              <Activity className="text-blue-400" size={18} />
              <h2 className="text-base font-bold text-white font-mono tracking-wide uppercase">
                Platform Activity Log Feed
              </h2>
            </div>

            <div className="space-y-4 overflow-y-auto pr-2 flex-1 custom-scrollbar">
              {profile.activities && profile.activities.length > 0 ? (
                profile.activities.map((act, index) => (
                  <div key={index} className="border border-white/5 rounded-xl p-4 bg-black/35 backdrop-blur-sm hover:border-green-500/10 transition duration-300">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-green-400 font-mono">[{act.type}]</span>
                      <span className="text-xs text-gray-400 font-mono">
                        {new Date(act.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-base text-gray-200 mt-2 font-mono">{act.details}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 font-mono text-base py-4 text-center">// NO_LOGS_AVAILABLE</p>
              )}
            </div>
          </div>

        </section>

        {/* METRICS & QUICK ACCESS GRID */}
        <section className="grid lg:grid-cols-3 gap-8">
          
          {/* TRAINING METRICS */}
          <div className="glass-card p-6 flex flex-col justify-between h-[400px] relative overflow-hidden group hover:border-green-500/20">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-cyan-400" size={18} />
              <h2 className="text-base font-bold text-white font-mono tracking-wide uppercase">
                Active Training Diagnostics
              </h2>
            </div>

            <div className="space-y-6 flex-1 justify-center flex flex-col font-mono text-sm">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-400">QUIZZES_EVALUATED</span>
                  <span className="font-bold text-green-400 font-mono text-base">{profile.stats.quizCount}</span>
                </div>

                <ProgressBar
                  aria-label="Quizzes Evaluated"
                  value={Math.min(100, profile.stats.quizCount * 10)}
                  className="w-full mt-1.5"
                >
                  <ProgressBar.Track className="bg-black/45 border border-white/5 h-2.5 rounded-full overflow-hidden">
                    <ProgressBar.Fill className="bg-gradient-to-r from-blue-600 to-blue-400 h-full" />
                  </ProgressBar.Track>
                </ProgressBar>
              </div>

              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-400">PEAK_COMPLETION_INDEX</span>
                  <span className="font-bold text-cyan-400 font-mono text-base">{profile.stats.highestScore}/10</span>
                </div>

                <ProgressBar
                  aria-label="Peak Completion Index"
                  value={profile.stats.highestScore * 10}
                  className="w-full mt-1.5"
                >
                  <ProgressBar.Track className="bg-black/45 border border-white/5 h-2.5 rounded-full overflow-hidden">
                    <ProgressBar.Fill className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full" />
                  </ProgressBar.Track>
                </ProgressBar>
              </div>

              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-400">AVG_QUIZ_SECURITY_RATING</span>
                  <span className="font-bold text-green-400 font-mono text-base">{profile.stats.averageScore}%</span>
                </div>

                <ProgressBar
                  aria-label="Average Quiz Security Rating"
                  value={profile.stats.averageScore}
                  className="w-full mt-1.5"
                >
                  <ProgressBar.Track className="bg-black/45 border border-white/5 h-2.5 rounded-full overflow-hidden">
                    <ProgressBar.Fill className="bg-gradient-to-r from-green-600 to-green-400 h-full" />
                  </ProgressBar.Track>
                </ProgressBar>
              </div>
            </div>
          </div>

          {/* BENTO QUICK ACCESS TOOLS */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            
            <Link
              href="/tools/url-checker"
              className="group glass-card p-6 flex flex-col justify-between hover:scale-[1.02] hover:border-green-500/25 transition duration-300 shadow-md hover:shadow-green-500/5"
            >
              <div className="flex justify-between items-start">
                <Link2 className="text-blue-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                <span className="text-xs font-mono text-gray-400 border border-white/5 px-2 py-0.5 rounded uppercase">SCANNER_01</span>
              </div>
              <div className="mt-8">
                <h3 className="font-bold text-white font-mono text-lg">URL Threat Scanner</h3>
                <p className="text-sm text-gray-300 mt-2 leading-relaxed font-mono">
                  Inspect suspected hyperlinks against real-time domain risk tables.
                </p>
              </div>
            </Link>

            <Link
              href="/tools/email-checker"
              className="group glass-card p-6 flex flex-col justify-between hover:scale-[1.02] hover:border-green-500/25 transition duration-300 shadow-md hover:shadow-green-500/5"
            >
              <div className="flex justify-between items-start">
                <Mail className="text-cyan-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                <span className="text-xs font-mono text-gray-400 border border-white/5 px-2 py-0.5 rounded uppercase">SCANNER_02</span>
              </div>
              <div className="mt-8">
                <h3 className="font-bold text-white font-mono text-lg">Email Risk Analyzer</h3>
                <p className="text-sm text-gray-300 mt-2 leading-relaxed font-mono">
                  Verify routing headers, DKIM configurations, and SPF flags.
                </p>
              </div>
            </Link>

            <Link
              href="/tools/password-analyzer"
              className="group glass-card p-6 flex flex-col justify-between hover:scale-[1.02] hover:border-green-500/25 transition duration-300 shadow-md hover:shadow-green-500/5"
            >
              <div className="flex justify-between items-start">
                <Lock className="text-green-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                <span className="text-xs font-mono text-gray-400 border border-white/5 px-2 py-0.5 rounded uppercase">ANALYZER_01</span>
              </div>
              <div className="mt-8">
                <h3 className="font-bold text-white font-mono text-lg">Password Entropy Hub</h3>
                <p className="text-sm text-gray-300 mt-2 leading-relaxed font-mono">
                  Compute computational password strength and guess-resistance scores.
                </p>
              </div>
            </Link>

            <Link
              href="/learn"
              className="group glass-card p-6 flex flex-col justify-between hover:scale-[1.02] hover:border-green-500/25 transition duration-300 shadow-md hover:shadow-green-500/5"
            >
              <div className="flex justify-between items-start">
                <GraduationCap className="text-purple-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                <span className="text-xs font-mono text-gray-400 border border-white/5 px-2 py-0.5 rounded uppercase">LEARN_MODULE</span>
              </div>
              <div className="mt-8">
                <h3 className="font-bold text-white font-mono text-lg">Learning Center Guide</h3>
                <p className="text-sm text-gray-300 mt-2 leading-relaxed font-mono">
                  Review bite-sized chapters explaining attack frameworks.
                </p>
              </div>
            </Link>

          </div>

        </section>

      </main>
    </>
  );
}