"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import CyberBackground from "@/components/cyberbackground";

const chapters = [
  "Introduction to Phishing",
  "How Phishing Attacks Work",
  "Types of Phishing",
  "Identifying Phishing Attempts",
  "URL and Website Analysis",
  "Real-World Impact of Phishing",
  "Prevention and Safety Measures",
  "Response, Reporting, and Modern Detection",
  "Persnoal Incident Response",
];

export default function LearnPage() {
  const [active, setActive] = useState(0);
  const progress = ((active + 1) / chapters.length) * 100;

  return (
    <>
      <Navbar />
      <div className="h-24" />
      <CyberBackground />

      <div className="flex h-screen overflow-hidden pt-24 text-gray-300">
        {/* SIDEBAR */}
        <aside className="cyber-scroll h-full w-80 border-r border-green-500/10 px-6 py-6 overflow-y-auto backdrop-blur-xl bg-black/20">

          <h2 className="text-xl font-bold text-green-400 mb-6">
            Phishing Guide
          </h2>

          <div className="space-y-3">
            {chapters.map((c, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition
                ${
                  active === i
                    ? "bg-green-500/10 border-green-500 text-green-300"
                    : "border-green-500/10 hover:bg-green-500/10"
                }`}
              >

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {c}
                  </span>

                  {active > i && (
                    <span className="text-green-400 text-xs">
                      ✓
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <main className="cyber-scroll h-full flex-1 overflow-y-auto px-10 py-8 max-w-5xl mx-auto w-full">
          {/* HEADER */}
          <div className="mb-8 p-6 rounded-3xl border border-green-500/20 bg-black/30 backdrop-blur-xl shadow-2xl shadow-green-500/10">

            <h1 className="text-2xl font-bold text-green-400 mb-2">
              Phishing Awareness Training
            </h1>

            <p className="text-sm text-gray-400 mb-4">
              Learn how phishing works,
              identify attacks, and protect
              yourself with real-world
              examples and quizzes.
            </p>

            <div className="w-full h-2 bg-[#020817] rounded-full overflow-hidden">

              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Progress: {active + 1} /{" "}
              {chapters.length} chapters
            </p>
          </div>

          {/* CONTENT CARD */}
          <div className="p-8 rounded-3xl border border-green-500/20 bg-black/30 backdrop-blur-xl shadow-2xl shadow-green-500/10">

            {active === 0 && <Intro />}
            {active === 1 && <HowWorks />}
            {active === 2 && <Types />}
            {active === 3 && <Identify />}
            {active === 4 && <URLAnalysis />}
            {active === 5 && <Impact />}
            {active === 6 && <Prevention />}
            {active === 7 && <Response />}
            {active === 8 && (
              <PersonalIncidentResponse />
            )}
          </div>

          {/* NAV BUTTONS */}
          <div className="flex justify-between mt-6">

            <button
              disabled={active === 0}
              onClick={() =>
                setActive((p) => p - 1)
              }
              className="px-4 py-2 rounded-lg border border-green-500/10 hover:bg-green-500/10 disabled:opacity-40"
            >
              ← Previous
            </button>

            <button
              disabled={
                active ===
                chapters.length - 1
              }
              onClick={() =>
                setActive((p) => p + 1)
              }
              className="px-4 py-2 rounded-lg border border-green-500 text-green-300 hover:bg-green-500/10 disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

/* ---------- SECTION ---------- */

function Section({
  title,
  children,
}: any) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-green-400 mb-4">
        {title}
      </h2>

      <div className="space-y-4 leading-7">
        {children}
      </div>
    </section>
  );
}

/* ---------- QUIZ (UNCHANGED) ---------- */

function Quiz({
  question,
  options,
  answerIndex,
}: {
  question: string;
  options: string[];
  answerIndex: number;
}) {
  const [selected, setSelected] =
    useState<number | null>(null);

  const [showAnswer, setShowAnswer] =
    useState(false);

  return (
    <div className="mt-6 p-5 border border-green-500/20 rounded-2xl bg-black/30 backdrop-blur-xl">

      <p className="font-semibold text-green-300 mb-2">
        Quiz
      </p>

      <p className="mb-3">{question}</p>

      <div className="space-y-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => {
              setSelected(i);
              setShowAnswer(true);
            }}
            className={`block w-full text-left px-3 py-2 rounded-lg border transition
              ${
                showAnswer
                  ? i === answerIndex
                    ? "border-green-500 bg-green-900/30"
                    : i === selected
                    ? "border-red-500 bg-red-900/30"
                    : "border-green-500/10"
                  : "border-green-500/10 hover:bg-green-500/10"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {showAnswer && (
        <p className="mt-3 text-sm text-gray-400">
          {selected === answerIndex
            ? "Correct!"
            : `Incorrect. Correct answer: ${options[answerIndex]}`}
        </p>
      )}
    </div>
  );
}
function Intro() {
  return (
    <Section title="Introduction to Phishing">
      <p>
        Phishing is a cyberattack technique where attackers impersonate trusted
        organizations such as banks, government agencies, or popular online
        services to trick users into revealing sensitive information. Unlike
        traditional hacking, phishing targets human psychology by creating a
        sense of urgency, fear, or reward. Because it relies on deception rather
        than technical vulnerabilities, even well-secured systems can be
        compromised if users are not aware.
      </p>

      <ul className="list-disc ml-6">
        <li>A form of social engineering attack</li>
        <li>Steals passwords, OTPs, and financial data</li>
        <li>Delivered via email, SMS, calls, or fake websites</li>
        <li>Affects both individuals and organizations</li>
        <li>One of the most common cyber threats</li>
      </ul>

      <Quiz
        question="Phishing primarily exploits:"
        options={["Hardware flaws", "Human trust", "Network speed", "RAM"]}
        answerIndex={1}
      />
    </Section>
  );
}

function HowWorks() {
  return (
    <Section title="How Phishing Attacks Work">
      <p>
        A phishing attack follows a structured process. The attacker first
        gathers information about the target and then creates a convincing fake
        message or website. The victim is pressured to act quickly, such as
        clicking a link or entering login credentials. Once the victim
        interacts, the attacker captures the data and uses it for fraud,
        identity theft, or unauthorized access.
      </p>

      <ul className="list-disc ml-6">
        <li>Reconnaissance: collecting target information</li>
        <li>Creation of fake login pages or links</li>
        <li>Delivery through email, SMS, or social media</li>
        <li>User interaction leads to data theft</li>
        <li>Stolen data used for financial or account fraud</li>
      </ul>

      <Quiz
        question="Which step comes first in phishing?"
        options={[
          "Data theft",
          "Fake message creation",
          "Account hacking",
          "Money withdrawal",
        ]}
        answerIndex={1}
      />
    </Section>
  );
}

function Types() {
  return (
    <Section title="Types of Phishing">
      <p>
        Phishing exists in multiple forms depending on how the attacker targets
        the victim. Some attacks are sent to thousands of users, while others
        are highly personalized.
      </p>

      <ul className="list-disc ml-6">
        <li>Email phishing: mass fraudulent emails</li>
        <li>Spear phishing: targeted at specific individuals</li>
        <li>Whaling: aimed at senior executives</li>
        <li>Smishing: phishing via SMS messages</li>
        <li>Vishing: phishing through voice calls</li>
        <li>Social media phishing: fake login pages</li>
      </ul>

      <Quiz
        question="Phishing via SMS is called:"
        options={["Vishing", "Smishing", "Cloning", "Spoofing"]}
        answerIndex={1}
      />
    </Section>
  );
}

function Identify() {
  return (
    <Section title="Identifying Phishing Attempts">
      <p>
        Phishing messages often contain warning signs that users can learn to
        recognize. These include suspicious sender addresses, spelling
        mistakes, urgent language, and mismatched links.
      </p>

      <ul className="list-disc ml-6">
        <li>Generic greetings like “Dear user”</li>
        <li>Urgent or threatening language</li>
        <li>Spelling and grammar errors</li>
        <li>Suspicious attachments or shortened links</li>
        <li>Mismatch between displayed and actual URL</li>
      </ul>

      <Quiz
        question="A request for OTP via email is:"
        options={[
          "Normal banking process",
          "Phishing sign",
          "Software update",
          "Authentication method",
        ]}
        answerIndex={1}
      />
    </Section>
  );
}

function URLAnalysis() {
  return (
    <Section title="URL and Website Analysis">
      <p>
        Phishing websites are designed to closely resemble legitimate ones, but
        their URLs often reveal the deception.
      </p>

      <ul className="list-disc ml-6">
        <li>Check for misspelled domain names</li>
        <li>Look for HTTPS and padlock icon</li>
        <li>Avoid clicking shortened links blindly</li>
        <li>Watch for excessive subdomains</li>
        <li>Verify domain ownership if unsure</li>
      </ul>

      <Quiz
        question="Misspelled domain names usually indicate:"
        options={[
          "Secure website",
          "Phishing site",
          "Government portal",
          "Bank homepage",
        ]}
        answerIndex={1}
      />
    </Section>
  );
}

function Impact() {
  return (
    <Section title="Real-World Impact of Phishing">
      <p>
        Phishing attacks are widely used in financial fraud, corporate breaches,
        and identity theft.
      </p>

      <ul className="list-disc ml-6">
        <li>Banking and KYC fraud</li>
        <li>Fake internship or job scams</li>
        <li>Corporate invoice and payment fraud</li>
        <li>Cloud account takeovers</li>
        <li>Data breaches and ransomware attacks</li>
      </ul>

      <Quiz
        question="Fake internship emails are an example of:"
        options={[
          "System update",
          "Phishing scam",
          "Antivirus alert",
          "Cloud backup",
        ]}
        answerIndex={1}
      />
    </Section>
  );
}

function Prevention() {
  return (
    <Section title="Prevention and Safety Measures">
      <p>
        Preventing phishing requires a combination of user awareness and
        technical safeguards.
      </p>

      <ul className="list-disc ml-6">
        <li>Never share passwords or OTPs</li>
        <li>Enable two-factor authentication (2FA)</li>
        <li>Hover over links before clicking</li>
        <li>Use strong, unique passwords</li>
        <li>Verify requests through official sources</li>
      </ul>

      <Quiz
        question="Best way to prevent phishing?"
        options={[
          "Share OTP quickly",
          "Click all links",
          "Verify URLs",
          "Disable antivirus",
        ]}
        answerIndex={2}
      />
    </Section>
  );
}

function Response() {
  return (
    <Section title="Response, Reporting, and Modern Detection">
      <p>
        If a user suspects they have been phished, immediate action is essential
        to minimize damage.
      </p>

      <ul className="list-disc ml-6">
        <li>Change compromised passwords immediately</li>
        <li>Contact bank or service provider</li>
        <li>Scan device for malware</li>
        <li>Report incidents to cybercrime authorities</li>
        <li>ML models help detect phishing links automatically</li>
      </ul>

      <Quiz
        question="First step after being phished?"
        options={[
          "Ignore it",
          "Change password immediately",
          "Restart computer",
          "Delete browser",
        ]}
        answerIndex={1}
      />
    </Section>
  );
}

function PersonalIncidentResponse() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Identification",
      content:
        "You suspect that you entered credentials on a fake site, shared an OTP, downloaded a file, or noticed suspicious transactions.",
      action: "Treat this as a phishing incident immediately.",
    },
    {
      title: "Containment",
      content:
        "Stop further access by securing your accounts and financial data.",
      action:
        "Change passwords → Enable 2FA → Log out of all sessions → Block card if needed.",
    },
    {
      title: "Eradication",
      content:
        "Remove any malware or hidden access from your device and accounts.",
      action:
        "Run antivirus scan → Remove suspicious apps/extensions → Check email forwarding rules.",
    },
    {
      title: "Recovery",
      content:
        "Restore your accounts safely and verify no attacker access remains.",
      action:
        "Reset passwords again → Verify recovery details → Review account activity.",
    },
    {
      title: "Reporting",
      content:
        "Report quickly to increase the chance of stopping fraud or recovering funds.",
      action:
        "Call 1930 → Report at cybercrime.gov.in → Inform your bank.",
    },
    {
      title: "Monitoring",
      content:
        "Watch for delayed misuse of your data in the coming weeks.",
      action:
        "Monitor bank, email logins, OTP requests, and credit activity.",
    },
  ];

  return (
    <Section title="Personal Incident Response">
      <p>
        If you believe you have interacted with a phishing message or fake
        website, acting quickly can prevent financial loss and account takeover.
        Follow this step-by-step response plan to secure your accounts and
        recover safely.
      </p>

      <div className="bg-[#07142a] border border-[#12345c] rounded-xl p-6 mt-6">
        {!started ? (
          <button
            onClick={() => setStarted(true)}
            className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg transition"
          >
            🚨 I Got Phished — Show Emergency Steps
          </button>
        ) : (
          <div className="space-y-6">
            {/* FLOWCHART HEADER */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`flex-1 min-w-[120px] text-center px-3 py-2 rounded-lg border
                  ${
                    i === step
                      ? "bg-green-500 text-black border-green-400"
                      : i < step
                      ? "bg-[#102a4d] border-green-500 text-green-300"
                      : "bg-[#07142a] border-[#12345c] text-gray-400"
                  }`}
                >
                  {s.title}
                </div>
              ))}
            </div>

            {/* CURRENT STEP CARD */}
            <div className="bg-[#102a4d] border border-[#12345c] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-400 mb-3">
                {steps[step].title}
              </h3>

              <p className="mb-4">{steps[step].content}</p>

              <div className="bg-[#07142a] border border-[#12345c] rounded-lg p-4 text-green-300">
                {steps[step].action}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  disabled={step === 0}
                  onClick={() => setStep((prev) => prev - 1)}
                  className="px-4 py-2 rounded-lg border border-[#12345c] hover:bg-[#07142a] disabled:opacity-40"
                >
                  Back
                </button>

                <button
                  disabled={step === steps.length - 1}
                  onClick={() => setStep((prev) => prev + 1)}
                  className="px-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-600 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>

            {/* QUICK ACTION BOX */}
            {step === steps.length - 1 && (
              <div className="bg-[#07142a] border border-green-500 rounded-lg p-4 text-green-300">
                ✔ Change passwords immediately  
                ✔ Enable 2FA on all important accounts  
                ✔ Call 1930 for financial fraud  
                ✔ Report on cybercrime.gov.in  
                ✔ Monitor accounts for 30 days  
              </div>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}