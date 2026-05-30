"use client";
import Link from "next/link";
import { useState } from "react";
import MatrixBackground from "@/components/MatrixBackground";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { getUserRole, saveUserProfile } from "@/lib/db";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMsg("");

    try {
      if (mode === "signup") {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await saveUserProfile(cred.user.uid, username || email.split("@")[0], email);
        setMsg("Account created. You can login.");
        setMode("login");
        return;
      }

      // LOGIN
      const cred = await signInWithEmailAndPassword(auth, email, password);

      // check role
      const role = await getUserRole(cred.user.uid);

      if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }

    } catch (err: any) {
      setMsg(err.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative z-10">
      <MatrixBackground />

      <div className="w-full max-w-md glass-card p-8 space-y-6">

        <div>
          <h1 className="text-3xl font-black text-green-400 text-center font-mono tracking-tight uppercase">
            {mode === "login" ? "Login" : "Sign Up"}
          </h1>

          <p className="text-gray-400 text-center text-xs mt-2 font-mono leading-relaxed">
            {mode === "login"
              ? "ACCESS_SECURE_CYBERSATARK_CONSOLE"
              : "REGISTER_NEW_OPERATOR_CREDENTIALS"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {mode === "signup" && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-400/40 backdrop-blur-md transition duration-300 font-mono text-xs"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-400/40 backdrop-blur-md transition duration-300 font-mono text-xs"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-400/40 backdrop-blur-md transition duration-300 font-mono text-xs"
          />

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-green-500 text-black font-bold hover:bg-green-400 transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-400/40 cursor-pointer font-mono text-sm"
          >
            {mode === "login" ? "INITIALIZE_SESSION" : "REGISTER_USER"}
          </button>
        </form>

        {msg && (
          <p className="text-xs text-green-300 mt-4 text-center font-mono animate-pulse">{msg}</p>
        )}

        <div className="mt-6 text-xs text-gray-400 space-y-2 text-center font-mono">

          {mode === "login" && (
            <Link href="/forgot-password" className="block hover:text-green-400 transition">
              Forgot Password?
            </Link>
          )}

          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMode("login");
              setEmail("admin@cybersatark.com");
            }}
            className="block hover:text-green-400 transition"
          >
            Load Admin Credentials
          </Link>

          {mode === "login" ? (
            <button
              onClick={() => setMode("signup")}
              className="block w-full text-green-400 hover:underline cursor-pointer transition font-mono mt-4"
            >
              // CREATE_NEW_ACCOUNT
            </button>
          ) : (
            <button
              onClick={() => setMode("login")}
              className="block w-full text-green-400 hover:underline cursor-pointer transition font-mono mt-4"
            >
              // EXISTING_OPERATOR_LOGIN
            </button>
          )}

        </div>
      </div>
    </main>
  );
}