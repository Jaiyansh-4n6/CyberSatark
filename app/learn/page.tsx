"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import CyberBackground from "@/components/cyberbackground";
import { 
  BookOpen, 
  Activity, 
  Fingerprint, 
  ShieldAlert, 
  Globe, 
  Target, 
  Lock, 
  LifeBuoy, 
  Terminal,
  Check,
  AlertTriangle,
  ChevronRight,
  Info,
  Shield,
  Loader2,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Eye,
  ArrowRight
} from "lucide-react";
import { ProgressBar } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

const chapters = [
  { title: "Introduction to Phishing", icon: BookOpen },
  { title: "How Phishing Attacks Work", icon: Activity },
  { title: "Types of Phishing", icon: Fingerprint },
  { title: "Identifying Phishing Attempts", icon: ShieldAlert },
  { title: "URL and Website Analysis", icon: Globe },
  { title: "Real-World Impact of Phishing", icon: Target },
  { title: "Prevention and Safety Measures", icon: Lock },
  { title: "Response, Reporting, and Modern Detection", icon: LifeBuoy },
  { title: "Personal Incident Response", icon: Terminal }
];

export default function LearnPage() {
  const [active, setActive] = useState(0);
  const progress = ((active + 1) / chapters.length) * 100;

  return (
    <>
      <Navbar />
      
      {/* EXACT SPACER OFFSET FOR NAVBAR HEIGHT */}
      <div className="h-28" />
      <CyberBackground />

      {/* HEIGHT ADJUSTED TO PREVENT OVERLAY CUTS */}
      <div className="flex h-[calc(100vh-112px)] overflow-hidden text-gray-300 relative z-10 max-w-7xl mx-auto w-full">
        {/* SIDEBAR PANEL */}
        <aside className="cyber-scroll h-full w-80 border-r border-white/5 px-6 py-6 overflow-y-auto bg-black/25 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <Shield className="text-green-400 h-5 w-5" />
              <h2 className="text-lg font-black text-white font-mono tracking-wider uppercase">
                Training Guide
              </h2>
            </div>

            <div className="space-y-2">
              {chapters.map((ch, i) => {
                const Icon = ch.icon;
                const isActive = active === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 font-mono text-sm relative overflow-hidden flex items-center gap-3 group
                    ${
                      isActive
                        ? "bg-green-500/10 border-green-500/40 text-green-300 font-bold"
                        : "border-white/5 hover:bg-white/[0.02] hover:border-white/10 hover:text-white text-gray-400"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <Icon size={15} className={isActive ? "text-green-400" : "text-gray-500 group-hover:text-gray-300"} />
                    <span className="truncate flex-1">{ch.title}</span>
                    {active > i ? (
                      <Check size={13} className="text-green-400 shrink-0" />
                    ) : (
                      <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 border-t border-white/5 pt-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mb-2">
              <span>MODULE_INDEX</span>
              <span className="text-green-400">{Math.round(progress)}% COMPLETE</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </aside>

        {/* MAIN HUD CONSOLE */}
        <main className="cyber-scroll h-full flex-1 overflow-y-auto px-8 py-8 flex flex-col justify-between">
          <div className="space-y-8 max-w-4xl mx-auto w-full">
            {/* INSTRUCTOR OVERVIEW SECTION */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-400/20 to-transparent" />
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black text-white font-mono uppercase tracking-wide">
                    Phishing Awareness HUD
                  </h1>
                  <p className="text-xs text-gray-400 mt-1 font-mono uppercase">
                    Interactive Modules & Verification Quizzes
                  </p>
                </div>
                <div className="text-right font-mono text-xs text-gray-500">
                  <span>CHAPTER_{active + 1}_OF_{chapters.length}</span>
                  <span className="block text-green-400 mt-0.5 font-bold">{chapters[active].title}</span>
                </div>
              </div>
              <ProgressBar
                aria-label="Progress tracker bar"
                value={progress}
                className="w-full mt-4"
              >
                <ProgressBar.Track className="bg-black/45 border border-white/5 h-2 rounded-full overflow-hidden">
                  <ProgressBar.Fill className="bg-gradient-to-r from-green-600 to-green-400 h-full" />
                </ProgressBar.Track>
              </ProgressBar>
            </div>

            {/* INTERACTIVE LEARNING SHEETS */}
            <div className="glass-card p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {active === 0 && <Intro />}
                  {active === 1 && <HowWorks />}
                  {active === 2 && <Types />}
                  {active === 3 && <Identify />}
                  {active === 4 && <URLAnalysis />}
                  {active === 5 && <Impact />}
                  {active === 6 && <Prevention />}
                  {active === 7 && <Response />}
                  {active === 8 && <PersonalIncidentResponse />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* MANUAL NAVIGATION CONTROLS */}
          <div className="flex justify-between max-w-4xl mx-auto w-full mt-8 border-t border-white/5 pt-6 pb-4">
            <button
              disabled={active === 0}
              onClick={() => setActive((p) => p - 1)}
              className="px-6 py-3 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] text-xs font-mono font-bold disabled:opacity-30 disabled:pointer-events-none transition duration-300 cursor-pointer"
            >
              ← PREV_MODULE
            </button>

            <button
              disabled={active === chapters.length - 1}
              onClick={() => setActive((p) => p + 1)}
              className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-black text-xs font-mono font-bold disabled:opacity-30 disabled:pointer-events-none transition duration-300 shadow-lg shadow-green-500/10 cursor-pointer"
            >
              NEXT_MODULE →
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

/* ---------- COMMON LAYOUT ACCENT MODULE ---------- */
interface SectionProps {
  title: string;
  icon?: React.ComponentType<any>;
  children: React.ReactNode;
}

function Section({ title, icon: Icon, children }: SectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        {Icon && <Icon className="text-green-400 h-6 w-6" />}
        <h2 className="text-2xl font-black text-white font-mono uppercase tracking-wide">
          {title}
        </h2>
      </div>
      <div className="space-y-5 leading-relaxed text-base text-gray-200 font-sans">
        {children}
      </div>
    </section>
  );
}

/* ---------- DETAILED HIGHLIGHT CARDS ---------- */
interface CalloutProps {
  type: "warning" | "info" | "success";
  title: string;
  children: React.ReactNode;
}

function Callout({ type, title, children }: CalloutProps) {
  const styles = {
    warning: {
      border: "border-red-500/20",
      bg: "bg-red-500/[0.02]",
      text: "text-red-400",
      icon: AlertCircle
    },
    info: {
      border: "border-blue-500/20",
      bg: "bg-blue-500/[0.02]",
      text: "text-blue-400",
      icon: Info
    },
    success: {
      border: "border-green-500/20",
      bg: "bg-green-500/[0.02]",
      text: "text-green-400",
      icon: CheckCircle2
    }
  }[type];

  const Icon = styles.icon;

  return (
    <div className={`p-5 rounded-2xl border ${styles.border} ${styles.bg} flex items-start gap-4 shadow-inner mt-4`}>
      <Icon size={18} className={`${styles.text} shrink-0 mt-0.5`} />
      <div className="space-y-1">
        <h4 className={`text-sm font-mono font-bold uppercase tracking-wider ${styles.text}`}>
          {title}
        </h4>
        <div className="text-sm text-gray-300 font-sans leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---------- HIGH-FIDELITY INTERACTIVE QUIZ ---------- */
interface QuizProps {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

function Quiz({ question, options, answerIndex, explanation }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="mt-8 p-6 border border-white/5 rounded-2xl bg-black/30 backdrop-blur-md shadow-inner relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[2px] h-full bg-green-500/35" />
      
      <p className="font-bold text-green-400 mb-2 font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5">
        <Shield size={12} />
        DIAGNOSTIC_VERIFICATION
      </p>

      <p className="mb-4 text-base text-gray-150 leading-relaxed font-sans">{question}</p>

      <div className="space-y-2.5">
        {options.map((opt, i) => {
          let btnStyle = "border-white/5 hover:border-green-500/20 hover:bg-white/[0.01] text-gray-300";
          if (showAnswer) {
            if (i === answerIndex) {
              btnStyle = "border-green-500/40 bg-green-500/10 text-green-300 font-bold";
            } else if (i === selected) {
              btnStyle = "border-red-500/40 bg-red-500/10 text-red-300";
            } else {
              btnStyle = "border-white/5 opacity-40 text-gray-500";
            }
          }

          return (
            <button
              key={i}
              disabled={showAnswer}
              onClick={() => {
                setSelected(i);
                setShowAnswer(true);
              }}
              className={`block w-full text-left px-4 py-3 rounded-xl border text-sm font-mono transition-all duration-300 ${btnStyle} flex items-center justify-between cursor-pointer`}
            >
              <span>{opt}</span>
              {showAnswer && i === answerIndex && <Check size={16} className="text-green-400 shrink-0" />}
              {showAnswer && i === selected && i !== answerIndex && <AlertTriangle size={16} className="text-red-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showAnswer && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 pt-5 border-t border-white/5 overflow-hidden"
          >
            <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-1 text-green-400">
              {selected === answerIndex ? "✓ Telemetry Match: Pass" : "✗ Telemetry Discrepancy: Alert"}
            </span>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              {explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =================================================================================================
 * CHAPTER COMPONENTS
 * ===============================================================================================*/

/* --- 1. INTRODUCTION --- */
function Intro() {
  return (
    <IntroContent />
  );
}

function IntroContent() {
  return (
    <Section title="Introduction to Phishing" icon={BookOpen}>
      <p>
        Phishing is a deceptive cyberattack vector where threat actors impersonate trusted
        entities—such as banks, corporate executives, or digital service providers—to manipulate 
        users into exposing credentials, financial payloads, or Multi-Factor tokens. 
      </p>
      
      <p>
        Unlike technical hacking vectors that seek code exploits, phishing targets 
        **human cognitive protocols**. By engineering feelings of urgency, threat, or high reward, 
        attackers trick operators into bypassing normal verification steps.
      </p>

      {/* THREAT TELEMETRY METRIC LABELS */}
      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-black/25 rounded-2xl border border-white/5 text-center font-mono">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">DATA_BREACH_SOURCE</span>
          <span className="text-2xl font-black text-red-400 block">91%</span>
          <span className="text-[10px] text-gray-450 mt-1 block">Originates via Phishing</span>
        </div>
        <div className="p-4 bg-black/25 rounded-2xl border border-white/5 text-center font-mono">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">ATTACK_FREQUENCY</span>
          <span className="text-2xl font-black text-yellow-500 block">11s</span>
          <span className="text-[10px] text-gray-450 mt-1 block">Worldwide Attack Cycle</span>
        </div>
        <div className="p-4 bg-black/25 rounded-2xl border border-white/5 text-center font-mono">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">BUSINESS_IMPACT</span>
          <span className="text-2xl font-black text-blue-400 block">$4.9M</span>
          <span className="text-[10px] text-gray-450 mt-1 block">Average Breach Cost</span>
        </div>
      </div>

      <Callout type="warning" title="Cognitive Override Vulnerability">
        Standard firewalls and encrypted pipes cannot prevent phishing if an operator willingly enters 
        credentials on a spoofed portal. Human training is the primary firewall against social engineering.
      </Callout>

      <Quiz
        question="Phishing primarily exploits which vector?"
        options={[
          "Unpatched zero-day firmware flaws",
          "Human psychological and trust protocols",
          "Inefficient packet routing protocols",
          "Insufficient RAM allocations on local nodes"
        ]}
        answerIndex={1}
        explanation="Phishing exploits cognitive vulnerabilities (trust, fear, urgency) rather than structural code vulnerabilities."
      />
    </Section>
  );
}

/* --- 2. HOW ATTACKS WORK --- */
function HowWorks() {
  const steps = [
    { num: "01", label: "RECONNAISSANCE", desc: "Attackers harvest target telemetry from public sources (social networks, business directories, data leaks)." },
    { num: "02", label: "INFRASTRUCTURE_SETUP", desc: "Attacker registers typo-squatted domains, designs cloned websites, and acquires email senders." },
    { num: "03", label: "LURE_DISPATCH", desc: "The payload link or file is crafted and sent via SMS, email, or direct messages, mimicking trusted alerts." },
    { num: "04", label: "OPERATOR_COMPROMISE", desc: "The victim clicks the link, inputs credentials, or downloads attachments under urgent conditions." },
    { num: "05", label: "EXPLOIT_EXECUTED", desc: "Attackers capture data, access cloud endpoints, siphoning financial portals or locking databases." }
  ];

  return (
    <Section title="How Phishing Attacks Work" icon={Activity}>
      <p>
        A phishing vector operates systematically. Rather than chaotic attempts, attackers 
        deploy a structured compromise chain designed to bypass defensive firewalls and user suspicions.
      </p>

      {/* TIMELINE INTERACTIVE DIAGRAM */}
      <div className="mt-8 space-y-4">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-green-400 mb-4">// ATTACK_LIFECYCLE_TIMELINE</h4>
        {steps.map((s, idx) => (
          <div key={idx} className="flex gap-4 items-start group">
            <div className="flex flex-col items-center">
              <span className="w-8 h-8 rounded-full border border-green-500/25 flex items-center justify-center font-mono text-xs text-green-400 bg-green-500/5 group-hover:border-green-500 transition-colors shadow-[0_0_8px_rgba(34,197,94,0.05)]">
                {s.num}
              </span>
              {idx < steps.length - 1 && (
                <div className="w-[1px] h-12 bg-white/10 group-hover:bg-green-500/20 transition-colors" />
              )}
            </div>
            <div className="flex-1 bg-white/[0.01] border border-white/5 p-4 rounded-xl hover:border-green-500/15 hover:bg-white/[0.02] transition-all duration-300">
              <span className="text-sm font-mono font-bold text-white uppercase tracking-wider">{s.label}</span>
              <p className="text-sm text-gray-400 mt-1 font-sans leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Quiz
        question="Which phase of the lifecycle focuses on gathering targets' personal detail profiles?"
        options={[
          "Eradication and monitoring",
          "Reconnaissance and telemetry collection",
          "Lure dispatch execution",
          "Operator input intercept"
        ]}
        answerIndex={1}
        explanation="Reconnaissance is the initial phase where attackers research targets to personalize lures for spear-phishing."
      />
    </Section>
  );
}

/* --- 3. TYPES OF PHISHING --- */
function Types() {
  const [activeTab, setActiveTab] = useState(0);

  const typesList = [
    {
      name: "Spear Phishing",
      vector: "EMAIL",
      threat: "HIGH",
      desc: "Unlike mass phishing, spear phishing is personalized. Attackers research targets in advance, utilizing specific details (e.g., job titles, project names, or colleague names) to build trust.",
      example: "An email from 'IT Dept' addressing you by your name, referencing your specific computer system, requesting a patch update."
    },
    {
      name: "Whaling",
      vector: "EXECUTIVE_CHANNELS",
      threat: "CRITICAL",
      desc: "A sub-type of spear phishing specifically targeting high-profile targets such as CEOs, CFOs, or government officials to authorize wire transfers or access databases.",
      example: "A forged sub-dossier sent to the Chief Financial Officer from the Board Director demanding payment for an urgent acquisition."
    },
    {
      name: "Smishing",
      vector: "SMS_TEXT",
      threat: "MEDIUM",
      desc: "Phishing conducted through SMS text messages. These often masquerade as delivery notifications, bank alerts, or government warnings containing urgent action links.",
      example: "'USPS-UPDATE: Your package could not be delivered due to address mismatch. Update details here: post-usps-redirection.com'"
    },
    {
      name: "Vishing",
      vector: "VOICE_CALLS",
      threat: "MEDIUM",
      desc: "Voice phishing where attackers call victims directly, using spoofed numbers and social engineering tactics to extract critical verification elements or bank pins.",
      example: "An automated voice call claiming to be the Tax department demanding immediate settlement of an outstanding liability."
    },
    {
      name: "Clone Phishing",
      vector: "EMAIL_REPLICA",
      threat: "HIGH",
      desc: "Attackers take a legitimate email containing attachments or links that the victim has previously received, copy it, swap links with malware, and send a cloned email.",
      example: "A duplicate invoice email claiming 'updated bank details' referencing a real transaction that took place earlier."
    }
  ];

  return (
    <Section title="Types of Phishing" icon={Fingerprint}>
      <p>
        Phishing has evolved from generic mass spam into multiple highly specialized sub-vectors. 
        Attackers select their methods based on the specific targets and accessibility constraints of the organization.
      </p>

      {/* INTERACTIVE TABS */}
      <div className="mt-6 border border-white/5 rounded-2xl overflow-hidden bg-black/20">
        <div className="flex overflow-x-auto border-b border-white/5 scrollbar-thin">
          {typesList.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3.5 text-xs font-mono font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer
              ${
                activeTab === idx
                  ? "bg-green-500/10 text-green-300 border-b-2 border-green-500"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
            <span>VECTOR: <span className="text-white font-bold">{typesList[activeTab].vector}</span></span>
            <span>THREAT_LEVEL: <span className={typesList[activeTab].threat === "CRITICAL" ? "text-red-500 font-bold" : "text-yellow-500 font-bold"}>{typesList[activeTab].threat}</span></span>
          </div>

          <div className="space-y-2">
            <h4 className="text-base font-bold text-white font-mono uppercase tracking-wide">
              {typesList[activeTab].name} Description
            </h4>
            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              {typesList[activeTab].desc}
            </p>
          </div>

          <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-red-400 block uppercase tracking-wider">
              ☢ SIMULATED_ATTACK_VECTOR:
            </span>
            <p className="text-sm text-gray-300 italic font-mono leading-relaxed">
              {typesList[activeTab].example}
            </p>
          </div>
        </div>
      </div>

      <Quiz
        question="Which attack focus impersonates corporate executives to authorize large financial payouts?"
        options={[
          "Generic spam mailing",
          "Whaling attack vector",
          "Local network spoofing",
          "WiFi sniffing hijack"
        ]}
        answerIndex={1}
        explanation="Whaling specifically targets high-value corporate executives like CEOs and CFOs who have authorization privileges."
      />
    </Section>
  );
}

/* --- 4. IDENTIFYING PHISHING --- */
function Identify() {
  const [inspectMode, setInspectMode] = useState<"legit" | "phish">("phish");

  return (
    <Section title="Identifying Phishing Attempts" icon={ShieldAlert}>
      <p>
        Most phishing emails leave digital artifacts and behavioral clues that operators can spot. 
        Developing the habit of inspecting message headers, grammatical structures, and links protects accounts.
      </p>

      {/* HEADER COMPARISON INTERACTIVE MODULE */}
      <div className="mt-8 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-green-400">// HEADER_VERIFICATION_CONSOLE</span>
          <div className="flex bg-black/45 border border-white/5 p-1 rounded-xl">
            <button
              onClick={() => setInspectMode("phish")}
              className={`px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer
              ${inspectMode === "phish" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "text-gray-500 hover:text-gray-300"}`}
            >
              Phishing (Spoofed)
            </button>
            <button
              onClick={() => setInspectMode("legit")}
              className={`px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer
              ${inspectMode === "legit" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "text-gray-500 hover:text-gray-300"}`}
            >
              Legitimate (Verified)
            </button>
          </div>
        </div>

        {inspectMode === "phish" ? (
          <div className="border border-red-500/25 bg-red-500/[0.01] rounded-2xl p-6 font-mono text-sm space-y-3 relative overflow-hidden shadow-lg shadow-red-950/10">
            <div className="absolute top-0 right-0 bg-red-500/10 text-red-400 px-3 py-1.5 text-[10px] tracking-widest font-bold uppercase border-l border-b border-red-500/20">
              SPOOF_DETECTION_FLAGGED
            </div>
            
            <div className="space-y-1.5 border-b border-white/5 pb-3 pt-2">
              <div>
                <span className="text-gray-500">From:</span>{" "}
                <span className="text-red-400 font-bold">Netflix accounts-verify@netflix-update.secure-portal.com</span>
                <span className="text-xs text-red-500 block mt-0.5">// ALERT: Mismatched domain. Domain is secure-portal.com, not netflix.com</span>
              </div>
              <div>
                <span className="text-gray-500">To:</span>{" "}
                <span>target-user@corporate-node.org</span>
              </div>
              <div>
                <span className="text-gray-500">Subject:</span>{" "}
                <span className="text-yellow-400 font-bold">⚠️ IMMEDIATE SUSPENSION: Billing Telemetry Conflict</span>
                <span className="text-xs text-yellow-500 block mt-0.5">// ALERT: Artificial urgency & threat tone design</span>
              </div>
            </div>

            <div className="text-gray-350 py-2 leading-relaxed space-y-3 font-sans">
              <p>
                <span className="text-red-400 underline font-bold font-mono">Dear Customer,</span>
                <span className="text-xs text-red-505 block mt-0.5 font-mono">// ALERT: Generic greeting indicating mass mailing lists</span>
              </p>
              <p>
                We were unable to process your payment index. Access will be revoked in **24 hours** 
                unless billing records are updated.
              </p>
              <p className="pt-2">
                <span className="px-4 py-2 border border-red-500/20 bg-red-500/5 text-red-400 rounded-lg inline-block text-xs font-mono tracking-wide select-none cursor-pointer">
                  SECURE_VERIFICATION_LINK
                </span>
                <span className="text-xs text-red-500 block mt-1 font-mono">// ALERT: Button redirects to: target-redirect-portal.net/auth</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="border border-green-500/25 bg-green-500/[0.01] rounded-2xl p-6 font-mono text-sm space-y-3 relative overflow-hidden shadow-lg shadow-green-950/10">
            <div className="absolute top-0 right-0 bg-green-500/10 text-green-400 px-3 py-1.5 text-[10px] tracking-widest font-bold uppercase border-l border-b border-green-500/20">
              CRYPTOGRAPHICALLY_VERIFIED
            </div>

            <div className="space-y-1.5 border-b border-white/5 pb-3 pt-2">
              <div>
                <span className="text-gray-500">From:</span>{" "}
                <span className="text-green-400 font-bold">Netflix info@netflix.com</span>
                <span className="text-xs text-green-400 block mt-0.5">// VERIFIED: Signed by netflix.com (DKIM / SPF Checked)</span>
              </div>
              <div>
                <span className="text-gray-500">To:</span>{" "}
                <span>target-user@corporate-node.org</span>
              </div>
              <div>
                <span className="text-gray-500">Subject:</span>{" "}
                <span>Monthly billing confirmation receipt</span>
              </div>
            </div>

            <div className="text-gray-350 py-2 leading-relaxed space-y-3 font-sans">
              <p>
                <span className="text-green-400 font-bold font-mono">Dear John Doe,</span>
                <span className="text-xs text-green-400 block mt-0.5 font-mono">// VERIFIED: Personalized targeting matching operator profile</span>
              </p>
              <p>
                This email confirms that your monthly subscription invoice has been successfully processed. 
                Your billing receipt details are stored in your settings dashboard.
              </p>
              <p className="pt-2">
                <span className="px-4 py-2 border border-green-500/20 bg-green-500/5 text-green-400 rounded-lg inline-block text-xs font-mono tracking-wide select-none cursor-pointer">
                  VIEW_SETTINGS_PORTAL
                </span>
                <span className="text-xs text-green-400 block mt-1 font-mono">// VERIFIED: Redirects to secure verified root: netflix.com/your-account</span>
              </p>
            </div>
          </div>
        )}
      </div>

      <Quiz
        question="Which header field discrepancy is the strongest indicator of a spoofed phishing message?"
        options={[
          "An email address that mismatches the actual brand subdomain routing",
          "A subject line that doesn't use standard punctuation",
          "A timestamp displaying a late-night delivery index",
          "The absence of images inside the message content frame"
        ]}
        answerIndex={0}
        explanation="Spoofed senders use similar names, but the root domain name in the address field will reveal they do not control the brand domain."
      />
    </Section>
  );
}

/* --- 5. URL AND WEBSITE ANALYSIS --- */
function URLAnalysis() {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  const urlSegments = [
    { part: "https://", desc: "Protocol: Encrypts data in transit. Note: Attackers use HTTPS too! A lock icon only means encryption is active, not that the site is secure or authentic.", type: "neutral" },
    { part: "netflix", desc: "Subdomain: Attackers put trusted brand names here as a subdomain prefix to trick eyes that read from left to right.", type: "warn" },
    { part: ".billing-check", desc: "Secondary Subdomain: Further details designed to distract the operator from checking the main root domain.", type: "warn" },
    { part: ".secure-login-portal", desc: "Primary Domain Label: This is the actual owner root domain of the host website. Because it says secure-login-portal instead of netflix, it is a phishing host!", type: "critical" },
    { part: ".com", desc: "TLD (Top-Level Domain): General purpose TLD. Anyone can buy a TLD suffix under any naming label.", type: "neutral" },
    { part: "/update-account", desc: "Path Directory: File structures configured by the attacker to mimic verified Netflix settings navigation paths.", type: "neutral" }
  ];

  return (
    <Section title="URL and Website Analysis" icon={Globe}>
      <p>
        Modern phishing websites look visually identical to the corporate portals they clone. 
        The only element that attackers cannot duplicate is the **registered root domain name** in the browser address bar.
      </p>

      {/* URL DISSECTION INTERACTIVE CONSOLE */}
      <div className="mt-8 space-y-4">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-green-400">// URL_DISSECTION_ENGINE (Click segments to analyze)</h4>
        
        <div className="flex flex-wrap items-center bg-black/45 border border-white/5 p-4 rounded-2xl font-mono text-sm leading-none justify-center gap-1 select-none">
          {urlSegments.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSegment(idx)}
              className={`px-1.5 py-2.5 rounded-lg border transition-all cursor-pointer font-bold
              ${
                activeSegment === idx
                  ? s.type === "critical"
                    ? "bg-red-500/20 border-red-500 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                    : s.type === "warn"
                    ? "bg-yellow-500/20 border-yellow-500 text-yellow-300 shadow-[0_0_12px_rgba(234,179,8,0.2)]"
                    : "bg-blue-500/20 border-blue-500 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                  : s.type === "critical"
                  ? "border-red-500/20 text-red-400 hover:border-red-500/40"
                  : s.type === "warn"
                  ? "border-yellow-500/20 text-yellow-400 hover:border-yellow-500/40"
                  : "border-white/5 text-gray-400 hover:border-white/20"
              }`}
            >
              {s.part}
            </button>
          ))}
        </div>

        {/* ANNOTATION DISPLAY */}
        <AnimatePresence mode="wait">
          {activeSegment !== null ? (
            <motion.div
              key={activeSegment}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md"
            >
              <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                <span className="text-gray-500">ANALYSIS_TARGET:</span>
                <span className={`font-bold ${
                  urlSegments[activeSegment].type === "critical"
                    ? "text-red-500"
                    : urlSegments[activeSegment].type === "warn"
                    ? "text-yellow-500"
                    : "text-blue-500"
                }`}>
                  {urlSegments[activeSegment].type.toUpperCase()}
                </span>
              </div>
              <h5 className="font-mono font-bold text-white text-sm mb-1">
                Segment: {urlSegments[activeSegment].part}
              </h5>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                {urlSegments[activeSegment].desc}
              </p>
            </motion.div>
          ) : (
            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] text-center text-xs text-gray-500 font-mono italic">
              Click any colored segment in the URL to inspect its technical details.
            </div>
          )}
        </AnimatePresence>
      </div>

      <Quiz
        question="Given: https://paypal.verification-portal-service.net/login. What is the root domain label?"
        options={[
          "paypal",
          "verification-portal-service",
          "net",
          "login"
        ]}
        answerIndex={1}
        explanation="The root domain label immediately precedes the TLD (.net). Here, the root domain is 'verification-portal-service.net', not 'paypal.com'."
      />
    </Section>
  );
}

/* --- 6. REAL-WORLD IMPACT --- */
function Impact() {
  const caseStudies = [
    {
      title: "Credential Harvesting",
      metric: "72% of Breaches",
      desc: "Attackers deploy fake Outlook, Gmail, or corporate SSO login portals. Once operators input access keys, they hijack cloud files, email boxes, and network directories."
    },
    {
      title: "Business Email Compromise (BEC)",
      metric: "Financial Threat",
      desc: "By spoofing or hijacking executive mailboxes, attackers instruct accounting operators to modify invoice bank destination codes, redirecting corporate payments."
    },
    {
      title: "Ransomware Infiltration",
      metric: "System Shutdown",
      desc: "Phishing emails carry disguised scripts (macros, fake PDFs). Once opened, they execute local shellcode, encrypting company databases and demanding millions in payout."
    }
  ];

  return (
    <Section title="Real-World Impact of Phishing" icon={Target}>
      <p>
        Phishing is rarely a solitary threat; it serves as the spearhead vector for complex organizational compromises, 
        malware deployments, and financial fraud.
      </p>

      {/* BENTO GRID CASES */}
      <div className="grid md:grid-cols-3 gap-5 mt-6">
        {caseStudies.map((cs, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-green-500/10 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-green-400 font-bold block tracking-widest">// TARGET_{idx+1}</span>
              <h4 className="text-base font-bold text-white font-mono uppercase tracking-wide">{cs.title}</h4>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">{cs.desc}</p>
            </div>
            <div className="pt-2 border-t border-white/5 font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              Impact Profile: <span className="text-red-400 font-bold">{cs.metric}</span>
            </div>
          </div>
        ))}
      </div>

      <Quiz
        question="Which attack focus impersonates corporate routing instructions to divert legitimate vendor invoices to hacker accounts?"
        options={[
          "Credential Harvesting",
          "Business Email Compromise (BEC)",
          "Typo-Squatted SQL Injection",
          "Local wireless decryption"
        ]}
        answerIndex={1}
        explanation="Business Email Compromise (BEC) manipulates business correspondence, usually impersonating executives or vendors, to divert wire transfers."
      />
    </Section>
  );
}

/* --- 7. PREVENTION MEASURES --- */
function Prevention() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false, false]);

  const toggleCheck = (idx: number) => {
    const next = [...checkedItems];
    next[idx] = !next[idx];
    setCheckedItems(next);
  };

  const currentTally = checkedItems.filter(Boolean).length;
  const checklistProgress = (currentTally / checkedItems.length) * 100;

  const steps = [
    { title: "Enforce Multi-Factor Authentication (MFA)", desc: "MFA blocks up to 99% of simple automated account takeovers, even if credentials are stolen." },
    { title: "Deploy Password Management Utilities", desc: "Password managers evaluate browser URLs and will refuse to auto-fill credentials on look-alike phishing pages." },
    { title: "Inspect Sender Domain Records & Routing Details", desc: "Verify if SPF, DKIM, and DMARC envelopes match. Treat generic notifications as untrusted." },
    { title: "Implement Passive Link-Inspection Protocols (Hover)", desc: "Always hover over links to read their actual destination address before committing keystrokes." },
    { title: "Enforce DNS Security Filters & Firewalls", desc: "Block connection access to known threat repositories using services that block suspicious domain classifications." }
  ];

  return (
    <Section title="Prevention and Safety Measures" icon={Lock}>
      <p>
        Building a strong security profile requires a mixture of defensive tools and careful user habits. 
        By implementing these rules, operators can reduce threat exposure.
      </p>

      {/* CHECKLIST HUD INTERACTIVE MODULE */}
      <div className="mt-8 space-y-4">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="font-bold text-green-400 uppercase tracking-wider">// DEFENSIVE_COMPLIANCE_TALLY</span>
          <span>{currentTally} / {checkedItems.length} IMPLEMENTED</span>
        </div>
        
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${checklistProgress}%` }}
          />
        </div>

        <div className="space-y-2.5 pt-2">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 cursor-pointer
              ${
                checkedItems[idx]
                  ? "bg-green-500/[0.02] border-green-500/35 text-white"
                  : "bg-white/[0.01] border-white/5 hover:border-white/10 text-gray-300"
              }`}
            >
              <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors
              ${checkedItems[idx] ? "border-green-500 bg-green-500 text-black" : "border-white/20 bg-black/20"}`}>
                {checkedItems[idx] && <Check size={12} strokeWidth={3} />}
              </div>
              <div>
                <span className={`text-sm font-mono font-bold block ${checkedItems[idx] ? "text-green-300" : "text-white"}`}>
                  {s.title}
                </span>
                <p className="text-sm text-gray-400 mt-1 font-sans leading-relaxed">{s.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Quiz
        question="Which system represents the most powerful defense against credential-theft access?"
        options={[
          "A localized DNS cache reload",
          "Deploying Multi-Factor Authentication (MFA / 2FA)",
          "Adding a secure banner warning in HTML emails",
          "Periodically updating device hardware specs"
        ]}
        answerIndex={1}
        explanation="Even if an attacker harvests the user's password, MFA blocks access by requiring a separate token verification."
      />
    </Section>
  );
}

/* --- 8. RESPONSE & MODERN DETECTION --- */
function Response() {
  return (
    <Section title="Response, Reporting, and Modern Detection" icon={LifeBuoy}>
      <p>
        Modern security filters use automated detection systems. By analyzing message vocabulary, 
        domain ages, SSL signature paths, and link layouts, automated firewalls identify threats 
        before they hit the inbox.
      </p>

      {/* THREE PILLAR CARDS */}
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-black/25 rounded-2xl border border-white/5">
          <h4 className="text-sm font-mono font-bold text-white mb-2 uppercase tracking-wide">
            1. Cryptographic Record Checks (DMARC)
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed font-sans">
            Authentication frameworks (SPF, DKIM) verify if the sending server is authorized to 
            dispatch mail on behalf of the domain label, dropping suspicious senders automatically.
          </p>
        </div>
        <div className="p-4 bg-black/25 rounded-2xl border border-white/5">
          <h4 className="text-sm font-mono font-bold text-white mb-2 uppercase tracking-wide">
            2. Real-Time Reputation Feeds
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed font-sans">
            Browsers reference online domain blacklists (Google Safe Browsing, PhishTank) to block 
            connections to domain labels registered in the last 24-48 hours.
          </p>
        </div>
      </div>

      <Quiz
        question="What cryptographic verification system checks if a mail delivery server is authorized to send emails?"
        options={[
          "Local host file audits",
          "Sender Policy Framework (SPF) records",
          "Virtual Private Network routing checks",
          "SSL browser certificate verification"
        ]}
        answerIndex={1}
        explanation="SPF is an email authentication standard that lists the IP addresses authorized to send emails for a domain."
      />
    </Section>
  );
}

/* --- 9. PERSONAL INCIDENT RESPONSE SIMULATOR --- */
function PersonalIncidentResponse() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      title: "Identification",
      content: "You suspect entering credentials on an unverified site, sharing a verification pin, or downloading a suspicious file.",
      action: "Flag operator status as compromised.",
      consoleCmds: [
        "sys_detect --target=active_operator",
        "WARN: Exchanged credentials found on host: verify-netflix-portal.com",
        "ALERT: Session token hijacked from cookie payload. Host isolation recommended."
      ]
    },
    {
      title: "Containment",
      content: "Restrict access paths to isolate the compromise area.",
      action: "Revoke sessions → Reset target passwords → Request MFA.",
      consoleCmds: [
        "sys_contain --action=revoke_oauth_tokens --scope=all",
        "sys_contain --action=reset_system_credentials --user=current",
        "Success. Terminated 14 active sessions across corporate endpoints.",
        "Pushing verification challenge... Enforced MFA status."
      ]
    },
    {
      title: "Eradication",
      content: "Search for and remove any malware or hidden access channels.",
      action: "Audit browser extensions → Run local scan tools.",
      consoleCmds: [
        "sys_eradicate --scan=malware --target=local_host",
        "Analyzing script extensions and hook injections...",
        "Flagged element: patch-utility.vbs (Hash: F4E2) ... DELETED",
        "No further background listener scripts found."
      ]
    },
    {
      title: "Recovery",
      content: "Safely restore normal accounts and audit the environment.",
      action: "Review recovery emails → Check system log histories.",
      consoleCmds: [
        "sys_recover --action=sync_restore --target=database_link",
        "Enforcing verified secondary recovery addresses... OK",
        "Rebuilding system state. Verification audit check: passed."
      ]
    },
    {
      title: "Reporting",
      content: "File formal reports to block transactions and warn authorities.",
      action: "Report to bank → Call 1930 → File case at cybercrime.gov.in.",
      consoleCmds: [
        "sys_report --portal=cybercrime.gov.in --type=dossier_draft",
        "Exporting forensic telemetry logs... Done.",
        "Auto-filing dispute notices to bank API endpoints... CONNECTED."
      ]
    },
    {
      title: "Monitoring",
      content: "Watch for delayed attacks or data misuse.",
      action: "Track bank reports → Monitor credit files.",
      consoleCmds: [
        "sys_monitor --telemetry=passive_tracking --duration=30days",
        "Deploying login replay triggers... ENGAGED",
        "Listening for compromise replays... ACTIVE"
      ]
    }
  ];

  useEffect(() => {
    if (started) {
      // Append step logs
      const currentCmds = steps[step].consoleCmds;
      const formatted = currentCmds.map(cmd => `[${new Date().toLocaleTimeString()}] ${cmd}`);
      setTerminalLogs(prev => [...prev, ...formatted]);
    }
  }, [step, started]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  const handleStart = () => {
    setStarted(true);
    setStep(0);
    const initialCmds = steps[0].consoleCmds.map(cmd => `[${new Date().toLocaleTimeString()}] ${cmd}`);
    setTerminalLogs([
      `[${new Date().toLocaleTimeString()}] INTERACTIVE INCIDENT SIMULATOR: ONLINE`,
      `[${new Date().toLocaleTimeString()}] Enforcing forensic perimeter monitoring...`,
      ...initialCmds
    ]);
  };

  return (
    <Section title="Personal Incident Response" icon={Terminal}>
      <p>
        If credentials or session tokens are exposed, immediate action is critical. 
        Follow this structured security playbook to contain breaches and restore account safety.
      </p>

      <div className="bg-black/45 border border-white/5 rounded-2xl p-6 mt-6 backdrop-blur-sm shadow-inner relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-400/25 to-transparent" />
        
        {!started ? (
          <div className="text-center py-8">
            <button
              onClick={handleStart}
              className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-xl transition duration-300 cursor-pointer shadow-lg shadow-green-500/10 font-mono text-xs tracking-wider uppercase"
            >
              🚨 Initialize_Response_Playbook
            </button>
            <p className="text-[10px] text-gray-500 font-mono mt-3 uppercase">
              Launch interactive terminal console training simulator
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            
            {/* PLAYBOOK FLOW WIZARD */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex flex-wrap gap-2">
                {steps.map((s, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 min-w-[70px] text-center py-1.5 rounded-lg border text-[9px] font-mono tracking-wider transition-all duration-300
                    ${
                      idx === step
                        ? "bg-green-500 text-black border-green-500 font-bold"
                        : idx < step
                        ? "bg-green-500/5 border-green-500/20 text-green-400"
                        : "bg-white/[0.01] border-white/5 text-gray-500"
                    }`}
                  >
                    {s.title.substring(0, 7)}..
                  </div>
                ))}
              </div>

              {/* CARD DETAILS */}
              <div className="bg-white/[0.01] border border-white/5 rounded-xl p-5 space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-green-400 font-bold tracking-widest block uppercase">
                    STEP_0{step + 1} // PLAYBOOK_{steps[step].title.toUpperCase()}
                  </span>
                  <h4 className="text-base font-bold text-white font-mono mt-1">{steps[step].title} Phase</h4>
                  <p className="text-sm text-gray-450 mt-2 font-sans leading-relaxed">{steps[step].content}</p>
                </div>

                <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl text-green-350 font-mono text-xs leading-relaxed">
                  <span className="text-green-400 font-bold block mb-1">▶ RECOMMENDED OPERATOR ACTION:</span>
                  {steps[step].action}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    disabled={step === 0}
                    onClick={() => setStep((p) => p - 1)}
                    className="px-3.5 py-1.5 rounded-lg border border-white/5 hover:border-white/10 text-[10px] font-mono hover:bg-white/[0.01] disabled:opacity-30 transition cursor-pointer"
                  >
                    PREV_PHASE
                  </button>

                  <button
                    disabled={step === steps.length - 1}
                    onClick={() => setStep((p) => p + 1)}
                    className="px-3.5 py-1.5 rounded-lg bg-green-500 text-black font-mono font-bold text-[10px] hover:bg-green-600 disabled:opacity-30 transition cursor-pointer"
                  >
                    NEXT_PHASE
                  </button>
                </div>
              </div>
            </div>

            {/* LIVE CONSOLE LOGS TERMINAL */}
            <div className="lg:col-span-2 flex flex-col h-[280px] bg-black/55 border border-white/5 rounded-xl p-4 font-mono text-[9px] text-green-400/90 relative shadow-inner overflow-hidden select-text">
              <div className="absolute top-0 left-0 right-0 bg-white/5 px-3 py-1.5 flex items-center justify-between border-b border-white/5 select-none">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Terminal size={10} className="text-green-400" />
                  INCIDENT_TERMINAL
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              </div>

              <div className="flex-1 overflow-y-auto pt-6 space-y-1.5 custom-scrollbar pr-1">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="leading-normal flex items-start gap-1">
                    <span className="text-green-500/50 select-none">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </div>

          </div>
        )}
      </div>
    </Section>
  );
}