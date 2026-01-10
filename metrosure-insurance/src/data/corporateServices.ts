/**
 * Corporate Solutions Data
 *
 * Centralised data for the Corporate Solutions page.
 * All content is market-accurate for South Africa (see CORPORATE_RESEARCH.md).
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface CorporateService {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  highlight?: 'popular' | 'new' | null;
}

export interface CorporateBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface CorporateFAQ {
  question: string;
  answer: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface CorporateStat {
  value: string;
  label: string;
  description?: string;
}

// =============================================================================
// CORPORATE SERVICES
// =============================================================================

export const corporateServices: CorporateService[] = [
  {
    id: 'group-medical-aid',
    icon: 'health_and_safety',
    title: 'Group Medical Aid',
    description:
      'Comprehensive healthcare coverage for your employees and their families. Access to quality medical care through South Africa\'s leading open schemes.',
    features: [
      'Hospital and day-to-day benefits',
      'Chronic medication cover',
      'Dental and optical options',
      'Prescribed Minimum Benefits (PMB) guaranteed',
    ],
    highlight: 'popular',
  },
  {
    id: 'group-funeral',
    icon: 'volunteer_activism',
    title: 'Group Funeral Insurance',
    description:
      'Dignified coverage that supports employees and their families during difficult times. Fast claims processing when it matters most.',
    features: [
      'Cover for employees and dependants',
      'Extended family options available',
      'Claims paid within 48 hours',
      'Funeral assistance services included',
    ],
    highlight: null,
  },
  {
    id: 'group-retirement',
    icon: 'savings',
    title: 'Group Retirement Funds',
    description:
      'Help your employees build financial security with professionally managed pension and provident fund solutions, now with two-pot flexibility.',
    features: [
      'Provident and pension fund options',
      'Two-pot system emergency access',
      'Tax-efficient contributions (up to R350,000)',
      'Regulation 28 compliant investments',
    ],
    highlight: null,
  },
  {
    id: 'employee-benefits',
    icon: 'shield',
    title: 'Employee Benefits Package',
    description:
      'Comprehensive risk cover protecting your employees against life\'s unexpected events, from disability to dread disease.',
    features: [
      'Income protection cover (85% of salary)',
      'Permanent and temporary disability',
      'Dread disease cover (tax-free lump sum)',
      'Group life assurance',
    ],
    highlight: null,
  },
  {
    id: 'estate-planning',
    icon: 'description',
    title: 'Estate Planning',
    description:
      'Help your employees protect their families\' futures with proper estate planning, life cover, and will drafting services.',
    features: [
      'Life cover options',
      'Professional will drafting',
      'Trust creation guidance',
      'Estate duty minimisation strategies',
    ],
    highlight: null,
  },
  {
    id: 'investment-planning',
    icon: 'trending_up',
    title: 'Investment & Retirement Planning',
    description:
      'Expert guidance helping employees make informed decisions about their financial futures through personalised consultations.',
    features: [
      'Retirement gap analysis',
      'Investment strategy advice',
      'Financial education workshops',
      'Annual portfolio reviews',
    ],
    highlight: 'new',
  },
];

// =============================================================================
// BUSINESS BENEFITS
// =============================================================================

export const corporateBenefits: CorporateBenefit[] = [
  {
    icon: 'star',
    title: 'Attract Top Talent',
    description:
      'A comprehensive benefits package makes your company more attractive to skilled professionals in South Africa\'s competitive job market.',
  },
  {
    icon: 'loyalty',
    title: 'Reduce Staff Turnover',
    description:
      'Employees who feel valued and secure are more likely to stay. Quality benefits demonstrate your investment in their wellbeing.',
  },
  {
    icon: 'account_balance',
    title: 'Tax Efficiency',
    description:
      'Employer contributions to retirement funds and medical aid are tax-deductible business expenses, reducing your overall tax burden.',
  },
  {
    icon: 'support_agent',
    title: 'Single Point of Contact',
    description:
      'One dedicated relationship manager handles all your employee benefits needs. No more juggling multiple providers and contacts.',
  },
  {
    icon: 'verified_user',
    title: 'FSCA Compliance',
    description:
      'We manage all Financial Sector Conduct Authority requirements, fund registrations, and compliance obligations on your behalf.',
  },
  {
    icon: 'tune',
    title: 'Flexible Packages',
    description:
      'Scalable solutions that grow with your business. From 10 employees to 10,000, we design packages that fit your budget and needs.',
  },
];

// =============================================================================
// PROCESS STEPS
// =============================================================================

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Needs Assessment',
    description:
      'We analyse your workforce demographics, budget constraints, and strategic objectives to understand your unique requirements.',
    icon: 'search',
  },
  {
    step: 2,
    title: 'Solution Design',
    description:
      'Our team designs a tailored benefits package with detailed costing, comparing options from South Africa\'s leading providers.',
    icon: 'design_services',
  },
  {
    step: 3,
    title: 'Implementation',
    description:
      'Seamless onboarding including employee communication, payroll integration, and FSCA registration within 4-6 weeks.',
    icon: 'rocket_launch',
  },
  {
    step: 4,
    title: 'Ongoing Support',
    description:
      'Regular reviews, claims assistance, and annual renewal negotiations to ensure your benefits remain competitive and compliant.',
    icon: 'handshake',
  },
];

// =============================================================================
// FAQS
// =============================================================================

export const corporateFAQs: CorporateFAQ[] = [
  {
    question: 'What is the minimum number of employees for group cover?',
    answer:
      'Most group schemes work best with 10 or more employees for favourable underwriting and group rates. However, we can arrange cover for smaller groups through specially negotiated arrangements with insurers. Contact us to discuss your specific situation.',
  },
  {
    question: 'How do group retirement funds differ from individual retirement annuities?',
    answer:
      'Group retirement funds benefit from lower fees due to economies of scale, employer contributions (median 10% of salary in SA), and professional fund management. Group life and disability cover is often included at no extra cost. Individual RAs offer more personal control but typically at higher cost.',
  },
  {
    question: 'Can we customise the benefits package?',
    answer:
      'Absolutely. We design packages tailored to your budget and employee needs. You choose which benefits to include (medical aid, retirement, risk cover) and at what levels. Packages can be tiered by employee category or seniority.',
  },
  {
    question: 'What happens when an employee leaves the company?',
    answer:
      'Employees can convert their group cover to individual policies, transfer retirement savings to a preservation fund, or transfer to their new employer\'s scheme. Under the two-pot system, they may also access their savings component. We guide every employee through their options at exit.',
  },
  {
    question: 'How quickly can cover be implemented?',
    answer:
      'Standard implementations take 4-6 weeks from agreement. This includes scheme setup, FSCA registration (if required), employee communication and enrolment, and payroll integration. We can expedite for urgent requirements.',
  },
  {
    question: 'Are employer contributions tax-deductible?',
    answer:
      'Yes. Employer contributions to retirement funds, medical aid, and group risk cover are deductible as business expenses. Employee retirement contributions are deductible up to R350,000 or 27.5% of remuneration annually. We help structure contributions for maximum tax efficiency.',
  },
  {
    question: 'How does the two-pot retirement system affect our employees?',
    answer:
      'Since September 2024, one-third of new retirement contributions go into a savings component that employees can access once per year (minimum R2,000 withdrawal). The remaining two-thirds is preserved for retirement. This gives employees emergency access without sacrificing long-term savings.',
  },
  {
    question: 'What regulatory compliance is required?',
    answer:
      'Employee benefits in South Africa are regulated by the FSCA (Financial Sector Conduct Authority), CMS (Council for Medical Schemes), and must comply with POPIA for data protection. As FSP-registered brokers, we handle all compliance requirements on your behalf.',
  },
];

// =============================================================================
// HERO STATISTICS
// =============================================================================

export const corporateStats: CorporateStat[] = [
  {
    value: '100+',
    label: 'Corporate Clients',
    description: 'Trusted by businesses across South Africa',
  },
  {
    value: '10,000+',
    label: 'Employees Covered',
    description: 'Protected under our group schemes',
  },
  {
    value: '48hrs',
    label: 'Claims Processed',
    description: 'Fast funeral and disability claims',
  },
  {
    value: '13+',
    label: 'Years Experience',
    description: 'Since Metrosure Group founding in 2013',
  },
];

// =============================================================================
// INQUIRY FORM OPTIONS
// =============================================================================

export const employeeCountOptions = [
  { value: '10-50', label: '10-50 employees' },
  { value: '51-100', label: '51-100 employees' },
  { value: '101-250', label: '101-250 employees' },
  { value: '251-500', label: '251-500 employees' },
  { value: '500+', label: '500+ employees' },
] as const;

export const serviceInterestOptions = corporateServices.map((service) => ({
  id: service.id,
  label: service.title,
}));

// =============================================================================
// SEO METADATA
// =============================================================================

export const corporateSEO = {
  title: 'Corporate Solutions | Group Benefits & Employee Insurance',
  description:
    'Comprehensive corporate employee benefits including group medical aid, retirement funds, funeral cover, and risk insurance. FSP 47089. Serving South African businesses since 2013.',
  keywords: [
    'corporate employee benefits',
    'group medical aid South Africa',
    'group retirement fund',
    'group funeral cover',
    'employee benefits package',
    'FSCA compliant',
    'group life insurance',
    'income protection',
    'dread disease cover',
    'two-pot retirement system',
  ],
};
