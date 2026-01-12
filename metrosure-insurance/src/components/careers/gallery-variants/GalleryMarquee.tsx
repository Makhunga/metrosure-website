"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/**
 * VARIATION 2: Magazine Editorial Marquee
 *
 * Aesthetic: High-fashion editorial / Vogue-style
 * - Continuous scrolling marquee (two rows, opposite directions)
 * - Overlapping images with dramatic shadows
 * - Bold serif typography interweaved
 * - High contrast black & white with color pops
 */

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

const galleryImages: GalleryImage[] = [
  { src: "/images/gallery-team-uniform-full.jpg", alt: "The Metrosure team", caption: "Unity" },
  { src: "/images/gallery-team-women-professional.jpg", alt: "Professional women's team", caption: "Power" },
  { src: "/images/gallery-heritage-celebration.jpg", alt: "Heritage Day celebration", caption: "Heritage" },
  { src: "/images/gallery-heritage-joy.jpg", alt: "Celebrating with joy", caption: "Joy" },
  { src: "/images/gallery-leadership-suits.jpg", alt: "Leadership team", caption: "Vision" },
  { src: "/images/gallery-training-conference.jpg", alt: "Professional training", caption: "Growth" },
  { src: "/images/gallery-heritage-portrait.jpg", alt: "Traditional attire", caption: "Culture" },
];

// Marquee row component
function MarqueeRow({
  images,
  direction = "left",
  speed = 25,
}: {
  images: GalleryImage[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-6 md:gap-8"
        animate={{
          x: direction === "left" ? [0, "-50%"] : ["-50%", 0],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ width: "fit-content" }}
      >
        {doubled.map((image, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 group"
          >
            {/* Image container with dramatic styling */}
            <div
              className={`relative overflow-hidden ${
                index % 3 === 0
                  ? "w-48 h-64 md:w-64 md:h-80"
                  : index % 3 === 1
                  ? "w-40 h-52 md:w-56 md:h-72"
                  : "w-44 h-56 md:w-60 md:h-76"
              }`}
              style={{
                transform: `rotate(${(index % 5 - 2) * 2}deg)`,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                sizes="(max-width: 768px) 200px, 280px"
              />

              {/* Red accent line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Caption overlay */}
              <div className="absolute inset-0 flex items-end justify-start p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span
                  className="text-white text-2xl md:text-3xl font-bold italic tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {image.caption}
                </span>
              </div>
            </div>

            {/* Dramatic shadow */}
            <div
              className="absolute inset-0 -z-10 bg-black/20 blur-xl translate-x-4 translate-y-4"
              style={{
                transform: `rotate(${(index % 5 - 2) * 2}deg) translate(16px, 16px)`,
              }}
            />
          </div>
        ))}

        {/* Interspersed typography */}
        {doubled.length > 0 && (
          <>
            <div className="flex-shrink-0 flex items-center px-4">
              <span
                className="text-6xl md:text-8xl font-black text-white/5 uppercase tracking-tighter whitespace-nowrap"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Life
              </span>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function GalleryMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const row1 = galleryImages.slice(0, 4);
  const row2 = galleryImages.slice(3);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-slate-950 overflow-hidden"
    >
      {/* Diagonal lines pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            white 40px,
            white 41px
          )`,
        }}
      />

      {/* Large background text */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <span
          className="text-[12rem] md:text-[20rem] lg:text-[28rem] font-black text-white/[0.02] uppercase tracking-tighter whitespace-nowrap"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Culture
        </span>
      </motion.div>

      {/* Section Header */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 mb-16 md:mb-24">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div>
            {/* Editorial label */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-primary" />
              <span className="text-primary text-xs uppercase tracking-[0.4em] font-medium">
                The Edit
              </span>
            </div>

            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.9]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Life at
              <br />
              <span className="italic font-normal text-white/60">Metrosure</span>
            </h2>
          </div>

          <motion.p
            className="text-lg text-white/40 max-w-sm leading-relaxed border-l-2 border-white/10 pl-6"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Where bold ambition meets purposeful action. A visual journey through the moments that shape who we are.
          </motion.p>
        </motion.div>
      </div>

      {/* Marquee Rows */}
      <motion.div
        className="space-y-8 md:space-y-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <MarqueeRow images={row1} direction="left" speed={30} />
        <MarqueeRow images={row2} direction="right" speed={35} />
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        className="relative max-w-7xl mx-auto px-6 lg:px-12 mt-16 md:mt-24"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="flex items-center justify-between border-t border-white/10 pt-8">
          <span className="text-white/30 text-sm uppercase tracking-[0.3em]">
            Join the story
          </span>
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm">Scroll to explore</span>
            <motion.div
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
