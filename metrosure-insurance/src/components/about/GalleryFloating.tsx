"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

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
  rotation?: number;
}

const floatingImages: FloatingImage[] = [
  {
    src: "/images/gallery-team-uniform-full.jpg",
    alt: "The Metrosure team",
    position: { top: "5%", left: "5%" },
    size: "w-32 h-40 md:w-44 md:h-56",
    delay: 0,
    rotation: -3,
  },
  {
    src: "/images/gallery-leadership-suits.jpg",
    alt: "Leadership team",
    position: { top: "8%", right: "8%" },
    size: "w-36 h-28 md:w-52 md:h-40",
    delay: 0.15,
    rotation: 2,
  },
  {
    src: "/images/gallery-heritage-celebration.jpg",
    alt: "Heritage celebration",
    position: { top: "35%", left: "2%" },
    size: "w-28 h-36 md:w-40 md:h-52",
    delay: 0.3,
    rotation: -5,
  },
  {
    src: "/images/gallery-team-women-professional.jpg",
    alt: "Professional women's team",
    position: { top: "30%", right: "3%" },
    size: "w-32 h-44 md:w-48 md:h-64",
    delay: 0.2,
    rotation: 4,
  },
  {
    src: "/images/gallery-heritage-joy.jpg",
    alt: "Celebrating with joy",
    position: { bottom: "15%", left: "8%" },
    size: "w-36 h-28 md:w-56 md:h-44",
    delay: 0.35,
    rotation: 3,
  },
  {
    src: "/images/gallery-training-conference.jpg",
    alt: "Training session",
    position: { bottom: "10%", right: "5%" },
    size: "w-32 h-40 md:w-44 md:h-56",
    delay: 0.25,
    rotation: -2,
  },
];

export default function GalleryFloating() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[700px] md:min-h-[800px] py-20 md:py-28 bg-slate-50 dark:bg-slate-950 overflow-hidden"
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
          className={`absolute ${image.size} rounded-xl overflow-hidden shadow-2xl`}
          style={{
            ...image.position,
            rotate: image.rotation,
            zIndex: index + 1,
          }}
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: image.delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          whileHover={{
            scale: 1.08,
            rotate: 0,
            zIndex: 20,
            transition: { duration: 0.3 },
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 150px, 250px"
          />
          {/* Soft border effect */}
          <div className="absolute inset-0 ring-1 ring-white/20 rounded-xl" />
        </motion.div>
      ))}

      {/* Central content */}
      <div className="relative z-10 flex items-center justify-center min-h-[600px] md:min-h-[700px]">
        <motion.div
          className="text-center max-w-xl mx-auto px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.span
            className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Gallery Six
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Building a<br />
            <span className="text-primary">Brighter Future</span><br />
            Together
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-400 mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Every face tells a story. Every moment builds our legacy.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <a
              href="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Join Our Team
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full" />
    </section>
  );
}
