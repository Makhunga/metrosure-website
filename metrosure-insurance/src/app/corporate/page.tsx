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

export default function CorporatePage() {
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
