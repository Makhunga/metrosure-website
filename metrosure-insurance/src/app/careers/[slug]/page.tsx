import { redirect } from "next/navigation";
import { getAllSlugs, getJobBySlug } from "@/data/jobs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all jobs
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  // In production, middleware handles the redirect to /under-development
  // This redirect is a fallback for development mode only
  if (process.env.NODE_ENV !== "production") {
    redirect(`/under-development?from=/careers/${job?.slug || slug}`);
  }

  // This should never be reached in production (middleware redirects first)
  // but we need to return something for the build
  return null;
}
