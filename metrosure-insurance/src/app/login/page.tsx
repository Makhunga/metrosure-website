import { redirect } from "next/navigation";
import { Metadata } from "next";
import LoginPageClient from "./LoginPageClient";

export const metadata: Metadata = {
  title: "Client Portal Login | Metrosure Insurance Brokers",
  description: "Sign in to manage your policies and claims with Metrosure Insurance Brokers.",
};

/**
 * Login Page
 *
 * - Development (local): Shows login UI for testing the portal mockup
 * - Production (Vercel): Redirects to /under-development
 *
 * Uses VERCEL env var to detect Vercel deployments specifically,
 * allowing local builds to still show the login page.
 */
export default function LoginPage() {
  // Only redirect on Vercel deployments (preview or production)
  // VERCEL env var is set to "1" on all Vercel deployments
  const isVercel = process.env.VERCEL === "1";

  if (isVercel) {
    redirect("/under-development?from=/login");
  }

  return <LoginPageClient />;
}
