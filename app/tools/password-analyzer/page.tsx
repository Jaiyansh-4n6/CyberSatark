"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import CyberBackground from "@/components/cyberbackground";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldAlert,
  Terminal,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Unlock,
  Server,
  FileCode,
  AlertCircle,
  Hash,
  ActivitySquare
} from "lucide-react";
import { analyzePassword } from "@/data/analyzer/passwordAnalyzer";

function getStrengthColor(score: number) {
  if (score >= 70)
    return {
      text: "text-green-400",
      bar: "bg-green-500",
      border: "border-green-500/30",
      bg: "bg-green-500/10",
      glow: "shadow-green-500/15"
    };

  if (score >= 40)
    return {
      text: "text-yellow-400",
      bar: "bg-yellow-500",
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
      glow: "shadow-yellow-500/15"
    };

  return {
    text: "text-red-400",
    bar: "bg-red-500",
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    glow: "shadow-red-500/15"
  };
}

function mockHash(str: string, type: "sha256" | "md5" | "bcrypt") {
  if (!str) return "...";
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  const hex = Math.abs(h).toString(16).padStart(8, '0');
  const doubleHex = Math.abs(h * 31).toString(16).padStart(8, '0');
  const tripleHex = Math.abs(h * 73).toString(16).padStart(8, '0');
  
  if (type === "md5") {
    return (hex + doubleHex + tripleHex + hex).substring(0, 32);
  }
  if (type === "sha256") {
    return (hex + doubleHex + tripleHex + hex + doubleHex + tripleHex + hex + doubleHex).substring(0, 64);
  }
  return `$2b$12$${(hex + doubleHex + tripleHex + hex).substring(0, 22)}V8vR9kXe0YpA9kL...`;
}

