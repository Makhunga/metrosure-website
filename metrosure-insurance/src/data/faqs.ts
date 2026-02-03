/**
 * Centralised FAQ Data
 * Comprehensive FAQs for the help centre and product pages
 * Sources: ASISA, FSCA, POPIA, industry best practices
 */

// =============================================================================
// Types
// =============================================================================

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  link?: string;
  linkText?: string;
}

export type FAQCategory =
  | "getting-started"
  | "claims"
  | "policies"
  | "life-cover"
  | "funeral-cover"
  | "auto-insurance"
  | "home-insurance"
  | "business"
  | "partnerships"
  | "legal"
  | "payments";

export interface FAQCategoryInfo {
  id: FAQCategory;
  label: string;
  icon: string;
  description: string;
}

// =============================================================================
// Category Definitions
// =============================================================================

export const faqCategories: FAQCategoryInfo[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: "rocket_launch",
    description: "New to insurance? Start here",
  },
  {
    id: "claims",
    label: "Claims Process",
    icon: "assignment",
    description: "How to file and track claims",
  },
  {
    id: "policies",
    label: "Managing Policies",
    icon: "folder_managed",
    description: "Updates, renewals, and cancellations",
  },
  {
    id: "life-cover",
    label: "Life Cover",
    icon: "favorite",
    description: "Life insurance questions",
  },
  {
    id: "funeral-cover",
    label: "Funeral Cover",
    icon: "sentiment_satisfied",
    description: "Funeral policy questions",
  },
  {
    id: "auto-insurance",
    label: "Car Insurance",
    icon: "directions_car",
    description: "Vehicle cover questions",
  },
  {
    id: "home-insurance",
    label: "Home Insurance",
    icon: "home",
    description: "Property cover questions",
  },
  {
    id: "legal",
    label: "Legal & Compliance",
    icon: "gavel",
    description: "POPIA, FAIS, and your rights",
  },
  {
    id: "payments",
    label: "Payments & Billing",
    icon: "payments",
    description: "Premium payments and billing",
  },
  {
    id: "partnerships",
    label: "Retail Partnerships",
    icon: "handshake",
    description: "Become a B2B partner with Metrosure",
  },
  {
    id: "business",
    label: "Business Services",
    icon: "business_center",
    description: "B2B and corporate insurance solutions",
  },
];

// =============================================================================
// FAQ Data
// =============================================================================

