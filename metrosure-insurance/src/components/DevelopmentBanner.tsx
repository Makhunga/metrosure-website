"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function DevelopmentBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    setIsHydrated(true);
    const dismissed = sessionStorage.getItem("devBannerDismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("devBannerDismissed", "true");
    // Dispatch custom event for header to adjust position
    window.dispatchEvent(new CustomEvent("devBannerDismissed"));
  };

  // Don't render until hydrated to prevent flicker
  if (!isHydrated) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[200] h-10">
        <div className="bg-[#FFF4E5] px-4 py-2 h-full" />
      </div>
    );
  }

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[200] h-10"
          initial={{ y: 0 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="bg-[#FFF4E5] px-4 py-2 h-full">
            <div className="max-w-7xl mx-auto flex items-center justify-center text-sm relative">
              {/* Message */}
              <p className="text-[#1A1A1A] text-center pr-8 sm:pr-0 flex items-center justify-center flex-wrap">
                <span className="material-symbols-outlined text-base mr-1.5 align-middle text-[#B25E00]">warning</span>
                <span className="font-semibold">Under Development</span>
                <span className="hidden sm:inline font-normal">
                  {"\u00A0\u00A0"}Some features may be unavailable or incomplete.
                </span>
              </p>

              {/* Dismiss button - mobile only */}
              <button
                onClick={handleDismiss}
                className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-amber-200/50 text-[#1A1A1A] transition-colors"
                aria-label="Dismiss banner"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Export hook to check if banner is dismissed
export function useDevBannerDismissed() {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkDismissed = () => {
      setIsDismissed(sessionStorage.getItem("devBannerDismissed") === "true");
    };

    checkDismissed();
    window.addEventListener("devBannerDismissed", checkDismissed);
    return () => window.removeEventListener("devBannerDismissed", checkDismissed);
  }, []);

  return isDismissed;
}
