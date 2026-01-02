/**
 * B2B Case Studies Data
 *
 * Centralised data for partnership success stories.
 * Used on the Partners page to demonstrate B2B value.
 *
 * Created: Session 70 (January 2026)
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface CaseStudyMetric {
  value: string;
  label: string;
  icon: string;
}

export interface CaseStudy {
  id: string;
  partnerName: string;
  partnerType: string;
  industry: string;
  location: string;
  logoPlaceholder: string; // Initials for avatar fallback
  challenge: string;
  solution: string[];
  results: string[];
  metrics: CaseStudyMetric[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
  duration: string; // e.g., "6 months", "12 months"
  servicesUsed: string[];
  featured: boolean;
}

export interface CaseStudyStats {
  label: string;
  value: string;
  description: string;
}

// =============================================================================
// HERO STATISTICS
// =============================================================================

export const caseStudyHeroStats: CaseStudyStats[] = [
  {
    label: "Average Sales Increase",
    value: "75%",
    description: "Within 6 months of partnership launch",
  },
  {
    label: "QA Standard",
    value: "95%",
    description: "Daily quality assurance average",
  },
  {
    label: "Jobs Created",
    value: "5,000+",
    description: "Since 2013 across South Africa",
  },
  {
    label: "Provincial Coverage",
    value: "7",
    description: "Provinces with active partnerships",
  },
];

// =============================================================================
// CASE STUDIES
// =============================================================================

export const caseStudies: CaseStudy[] = [
  {
    id: "tfg-jet-partnership",
    partnerName: "TFG Retail (Jet Stores)",
    partnerType: "National Retail Chain",
    industry: "Fashion & Home",
    location: "Gauteng, KwaZulu-Natal, Western Cape",
    logoPlaceholder: "TFG",
    challenge:
      "TFG sought to offer insurance products in their Jet stores without diverting focus from core retail operations. They needed a partner who could deploy trained, FSP-compliant staff while maintaining the Jet brand experience. Previous attempts with other providers had resulted in customer complaints and compliance issues.",
    solution: [
      "Deployed dedicated sales teams across 45 Jet locations in three provinces",
      "Provided comprehensive FAIS training and ongoing compliance management",
      "Implemented co-branded point-of-sale materials matching Jet's aesthetic",
      "Established weekly performance reviews with regional store managers",
      "Created seamless integration with existing store operations and foot traffic patterns",
    ],
    results: [
      "Insurance attachment rate increased from 3% to 18% of qualifying transactions",
      "Zero compliance incidents across 24-month partnership period",
      "Customer satisfaction scores for insurance consultations averaged 4.7/5",
      "Partnership expanded from 12 pilot stores to 45 locations within 18 months",
      "Created 127 permanent jobs across the Jet network",
    ],
    metrics: [
      { value: "45", label: "Store Locations", icon: "store" },
      { value: "127", label: "Jobs Created", icon: "groups" },
      { value: "18%", label: "Attachment Rate", icon: "trending_up" },
      { value: "4.7/5", label: "Customer Rating", icon: "star" },
    ],
    quote: {
      text: "Metrosure understood that our customers come to Jet for value and trust. Their teams feel like part of our stores, not an add-on. The compliance headaches we had before are gone, and we're seeing real revenue from a service we couldn't offer ourselves.",
      author: "Regional Operations Manager",
      role: "TFG Retail • Gauteng Region",
    },
    duration: "24 months",
    servicesUsed: ["instore-campaigns", "outsourced-sales", "credit-facility"],
    featured: true,
  },
  {
    id: "electronics-retailer",
    partnerName: "TechZone Electronics",
    partnerType: "Electronics Retail Chain",
    industry: "Consumer Electronics",
    location: "Gauteng (Tembisa, Soweto, Pretoria)",
    logoPlaceholder: "TZ",
    challenge:
      "TechZone struggled with high device finance default rates and wanted to offer device insurance at point of sale. Their staff lacked the licensing and training to sell financial products, and they had no infrastructure for managing insurance claims or compliance.",
    solution: [
      "Integrated device leasing and insurance sales at all four store locations",
      "Trained Metrosure advisors positioned alongside device sales counters",
      "Implemented quick-approval financing with bundled insurance options",
      "Established same-day claims processing for device damage and theft",
      "Created monthly performance dashboards for store owners",
    ],
    results: [
      "Device insurance attachment rate reached 62% on financed purchases",
      "Default rates on device financing reduced by 35%",
      "Store revenue from financial services increased by 82% year-on-year",
      "Expanded from 2 advisors to 18 permanent staff across 4 locations",
      "Revenue share exceeded monthly space costs within 5 months",
    ],
    metrics: [
      { value: "62%", label: "Insurance Uptake", icon: "verified_user" },
      { value: "82%", label: "Revenue Growth", icon: "trending_up" },
      { value: "18", label: "Staff Employed", icon: "badge" },
      { value: "35%", label: "Default Reduction", icon: "security" },
    ],
    quote: {
      text: "We started with two advisors in Tembisa as a trial. Within a year, we've got 18 permanent Metrosure staff across all four stores. The revenue share covers more than our space costs—it's become a proper income stream for us, not just a side benefit.",
      author: "Sibusiso Dube",
      role: "Owner • TechZone Electronics",
    },
    duration: "12 months",
    servicesUsed: ["device-leasing", "device-insurance", "instore-campaigns"],
    featured: true,
  },
  {
    id: "furniture-home-retailer",
    partnerName: "HomeStyle Furnishers",
    partnerType: "Furniture & Appliances",
    industry: "Home Furnishings",
    location: "KwaZulu-Natal (Durban, Pietermaritzburg)",
    logoPlaceholder: "HS",
    challenge:
      "HomeStyle wanted to offer credit life and funeral cover to customers financing furniture purchases. They faced pressure from insurers requiring FSP licensing they couldn't obtain without significant investment. Previous partnership attempts had been complicated by poor customer experiences and slow claims.",
    solution: [
      "Positioned trained credit life specialists at financing desks",
      "Developed simplified product explanations suited to furniture buyers",
      "Implemented 24-hour claims payout commitment for funeral cover",
      "Created bilingual sales materials in English and isiZulu",
      "Established community hiring programme focusing on local youth",
    ],
    results: [
      "Credit life attachment on financed furniture reached 71%",
      "Funeral cover sales averaged 23 policies per store monthly",
      "Claims turnaround improved from 7 days to under 48 hours",
      "Created 42 jobs across 6 store locations",
      "Store managers reported 28% reduction in credit defaults",
    ],
    metrics: [
      { value: "71%", label: "Credit Life Uptake", icon: "payments" },
      { value: "48hrs", label: "Claims Payout", icon: "schedule" },
      { value: "42", label: "Jobs Created", icon: "groups" },
      { value: "28%", label: "Default Reduction", icon: "trending_down" },
    ],
    quote: {
      text: "Every sales advisor Metrosure places is FSP-licensed and properly trained. Our customers notice the difference—they get real advice, not pushy sales tactics. The 95% QA standard they maintain gives us confidence that our brand is protected.",
      author: "Priya Naidoo",
      role: "Operations Director • HomeStyle Furnishers",
    },
    duration: "18 months",
    servicesUsed: ["instore-campaigns", "credit-facility", "call-centre"],
    featured: false,
  },
];

// =============================================================================
// IMPACT SUMMARY
// =============================================================================

export const partnershipImpact = {
  totalJobsCreated: "5,000+",
  averageSalesIncrease: "75%",
  qaStandard: "95%",
  provincialCoverage: 7,
  yearsOperating: 12, // Since 2013
  activePartnerships: "100+",
  retailLocations: "200+",
};

// =============================================================================
// WHY PARTNER REASONS
// =============================================================================

export interface WhyPartnerReason {
  icon: string;
  title: string;
  description: string;
}

export const whyPartnerReasons: WhyPartnerReason[] = [
  {
    icon: "verified",
    title: "FSP Compliance Handled",
    description:
      "We manage all FAIS requirements, licensing, and regulatory submissions. Your business simply provides the space.",
  },
  {
    icon: "trending_up",
    title: "Proven Revenue Growth",
    description:
      "Partners see an average 75% increase in financial services revenue within the first 6 months of launch.",
  },
  {
    icon: "groups",
    title: "Youth Employment Focus",
    description:
      "We recruit and develop young South Africans, creating meaningful jobs while building your sales capability.",
  },
  {
    icon: "verified_user",
    title: "95% Quality Standard",
    description:
      "Our dedicated QA team monitors every interaction, ensuring customer satisfaction and brand protection.",
  },
  {
    icon: "support_agent",
    title: "End-to-End Support",
    description:
      "From recruitment to training to performance management—we handle everything so you can focus on retail.",
  },
  {
    icon: "analytics",
    title: "Data-Driven Insights",
    description:
      "Monthly performance reports with customer profiling and segmentation to optimise your partnership.",
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get a case study by its ID
 */
export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.id === id);
}

/**
 * Get featured case studies only
 */
export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((study) => study.featured);
}

/**
 * Get case studies by industry
 */
export function getCaseStudiesByIndustry(industry: string): CaseStudy[] {
  return caseStudies.filter((study) =>
    study.industry.toLowerCase().includes(industry.toLowerCase())
  );
}

/**
 * Get total jobs created across all case studies
 */
export function getTotalJobsFromCaseStudies(): number {
  return caseStudies.reduce((total, study) => {
    const jobsMetric = study.metrics.find((m) => m.label === "Jobs Created");
    if (jobsMetric) {
      return total + parseInt(jobsMetric.value.replace(/\D/g, ""), 10);
    }
    return total;
  }, 0);
}

/**
 * Get all unique services used across case studies
 */
export function getServicesUsedAcrossCaseStudies(): string[] {
  const services = new Set<string>();
  caseStudies.forEach((study) => {
    study.servicesUsed.forEach((service) => services.add(service));
  });
  return Array.from(services);
}
