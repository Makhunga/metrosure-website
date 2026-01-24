"use client";

import { useState } from "react";
import { InteractiveGridPattern } from "@/components/ui/InteractiveGridPattern";
import { cn } from "@/lib/utils";

/**
 * Temporary component to test different grid opacity levels.
 * Allows the user to select their preferred "range" via a UI control.
 */
export default function GridOpacityTester() {
    const [level, setLevel] = useState<"ultra" | "subtle" | "visible" | "visible25" | "visible30">("subtle");

    const settings = {
        visible30: {
            grid: "stroke-border/30",
            squares: "text-primary/15 dark:text-primary/25",
            label: "30%",
            containerOpacity: "opacity-80 dark:opacity-60"
        },
        visible25: {
            grid: "stroke-border/25",
            squares: "text-primary/15 dark:text-primary/25",
            label: "25%",
            containerOpacity: "opacity-75 dark:opacity-55"
        },
        visible: {
            grid: "stroke-border/20",
            squares: "text-primary/5 dark:text-primary/20", // Lighter squares on light mode as requested
            label: "20% (Tuned)",
            containerOpacity: "opacity-70 dark:opacity-50"
        },
        subtle: {
            grid: "stroke-border/10",
            squares: "text-primary/5 dark:text-primary/10",
            label: "10%", // Shortened for space
            containerOpacity: "opacity-50 dark:opacity-30"
        },
        ultra: {
            grid: "stroke-border/5",
            squares: "text-primary/3 dark:text-primary/5",
            label: "5%", // Shortened for space
            containerOpacity: "opacity-40 dark:opacity-20"
        }
    };

    return (
        <>
            <InteractiveGridPattern
                className={cn(
                    settings[level].containerOpacity,
                    "[mask-image:linear-gradient(to_bottom,white_40%,transparent_100%)] transition-opacity duration-500"
                )}
                width={40}
                height={40}
                gridClassName={settings[level].grid}
                squaresClassName={cn(settings[level].squares, "hover:text-primary dark:hover:text-primary transition-colors")}
            />

            {/* Floating Control Panel */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white/95 dark:bg-zinc-900/95 p-1.5 pl-4 pr-1.5 rounded-full border border-border shadow-2xl flex gap-3 items-center backdrop-blur-md animate-in slide-in-from-bottom-10 fade-in duration-500">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider hidden sm:block">
                    Grid Opacity
                </span>
                <div className="flex bg-muted/50 p-1 rounded-full">
                    {(Object.keys(settings) as Array<keyof typeof settings>).reverse().map((key) => (
                        <button
                            key={key}
                            onClick={() => setLevel(key)}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                                level === key
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "hover:bg-background/80 hover:text-foreground text-muted-foreground"
                            )}
                        >
                            {settings[key].label}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
