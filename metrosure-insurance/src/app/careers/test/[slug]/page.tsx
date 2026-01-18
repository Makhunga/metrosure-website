import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Header, Footer } from "@/components";
import {
  getAllSlugs,
  getJobBySlug,
  fetchJobBySlug,
  fetchAllSlugs,
  hasExternalJobService,
} from "@/data/jobs";
import JobDetailSimple from "@/components/careers/JobDetailSimple";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Test route for simplified career detail template
 *
 * This route allows side-by-side comparison of the Feathery-inspired
 * simplified design versus the current content-dense layout.
 *
 * Test URL: /careers/test/call-centre-agent
 * Compare with: /careers/call-centre-agent
 */

// Generate static paths for all jobs
export async function generateStaticParams() {
  if (hasExternalJobService()) {
    const slugs = await fetchAllSlugs();
    return slugs.map((slug) => ({ slug }));
  }

  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const job = hasExternalJobService()
    ? await fetchJobBySlug(slug)
    : getJobBySlug(slug);

  if (!job) {
    return {
      title: "Position Not Found | Metrosure Careers",
    };
  }

  return {
    title: `${job.title} (Test) | Metrosure Careers`,
    description: job.metaDescription || job.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function JobDetailTestPage({ params }: PageProps) {
  const { slug } = await params;

  const job = hasExternalJobService()
    ? await fetchJobBySlug(slug)
    : getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <>
      <Header />
      <JobDetailSimple job={job} />
      <Footer />
    </>
  );
}
