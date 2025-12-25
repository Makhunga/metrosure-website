"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./theme-provider";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";
import { SmoothParallax } from "./animations";
import { QuarterCircle, Diamond, Circle, DotsPattern } from "./ui/GeometricShapes";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about", badge: null },
    { label: "Partner With Us", href: "/partners", badge: null },
    { label: "Careers", href: "/careers", badge: "Hiring" },
    { label: "Contact", href: "/contact", badge: null },
  ],
  insurance: [
    { label: "Car & Home", href: "/insurance/auto" },
    { label: "Life & Funeral", href: "/insurance/life" },
    { label: "Business Cover", href: "/insurance/business" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "File a Claim", href: "/claims" },
    { label: "Policy Management", href: "/policies" },
    { label: "Legal", href: "/legal" },
  ],
};

const socialLinks = [
  {
    label: "X (Twitter)",
    href: "https://twitter.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
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
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

// Parallax wrapper that respects reduced motion preferences
function ParallaxWrapper({
  children,
  speed,
  prefersReducedMotion
}: {
  children: ReactNode;
  speed: number;
  prefersReducedMotion: boolean | null;
}) {
  if (prefersReducedMotion) {
    return <>{children}</>;
  }
  return <SmoothParallax speed={speed}>{children}</SmoothParallax>;
}

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer
      ref={footerRef}
      className="relative bg-slate-100 dark:bg-slate-900 py-16 text-slate-900 dark:text-white border-t border-slate-200 dark:border-white/10 transition-colors duration-300 overflow-hidden"
    >
      {/* Light mode: Geometric shapes for visual depth */}
      <div className="dark:hidden">
        <div className="absolute -top-10 -left-10 opacity-30">
          <QuarterCircle size={140} color="primary" />
        </div>
        <div className="absolute -bottom-8 -right-8 rotate-180 opacity-25">
          <QuarterCircle size={120} color="secondary" delay={0.15} />
        </div>
        <div className="absolute top-1/3 right-[20%] opacity-40">
          <Diamond size={14} color="accent" delay={0.3} />
        </div>
        <div className="absolute bottom-1/4 left-[30%] opacity-35">
          <Diamond size={10} color="primary" delay={0.4} />
        </div>
        <div className="absolute top-1/2 left-[15%] opacity-25 hidden lg:block">
          <Circle size={50} color="muted" delay={0.5} />
        </div>
        <div className="absolute bottom-12 right-[40%] opacity-30 hidden lg:block">
          <DotsPattern rows={2} cols={4} color="primary" />
        </div>
      </div>

      {/* Dark mode: Background image with geometric pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100 dark:brightness-150 dark:contrast-150"
        style={{
          backgroundImage: 'url(/images/bg-footer.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dark mode gradient overlay */}
      <div className="absolute inset-0 bg-transparent dark:bg-gradient-to-b dark:from-slate-900/40 dark:via-slate-900/20 dark:to-slate-900/40 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Brand Column - Slowest parallax */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <ParallaxWrapper speed={0.15} prefersReducedMotion={prefersReducedMotion}>
              <div className="flex flex-col gap-6">
                <Link href="/" className="flex items-center group">
                  <motion.div
                    className="relative h-10 w-[160px]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Image
                      src={resolvedTheme === "dark" ? "/images/logo-white.png" : "/images/logo.png"}
                      alt="Metrosure Insurance Brokers"
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                </Link>
                <p className="text-slate-600 dark:text-gray-400 text-sm max-w-sm leading-relaxed">
                  Taking you to the future. We&apos;re a South African financial services company helping
                  families and businesses protect what matters most since 2016.
                </p>
                <div className="text-xs text-slate-500 dark:text-gray-500 space-y-1">
                  <p><strong>Phone:</strong> +27 31 301 1192</p>
                  <p><strong>Email:</strong> info@metrosuregroup.co.za</p>
                  <p><strong>Head Office:</strong> 391 Anton Lembede Street, Metropolitan Life Building, 5th Floor, Durban, 4001</p>
                </div>
                <div className="flex gap-4 mt-2">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-slate-600 dark:text-white hover:text-white"
                      aria-label={social.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 400 }}
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </ParallaxWrapper>
          </motion.div>

          {/* Company Links - Moderate parallax */}
          <motion.div variants={itemVariants}>
            <ParallaxWrapper speed={0.25} prefersReducedMotion={prefersReducedMotion}>
              <div>
                <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Company</h4>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-gray-400">
                  {footerLinks.company.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                    >
                      <Link href={link.href} className="hover:text-primary transition-colors inline-flex items-center gap-2">
                        <motion.span whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400 }}>
                          {link.label}
                        </motion.span>
                        {link.badge && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-[9px] font-bold uppercase tracking-wider">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                            </span>
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </ParallaxWrapper>
          </motion.div>

          {/* Insurance Links - Slightly slower */}
          <motion.div variants={itemVariants}>
            <ParallaxWrapper speed={0.20} prefersReducedMotion={prefersReducedMotion}>
              <div>
                <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Insurance</h4>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-gray-400">
                  {footerLinks.insurance.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                    >
                      <Link href={link.href} className="hover:text-primary transition-colors inline-block">
                        <motion.span whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400 }}>
                          {link.label}
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </ParallaxWrapper>
          </motion.div>

          {/* Support Links - Fastest parallax */}
          <motion.div variants={itemVariants}>
            <ParallaxWrapper speed={0.30} prefersReducedMotion={prefersReducedMotion}>
              <div>
                <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Support</h4>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-gray-400">
                  {footerLinks.support.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                    >
                      <Link href={link.href} className="hover:text-primary transition-colors inline-block">
                        <motion.span whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400 }}>
                          {link.label}
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </ParallaxWrapper>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-slate-200 dark:border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p>© {new Date().getFullYear()} Metrosure Insurance Brokers (Pty) Ltd (FSP 47089). All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              <motion.span whileHover={{ y: -2 }}>Privacy Policy</motion.span>
            </Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              <motion.span whileHover={{ y: -2 }}>Terms of Service</motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
