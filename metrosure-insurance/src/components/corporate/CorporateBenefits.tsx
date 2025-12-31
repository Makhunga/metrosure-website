"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { corporateBenefits } from "@/data/corporateServices";

export default function CorporateBenefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-24 bg-[rgb(var(--color-surface))] transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Benefits That Strengthen Your Business
          </motion.h2>
          <motion.p
            className="text-xl text-[rgb(var(--color-text-body))] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Employee benefits are more than just perks, they&apos;re strategic investments
            that attract talent, reduce turnover, and build a stronger organisation.
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {corporateBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <motion.div
                className="relative h-full p-8 rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-transparent transition-all duration-300 overflow-hidden"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/3 group-hover:to-transparent transition-all duration-300" />

                {/* Icon */}
                <motion.div
                  className="relative w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="material-symbols-outlined text-primary group-hover:text-white text-2xl transition-colors duration-300">
                    {benefit.icon}
                  </span>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-[rgb(var(--color-text-body))] leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <motion.div
          className="mt-16 bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
        >
          {/* Organic Blob Pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1008%26quot%3b)' fill='none'%3e%3cpath d='M29.17 140C29.17 131.06 2.86 142.25 0 128.52C-11.73 72.25 -33.5 30.76 0 0C36.5 -33.5 70 0 140 0C210 0 210 0 280 0C350 0 350 0 420 0C490 0 490 0 560 0C630 0 630 0 700 0C770 0 770 0 840 0C896 0 896.37 -2.89 952 0C966.37 0.75 970.32 -2.97 980 7.27C1036.47 67.03 1039.41 69.41 1084.29 140C1109.41 179.52 1098.54 227.5 1120 227.5C1143.32 227.5 1155 187.21 1173.85 140C1200.41 73.46 1178.66 52.25 1210.81 0C1221.73 -17.75 1235.4 0 1260 0C1330 0 1330 0 1400 0C1456 0 1473.99 -24.44 1512 0C1543.99 20.56 1530.85 44.26 1540 90C1544.85 114.26 1540 115 1540 140C1540 157.5 1543.17 157.89 1540 175C1530.2 227.89 1517.5 226.69 1514.07 280C1509.62 349.19 1512.96 353.06 1524.23 420C1525.92 430.06 1538.87 423.96 1540 434C1546.75 493.96 1573.16 530.16 1540 560C1503.16 593.16 1470 560 1400 560C1330 560 1330 560 1260 560C1199.74 560 1191.3 573.9 1139.49 560C1121.3 555.12 1137.07 533.68 1120 522.44C1057.32 481.18 1031.83 444.07 980 455C942.74 462.85 978.44 532.53 941.82 560C908.44 585.03 890.91 560 840 560C770 560 770 560 700 560C637.78 560 629.08 573.38 575.56 560C559.08 555.88 564.58 525 560 525C555.81 525 572.21 556.46 558.03 560C502.21 573.96 489.01 560 420 560C350 560 350 560 280 560C245 560 234.35 579.31 210 560C164.35 523.79 179.96 499.83 140 448.97C124.96 429.83 120.59 433.62 100 420C50.59 387.31 30.41 398.93 0 356.36C-19.59 328.93 0 318.18 0 280C0 225.22 -10.53 220.98 0 170.43C4.05 150.98 29.17 152.02 29.17 140' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1008'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Decorative Blurs */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tight text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Ready to Transform Your Employee Benefits?
            </motion.h2>
            <motion.p
              className="text-xl text-white/90 max-w-2xl font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Join over 100 South African businesses who trust Metrosure for their
              corporate employee benefits. Let&apos;s design a package that works for you.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <motion.a
                href="#corporate-inquiry"
                className="bg-white text-primary text-lg font-bold py-4 px-10 rounded-lg shadow-xl flex items-center justify-center"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Request a Consultation
              </motion.a>
            </motion.div>

            <motion.p
              className="text-sm text-white/70 mt-2 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <motion.span
                className="material-symbols-outlined text-sm"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                lock
              </motion.span>
              Secure & Confidential. No spam.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
