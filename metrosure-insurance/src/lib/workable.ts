/**
 * Workable API Client
 *
 * This module provides integration with Workable's API for managing job listings.
 * It supports fetching jobs, individual job details, and generating application URLs.
 *
 * SETUP INSTRUCTIONS:
 * 1. Sign up for Workable at https://www.workable.com/
 * 2. Go to Settings > Integrations > API Access Token
 * 3. Generate an API token with "Read" permissions
 * 4. Set the environment variables in .env.local:
 *    - WORKABLE_API_TOKEN=your_api_token_here
 *    - WORKABLE_SUBDOMAIN=your_company_subdomain (e.g., "metrosure" from metrosure.workable.com)
 *
 * API Documentation: https://workable.readme.io/reference
 */

import { Job, JobCategory } from "@/data/jobs";

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const WORKABLE_API_TOKEN = process.env.WORKABLE_API_TOKEN;
const WORKABLE_SUBDOMAIN = process.env.WORKABLE_SUBDOMAIN;
const WORKABLE_API_BASE = "https://www.workable.com/spi/v3/accounts";

// Check if Workable is configured
export function isWorkableConfigured(): boolean {
  return Boolean(WORKABLE_API_TOKEN && WORKABLE_SUBDOMAIN);
}

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Workable job listing from API
 */
interface WorkableJob {
  id: string;
  shortcode: string;
  title: string;
  department: string;
  department_hierarchy?: { id: number; name: string }[];
  url: string;
  application_url: string;
  shortlink: string;
  location: {
    location_str: string;
    country: string;
    country_code: string;
    region: string;
    region_code: string;
    city: string;
    zip_code: string;
    telecommuting: boolean;
  };
  created_at: string;
  full_title: string;
  employment_type?: string;
  workplace?: string;
  experience?: string;
  education?: string;
  description?: string;
  requirements?: string;
  benefits?: string;
  salary?: {
    salary_from: number;
    salary_to: number;
    salary_currency: string;
  };
  state: "draft" | "published" | "closed" | "archived";
}

/**
 * Workable API response for jobs list
 */
interface WorkableJobsResponse {
  jobs: WorkableJob[];
  paging?: {
    next?: string;
  };
}

/**
 * Workable API response for single job
 */
interface WorkableJobResponse extends WorkableJob {
  description: string;
  requirements: string;
  benefits: string;
}

/**
 * Options for fetching jobs
 */
interface FetchJobsOptions {
  state?: "draft" | "published" | "closed" | "archived";
  limit?: number;
  sinceId?: string;
  department?: string;
  location?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// API CLIENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Make an authenticated request to the Workable API
 */
async function workableRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!isWorkableConfigured()) {
    throw new Error(
      "Workable is not configured. Please set WORKABLE_API_TOKEN and WORKABLE_SUBDOMAIN environment variables."
    );
  }

  const url = `${WORKABLE_API_BASE}/${WORKABLE_SUBDOMAIN}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${WORKABLE_API_TOKEN}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Workable API error: ${response.status} ${response.statusText} - ${errorBody}`
    );
  }

  return response.json();
}

// ═══════════════════════════════════════════════════════════════════════════
// JOB FETCHING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Fetch all published jobs from Workable
 */
export async function fetchWorkableJobs(
  options: FetchJobsOptions = {}
): Promise<WorkableJob[]> {
  const params = new URLSearchParams();

  // Default to published jobs only
  params.set("state", options.state || "published");

  if (options.limit) {
    params.set("limit", String(options.limit));
  }

  if (options.sinceId) {
    params.set("since_id", options.sinceId);
  }

  const queryString = params.toString();
  const endpoint = `/jobs${queryString ? `?${queryString}` : ""}`;

  const response = await workableRequest<WorkableJobsResponse>(endpoint);
  return response.jobs;
}

/**
 * Fetch a single job by its shortcode
 */
export async function fetchWorkableJob(
  shortcode: string
): Promise<WorkableJobResponse> {
  return workableRequest<WorkableJobResponse>(`/jobs/${shortcode}`);
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA TRANSFORMATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Map department name to category ID
 */
function mapDepartmentToCategory(department: string): string {
  const departmentLower = department.toLowerCase();

  if (departmentLower.includes("sales") || departmentLower.includes("telesales")) {
    return "sales";
  }
  if (departmentLower.includes("call") || departmentLower.includes("customer service")) {
    return "call-centre";
  }
  if (departmentLower.includes("admin") || departmentLower.includes("operations")) {
    return "admin";
  }

  return "other";
}

/**
 * Convert Workable employment type to display format
 */
function formatEmploymentType(type?: string): string {
  if (!type) return "Full-time";

  const typeMap: Record<string, string> = {
    full_time: "Full-time",
    part_time: "Part-time",
    contract: "Contract",
    temporary: "Temporary",
    internship: "Internship",
    volunteer: "Volunteer",
  };

  return typeMap[type] || type;
}

/**
 * Parse HTML content into bullet points
 */
function parseHtmlToBulletPoints(html: string): string[] {
  if (!html) return [];

  // Remove HTML tags and split by newlines or list items
  const text = html
    .replace(/<li[^>]*>/gi, "\n• ")
    .replace(/<\/li>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');

  // Split into lines and clean up
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => (line.startsWith("•") ? line.slice(1).trim() : line));
}

/**
 * Generate a URL-friendly slug from a title
 */
function generateSlug(title: string, shortcode: string): string {
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50);

  return `${titleSlug}-${shortcode}`;
}

