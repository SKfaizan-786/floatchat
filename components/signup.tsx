"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) setError(error.message);
    else {
      setSuccess("Check your email for a confirmation link!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden gradient-ocean-deep px-4">
      {/* Background mesh gradient matching landing page */}
      <div className="absolute inset-0 gradient-mesh opacity-30"></div>
      
      {/* Signup form card */}
      <div className="w-full max-w-md glass-card rounded-2xl p-8 shadow-2xl border border-blue-700/30 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Join FloatChat</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-blue-200 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-blue-900/40 border border-blue-700/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="relative">
            <label className="block text-blue-200 mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3 rounded-lg bg-blue-900/40 border border-blue-700/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-blue-300 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          {success && <div className="text-green-400 text-sm">{success}</div>}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Create an Account"}
          </Button>
        </form>
        <div className="mt-6 text-center text-blue-200">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
