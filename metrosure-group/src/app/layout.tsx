import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
  title: "Metrosure Group | Insurance, Brokers & Financial Services",
  description: "Securing futures with a modern, human-first approach to insurance. We combine technology with empathy to deliver the best protection for what matters most.",
  keywords: ["insurance", "broker", "financial services", "life insurance", "home insurance", "auto insurance", "business insurance"],
  authors: [{ name: "Metrosure Group" }],
  openGraph: {
    title: "Metrosure Group | Your Future, Secured Today",
    description: "Insurance designed for the complexities of modern life. Experience peace of mind with security that adapts to you.",
    type: "website",
    locale: "en_US",
    siteName: "Metrosure Group",
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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body
        className={`${manrope.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
