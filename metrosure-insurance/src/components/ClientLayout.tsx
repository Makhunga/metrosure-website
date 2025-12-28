"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollProgressLine } from "./animations";
import PageTransition from "./PageTransition";
// import CookieConsent from "./CookieConsent"; // Disabled - re-enable when ready
import DevelopmentBanner from "./DevelopmentBanner";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      {/* Development Banner - Remove when site goes live */}
      <DevelopmentBanner />

      <ScrollProgressLine color="rgb(191, 6, 3)" />

      {/* Simple fade transition between pages */}
      <PageTransition>
        {children}
      </PageTransition>

      {/* Sticky Bottom Hiring Banner - Mobile Only */}
      <motion.div
        className="md:hidden fixed bottom-0 left-0 right-0 z-[100] p-3 bg-gradient-to-r from-green-600 to-green-500 shadow-lg shadow-green-500/30"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
      >
        <Link
          href="/careers"
          className="flex items-center justify-center gap-3"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
          </span>
          <span className="text-white font-bold text-sm">
            We&apos;re Hiring! Join our growing team
          </span>
          <span className="material-symbols-outlined text-white text-lg">
            arrow_forward
          </span>
        </Link>
      </motion.div>

      {/* POPIA Cookie Consent Banner - Disabled, re-enable when ready */}
      {/* <CookieConsent /> */}
    </>
  );
}
