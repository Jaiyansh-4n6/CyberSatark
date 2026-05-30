"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserProfile } from "@/lib/db";
import { 
  Shield, 
  Globe, 
  Mail, 
  Lock, 
  LogOut, 
  LayoutDashboard,
  UserCheck,
  User as UserIcon,
  BookOpen,
  Info,
  ShieldCheck
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string>("user");
  const [username, setUsername] = useState<string>("");
  const [photoURL, setPhotoURL] = useState<string>("");
  const [visible, setVisible] = useState(true);
  const prevScrollPos = useRef(0);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      let currentScrollPos = 0;
      if (event.target === window || event.target === document) {
        currentScrollPos = window.scrollY;
      } else if (event.target instanceof HTMLElement) {
        currentScrollPos = event.target.scrollTop;
      } else {
        return;
      }

      if (currentScrollPos < 50) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    return () => window.removeEventListener("scroll", handleScroll, { capture: true });
  }, []);

  useEffect(() => {
    const event = new CustomEvent("navbarVisibilityChange", { detail: { visible } });
    window.dispatchEvent(event);
  }, [visible]);

  useEffect(() => {
    const fetchProfile = async (uid: string) => {
      try {
        const profile = await getUserProfile(uid);
        if (profile) {
          setRole(profile.role || "user");
          setUsername(profile.username || "");
          setPhotoURL(profile.photoURL || "");
        } else {
          setRole("user");
          setUsername("");
          setPhotoURL("");
        }
      } catch (err) {
        console.error("Failed to get user profile in navbar", err);
        setRole("user");
        setUsername("");
        setPhotoURL("");
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        await fetchProfile(u.uid);
      } else {
        setRole("user");
        setUsername("");
        setPhotoURL("");
      }
    });

    const handleProfileUpdate = () => {
      if (auth.currentUser) {
        fetchProfile(auth.currentUser.uid);
      }
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);

    return () => {
      unsubscribe();
      window.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, []);

  const [profileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 220);
  };

  const tools = [
    { name: "URL Threat Scanner", desc: "Inspect domain records", href: "/tools/url-checker", icon: Globe, color: "text-blue-400" },
    { name: "Phishing Analyzer", desc: "Scan email contents", href: "/tools/phishing-analysis", icon: Shield, color: "text-red-400" },
    { name: "Email Risk Audit", desc: "Audit SPF/DKIM flags", href: "/tools/email-checker", icon: Mail, color: "text-cyan-400" },
    { name: "Password Entropy", desc: "Compute code strength", href: "/tools/password-analyzer", icon: Lock, color: "text-green-400" },
  ];

  return (
    <motion.div
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6"
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: visible ? 0 : -120, 
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.95
      }}
      transition={{ 
        duration: 0.3, 
        ease: "easeInOut" 
      }}
    >
      <nav
        className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-7 px-6 py-3.5 md:py-4 rounded-[28px] md:rounded-full 
                   bg-white/[0.03] border border-white/12 backdrop-blur-[40px] saturate-[1.8]
                   shadow-[0_20px_50px_rgba(0,0,0,0.65)]
                   hover:border-green-500/25
                   transition-all duration-300 select-none
                   max-w-full overflow-visible"
      >
        {/* LEFT ZONE: BRAND LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group text-decoration-none shrink-0"
        >
          <ShieldCheck size={18} className="text-green-400 group-hover:scale-110 transition-transform duration-300 shrink-0" />
          <span className="text-sm tracking-wider font-mono font-bold text-white uppercase group-hover:text-green-300 transition-colors shrink-0">
            CyberSatark
          </span>
        </Link>

        {/* SEPARATOR */}
        <div className="h-5 w-px bg-white/10 shrink-0" />

        {/* MIDDLE ZONE: TEXT HOME LINK */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="shrink-0"
        >
          <Link
            href="/"
            className="text-sm tracking-wider font-mono font-bold uppercase text-green-400 hover:text-green-300 transition relative group flex items-center gap-1.5"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-green-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </motion.div>

        {/* SEPARATOR */}
        <div className="h-5 w-px bg-white/10 shrink-0" />

        {/* SOLUTIONS DROPDOWN */}
        <div
          className="relative shrink-0"
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="text-sm tracking-wider font-mono font-bold uppercase text-gray-400 hover:text-green-400 transition flex items-center gap-1 cursor-pointer bg-transparent border-none"
          >
            Solutions
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-[10px] opacity-70 inline-block ml-1"
            >
              ▼
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0, y: -8, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.02
                    }
                  },
                  exit: { opacity: 0, y: -8, scale: 0.95 }
                }}
                className="absolute top-11 left-1/2 -translate-x-1/2 bg-[#07142a]/95 backdrop-blur-3xl 
                           border border-white/10 rounded-2xl 
                           shadow-2xl shadow-black/90 w-60 overflow-hidden p-2 space-y-1"
              >
                {tools.map((item) => {
                  const ToolIcon = item.icon;
                  return (
                    <motion.div
                      key={item.href}
                      variants={{
                        hidden: { opacity: 0, x: -8 },
                        visible: { opacity: 1, x: 0 },
                        exit: { opacity: 0, x: -8 }
                      }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-start gap-3 px-3.5 py-2.5 rounded-xl hover:bg-white/[0.04] transition group"
                      >
                        <ToolIcon size={16} className={`${item.color} mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300`} />
                        <div className="space-y-0.5">
                          <span className="block text-[11px] font-mono font-bold text-white uppercase tracking-wider group-hover:text-green-300 transition-colors">
                            {item.name}
                          </span>
                          <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest leading-none">
                            {item.desc}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* LEARN */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="shrink-0"
        >
          <Link
            href="/learn"
            className="text-sm tracking-wider font-mono font-bold uppercase text-gray-400 hover:text-green-400 transition relative group flex items-center gap-1.5"
          >
            Learn
            <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-green-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </motion.div>

        {/* ABOUT */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="shrink-0"
        >
          <Link
            href="/about"
            className="text-sm tracking-wider font-mono font-bold uppercase text-gray-400 hover:text-green-400 transition relative group flex items-center gap-1.5"
          >
            About
            <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-green-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </motion.div>

        {/* SEPARATOR */}
        <div className="h-5 w-px bg-white/10 shrink-0" />

        {/* AUTHENTICATION CONSOLE */}
        {user ? (
          <div className="relative shrink-0" ref={profileMenuRef}>
            <button
              onClick={() => setProfileOpen(prev => !prev)}
              className="w-8 h-8 rounded-full border border-green-500/30 bg-green-500/10 hover:bg-green-500/20 hover:border-green-400/60 shadow-[0_0_8px_rgba(74,222,128,0.15)] transition-all duration-300 cursor-pointer flex items-center justify-center text-xs font-mono font-bold text-green-400 select-none overflow-hidden"
              title={role === "admin" ? "admin" : username || "user"}
            >
              {photoURL ? (
                <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                (role === "admin" ? "admin" : username || "user").charAt(0).toUpperCase()
              )}
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0, y: -8, scale: 0.95 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.02
                      }
                    },
                    exit: { opacity: 0, y: -8, scale: 0.95 }
                  }}
                  className="absolute right-0 top-11 bg-[#07142a]/95 backdrop-blur-3xl 
                             border border-white/10 rounded-2xl 
                             shadow-2xl shadow-black/90 w-48 overflow-hidden p-2 space-y-1 z-50 font-mono text-[11px]"
                >
                  <motion.div variants={{ hidden: { opacity: 0, x: 8 }, visible: { opacity: 1, x: 0 } }}>
                    <Link
                      href={role === "admin" ? "/admin/dashboard" : "/dashboard"}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl hover:bg-white/[0.04] transition text-gray-300 hover:text-green-400 font-bold uppercase tracking-wide"
                    >
                      <LayoutDashboard size={14} className="text-green-400" />
                      Dashboard
                    </Link>
                  </motion.div>

                  {role !== "admin" && (
                    <motion.div variants={{ hidden: { opacity: 0, x: 8 }, visible: { opacity: 1, x: 0 } }}>
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl hover:bg-white/[0.04] transition text-gray-300 hover:text-green-400 font-bold uppercase tracking-wide"
                      >
                        <UserIcon size={14} className="text-cyan-400" />
                        Profile
                      </Link>
                    </motion.div>
                  )}

                  <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="h-px bg-white/5 my-1" />

                  <motion.div variants={{ hidden: { opacity: 0, x: 8 }, visible: { opacity: 1, x: 0 } }}>
                    <button
                      onClick={() => { signOut(auth); setProfileOpen(false); }}
                      className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl hover:bg-white/[0.04] transition text-left text-red-400 hover:text-red-300 font-bold uppercase tracking-wide cursor-pointer bg-transparent border-none"
                    >
                      <LogOut size={12} />
                      Sign Out
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* SIGN IN */
          <Link
            href="/auth"
            className="px-5 py-2 rounded-full bg-green-500 hover:bg-green-400 text-black font-mono font-bold text-sm tracking-wider uppercase transition duration-300 shadow-md shadow-green-500/10 shrink-0 flex items-center gap-1.5"
          >
            <UserCheck size={12} />
            Sign In
          </Link>
        )}
      </nav>
    </motion.div>
  );
}