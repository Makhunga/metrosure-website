import { Suspense } from "react";
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
    "Partner with Metrosure to facilitate financial product sales. Our trained teams sell products from leading insurers, earning you commission while creating jobs. Join 100+ partners.",
  keywords: [
    "retail partnership",
    "in-store insurance",
    "retail insurance partnership",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner With Us | Metrosure Insurance Brokers",
    description:
      "Partner with Metrosure to facilitate financial product sales. Our trained teams sell products from leading insurers, earning you commission while creating jobs.",
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

// Loading skeleton for Suspense fallback
// Note: We intentionally don't render Header/Footer here to avoid IntersectionObserver issues
function PartnersLoadingSkeleton() {
  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 bg-gray-200 dark:bg-gray-800" />
      {/* Hero skeleton */}
      <div className="min-h-[70vh] bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20">
          {/* Badge skeleton */}
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-full mb-6" />
          {/* Heading lines */}
          <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
          <div className="h-12 w-1/2 bg-gray-200 dark:bg-gray-800 rounded mb-6" />
          {/* Subtitle */}
          <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-800 rounded mb-8" />
          {/* CTA buttons */}
          <div className="flex gap-4">
            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          </div>
        </div>
      </div>
      {/* Stats section skeleton */}
      <div className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10" />
                <div className="h-10 bg-white/20 rounded mb-2 mx-auto w-24" />
                <div className="h-4 bg-white/10 rounded mx-auto w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Content skeleton */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900" />
    </div>
  );
}

function PartnersPageContent() {
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

export default function PartnersPage() {
  return (
    <Suspense fallback={<PartnersLoadingSkeleton />}>
      <PartnersPageContent />
    </Suspense>
  );
}
