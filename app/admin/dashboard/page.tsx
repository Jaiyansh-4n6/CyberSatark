"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Users, 
  Activity, 
  ShieldAlert, 
  Award,
  Search,
  CheckCircle,
  Shield,
  TrendingUp,
  Terminal,
  Loader2
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { getUserRole } from "@/lib/db";
import CyberBackground from "@/components/cyberbackground";
import Navbar from "@/components/Navbar";

interface UserProfileData {
  uid: string;
  username: string;
  email: string;
  role: string;
  stats?: {
    quizCount: number;
    averageScore: number;
    highestScore: number;
    securityScore: number;
  };
  activities?: {
    type: string;
    details: string;
    timestamp: string;
  }[];
  createdAt?: string;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserProfileData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "users">("dashboard");
  const [adminEmail, setAdminEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const role = await getUserRole(user.uid);
          if (role !== "admin") {
            router.push("/dashboard");
            return;
          }
          setAdminEmail(user.email || "Admin");
          
          // Fetch all users
          const usersCol = collection(db, "users");
          const usersSnap = await getDocs(usersCol);
          const usersList = usersSnap.docs.map(doc => ({ 
            uid: doc.id, 
            ...doc.data() 
          })) as UserProfileData[];
          
          setUsers(usersList);
        } catch (err) {
          console.error("Failed to fetch admin dashboard data", err);
        } finally {
          setLoading(false);
        }
      } else {
        router.push("/auth");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02040a] flex flex-col items-center justify-center text-white gap-4 relative overflow-hidden">
        <Loader2 className="animate-spin text-green-400 h-12 w-12 z-10" />
        <p className="text-green-300 font-mono tracking-widest text-sm animate-pulse z-10">
          ESTABLISHING LIQUID SECURITY PORTAL...
        </p>
      </div>
    );
  }

  // Calculated metrics
  const totalUsers = users.length;
  
  const totalQuizzes = users.reduce((acc, user) => {
    return acc + (user.stats?.quizCount || 0);
  }, 0);

  const avgSecurityScore = totalUsers > 0 
    ? Math.round(users.reduce((acc, user) => acc + (user.stats?.securityScore || 60), 0) / totalUsers)
    : 60;

  // Compile all activities
  const allActivities = users.flatMap(user => {
    const activities = user.activities || [];
    return activities.map(act => ({
      ...act,
      username: user.username || "Anonymous",
      email: user.email || "No Email"
    }));
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const recentActivities = allActivities.slice(0, 15);

  const totalThreatAlerts = allActivities.filter(act => 
    act.type.toLowerCase().includes("threat") || 
    act.details.toLowerCase().includes("phish") ||
    act.details.toLowerCase().includes("risk") ||
    act.details.toLowerCase().includes("vulnerable")
  ).length;

  // Count user security distributions
  const secureCount = users.filter(u => (u.stats?.securityScore || 60) >= 80).length;
  const vulnerableCount = users.filter(u => (u.stats?.securityScore || 60) >= 50 && (u.stats?.securityScore || 60) < 80).length;
  const criticalCount = users.filter(u => (u.stats?.securityScore || 60) < 50).length;

  const filteredUsers = users.filter(u => {
    const name = u.username || "";
    const email = u.email || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <Navbar />
      <CyberBackground />

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-90px)] text-gray-200 relative z-10 max-w-7xl mx-auto w-full px-6 py-12 gap-8">
        
        {/* SIDEBAR TABS NAV (GLASSMORPHISM) */}
        <aside className="w-full md:w-64 bg-white/[0.03] border border-white/12 backdrop-blur-[40px] rounded-3xl p-6 flex flex-col justify-between h-fit gap-8 shadow-[0_25px_60px_rgba(0,0,0,0.7)] transition duration-300 hover:border-green-500/25">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)] animate-pulse" />
              <h2 className="text-sm font-bold text-white font-mono tracking-widest uppercase">
                ADMIN_CONSOLE
              </h2>
            </div>

            <nav className="space-y-3 text-xs font-mono">
              <button 
                onClick={() => setActiveTab("dashboard")}
                className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                  activeTab === "dashboard" 
                    ? "bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.05)] font-semibold" 
                    : "hover:bg-white/[0.03] text-gray-400 hover:text-white border border-transparent"
                }`}
              >
                <Activity size={16} />
                Security Console
              </button>
              <button 
                onClick={() => setActiveTab("users")}
                className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                  activeTab === "users" 
                    ? "bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.05)] font-semibold" 
                    : "hover:bg-white/[0.03] text-gray-400 hover:text-white border border-transparent"
                }`}
              >
                <Users size={16} />
                User Directory
              </button>
            </nav>
          </div>

          <div className="bg-black/35 border border-white/5 rounded-2xl p-4">
            <p className="text-[9px] text-gray-500 font-mono tracking-wider uppercase">OPERATOR SESSION</p>
            <p className="text-xs text-green-400 font-semibold truncate mt-1 font-mono">{adminEmail}</p>
          </div>
        </aside>

        {/* MAIN PANEL CONTENT */}
        <div className="flex-1 min-w-0 space-y-8">
          
          {activeTab === "dashboard" ? (
            <>
              {/* TOP HEADER SUMMARY */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-white font-mono uppercase">
                    CyberSatark <span className="text-green-400">Admin</span>
                  </h1>
                  <p className="text-xs text-gray-400 mt-1">Real-time status monitoring, threat matrix calculations, and aggregated metrics.</p>
                </div>
              </div>

              {/* METRIC CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<Users className="text-blue-400" size={20} />} title="Enrolled Users" value={totalUsers} glowColor="rgba(59,130,246,0.15)" />
                <StatCard icon={<Award className="text-emerald-400" size={20} />} title="Security Rating" value={`${avgSecurityScore}%`} glowColor="rgba(16,185,129,0.15)" />
                <StatCard icon={<CheckCircle className="text-purple-400" size={20} />} title="Quizzes Evaluated" value={totalQuizzes} glowColor="rgba(139,92,246,0.15)" />
                <StatCard icon={<ShieldAlert className="text-red-400" size={20} />} title="Detected Threats" value={totalThreatAlerts} glowColor="rgba(239,68,68,0.15)" />
              </div>

              {/* CHARTS SECTION */}
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* USER SECURITY HEALTH DISTRIBUTION */}
                <div className="bg-white/[0.03] border border-white/12 backdrop-blur-[40px] rounded-3xl p-6 lg:col-span-1 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.7)] relative overflow-hidden group hover:border-green-500/20 transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500/20 via-emerald-400/30 to-green-500/20" />
                  
                  <div>
                    <h2 className="text-green-300 font-semibold mb-2 flex items-center gap-2 font-mono text-sm tracking-wider uppercase">
                      <Shield size={18} className="text-green-400" /> Security Health Spread
                    </h2>
                    <p className="text-[11px] text-gray-400 mb-6 font-mono">
                      Distribution of user system security levels based on average quiz performance.
                    </p>
                  </div>
                  
                  <div className="space-y-6 my-auto">
                    {/* SECURE */}
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-green-400 font-medium">Secure (Score &gt;= 80)</span>
                        <span className="font-mono text-gray-300 font-semibold">{secureCount} ({totalUsers > 0 ? Math.round((secureCount/totalUsers)*100) : 0}%)</span>
                      </div>
                      <div className="h-3 bg-black/40 rounded-full p-0.5 border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${totalUsers > 0 ? (secureCount/totalUsers)*100 : 0}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" 
                        />
                      </div>
                    </div>

                    {/* VULNERABLE */}
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-yellow-400 font-medium">Vulnerable (50 - 79)</span>
                        <span className="font-mono text-gray-300 font-semibold">{vulnerableCount} ({totalUsers > 0 ? Math.round((vulnerableCount/totalUsers)*100) : 0}%)</span>
                      </div>
                      <div className="h-3 bg-black/40 rounded-full p-0.5 border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${totalUsers > 0 ? (vulnerableCount/totalUsers)*100 : 0}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.5)]" 
                        />
                      </div>
                    </div>

                    {/* CRITICAL */}
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-red-400 font-medium">{"Critical (Score < 50)"}</span>
                        <span className="font-mono text-gray-300 font-semibold">{criticalCount} ({totalUsers > 0 ? Math.round((criticalCount/totalUsers)*100) : 0}%)</span>
                      </div>
                      <div className="h-3 bg-black/40 rounded-full p-0.5 border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${totalUsers > 0 ? (criticalCount/totalUsers)*100 : 0}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-gradient-to-r from-red-500 to-rose-400 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 border-t border-white/5 pt-4 text-[10px] font-mono text-gray-500 flex justify-between">
                    <span>SECURITY CRITERIA: DEFAULT</span>
                    <span className="text-green-500">STANDARDS MET</span>
                  </div>
                </div>

                {/* GRAPH SECTION */}
                <div className="bg-white/[0.03] border border-white/12 backdrop-blur-[40px] rounded-3xl p-6 lg:col-span-2 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.7)] relative overflow-hidden group hover:border-green-500/20 transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500/20 via-emerald-400/30 to-green-500/20" />
                  
                  <div>
                    <h2 className="text-green-300 font-semibold mb-2 flex items-center gap-2 font-mono text-sm tracking-wider uppercase">
                      <TrendingUp size={18} className="text-green-400" /> Platform Security Trend
                    </h2>
                    <p className="text-[11px] text-gray-400 mb-6 font-mono">
                      Estimated system activity and average score metrics over recent cycles.
                    </p>
                  </div>

                  {/* SVG PLOTTED GRAPH */}
                  <div className="h-44 w-full relative my-auto mt-2">
                    <svg className="w-full h-full" viewBox="0 0 500 150">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* GRID LINES */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      
                      {/* SHADING */}
                      <path 
                        d="M0 120 C50 110, 100 80, 150 95 C200 110, 250 50, 300 40 C350 30, 400 70, 500 15 L500 150 L0 150 Z" 
                        fill="url(#chartGradient)" 
                      />

                      {/* DYNAMIC SHINING ACCENT LINE */}
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.8, ease: "easeInOut" }}
                        d="M0 120 C50 110, 100 80, 150 95 C200 110, 250 50, 300 40 C350 30, 400 70, 500 15" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="3.5" 
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]"
                      />

                      {/* DATA DOTS */}
                      <circle cx="150" cy="95" r="4.5" fill="#10b981" stroke="#0b1329" strokeWidth="2" />
                      <circle cx="300" cy="40" r="4.5" fill="#10b981" stroke="#0b1329" strokeWidth="2" />
                      <circle cx="500" cy="15" r="4.5" fill="#10b981" stroke="#0b1329" strokeWidth="2" />
                    </svg>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono mt-4 pt-4 border-t border-white/5">
                    <span>CYCLE_01 (40%)</span>
                    <span>CYCLE_02 (60%)</span>
                    <span>CYCLE_03 (CURRENT)</span>
                  </div>
                </div>

              </div>

              {/* TERMINAL ACTIVITY LOGGER */}
              <div className="bg-white/[0.03] border border-white/12 backdrop-blur-[40px] rounded-3xl p-6 flex flex-col h-[400px] shadow-[0_25px_60px_rgba(0,0,0,0.7)] relative overflow-hidden group hover:border-green-500/20 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500/20 via-green-400/30 to-green-500/20" />
                
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Terminal size={18} className="text-green-400" />
                    <h2 className="text-green-300 font-semibold font-mono text-sm tracking-wider uppercase">
                      Live Threat Intelligence Console
                    </h2>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] text-gray-400 font-mono">STREAMING</span>
                  </div>
                </div>

                <div className="space-y-3 overflow-y-auto flex-1 pr-2 custom-scrollbar font-mono text-xs">
                  {recentActivities.length > 0 ? (
                    recentActivities.map((act, index) => (
                      <div key={index} className="border-b border-white/[0.02] pb-2 flex flex-col sm:flex-row sm:justify-between items-start gap-1 sm:gap-4 font-mono text-green-300/80 hover:text-green-200 transition">
                        <div className="flex items-start gap-2 flex-wrap">
                          <span className="text-green-500 font-semibold">[SEC_INT_LOG]</span>
                          <span className="text-gray-400">{act.username} ({act.email}):</span>
                          <span className="text-white">{act.details}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 self-end sm:self-center font-mono">
                          [{new Date(act.timestamp).toLocaleTimeString()}]
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm py-4 font-mono text-center">// NO_INTEL_RECORDS: Activity feed empty.</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            
            /* USER DIRECTORY TAB */
            <div className="bg-white/[0.03] border border-white/12 backdrop-blur-[40px] rounded-3xl p-8 space-y-6 shadow-[0_25px_60px_rgba(0,0,0,0.7)] relative overflow-hidden group hover:border-green-500/20 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500/30 via-emerald-400/40 to-green-500/30" />
              
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                <div>
                  <h2 className="text-2xl font-black text-white font-mono uppercase">User Directory</h2>
                  <p className="text-xs text-gray-400 mt-1">Audit security ratings, inspect score card structures, and adjust individual profiles.</p>
                </div>
                
                <div className="flex items-center gap-3 bg-black/40 border border-green-500/10 px-5 py-3 rounded-2xl max-w-md w-full focus-within:border-green-500/35 transition duration-300">
                  <Search size={18} className="text-gray-500" />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search query (username, email)..."
                    className="bg-transparent outline-none text-xs w-full text-white placeholder-gray-500 font-mono"
                  />
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/5 bg-black/25">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="bg-black/35 text-gray-400 border-b border-white/5">
                      <th className="p-5 font-semibold text-gray-300 font-mono tracking-wider">USER_ID</th>
                      <th className="p-5 font-semibold text-gray-300 font-mono tracking-wider">EMAIL_ADDR</th>
                      <th className="p-5 font-semibold text-gray-300 font-mono tracking-wider">ROLE</th>
                      <th className="p-5 font-semibold text-center text-gray-300 font-mono tracking-wider">QUIZ_COUNT</th>
                      <th className="p-5 font-semibold text-center text-gray-300 font-mono tracking-wider">AVG_SCORE</th>
                      <th className="p-5 font-semibold text-center text-gray-300 font-mono tracking-wider">SECURITY_INDEX</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => {
                        const score = user.stats?.securityScore || 60;
                        return (
                          <tr key={user.uid} className="hover:bg-white/[0.02] transition-colors duration-300">
                            <td className="p-5 font-bold text-gray-200">{user.username || "Anonymous"}</td>
                            <td className="p-5 text-gray-400 font-mono">{user.email || "No Email"}</td>
                            <td className="p-5">
                              <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                                user.role === "admin" 
                                  ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                                  : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="p-5 text-center font-bold text-gray-300">{user.stats?.quizCount || 0}</td>
                            <td className="p-5 text-center text-gray-300">{user.stats?.averageScore || 0}%</td>
                            <td className="p-5">
                              <div className="flex items-center justify-center">
                                <span className={`px-3 py-1 rounded font-bold text-[10px] border shadow-[0_0_10px_rgba(0,0,0,0.1)] ${
                                  score >= 80 ? "bg-green-500/10 text-green-400 border-green-500/25" :
                                  score >= 50 ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/25" :
                                  "bg-red-500/10 text-red-400 border-red-500/25"
                                }`}>
                                  {score} / 100
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-gray-500 font-mono">
                          // ERR_NO_RECORDS: User query returned 0 matches.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>
      </div>
    </>
  );
}

function StatCard({ icon, title, value, glowColor }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white/[0.03] border border-white/12 backdrop-blur-[40px] rounded-3xl p-6 flex items-center justify-between shadow-[0_25px_60px_rgba(0,0,0,0.7)] transition duration-300 relative overflow-hidden group hover:border-green-500/20"
      style={{ boxShadow: `0 10px 30px -15px ${glowColor || "rgba(0,0,0,0.3)"}` }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
      <div>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest font-mono">{title}</p>
        <p className="text-2xl font-black text-white mt-2 font-mono tracking-tight">{value}</p>
      </div>
      <div className="p-3 bg-black/35 rounded-2xl border border-white/5">
        {icon}
      </div>
    </motion.div>
  );
}