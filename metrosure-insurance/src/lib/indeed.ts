/**
 * Indeed Job Sync API Client
 *
 * This module provides integration with Indeed's Job Posting API for managing job listings.
 * It supports fetching jobs posted on Indeed and generating application URLs.
 *
 * SETUP INSTRUCTIONS:
 * 1. Register for Indeed Publisher API at https://ads.indeed.com/jobroll/
 * 2. Or use Indeed's Job Posting API for employers
 * 3. Set the environment variables in .env.local:
 *    - INDEED_PUBLISHER_ID=your_publisher_id (for job search API)
 *    - INDEED_EMPLOYER_ID=your_employer_id (your company's Indeed employer ID)
 *
 * Note: Indeed's API structure differs from other ATS platforms.
 * This client primarily helps with linking to Indeed job postings.
 *
 * API Documentation:
 * - Publisher API: https://ads.indeed.com/jobroll/xmlfeed
 * - Employer Centre: https://employers.indeed.com/
 */

import { Job, JobCategory } from "@/data/jobs";

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const INDEED_PUBLISHER_ID = process.env.INDEED_PUBLISHER_ID;
const INDEED_EMPLOYER_ID = process.env.INDEED_EMPLOYER_ID;
const INDEED_API_BASE = "https://api.indeed.com/ads/apisearch";

// Check if Indeed is configured
export function isIndeedConfigured(): boolean {
  return Boolean(INDEED_PUBLISHER_ID || INDEED_EMPLOYER_ID);
}

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Indeed job listing from API
 */
interface IndeedJob {
  jobtitle: string;
  company: string;
  city: string;
  state: string;
  country: string;
  formattedLocation: string;
  source: string;
  date: string;
  snippet: string;
  url: string;
  onmousedown: string;
  jobkey: string;
  sponsored: boolean;
  expired: boolean;
  indeedApply: boolean;
  formattedLocationFull: string;
  formattedRelativeTime: string;
  stations?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Indeed API response
 */
interface IndeedSearchResponse {
  version: number;
  query: string;
  location: string;
  dupefilter: boolean;
  highlight: boolean;
  totalResults: number;
  start: number;
  end: number;
  pageNumber: number;
  results: IndeedJob[];
}

/**
 * Options for searching Indeed jobs
 */
interface IndeedSearchOptions {
  query?: string;
  location?: string;
  radius?: number;
  jobType?: "fulltime" | "parttime" | "contract" | "internship" | "temporary";
  limit?: number;
  start?: number;
  fromAge?: number; // Days since posting
  sort?: "relevance" | "date";
}

// ═══════════════════════════════════════════════════════════════════════════
// API CLIENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Search for jobs on Indeed
 * Note: This uses the Publisher API which searches Indeed's job index
 * For company-specific jobs, filter by company name
 */
export async function searchIndeedJobs(
  options: IndeedSearchOptions = {}
): Promise<IndeedJob[]> {
  if (!INDEED_PUBLISHER_ID) {
    throw new Error(
      "Indeed Publisher ID not configured. Set INDEED_PUBLISHER_ID environment variable."
    );
  }

  const params = new URLSearchParams({
    publisher: INDEED_PUBLISHER_ID,
    format: "json",
    v: "2",
    // Search for Metrosure jobs by default
    q: options.query || "Metrosure",
    l: options.location || "South Africa",
    sort: options.sort || "date",
    radius: String(options.radius || 50),
    limit: String(options.limit || 25),
    start: String(options.start || 0),
    fromage: String(options.fromAge || 30), // Jobs from last 30 days
    highlight: "0",
    latlong: "1",
    co: "ZA", // Country: South Africa
  });

  if (options.jobType) {
    params.set("jt", options.jobType);
  }

  const url = `${INDEED_API_BASE}?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Indeed API error: ${response.status} ${response.statusText}`);
    }

    const data: IndeedSearchResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Indeed API request failed:", error);
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA TRANSFORMATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Map job title to category
 */
function mapTitleToCategory(title: string): string {
  const titleLower = title.toLowerCase();

  if (titleLower.includes("sales") || titleLower.includes("telesales")) {
    return "sales";
  }
  if (titleLower.includes("call") || titleLower.includes("customer service")) {
    return "call-centre";
  }
  if (titleLower.includes("admin") || titleLower.includes("administrator")) {
    return "admin";
  }

  return "other";
}

/**
 * Map job title to department
 */
function mapTitleToDepartment(title: string): string {
  const titleLower = title.toLowerCase();

  if (titleLower.includes("sales") || titleLower.includes("telesales")) {
    return "Sales";
  }
  if (titleLower.includes("call")) {
    return "Customer Service";
  }
  if (titleLower.includes("admin")) {
    return "Operations";
  }

  return "General";
}

