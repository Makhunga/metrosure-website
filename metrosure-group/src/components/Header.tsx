"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
    { href: "#approach", label: "Our Approach" },
    { href: "#solutions", label: "Solutions" },
    { href: "#stories", label: "Stories" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[rgb(var(--color-surface-card))]/95 backdrop-blur-md shadow-sm"
          : "bg-[rgb(var(--color-surface-card))]/80 backdrop-blur-md"
      } border-b border-[rgb(var(--color-border-light))]`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer group">
            <div className="relative h-10 w-[160px] transition-transform group-hover:scale-105">
              {/* Light mode logo */}
              <Image
                src="/images/logo.png"
                alt="Metrosure Group"
                fill
                className="object-contain dark:hidden"
                priority
              />
              {/* Dark mode logo */}
              <Image
                src="/images/logo-white.png"
                alt="Metrosure Group"
                fill
                className="object-contain hidden dark:block"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-[rgb(var(--color-text-body))] hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-[rgb(var(--color-text-body))] hover:text-primary transition-colors rounded-full hover:bg-[rgb(var(--color-surface))]"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined text-xl">
                {resolvedTheme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </button>

            {/* Login Link */}
            <Link
              href="/login"
              className="hidden sm:block text-sm font-semibold text-[rgb(var(--color-text-body))] hover:text-primary transition-colors"
            >
              Log in
            </Link>

            {/* CTA Button */}
            <Link
              href="/quote"
              className="flex items-center justify-center rounded-lg bg-primary hover:bg-[rgb(var(--color-primary-hover))] transition-all h-10 px-6 text-white text-sm font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Get a Quote
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-[rgb(var(--color-text-body))]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-[rgb(var(--color-surface-card))] border-b border-[rgb(var(--color-border-light))] shadow-lg transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-semibold text-[rgb(var(--color-text-body))] hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-[rgb(var(--color-border-light))]" />
          <Link
            href="/login"
            className="text-base font-semibold text-[rgb(var(--color-text-body))] hover:text-primary transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Log in
          </Link>
        </div>
      </div>
    </header>
  );
}
