"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const cultureImages = [
    {
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        alt: "Team collaboration in open office",
        caption: "Collaborative Spirits",
    },
    {
        src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
        alt: "Company meeting presentation",
        caption: "Sharing Ideas",
    },
    {
        src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
        alt: "Group of friends laughing",
        caption: "Building Connections",
    },
    {
        src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
        alt: "Handshake close up",
        caption: "Trusted Partnerships",
    },
    {
        src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
        alt: "Office team working together",
        caption: "Focus on Growth",
    },
    {
        src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
        alt: "Diverse team high fiving",
        caption: "Celebrating Wins",
    },
];

export default function CultureGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Horizontal scroll implementation
    const { scrollXProgress } = useScroll({ container: scrollRef });

    // Parallax effect for images
    // We'll use a simpler approach for the drag slider to ensure performance

    return (
        <section className="py-24 bg-[rgb(var(--color-surface))] overflow-hidden relative">
            {/* Watermark Text - positioned just above heading on desktop */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
                <div className="absolute top-8 md:top-4 lg:-top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black tracking-tight text-black/[0.03] dark:text-white/[0.04]">
                        CULTURE
                    </span>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="max-w-3xl">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--color-text-main))] mb-4">
                        Life at <span className="text-primary">Metrosure</span>
                    </h2>
                    <p className="text-lg md:text-xl text-[rgb(var(--color-text-muted))]">
                        Where passion meets purpose. See what it's like to be part of our movement.
                    </p>
                </div>
            </div>

            {/* 
        The "Off-canvas" Slider 
        Using a native scrolling container with scroll snapping for best mobile experience,
        enhanced with Framer Motion for entrance animations.
      */}
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-12 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory scrollbar-hide -mx-4 sm:mx-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* Spacer for left offset on large screens to align with container */}
                <div className="w-[max(0px,calc((100vw-1400px)/2-1rem))]" />

                {cultureImages.map((image, index) => (
                    <motion.div
                        key={index}
                        className="relative flex-none w-[280px] sm:w-[320px] md:w-[400px] aspect-[3/4] rounded-2xl overflow-hidden snap-center cursor-pointer"
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true, margin: "0px -50px" }}
                        variants={{
                            hidden: { opacity: 0, x: 50 },
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: { duration: 0.6, delay: index * 0.1 }
                            },
                            hover: {
                                y: -8,
                                transition: { duration: 0.3, ease: "easeOut" }
                            }
                        }}
                    >
                        <motion.div
                            className="absolute inset-0"
                            variants={{
                                hover: {
                                    scale: 1.1,
                                    transition: { duration: 0.5, ease: "easeOut" }
                                }
                            }}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 280px, 400px"
                            />
                        </motion.div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />

                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0 z-10 pointer-events-none">
                            <span className="inline-block px-3 py-1 bg-primary/90 text-white text-xs font-bold rounded-full mb-2 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                CULTURE
                            </span>
                            <h3 className="text-2xl font-bold text-white mb-1">
                                {image.caption}
                            </h3>
                        </div>
                    </motion.div>
                ))}

                {/* Spacer for right offset */}
                <div className="w-8 shrink-0" />
            </div>

            {/* Navigation Controls - Bottom Right */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex justify-end gap-4">
                <button
                    onClick={() => {
                        if (scrollRef.current) {
                            scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                        }
                    }}
                    className="w-12 h-12 rounded-full border border-[rgb(var(--color-border-light))] flex items-center justify-center hover:bg-[rgb(var(--color-surface-hover))] hover:border-primary transition-colors duration-300 group"
                    aria-label="Scroll left"
                >
                    <span className="material-symbols-outlined text-[rgb(var(--color-text-main))] group-hover:text-primary transition-colors">
                        arrow_back
                    </span>
                </button>
                <button
                    onClick={() => {
                        if (scrollRef.current) {
                            scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                        }
                    }}
                    className="w-12 h-12 rounded-full border border-[rgb(var(--color-border-light))] flex items-center justify-center hover:bg-[rgb(var(--color-surface-hover))] hover:border-primary transition-colors duration-300 group"
                    aria-label="Scroll right"
                >
                    <span className="material-symbols-outlined text-[rgb(var(--color-text-main))] group-hover:text-primary transition-colors">
                        arrow_forward
                    </span>
                </button>
            </div>
        </section>
    );
}
