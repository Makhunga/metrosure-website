import { Suspense } from "react";
import { Metadata } from "next";
import { Header, Footer } from "@/components";
import HelpPageClient from "./HelpPageClient";
import { allFAQs } from "@/data/faqs";
import { generateFAQSchema } from "@/lib/generateFAQSchema";
import { generateBreadcrumbSchema, commonBreadcrumbs } from "@/lib/generateBreadcrumbSchema";

export const metadata: Metadata = {
  title: "Help Centre | Metrosure Insurance Brokers",
  description: "Find answers to your insurance questions. Metrosure Help Centre covers claims, policy management, payments, and product information. (FSP 47089)",
  openGraph: {
    title: "Help Centre | Metrosure Insurance Brokers",
    description: "Find answers to your insurance questions. Metrosure Help Centre covers claims, policy management, payments, and product information.",
    url: "/help",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Help Centre | Metrosure Insurance Brokers",
    description: "Find answers to your insurance questions. Metrosure Help Centre covers claims, policy management, payments, and product information.",
  },
  alternates: {
    canonical: "/help",
  },
};

// Generate FAQ Schema for all FAQs
// Using all FAQs provides maximum surface area for Rich Results
const faqSchema = generateFAQSchema(allFAQs);

// Breadcrumb schema for rich results
const breadcrumbSchema = generateBreadcrumbSchema([
  commonBreadcrumbs.home,
  { name: "Help Centre", url: "/help" },
]);

// Loading skeleton for Suspense fallback
// Note: We intentionally don't render Header/Footer here to avoid IntersectionObserver issues
function HelpLoadingSkeleton() {
  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 bg-gray-200 dark:bg-gray-800" />
      {/* Search section skeleton */}
      <div className="pt-32 pb-12 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Heading */}
          <div className="h-10 w-2/3 bg-gray-200 dark:bg-gray-800 rounded mb-4 mx-auto" />
          <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-800 rounded mb-8 mx-auto" />
          {/* Search input placeholder */}
          <div className="h-14 w-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700" />
        </div>
      </div>
      {/* Category tabs skeleton */}
      <div className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-4 overflow-x-auto">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg flex-shrink-0" />
            ))}
          </div>
        </div>
      </div>
      {/* FAQ items skeleton */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HelpPageContent() {
  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen relative text-[rgb(var(--color-text-main))] transition-colors duration-300">
      {/* FAQ Schema JSON-LD */}
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
      <HelpPageClient />
      <Footer />
    </div>
  );
}

export default function HelpPage() {
  return (
    <Suspense fallback={<HelpLoadingSkeleton />}>
      <HelpPageContent />
    </Suspense>
  );
}
