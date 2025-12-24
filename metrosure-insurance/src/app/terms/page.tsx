"use client";

import Link from "next/link";
import { Header, Footer, ScrollToTop } from "@/components";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using the Metrosure Insurance Brokers (Pty) Ltd website ("Website") and services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Website or services.

These Terms constitute a legally binding agreement between you and Metrosure Insurance Brokers (Pty) Ltd (FSP No: 47089), a company registered in South Africa.`,
  },
  {
    id: "services",
    title: "2. Description of Services",
    content: `Metrosure Insurance Brokers provides insurance brokerage and financial advisory services, including but not limited to:

• Short-term insurance (car, home, commercial)
• Life and funeral cover
• Retirement planning
• Employee benefits
• Investment advice
• Risk advisory services

Our services are provided in accordance with our FSP licence and the Financial Advisory and Intermediary Services Act (FAIS).`,
  },
  {
    id: "not-advice",
    title: "3. Information Not Financial Advice",
    content: `**Important Disclaimer:** The information provided on this Website is for general informational purposes only. It does not constitute financial, insurance, tax, or legal advice.

The content on this Website should not be relied upon as a substitute for professional advice tailored to your specific circumstances. Before making any financial decisions, you should consult with a qualified financial adviser who can assess your individual needs.

Any quotes, illustrations, or estimates provided through this Website are indicative only and subject to underwriting and approval by the relevant insurer.`,
  },
  {
    id: "eligibility",
    title: "4. Eligibility",
    content: `To use our services, you must:

• Be at least 18 years of age
• Be a resident of South Africa (for most products)
• Have the legal capacity to enter into binding contracts
• Provide accurate and complete information

If you are using our services on behalf of a business, you represent that you have the authority to bind that business to these Terms.`,
  },
  {
    id: "user-obligations",
    title: "5. Your Obligations",
    content: `When using our Website and services, you agree to:

• Provide accurate, current, and complete information
• Maintain the confidentiality of any account credentials
• Notify us immediately of any unauthorised use of your account
• Use our services only for lawful purposes
• Not attempt to interfere with or disrupt our Website or services
• Not copy, reproduce, or distribute our content without permission

