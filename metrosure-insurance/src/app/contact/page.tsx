import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header, Footer } from "@/components";
import { ContactHero } from "@/components/contact";

// Code-split below-fold components for better LCP
const ContactOptions = dynamic(() => import("@/components/contact/ContactOptions"));
const FAQ = dynamic(() => import("@/components/contact/FAQ"));
const ContactForm = dynamic(() => import("@/components/contact/ContactForm"));
const OfficeLocations = dynamic(() => import("@/components/contact/OfficeLocations"));

export const metadata: Metadata = {
  title: "Contact Us | Metrosure Insurance Brokers",
  description:
    "Contact Metrosure Insurance Brokers (FSP 47089) for sales, support, or claims. We're here to help with all your insurance and financial planning needs.",
  openGraph: {
    title: "Contact Us | Metrosure Insurance Brokers",
    description:
      "Contact Metrosure Insurance Brokers (FSP 47089) for sales, support, or claims.",
    url: "/contact",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Metrosure Insurance Brokers",
    description:
      "Contact Metrosure Insurance Brokers (FSP 47089) for sales, support, or claims.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-stone-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <Header />

      {/* Main content with pattern background */}
      <div className="relative">
        {/* Grid Pattern Background - matching under-development page */}
        <div className="absolute inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-10" />

        {/* Gradient Mesh Overlay */}
        <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />

        <main className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-56 pb-24">
          <ContactHero />
          <ContactOptions />
          <FAQ />
          <ContactForm />
          <OfficeLocations />
        </main>
      </div>

      <Footer />
    </div>
  );
}
