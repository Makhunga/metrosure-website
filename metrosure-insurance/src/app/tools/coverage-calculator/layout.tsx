import { Metadata } from "next";
import { generateBreadcrumbSchema, commonBreadcrumbs } from "@/lib/generateBreadcrumbSchema";

export const metadata: Metadata = {
  title: "Coverage Calculator | How Much Insurance Do You Need?",
  description:
    "Free insurance calculator for South Africans. Calculate how much life cover and funeral cover you need based on your circumstances. No obligation, instant results. FSP 47089.",
  keywords: [
    "insurance calculator",
    "life cover calculator",
    "funeral cover calculator",
    "how much insurance do I need",
    "coverage calculator South Africa",
    "life insurance calculator SA",
    "Metrosure calculator",
    "FSP 47089",
  ],
  openGraph: {
    title: "Coverage Calculator | How Much Insurance Do You Need?",
    description:
      "Free insurance calculator for South Africans. Calculate how much life cover and funeral cover you need. No obligation, instant results.",
    url: "/tools/coverage-calculator",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coverage Calculator | How Much Insurance Do You Need?",
    description:
      "Free insurance calculator for South Africans. Calculate how much life cover and funeral cover you need. No obligation, instant results.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/tools/coverage-calculator",
  },
};

// Breadcrumb schema for rich results
const breadcrumbSchema = generateBreadcrumbSchema([
  commonBreadcrumbs.home,
  { name: "Tools", url: "/" },
  { name: "Coverage Calculator", url: "/tools/coverage-calculator" },
]);

export default function CoverageCalculatorLayout({
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
