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

  // Redirect all job detail pages to under-development
  redirect(`/under-development?from=/careers/${job?.slug || slug}`);
}
