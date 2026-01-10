"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  span: "normal" | "tall" | "wide";
}

const galleryImages: GalleryImage[] = [
  {
    src: "/images/team-formal-uniforms.jpg",
    alt: "The Metrosure team together",
    caption: "Teamwork",
    span: "wide",
  },
  {
    src: "/images/team-professional-event.jpg",
    alt: "Professional team event",
    caption: "Excellence",
    span: "tall",
  },
  {
    src: "/images/team-heritage-day.jpg",
    alt: "Heritage Day celebration",
    caption: "Culture",
    span: "normal",
  },
  {
    src: "/images/team-training-session.jpg",
    alt: "Team training and learning",
    caption: "Learning",
    span: "normal",
  },
  {
    src: "/images/team-executive-portrait.jpg",
    alt: "Leadership at Metrosure",
    caption: "Leadership",
    span: "tall",
  },
  {
    src: "/images/family-hero-2.webp",
    alt: "Protecting families",
    caption: "Purpose",
    span: "normal",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      mass: 0.8,
    },
  },
};

export default function CultureGallery() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-slate-900 overflow-hidden"
    >
      {/* Atmospheric gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(191,6,3,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(191,6,3,0.05),transparent_40%)]" />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Watermark - left aligned, breaks container */}
      <motion.div
        className="absolute left-2 md:left-6 lg:left-12 top-6 md:top-8 text-[6rem] md:text-[10rem] lg:text-[12rem] font-black text-white/[0.03] select-none z-0 whitespace-nowrap pointer-events-none uppercase tracking-tight"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Culture
      </motion.div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-20 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Life at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
                Metrosure
              </span>
            </motion.h2>

            <motion.p
              className="text-lg text-white/50 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Where ambition meets opportunity. A glimpse into the energy,
              purpose, and people that define who we are.
            </motion.p>
          </div>
        </motion.div>

        {/* Masonry Gallery Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[240px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className={`group relative overflow-hidden rounded-xl md:rounded-2xl cursor-pointer ${
                image.span === "tall"
                  ? "row-span-2"
                  : image.span === "wide"
                  ? "col-span-2"
                  : ""
              }`}
              variants={itemVariants}
            >
              {/* Image Container */}
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </motion.div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-white/0 group-hover:border-white/20 transition-colors duration-500" />

              {/* Caption */}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <motion.div
                    className="overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                  >
                    <motion.span
                      className="block text-xs md:text-sm font-medium text-white/80 uppercase tracking-[0.15em] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                    >
                      {image.caption}
                    </motion.span>
                  </motion.div>

                  {/* Animated underline */}
                  <motion.div
                    className="h-px bg-gradient-to-r from-primary via-primary/50 to-transparent mt-2 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
                  />
                </div>
              )}

              {/* Corner accent on hover */}
              <div className="absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg viewBox="0 0 32 32" className="w-full h-full text-white/30">
                  <path
                    d="M0 0 L32 0 L32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Decorative Element */}
        <motion.div
          className="flex items-center justify-center mt-16 md:mt-20 gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-white/30 text-xs uppercase tracking-[0.3em] font-medium">
            Join Our Story
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>
      </div>
    </section>
  );
}