export default function PasswordAnalyzerPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"weaknesses" | "composition" | "entropy" | "hashes">("weaknesses");

  const result = analyzePassword(password);
  const themeColor = useMemo(() => getStrengthColor(result.score), [result.score]);

  // Dynamic reactive logs as character inputs change
  const reactiveLogs = useMemo(() => {
    if (!password) return ["// STANDBY: Awaiting password entry to run complexity audit..."];
    
    const logs = [];
    const len = password.length;
    logs.push(`[${new Date().toLocaleTimeString()}] Ingested password buffer (Length: ${len})`);
    
    // Check uppercase
    const hasUpper = /[A-Z]/.test(password);
    logs.push(`[${new Date().toLocaleTimeString()}] Scan uppercase charset alignments: ${hasUpper ? "MATCHED" : "MISSING"}`);
    
    // Check numbers
    const hasNumber = /[0-9]/.test(password);
    logs.push(`[${new Date().toLocaleTimeString()}] Scan numeric character alignments: ${hasNumber ? "MATCHED" : "MISSING"}`);
    
    // Check symbols
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    logs.push(`[${new Date().toLocaleTimeString()}] Scan special symbol alignments: ${hasSymbol ? "MATCHED" : "MISSING"}`);
    
    // Pattern checks
    const hasRepeat = /(.)\1{2,}/.test(password);
    if (hasRepeat) {
      logs.push(`[${new Date().toLocaleTimeString()}] ALERT: Repetitive sequence segments detected!`);
    }

    logs.push(`[${new Date().toLocaleTimeString()}] Calculated Shannon Entropy bits: ${result.entropy}`);
    logs.push(`[${new Date().toLocaleTimeString()}] Threat diagnostic index computed: ${result.score}/100`);
    
    return logs;
  }, [password, result.entropy, result.score]);

  // Dimension gauges
  const dimensions = useMemo(() => {
    let varietyCount = 0;
    if (/[a-z]/.test(password)) varietyCount++;
    if (/[A-Z]/.test(password)) varietyCount++;
    if (/[0-9]/.test(password)) varietyCount++;
    if (/[^A-Za-z0-9]/.test(password)) varietyCount++;
    
    const varietyScore = Math.round((varietyCount / 4) * 100);
    const lengthScore = Math.min(100, Math.round((password.length / 16) * 100));
    
    // Check weak common patterns
    const hasCommonPatterns = /(123|abc|qwerty|password|admin)/i.test(password);
    const patternScore = Math.max(0, 100 - (hasCommonPatterns ? 50 : 0) - (password.length > 0 && password.length < 8 ? 30 : 0));
    
    // Check character repetition
    const hasRepetition = /(.)\1{2,}/.test(password);
    const collisionScore = Math.max(0, 100 - (hasRepetition ? 40 : 0));

    return {
      variety: varietyScore,
      length: lengthScore,
      patterns: patternScore,
      collisions: collisionScore
    };
  }, [password]);

  // Composition metrics
  const composition = useMemo(() => {
    return {
      lower: (password.match(/[a-z]/g) || []).length,
      upper: (password.match(/[A-Z]/g) || []).length,
      numbers: (password.match(/[0-9]/g) || []).length,
      symbols: (password.match(/[^A-Za-z0-9]/g) || []).length
    };
  }, [password]);

  return (
    <>
      <Navbar />
      <CyberBackground />

      <main className="min-h-screen px-6 py-28 text-white relative z-10 max-w-6xl mx-auto w-full">
        <div className="space-y-10">

          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-green-400">
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 6px rgba(34,197,94,0.4)",
                    "0 0 18px rgba(34,197,94,1)",
                    "0 0 6px rgba(34,197,94,0.4)",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
              >
                Password Analyzer
              </motion.span>
            </h1>

            <p className="mt-5 text-gray-300 max-w-2xl mx-auto text-lg">
              Deconstruct password entropy. Scan character variety, evaluate brute-force resistance thresholds, and simulate cryptographic hash outputs.
            </p>
          </motion.div>

          {/* INPUT & AUDIT TERMINAL */}
          <section className="grid lg:grid-cols-3 gap-8">

            {/* SCANNING BOX */}
            <div className="lg:col-span-2 backdrop-blur-[40px] bg-white/[0.03] border border-white/12 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex flex-col justify-between">
              
              <div className="flex items-center justify-between px-5 py-3 border-b border-green-500/10 bg-black/40">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                </div>
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-green-400 font-semibold">
                  Credentials Auditor Node
                </p>
                <div className="text-xs text-gray-500 font-mono">
                  password-strength.sh
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-mono uppercase tracking-widest text-green-300 font-bold">
                    Input Key Payload
                  </label>

                  <div className="flex items-center bg-black/35 border border-white/10 rounded-2xl overflow-hidden focus-within:border-green-400/40 transition duration-300">
                    <div className="px-4 text-gray-500">
                      <Lock size={18} />
                    </div>

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter credential to audit..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex-1 bg-transparent px-2 py-5 outline-none text-white placeholder:text-gray-600 font-mono text-base"
                    />

                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="px-4 text-gray-500 hover:text-green-300 transition cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Key size: {password.length} chars
                  </span>
                  <span>Strength Audit Active</span>
                </div>
              </div>
            </div>

            {/* LIVE INSPECTOR LOG TERMINAL */}
            <div className="glass-card p-6 flex flex-col h-[225px] lg:h-auto relative overflow-hidden group">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-3">
                <Terminal size={14} className="text-green-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Audit Execution Shell
                </span>
              </div>

              <div className="flex-1 bg-black/30 rounded-xl border border-white/5 p-3.5 font-mono text-xs text-green-300/80 overflow-y-auto space-y-2 custom-scrollbar shadow-inner">
                {reactiveLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-1.5 items-start">
                    <span className="text-green-500 shrink-0 font-semibold">[SEC]</span>
                    <span className="break-all">{log}</span>
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* DYNAMIC RESULTS MONITOR */}
          {password.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              
              {/* OVERVIEW & GAUGES */}
              <div className="grid lg:grid-cols-3 gap-6">

                {/* VERDICT SUMMARY */}
                <div className="glass-card p-6 relative overflow-hidden flex flex-col justify-between">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${themeColor.bar} to-transparent`} />
                  <div>
                    <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block mb-4">
                      Security Rating
                    </span>
                    <div className="flex items-center gap-3">
                      <div className={`px-4 py-2 rounded-full font-mono font-bold tracking-widest text-xs uppercase border ${themeColor.border} ${themeColor.bg} ${themeColor.glow}`}>
                        {result.strength.toUpperCase()}
                      </div>
                      <span className="text-xs text-gray-400 font-mono">
                        (Entropy: {result.entropy} bits)
                      </span>
                    </div>
                    <p className="text-base text-gray-250 mt-5 leading-relaxed font-sans">
                      {result.score >= 70
                        ? "This password meets security requirements. Standard cryptographic brute-force protection is fully active."
                        : result.score >= 40
                        ? "This password provides moderate security but is vulnerable to dictionary mapping. Consider adding symbols or length."
                        : "WARNING: High vulnerability detected. Brute-force systems can compromise this key structure in seconds."}
                    </p>
                  </div>

                  <div className="mt-8 flex justify-between items-center text-xs text-gray-500 font-mono border-t border-white/5 pt-4">
                    <span>COMPILATION_GRADE</span>
                    <span className={`font-bold ${themeColor.text}`}>
                      {result.score >= 70 ? "SECURE_KEY" : result.score >= 40 ? "MODERATE_RISK" : "VULNERABLE_KEY"}
                    </span>
                  </div>
                </div>

                {/* THREAT ANALYSIS DIMENSIONS */}
                <div className="lg:col-span-2 glass-card p-6 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                  <div>
                    <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block mb-5">
                      Complexity Dimensions Metrics
                    </span>
                    
                    <div className="grid sm:grid-cols-2 gap-5 font-mono text-xs">
                      
                      <div className="space-y-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-400">CHARSET_VARIETY</span>
                          <span className="text-red-400">{dimensions.variety}%</span>
                        </div>
                        <div className="w-full h-2 bg-black/45 border border-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-red-400" style={{ width: `${dimensions.variety}%` }} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-400">LENGTH_MULTIPLIER</span>
                          <span className="text-yellow-400">{dimensions.length}%</span>
                        </div>
                        <div className="w-full h-2 bg-black/45 border border-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400" style={{ width: `${dimensions.length}%` }} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-400">DICTIONARY_COLLISION_AVOIDANCE</span>
                          <span className="text-blue-400">{dimensions.patterns}%</span>
                        </div>
                        <div className="w-full h-2 bg-black/45 border border-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-400" style={{ width: `${dimensions.patterns}%` }} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-400">REPETITIVE_COLLISION_AVOIDANCE</span>
                          <span className="text-cyan-400">{dimensions.collisions}%</span>
                        </div>
                        <div className="w-full h-2 bg-black/45 border border-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400" style={{ width: `${dimensions.collisions}%` }} />
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center border-t border-white/5 pt-4 font-mono text-sm">
                    <span className="text-gray-400">TOTAL_SECURITY_INDEX</span>
                    <span className={`font-bold ${
                      result.score >= 70 ? "text-green-400" : result.score >= 40 ? "text-yellow-400" : "text-red-400"
                    }`}>
                      {result.score} / 100
                    </span>
                  </div>
                </div>

              </div>

              {/* DETAILS TABS */}
              <div className="glass-card overflow-hidden">
                
                {/* SELECT TABS */}
                <div className="flex overflow-x-auto border-b border-white/5 bg-black/25">
                  <button
                    onClick={() => setActiveTab("weaknesses")}
                    className={`px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-r border-white/5 cursor-pointer select-none
                    ${activeTab === "weaknesses" ? "bg-white/[0.02] text-green-300 font-black border-b border-green-400" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    <ShieldAlert size={13} />
                    Audit Warnings ({result.findings.length})
                  </button>

                  <button
                    onClick={() => setActiveTab("composition")}
                    className={`px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-r border-white/5 cursor-pointer select-none
                    ${activeTab === "composition" ? "bg-white/[0.02] text-green-300 font-black border-b border-green-400" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    <ActivitySquare size={13} />
                    Charset Composition
                  </button>

                  <button
                    onClick={() => setActiveTab("entropy")}
                    className={`px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-r border-white/5 cursor-pointer select-none
                    ${activeTab === "entropy" ? "bg-white/[0.02] text-green-300 font-black border-b border-green-400" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    <Cpu size={13} />
                    Entropy Metrics
                  </button>

                  <button
                    onClick={() => setActiveTab("hashes")}
                    className={`px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer select-none
                    ${activeTab === "hashes" ? "bg-white/[0.02] text-green-300 font-black border-b border-green-400" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    <Hash size={13} />
                    Cryptographic Hashes
                  </button>
                </div>

                {/* TAB DISPLAY CONTENT */}
                <div className="p-6">

                  {/* TAB 1: WEAKNESSES */}
                  {activeTab === "weaknesses" && (
                    <div className="space-y-4">
                      {result.findings.length > 0 ? (
                        result.findings.map((f, idx) => (
                          <div key={idx} className="bg-black/30 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all duration-300 flex items-start gap-4">
                            <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-mono text-base font-bold text-white uppercase tracking-wide">
                                Vulnerability Detected
                              </h4>
                              <p className="text-sm text-gray-300 mt-2 font-mono leading-relaxed">
                                {f}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center bg-black/20 border border-white/5 rounded-2xl font-mono text-xs text-green-400 flex flex-col items-center justify-center gap-2">
                          <CheckCircle2 size={24} />
                          <span>✓ Complexity Telemetry: Zero credential weaknesses flagged.</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: COMPOSITION */}
                  {activeTab === "composition" && (
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 font-mono text-xs">
                      
                      <div className="bg-black/35 rounded-2xl p-5 border border-white/5">
                        <span className="text-gray-500 uppercase tracking-wider block mb-1">Lowercase Letters</span>
                        <p className="text-2xl font-bold text-green-400">{composition.lower}</p>
                        <span className="text-[10px] text-gray-400 mt-1 block">Entropy Factor: +4.7 bits/char</span>
                      </div>

                      <div className="bg-black/35 rounded-2xl p-5 border border-white/5">
                        <span className="text-gray-500 uppercase tracking-wider block mb-1">Uppercase Letters</span>
                        <p className="text-2xl font-bold text-white">{composition.upper}</p>
                        <span className="text-[10px] text-gray-400 mt-1 block">Entropy Factor: +4.7 bits/char</span>
                      </div>

                      <div className="bg-black/35 rounded-2xl p-5 border border-white/5">
                        <span className="text-gray-500 uppercase tracking-wider block mb-1">Numerical Digits</span>
                        <p className="text-2xl font-bold text-cyan-400">{composition.numbers}</p>
                        <span className="text-[10px] text-gray-400 mt-1 block">Entropy Factor: +3.32 bits/char</span>
                      </div>

                      <div className="bg-black/35 rounded-2xl p-5 border border-white/5">
                        <span className="text-gray-500 uppercase tracking-wider block mb-1">Special Symbols</span>
                        <p className="text-2xl font-bold text-purple-400">{composition.symbols}</p>
                        <span className="text-[10px] text-gray-400 mt-1 block">Entropy Factor: +5.0 bits/char</span>
                      </div>

                    </div>
                  )}

                  {/* TAB 3: ENTROPY */}
                  {activeTab === "entropy" && (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 font-mono text-xs text-gray-400">
                      
                      <div className="bg-black/35 rounded-2xl p-5 border border-white/5">
                        <span className="text-gray-500 uppercase tracking-wider block mb-1">Shannon Entropy Bits</span>
                        <p className="text-lg font-bold text-green-400">{result.entropy} bits</p>
                      </div>

                      <div className="bg-black/35 rounded-2xl p-5 border border-white/5">
                        <span className="text-gray-500 uppercase tracking-wider block mb-1">Brute-Force Charset Pool</span>
                        <p className="text-lg font-bold text-white">
                          {((composition.lower ? 26 : 0) + (composition.upper ? 26 : 0) + (composition.numbers ? 10 : 0) + (composition.symbols ? 32 : 0)) || 0} characters
                        </p>
                      </div>

                      <div className="bg-black/35 rounded-2xl p-5 border border-white/5">
                        <span className="text-gray-500 uppercase tracking-wider block mb-1">Brute-Force Resistance</span>
                        <p className="text-lg font-bold text-blue-400">
                          {result.entropy >= 80 ? "Ultra Resistant" : result.entropy >= 60 ? "Strong Defense" : result.entropy >= 40 ? "Moderate Defense" : "Instant Crack"}
                        </p>
                      </div>

                      <div className="bg-black/35 rounded-2xl p-5 border border-white/5 sm:col-span-2 md:col-span-3">
                        <span className="text-gray-500 uppercase tracking-wider block mb-2">Mathematical Search Space Complexity</span>
                        <div className="p-3 bg-black/50 border border-white/5 rounded-lg text-green-300 overflow-x-auto whitespace-pre custom-scrollbar">
                          Total Permutations = (Pool Size)^Length = {
                            ((composition.lower ? 26 : 0) + (composition.upper ? 26 : 0) + (composition.numbers ? 10 : 0) + (composition.symbols ? 32 : 0)) || 0
                          } ^ {password.length} ≈ 2^{result.entropy} total keys.
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 4: CRYPTOGRAPHIC HASH SIMULATION */}
                  {activeTab === "hashes" && (
                    <div className="bg-black/45 border border-white/5 rounded-2xl p-5 font-mono text-xs text-green-300 leading-relaxed shadow-inner">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 text-gray-500 font-bold">
                        <span>CRYPTO_HASH_DECK_SIMULATOR</span>
                        <span>Client-side generated hashes</span>
                      </div>
                      
                      <div className="space-y-4 py-2 font-mono">
                        <div className="space-y-1">
                          <span className="text-gray-500">MD5 Digest Hash:</span>
                          <pre className="p-2.5 bg-black/50 border border-white/5 rounded-lg text-cyan-400 overflow-x-auto whitespace-pre custom-scrollbar select-all">
                            {mockHash(password, "md5")}
                          </pre>
                        </div>

                        <div className="space-y-1">
                          <span className="text-gray-500">SHA-256 Digest Hash:</span>
                          <pre className="p-2.5 bg-black/50 border border-white/5 rounded-lg text-green-400 overflow-x-auto whitespace-pre custom-scrollbar select-all">
                            {mockHash(password, "sha256")}
                          </pre>
                        </div>

                        <div className="space-y-1">
                          <span className="text-gray-500">bcrypt Hash (KDF Simulation):</span>
                          <pre className="p-2.5 bg-black/50 border border-white/5 rounded-lg text-yellow-400 overflow-x-auto whitespace-pre custom-scrollbar select-all">
                            {mockHash(password, "bcrypt")}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </motion.section>
          )}

        </div>
      </main>
    </>
  );
}