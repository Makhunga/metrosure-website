import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header, Footer } from "@/components";
import { ContactHero } from "@/components/contact";
import { generateBreadcrumbSchema, commonBreadcrumbs } from "@/lib/generateBreadcrumbSchema";
import { generateFAQSchema } from "@/lib/generateFAQSchema";

// Code-split below-fold components for better LCP
const ContactOptions = dynamic(() => import("@/components/contact/ContactOptions"));
const FAQ = dynamic(() => import("@/components/contact/FAQ"));
const ContactForm = dynamic(() => import("@/components/contact/ContactForm"));
const OfficeLocations = dynamic(() => import("@/components/contact/OfficeLocations"));

// Breadcrumb schema for rich results
const breadcrumbSchema = generateBreadcrumbSchema([
  commonBreadcrumbs.home,
  { name: "Contact Us", url: "/contact" },
]);

// FAQ schema for contact page FAQs
const contactFAQs = [
  {
    question: "How do I report a claim?",
    answer:
      "Contact your dedicated portfolio manager directly, or call our head office at +27 31 301 1192. Our claims team will guide you through the process and keep you updated every step of the way.",
  },
  {
    question: "What insurance companies do you work with?",
    answer:
      "We partner with over 30 leading South African insurers including Liberty, Sanlam, Discovery, Old Mutual, Momentum, Hollard, and more. This allows us to shop around and find the best cover and rates for your specific needs.",
  },
  {
    question: "Do I get a dedicated person to help me?",
    answer:
      "Yes! Every client gets a dedicated portfolio manager who knows your policies inside out. You're not passed around between call centres, you'll have a real person who knows your name and your needs.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "We have offices across South Africa: Musgrave (head office), Durban CBD, Pietermaritzburg, Pretoria, and Boksburg. Wherever you are in SA, we can help.",
  },
  {
    question: "Is Metrosure a registered financial services provider?",
    answer:
      "Yes, Metrosure Insurance Brokers (Pty) Ltd is an Authorised Financial Service Provider regulated by the FSCA. Our FSP number is 47089.",
  },
  {
    question: "How can my business partner with Metrosure?",
    answer:
      "We partner with retail stores across South Africa to facilitate in-store insurance sales. We deploy trained staff, handle all compliance and regulatory requirements, and share revenue with our partners. Since 2013, we've created over 5,000 jobs through these partnerships. Visit our Partners page or contact us to learn more.",
  },
  {
    question: "Do you offer corporate or group insurance?",
    answer:
      "Yes, we arrange comprehensive corporate insurance solutions including group life cover, employee benefits packages, and business insurance through leading SA insurers. Our team creates tailored solutions for organisations of all sizes. Request a quote or contact us for a consultation.",
  },
];

const faqSchema = generateFAQSchema(contactFAQs);

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
      {/* Breadcrumb Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
