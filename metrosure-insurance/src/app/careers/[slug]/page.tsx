import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Header, Footer } from "@/components";
import { getAllSlugs, getJobBySlug } from "@/data/jobs";
import JobDetailHero from "@/components/careers/JobDetailHero";
import JobDetailContent from "@/components/careers/JobDetailContent";
import RelatedJobs from "@/components/careers/RelatedJobs";
import ApplicationForm from "@/components/careers/ApplicationForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all jobs
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return {
      title: "Position Not Found | Metrosure Careers",
    };
  }

  return {
    title: `${job.title} | Metrosure Careers`,
    description: job.metaDescription || job.description,
    openGraph: {
      title: `${job.title} - Join Metrosure`,
      description: job.metaDescription || job.description,
      type: "website",
    },
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <JobDetailHero job={job} />
        <JobDetailContent job={job} />

        {/* Application Form Section */}
        <ApplicationForm id="apply" selectedPosition={job.title} />

        <RelatedJobs currentJob={job} />
      </main>
      <Footer />
    </>
  );
}
