import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Portal | Metrosure Insurance Brokers",
  description: "Sign in to manage your policies and claims with Metrosure Insurance Brokers.",
};

/**
 * Login Page - Currently Under Development
 *
 * Redirects to /under-development while client portal is being built.
 * Original login UI code preserved in git history (Session 104).
 */
export default function LoginPage() {
  redirect("/under-development?from=/login");
}
