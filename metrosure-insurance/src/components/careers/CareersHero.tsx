"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface CareersHeroProps {
  onApplyClick: () => void;
}

export default function CareersHero({ onApplyClick }: CareersHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Image moves slower than scroll for parallax effect
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const scrollToPositions = () => {
    const positionsSection = document.getElementById("open-positions");
    if (positionsSection) {
      positionsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden pt-36"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src="/images/work_1.jpg"
          alt="Diverse team collaborating in retail environment"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{
            filter: "grayscale(25%) brightness(0.85) contrast(1.05)",
          }}
        />
      </motion.div>

      {/* Primary Dark Gradient Overlay - heavier at top and center for text */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.75) 0%,
              rgba(0, 0, 0, 0.65) 30%,
              rgba(0, 0, 0, 0.55) 50%,
              rgba(0, 0, 0, 0.45) 70%,
              rgba(0, 0, 0, 0.6) 100%
            )
          `,
        }}
      />

      {/* Radial Vignette - darker edges */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 60% at 50% 40%,
              transparent 0%,
              rgba(0, 0, 0, 0.3) 100%
            )
          `,
        }}
      />

      {/* Brand Colour Tint - subtle red/maroon wash for brand cohesion */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none mix-blend-overlay"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(105, 0, 37, 0.15) 0%,
              transparent 50%,
              rgba(191, 6, 3, 0.1) 100%
            )
          `,
        }}
      />

      {/* Subtle Dotted Pattern Overlay - very light over image */}
      <div className="absolute inset-0 z-[4] pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.8) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Noise Texture for depth */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="w-full flex flex-col gap-8 text-center items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 py-2 px-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit shadow-lg"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            <span className="text-sm font-bold tracking-wider uppercase text-white/90">
              We&apos;re Hiring
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-white drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="drop-shadow-lg"
            >
              Build Your
            </motion.span>{" "}
            <br />
            <motion.span
              className="text-primary inline-block drop-shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                textShadow: "0 4px 30px rgba(191, 6, 3, 0.5)",
              }}
            >
              Future With Us
            </motion.span>
          </motion.h1>

          {/* Story Paragraph */}
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-white/85 max-w-4xl leading-relaxed drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            In 2013, we started with a simple mission: to take South Africa to the future.
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
              className="h-16 px-10 rounded-xl bg-primary text-white text-lg font-bold transition-colors shadow-xl shadow-primary/40 flex items-center justify-center gap-2"
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: "0 20px 40px -10px rgba(191, 6, 3, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span>View Open Positions</span>
              <span className="material-symbols-outlined">arrow_downward</span>
            </motion.button>
            <motion.button
              onClick={onApplyClick}
              className="h-16 px-10 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-md text-white text-lg font-bold transition-all flex items-center gap-2 group justify-center hover:bg-white/20 hover:border-white/50"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span>Apply Now</span>
              <motion.span
                className="material-symbols-outlined text-xl"
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
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
            >
              <span className="material-symbols-outlined text-base">info</span>
              <span>
                Want to learn more about us?{" "}
                <span className="font-semibold group-hover:underline">
                  Read our story
                </span>
              </span>
              <motion.span
                className="material-symbols-outlined text-base"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
              >
                arrow_forward
              </motion.span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade - subtle dark fade that works with both light/dark mode */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[6] pointer-events-none"
        style={{
          background: `linear-gradient(
            to top,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(0, 0, 0, 0.2) 40%,
            transparent 100%
          )`,
        }}
      />
    </section>
  );
}
