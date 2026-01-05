"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-provider";

interface NavLink {
  href?: string;
  label: string;
  badge?: string | null;
  dropdown?: { href: string; label: string }[];
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [isDevBannerDismissed, setIsDevBannerDismissed] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();

  // Check if a link is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for dev banner dismissal
  useEffect(() => {
    const checkDismissed = () => {
      setIsDevBannerDismissed(sessionStorage.getItem("devBannerDismissed") === "true");
    };

    checkDismissed();
    window.addEventListener("devBannerDismissed", checkDismissed);
    return () => window.removeEventListener("devBannerDismissed", checkDismissed);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    {
      label: "Insurance",
      dropdown: [
        { href: "/insurance/auto", label: "Auto" },
        { href: "/insurance/home", label: "Home" },
        { href: "/insurance/life", label: "Life & Funeral" },
        { href: "/insurance/business", label: "Business" },
      ],
    },
    { href: "/partners", label: "Partners", badge: "B2B" },
    {
      label: "Tools",
      dropdown: [
        { href: "/tools/coverage-calculator", label: "Coverage Calculator" },
      ],
    },
    { href: "/careers", label: "Careers", badge: "Hiring" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isDevBannerDismissed ? "top-0" : "top-10"
      } ${
        isScrolled
          ? "bg-[rgb(var(--color-surface-card))] shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-[rgb(var(--color-border-light))]"
          : "bg-[rgb(var(--color-surface-card))] border-b border-[rgb(var(--color-border-light))]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer group">
            <motion.div
              className="relative h-10 w-[120px] sm:w-[140px] md:w-[160px]"
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
          <nav className="hidden md:flex items-center gap-6" ref={dropdownRef}>
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3, duration: 0.4 }}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  // Dropdown item
                  <button
                    className={`text-sm font-semibold transition-colors flex items-center gap-1 ${
                      (link.label === "Insurance" && pathname.startsWith("/insurance")) ||
                      (link.label === "Tools" && pathname.startsWith("/tools"))
                        ? "text-primary"
                        : "text-[rgb(var(--color-text-body))] hover:text-primary"
                    }`}
                    onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                  >
                    {link.label}
                    <motion.span
                      className="material-symbols-outlined text-base"
                      animate={{ rotate: activeDropdown === link.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      expand_more
                    </motion.span>
                  </button>
                ) : (
                  // Regular link
                  <Link
                    href={link.href || "/"}
                    className={`text-sm font-semibold transition-colors relative flex items-center gap-1.5 ${
                      isActive(link.href || "/")
                        ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary"
                        : "text-[rgb(var(--color-text-body))] hover:text-primary after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
                    }`}
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
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 py-2 bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] rounded-xl shadow-lg shadow-black/10"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-[rgb(var(--color-text-body))] hover:text-primary hover:bg-primary/5 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle - hidden on very small screens, shown on sm+ */}
            <motion.button
              onClick={toggleTheme}
              className="hidden sm:flex p-2 text-[rgb(var(--color-text-body))] hover:text-primary transition-colors rounded-full hover:bg-[rgb(var(--color-surface))]"
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
                  className="flex items-center justify-center rounded-xl bg-primary hover:bg-[rgb(var(--color-primary-hover))] transition-colors h-12 px-8 text-white text-sm font-bold shadow-lg shadow-primary/25"
                  whileHover={{
                    scale: 1.03,
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
            className="md:hidden absolute top-20 left-0 w-full z-[60] bg-[rgb(var(--color-surface-card))]/95 backdrop-blur-xl border-b border-[rgb(var(--color-border-light))] shadow-lg overflow-hidden"
          >
            <div className="py-4 px-4 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.dropdown ? (
                    // Accordion dropdown for mobile
                    <div>
                      <button
                        className={`w-full text-base font-semibold transition-colors py-3 px-4 rounded-lg hover:bg-primary/5 flex items-center justify-between ${
                          (link.label === "Insurance" && pathname.startsWith("/insurance")) ||
                          (link.label === "Tools" && pathname.startsWith("/tools"))
                            ? "text-primary bg-primary/5"
                            : "text-[rgb(var(--color-text-body))] hover:text-primary"
                        }`}
                        onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.label ? null : link.label)}
                      >
                        {link.label}
                        <motion.span
                          className="material-symbols-outlined text-lg"
                          animate={{ rotate: mobileDropdownOpen === link.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          expand_more
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {mobileDropdownOpen === link.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-2">
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="block text-sm text-[rgb(var(--color-text-body))] hover:text-primary transition-colors py-2.5 px-4 rounded-lg hover:bg-primary/5"
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setMobileDropdownOpen(null);
                                  }}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    // Regular link
                    <Link
                      href={link.href || "/"}
                      className={`text-base font-semibold transition-colors py-3 px-4 rounded-lg hover:bg-primary/5 flex items-center gap-2 ${
                        isActive(link.href || "/")
                          ? "text-primary bg-primary/5"
                          : "text-[rgb(var(--color-text-body))] hover:text-primary"
                      }`}
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
                  )}
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
              {/* Theme Toggle in Mobile Menu */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between py-3 px-4"
              >
                <span className="text-base font-semibold text-[rgb(var(--color-text-body))]">
                  Theme
                </span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))]"
                >
                  <span className="material-symbols-outlined text-lg text-[rgb(var(--color-text-body))]">
                    {resolvedTheme === "dark" ? "dark_mode" : "light_mode"}
                  </span>
                  <span className="text-sm text-[rgb(var(--color-text-body))]">
                    {resolvedTheme === "dark" ? "Dark" : "Light"}
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
    </>
  );
}
