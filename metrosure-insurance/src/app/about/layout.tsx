import type { Metadata } from "next";
import { generateBreadcrumbSchema, commonBreadcrumbs } from "@/lib/generateBreadcrumbSchema";

// Breadcrumb schema for rich results
const breadcrumbSchema = generateBreadcrumbSchema([
  commonBreadcrumbs.home,
  { name: "About Us", url: "/about" },
]);

export const metadata: Metadata = {
  title: "About Us | Metrosure Insurance Brokers",
  description: "Metrosure Insurance Brokers (FSP 47089): A proudly South African company protecting families and partnering with retailers since 2013. Over 5,000 jobs created.",
  openGraph: {
    title: "About Us | Metrosure Insurance Brokers",
    description: "Metrosure Insurance Brokers (FSP 47089): Protecting families and partnering with retailers since 2013. Over 5,000 jobs created.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Metrosure Insurance Brokers",
    description: "Metrosure Insurance Brokers (FSP 47089): Protecting families and partnering with retailers since 2013. Over 5,000 jobs created.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Breadcrumb Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
