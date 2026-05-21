"use client";

import Link from "next/link";
import { Shield, Link2, Mail, Lock, GraduationCap, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import CyberBackground from "@/components/cyberbackground";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <CyberBackground />

      <main className="min-h-screen px-8 py-12 text-white">
        <div className="max-w-7xl mx-auto">

          {/* HERO */}
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8">

            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />

            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">

              <div>
                <p className="text-blue-400 font-medium">
                  Welcome back 👋
                </p>

                <h1 className="text-5xl font-black mt-2">
                  CyberSatark
                  Dashboard
                </h1>

                <p className="text-gray-400 mt-4 max-w-xl">
                  Monitor security activity, analyze threats,
                  continue learning, and improve your cyber awareness.
                </p>
              </div>

              <div className="rounded-2xl bg-black/20 border border-white/10 p-6 min-w-[220px]">
                <p className="text-sm text-gray-400">
                  Security Score
                </p>

                <h2 className="text-6xl font-bold text-blue-400 mt-2">
                  84
                </h2>

                <p className="text-green-400 text-sm mt-2">
                  Secure
                </p>
              </div>

            </div>
          </section>

          {/* QUICK ACTIONS */}
          <section className="grid md:grid-cols-4 gap-6 mt-8">

            <Link
              href="/tools/url-checker"
              className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:scale-[1.02] transition"
            >
              <Link2 className="text-blue-400 mb-4" />
              <h3 className="font-semibold">URL Checker</h3>
              <p className="text-sm text-gray-400 mt-2">
                Analyze suspicious links.
              </p>
            </Link>

            <Link
              href="/tools/email-checker"
              className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:scale-[1.02] transition"
            >
              <Mail className="text-cyan-400 mb-4" />
              <h3 className="font-semibold">Email Checker</h3>
              <p className="text-sm text-gray-400 mt-2">
                Detect phishing emails.
              </p>
            </Link>

            <Link
              href="/tools/password-analyzer"
              className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:scale-[1.02] transition"
            >
              <Lock className="text-green-400 mb-4" />
              <h3 className="font-semibold">Password Analyzer</h3>
              <p className="text-sm text-gray-400 mt-2">
                Check password strength.
              </p>
            </Link>

            <Link
              href="/learn"
              className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:scale-[1.02] transition"
            >
              <GraduationCap className="text-purple-400 mb-4" />
              <h3 className="font-semibold">Learning Center</h3>
              <p className="text-sm text-gray-400 mt-2">
                Continue awareness training.
              </p>
            </Link>

          </section>

          {/* LOWER GRID */}
          <section className="grid lg:grid-cols-2 gap-8 mt-8">

            {/* RECENT ACTIVITY */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="text-blue-400" />
                <h2 className="text-xl font-semibold">
                  Recent Activity
                </h2>
              </div>

              <div className="space-y-4">

                <div className="border border-white/5 rounded-xl p-4">
                  URL Scan Completed
                  <p className="text-sm text-gray-400">
                    Risk Score: 12
                  </p>
                </div>

                <div className="border border-white/5 rounded-xl p-4">
                  Quiz Completed
                  <p className="text-sm text-gray-400">
                    Score: 90%
                  </p>
                </div>

                <div className="border border-white/5 rounded-xl p-4">
                  Email Analysis Performed
                  <p className="text-sm text-gray-400">
                    No threats detected
                  </p>
                </div>

              </div>
            </div>

            {/* LEARNING PROGRESS */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">

              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-cyan-400" />
                <h2 className="text-xl font-semibold">
                  Learning Progress
                </h2>
              </div>

              <div className="space-y-6">

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Phishing Awareness</span>
                    <span>70%</span>
                  </div>

                  <div className="h-2 bg-black/20 rounded-full">
                    <div className="h-full w-[70%] rounded-full bg-blue-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Email Security</span>
                    <span>45%</span>
                  </div>

                  <div className="h-2 bg-black/20 rounded-full">
                    <div className="h-full w-[45%] rounded-full bg-cyan-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Quiz Average</span>
                    <span>88%</span>
                  </div>

                  <div className="h-2 bg-black/20 rounded-full">
                    <div className="h-full w-[88%] rounded-full bg-green-500" />
                  </div>
                </div>

              </div>

            </div>

          </section>

        </div>
      </main>
    </>
  );
}