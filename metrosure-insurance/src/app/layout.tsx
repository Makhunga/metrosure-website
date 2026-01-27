import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ClientLayout from "@/components/ClientLayout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Lazy-load Tawk.to chat widget (1.2MB) - deferred for better LCP
// Note: TawkToChat internally handles hydration safety via isHydrated state
const TawkToChat = dynamic(() => import("@/components/TawkToChat"));

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.metrosuregroup.co.za"),
  title: "Metrosure Insurance Brokers | Taking You to the Future",
  description: "Metrosure Insurance Brokers (FSP 47089) - Your trusted South African financial services provider. Insurance, retirement planning, investments, employee benefits, and in-store insurance solutions since 2013.",
  keywords: ["insurance broker", "car insurance", "home insurance", "life insurance", "funeral cover", "credit life insurance", "retirement planning", "investments", "employee benefits", "in-store insurance", "South Africa", "Durban", "FSP 47089"],
  authors: [{ name: "Metrosure Insurance Brokers (Pty) Ltd" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Metrosure Insurance Brokers | Taking You to the Future",
    description: "Your trusted South African insurance broker. Personal and business insurance, financial planning, and retail insurance solutions. FSP 47089.",
    url: "/",
    type: "website",
    locale: "en_ZA",
    siteName: "Metrosure Insurance Brokers",
  },
  twitter: {
    card: "summary_large_image",
    site: "@metrosure_insurance_",
    title: "Metrosure Insurance Brokers | Taking You to the Future",
    description: "Your trusted South African insurance broker. Personal and business insurance, financial planning, and retail insurance solutions. FSP 47089.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Material Symbols - optimised: fixed opsz/wght/GRAD, variable FILL only */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "InsuranceAgency",
              name: "Metrosure Insurance Brokers",
              alternateName: "Metrosure Group",
              description:
                "Authorised Financial Services Provider offering insurance brokerage, retirement planning, and employee benefits across South Africa.",
              url: "https://www.metrosuregroup.co.za",
              logo: "https://www.metrosuregroup.co.za/images/logo.png",
              foundingDate: "2013",
              telephone: "+27 31 301 1192",
              email: "info@metrosuregroup.co.za",
              address: {
                "@type": "PostalAddress",
                streetAddress: "32 Stephen Dlamini Road",
                addressLocality: "Musgrave, Durban",
                postalCode: "4001",
                addressCountry: "ZA",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -29.8450,
                longitude: 31.0000,
              },
              areaServed: {
                "@type": "Country",
                name: "South Africa",
              },
              sameAs: [
                "https://www.facebook.com/people/Metrosure-Insurance-Brokers/100083163880679/",
                "https://za.linkedin.com/company/metrosure",
                "https://www.instagram.com/metrosure_insurance_/",
              ],
              hasCredential: {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "Financial Services Provider",
                recognizedBy: {
                  "@type": "Organization",
                  name: "Financial Services Conduct Authority (FSCA)",
                },
                identifier: "FSP 47089",
              },
              numberOfEmployees: {
                "@type": "QuantitativeValue",
                value: 5000,
                unitText: "jobs created",
              },
              location: [
                {
                  "@type": "Place",
                  name: "Metrosure Head Office - Musgrave",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "32 Stephen Dlamini Road",
                    addressLocality: "Musgrave, Durban",
                    postalCode: "4001",
                    addressCountry: "ZA",
                  },
                },
                {
                  "@type": "Place",
                  name: "Metrosure Pietermaritzburg",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "195 Boom Street",
                    addressLocality: "Pietermaritzburg",
                    postalCode: "3201",
                    addressCountry: "ZA",
                  },
                },
                {
                  "@type": "Place",
                  name: "Metrosure Pretoria",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "325 Church Street and Thabo Sehume, Berlinton Building, Office 318",
                    addressLocality: "Pretoria",
                    postalCode: "0002",
                    addressCountry: "ZA",
                  },
                },
                {
                  "@type": "Place",
                  name: "Metrosure Boksburg",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "183 Bentel Avenue, Unit 13 Jansen Park",
                    addressLocality: "Boksburg",
                    postalCode: "1459",
                    addressCountry: "ZA",
                  },
                },
                {
                  "@type": "Place",
                  name: "Metrosure Musgrave",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "32 Stephen Dlamini Road, Musgrave",
                    addressLocality: "Durban",
                    postalCode: "4001",
                    addressCountry: "ZA",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${manrope.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
{/* Tawk.to disabled - using WhatsApp for customer contact
        <TawkToChat
          propertyId="6957e95179755a19831386b8"
          widgetId="1jdvmepqi"
        />
*/}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
