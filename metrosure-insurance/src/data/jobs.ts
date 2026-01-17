/**
 * Centralized job data for the careers section
 *
 * This file contains all job listings and utility functions for accessing them.
 * When Workable is configured (via environment variables), jobs are fetched from
 * the Workable API. Otherwise, fallback data below is used.
 *
 * To enable Workable integration:
 * 1. Set WORKABLE_API_TOKEN and WORKABLE_SUBDOMAIN in .env.local
 * 2. See .env.example for setup instructions
 */

import {
  isWorkableConfigured,
  getWorkableJobs,
  getWorkableJob,
  getWorkableCategories,
  getWorkableApplicationUrl,
} from "@/lib/workable";

import {
  isIndeedConfigured,
  getIndeedJobs,
  getIndeedCategories,
  getIndeedApplicationUrl,
  shouldRedirectToIndeed as checkIndeedRedirect,
} from "@/lib/indeed";

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  category: string;
  location: string;
  type: string;
  description: string;
  metaDescription: string;
  responsibilities: string[];
  requirements: string[];
  offers: string[];
  datePosted: string;
  validThrough: string;
}

export interface JobCategory {
  id: string;
  label: string;
}

export const jobs: Job[] = [
  {
    id: "sales-consultant",
    slug: "insurance-sales-consultant",
    title: "Insurance Sales Consultant",
    department: "Sales",
    category: "sales",
    location: "All Provinces",
    type: "Full-time",
    description:
      "Join our sales team and help South Africans protect what matters most. Build relationships, provide advice, and earn competitive commissions.",
    metaDescription:
      "Join Metrosure as an Insurance Sales Consultant. Competitive salary + uncapped commission, full training provided. Apply now for sales jobs across South Africa.",
    responsibilities: [
      "Engage with potential clients and explain insurance products",
      "Build and maintain strong customer relationships",
      "Achieve monthly and quarterly sales targets",
      "Provide exceptional after-sales support",
    ],
    requirements: [
      "Matric certificate (Grade 12)",
      "Strong communication and interpersonal skills",
      "Sales experience preferred but not required",
      "Valid driver's licence is an advantage",
    ],
    offers: [
      "Competitive base salary + uncapped commission",
      "Full product training provided",
      "Career growth opportunities",
      "Supportive team environment",
    ],
    datePosted: "2026-01-09",
    validThrough: "2026-07-09",
  },
  {
    id: "call-centre-agent",
    slug: "call-centre-agent",
    title: "Call Centre Agent",
    department: "Customer Service",
    category: "call-centre",
    location: "KwaZulu-Natal",
    type: "Full-time",
    description:
      "Be the friendly voice of Metrosure. Handle customer inquiries, process requests, and ensure every client feels valued and heard.",
    metaDescription:
      "Call Centre Agent position at Metrosure in KwaZulu-Natal. Competitive salary, medical aid, and career advancement. Apply for customer service jobs today.",
    responsibilities: [
      "Answer inbound calls and assist customers professionally",
      "Process policy queries and update customer information",
      "Resolve customer complaints with empathy and efficiency",
      "Meet call quality and productivity targets",
    ],
    requirements: [
      "Matric certificate (Grade 12)",
      "Excellent verbal communication skills",
      "Basic computer literacy",
      "Ability to work in a fast-paced environment",
    ],
    offers: [
      "Competitive salary with performance bonuses",
      "Comprehensive training programme",
      "Medical aid contributions",
      "Opportunities for advancement",
    ],
    datePosted: "2026-01-09",
    validThrough: "2026-07-09",
  },
  {
    id: "telesales-rep",
    slug: "telesales-representative",
    title: "Telesales Representative",
    department: "Sales",
    category: "sales",
    location: "Gauteng",
    type: "Full-time",
    description:
      "Drive sales through outbound calling. Connect with potential customers, present insurance solutions, and close deals over the phone.",
    metaDescription:
      "Telesales Representative role at Metrosure Gauteng. Base salary + attractive commission, weekly incentives. Apply for telesales jobs in Johannesburg.",
    responsibilities: [
      "Make outbound calls to potential customers",
      "Present and sell insurance products effectively",
      "Follow up on leads and convert them to sales",
      "Maintain accurate records of all interactions",
    ],
    requirements: [
      "Matric certificate (Grade 12)",
      "Persuasive communication skills",
      "Target-driven mindset",
      "Previous telesales experience is a plus",
    ],
    offers: [
      "Base salary + attractive commission structure",
      "Weekly and monthly incentives",
      "Training and coaching support",
      "Clear career progression path",
    ],
    datePosted: "2026-01-09",
    validThrough: "2026-07-09",
  },
  {
    id: "client-service-admin",
    slug: "client-service-administrator",
    title: "Client Service Administrator",
    department: "Operations",
    category: "admin",
    location: "Gauteng",
    type: "Full-time",
    description:
      "Keep our operations running smoothly. Manage policy documentation, process applications, and support our sales and service teams.",
    metaDescription:
      "Client Service Administrator position at Metrosure Gauteng. Stable office environment, professional development. Apply for admin jobs in insurance.",
    responsibilities: [
      "Process new policy applications accurately",
      "Maintain and update client records",
      "Coordinate between departments for smooth service delivery",
      "Handle administrative queries from clients and staff",
    ],
    requirements: [
      "Matric certificate with good grades",
      "Strong attention to detail",
      "Proficiency in Microsoft Office",
      "Organizational skills and ability to multitask",
    ],
    offers: [
      "Competitive salary",
      "Stable office environment",
      "Professional development opportunities",
      "Team-oriented culture",
    ],
    datePosted: "2026-01-09",
    validThrough: "2026-07-09",
  },
  {
    id: "trainee-sales",
    slug: "trainee-sales-agent",
    title: "Trainee Sales Agent",
    department: "Sales",
    category: "sales",
    location: "All Provinces",
    type: "Full-time",
    description:
      "Start your insurance career with us. No experience needed, we'll teach you everything. Perfect for motivated individuals ready to learn and grow.",
    metaDescription:
      "Trainee Sales Agent at Metrosure - no experience required! Paid training, mentorship from top performers. Start your insurance career today across South Africa.",
    responsibilities: [
      "Complete our comprehensive training programme",
      "Shadow experienced sales consultants",
      "Learn insurance products and sales techniques",
      "Gradually take on sales responsibilities",
    ],
    requirements: [
      "Matric certificate (Grade 12)",
      "Eagerness to learn and grow",
      "Positive attitude and strong work ethic",
      "Good communication skills",
    ],
    offers: [
      "Paid training programme",
      "Mentorship from top performers",
      "Fast-track to full sales consultant role",
      "No experience necessary",
    ],
    datePosted: "2026-01-09",
    validThrough: "2026-07-09",
  },
];

