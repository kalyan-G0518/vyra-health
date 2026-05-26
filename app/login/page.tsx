"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import {
  Mail,
  Lock,
  Sparkles,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // LOGIN
  const handleLogin = async () => {
    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      window.location.href =
        "/dashboard";
    }
  };

  // SIGNUP
  const handleSignup = async () => {
    setLoading(true);

    const { error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert(
        "Signup successful! Check your email for verification."
      );
    }
  };

  // RESET PASSWORD
  const handleForgotPassword =
    async () => {
      if (!email) {
        alert(
          "Enter your email first."
        );

        return;
      }

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          email,
          {
            redirectTo:
              "http://localhost:3000/login",
          }
        );

      if (error) {
        alert(error.message);
      } else {
        alert(
          "Password reset email sent!"
        );
      }
    };

  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden p-6">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full" />

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10"
      >
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/10">
              <Sparkles
                size={24}
                className="text-cyan-400"
              />
            </div>

            <h1 className="text-4xl font-bold">
              Vyra
            </h1>
          </div>

          <p className="text-zinc-400 text-lg">
            AI Wellness Platform
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-4 text-cyan-400"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-4 outline-none focus:border-cyan-500/40"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-4 text-violet-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-4 outline-none focus:border-violet-500/40"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              onClick={
                handleForgotPassword
              }
              className="text-sm text-cyan-400 hover:text-cyan-300 transition"
            >
              Forgot Password?
            </button>
          </div>

          {/* Buttons */}
          <div className="space-y-4 pt-3">
            {/* Login */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 rounded-2xl py-4 font-semibold text-black"
            >
              {loading
                ? "Please wait..."
                : "Login"}
            </button>

            {/* Signup */}
            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-white/5 hover:bg-white hover:text-black border border-white/10 transition-all duration-300 rounded-2xl py-4 font-semibold"
            >
              Create Account
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}