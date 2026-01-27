import { Metadata } from "next";
import { Header, Footer } from "@/components";
import { claimsFAQs, claimsSEO } from "@/data/claims";
import { generateFAQSchema } from "@/lib/generateFAQSchema";
import { generateBreadcrumbSchema } from "@/lib/generateBreadcrumbSchema";
import ClaimsPageClient from "./ClaimsPageClient";

export const metadata: Metadata = {
  title: claimsSEO.title + " | Metrosure Insurance Brokers",
  description: claimsSEO.description,
  keywords: claimsSEO.keywords,
  openGraph: {
    title: claimsSEO.title + " | Metrosure Insurance Brokers",
    description: claimsSEO.description,
    url: "/claims",
    type: "website",
    locale: "en_ZA",
    siteName: "Metrosure Insurance Brokers",
  },
  twitter: {
    card: "summary_large_image",
    title: claimsSEO.title + " | Metrosure Insurance Brokers",
    description: claimsSEO.description,
  },
  alternates: {
    canonical: "/claims",
  },
};

// Generate structured data schemas
const faqSchema = generateFAQSchema(claimsFAQs);
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "File a Claim", url: "/claims" },
]);

export default function ClaimsPage() {
  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen relative">
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
        <ClaimsPageClient />
      </main>

      <Footer />
    </div>
  );
}
