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

const keyInfo = [
  {
    icon: "verified",
    label: "FSP Number",
    value: "47089",
  },
  {
    icon: "calendar_month",
    label: "FSP Authorised",
    value: "7 Feb 2017",
  },
  {
    icon: "business",
    label: "Registration",
    value: "2016/113504/07",
  },
  {
    icon: "gavel",
    label: "Regulator",
    value: "FSCA",
  },
];

const disclosures = [
  {
    id: "fsp-disclosure",
    title: "Financial Services Provider Disclosure",
    icon: "verified_user",
    content: `**Metrosure Insurance Brokers (Pty) Ltd** is an Authorised Financial Service Provider.

**FSP Number:** 47089
**Company Registration:** 2016/113504/07
**Date Authorised:** 7 February 2017

We are authorised to provide advice and intermediary services in terms of the Financial Advisory and Intermediary Services Act, 2002 (FAIS Act) for the following categories:

**Category I:**
• Short-term Insurance Personal Lines
• Short-term Insurance Commercial Lines
• Long-term Insurance (Sub-categories A, B1, B2, C)

**Category II:**
• Short-term Insurance Personal and Commercial Lines

Our Financial Services Provider licence was issued by the Financial Services Conduct Authority (FSCA), formerly the Financial Services Board (FSB).`,
  },
  {
    id: "regulatory-info",
    title: "Regulatory Information",
    icon: "account_balance",
    content: `**Financial Services Conduct Authority (FSCA)**
The FSCA is the regulator for financial service providers in South Africa. They ensure that financial institutions treat customers fairly and comply with applicable laws.

**Contact the FSCA:**
• Website: www.fsca.co.za
• Phone: 0800 110 443 (toll-free)
• Email: info@fsca.co.za
• Address: Riverwalk Office Park, Block B, 41 Matroosberg Road, Ashlea Gardens, Pretoria

**Key Legislation We Comply With:**
• Financial Advisory and Intermediary Services Act (FAIS)
• Financial Sector Regulation Act (FSR Act)
• Protection of Personal Information Act (POPIA)
• Short-term Insurance Act
• Long-term Insurance Act
• Financial Intelligence Centre Act (FICA)`,
  },
  {
    id: "conflict-interest",
    title: "Conflict of Interest Management",
    icon: "balance",
    content: `In accordance with the FAIS General Code of Conduct, we maintain a Conflict of Interest Management Policy to identify, manage, and mitigate any conflicts of interest that may arise in our business.

**Our Commitments:**
• We disclose any ownership interest or financial interest in product suppliers
• We disclose any commission or fees received from product suppliers
• We always act in your best interest and provide suitable advice
• We maintain independence in our advice and recommendations

**Remuneration:**
We may receive commission from insurers when you purchase a product through us. We will disclose any commission or fee arrangements to you before you commit to a product.

A copy of our full Conflict of Interest Management Policy is available on request.`,
  },
  {
    id: "complaints",
    title: "Complaints Procedure",
    icon: "support_agent",
    content: `We are committed to providing excellent service. However, if you are not satisfied with our service, we want to hear from you.

**Step 1: Contact Us Directly**
Please first submit your complaint to us:
• Email: info@metrosuregroup.co.za
• Phone: +27 31 301 1192
• Address: 391 Anton Lembede Street, Metropolitan Life Building, 5th Floor, Durban, 4001

We aim to acknowledge your complaint within 3 business days and resolve it within 6 weeks.

**Step 2: Escalate to the Ombud**
If you are not satisfied with our response, you may escalate your complaint to the relevant Ombud:

**FAIS Ombud** (for advice/intermediary service complaints):
• Website: www.faisombud.co.za
• Phone: 012 762 5000
• Email: info@faisombud.co.za

**Ombudsman for Short-Term Insurance (OSTI):**
• Website: www.osti.co.za
• Phone: 011 726 8900

**Ombudsman for Long-Term Insurance:**
• Website: www.ombud.co.za
• Phone: 021 657 5000`,
  },
  {
    id: "professional-indemnity",
    title: "Professional Indemnity Insurance",
    icon: "shield",
    content: `In accordance with regulatory requirements, Metrosure Insurance Brokers (Pty) Ltd (Reg. 2016/113504/07) maintains Professional Indemnity (PI) and Fidelity Insurance cover.

This insurance protects our clients against any financial loss that may arise from negligent advice or dishonest acts by our employees.

Details of our PI insurance are available on request.`,
  },
  {
    id: "bbbee",
    title: "B-BBEE Status",
    icon: "diversity_3",
    content: `Metrosure Insurance Brokers (Pty) Ltd (Reg. 2016/113504/07) is a proudly South African, black-owned company committed to transformation and broad-based black economic empowerment.

**Our Transformation Commitment:**
• Founded by previously disadvantaged individuals
• Created 5,000+ employment opportunities
• Focus on skills development and skills transfer
• Supporting emerging companies without compromising standards
• Promoting meaningful economic participation

Our B-BBEE certificate is available on request.`,
  },
  {
    id: "key-individuals",
    title: "Key Individuals",
    icon: "badge",
    content: `The following Key Individuals are registered with the FSCA and are responsible for managing and overseeing the financial services activities of Metrosure Insurance Brokers:

**BG Chiliza** - Managing Director
**FP Tshabalala** - Executive Director
**S Basi** - Chief Financial Officer

Key Individuals are required to meet fit and proper requirements as prescribed by the FSCA, including appropriate qualifications, experience, and ongoing competency requirements.`,
  },
  {
    id: "record-keeping",
    title: "Record Keeping",
    icon: "folder_open",
    content: `In accordance with the FAIS Act and FICA requirements, we maintain proper records of all transactions and client information for a minimum of 5 years.

**Records We Keep:**
• Client agreements and mandates
• Advice records and recommendations
• Transaction records
• FICA documentation (proof of identity, residence, etc.)
• Communication records

You have the right to request access to records relating to your dealings with us, subject to POPIA provisions.`,
  },
];

