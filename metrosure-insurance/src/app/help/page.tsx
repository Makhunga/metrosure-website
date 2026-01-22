import { Metadata } from "next";
import { Header, Footer } from "@/components";
import HelpPageClient from "./HelpPageClient";
import { allFAQs } from "@/data/faqs";
import { generateFAQSchema } from "@/lib/generateFAQSchema";

export const metadata: Metadata = {
  title: "Help Centre | Metrosure Insurance Brokers",
  description: "Find answers to your insurance questions. Metrosure Help Centre covers claims, policy management, payments, and product information. (FSP 47089)",
  openGraph: {
    title: "Help Centre | Metrosure Insurance Brokers",
    description: "Find answers to your insurance questions. Metrosure Help Centre covers claims, policy management, payments, and product information.",
    url: "/help",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Help Centre | Metrosure Insurance Brokers",
    description: "Find answers to your insurance questions. Metrosure Help Centre covers claims, policy management, payments, and product information.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/help",
  },
};

// Generate FAQ Schema for all FAQs
// Using all FAQs provides maximum surface area for Rich Results
const faqSchema = generateFAQSchema(allFAQs);

export default function HelpPage() {
  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen relative text-[rgb(var(--color-text-main))] transition-colors duration-300">
      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none z-0" />

      <Header />
      <HelpPageClient />
      <Footer />
    </div>
  );
}
