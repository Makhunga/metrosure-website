import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Header, Footer } from "@/components";
import {
  getAllSlugs,
  getJobBySlug,
  fetchJobBySlug,
  fetchAllSlugs,
  hasExternalJobService,
  shouldRedirectToExternal,
  getApplicationUrl,
  getExternalServiceName,
  type Job,
} from "@/data/jobs";
import JobDetailHero from "@/components/careers/JobDetailHero";
import JobDetailTabs from "@/components/careers/JobDetailTabs";
import RelatedJobs from "@/components/careers/RelatedJobs";
import { generateJobPostingSchema } from "@/lib/generateJobSchema";
import { generateBreadcrumbSchema } from "@/lib/generateBreadcrumbSchema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * ISR Configuration
 * Pages are revalidated every 5 minutes to pick up new jobs from Workable
 * When Workable isn't configured, pages use fallback data but still revalidate
 * to support future Workable integration without redeployment
 */
export const revalidate = 300;

// Generate static paths for all jobs
export async function generateStaticParams() {
  // Use async function if any external job service is configured
  if (hasExternalJobService()) {
    const slugs = await fetchAllSlugs();
    return slugs.map((slug) => ({ slug }));
  }

  // Fallback to synchronous function
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Try async fetch first if any external job service is configured
  const job = hasExternalJobService()
    ? await fetchJobBySlug(slug)
    : getJobBySlug(slug);

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

  // Try async fetch first if any external job service is configured
  const job = hasExternalJobService()
    ? await fetchJobBySlug(slug)
    : getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  // Determine if this job uses an external service for applications
  const useExternalApplication = shouldRedirectToExternal(job);
  const applicationUrl = getApplicationUrl(job);
  const serviceName = getExternalServiceName(job);

  // Generate structured data schemas
  const jobSchema = generateJobPostingSchema(job);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" },
    { name: job.title, url: `/careers/${job.slug}` },
  ]);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />
      <main>
        <JobDetailHero job={job} />

        {/* Tabbed Content: Overview & Application */}
        {useExternalApplication ? (
          <ExternalApplicationRedirect
            jobTitle={job.title}
            applicationUrl={applicationUrl}
            serviceName={serviceName}
          />
        ) : (
          <JobDetailTabs job={job} />
        )}

        <RelatedJobs currentJob={job} />
      </main>
      <Footer />
    </>
  );
}

/**
 * Component shown when job applications go through an external service (Workable/Indeed)
 */
function ExternalApplicationRedirect({
  jobTitle,
  applicationUrl,
  serviceName,
}: {
  jobTitle: string;
  applicationUrl: string;
  serviceName: string | null;
}) {
  const portalName = serviceName === "Indeed" ? "Indeed" : "our application portal";
  const buttonText = serviceName === "Indeed" ? "Apply on Indeed" : "Apply Now";

  return (
    <section
      id="apply"
      className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Accepting Applications
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Apply for <span className="text-primary">{jobTitle}</span>
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Click the button below to complete your application through {portalName}.
            You&apos;ll be able to upload your CV and provide additional details.
          </p>

          <a
            href={applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-[rgb(var(--color-primary-hover))] text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
          >
            <span>{buttonText}</span>
            <span className="material-symbols-outlined text-lg">open_in_new</span>
          </a>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
            You&apos;ll be redirected to {portalName}
          </p>
        </div>
      </div>
    </section>
  );
}
