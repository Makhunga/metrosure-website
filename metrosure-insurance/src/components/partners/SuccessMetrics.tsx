"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  isInView: boolean;
  delay?: number;
  isYear?: boolean;
}

function AnimatedCounter({ value, isInView, delay = 0, isYear = false }: AnimatedCounterProps) {
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
    `${prefix}${isYear ? Math.round(latest) : Math.round(latest).toLocaleString()}${suffix}`
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

interface MetricItemProps {
  stat: { value: string; label: string; icon: string; description: string; isYear?: boolean };
  index: number;
}

function MetricItem({ stat, index }: MetricItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative p-8 flex flex-col items-center justify-center text-center group"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.34, 1.56, 0.64, 1]
      }}
    >
      {/* Icon */}
      <motion.div
        className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <span className="material-symbols-outlined text-white text-2xl">
          {stat.icon}
        </span>
      </motion.div>

      {/* Value */}
      <motion.span
        className="text-4xl md:text-5xl font-bold text-white mb-2 block"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <AnimatedCounter
          value={stat.value}
          isInView={isInView}
          delay={index * 150}
          isYear={stat.isYear}
        />
      </motion.span>

      {/* Label */}
      <motion.span
        className="text-base font-semibold text-white/90 mb-1"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
      >
        {stat.label}
      </motion.span>

      {/* Description */}
      <motion.span
        className="text-sm text-white/60"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.4, duration: 0.4 }}
      >
        {stat.description}
      </motion.span>
    </motion.div>
  );
}

export default function SuccessMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const metrics = [
    {
      value: "5000+",
      label: "Jobs Created",
      icon: "group",
      description: "Employment opportunities"
    },
    {
      value: "100+",
      label: "Retail Partners",
      icon: "storefront",
      description: "Nationwide coverage"
    },
    {
      value: "9+",
      label: "Regional Offices",
      icon: "location_on",
      description: "Across South Africa"
    },
    {
      value: "2016",
      label: "Established",
      icon: "calendar_month",
      description: "Years of excellence",
      isYear: true
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-primary py-16 md:py-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
      </div>

      {/* Animated Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Our Impact
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Creating Opportunities Across South Africa
          </motion.h2>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-white/10">
          {metrics.map((stat, index) => (
            <MetricItem key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
