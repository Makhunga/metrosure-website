/**
 * Opportunities data for the Latest Opportunities section
 * Features careers, partnerships, and corporate solutions
 */

export type OpportunityType = "career" | "partner" | "corporate";

export interface OpportunityCategory {
  id: OpportunityType;
  label: string;
  icon: string;
}

export interface Opportunity {
  id: string;
  slug: string;
  type: OpportunityType;
  category: OpportunityCategory;
  title: string;
  description: string;
  ctaText: string;
  link: string;
  highlight?: string;
}

export const opportunityCategories: OpportunityCategory[] = [
  { id: "career", label: "CAREERS", icon: "work" },
  { id: "partner", label: "PARTNERSHIPS", icon: "handshake" },
  { id: "corporate", label: "CORPORATE", icon: "business" },
];

export const opportunities: Opportunity[] = [
  {
    id: "careers-open",
    slug: "careers",
    type: "career",
    category: opportunityCategories[0],
    title: "Join Our Growing Team",
    description:
      "Sales consultants, call centre agents, and trainee positions available across all provinces.",
    ctaText: "View Open Positions",
    link: "/careers",
    highlight: "Hiring Now",
  },
  {
    id: "partner-retail",
    slug: "partners",
    type: "partner",
    category: opportunityCategories[1],
    title: "Become a Retail Partner",
    description:
      "Earn commission by hosting our sales agents who sell financial products from our partner insurers. In-store, call centre, or outsourced teams available.",
    ctaText: "Partner With Us",
    link: "/partners",
  },
  {
    id: "corporate-solutions",
    slug: "corporate",
    type: "corporate",
    category: opportunityCategories[2],
    title: "Corporate Employee Benefits",
    description:
      "Group medical aid, retirement funds, and risk cover for businesses of all sizes.",
    ctaText: "Explore Solutions",
    link: "/corporate",
  },
];

// Helper functions
export function getOpportunityByType(
  type: OpportunityType
): Opportunity | undefined {
  return opportunities.find((o) => o.type === type);
}

export function getCategoryById(
  id: OpportunityType
): OpportunityCategory | undefined {
  return opportunityCategories.find((c) => c.id === id);
}
