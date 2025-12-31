/**
 * Partner Services Data
 *
 * Centralised data for the Partners (B2B Retail) page.
 * Defines the six partnership models offered to retailers.
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface PartnerService {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  highlight: "Most Popular" | "New" | null;
}

export interface PartnerServiceSimple {
  id: string;
  label: string;
  description: string;
}

export interface PartnerFAQ {
  question: string;
  answer: string;
}

// =============================================================================
// PARTNER SERVICES (Full Version)
// =============================================================================

export const partnerServices: PartnerService[] = [
  {
    id: "instore-campaigns",
    icon: "campaign",
    title: "In-Store Insurance Campaigns",
    description:
      "We deploy trained sales representatives directly at your retail locations. Our teams engage customers, explain insurance products, and handle the entire sales process.",
    features: [
      "Dedicated sales teams at your location",
      "Full product training provided",
      "Customer engagement strategies",
      "Performance tracking & reporting",
    ],
    highlight: "Most Popular",
  },
  {
    id: "outsourced-sales",
    icon: "groups",
    title: "Outsourced Sales & Marketing",
    description:
      "Let us handle your insurance sales division entirely. From recruitment to training to performance management, we become your in-house insurance arm.",
    features: [
      "End-to-end sales management",
      "Staff recruitment & training",
      "Marketing collateral provided",
      "Ongoing performance coaching",
    ],
    highlight: null,
  },
  {
    id: "credit-facility",
    icon: "credit_card",
    title: "In-Store Credit Facility",
    description:
      "Enable your customers to access credit products alongside their purchases. We handle compliance, applications, and disbursements seamlessly.",
    features: [
      "Quick credit assessments",
      "Compliant lending processes",
      "Integration with your POS",
      "Customer support included",
    ],
    highlight: null,
  },
  {
    id: "device-leasing",
    icon: "devices",
    title: "Device Leasing",
    description:
      "Offer your customers cell phone and device leasing directly at point of sale. We manage the full leasing process while you earn commission on every deal.",
    features: [
      "Cell phone & device financing",
      "Quick approval process",
      "Commission on every lease",
      "Full compliance handled",
    ],
    highlight: null,
  },
  {
    id: "device-insurance",
    icon: "verified_user",
    title: "Device Insurance",
    description:
      "Protect your customers' financed devices with comprehensive insurance coverage. Seamlessly integrated with device sales for maximum uptake.",
    features: [
      "Screen damage protection",
      "Theft & loss coverage",
      "Easy claims process",
      "Bundled with device leasing",
    ],
    highlight: null,
  },
  {
    id: "call-centre",
    icon: "headset_mic",
    title: "Call Centre Services",
    description:
      "Leverage our inhouse call centre for lead generation, customer acquisition, and growing your financial services book with quality clientele.",
    features: [
      "Lead calling (warm & hot leads)",
      "Cold calling for acquisition",
      "Quality assurance (95% average)",
      "Data-driven customer profiling",
    ],
    highlight: "New",
  },
];

// =============================================================================
// PARTNER SERVICES (Simplified for Forms)
// =============================================================================

/**
 * Simplified service list for form checkboxes/selections
 */
export const partnerServicesSimple: PartnerServiceSimple[] = [
  {
    id: "instore-campaigns",
    label: "In-Store Campaigns",
    description: "Insurance sales at point of purchase",
  },
  {
    id: "outsourced-sales",
    label: "Sales & Marketing",
    description: "Dedicated sales team support",
  },
  {
    id: "credit-facility",
    label: "Credit Facility",
    description: "In-store financing options",
  },
  {
    id: "device-leasing",
    label: "Device Leasing",
    description: "Cell phone & device financing",
  },
  {
    id: "device-insurance",
    label: "Device Insurance",
    description: "Protection for financed devices",
  },
  {
    id: "call-centre",
    label: "Call Centre Services",
    description: "Lead generation & customer acquisition",
  },
];

