import { Metadata } from "next";
import { corporateSEO } from "@/data/corporateServices";

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
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${corporateSEO.title} | Metrosure Insurance Brokers`,
    description: corporateSEO.description,
    images: ["/og-image.png"],
  },
};

export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
