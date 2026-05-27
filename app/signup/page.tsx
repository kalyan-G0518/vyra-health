"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import {
  User,
  Mail,
  Lock,
  Sparkles,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSignup = async () => {
    // Validation
    if (
      !name ||
      !email ||
      !password
    ) {
      toast.error(
        "Please fill all fields"
      );

      return;
    }

    setLoading(true);

    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,

        options: {
          data: {
            full_name: name,
          },

          emailRedirectTo:
            "http://localhost:3000/login",
        },
      });

    setLoading(false);

    // Existing account or error
    if (error) {
      if (
        error.message
          .toLowerCase()
          .includes("already")
      ) {
        toast.error(
          "Account already exists. Please login."
        );
      } else {
        toast.error(error.message);
      }

      return;
    }

    // Existing account check
    if (
      data.user &&
      data.user.identities
        ?.length === 0
    ) {
      toast.error(
        "Account already exists. Please login."
      );

      return;
    }

    // Success
    toast.success(
      "Verification email sent!"
    );

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden p-6">
      {/* Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-500/10 blur-3xl rounded-full" />

      {/* Card */}
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
            <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/10">
              <Sparkles
                size={24}
                className="text-violet-400"
              />
            </div>

            <h1 className="text-4xl font-bold">
              Create Account
            </h1>
          </div>

          <p className="text-zinc-400 text-lg">
            Start your AI wellness
            journey with Vyra
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          {/* Name */}
          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-4 text-violet-400"
            />

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-4 outline-none focus:border-violet-500/40"
            />
          </div>

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
              className="absolute left-4 top-4 text-orange-400"
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
              className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-4 outline-none focus:border-orange-500/40"
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-violet-500 hover:bg-violet-400 transition-all duration-300 rounded-2xl py-4 font-semibold text-white"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

          {/* Redirect */}
          <div className="text-center pt-2">
            <p className="text-zinc-400 text-sm">
              Already have an account?{" "}

              <a
                href="/login"
                className="text-cyan-400 hover:text-cyan-300 transition"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}