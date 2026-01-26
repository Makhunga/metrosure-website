/**
 * About Page Data
 *
 * Centralised data for the About page.
 * Contains company statistics, values, timeline, and team information.
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface CompanyStat {
  value: string;
  label: string;
}

export interface CoreValue {
  icon: string;
  title: string;
  description: string;
}

export interface TimelineItem {
  icon: string;
  year: string;
  number: string;
  title: string;
  description: string;
  isSpecial?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  initials?: string;
  quote: string;
  icon: string;
  badges: string[];
}

// =============================================================================
// COMPANY STATISTICS
// =============================================================================

export const companyStats: CompanyStat[] = [
  { value: "5,000+", label: "Jobs Created Nationwide" },
  { value: "75%", label: "Average Partner Sales Growth" },
  { value: "95%", label: "Daily Quality Standard" },
  { value: "7", label: "Provinces Covered" },
];

// =============================================================================
// CORE VALUES
// =============================================================================

export const coreValues: CoreValue[] = [
  {
    icon: "groups",
    title: "Respect",
    description:
      "We acknowledge that everyone has a unique role. No one person is more important than another, we value your story and treat you as an individual.",
  },
  {
    icon: "workspace_premium",
    title: "Quality",
    description:
      "We always strive to achieve the best. You deserve the best advice and the best service, every single time.",
  },
  {
    icon: "favorite",
    title: "Passion",
    description:
      "We are passionate about what we do. This isn't just a job for us, it's our purpose to help you and your family feel secure.",
  },
  {
    icon: "handshake",
    title: "Integrity",
    description:
      "We do the right thing no matter who is watching. Honesty is at the heart of everything we do.",
  },
  {
    icon: "star",
    title: "Excellence",
    description:
      "We strive to excel at everything we do. Good enough isn't enough, we push ourselves to go above and beyond for you.",
  },
];

// =============================================================================
// COMPANY TIMELINE
// =============================================================================

export const companyTimeline: TimelineItem[] = [
  {
    icon: "corporate_fare",
    year: "2013",
    number: "13",
    title: "Metrosure Group Founded",
    description:
      "Metrosure Group was established as an umbrella body for business ventures, laying the foundation for what would become a leading sales and marketing company in financial services.",
  },
  {
    icon: "flag",
    year: "2016",
    number: "16",
    title: "Insurance Brokers Launch",
    description:
      "Metrosure Insurance Brokers was founded in Durban by BG Chiliza with a vision to take the company to a formidable position in the South African market.",
  },
  {
    icon: "verified",
    year: "2017",
    number: "17",
    title: "FSP Authorisation",
    description:
      "Became an Authorised Financial Service Provider (FSP 47089), regulated by the Financial Services Conduct Authority.",
  },
  {
    icon: "location_on",
    year: "2020",
    number: "20",
    title: "National Expansion",
    description:
      "Expanded across South Africa with regional offices in Johannesburg, Pretoria, Pietermaritzburg, Bloemfontein, and more.",
  },
  {
    icon: "storefront",
    year: "2022",
    number: "22",
    title: "100+ Retail Partners",
    description:
      "Reached a milestone of 100+ retail partnerships across South Africa, creating employment opportunities in local communities.",
  },
  {
    icon: "groups",
    year: "2025",
    number: "25",
    title: "5,000+ Jobs Created",
    description:
      "Proud to have created over 5,000 employment opportunities through our retail partnership programme, with a commitment to grow even more.",
    isSpecial: true,
  },
];

// =============================================================================
// EXECUTIVE TEAM
// =============================================================================

export const executiveTeam: TeamMember[] = [
  {
    name: "BG Chiliza",
    role: "Chief Executive Officer",
    image: "/images/team-bg-chiliza.jpg",
    quote:
      "We're taking South Africa to the future, building a company known for consistency, reliability and integrity.",
    icon: "format_quote",
    badges: ["Founder & Visionary", "Financial Services Expert", "Community Builder"],
  },
  {
    name: "FP Tshabalala",
    role: "Chief Operations Officer",
    image: "/images/team-fp-tshabalala.jpg",
    quote:
      "Every day we build meaningful connections with our customers, transforming their experience through dedication and excellence.",
    icon: "trending_up",
    badges: ["Strategic Leadership", "Sales and Marketing Veteran", "Growth Driver"],
  },
  {
    name: "S Basi",
    role: "Chief Financial Officer",
    image: "",
    initials: "SB",
    quote:
      "Sound financial management is the foundation that lets us serve our clients with confidence.",
    icon: "account_balance",
    badges: ["Financial Governance", "Risk Management", "Corporate Finance"],
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get a team member by name
 */
export function getTeamMemberByName(name: string): TeamMember | undefined {
  return executiveTeam.find(
    (member) => member.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Get timeline items up to a specific year
 */
export function getTimelineUpToYear(year: string): TimelineItem[] {
  return companyTimeline.filter((item) => parseInt(item.year) <= parseInt(year));
}
