import { Metadata } from "next";
import { Header, Footer, ScrollToTop } from "@/components";
import {
  ContactHero,
  ContactOptions,
  FAQ,
  ContactForm,
  OfficeLocations,
} from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact Us | Metrosure Insurance Brokers",
  description:
    "Get in touch with Metrosure Insurance Brokers. Contact our sales team, customer support, or file a claim. We're here to help with all your insurance and financial planning needs.",
  openGraph: {
    title: "Contact Us | Metrosure Insurance Brokers",
    description:
      "Get in touch with Metrosure Insurance Brokers. Contact our sales team, customer support, or file a claim.",
    type: "website",
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
      <ScrollToTop />
    </div>
  );
}
