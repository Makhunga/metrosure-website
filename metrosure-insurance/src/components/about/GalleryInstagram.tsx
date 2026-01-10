"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface GalleryImage {
  src: string;
  alt: string;
  colSpan: 1 | 2;
  rowSpan: 1 | 2;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery-team-uniform-full.jpg",
    alt: "The Metrosure team in company uniform",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    src: "/images/gallery-leadership-suits.jpg",
    alt: "Leadership team at corporate event",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    src: "/images/gallery-heritage-celebration.jpg",
    alt: "Heritage Day celebration",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    src: "/images/gallery-team-women-professional.jpg",
    alt: "Professional women's team",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    src: "/images/gallery-heritage-joy.jpg",
    alt: "Celebrating Heritage Day with joy",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    src: "/images/gallery-training-conference.jpg",
    alt: "Professional development training",
    colSpan: 1,
    rowSpan: 1,
  },
];

export default function GalleryInstagram() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-slate-900 overflow-x-clip"
    >
      {/* Atmospheric overlays - from original gallery */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900 to-slate-950/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(191,6,3,0.06),transparent_60%)]" />

      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Watermark */}
      <motion.div
        className="absolute left-2 md:left-6 lg:left-12 top-6 md:top-8 text-[5rem] md:text-[8rem] lg:text-[10rem] font-black text-white/[0.03] select-none z-0 whitespace-nowrap pointer-events-none uppercase tracking-tight"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Gallery
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header - from original gallery */}
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
            From boardroom decisions to community impact - the faces and places behind Metrosure.
          </motion.p>
        </motion.div>

        {/* Bento Grid - no gaps, variable sizing */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 relative z-10 auto-rows-[200px] md:auto-rows-[220px]"
          style={{ gridAutoFlow: "dense" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                image.colSpan === 2 ? "col-span-2" : ""
              } ${image.rowSpan === 2 ? "row-span-2" : ""}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.5 + index * 0.08,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes={image.colSpan === 2 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
