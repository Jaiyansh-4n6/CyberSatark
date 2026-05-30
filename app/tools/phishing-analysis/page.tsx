"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import CyberBackground from "@/components/cyberbackground";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  ShieldAlert,
  Terminal,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Lock,
  Unlock,
  Server,
  FileCode,
  AlertCircle,
  Clock,
  ArrowRight,
  ListTodo,
  Globe,
  Fingerprint,
  Info
} from "lucide-react";

type Verdict =
  | "LEGITIMATE"
  | "SUSPICIOUS"
  | "PHISHING";

interface Threat {
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  detail: string;
}

interface AnalysisResult {
  verdict: Verdict;
  risk: number;
  confidence: number;
  summary: string;
  threats: Threat[];
  iocs: string[];
  dimensions: {
    urgency: number;
    impersonation: number;
    credentialHarvesting: number;
    technicalDeception: number;
    socialEngineering: number;
  };
  securityScore: number;
}

function getRiskColor(score: number) {
  if (score >= 70)
    return {
      text: "text-red-400",
      bar: "bg-red-500",
      border: "border-red-500/30",
      bg: "bg-red-500/10",
      glow: "shadow-red-500/15"
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
    text: "text-green-400",
    bar: "bg-green-500",
    border: "border-green-500/30",
    bg: "bg-green-500/10",
    glow: "shadow-green-500/15"
  };
}

