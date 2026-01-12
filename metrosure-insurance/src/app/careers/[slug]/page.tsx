import { notFound } from "next/navigation";
import { Metadata } from "next";
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
    <main>
      <JobDetailHero job={job} />
      <JobDetailContent job={job} />

      {/* Application Form Section */}
      <section
        id="apply"
        className="py-16 sm:py-20 bg-[rgb(var(--color-surface-card))] transition-colors duration-300"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--color-text-main))] mb-4">
              Apply for <span className="text-primary">{job.title}</span>
            </h2>
            <p className="text-[rgb(var(--color-text-body))]">
              Fill out the form below and we&apos;ll be in touch soon.
            </p>
          </div>
          <ApplicationForm selectedPosition={job.title} />
        </div>
      </section>

      <RelatedJobs currentJob={job} />
    </main>
  );
}
