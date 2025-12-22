"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/theme-provider";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { resolvedTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would authenticate with an API
    alert(isLogin ? "Login functionality coming soon!" : "Registration functionality coming soon!");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <motion.div
        className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-16 xl:px-24 bg-[rgb(var(--color-surface-card))]"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/" className="inline-block mb-12">
              <motion.div
                className="relative h-10 w-[160px]"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
              >
                <Image
                  src={resolvedTheme === "dark" ? "/images/logo-white.png" : "/images/logo.png"}
                  alt="Metrosure Group"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={isLogin ? "login" : "register"}
                className="text-3xl font-bold text-[rgb(var(--color-text-main))] mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {isLogin ? "Welcome back" : "Create your account"}
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={isLogin ? "login-sub" : "register-sub"}
                className="text-[rgb(var(--color-text-body))]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: 0.05 }}
              >
                {isLogin
                  ? "Sign in to manage your policies and claims"
                  : "Get started with Metrosure in minutes"}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Toggle */}
          <motion.div
            className="flex p-1 mb-8 rounded-lg bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-semibold transition-all ${
                isLogin
                  ? "bg-primary text-white shadow-sm"
                  : "text-[rgb(var(--color-text-body))] hover:text-[rgb(var(--color-text-main))]"
              }`}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
            <motion.button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-semibold transition-all ${
                !isLogin
                  ? "bg-primary text-white shadow-sm"
                  : "text-[rgb(var(--color-text-body))] hover:text-[rgb(var(--color-text-main))]"
              }`}
              whileTap={{ scale: 0.98 }}
            >
              Register
            </motion.button>
          </motion.div>

          {/* Social Login */}
          <motion.div
            className="space-y-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] hover:border-primary/50 hover:shadow-sm transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium text-[rgb(var(--color-text-main))]">
                Continue with Google
              </span>
            </motion.button>
            <motion.button
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] hover:border-primary/50 hover:shadow-sm transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span className="text-sm font-medium text-[rgb(var(--color-text-main))]">
                Continue with GitHub
              </span>
            </motion.button>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[rgb(var(--color-border-light))]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[rgb(var(--color-surface-card))] text-[rgb(var(--color-text-muted))]">
                or continue with email
              </span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div>
              <label className="block text-sm font-semibold text-[rgb(var(--color-text-main))] mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text-muted))]">
                  <span className="material-symbols-outlined text-xl">mail</span>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-main))] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[rgb(var(--color-text-main))] mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text-muted))]">
                  <span className="material-symbols-outlined text-xl">lock</span>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-lg border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-main))] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-text-main))] transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-[rgb(var(--color-text-main))] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text-muted))]">
                    <span className="material-symbols-outlined text-xl">lock</span>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-main))] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[rgb(var(--color-border-light))] text-primary focus:ring-primary/50"
                  />
                  <span className="text-sm text-[rgb(var(--color-text-body))]">
                    Remember me
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {!isLogin && (
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-0.5 rounded border-[rgb(var(--color-border-light))] text-primary focus:ring-primary/50"
                />
                <span className="text-sm text-[rgb(var(--color-text-body))]">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </div>
            )}

            <motion.button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-[rgb(var(--color-primary-hover))] shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? "Sign In" : "Create Account"}
            </motion.button>
          </motion.form>

          {/* Help Link */}
          <motion.p
            className="mt-8 text-center text-sm text-[rgb(var(--color-text-muted))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Need help?{" "}
            <Link href="/contact" className="text-primary hover:underline font-medium">
              Contact Support
            </Link>
          </motion.p>
        </div>
      </motion.div>

      {/* Right Panel - Visual */}
      <motion.div
        className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-primary to-[rgb(var(--color-secondary))] overflow-hidden"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative flex flex-col justify-center px-16 text-white">
          <div className="max-w-md">
            <motion.h2
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Manage Your Insurance with Ease
            </motion.h2>
            <motion.p
              className="text-xl text-white/80 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Access your policies, file claims, and get support—all from one
              convenient dashboard.
            </motion.p>

            {/* Features */}
            <div className="space-y-6">
              {[
                { icon: "description", title: "View Your Policies", description: "Access all your insurance documents and coverage details instantly" },
                { icon: "assignment", title: "File Claims Online", description: "Submit and track claims 24/7 with our easy-to-use portal" },
                { icon: "payments", title: "Manage Payments", description: "Set up autopay, view billing history, and update payment methods" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
                  >
                    <span className="material-symbols-outlined">{feature.icon}</span>
                  </motion.div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-white/70">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trust Badge */}
          <motion.div
            className="absolute bottom-12 left-16 right-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="flex items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">verified_user</span>
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">lock</span>
                <span>SOC 2 Certified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