export const categories: JobCategory[] = [
  { id: "all", label: "All Positions" },
  { id: "sales", label: "Sales" },
  { id: "call-centre", label: "Call Centre" },
  { id: "admin", label: "Administration" },
];

/**
 * Get all jobs
 */
export function getAllJobs(): Job[] {
  return jobs;
}

/**
 * Get a job by its slug
 */
export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}

/**
 * Get jobs by category
 */
export function getJobsByCategory(category: string): Job[] {
  if (category === "all") return jobs;
  return jobs.filter((job) => job.category === category);
}

/**
 * Get related jobs (same category, excluding current job)
 */
export function getRelatedJobs(job: Job, limit: number = 3): Job[] {
  return jobs
    .filter((j) => j.category === job.category && j.id !== job.id)
    .slice(0, limit);
}

/**
 * Get all job slugs for static generation
 */
export function getAllSlugs(): string[] {
  return jobs.map((job) => job.slug);
}

/**
 * Get all categories
 */
export function getAllCategories(): JobCategory[] {
  return categories;
}

// ═══════════════════════════════════════════════════════════════════════════
// ASYNC API FUNCTIONS (with Workable support)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Cache for Workable jobs to avoid repeated API calls
 */
let jobsCache: { jobs: Job[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Check if Workable integration is available
 */
export function hasWorkableIntegration(): boolean {
  return isWorkableConfigured();
}

/**
 * Check if Indeed integration is available
 */
export function hasIndeedIntegration(): boolean {
  return isIndeedConfigured();
}

/**
 * Check if any external job service is configured
 */
export function hasExternalJobService(): boolean {
  return isWorkableConfigured() || isIndeedConfigured();
}

/**
 * Fetch all jobs - tries Workable first, then Indeed, falls back to hardcoded data
 * Results are cached for 5 minutes to reduce API calls
 *
 * Priority:
 * 1. Workable (if configured) - Full ATS integration
 * 2. Indeed (if configured) - Job board search
 * 3. Fallback hardcoded data
 */
export async function fetchAllJobs(): Promise<Job[]> {
  // Check cache first
  if (jobsCache && Date.now() - jobsCache.timestamp < CACHE_TTL_MS) {
    return jobsCache.jobs;
  }

  // Try Workable first if configured (preferred - full ATS)
  if (isWorkableConfigured()) {
    try {
      const workableJobs = await getWorkableJobs();
      if (workableJobs && workableJobs.length > 0) {
        jobsCache = { jobs: workableJobs, timestamp: Date.now() };
        return workableJobs;
      }
    } catch (error) {
      console.warn("Failed to fetch from Workable:", error);
    }
  }

  // Try Indeed if configured
  if (isIndeedConfigured()) {
    try {
      const indeedJobs = await getIndeedJobs();
      if (indeedJobs && indeedJobs.length > 0) {
        jobsCache = { jobs: indeedJobs, timestamp: Date.now() };
        return indeedJobs;
      }
    } catch (error) {
      console.warn("Failed to fetch from Indeed:", error);
    }
  }

  // Fallback to hardcoded data
  return jobs;
}

/**
 * Fetch a job by slug - tries Workable first, falls back to hardcoded data
 */
export async function fetchJobBySlug(slug: string): Promise<Job | undefined> {
  // Try cached jobs first
  const allJobs = await fetchAllJobs();
  const cachedJob = allJobs.find((job) => job.slug === slug);
  if (cachedJob) {
    return cachedJob;
  }

  // For Workable jobs, the slug format is "title-shortcode"
  // Extract shortcode and try to fetch full details
  if (isWorkableConfigured()) {
    const shortcodeMatch = slug.match(/-([a-zA-Z0-9]+)$/);
    if (shortcodeMatch) {
      const shortcode = shortcodeMatch[1];
      try {
        const workableJob = await getWorkableJob(shortcode);
        if (workableJob) {
          return workableJob;
        }
      } catch (error) {
        console.warn(`Failed to fetch job ${shortcode} from Workable:`, error);
      }
    }
  }

  // Fallback to hardcoded data
  return getJobBySlug(slug);
}

/**
 * Fetch jobs by category
 */
export async function fetchJobsByCategory(category: string): Promise<Job[]> {
  const allJobs = await fetchAllJobs();
  if (category === "all") return allJobs;
  return allJobs.filter((job) => job.category === category);
}

/**
 * Fetch related jobs (same category, excluding current job)
 */
export async function fetchRelatedJobs(job: Job, limit: number = 3): Promise<Job[]> {
  const allJobs = await fetchAllJobs();
  return allJobs
    .filter((j) => j.category === job.category && j.id !== job.id)
    .slice(0, limit);
}

/**
 * Fetch all job slugs for static generation
 */
export async function fetchAllSlugs(): Promise<string[]> {
  const allJobs = await fetchAllJobs();
  return allJobs.map((job) => job.slug);
}

/**
 * Fetch all categories (dynamic if Workable or Indeed is used)
 */
export async function fetchAllCategories(): Promise<JobCategory[]> {
  if (isWorkableConfigured()) {
    const allJobs = await fetchAllJobs();
    if (allJobs.length > 0) {
      return getWorkableCategories(allJobs);
    }
  }

  if (isIndeedConfigured()) {
    const allJobs = await fetchAllJobs();
    if (allJobs.length > 0) {
      return getIndeedCategories(allJobs);
    }
  }

  return categories;
}

/**
 * Get the application URL for a job
 * Returns external URL (Workable/Indeed) if available, otherwise internal form anchor
 */
export function getApplicationUrl(job: Job): string {
  // Check if job has Workable data
  const workableData = (job as Job & { _workable?: { shortcode: string } })._workable;
  if (workableData?.shortcode) {
    return getWorkableApplicationUrl(workableData.shortcode);
  }

  // Check if job has Indeed data
  const indeedData = (job as Job & { _indeed?: { jobKey: string; url: string } })._indeed;
  if (indeedData?.jobKey) {
    return indeedData.url || getIndeedApplicationUrl(indeedData.jobKey);
  }

  // Default to internal application form
  return `/careers/${job.slug}#apply`;
}

/**
 * Check if applications should redirect to Workable
 */
export function shouldRedirectToWorkable(job: Job): boolean {
  const workableData = (job as Job & { _workable?: { shortcode: string } })._workable;
  return Boolean(workableData?.shortcode && isWorkableConfigured());
}

/**
 * Check if applications should redirect to Indeed
 */
export function shouldRedirectToIndeed(job: Job): boolean {
  return checkIndeedRedirect(job);
}

/**
 * Check if applications should redirect to any external service
 */
export function shouldRedirectToExternal(job: Job): boolean {
  return shouldRedirectToWorkable(job) || shouldRedirectToIndeed(job);
}

/**
 * Get the name of the external service for a job (for UI display)
 */
export function getExternalServiceName(job: Job): string | null {
  if (shouldRedirectToWorkable(job)) return "Workable";
  if (shouldRedirectToIndeed(job)) return "Indeed";
  return null;
}

/**
 * Clear the jobs cache (useful for testing or manual refresh)
 */
export function clearJobsCache(): void {
  jobsCache = null;
}