/**
 * Generate a URL-friendly slug from a title and job key
 */
function generateSlug(title: string, jobKey: string): string {
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50);

  return `${titleSlug}-${jobKey.slice(0, 8)}`;
}

/**
 * Transform an Indeed job to our Job format
 */
export function transformIndeedJob(indeedJob: IndeedJob): Job {
  const slug = generateSlug(indeedJob.jobtitle, indeedJob.jobkey);

  // Parse date
  const datePosted = new Date(indeedJob.date).toISOString().split("T")[0];
  const validThroughDate = new Date(indeedJob.date);
  validThroughDate.setMonth(validThroughDate.getMonth() + 6);

  // Clean up snippet (remove HTML)
  const cleanSnippet = indeedJob.snippet
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  return {
    id: indeedJob.jobkey,
    slug,
    title: indeedJob.jobtitle,
    department: mapTitleToDepartment(indeedJob.jobtitle),
    category: mapTitleToCategory(indeedJob.jobtitle),
    location: indeedJob.formattedLocation || `${indeedJob.city}, ${indeedJob.state}`,
    type: "Full-time",
    description: cleanSnippet || `Join our team as a ${indeedJob.jobtitle}.`,
    metaDescription: `${indeedJob.jobtitle} position at ${indeedJob.company}. ${indeedJob.formattedLocation}. Apply now on Indeed!`,
    responsibilities: [],
    requirements: [],
    offers: [],
    datePosted,
    validThrough: validThroughDate.toISOString().split("T")[0],
    // Store Indeed-specific data for application redirect
    _indeed: {
      jobKey: indeedJob.jobkey,
      url: indeedJob.url,
      indeedApply: indeedJob.indeedApply,
    },
  } as Job & { _indeed: { jobKey: string; url: string; indeedApply: boolean } };
}

// ═══════════════════════════════════════════════════════════════════════════
// HIGH-LEVEL API FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Fetch Metrosure jobs from Indeed
 * Returns null if Indeed is not configured
 */
export async function getIndeedJobs(): Promise<Job[] | null> {
  if (!isIndeedConfigured()) {
    return null;
  }

  // If we only have employer ID (no publisher ID), we can't search
  if (!INDEED_PUBLISHER_ID) {
    console.warn("Indeed Publisher ID not set - cannot search for jobs");
    return null;
  }

  try {
    // Search for Metrosure jobs
    const indeedJobs = await searchIndeedJobs({
      query: "Metrosure",
      location: "South Africa",
      fromAge: 60, // Jobs from last 60 days
      limit: 25,
    });

    // Filter to only Metrosure company jobs
    const metrosureJobs = indeedJobs.filter(
      (job) =>
        job.company.toLowerCase().includes("metrosure") ||
        job.company.toLowerCase().includes("metro sure")
    );

    return metrosureJobs.map(transformIndeedJob);
  } catch (error) {
    console.error("Failed to fetch jobs from Indeed:", error);
    return null;
  }
}

/**
 * Get the Indeed application URL for a job
 */
export function getIndeedApplicationUrl(jobKey: string): string {
  return `https://za.indeed.com/viewjob?jk=${jobKey}`;
}

/**
 * Get the Indeed Apply URL (direct application) if available
 */
export function getIndeedApplyUrl(jobKey: string): string {
  return `https://za.indeed.com/applystart?jk=${jobKey}`;
}

/**
 * Generate Metrosure's Indeed company page URL
 */
export function getIndeedCompanyUrl(): string {
  if (INDEED_EMPLOYER_ID) {
    return `https://za.indeed.com/cmp/${INDEED_EMPLOYER_ID}/jobs`;
  }
  // Fallback to search
  return "https://za.indeed.com/jobs?q=Metrosure&l=South+Africa";
}

/**
 * Get categories from Indeed jobs (dynamically generated)
 */
export function getIndeedCategories(jobs: Job[]): JobCategory[] {
  const categorySet = new Set<string>();
  jobs.forEach((job) => categorySet.add(job.category));

  const categories: JobCategory[] = [{ id: "all", label: "All Positions" }];

  const categoryLabels: Record<string, string> = {
    sales: "Sales",
    "call-centre": "Call Centre",
    admin: "Administration",
    other: "Other",
  };

  categorySet.forEach((category) => {
    if (categoryLabels[category]) {
      categories.push({ id: category, label: categoryLabels[category] });
    }
  });

  return categories;
}

/**
 * Check if a job should redirect to Indeed for applications
 */
export function shouldRedirectToIndeed(job: Job): boolean {
  const indeedData = (job as Job & { _indeed?: { jobKey: string } })._indeed;
  return Boolean(indeedData?.jobKey && isIndeedConfigured());
}
