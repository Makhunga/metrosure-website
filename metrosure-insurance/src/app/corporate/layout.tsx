import { Metadata } from "next";
import { corporateSEO } from "@/data/corporateServices";

export const metadata: Metadata = {
  title: `${corporateSEO.title} | Metrosure Insurance Brokers`,
  description: corporateSEO.description,
  keywords: corporateSEO.keywords,
  openGraph: {
    title: `${corporateSEO.title} | Metrosure Insurance Brokers`,
    description: corporateSEO.description,
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
  return <>{children}</>;
}
