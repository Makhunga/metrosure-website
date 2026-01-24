import { Suspense } from "react";
import { Metadata } from "next";
import { Header, Footer } from "@/components";
import {
  CorporateHero,
  CorporateServices,
  CorporateBenefits,
  CorporateProcess,
  CorporateFAQ,
  CorporateInquiryForm,
} from "@/components/corporate";
import { corporateFAQs, corporateSEO } from "@/data/corporateServices";
import { generateFAQSchema } from "@/lib/generateFAQSchema";
import { generateBreadcrumbSchema } from "@/lib/generateBreadcrumbSchema";

export const metadata: Metadata = {
  title: corporateSEO.title + " | Metrosure Insurance Brokers",
  description: corporateSEO.description,
  keywords: corporateSEO.keywords,
  openGraph: {
    title: corporateSEO.title + " | Metrosure Insurance Brokers",
    description: corporateSEO.description,
    url: "/corporate",
    type: "website",
    locale: "en_ZA",
    siteName: "Metrosure Insurance Brokers",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: corporateSEO.title + " | Metrosure Insurance Brokers",
    description: corporateSEO.description,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/corporate",
  },
};

// Generate structured data schemas
const faqSchema = generateFAQSchema(corporateFAQs);
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Corporate Solutions", url: "/corporate" },
]);

// Loading skeleton for Suspense fallback
// Note: We intentionally don't render Header/Footer here to avoid IntersectionObserver issues
function CorporateLoadingSkeleton() {
  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 bg-gray-200 dark:bg-gray-800" />
      {/* Hero skeleton */}
      <div className="h-[60vh] bg-gray-100 dark:bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32">
          {/* Badge skeleton */}
          <div className="h-8 w-44 bg-gray-200 dark:bg-gray-800 rounded-full mb-6" />
          {/* Heading */}
          <div className="h-14 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
          <div className="h-14 w-1/2 bg-gray-200 dark:bg-gray-800 rounded mb-6" />
          {/* Subtitle */}
          <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-800 rounded mb-8" />
          {/* CTAs */}
          <div className="flex gap-4">
            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          </div>
        </div>
      </div>
      {/* Services preview skeleton */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-8 bg-white dark:bg-gray-800 rounded-2xl">
                <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-xl mb-6" />
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CorporatePageContent() {
  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen transition-colors duration-300 relative">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none z-0" />

      <Header />
      <main className="relative z-10">
        <CorporateHero />
        <CorporateServices />
        <CorporateProcess />
        <CorporateBenefits />
        <CorporateFAQ />
        <CorporateInquiryForm />
      </main>
      <Footer />
    </div>
  );
}

export default function CorporatePage() {
  return (
    <Suspense fallback={<CorporateLoadingSkeleton />}>
      <CorporatePageContent />
    </Suspense>
  );
}