**Disclosure Duty:** You have a duty to disclose all material facts that may affect an insurer's decision to accept your application or determine your premium. Failure to disclose material information may result in your policy being voided or claims being rejected.`,
  },
  {
    id: "intellectual-property",
    title: "6. Intellectual Property",
    content: `All content on this Website, including but not limited to text, graphics, logos, images, and software, is the property of Metrosure Insurance Brokers (Pty) Ltd or its licensors and is protected by South African and international intellectual property laws.

**Trademarks:** "Metrosure", "Metrosure Group", and our logo are trademarks of Metrosure Insurance Brokers (Pty) Ltd. You may not use these trademarks without our prior written consent.

**Limited Licence:** We grant you a limited, non-exclusive, non-transferable licence to access and use this Website for personal, non-commercial purposes only.`,
  },
  {
    id: "third-party",
    title: "7. Third-Party Links and Services",
    content: `Our Website may contain links to third-party websites or services that are not owned or controlled by Metrosure. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.

When we connect you with insurance products from our partners (such as Liberty, Sanlam, Discovery, Old Mutual, and others), those products are subject to the terms and conditions of the respective insurer.`,
  },
  {
    id: "limitation-liability",
    title: "8. Limitation of Liability",
    content: `To the fullest extent permitted by South African law:

**No Warranties:** This Website is provided "as is" and "as available" without warranties of any kind, whether express or implied.

**Limitation:** Metrosure, its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our Website or services.

**Maximum Liability:** Our total liability to you for any claims arising from these Terms or your use of our services shall not exceed the fees paid by you to Metrosure in the twelve (12) months preceding the claim.

These limitations do not apply to liability that cannot be excluded by law.`,
  },
  {
    id: "indemnification",
    title: "9. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless Metrosure Insurance Brokers (Pty) Ltd, its directors, officers, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with:

• Your use of our Website or services
• Your violation of these Terms
• Your violation of any third-party rights
• Any misrepresentation or breach of warranty made by you`,
  },
  {
    id: "termination",
    title: "10. Termination",
    content: `We may terminate or suspend your access to our Website and services immediately, without prior notice or liability, for any reason, including if you breach these Terms.

Upon termination, your right to use our Website and services will cease immediately. All provisions of these Terms which by their nature should survive termination shall survive.`,
  },
  {
    id: "governing-law",
    title: "11. Governing Law and Jurisdiction",
    content: `These Terms shall be governed by and construed in accordance with the laws of the Republic of South Africa, without regard to its conflict of law provisions.

Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of South Africa, with the High Court of South Africa (KwaZulu-Natal Division, Durban) having preference.`,
  },
  {
    id: "dispute-resolution",
    title: "12. Dispute Resolution",
    content: `**Complaints:** If you have a complaint about our services, please contact us first. We will endeavour to resolve your complaint within 6 weeks.

**FAIS Ombud:** If you are not satisfied with our response, you may refer your complaint to the FAIS Ombud:
• Website: www.faisombud.co.za
• Phone: 012 762 5000
• Email: info@faisombud.co.za

**Short-Term Insurance Ombud:** For complaints related to short-term insurance products, you may contact the Ombudsman for Short-Term Insurance (OSTI):
• Website: www.osti.co.za
• Phone: 011 726 8900`,
  },
  {
    id: "changes",
    title: "13. Changes to Terms",
    content: `We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on this Website with a new effective date.

Your continued use of our Website and services after such changes constitutes your acceptance of the modified Terms.`,
  },
  {
    id: "contact",
    title: "14. Contact Information",
    content: `If you have any questions about these Terms, please contact us:

**Metrosure Insurance Brokers (Pty) Ltd**
391 Anton Lembede Street, Metropolitan Life Building
5th Floor, Durban, 4001
South Africa

**Phone:** +27 31 301 1192
**Email:** info@metrosuregroup.co.za

**FSP No:** 47089
**Regulator:** Financial Services Conduct Authority (FSCA)`,
  },
];

export default function TermsPage() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const contentInView = useInView(contentRef, { once: true, margin: "-50px" });

  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[rgb(var(--color-secondary))]/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Breadcrumb */}
            <motion.nav
              className="flex items-center gap-2 text-sm text-[rgb(var(--color-text-muted))] mb-6"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[rgb(var(--color-text-main))]">Terms of Service</span>
            </motion.nav>

            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="material-symbols-outlined text-sm">gavel</span>
              Legal Agreement
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Terms of Service
            </motion.h1>
            <motion.p
              className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Please read these terms carefully before using our website or services.
              By accessing our website, you agree to be bound by these terms and conditions.
            </motion.p>
            <motion.p
              className="text-sm text-[rgb(var(--color-text-muted))]"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <strong>Last Updated:</strong> December 2025
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 border-b border-[rgb(var(--color-border-light))]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <details className="group">
            <summary className="cursor-pointer text-sm font-bold text-[rgb(var(--color-text-main))] flex items-center gap-2">
              <span className="material-symbols-outlined text-primary group-open:rotate-90 transition-transform">
                chevron_right
              </span>
              Table of Contents
            </summary>
            <nav className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 pl-6">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm text-[rgb(var(--color-text-body))] hover:text-primary transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
          >
            {sections.map((section) => (
              <motion.article
                key={section.id}
                id={section.id}
                className="scroll-mt-32"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-bold text-[rgb(var(--color-text-main))] mb-4">
                  {section.title}
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {section.content.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-[rgb(var(--color-text-body))] leading-relaxed mb-4 whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: paragraph
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[rgb(var(--color-text-main))]">$1</strong>')
                          .replace(/• /g, '<span class="text-primary mr-2">•</span>')
                      }}
                    />
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[rgb(var(--color-surface-card))]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-2xl font-bold text-[rgb(var(--color-text-main))] mb-4">
            Have Questions?
          </h2>
          <p className="text-[rgb(var(--color-text-body))] mb-8">
            If you have any questions about these terms or our services, our team is happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-[rgb(var(--color-primary-hover))] transition-all h-12 px-8 text-white font-bold shadow-md shadow-primary/20"
            >
              Contact Us
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[rgb(var(--color-border-light))] hover:border-primary transition-all h-12 px-8 text-[rgb(var(--color-text-main))] font-bold hover:text-primary"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
