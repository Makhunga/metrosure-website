"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@vercel/analytics";
import { Modal } from "@/components/ui/Modal";
import { CalculatorResultData } from "@/lib/whatsapp";

interface EmailResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorData: CalculatorResultData;
}

type SubmitState = "idle" | "loading" | "success" | "error";

export function EmailResultsModal({
  isOpen,
  onClose,
  calculatorData,
}: EmailResultsModalProps) {
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Delay reset to allow exit animation
      const timer = setTimeout(() => {
        setEmail("");
        setSubmitState("idle");
        setErrorMessage("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-close on success
  useEffect(() => {
    if (submitState === "success") {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [submitState, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setSubmitState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/calculator/email-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          ...calculatorData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send email");
      }

      setSubmitState("success");

      // Track successful email share
      track("calculator_results_shared", {
        method: "email",
        calculatorType: calculatorData.calculatorType,
      });
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const isLife = calculatorData.calculatorType === "life";

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="relative">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-primary text-2xl">
              {submitState === "success" ? "mark_email_read" : "mail"}
            </span>
          </motion.div>

          <motion.h3
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-xl font-bold text-slate-900 dark:text-white"
          >
            {submitState === "success"
              ? "Email Sent!"
              : "Email Your Results"}
          </motion.h3>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-slate-600 dark:text-slate-400 mt-1"
          >
            {submitState === "success"
              ? "Check your inbox for your calculation summary."
              : `Receive your ${isLife ? "life cover" : "funeral plan"} calculation by email.`}
          </motion.p>
        </div>

        {/* Form or Success State */}
        <AnimatePresence mode="wait">
          {submitState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.1,
                }}
                className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-3xl"
                >
                  check
                </motion.span>
              </motion.div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                Closing automatically...
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email-results"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                    <span className="material-symbols-outlined text-xl">
                      mail
                    </span>
                  </span>
                  <input
                    type="email"
                    id="email-results"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    placeholder="you@example.com"
                    disabled={submitState === "loading"}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      errorMessage
                        ? "border-red-400 dark:border-red-500 focus:ring-red-200 dark:focus:ring-red-800"
                        : "border-slate-200 dark:border-slate-600 focus:ring-primary/20 focus:border-primary"
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                  />
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">
                        error
                      </span>
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={submitState === "loading" || !email.trim()}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-primary hover:bg-[#a50502] disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed shadow-lg shadow-primary/20 disabled:shadow-none transition-all duration-200 flex items-center justify-center gap-2"
                whileHover={{ scale: submitState === "loading" ? 1 : 1.01 }}
                whileTap={{ scale: submitState === "loading" ? 1 : 0.99 }}
              >
                {submitState === "loading" ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="material-symbols-outlined text-xl"
                    >
                      progress_activity
                    </motion.span>
                    Sending...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">
                      send
                    </span>
                    Send to My Email
                  </>
                )}
              </motion.button>

              {/* Privacy Note */}
              <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                We'll only use your email to send this calculation.{" "}
                <a
                  href="/privacy"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}

export default EmailResultsModal;
