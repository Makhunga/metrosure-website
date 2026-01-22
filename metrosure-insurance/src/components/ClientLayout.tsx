"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollProgressLine } from "./animations";
import PageTransition from "./PageTransition";
import CookieConsent from "./CookieConsent";
import DevelopmentBanner from "./DevelopmentBanner";
import WhatsAppButton from "./WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isPortalPage = pathname?.startsWith("/portal");
  const [isHiringBannerDismissed, setIsHiringBannerDismissed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Check sessionStorage on mount
  useEffect(() => {
    setIsHydrated(true);
    const dismissed = sessionStorage.getItem("hiringBannerDismissed");
    if (dismissed === "true") {
      setIsHiringBannerDismissed(true);
    }
  }, []);

  const handleDismissHiring = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHiringBannerDismissed(true);
    sessionStorage.setItem("hiringBannerDismissed", "true");
    // Dispatch custom event for WhatsApp button to adjust position
    window.dispatchEvent(new CustomEvent("hiringBannerDismissed"));
  };

  return (
    <>
      {/* Development Banner - Remove when site goes live (hidden on portal) */}
      {!isPortalPage && <DevelopmentBanner />}

      {!isPortalPage && <ScrollProgressLine color="rgb(191, 6, 3)" />}

      {/* Simple fade transition between pages */}
      <PageTransition>
        {children}
      </PageTransition>

      {/* Sticky Bottom Hiring Banner - Mobile Only (hidden on portal) */}
      <AnimatePresence>
        {isHydrated && !isHiringBannerDismissed && !isPortalPage && (
          <motion.div
            className="md:hidden fixed bottom-0 left-0 right-0 z-[100] p-3 bg-gradient-to-r from-green-600 to-green-500 shadow-lg shadow-green-500/30"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative">
              <Link
                href="/careers"
                className="flex items-center justify-center gap-3 pr-8"
              >
                <span className="inline-flex rounded-full h-3 w-3 bg-white" />
                <span className="text-white font-bold text-sm">
                  We&apos;re Hiring! Join our team
                </span>
                <span className="material-symbols-outlined text-white text-lg">
                  arrow_forward
                </span>
              </Link>

              {/* Dismiss button */}
              <button
                onClick={handleDismissHiring}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white/90 hover:text-white transition-colors"
                aria-label="Dismiss hiring banner"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Click-to-Chat Button (hidden on portal) */}
      {!isPortalPage && <WhatsAppButton />}

      {/* POPIA Cookie Consent Banner */}
      <CookieConsent />

      {/* Sonner Toaster for notifications */}
      <Toaster />
    </>
  );
}
