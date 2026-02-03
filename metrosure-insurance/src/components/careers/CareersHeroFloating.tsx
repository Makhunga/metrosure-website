"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CareersHeroFloatingProps {
  onApplyClick: () => void;
}

interface FloatingImage {
  src: string;
  alt: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  size: string;
  delay: number;
  hideOnMobile?: boolean;
}

const floatingImages: FloatingImage[] = [
  {
    src: "/images/gallery-team-uniform-full.jpg",
    alt: "The Metrosure team",
    position: { top: "10%", left: "5%" },
    size: "w-24 h-24 md:w-40 md:h-40 lg:w-48 lg:h-48",
    delay: 0,
  },
  {
    src: "/images/gallery-leadership-suits.jpg",
    alt: "Leadership team",
    position: { top: "8%", right: "4%" },
    size: "w-20 h-20 md:w-36 md:h-36 lg:w-44 lg:h-44",
    delay: 0.1,
  },
  {
    src: "/images/gallery-heritage-celebration.jpg",
    alt: "Heritage celebration",
    position: { top: "50%", left: "3%" },
    size: "w-28 h-28 md:w-44 md:h-44 lg:w-52 lg:h-52",
    delay: 0.2,
    hideOnMobile: true,
  },
  {
    src: "/images/gallery-team-women-professional.jpg",
    alt: "Professional team",
    position: { top: "45%", right: "5%" },
    size: "w-24 h-24 md:w-40 md:h-40 lg:w-48 lg:h-48",
    delay: 0.15,
    hideOnMobile: true,
  },
  {
    src: "/images/gallery-training-conference.jpg",
    alt: "Training session",
    position: { bottom: "15%", left: "8%" },
    size: "w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40",
    delay: 0.25,
  },
  {
    src: "/images/gallery-heritage-joy.jpg",
    alt: "Team celebration",
    position: { bottom: "12%", right: "6%" },
    size: "w-28 h-28 md:w-44 md:h-44 lg:w-52 lg:h-52",
    delay: 0.3,
  },
];

export default function CareersHeroFloating({ onApplyClick }: CareersHeroFloatingProps) {
  const scrollToPositions = () => {
    const positionsSection = document.getElementById("open-positions");
    if (positionsSection) {
      positionsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pt-36"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating images */}
      {floatingImages.map((image, index) => (
        <motion.div
          key={index}
          className={cn(
            "absolute rounded-xl overflow-hidden shadow-2xl",
            image.size,
            image.hideOnMobile && "hidden md:block"
          )}
          style={{
            ...image.position,
            zIndex: index + 1,
          }}
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: image.delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          whileHover={{
            scale: 1.05,
            y: -8,
            zIndex: 20,
            transition: { duration: 0.3 },
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 120px, (max-width: 1024px) 200px, 256px"
          />
          {/* Soft border effect */}
          <div className="absolute inset-0 ring-1 ring-white/20 rounded-xl" />
        </motion.div>
      ))}

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full" />

      {/* Central content */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="w-full flex flex-col gap-8 text-center items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center py-2 px-5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit shadow-sm"
          >
            <span className="text-sm font-bold tracking-wider uppercase text-slate-600 dark:text-slate-400">
              We&apos;re Hiring
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Build Your
            </motion.span>{" "}
            <br />
            <motion.span
              className="text-primary inline-block relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Future With Us
              {/* Hand-drawn underline accent */}
              <motion.svg
                className="absolute -bottom-2 left-0 w-[45%] h-4"
                viewBox="0 0 200 12"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.path
                  d="M2 8 C50 2, 150 14, 198 6"
                  stroke="#F2CC8E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </motion.svg>
            </motion.span>
          </motion.h1>

          {/* Story Paragraph */}
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-4xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            In 2016, we started with a simple mission: to take South Africa to the future.
            Since then, we&apos;ve created over 5,000 jobs, built a team known for consistency,
            reliability, and integrity, and helped thousands of families feel secure.
            Now, we&apos;re looking for passionate people to join us on this journey.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-5 pt-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.button
              onClick={scrollToPositions}
              className="h-16 px-10 rounded-xl bg-primary text-white text-lg font-bold transition-colors shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: "0 20px 40px -10px rgba(191, 6, 3, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span>View Open Positions</span>
              <span className="material-symbols-outlined">arrow_downward</span>
            </motion.button>
            <motion.button
              onClick={onApplyClick}
              className="h-16 px-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-lg font-bold transition-colors flex items-center gap-2 group justify-center"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span>Apply Now</span>
              <motion.span
                className="material-symbols-outlined text-lg"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                arrow_forward
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Secondary Link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <a
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500 hover:text-primary transition-colors group"
            >
              <span className="material-symbols-outlined text-base">info</span>
              <span>
                Want to learn more about us?{" "}
                <span className="font-semibold group-hover:underline">
                  Read our story
                </span>
              </span>
              <motion.span
                className="material-symbols-outlined text-lg"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
              >
                arrow_forward
              </motion.span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
