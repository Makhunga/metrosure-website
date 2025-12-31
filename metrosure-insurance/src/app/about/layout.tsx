import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Metrosure Insurance Brokers",
  description: "Learn about Metrosure Insurance Brokers (FSP 47089) - A proudly South African company protecting families and partnering with retail businesses since 2013. Over 5,000 jobs created nationwide.",
  openGraph: {
    title: "About Us | Metrosure Insurance Brokers",
    description: "A proudly South African company protecting families and partnering with retail businesses since 2013. Over 5,000 jobs created nationwide.",
  },
  twitter: {
    title: "About Us | Metrosure Insurance Brokers",
    description: "A proudly South African company protecting families and partnering with retail businesses since 2013. Over 5,000 jobs created nationwide.",
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
