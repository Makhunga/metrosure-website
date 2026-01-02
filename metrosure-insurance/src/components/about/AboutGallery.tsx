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
    src: "/images/mission-image.jpg",
    alt: "The Metrosure team at work",
    caption: "Our Team",
    span: "wide",
  },
  {
    src: "/images/team-fp-tshabalala.jpg",
    alt: "Leadership driving vision",
    caption: "Vision",
    span: "tall",
  },
  {
    src: "/images/work_1.jpg",
    alt: "Modern office environment",
    caption: "Innovation",
    span: "normal",
  },
  {
    src: "/images/team-bg-chiliza.jpg",
    alt: "Executive leadership",
    caption: "Leadership",
    span: "normal",
  },
  {
    src: "/images/about-hero.jpg",
    alt: "Professional excellence",
    caption: "Excellence",
    span: "tall",
  },
  {
    src: "/images/family-hero-2.webp",
    alt: "Families we protect",
    caption: "Community",
    span: "normal",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 20,
    },
  },
};

export default function AboutGallery() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-slate-900 overflow-hidden"
    >
      {/* Atmospheric overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900 to-slate-950/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(191,6,3,0.06),transparent_60%)]" />

      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Watermark - left aligned, breaks container */}
      <motion.div
        className="absolute left-2 md:left-6 lg:left-12 top-6 md:top-8 text-[5rem] md:text-[8rem] lg:text-[10rem] font-black text-white/[0.03] select-none z-0 whitespace-nowrap pointer-events-none uppercase tracking-tight"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Gallery
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Moments That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              Define Us
            </span>
          </motion.h2>

          <motion.p
            className="text-white/40 max-w-xl mx-auto text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            From boardroom decisions to community impact—the faces and places behind Metrosure.
          </motion.p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 auto-rows-[160px] md:auto-rows-[200px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className={`group relative overflow-hidden rounded-lg md:rounded-xl cursor-pointer ${
                image.span === "tall"
                  ? "row-span-2"
                  : image.span === "wide"
                  ? "col-span-2"
                  : ""
              }`}
              variants={itemVariants}
            >
              {/* Image */}
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-600 ease-out"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </motion.div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500" />

              {/* Hover border */}
              <div className="absolute inset-0 rounded-lg md:rounded-xl ring-1 ring-inset ring-white/0 group-hover:ring-white/20 transition-all duration-400" />

              {/* Caption */}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <span className="block text-[10px] md:text-xs font-semibold text-white/70 uppercase tracking-[0.12em] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                    {image.caption}
                  </span>
                  <div className="h-px bg-gradient-to-r from-primary/60 to-transparent mt-1.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out delay-100" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
