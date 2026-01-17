import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Metrosure Insurance Brokers",
  description: "Learn about Metrosure Insurance Brokers (FSP 47089) - A proudly South African company protecting families and partnering with retail businesses since 2013. Over 5,000 jobs created nationwide.",
  openGraph: {
    title: "About Us | Metrosure Insurance Brokers",
    description: "A proudly South African company protecting families and partnering with retail businesses since 2013. Over 5,000 jobs created nationwide.",
    url: "/about",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Metrosure Insurance Brokers",
    description: "A proudly South African company protecting families and partnering with retail businesses since 2013. Over 5,000 jobs created nationwide.",
    images: ["/og-image.png"],
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
  return children;
}
