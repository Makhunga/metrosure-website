"use client";

import Link from "next/link";
import { Header, Footer } from "@/components";
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
    id: "introduction",
    title: "1. Introduction",
    content: `Metrosure Insurance Brokers (Pty) Ltd ("Metrosure", "we", "us", or "our") is committed to protecting your personal information and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.

As an Authorised Financial Service Provider (FSP No: 47089, Registration No: 2016/113504/07) regulated by the Financial Services Conduct Authority (FSCA), we are bound by the Protection of Personal Information Act (POPIA) and other applicable South African legislation.`,
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    content: `We may collect and process the following types of personal information:

**Identity Information:** Full name, ID number, date of birth, gender, and marital status.

**Contact Information:** Postal address, email address, telephone numbers.

**Financial Information:** Bank account details, income information, existing insurance policies, and credit information (where applicable).

**Employment Information:** Employer details, occupation, and employment history.

**Technical Information:** IP address, browser type, device information, and cookies when you visit our website.

**Insurance-Related Information:** Claims history, risk assessments, beneficiary details, and policy preferences.`,
  },
  {
    id: "b2b-services",
    title: "3. B2B Services Data Handling",
    content: `In addition to our insurance brokerage services, Metrosure provides business-to-business (B2B) services to retail partners. These services involve the collection and processing of specific categories of personal and business information.

**Device Leasing Programme:**
• Identification documents for verification
• Contact information (mobile, email, address)
• Financial information for credit assessment
• Device details (serial numbers, IMEI, purchase records)
• Payment and instalment tracking data

**Call Centre Services:**
• Contact information (names, telephone numbers, emails)
• Call recordings for quality assurance purposes
• Interaction history and outcomes
• Consent records for marketing communications

We maintain a 95% quality assurance average across all call centre operations. All calls are recorded and reviewed to ensure compliance with regulatory requirements and service standards.

**In-Store Campaign Services:**
• Customer enquiry data voluntarily provided during consultations
• Transaction records and quotations provided
• Campaign performance metrics

**Data Sharing with B2B Partners:**
We share relevant transactional and performance data with our retail partners as required to fulfil our contractual obligations. This data sharing is governed by formal data processing agreements that ensure POPIA compliance. We do not sell personal information to third parties.

**B2B Data Retention:**
B2B service records are retained for a minimum of 5 years in accordance with the Financial Intelligence Centre Act and our contractual obligations with retail partners.

For B2B data enquiries, contact: clients@metrosuregroup.co.za`,
  },
  {
    id: "how-we-use",
    title: "4. How We Use Your Information",
    content: `We use your personal information for the following purposes:

• To provide insurance brokerage services and financial advice
• To process insurance applications and claims
• To communicate with you about your policies and services
• To comply with legal and regulatory requirements
• To detect and prevent fraud
• To improve our website and services
• To send marketing communications (with your consent)
• To conduct risk assessments and underwriting
• To manage our relationship with you`,
  },
  {
    id: "legal-basis",
    title: "5. Legal Basis for Processing (POPIA)",
    content: `Under POPIA, we process your personal information based on one or more of the following legal grounds:

**Consent:** Where you have given us explicit consent to process your information.

**Contract:** Where processing is necessary for the performance of a contract with you.

**Legal Obligation:** Where we are required by law to process your information.

**Legitimate Interest:** Where processing is necessary for our legitimate business interests, provided this does not override your rights.`,
  },
  {
    id: "sharing",
    title: "6. Sharing Your Information",
    content: `We may share your personal information with:

**Insurance Partners:** Liberty, Sanlam, Discovery, Old Mutual, and other insurers we work with to provide you with quotes and policies.

**Service Providers:** Third parties who assist us in operating our business, such as IT providers and payment processors.

**Regulatory Bodies:** The FSCA and other regulatory authorities as required by law.

**Professional Advisers:** Lawyers, auditors, and accountants where necessary.

We will never sell your personal information to third parties for marketing purposes.`,
  },
  {
    id: "data-security",
    title: "7. Data Security",
    content: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. These measures include:

• Secure servers and encrypted data transmission
• Access controls and authentication procedures
• Regular security assessments and audits
• Staff training on data protection
• Physical security measures at our offices`,
  },
  {
    id: "retention",
    title: "8. Data Retention",
    content: `We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements.

For insurance records, we typically retain information for a minimum of 5 years after the end of the policy period, or longer if required by law or for legitimate business purposes.`,
  },
  {
    id: "your-rights",
    title: "9. Your Rights Under POPIA",
    content: `You have the following rights regarding your personal information:

**Right to Access:** Request a copy of your personal information we hold.

**Right to Correction:** Request correction of inaccurate or incomplete information.

**Right to Deletion:** Request deletion of your information (subject to legal retention requirements).

**Right to Object:** Object to the processing of your information for direct marketing.

**Right to Withdraw Consent:** Withdraw previously given consent at any time.

**Right to Lodge a Complaint:** Lodge a complaint with the Information Regulator if you believe your rights have been violated.

To exercise any of these rights, please contact our Information Officer.`,
  },
  {
    id: "cookies",
    title: "10. Cookies and Tracking",
    content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us:

• Remember your preferences
• Understand how you use our website
• Improve website performance
• Provide relevant content

You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website.`,
  },
  {
    id: "contact",
    title: "11. Contact Us",
    content: `If you have any questions about this Privacy Policy or wish to exercise your rights, please contact:

**Information Officer**
Metrosure Insurance Brokers (Pty) Ltd
391 Anton Lembede Street, Metropolitan Life Building
5th Floor, Durban, 4001

**Phone:** +27 31 301 1192
**Email:** info@metrosuregroup.co.za

**Information Regulator (South Africa)**
Website: www.justice.gov.za/inforeg
Email: inforeg@justice.gov.za`,
  },
  {
    id: "changes",
    title: "12. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website with a new effective date.

We encourage you to review this policy periodically.`,
  },
];

export default function PrivacyPage() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const contentInView = useInView(contentRef, { once: true, margin: "-50px" });

  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-56 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[rgb(var(--color-secondary))]/5" />

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
              <span className="text-[rgb(var(--color-text-main))]">Privacy Policy</span>
            </motion.nav>

            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/15 border border-primary/20 dark:border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="material-symbols-outlined text-sm">shield</span>
              POPIA Compliant
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Your privacy matters to us. This policy explains how Metrosure Insurance Brokers
              collects, uses, and protects your personal information in compliance with the
              Protection of Personal Information Act (POPIA).
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
            Questions About Your Privacy?
          </h2>
          <p className="text-[rgb(var(--color-text-body))] mb-8">
            Our team is here to help. Contact us if you have any questions about how we handle your data.
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
              href="/legal"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[rgb(var(--color-border-light))] hover:border-primary transition-all h-12 px-8 text-[rgb(var(--color-text-main))] font-bold hover:text-primary"
            >
              Legal Information
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
