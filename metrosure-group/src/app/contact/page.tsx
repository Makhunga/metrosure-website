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
  title: "Contact Us | Metrosure Group",
  description:
    "Get in touch with Metrosure Group. Contact our sales team, customer support, or file a claim. We're here to help with all your insurance needs.",
  openGraph: {
    title: "Contact Us | Metrosure Group",
    description:
      "Get in touch with Metrosure Group. Contact our sales team, customer support, or file a claim.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <Header />
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
        <ContactHero />
        <ContactOptions />
        <FAQ />
        <ContactForm />
        <OfficeLocations />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
