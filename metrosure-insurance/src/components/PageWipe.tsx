"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function PageWipe() {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-primary pointer-events-none"
          initial={{ scaleY: 0, originY: 0 }}
          animate={{
            scaleY: [0, 1, 1, 0],
            originY: [0, 0, 1, 1],
          }}
          transition={{
            duration: 0.8,
            times: [0, 0.4, 0.6, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      )}
    </AnimatePresence>
  );
}