/**
 * Transform a Workable job to our Job format
 */
export function transformWorkableJob(workableJob: WorkableJobResponse): Job {
  const slug = generateSlug(workableJob.title, workableJob.shortcode);

  // Parse responsibilities from description
  const responsibilities = parseHtmlToBulletPoints(workableJob.description || "");

  // Parse requirements
  const requirements = parseHtmlToBulletPoints(workableJob.requirements || "");

  // Parse benefits/offers
  const offers = parseHtmlToBulletPoints(workableJob.benefits || "");

  // Calculate valid through date (6 months from created)
  const createdDate = new Date(workableJob.created_at);
  const validThroughDate = new Date(createdDate);
  validThroughDate.setMonth(validThroughDate.getMonth() + 6);

  return {
    id: workableJob.shortcode,
    slug,
    title: workableJob.title,
    department: workableJob.department || "General",
    category: mapDepartmentToCategory(workableJob.department || ""),
    location: workableJob.location?.location_str || "South Africa",
    type: formatEmploymentType(workableJob.employment_type),
    description:
      workableJob.description?.replace(/<[^>]+>/g, "").slice(0, 300) ||
      `Join our team as a ${workableJob.title}.`,
    metaDescription:
      `${workableJob.title} position at Metrosure. ${workableJob.location?.location_str || "South Africa"}. Apply now!`,
    responsibilities:
      responsibilities.length > 0
        ? responsibilities.slice(0, 6)
        : ["Key responsibilities will be discussed during the interview"],
    requirements:
      requirements.length > 0
        ? requirements.slice(0, 6)
        : ["Requirements will be discussed during the interview"],
    offers:
      offers.length > 0
        ? offers.slice(0, 6)
        : ["Competitive compensation package", "Professional development opportunities"],
    datePosted: createdDate.toISOString().split("T")[0],
    validThrough: validThroughDate.toISOString().split("T")[0],
    // Store Workable-specific data for application redirect
    _workable: {
      shortcode: workableJob.shortcode,
      applicationUrl: workableJob.application_url,
      shortlink: workableJob.shortlink,
    },
  } as Job & { _workable: { shortcode: string; applicationUrl: string; shortlink: string } };
}

/**
 * Transform a list of Workable jobs (without full details)
 */
export function transformWorkableJobPreview(workableJob: WorkableJob): Job {
  const slug = generateSlug(workableJob.title, workableJob.shortcode);

  const createdDate = new Date(workableJob.created_at);
  const validThroughDate = new Date(createdDate);
  validThroughDate.setMonth(validThroughDate.getMonth() + 6);

  return {
    id: workableJob.shortcode,
    slug,
    title: workableJob.title,
    department: workableJob.department || "General",
    category: mapDepartmentToCategory(workableJob.department || ""),
    location: workableJob.location?.location_str || "South Africa",
    type: formatEmploymentType(workableJob.employment_type),
    description: `Join our team as a ${workableJob.title}.`,
    metaDescription: `${workableJob.title} position at Metrosure. ${workableJob.location?.location_str || "South Africa"}. Apply now!`,
    responsibilities: [],
    requirements: [],
    offers: [],
    datePosted: createdDate.toISOString().split("T")[0],
    validThrough: validThroughDate.toISOString().split("T")[0],
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// HIGH-LEVEL API FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Fetch all jobs from Workable and transform to our format
 * Returns null if Workable is not configured
 */
export async function getWorkableJobs(): Promise<Job[] | null> {
  if (!isWorkableConfigured()) {
    return null;
  }

  try {
    const workableJobs = await fetchWorkableJobs({ state: "published" });
    return workableJobs.map(transformWorkableJobPreview);
  } catch (error) {
    console.error("Failed to fetch jobs from Workable:", error);
    return null;
  }
}

/**
 * Fetch a single job from Workable by shortcode
 * Returns null if Workable is not configured or job not found
 */
export async function getWorkableJob(shortcode: string): Promise<Job | null> {
  if (!isWorkableConfigured()) {
    return null;
  }

  try {
    const workableJob = await fetchWorkableJob(shortcode);
    return transformWorkableJob(workableJob);
  } catch (error) {
    console.error(`Failed to fetch job ${shortcode} from Workable:`, error);
    return null;
  }
}

/**
 * Get the Workable application URL for a job
 * Falls back to internal application form if not available
 */
export function getWorkableApplicationUrl(
  shortcode: string
): string {
  if (!isWorkableConfigured() || !WORKABLE_SUBDOMAIN) {
    return "/careers#apply";
  }

  return `https://apply.workable.com/${WORKABLE_SUBDOMAIN}/${shortcode}`;
}

/**
 * Get categories from Workable jobs (dynamically generated)
 */
export function getWorkableCategories(jobs: Job[]): JobCategory[] {
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
