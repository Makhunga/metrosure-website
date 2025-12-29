import { Metadata } from "next";
import Image from "next/image";
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
    <div className="bg-[rgb(var(--color-surface))] min-h-screen transition-colors duration-300">
      <Header />

      {/* Main content with pattern background */}
      <div className="relative overflow-hidden">
        {/* Geometric Pattern - Top Right Corner */}
        <div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none hidden md:block"
          aria-hidden="true"
        >
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white_0%,transparent_70%)]">
            <Image
              src="/resources/vecteezy_abstract-geometric-pattern-artwork-retro-colors-and-color_6253957.svg"
              alt=""
              fill
              className="object-cover opacity-[0.08] dark:opacity-[0.04] scale-150"
            />
          </div>
        </div>

        {/* Geometric Pattern - Bottom Left Corner */}
        <div
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] pointer-events-none hidden md:block"
          aria-hidden="true"
        >
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white_0%,transparent_70%)]">
            <Image
              src="/resources/vecteezy_abstract-geometric-pattern-artwork-retro-colors-and-color_6253957.svg"
              alt=""
              fill
              className="object-cover opacity-[0.08] dark:opacity-[0.04] scale-150 rotate-180"
            />
          </div>
        </div>

        {/* Gradient Mesh Overlay */}
        <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />

        <main className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-56 pb-24 z-10">
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
