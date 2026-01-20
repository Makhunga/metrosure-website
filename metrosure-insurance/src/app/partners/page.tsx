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

export const metadata: Metadata = {
  title: "Partner With Us | Metrosure Insurance Brokers",
  description:
    "Partner with Metrosure to grow your financial services reach. Our trained sales teams sell insurance and financial products in-store, creating jobs and generating revenue. Join 100+ retail partners across South Africa.",
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
      "Transform your retail space into a revenue engine. Partner with Metrosure - our trained sales teams grow your financial services reach while creating local jobs.",
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
      "Transform your retail space into a revenue engine. Partner with Metrosure to grow your financial services reach.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/partners",
  },
};

export default function PartnersPage() {
  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen transition-colors duration-300 relative">
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