export const allFAQs: FAQ[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // Getting Started
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "what-is-metrosure",
    question: "What is Metrosure and how does it work?",
    answer:
      "Metrosure Insurance Brokers is an authorised Financial Services Provider (FSP 47089) that helps South Africans find the right insurance cover. Unlike direct insurers, we work with over 30 leading insurance companies to compare products and find you the best cover at the best price. You get a dedicated portfolio manager who manages your policies and renewals, and guides you through claims with the insurer.",
    category: "getting-started",
    link: "/about",
    linkText: "Learn more about us",
  },
  {
    id: "what-insurance-need",
    question: "What insurance do I actually need?",
    answer:
      "The insurance you need depends on your situation. At minimum, most South Africans should have: funeral cover (to spare your family immediate costs), life cover if you have dependents or debt, car insurance if you own a vehicle, and household contents insurance for your possessions. If you're unsure, our portfolio managers can assess your needs and recommend appropriate cover.",
    category: "getting-started",
    link: "/insurance/compare",
    linkText: "Compare insurance types",
  },
  {
    id: "how-get-quote",
    question: "How do I get an insurance quote?",
    answer:
      "You can get a quote online in about 5-10 minutes by completing our quote form. Alternatively, call us on +27 31 301 1192 or visit one of our offices. Once submitted, our portfolio managers review your details and typically provide a tailored quote within 24 hours. There's no obligation to buy.",
    category: "getting-started",
    link: "/quote",
    linkText: "Get a quote now",
  },
  {
    id: "which-insurers",
    question: "Which insurance companies do you work with?",
    answer:
      "We partner with over 30 leading South African insurers including Liberty, Sanlam, Discovery, Old Mutual, MiWay, King Price, Hollard, Santam, Momentum, and many more. This allows us to compare products across the market and find the best fit for your needs and budget.",
    category: "getting-started",
    link: "/about",
    linkText: "View our partners",
  },
  {
    id: "is-metrosure-legit",
    question: "Is Metrosure a legitimate company?",
    answer:
      "Yes, absolutely. Metrosure Insurance Brokers (Pty) Ltd is an authorised Financial Services Provider regulated by the Financial Sector Conduct Authority (FSCA) under FSP licence number 47089. We've been operating since 2016 with offices in Durban, Pietermaritzburg, Pretoria, and Boksburg. You can verify our FSP status on the FSCA website.",
    category: "getting-started",
    link: "/legal",
    linkText: "View our credentials",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Claims Process
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "how-file-claim",
    question: "How do I file an insurance claim?",
    answer:
      "To file a claim: 1) Contact us immediately on +27 31 301 1192 or email claims@metrosuregroup.co.za. 2) Have your policy number, ID, and incident details ready. 3) We'll guide you through the specific documents needed. 4) We submit your claim to the insurer and follow up on your behalf. For emergencies, most insurers have 24-hour claims lines.",
    category: "claims",
    link: "/claims",
    linkText: "Start a claim",
  },
  {
    id: "claim-documents",
    question: "What documents do I need for a claim?",
    answer:
      "Required documents vary by claim type. Generally you'll need: certified copy of your ID, proof of ownership/value, police report (for theft/accidents), death certificate (for life/funeral claims), medical reports (for disability claims), and photos of damage (for property claims). Your portfolio manager will provide a specific checklist based on your claim.",
    category: "claims",
  },
  {
    id: "claim-timeline",
    question: "How long does a claim take to process?",
    answer:
      "Claim timelines vary by type and complexity. Funeral claims typically pay out within 24-48 hours. Motor claims for minor damage take 5-10 working days. Life insurance claims usually take 5-14 working days. Complex or disputed claims may take longer. We follow up regularly with insurers and keep you updated throughout the process.",
    category: "claims",
  },
  {
    id: "claim-rejected",
    question: "What if my claim is rejected?",
    answer:
      "If your claim is rejected, we'll explain the reasons and explore your options. You have the right to dispute the decision through the insurer's internal complaints process. If unresolved, you can escalate to the Ombudsman for Short-term Insurance (OSTI) or Long-term Insurance Ombudsman (free service). We can guide you through the appeals process.",
    category: "claims",
  },
  {
    id: "claim-affect-premium",
    question: "Will making a claim affect my premium?",
    answer:
      "Claims can affect future premiums, but not always. Insurers consider claim frequency and type. A single claim usually has minimal impact. Multiple claims in a short period may increase premiums or affect your no-claim bonus. We can advise whether a small claim is worth lodging versus paying excess and preserving your claims record.",
    category: "claims",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Policy Management
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "update-details",
    question: "How do I update my personal details?",
    answer:
      "Contact your portfolio manager on +27 31 301 1192 or email info@metrosuregroup.co.za with the changes. Common updates include address changes, adding/removing drivers, updating beneficiaries, and changing banking details. Some changes may affect your premium. We'll confirm any adjustments in writing.",
    category: "policies",
  },
  {
    id: "change-beneficiary",
    question: "How do I change my beneficiaries?",
    answer:
      "To update beneficiaries on life or funeral policies: 1) Contact us with the new beneficiary's full name, ID number, relationship to you, and percentage allocation. 2) We'll send you a beneficiary nomination form. 3) Complete and return the signed form. Changes typically take effect within 48 hours of processing. Keep beneficiary details current - it's crucial for smooth claims.",
    category: "policies",
    link: "/contact",
    linkText: "Contact us to update",
  },
  {
    id: "cancel-policy",
    question: "How do I cancel my policy?",
    answer:
      "To cancel, contact us in writing (email is fine) with your policy number and requested cancellation date. Most policies require 30 days' notice. We'll confirm cancellation in writing and any pro-rata refund due. Before cancelling, consider: are you replacing cover elsewhere? Is there a waiting period on the new policy? We can help you evaluate options.",
    category: "policies",
  },
  {
    id: "policy-lapse",
    question: "What happens if I miss a premium payment?",
    answer:
      "If you miss a payment, most policies have a grace period (typically 30-31 days) during which cover continues. After this, the policy lapses and cover stops. Some insurers offer reinstatement within 3-6 months subject to health checks and arrears payment. Contact us immediately if you're struggling to pay - we may be able to arrange reduced cover or payment plans.",
    category: "policies",
  },
  {
    id: "get-policy-documents",
    question: "How do I get copies of my policy documents?",
    answer:
      "Contact your portfolio manager and we'll email or post copies of your policy schedule, terms and conditions, and any endorsements. You should receive documents within 2 business days. Keep digital and physical copies of all insurance documents in a safe place.",
    category: "policies",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Life Cover
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "life-cover-amount",
    question: "How much life cover do I need?",
    answer:
      "A good starting point is 10-15 times your annual income, but the right amount depends on your situation: your debts (bond, car, loans), number of dependents, future expenses (education), and existing cover (group life). According to ASISA 2025, the average South African needs R2.1 million but only has R800,000. Our calculator can help you work out your specific needs.",
    category: "life-cover",
    link: "/tools/coverage-calculator",
    linkText: "Use our calculator",
  },
  {
    id: "life-vs-funeral",
    question: "What's the difference between life cover and funeral cover?",
    answer:
      "Life cover pays a larger lump sum (R100,000 to R12 million) to replace income, pay off debts, and secure your family's long-term future. Funeral cover is designed specifically for immediate funeral costs (R5,000 to R50,000) and pays out within 24-48 hours. Most families benefit from having both types of cover.",
    category: "life-cover",
    link: "/insurance/compare",
    linkText: "Compare the two",
  },
  {
    id: "life-waiting-period",
    question: "What is the waiting period for life insurance?",
    answer:
      "Most life policies have a waiting period of 6-24 months for natural death claims. This means if you die from natural causes (illness, disease) within the waiting period, the full benefit may not be paid - usually only premiums are refunded. Accidental death is typically covered from day one. The waiting period prevents fraudulent claims and keeps premiums affordable.",
    category: "life-cover",
  },
  {
    id: "life-medical-exam",
    question: "Do I need a medical exam for life insurance?",
    answer:
      "For most cover amounts (up to around R2-3 million), no medical exam is required - you'll answer health questions on the application. Larger amounts may require blood tests, medical reports, or a full examination. Pre-existing conditions must be disclosed - non-disclosure can void your policy. We guide you through the process and help you find the most suitable cover.",
    category: "life-cover",
  },
  {
    id: "life-employer-enough",
    question: "Is my employer's group life cover enough?",
    answer:
      "Probably not. Employer group life typically covers 2-4 times your annual salary, while experts recommend 10-15 times. More importantly, group cover ends when you leave your job - and you may not qualify for personal cover later due to health changes. A personal policy provides continuous protection regardless of employment status and is often cheaper when you're younger and healthier.",
    category: "life-cover",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Funeral Cover
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "funeral-cost",
    question: "How much does a funeral cost in South Africa?",
    answer:
      "Funeral costs vary widely based on your choices. A basic burial starts at R8,000-R15,000. A traditional funeral with catering for 50 guests costs R70,000-R84,000. Premium funerals with all extras can reach R120,000-R150,000. Costs include: coffin (R2,000-R15,000), burial plot (R2,200-R11,000), funeral parlour fees, catering, transport, and tombstone.",
    category: "funeral-cover",
    link: "/insurance/compare",
    linkText: "See cost breakdown",
  },
  {
    id: "funeral-payout-speed",
    question: "How quickly does funeral cover pay out?",
    answer:
      "Most funeral policies pay out within 24-48 hours of receiving required documents (death certificate, ID, claim form). This rapid payout is crucial - your family shouldn't have to worry about money during a difficult time. Some policies even offer interim payments while full documentation is being gathered.",
    category: "funeral-cover",
  },
  {
    id: "funeral-family-cover",
    question: "Can I cover my whole family on one funeral policy?",
    answer:
      "Yes, most funeral policies allow you to add family members. Typically you can cover: spouse (100% of main member cover), children (usually 50% of cover), parents and in-laws (usually 75% of cover), and some policies allow extended family (aunts, uncles, cousins) at additional cost. Family plans are often more affordable than separate individual policies.",
    category: "funeral-cover",
  },
  {
    id: "funeral-waiting-period",
    question: "What is the waiting period for funeral cover?",
    answer:
      "Most funeral policies have a 6-month waiting period for natural death (illness, disease). During this period, if death occurs from natural causes, usually only premiums paid are refunded. Accidental death is covered immediately from day one. Some policies offer reduced waiting periods (3 months) at higher premiums. The waiting period exists to prevent fraud and keep premiums low.",
    category: "funeral-cover",
  },
  {
    id: "funeral-vs-savings",
    question: "Why do I need funeral cover if I have savings?",
    answer:
      "Savings may not be accessible immediately when needed. Banks often freeze accounts upon death notification pending estate processes. The estate administration can take months. Funeral cover pays out within 24-48 hours, ensuring your family can proceed with dignified arrangements without financial stress or delays. It's protection, not a savings replacement.",
    category: "funeral-cover",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Legal & Compliance
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "popia-rights",
    question: "What are my rights under POPIA?",
    answer:
      "Under the Protection of Personal Information Act (POPIA), you have the right to: know what personal information we hold about you, request correction of incorrect information, request deletion of your information (subject to legal retention requirements), opt out of direct marketing, and lodge a complaint with the Information Regulator. We protect your data and only use it for insurance purposes.",
    category: "legal",
    link: "/privacy",
    linkText: "View our privacy policy",
  },
  {
    id: "fais-protection",
    question: "How does FAIS protect me?",
    answer:
      "The Financial Advisory and Intermediary Services Act (FAIS) requires us to: be licensed (FSP 47089), act honestly and with integrity, provide you with suitable advice for your needs, disclose all fees and commissions, have a complaints process, and carry professional indemnity insurance. If you're unhappy with our service, you can complain to the FAIS Ombud.",
    category: "legal",
    link: "/legal",
    linkText: "View our FSP details",
  },
  {
    id: "complaints-process",
    question: "How do I lodge a complaint?",
    answer:
      "To lodge a complaint: 1) Contact your portfolio manager first - most issues can be resolved quickly. 2) If unresolved, email complaints@metrosuregroup.co.za with details. 3) We'll acknowledge within 3 days and aim to resolve within 21 days. 4) If still unhappy, you can escalate to the FAIS Ombud (for advice issues) or relevant insurance Ombudsman (for claims). These services are free.",
    category: "legal",
  },
  {
    id: "tcf-principles",
    question: "What is Treating Customers Fairly (TCF)?",
    answer:
      "TCF is a regulatory framework ensuring financial service providers treat customers fairly at all stages. This means: products must be designed to meet identified customer needs, you receive clear information to make informed decisions, advice is suitable for your circumstances, products perform as expected, claims are handled fairly and promptly, and switching products is easy. We're committed to these principles.",
    category: "legal",
  },
  {
    id: "cooling-off-period",
    question: "Can I cancel a policy I just bought?",
    answer:
      "Yes, under South African law you have a 30-day cooling-off period for most insurance policies. If you cancel within 30 days of receiving your policy documents (and haven't made a claim), you're entitled to a full refund of premiums paid. After 30 days, standard cancellation terms apply - usually 30 days' notice.",
    category: "legal",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Payments & Billing
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "payment-methods",
    question: "What payment methods do you accept?",
    answer:
      "Most policies are paid via debit order from your bank account - this is the most reliable method and often qualifies for discounts. You choose your debit order date (usually 1st, 15th, 25th, or last day of the month). Some insurers accept credit card or Persal deductions for government employees. Annual upfront payment is sometimes available at a discount.",
    category: "payments",
  },
  {
    id: "change-debit-order-date",
    question: "Can I change my debit order date?",
    answer:
      "Yes, contact your portfolio manager to change your debit order date. Most insurers offer options around the 1st, 15th, 25th, or last day of the month. Changes typically take effect from the following month. Choose a date just after you receive your salary to avoid returned debit orders.",
    category: "payments",
  },
  {
    id: "premium-increase",
    question: "Why did my premium increase?",
    answer:
      "Premiums may increase for several reasons: annual CPI-linked increases (common for life products), age-related increases (especially life and health), claims history, changes to your risk profile (e.g., new drivers), or changes to the asset value insured. Your annual renewal letter will explain any changes. We review your cover annually to ensure you're getting value.",
    category: "payments",
  },
  {
    id: "payment-failed",
    question: "What happens if my debit order fails?",
    answer:
      "If your debit order fails, most insurers retry once. You'll receive notification and have a 30-31 day grace period to pay before cover lapses. Failed debit orders may incur bank charges. If struggling to pay, contact us immediately - we may be able to arrange alternative payment dates, reduced cover, or a payment plan to keep your policy active.",
    category: "payments",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Retail Partnerships (B2B)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "become-retail-partner",
    question: "How do I become a retail partner with Metrosure?",
    answer:
      "To become a partner: 1) Complete our partnership enquiry form or call our B2B team on +27 31 301 1192. 2) We schedule a discovery meeting to understand your business and customer base. 3) Our team conducts a site assessment. 4) We present a tailored partnership proposal with revenue projections. 5) Once agreed, we handle recruitment, training, and compliance - you provide the floor space. Most partnerships launch within 6-8 weeks.",
    category: "partnerships",
    link: "/partners",
    linkText: "Start a partnership enquiry",
  },
  {
    id: "who-can-partner",
    question: "What types of businesses can partner with Metrosure?",
    answer:
      "We partner with businesses that have regular customer foot traffic. This includes: retail chains (fashion, furniture, electronics), furniture and appliance stores, mobile and telecommunications retailers, automotive dealerships, and financial services outlets. Whether you have 1 store or 100, we design a partnership model that works for your scale. The key requirements are floor space for our team and alignment with our community-focused values.",
    category: "partnerships",
    link: "/partners",
    linkText: "View partnership options",
  },
  {
    id: "partner-fsp-compliance",
    question: "Do I need an FSP licence to partner with Metrosure?",
    answer:
      "No - that's the key benefit. Metrosure holds FSP licence 47089 and handles all FAIS compliance, licensing, and regulatory requirements. We deploy our own FSP-licensed advisors in your stores. You simply provide the floor space and access to customers. This eliminates compliance burden, training costs, and regulatory risk for your business. We manage all record-keeping, audits, and FSCA submissions.",
    category: "partnerships",
  },
  {
    id: "partner-revenue-share",
    question: "How does the revenue sharing model work?",
    answer:
      "Partners earn a percentage of insurance premiums sold in their stores - genuine passive income with no upfront costs. The exact percentage depends on store location, customer volume, and services offered. We cover recruitment, training, equipment, and compliance. Many partners find the revenue share exceeds the value of floor space provided within 6 months. Contact us for a personalised revenue projection.",
    category: "partnerships",
    link: "/contact",
    linkText: "Request revenue projections",
  },
  {
    id: "what-metrosure-provides",
    question: "What does Metrosure provide to retail partners?",
    answer:
      "We provide everything needed: fully trained, FSP-licensed sales advisors; all compliance and regulatory management; branded point-of-sale materials and equipment; ongoing training and performance coaching; a dedicated partnership manager; daily quality assurance monitoring (95% average); and monthly performance reports. You focus on your core retail business while we manage the insurance sales operation.",
    category: "partnerships",
  },
  {
    id: "partner-requirements",
    question: "What are the minimum requirements to partner?",
    answer:
      "Basic requirements include: dedicated floor space for an advisor (typically 4-6 square metres), customer foot traffic of at least 500 people per week, alignment with our product offerings, willingness to integrate our team into your customer journey, and a 12-month minimum partnership commitment. We're flexible on setup and can adapt to your store environment.",
    category: "partnerships",
  },
  {
    id: "partner-quality-assurance",
    question: "How do you ensure quality in partner stores?",
    answer:
      "We maintain a 95% quality assurance standard across all locations. This includes: daily call monitoring and transaction audits, mystery shopper assessments, customer satisfaction surveys, weekly performance reviews with advisors, monthly partner reports with detailed metrics, and immediate escalation of compliance concerns. Our QA team ensures your brand is protected and customers receive excellent service.",
    category: "partnerships",
    link: "/partners",
    linkText: "View our case studies",
  },
  {
    id: "partnership-setup-time",
    question: "How long does it take to launch a partnership?",
    answer:
      "From signed agreement to go-live typically takes 6-8 weeks: site assessment and planning (week 1-2), recruitment and selection of advisors (week 2-4), comprehensive FAIS training (week 4-6), equipment installation and branding (week 5-6), and soft launch with full support (week 6-8). Larger rollouts across multiple stores are phased. We assign a dedicated project manager to ensure smooth implementation.",
    category: "partnerships",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Business Services (B2B)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "instore-campaigns",
    question: "What are in-store insurance campaigns?",
    answer:
      "Our in-store campaigns deploy trained Metrosure representatives directly at your retail locations. Our teams engage customers, explain insurance products (funeral cover, life insurance, credit life), and facilitate the entire sales process. We provide dedicated sales teams, full product training, customer engagement strategies, and performance tracking. This is our most popular partnership model.",
    category: "business",
    link: "/partners",
    linkText: "Learn about in-store campaigns",
  },
  {
    id: "device-insurance-retailers",
    question: "What is device insurance for retailers?",
    answer:
      "Our device insurance programme lets electronics and mobile retailers offer protection at point of sale. When customers purchase phones, laptops, or tablets, our advisors present affordable plans covering accidental damage, screen breakage, theft, and mechanical breakdown. This increases average transaction value and creates ongoing revenue from premiums. We've achieved attachment rates of up to 62% on financed devices.",
    category: "business",
    link: "/partners",
    linkText: "Learn about device programmes",
  },
  {
    id: "device-leasing-programme",
    question: "How does the device leasing programme work?",
    answer:
      "Our device leasing helps retailers offer affordable financing on electronics without credit risk. We arrange financing through partner lenders and facilitate credit assessments, while managing collections. Insurance is bundled to protect against defaults. Benefits include: increased sales of higher-value items, no credit risk to you, reduced default rates (we've seen 35% reductions), and revenue share on financing and insurance.",
    category: "business",
  },
  {
    id: "call-centre-services",
    question: "What call centre services does Metrosure offer?",
    answer:
      "Our call centre manages outbound sales campaigns, customer service, and lead generation for partners. Services include: telesales for insurance products, appointment setting, customer retention calls, welcome calls for new policyholders, and lead qualification. All agents are FAIS-accredited with 95% quality assurance. We operate as a white-label extension of your brand or under the Metrosure name.",
    category: "business",
    link: "/contact",
    linkText: "Enquire about call centre services",
  },
  {
    id: "corporate-group-insurance",
    question: "Do you offer corporate group insurance for businesses?",
    answer:
      "Yes, we arrange comprehensive group benefits through leading SA insurers for businesses with 10+ employees. This includes: group medical aid, group funeral cover, group retirement funds (pension and provident), employee risk benefits (income protection, disability, dread disease), and group life assurance. Group schemes offer lower premiums than individual policies and simplified underwriting.",
    category: "business",
    link: "/corporate",
    linkText: "Explore corporate solutions",
  },
  {
    id: "corporate-minimum-employees",
    question: "What's the minimum employee count for group cover?",
    answer:
      "Most group schemes work best with 10 or more employees for favourable underwriting and group rates. However, we can arrange cover for smaller groups through specially negotiated arrangements with insurers. Benefits include employer tax deductions, lower premiums than individual policies, and a single point of contact for all employee benefits.",
    category: "business",
    link: "/corporate",
    linkText: "Get a corporate quote",
  },
  {
    id: "outsourced-sales-teams",
    question: "Can Metrosure manage our entire insurance sales division?",
    answer:
      "Yes, through our Outsourced Sales & Marketing service. We become your dedicated insurance sales team, arranging products from our partner insurers while handling everything from recruitment and FAIS training to performance management and compliance. We provide staff, marketing collateral, and ongoing coaching. This lets you facilitate insurance product sales without building internal capability. Many retailers have grown from 2 advisors to 18+ permanent staff through this model.",
    category: "business",
    link: "/partners",
    linkText: "Learn about outsourced sales",
  },
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get FAQs by category
 */
export function getFAQsByCategory(category: FAQCategory): FAQ[] {
  return allFAQs.filter((faq) => faq.category === category);
}

/**
 * Get popular FAQs (featured across categories)
 */
export function getPopularFAQs(limit: number = 10): FAQ[] {
  const popularIds = [
    "how-file-claim",
    "which-insurers",
    "how-get-quote",
    "is-metrosure-legit",
    "life-vs-funeral",
    "funeral-payout-speed",
    "claim-timeline",
    "change-beneficiary",
    "life-waiting-period",
    "popia-rights",
  ];
  return allFAQs
    .filter((faq) => popularIds.includes(faq.id))
    .slice(0, limit);
}

/**
 * Search FAQs
 */
export function searchFAQs(query: string): FAQ[] {
  const lowerQuery = query.toLowerCase();
  return allFAQs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(lowerQuery) ||
      faq.answer.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get FAQ by ID
 */
export function getFAQById(id: string): FAQ | undefined {
  return allFAQs.find((faq) => faq.id === id);
}

/**
 * Get category info
 */
export function getCategoryInfo(category: FAQCategory): FAQCategoryInfo | undefined {
  return faqCategories.find((cat) => cat.id === category);
}
