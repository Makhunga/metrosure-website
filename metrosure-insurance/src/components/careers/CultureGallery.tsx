"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

const cultureImages = [
    {
        src: "/images/careers/team-uniforms.webp",
        alt: "Metrosure team members in branded uniforms",
        caption: "Team Spirit",
    },
    {
        src: "/images/careers/DSC05294.webp",
        alt: "Metrosure team at a training conference",
        caption: "Learning Together",
    },
    {
        src: "/images/careers/consultant-helping-customer.webp",
        alt: "Metrosure consultant helping a customer",
        caption: "Building Connections",
    },
    {
        src: "/images/careers/DSC05524.webp",
        alt: "Metrosure facilitator presenting to team",
        caption: "Sharing Knowledge",
    },
    {
        src: "/images/careers/winners.webp",
        alt: "Metrosure employee receiving 10 year service award",
        caption: "Celebrating Milestones",
    },
    {
        src: "/images/careers/team-2024-frame.webp",
        alt: "Metrosure team member with company photo frame",
        caption: "Taking You To The Future",
    },
];

export default function CultureGallery() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const sliderWrapperRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const lastMouseX = useRef<number>(0);
    const rafId = useRef<number>(0);
    const [moveDirection, setMoveDirection] = useState<"left" | "right" | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Check scroll position to determine if arrows should be shown
    const checkScrollPosition = useCallback(() => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }, []);

    // Optimised mouse move - uses CSS transform directly (no React state for position)
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!sliderWrapperRef.current || !cursorRef.current) return;

        // Cancel any pending animation frame
        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
        }

        rafId.current = requestAnimationFrame(() => {
            const rect = sliderWrapperRef.current!.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update cursor position directly via transform (GPU accelerated, no re-render)
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${x - 32}px, ${y - 32}px)`;
            }

            // Direction detection with threshold
            const currentX = e.clientX;
            const deltaX = currentX - lastMouseX.current;

            if (Math.abs(deltaX) > 3) {
                const newDirection = deltaX > 0 ? "right" : "left";
                // Only update state if direction actually changes
                setMoveDirection(prev => {
                    const canMove = (newDirection === "left" && canScrollLeft) || (newDirection === "right" && canScrollRight);
                    const newVal = canMove ? newDirection : null;
                    return prev === newVal ? prev : newVal;
                });
                lastMouseX.current = currentX;
            }
        });
    }, [canScrollLeft, canScrollRight]);

    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        setIsHovering(true);
        lastMouseX.current = e.clientX;

        // Set initial position
        if (sliderWrapperRef.current && cursorRef.current) {
            const rect = sliderWrapperRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            cursorRef.current.style.transform = `translate(${x - 32}px, ${y - 32}px)`;
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
        setMoveDirection(null);
        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    const scroll = useCallback((direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const scrollAmount = 400;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
        setTimeout(checkScrollPosition, 300);
    }, [checkScrollPosition]);

    const handleSliderClick = useCallback(() => {
        if (moveDirection) {
            scroll(moveDirection);
        }
    }, [moveDirection, scroll]);

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
                ref={sliderWrapperRef}
                className="relative cursor-none md:cursor-none"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleSliderClick}
            >
                {/* Floating Cursor Arrow - follows mouse and points in movement direction (desktop only) */}
                <div
                    ref={cursorRef}
                    className={`hidden md:flex absolute top-0 left-0 z-50 w-16 h-16 rounded-full bg-white dark:bg-slate-800 shadow-2xl shadow-black/20 dark:shadow-black/40 items-center justify-center text-primary pointer-events-none transition-opacity duration-150 ${
                        isHovering && moveDirection ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ willChange: 'transform' }}
                >
                    <AnimatePresence mode="wait">
                        {moveDirection && (
                            <motion.span
                                key={moveDirection}
                                className="material-symbols-outlined text-3xl font-bold"
                                initial={{ opacity: 0, x: moveDirection === "left" ? 8 : -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                            >
                                {moveDirection === "left" ? "arrow_back" : "arrow_forward"}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-12 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory scrollbar-hide -mx-4 sm:mx-0"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: 'inherit' }}
                    onScroll={checkScrollPosition}
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
            </div>

            {/* Navigation Controls - Bottom Right */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex justify-end gap-4">
                <button
                    onClick={() => scroll("left")}
                    className="w-12 h-12 rounded-full border border-[rgb(var(--color-border-light))] flex items-center justify-center hover:bg-[rgb(var(--color-surface-hover))] hover:border-primary transition-colors duration-300 group"
                    aria-label="Scroll left"
                >
                    <span className="material-symbols-outlined text-[rgb(var(--color-text-main))] group-hover:text-primary transition-colors">
                        arrow_back
                    </span>
                </button>
                <button
                    onClick={() => scroll("right")}
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
