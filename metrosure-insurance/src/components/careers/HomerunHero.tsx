"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomerunHero() {
    const scrollToPositions = () => {
        const positionsSection = document.getElementById("open-positions");
        if (positionsSection) {
            positionsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="bg-[rgb(var(--color-secondary))] dark:bg-[#3D0012] py-32 px-4 flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors duration-300">
            {/* Texture and Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Heavy Noise Layer */}
                <div
                    className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                    }}
                />

                {/* Left Side Gradient Lighting - deeper in dark mode */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent dark:from-black/60" />

                {/* Dark mode: Additional depth overlay */}
                <div className="absolute inset-0 bg-black/0 dark:bg-black/20 transition-colors duration-300" />
            </div>

            <div className="max-w-[1200px] mx-auto w-full flex flex-col items-center z-10">
                {/* Top Logo/Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 relative"
                >
                    <span className="relative text-white text-sm font-bold tracking-widest uppercase inline-block">
                        METROSURE
                        <motion.svg
                            className="absolute -bottom-2 left-0 w-full h-3"
                            viewBox="0 0 200 9"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <motion.path
                                d="M2.00025 7.00005C50.0003 1.00005, 150.003 13, 198.003 5.00005"
                                stroke="#F2CC8E"
                                strokeWidth="3"
                                strokeLinecap="round"
                                fill="none"
                            />
                        </motion.svg>
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-white font-black text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tighter mb-8"
                    style={{ fontFamily: 'var(--font-sans)' }} // Enforcing sans-serif (Manrope)
                >
                    Join the
                    <br />
                    team.
                </motion.h2>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-[#F5F3EF] text-xl md:text-[2rem] md:leading-[1.4] max-w-[700px] mx-auto mb-14 font-medium"
                >
                    We deliver financial solutions that empower individuals and businesses alike. You&apos;ll love working with us if you&apos;re positive, thoughtful and client-focused.
                </motion.p>

                {/* CTA Button */}
                <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    onClick={scrollToPositions}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[rgb(var(--color-primary))] text-xl font-bold py-5 px-10 rounded-xl inline-flex items-center gap-3 transition-colors hover:bg-gray-100 shadow-xl shadow-black/20"
                >
                    <span>See all jobs</span>
                    <span className="text-2xl">↓</span>
                </motion.button>
            </div>
        </section>
    );
}
