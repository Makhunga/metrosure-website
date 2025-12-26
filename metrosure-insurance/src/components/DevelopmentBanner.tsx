"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function DevelopmentBanner() {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-[200]"
    >
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-sm">
          {/* Message */}
          <p className="text-amber-900 font-medium text-center">
            <span className="font-bold">Website Under Development</span>
            <span className="hidden sm:inline">
              {" "}— Some features may be unavailable.{" "}
              <Link href="/contact" className="underline hover:text-amber-950 transition-colors">
                Your feedback helps us improve!
              </Link>
            </span>
            <span className="sm:hidden">
              {" "}—{" "}
              <Link href="/contact" className="underline hover:text-amber-950 transition-colors">
                Feedback welcome!
              </Link>
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
