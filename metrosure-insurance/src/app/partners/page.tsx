import { Metadata } from "next";
import { Header, Footer } from "@/components";
import {
  PartnersHero,
  SuccessMetrics,
  ValueProposition,
  HowItWorks,
  PartnerBenefits,
  // CaseStudies, // Temporarily removed - pending stakeholder meeting
  // PartnerTestimonials,
  PartnerFAQ,
  PartnerInquiryForm,
} from "@/components/partners";
import { partnerFAQs } from "@/data/partnerServices";
import { generateFAQSchema } from "@/lib/generateFAQSchema";
import { generateBreadcrumbSchema, commonBreadcrumbs } from "@/lib/generateBreadcrumbSchema";

export const metadata: Metadata = {
  title: "Partner With Us | Metrosure Insurance Brokers",
  description:
    "Partner with Metrosure to offer in-store insurance. Our trained sales teams handle everything, generating revenue while creating jobs. Join 100+ retail partners.",
  keywords: [
    "retail partnership",
    "in-store insurance",
    "B2B insurance",
    "retail insurance campaigns",
    "job creation",
    "South Africa retail",
    "insurance sales partnership",
    "Metrosure partners",
    "outsourced sales",
    "credit facility",
    "FSP 47089"
  ],
  openGraph: {
    title: "Partner With Us | Metrosure Insurance Brokers",
    description:
      "Partner with Metrosure to offer in-store insurance. Our trained sales teams handle everything, generating revenue while creating jobs.",
    url: "/partners",
    type: "website",
    locale: "en_ZA",
    siteName: "Metrosure Insurance Brokers",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner With Us | Metrosure Insurance Brokers",
    description:
      "Partner with Metrosure to offer in-store insurance. Our trained sales teams handle everything, generating revenue while creating jobs.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/partners",
  },
};

// Generate FAQ schema for SEO
const faqSchema = generateFAQSchema(partnerFAQs);

// Breadcrumb schema for rich results
const breadcrumbSchema = generateBreadcrumbSchema([
  commonBreadcrumbs.home,
  { name: "Partners", url: "/partners" },
]);

export default function PartnersPage() {
  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen transition-colors duration-300 relative">
      {/* FAQ Schema JSON-LD for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Breadcrumb Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none z-0" />

      <Header />
      <main className="relative z-10">
        <PartnersHero />
        <SuccessMetrics />
        <ValueProposition />
        <HowItWorks />
        <PartnerBenefits />
        {/* CaseStudies temporarily removed - pending stakeholder meeting */}
        {/* <PartnerTestimonials /> */}
        <PartnerFAQ />
        <PartnerInquiryForm />
      </main>
      <Footer />
    </div>
  );
}
