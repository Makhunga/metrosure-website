"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  isInView: boolean;
  delay?: number;
}

function AnimatedCounter({ value, isInView, delay = 0 }: AnimatedCounterProps) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const prefix = match ? match[1] : "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : value;

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: 2
  });

  const display = useTransform(spring, (latest) =>
    `${prefix}${Math.round(latest)}${suffix}`
  );

  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        spring.set(target);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isInView, target, spring, delay]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [display]);

  return <span>{displayValue}</span>;
}

interface StatItemProps {
  stat: { value: string; label: string };
  index: number;
}

function StatItem({ stat, index }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="px-6 py-6 md:py-8 flex flex-col items-center justify-center text-center group bg-[rgb(var(--color-surface-card))] hover:bg-[rgb(var(--color-surface))] transition-colors duration-300"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.34, 1.56, 0.64, 1]
      }}
    >
      <motion.span
        className="text-3xl font-bold text-primary mb-1 block"
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <AnimatedCounter
          value={stat.value}
          isInView={isInView}
          delay={index * 150}
        />
      </motion.span>
      <motion.span
        className="text-sm font-medium text-[rgb(var(--color-text-body))]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
      >
        {stat.label}
      </motion.span>
    </motion.div>
  );
}

export default function StatsBar() {
  const stats = [
    { value: "5000+", label: "Jobs Created" },
    { value: "2016", label: "Established" },
    { value: "9+", label: "Regional Offices" },
    { value: "47089", label: "FSP Number" },
  ];

  return (
    <section className="border-y border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] overflow-hidden transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[rgb(var(--color-border-light))]">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
