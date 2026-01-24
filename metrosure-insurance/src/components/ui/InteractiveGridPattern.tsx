"use client";

import { useEffect, useState, useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveGridPatternProps {
    className?: string;
    width?: number;
    height?: number;
    squares?: [number, number][]; // [x, y] coordinates
    squaresClassName?: string;
    gridClassName?: string;
}

/**
 * A background grid pattern with randomly highlighted squares and gradient masks.
 * Inspired by glama.ai/pricing
 */
export function InteractiveGridPattern({
    className,
    width = 40,
    height = 40,
    squaresClassName,
    gridClassName,
    ...props
}: InteractiveGridPatternProps) {
    const patternId = useId();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [activeSquares, setActiveSquares] = useState<[number, number][]>([]);

    useEffect(() => {
        // Initial size update
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });

        // Handle resize
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (dimensions.width === 0 || dimensions.height === 0) return;

        // Calculate max grid columns and rows
        const cols = Math.ceil(dimensions.width / width);
        const rows = Math.ceil(dimensions.height / height);

        // Number of active squares (density)
        const numSquares = Math.floor((cols * rows) * 0.05); // 5% density

        const newSquares: [number, number][] = [];
        for (let i = 0; i < numSquares; i++) {
            const x = Math.floor(Math.random() * cols);
            const y = Math.floor(Math.random() * rows);
            newSquares.push([x, y]);
        }
        setActiveSquares(newSquares);

    }, [dimensions, width, height]);

    return (
        <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)} {...props}>
            {/* 
        This SVG acts as the grid background. 
        It defines a pattern for the lines and then fills the rect with that pattern.
      */}
            <svg
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id={patternId}
                        width={width}
                        height={height}
                        patternUnits="userSpaceOnUse"
                        x={-1}
                        y={-1}
                    >
                        <path
                            d={`M.5 ${height}V.5H${width}`}
                            fill="none"
                            strokeDasharray="0"
                            className={cn("stroke-border", gridClassName)}
                            strokeOpacity={0.2} // Move opacity here to prevent FOUC (flash of unstyled opacity)
                        />
                    </pattern>
                </defs>

                {/* The Grid Lines */}
                <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />

                {/* The Active Squares */}
                {activeSquares.map(([x, y], index) => (
                    <motion.rect
                        key={`${x}-${y}-${index}`}
                        width={width - 1}
                        height={height - 1}
                        x={x * width + 1} // +1 to offset line width
                        y={y * height + 1}
                        fill="currentColor"
                        className={cn(
                            "text-primary/5 dark:text-primary/20", // Default: Tuned 20% settings
                            squaresClassName
                        )}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 2,
                            delay: Math.random() * 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            repeatDelay: Math.random() * 5 + 5 // Random delay between blinks
                        }}
                    />
                ))}
            </svg>

            {/* 
        Gradient Overlays for Depth & Texture
      */}

            {/* 1. Grainy Noise Texture (Fine, subtle grain like Glama) */}
            <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* 2. Top-down Gradient Fade (White/Dark to transparent) */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent h-[500px] opacity-90 pointer-events-none" />

            {/* 3. Bottom fade mask (already applied via className prop, but reinforcing here for depth) */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 pointer-events-none" />

            {/* 4. Radial shine for top spotlight effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        </div>
    );
}
