import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer, ScrollToTop } from "@/components";
import { getAllSlugs, getJobBySlug } from "@/data/jobs";
import { generateJobPostingSchema } from "@/lib/generateJobSchema";
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

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return {
      title: "Position Not Found | Metrosure Careers",
    };
  }

  return {
    title: `${job.title} | Careers at Metrosure Insurance Brokers`,
    description: job.metaDescription,
    keywords: [
      job.title,
      job.department,
      "insurance jobs",
      "careers",
      job.location,
      "Metrosure",
      "South Africa jobs",
    ],
    openGraph: {
      title: `${job.title} | Metrosure Careers`,
      description: job.metaDescription,
      type: "website",
      locale: "en_ZA",
      siteName: "Metrosure Insurance Brokers",
      url: `https://www.metrosuregroup.co.za/careers/${job.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} | Metrosure Careers`,
      description: job.metaDescription,
    },
    alternates: {
      canonical: `https://www.metrosuregroup.co.za/careers/${job.slug}`,
    },
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const jobSchema = generateJobPostingSchema(job);

  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen transition-colors duration-300 relative">
      {/* Background mesh */}
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none z-0" />

      {/* JSON-LD Schema for Google for Jobs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />

      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <JobDetailHero job={job} />

        {/* Main Content */}
        <JobDetailContent job={job} />

        {/* Application Form Section */}
        <section
          id="apply"
          className="py-20 bg-[rgb(var(--color-surface))] transition-colors duration-300"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-[rgb(var(--color-text-main))] mb-4">
                Apply for This Position
              </h2>
              <p className="text-[rgb(var(--color-text-body))] text-lg">
                Ready to join our team? Fill out the form below and we&apos;ll be in touch.
              </p>
            </div>

            <div className="bg-[rgb(var(--color-surface-card))] rounded-3xl border border-[rgb(var(--color-border-light))] p-6 sm:p-10 shadow-xl">
              <ApplicationForm selectedPosition={job.title} />
            </div>
          </div>
        </section>

        {/* Related Jobs */}
        <RelatedJobs currentJob={job} />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
