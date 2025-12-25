"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-provider";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { href: "#approach", label: "Our Approach", badge: null },
    { href: "#solutions", label: "Solutions", badge: null },
    { href: "/partners", label: "Partner With Us", badge: null },
    { href: "/careers", label: "Careers", badge: "Hiring" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[rgb(var(--color-surface-card))]/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-[rgb(var(--color-border-light))]"
          : "bg-[rgb(var(--color-surface-card))]/70 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer group">
            <motion.div
              className="relative h-10 w-[160px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Image
                src={resolvedTheme === "dark" ? "/images/logo-white.png" : "/images/logo.png"}
                alt="Metrosure Insurance Brokers"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-[rgb(var(--color-text-body))] hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full flex items-center gap-1.5"
                >
                  {link.label}
                  {link.badge && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                      </span>
                      {link.badge}
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 text-[rgb(var(--color-text-body))] hover:text-primary transition-colors rounded-full hover:bg-[rgb(var(--color-surface))]"
              aria-label="Toggle dark mode"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.span
                className="material-symbols-outlined text-xl block"
                key={resolvedTheme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {resolvedTheme === "dark" ? "light_mode" : "dark_mode"}
              </motion.span>
            </motion.button>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/login"
                className="hidden sm:block text-sm font-semibold text-[rgb(var(--color-text-body))] hover:text-primary transition-colors"
              >
                Log in
              </Link>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 400 }}
            >
              <Link href="/quote">
                <motion.span
                  className="flex items-center justify-center rounded-lg bg-primary hover:bg-[rgb(var(--color-primary-hover))] transition-colors h-10 px-6 text-white text-sm font-bold shadow-md shadow-primary/20"
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    boxShadow: "0 10px 25px -5px rgba(191, 6, 3, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Get a Quote
                </motion.span>
              </Link>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="md:hidden p-2 text-[rgb(var(--color-text-body))]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                className="material-symbols-outlined block"
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? "close" : "menu"}
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-20 left-0 w-full bg-[rgb(var(--color-surface-card))]/95 backdrop-blur-xl border-b border-[rgb(var(--color-border-light))] shadow-lg overflow-hidden"
          >
            <div className="py-4 px-4 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-base font-semibold text-[rgb(var(--color-text-body))] hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-primary/5 flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                        </span>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
              <hr className="border-[rgb(var(--color-border-light))] my-2" />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/login"
                  className="text-base font-semibold text-[rgb(var(--color-text-body))] hover:text-primary transition-colors py-3 px-4 block rounded-lg hover:bg-primary/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