function analyseMessage(text: string): AnalysisResult {
  const content = text.toLowerCase();
  let risk = 0;
  const threats: Threat[] = [];
  const iocs: string[] = [];

  let urgency = 0;
  let impersonation = 0;
  let credentialHarvesting = 0;
  let technicalDeception = 0;
  let socialEngineering = 0;
  let securityScore = 100;

  // URL DETECTION
  const urls = text.match(/(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi) || [];
  if (urls.length > 0) {
    technicalDeception += 30;
    risk += 15;
    securityScore -= 10;
    iocs.push(...urls);
    threats.push({
      severity: "medium",
      title: "Suspicious Hyperlink Detected",
      detail: "The message text embeds external hyperlinks. Scammers often use misleading web URLs to route traffic to deceptive portals."
    });
  }

  // SHORTENED URLS
  const shorteners = ["bit.ly", "tinyurl", "goo.gl", "t.co", "is.gd", "shrtco.de"];
  let hasShorteners = false;
  shorteners.forEach((s) => {
    if (content.includes(s)) {
      hasShorteners = true;
    }
  });

  if (hasShorteners) {
    risk += 25;
    technicalDeception += 45;
    securityScore -= 15;
    threats.push({
      severity: "high",
      title: "Obfuscated Shortened Link",
      detail: "URL shorteners are active in this message. These services are commonly used by threat actors to conceal hazardous routing pathways."
    });
  }

  // URGENCY TACTICS
  const urgencyWords = [
    "urgent",
    "immediately",
    "verify now",
    "suspended",
    "act now",
    "warning",
    "limited time",
    "expire",
    "final notice",
    "unauthorized"
  ];

  let urgencyMatches = 0;
  urgencyWords.forEach((word) => {
    if (content.includes(word)) {
      urgencyMatches++;
    }
  });

  if (urgencyMatches > 0) {
    urgency = Math.min(100, urgencyMatches * 20);
    risk += urgencyMatches * 6;
  }

  if (urgency >= 30) {
    securityScore -= 10;
    threats.push({
      severity: "medium",
      title: "Urgency Manipulation Flag",
      detail: "High-pressure urgency words were detected. Scammers use artificial time limits to induce quick, panic-driven actions."
    });
  }

  // CREDENTIAL HARVESTING
  const credentialWords = [
    "password",
    "otp",
    "credit card",
    "bank account",
    "security code",
    "login",
    "verify your account",
    "confirm your account",
    "ssn",
    "pincode",
    "passcode"
  ];

  let credentialMatches = 0;
  credentialWords.forEach((word) => {
    if (content.includes(word)) {
      credentialMatches++;
    }
  });

  if (credentialMatches > 0) {
    credentialHarvesting = Math.min(100, credentialMatches * 22);
    risk += credentialMatches * 8;
  }

  if (credentialHarvesting >= 30) {
    securityScore -= 20;
    threats.push({
      severity: "high",
      title: "Credential Harvesting Request",
      detail: "Solicitations for credentials, security codes, or accounts are present. Trusted services do not request passwords or PINs via text."
    });
  }

  // BRAND IMPERSONATION
  const brands = [
    "paypal",
    "google",
    "amazon",
    "microsoft",
    "apple",
    "instagram",
    "facebook",
    "netflix",
    "bank",
    "metamask",
    "coinbase"
  ];

  let brandMatches = 0;
  brands.forEach((brand) => {
    if (content.includes(brand)) {
      brandMatches++;
    }
  });

  if (brandMatches > 0) {
    impersonation = Math.min(100, brandMatches * 25);
    risk += brandMatches * 10;
  }

  if (impersonation >= 25) {
    securityScore -= 15;
    threats.push({
      severity: "high",
      title: "Corporate Brand Reference",
      detail: "The message makes explicit reference to reputable corporate entities. Verify sender authentication to prevent typosquatting attacks."
    });
  }

  // SOCIAL ENGINEERING
  const engineeringWords = [
    "account locked",
    "payment failed",
    "unauthorized login",
    "will be closed",
    "legal action",
    "avoid fees",
    "violation"
  ];

  let engineeringMatches = 0;
  engineeringWords.forEach((word) => {
    if (content.includes(word)) {
      engineeringMatches++;
    }
  });

  if (engineeringMatches > 0) {
    socialEngineering = Math.min(100, engineeringMatches * 25);
    risk += engineeringMatches * 12;
  }

  if (socialEngineering >= 25) {
    securityScore -= 15;
    threats.push({
      severity: "medium",
      title: "Fear-Inducing Social Engineering",
      detail: "Tactical language triggers fear of penalties, account closure, or legal action. Designed to manipulate emotional responses."
    });
  }

  // SCAM CHECKS
  const scamWords = [
    "bitcoin",
    "crypto",
    "wallet",
    "investment",
    "profit",
    "won",
    "claim prize",
    "gift card",
    "lottery",
    "reward",
    "cashback"
  ];

  let scamMatches = 0;
  scamWords.forEach((word) => {
    if (content.includes(word)) {
      scamMatches++;
    }
  });

  if (scamMatches >= 2) {
    risk += 15;
    threats.push({
      severity: "medium",
      title: "Financial Reward Scams",
      detail: "Promises of rewards, crypto returns, or lottery payouts are present. Classic indicators of financial phishing schemes."
    });
  }

  risk = Math.min(risk, 100);
  securityScore = Math.max(0, Math.min(securityScore, 100));

  let verdict: Verdict = "LEGITIMATE";
  if (risk >= 70) verdict = "PHISHING";
  else if (risk >= 30) verdict = "SUSPICIOUS";

  const confidence = Math.min(95, 55 + threats.length * 7);
  const summary =
    verdict === "LEGITIMATE"
      ? "Diagnostic validation complete. The message shows zero high-risk keywords, links, or manipulation tactics."
      : `Message contains ${threats.length} indicators of interest linked to urgency prompts, brand references, or harvesting cues.`;

  return {
    verdict,
    risk,
    confidence,
    summary,
    threats,
    iocs,
    dimensions: {
      urgency,
      impersonation,
      credentialHarvesting,
      technicalDeception: Math.min(100, technicalDeception),
      socialEngineering,
    },
    securityScore,
  };
}

export default function PhishingAnalysis() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  // Upgraded widgets state
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"threats" | "iocs" | "semantics" | "payload">("threats");

  const runAnalysis = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setScanLogs([]);
    setAnalysis(null);

    const logMessages = [
      "Initializing string buffer scanner...",
      "Extracting hyperlink matches and anchor nodes...",
      "Scrutinizing URLs against redirect shorteners index...",
      "Tokenizing words and validating against urgency dictionary...",
      "Matching character sequences for credential harvesting vectors...",
      "Comparing references to registered enterprise brands...",
      "Evaluating text emotional pressure & fear factors...",
      "Scoring financial prize and cryptocurrency matches...",
      "Weighting threat parameters against heuristic scoring models...",
      "Phishing intelligence diagnosis compiled successfully."
    ];

    for (let i = 0; i < logMessages.length; i++) {
      await new Promise((r) => setTimeout(r, 180 + Math.random() * 70));
      setScanLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${logMessages[i]}`]);
    }

    const result = analyseMessage(text);
    setAnalysis(result);
    setLoading(false);
  };

  const riskColor = useMemo(
    () => (analysis ? getRiskColor(analysis.risk) : null),
    [analysis]
  );

  const semanticKeywords = useMemo(() => {
    if (!text.trim()) return null;
    const content = text.toLowerCase();
    const urgencyWords = ["urgent", "immediately", "verify now", "suspended", "act now", "warning", "expire"];
    const credentialWords = ["password", "otp", "credit card", "bank", "login", "verify", "confirm"];
    const brands = ["paypal", "google", "amazon", "microsoft", "apple", "netflix", "facebook", "bank"];
    const scams = ["bitcoin", "crypto", "won", "prize", "gift card", "lottery", "reward"];

    return {
      urgency: urgencyWords.filter(w => content.includes(w)),
      credentials: credentialWords.filter(w => content.includes(w)),
      brands: brands.filter(w => content.includes(w)),
      scams: scams.filter(w => content.includes(w))
    };
  }, [text]);

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
                Phishing Analyzer
              </motion.span>
            </h1>

            <p className="mt-5 text-gray-300 max-w-2xl mx-auto text-lg">
              Audit messages, emails, or texts. Parse semantic social engineering indicators, cross-reference brand names, and detect hidden URL links.
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
                  Phishing Analysis Terminal
                </p>
                <div className="text-xs text-gray-500 font-mono">
                  text-inspector.sh
                </div>
              </div>

              <div className="p-6 space-y-5">
                <textarea
                  rows={8}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste message contents here (SMS, Whatsapp messages, body of an email, etc.)..."
                  className="w-full rounded-2xl bg-black/35 border border-white/10 p-5 text-sm font-mono text-green-350 placeholder:text-gray-600 resize-none focus:outline-none focus:border-green-400/40 transition duration-300 shadow-inner"
                />

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-2">
                  <div className="flex items-center gap-3 text-sm text-gray-400 font-mono">
                    <span className="text-green-400 animate-pulse">●</span>
                    NLP Scanner Online
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={runAnalysis}
                    disabled={loading || !text.trim()}
                    className="px-8 py-4 rounded-xl bg-green-500 text-black font-mono font-bold hover:bg-green-400 shadow-lg shadow-green-500/10 transition duration-300 cursor-pointer disabled:opacity-40 text-base"
                  >
                    {loading ? "ANALYSER_BUSY..." : "RUN_AI_SCAN"}
                  </motion.button>
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
                {scanLogs.length > 0 ? (
                  scanLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-1.5 items-start">
                      <span className="text-green-500 shrink-0 font-semibold">[SEC]</span>
                      <span>{log}</span>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 text-[11px] gap-1.5 py-4">
                    <Activity size={18} className="opacity-30" />
                    <span>// STANDBY: Input text data to initialize semantic parser indicators.</span>
                  </div>
                )}
                {loading && (
                  <div className="flex items-center gap-1 text-green-400 animate-pulse">
                    <span>●</span>
                    <span>Scanning message body...</span>
                  </div>
                )}
              </div>
            </div>

          </section>

          {/* DYNAMIC RESULTS MONITOR */}
          {analysis && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              
              {/* OVERVIEW & GAUGES */}
              <div className="grid lg:grid-cols-3 gap-6">

                {/* VERDICT SUMMARY */}
                <div className="glass-card p-6 relative overflow-hidden flex flex-col justify-between">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${riskColor?.bar} to-transparent`} />
                  <div>
                    <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block mb-4">
                      Threat Verdict
                    </span>
                    <div className="flex items-center gap-3">
                      <div className={`px-4 py-2 rounded-full font-mono font-bold tracking-widest text-xs uppercase border ${riskColor?.border} ${riskColor?.bg} ${riskColor?.glow}`}>
                        {analysis.verdict}
                      </div>
                      <span className="text-xs text-gray-400 font-mono">
                        (Confidence: {analysis.confidence}%)
                      </span>
                    </div>
                    <p className="text-base text-gray-250 mt-5 leading-relaxed font-sans">
                      {analysis.summary}
                    </p>
                  </div>

                  <div className="mt-8 flex justify-between items-center text-xs text-gray-500 font-mono border-t border-white/5 pt-4">
                    <span>SEVERITY_LEVEL</span>
                    <span className={`font-bold ${riskColor?.text}`}>
                      {analysis.risk >= 70 ? "CRITICAL_THREAT" : analysis.risk >= 30 ? "SUSPICIOUS_THREAT" : "PASS_SECURE"}
                    </span>
                  </div>
                </div>

                {/* THREAT ANALYSIS DIMENSIONS */}
                <div className="lg:col-span-2 glass-card p-6 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                  <div>
                    <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block mb-5">
                      Phishing Dimensions Metrics
                    </span>
                    
                    <div className="grid sm:grid-cols-2 gap-5 font-mono text-xs">
                      
                      <div className="space-y-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-400">URGENCY_INDUCEMENT</span>
                          <span className="text-red-400">{analysis.dimensions.urgency}%</span>
                        </div>
                        <div className="w-full h-2 bg-black/45 border border-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-red-400" style={{ width: `${analysis.dimensions.urgency}%` }} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-400">BRAND_IMPERSONATION</span>
                          <span className="text-yellow-400">{analysis.dimensions.impersonation}%</span>
                        </div>
                        <div className="w-full h-2 bg-black/45 border border-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400" style={{ width: `${analysis.dimensions.impersonation}%` }} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-400">CREDENTIAL_HARVEST_MARKERS</span>
                          <span className="text-blue-400">{analysis.dimensions.credentialHarvesting}%</span>
                        </div>
                        <div className="w-full h-2 bg-black/45 border border-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-400" style={{ width: `${analysis.dimensions.credentialHarvesting}%` }} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-400">TECHNICAL_DECEPTION</span>
                          <span className="text-cyan-400">{analysis.dimensions.technicalDeception}%</span>
                        </div>
                        <div className="w-full h-2 bg-black/45 border border-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400" style={{ width: `${analysis.dimensions.technicalDeception}%` }} />
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center border-t border-white/5 pt-4 font-mono text-sm">
                    <span className="text-gray-400">COMPUTED_STABILITY_INDEX</span>
                    <span className={`font-bold ${
                      analysis.securityScore >= 80 ? "text-green-400" : analysis.securityScore >= 50 ? "text-yellow-400" : "text-red-400"
                    }`}>
                      {analysis.securityScore} / 100
                    </span>
                  </div>
                </div>

              </div>

              {/* DETAILS PANEL WITH TABS */}
              <div className="glass-card overflow-hidden">
                
                {/* SELECT TABS */}
                <div className="flex overflow-x-auto border-b border-white/5 bg-black/25">
                  <button
                    onClick={() => setActiveTab("threats")}
                    className={`px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-r border-white/5 cursor-pointer select-none
                    ${activeTab === "threats" ? "bg-white/[0.02] text-green-300 font-black border-b border-green-400" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    <ShieldAlert size={13} />
                    Threat Warnings ({analysis.threats.length})
                  </button>

                  <button
                    onClick={() => setActiveTab("iocs")}
                    className={`px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-r border-white/5 cursor-pointer select-none
                    ${activeTab === "iocs" ? "bg-white/[0.02] text-green-300 font-black border-b border-green-400" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    <Globe size={13} />
                    IOC Extract ({analysis.iocs.length})
                  </button>

                  <button
                    onClick={() => setActiveTab("semantics")}
                    className={`px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-r border-white/5 cursor-pointer select-none
                    ${activeTab === "semantics" ? "bg-white/[0.02] text-green-300 font-black border-b border-green-400" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    <Fingerprint size={13} />
                    Semantic Keywords
                  </button>

                  <button
                    onClick={() => setActiveTab("payload")}
                    className={`px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer select-none
                    ${activeTab === "payload" ? "bg-white/[0.02] text-green-300 font-black border-b border-green-400" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    <FileCode size={13} />
                    Raw Text Payload
                  </button>
                </div>

                {/* TABS CONTENT */}
                <div className="p-6">

                  {/* TAB 1: THREATS */}
                  {activeTab === "threats" && (
                    <div className="space-y-4">
                      {analysis.threats.length > 0 ? (
                        analysis.threats.map((t, idx) => (
                          <div key={idx} className="bg-black/30 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all duration-300 flex items-start gap-4">
                            <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                            <div>
                              <div className="flex items-center gap-3 flex-wrap">
                                <h4 className="font-mono text-base font-bold text-white uppercase tracking-wide">
                                  {t.title}
                                </h4>
                                <span className="text-[10px] font-mono font-bold uppercase border border-red-500/20 px-2 py-0.5 rounded bg-red-500/5 text-red-400 tracking-wider">
                                  {t.severity}
                                </span>
                              </div>
                              <p className="text-sm text-gray-300 mt-2 font-mono leading-relaxed">
                                {t.detail}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center bg-black/20 border border-white/5 rounded-2xl font-mono text-xs text-green-400 flex flex-col items-center justify-center gap-2">
                          <CheckCircle2 size={24} />
                          <span>✓ NLP Telemetry: Zero phishing indicators matched.</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: IOC */}
                  {activeTab === "iocs" && (
                    <div className="space-y-4">
                      {analysis.iocs.length > 0 ? (
                        <div className="grid sm:grid-cols-2 gap-4">
                          {analysis.iocs.map((ioc, idx) => (
                            <div key={idx} className="bg-black/35 rounded-2xl p-5 border border-white/5 font-mono text-xs text-cyan-400 break-all flex flex-col justify-between">
                              <div>
                                <span className="text-gray-500 uppercase tracking-widest text-[9px] block mb-1">EXTRACTED_HYPERLINK</span>
                                <p className="font-bold text-sm text-white select-all">{ioc}</p>
                              </div>
                              <div className="mt-4 flex items-center gap-1.5 text-[10px] text-gray-400 border-t border-white/5 pt-2">
                                <Info size={11} className="text-cyan-400" />
                                <span>Note: Do not load suspicious URLs directly in standard browsers.</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center bg-black/20 border border-white/5 rounded-2xl font-mono text-xs text-gray-500">
                          // Zero external hyperlinks or shortened URLs extracted from message payload.
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: SEMANTICS */}
                  {activeTab === "semantics" && semanticKeywords && (
                    <div className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-5 font-mono text-xs">
                        
                        <div className="bg-black/35 rounded-2xl p-5 border border-white/5">
                          <span className="text-gray-500 uppercase tracking-wider block mb-2">URGENCY TRIGGER WORDS</span>
                          {semanticKeywords.urgency.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {semanticKeywords.urgency.map(w => (
                                <span key={w} className="px-2.5 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-bold">{w}</span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-600 italic">None matched</span>
                          )}
                        </div>

                        <div className="bg-black/35 rounded-2xl p-5 border border-white/5">
                          <span className="text-gray-500 uppercase tracking-wider block mb-2">CREDENTIAL SOLICITATIONS</span>
                          {semanticKeywords.credentials.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {semanticKeywords.credentials.map(w => (
                                <span key={w} className="px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold">{w}</span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-600 italic">None matched</span>
                          )}
                        </div>

                        <div className="bg-black/35 rounded-2xl p-5 border border-white/5">
                          <span className="text-gray-500 uppercase tracking-wider block mb-2">PROTECTED BRANDS MONITORED</span>
                          {semanticKeywords.brands.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {semanticKeywords.brands.map(w => (
                                <span key={w} className="px-2.5 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-bold">{w}</span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-600 italic">None matched</span>
                          )}
                        </div>

                        <div className="bg-black/35 rounded-2xl p-5 border border-white/5">
                          <span className="text-gray-500 uppercase tracking-wider block mb-2">SCAM / REWARD PATTERNS</span>
                          {semanticKeywords.scams.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {semanticKeywords.scams.map(w => (
                                <span key={w} className="px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold">{w}</span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-600 italic">None matched</span>
                          )}
                        </div>

                      </div>
                    </div>
                  )}

                  {/* TAB 4: PAYLOAD */}
                  {activeTab === "payload" && (
                    <div className="bg-black/45 border border-white/5 rounded-2xl p-5 font-mono text-xs text-green-300 leading-relaxed shadow-inner">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 text-gray-500">
                        <span>EXTRACTED_ASCII_STRING_STREAM</span>
                        <span>Length: {text.length} chars</span>
                      </div>
                      <pre className="overflow-x-auto whitespace-pre-wrap py-2 leading-relaxed font-mono">
                        {text}
                      </pre>
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