export default function LegalPage() {
  const heroRef = useRef(null);
  const infoRef = useRef(null);
  const contentRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const infoInView = useInView(infoRef, { once: true, margin: "-50px" });
  const contentInView = useInView(contentRef, { once: true, margin: "-50px" });

  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-56 pb-16 overflow-hidden">
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
              <span className="text-[rgb(var(--color-text-main))]">Legal Information</span>
            </motion.nav>

            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="material-symbols-outlined text-sm">verified</span>
              FSP 47089
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Legal Information
            </motion.h1>
            <motion.p
              className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Important regulatory disclosures and legal information about Metrosure Insurance
              Brokers (Pty) Ltd, an Authorised Financial Service Provider regulated by the FSCA.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Key Info Bar */}
      <section ref={infoRef} className="py-8 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={infoInView ? "visible" : "hidden"}
          >
            {keyInfo.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3"
                variants={itemVariants}
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <div>
                  <p className="text-xs text-white/70 uppercase tracking-wider">{item.label}</p>
                  <p className="font-bold">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 border-b border-[rgb(var(--color-border-light))]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <details className="group" open>
            <summary className="cursor-pointer text-sm font-bold text-[rgb(var(--color-text-main))] flex items-center gap-2">
              <span className="material-symbols-outlined text-primary group-open:rotate-90 transition-transform">
                chevron_right
              </span>
              Quick Navigation
            </summary>
            <nav className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 pl-6">
              {disclosures.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm text-[rgb(var(--color-text-body))] hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm text-primary">{section.icon}</span>
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
            {disclosures.map((section) => (
              <motion.article
                key={section.id}
                id={section.id}
                className="scroll-mt-32 p-8 rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))]"
                variants={itemVariants}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl text-primary">{section.icon}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[rgb(var(--color-text-main))]">
                    {section.title}
                  </h2>
                </div>
                <div className="prose prose-slate dark:prose-invert max-w-none pl-16">
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

      {/* Related Links */}
      <section className="py-16 bg-[rgb(var(--color-surface-card))]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="text-2xl font-bold text-[rgb(var(--color-text-main))] mb-8 text-center">
            Related Information
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/privacy"
              className="p-6 rounded-xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] hover:border-primary transition-all group"
            >
              <span className="material-symbols-outlined text-3xl text-primary mb-4 block">shield</span>
              <h3 className="font-bold text-[rgb(var(--color-text-main))] mb-2 group-hover:text-primary transition-colors">
                Privacy Policy
              </h3>
              <p className="text-sm text-[rgb(var(--color-text-body))]">
                How we collect, use, and protect your personal information.
              </p>
            </Link>
            <Link
              href="/terms"
              className="p-6 rounded-xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] hover:border-primary transition-all group"
            >
              <span className="material-symbols-outlined text-3xl text-primary mb-4 block">gavel</span>
              <h3 className="font-bold text-[rgb(var(--color-text-main))] mb-2 group-hover:text-primary transition-colors">
                Terms of Service
              </h3>
              <p className="text-sm text-[rgb(var(--color-text-body))]">
                Terms and conditions for using our website and services.
              </p>
            </Link>
            <Link
              href="/contact"
              className="p-6 rounded-xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] hover:border-primary transition-all group"
            >
              <span className="material-symbols-outlined text-3xl text-primary mb-4 block">mail</span>
              <h3 className="font-bold text-[rgb(var(--color-text-main))] mb-2 group-hover:text-primary transition-colors">
                Contact Us
              </h3>
              <p className="text-sm text-[rgb(var(--color-text-body))]">
                Get in touch with our team for questions or complaints.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
