"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./theme-provider";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";
import { SmoothParallax } from "./animations";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about", badge: null },
    { label: "Partner With Us", href: "/partners", badge: "B2B" },
    { label: "Corporate Solutions", href: "/corporate", badge: "B2B" },
    { label: "Careers", href: "/careers", badge: "Hiring" },
    { label: "Contact", href: "/contact", badge: null },
  ],
  insurance: [
    { label: "Auto", href: "/insurance/auto" },
    { label: "Home", href: "/insurance/home" },
    { label: "Life & Funeral", href: "/insurance/life" },
    { label: "Business", href: "/insurance/business" },
  ],
  b2bServices: [
    { label: "In-Store Campaigns", href: "/partners" },
    { label: "Sales & Marketing", href: "/partners" },
    { label: "Device Leasing", href: "/partners" },
    { label: "Call Centre Services", href: "/partners" },
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
    label: "Facebook",
    href: "https://www.facebook.com/people/Metrosure-Insurance-Brokers/100083163880679/",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://za.linkedin.com/company/metrosure",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/metrosure_insurance_/",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
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
      className="relative z-20 bg-slate-100 dark:bg-slate-900 py-16 text-slate-900 dark:text-white rounded-t-[48px] md:rounded-t-[64px] -mt-8 md:-mt-12 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.08)] transition-colors duration-300 overflow-hidden"
    >
      {/* Geometric pattern background - both modes */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.12]"
        style={{
          backgroundImage: 'url(/images/geometric-pattern.webp)',
          backgroundSize: '600px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100/90 via-slate-100/70 to-slate-100/95 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900/90 pointer-events-none" />

      {/* Corner Accents - Both modes with adjusted opacity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-left quarter circle */}
        <motion.div
          className="absolute -top-16 -left-16 w-48 h-48 rounded-br-full bg-[#82B29A]/[0.12] dark:bg-[#82B29A]/[0.06]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Top-right arc */}
        <motion.div
          className="absolute -top-10 right-20 w-32 h-32 rounded-bl-full bg-[#F2CC8E]/[0.1] dark:bg-[#F2CC8E]/[0.05] hidden md:block"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        />

        {/* Bottom-right quarter circle */}
        <motion.div
          className="absolute -bottom-20 -right-20 w-56 h-56 rounded-tl-full bg-[#DF7A5E]/[0.1] dark:bg-[#DF7A5E]/[0.05]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
        />

        {/* Bottom-left small circle */}
        <motion.div
          className="absolute bottom-10 left-[15%] w-20 h-20 rounded-full bg-[#3C405B]/[0.06] dark:bg-[#F4F1DE]/[0.05] hidden lg:block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        />

        {/* Mid-right accent square */}
        <motion.div
          className="absolute top-1/3 -right-4 w-16 h-16 rounded-xl bg-[#F2CC8E]/[0.08] dark:bg-[#F2CC8E]/[0.04] rotate-12 hidden lg:block"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        />

        {/* Small floating diamond - left side */}
        <motion.div
          className="absolute top-1/2 left-10 w-8 h-8 bg-[#82B29A]/[0.1] dark:bg-[#82B29A]/[0.05] rotate-45 hidden xl:block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Brand Column - Logo and Social Links */}
          <motion.div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2" variants={itemVariants}>
            <ParallaxWrapper speed={0.15} prefersReducedMotion={prefersReducedMotion}>
              <div className="space-y-6">
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
                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                      aria-label={social.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ type: "spring", stiffness: 400, delay: 0.3 + index * 0.1 }}
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
                            <span className="inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
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

          {/* B2B Services Links */}
          <motion.div variants={itemVariants}>
            <ParallaxWrapper speed={0.25} prefersReducedMotion={prefersReducedMotion}>
              <div>
                <h4 className="font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                  B2B Services
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-wider">
                    Partners
                  </span>
                </h4>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-gray-400">
                  {footerLinks.b2bServices.map((link, index) => (
                    <motion.li
                      key={`b2b-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: 0.65 + index * 0.05 }}
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
                      transition={{ delay: 0.75 + index * 0.05 }}
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
          <p>© {new Date().getFullYear()} Metrosure Insurance Brokers (Pty) Ltd | FSP 47089</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              <motion.span whileHover={{ y: -2 }}>Privacy Policy</motion.span>
            </Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              <motion.span whileHover={{ y: -2 }}>Terms of Service</motion.span>
            </Link>
            {!process.env.NEXT_PUBLIC_VERCEL_ENV && (
              <Link href="/playground" className="hover:text-slate-900 dark:hover:text-white transition-colors" title="Playground">
                <motion.span whileHover={{ y: -2 }}>🧪</motion.span>
              </Link>
            )}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const user = "makhunga";
                const domain = "zoocora.co.za";
                window.location.href = `mailto:${user}@${domain}`;
              }}
              className="flex items-center cursor-pointer"
              title="Developed by Zoocora"
              initial={{ filter: "drop-shadow(0 0 0px rgba(130,178,154,0))" }}
              whileHover={{
                filter: "drop-shadow(0 0 8px rgba(130,178,154,0.6))",
                opacity: 1
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src="/images/zoocora-logo.svg"
                alt="Zoocora"
                width={110}
                height={25}
                className="opacity-50 hover:opacity-100 md:w-[110px] w-[90px] transition-opacity duration-300"
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
