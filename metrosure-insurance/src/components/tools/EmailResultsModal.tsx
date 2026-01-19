"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, LabelledInput } from "@/components/ui";
import { CalculatorResultData } from "@/lib/whatsapp";
import { FieldState } from "@/lib/formValidation";
import { HONEYPOT_FIELD_NAME, honeypotClassName } from "@/lib/honeypot";

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
  // Honeypot field for spam prevention (hidden from users, filled by bots)
  const [honeypot, setHoneypot] = useState("");

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Delay reset to allow exit animation
      const timer = setTimeout(() => {
        setEmail("");
        setSubmitState("idle");
        setErrorMessage("");
        setHoneypot("");
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
          [HONEYPOT_FIELD_NAME]: honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send email");
      }

      setSubmitState("success");
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
              {/* Honeypot field - hidden from users, filled by bots */}
              <input
                type="text"
                name={HONEYPOT_FIELD_NAME}
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className={honeypotClassName}
              />
              {/* Email Input */}
              <LabelledInput
                name="email-results"
                label="Email Address"
                type="email"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                disabled={submitState === "loading"}
                fieldState={{
                  touched: !!errorMessage,
                  error: errorMessage || null,
                  valid: !errorMessage && email.length > 0,
                } as FieldState}
                inputClassName="placeholder:text-slate-300 dark:placeholder:text-slate-600"
              />

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={submitState === "loading" || !email.trim()}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-primary hover:bg-[rgb(var(--color-primary-hover))] disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed shadow-lg shadow-primary/20 disabled:shadow-none transition-all duration-200 flex items-center justify-center gap-2"
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
