import { Metadata } from "next";
import { corporateSEO } from "@/data/corporateServices";
import { generateBreadcrumbSchema, commonBreadcrumbs } from "@/lib/generateBreadcrumbSchema";

// Breadcrumb schema for rich results
const breadcrumbSchema = generateBreadcrumbSchema([
  commonBreadcrumbs.home,
  { name: "Corporate Solutions", url: "/corporate" },
]);

export const metadata: Metadata = {
  title: `${corporateSEO.title} | Metrosure Insurance Brokers`,
  description: corporateSEO.description,
  keywords: corporateSEO.keywords,
  openGraph: {
    title: `${corporateSEO.title} | Metrosure Insurance Brokers`,
    description: corporateSEO.description,
    url: "/corporate",
    type: "website",
    locale: "en_ZA",
    siteName: "Metrosure Insurance Brokers",
  },
  twitter: {
    card: "summary_large_image",
    title: `${corporateSEO.title} | Metrosure Insurance Brokers`,
    description: corporateSEO.description,
  },
};

export default function CorporateLayout({
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