// =============================================================================
// PARTNER FAQs
// =============================================================================

export const partnerFAQs: PartnerFAQ[] = [
  {
    question: "What types of businesses can partner with Metrosure?",
    answer:
      "We partner with a wide range of retail businesses including furniture stores, electronics retailers, clothing stores, supermarkets, and more. If you have a retail location with customer foot traffic, we'd love to explore a partnership. The key requirements are adequate space for our sales team and alignment with our values of community impact.",
  },
  {
    question: "How does the revenue-sharing model work?",
    answer:
      'Our commission structure is transparent and competitive. Partners earn a percentage of each insurance product sold at their location. The exact percentage depends on factors like store volume, product mix, and partnership tier. We provide detailed monthly reports showing all sales and commissions. <strong class="text-[rgb(var(--color-text-main))]">Contact us for a personalised quote.</strong>',
  },
  {
    question: "What training do the in-store sales staff receive?",
    answer:
      "All our sales representatives undergo comprehensive training before deployment. This includes product knowledge (all insurance types we offer), compliance and regulatory requirements, customer service excellence, and sales techniques. Training is ongoing, with regular refresher courses and updates on new products or regulations.",
  },
  {
    question: "How long does it take to set up an in-store campaign?",
    answer:
      'Typical setup takes <strong class="text-[rgb(var(--color-text-main))]">2-4 weeks</strong> from signing the agreement. This includes: Week 1, Agreement finalization and logistics planning; Week 2, Staff selection and training; Week 3, Marketing materials preparation; Week 4, Soft launch and optimisation. Larger deployments may take slightly longer.',
  },
  {
    question: "What insurance products are offered through in-store campaigns?",
    answer:
      'We offer a comprehensive range of products tailored to your customer base: <strong class="text-[rgb(var(--color-text-main))]">Credit Life Insurance</strong>, <strong class="text-[rgb(var(--color-text-main))]">Funeral Cover</strong> (individual and group), <strong class="text-[rgb(var(--color-text-main))]">Life Insurance</strong>, and <strong class="text-[rgb(var(--color-text-main))]">Short-term Insurance</strong> (car, home). Product mix is customised based on your store type and customer demographics.',
  },
  {
    question: "Is my business responsible for any compliance requirements?",
    answer:
      'No. As an <strong class="text-[rgb(var(--color-text-main))]">FSP-licensed provider (47089)</strong>, we handle all regulatory compliance, auditing, and reporting requirements. Your business simply provides the space. Our team manages all FAIS requirements, record-keeping, and regulatory submissions. This is one of the key benefits of partnering with a licensed broker.',
  },
  {
    question: "Can we customise the campaign for our brand?",
    answer:
      "Absolutely! We work with you to create a campaign that complements your store's brand and customer experience. This includes co-branded marketing materials, staff uniforms that match your store aesthetic, and messaging that aligns with your brand values. We believe in partnerships that enhance your brand, not overshadow it.",
  },
  {
    question: "What support does Metrosure provide after launch?",
    answer:
      'Ongoing support includes: <strong class="text-[rgb(var(--color-text-main))]">Dedicated Account Manager</strong> for your partnership; <strong class="text-[rgb(var(--color-text-main))]">Monthly Performance Reviews</strong> with optimization recommendations; <strong class="text-[rgb(var(--color-text-main))]">Staff Management</strong> including replacement if needed; <strong class="text-[rgb(var(--color-text-main))]">Marketing Support</strong> for promotions and campaigns; and <strong class="text-[rgb(var(--color-text-main))]">24/7 Claims Support</strong> for your customers.',
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get a partner service by its ID
 */
export function getPartnerServiceById(id: string): PartnerService | undefined {
  return partnerServices.find((service) => service.id === id);
}

/**
 * Get all service IDs (useful for form validation)
 */
export function getAllServiceIds(): string[] {
  return partnerServices.map((service) => service.id);
}
