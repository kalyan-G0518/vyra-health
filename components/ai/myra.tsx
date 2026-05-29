"use client";

import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Brain,
  X,
  Send,
  Sparkles,
} from "lucide-react";

import ReactMarkdown from "react-markdown";

import { supabase } from "@/lib/supabase";

type Message = {
  role: "user" | "ai";

  text: string;
};

export default function MyraAssistant() {
  const [open, setOpen] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: "ai",

        text: "👋 Hi, I'm **Myra** — your AI wellness companion.\n\nAsk me anything about:\n- Sleep\n- Recovery\n- Fitness\n- Nutrition\n- Wellness",
      },
    ]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const currentMessage =
      message;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: currentMessage,
      },
    ]);

    setMessage("");

    setLoading(true);

    try {
      // Current logged user
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: "Please login first.",
          },
        ]);

        setLoading(false);

        return;
      }

      const response =
        await fetch(
          "/api/chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              message:
                currentMessage,

              userId:
                user.id,
            }),
          }
        );

      const data =
        await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",

          text:
            data.reply ||
            "Myra couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",

          text: "⚠️ Myra is having trouble connecting right now.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={() =>
          setOpen(!open)
        }
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 shadow-2xl shadow-cyan-500/20 flex items-center justify-center"
      >
        {open ? (
          <X className="text-white" />
        ) : (
          <Brain className="text-white" />
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
            }}
           className="fixed bottom-28 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] h-[650px] max-h-[85vh] bg-[#090909]/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col bg-[#090909]/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Sparkles className="text-cyan-400" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">
                    Myra AI
                  </h2>

                  <p className="text-sm text-zinc-400">
                    Wellness Assistant
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="text-zinc-400 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 h-0 overflow-x-hidden overflow-y-auto p-5 space-y-4">
              {messages.map(
                (
                  msg,
                  index
                ) => (
                  <div
                    key={index}
                    className={`flex w-full ${
                      msg.role ===
                      "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] break-words overflow-hidden whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-7 ${
                        msg.role ===
                        "user"
                          ? "bg-cyan-500 text-black"
                          : "bg-white/5 border border-white/10 text-zinc-200"
                      }`}
                    >
                      <ReactMarkdown
                        components={{
                          p: ({
                            children,
                          }) => (
                            <p className="mb-3 last:mb-0">
                              {
                                children
                              }
                            </p>
                          ),

                          strong: ({
                            children,
                          }) => (
                            <strong className="font-bold text-white">
                              {
                                children
                              }
                            </strong>
                          ),

                          li: ({
                            children,
                          }) => (
                            <li className="ml-5 list-disc mb-1">
                              {
                                children
                              }
                            </li>
                          ),
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                )
              )}

              {/* Loading */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-zinc-400">
                    Myra is thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-5 border-t border-white/10 bg-[#090909] shrink-0">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key ===
                        "Enter" &&
                      !loading
                    ) {
                      handleSend();
                    }
                  }}
                  placeholder="Ask Myra..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none"
                />

                <button
                  onClick={
                    handleSend
                  }
                  disabled={loading}
                  className="w-12 h-12 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition flex items-center justify-center disabled:opacity-50 shrink-0"
                >
                  <Send
                    size={18}
                    className="text-black"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}