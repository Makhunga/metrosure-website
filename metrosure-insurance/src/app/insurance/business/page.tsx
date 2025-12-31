import { Metadata } from "next";
import InsurancePageTemplate from "@/components/insurance/InsurancePageTemplate";

export const metadata: Metadata = {
  title: "Business & Employee Benefits | Metrosure Insurance Brokers",
  description:
    "Commercial insurance, group retirement funds, and employee benefits from Metrosure Insurance Brokers (FSP 47089). Protect your business, your assets, and your team with comprehensive cover.",
  openGraph: {
    title: "Business & Employee Benefits | Metrosure Insurance Brokers",
    description:
      "Commercial insurance and employee benefits from Metrosure Insurance Brokers. Protect your business and team.",
    type: "website",
  },
};

const coverageFeatures = [
  {
    icon: "store",
    title: "Commercial Property",
    description:
      "Cover for your business premises, equipment, stock, and assets. From fire and theft to business interruption, protect what you've built.",
  },
  {
    icon: "local_shipping",
    title: "Fleet & Vehicle Cover",
    description:
      "Comprehensive cover for your business vehicles, whether it's one bakkie or a fleet of trucks. Keep your business moving.",
  },
  {
    icon: "gavel",
    title: "Liability Insurance",
    description:
      "Protection if a customer, employee, or member of the public is injured or their property is damaged because of your business activities.",
  },
  {
    icon: "groups",
    title: "Group Life & Funeral",
    description:
      "Show your employees you care. Group life and funeral schemes that protect your team and their families.",
  },
  {
    icon: "savings",
    title: "Group Retirement",
    description:
      "Help your employees build for the future with group retirement funds. Attract and retain talent with competitive benefits.",
  },
  {
    icon: "health_and_safety",
    title: "Group Risk Benefits",
    description:
      "Income protection, disability, and dread disease cover for your employees. A complete employee benefits package.",
  },
];

const planTiers = [
  {
    name: "Small Business",
    price: "From R500",
    period: "month",
    description: "Essential cover for small operations",
    features: [
      "Commercial property cover",
      "Public liability up to R1M",
      "Business vehicle cover",
      "Basic business interruption",
      "Dedicated account manager",
    ],
  },
  {
    name: "Growing Business",
    price: "From R1,500",
    period: "month",
    description: "Comprehensive cover as you scale",
    features: [
      "Enhanced property cover",
      "Increased liability limits",
      "Fleet management",
      "Group employee benefits",
      "Directors & officers cover",
      "Professional indemnity",
    ],
    highlighted: true,
  },
  {
    name: "Corporate",
    price: "Custom",
    period: "quote",
    description: "Tailored solutions for larger businesses",
    features: [
      "Bespoke cover design",
      "Full employee benefits scheme",
      "Risk management services",
      "Dedicated claims team",
      "Multi-site coverage",
      "International options",
    ],
  },
];

const benefits = [
  "Proven track record: 100+ retail partners including TFG trust us with their business",
  "75% average sales increase for partners within 6 months of implementation",
  "One relationship manager for all your business insurance needs",
  "Group employee benefits that help you attract and keep good people",
  "Competitive rates by leveraging our buying power across 30+ insurers",
  "Fast claims handling so your business isn't disrupted",
  "95% daily quality assurance average ensures every interaction meets the highest standards",
  "Flexible payment terms to match your business cash flow",
];

const faqs = [
  {
    question: "What business insurance do I actually need?",
    answer:
      "It depends on your industry and size, but most businesses need commercial property (for your premises and equipment), public liability (in case someone gets hurt), and vehicle cover if you have company vehicles. We'll do a free risk assessment and tell you exactly what you need, no more, no less.",
  },
  {
    question: "Can you help with employee benefits?",
    answer:
      "Absolutely. We set up group life, funeral, retirement, and risk benefit schemes for businesses of all sizes. It's a great way to look after your team and makes your business more attractive to potential employees. We handle all the admin.",
  },
  {
    question: "How do group retirement schemes work?",
    answer:
      "You and your employees contribute to a pooled fund managed by professionals. It's tax-efficient for both parties, and employees get the benefit of group rates and professional management. We can set up provident funds, pension funds, or retirement annuities.",
  },
  {
    question: "What is directors and officers (D&O) insurance?",
    answer:
      "D&O insurance protects company directors and officers if they're personally sued for decisions they make on behalf of the company. It covers legal costs and damages. If you're a director of any company, it's something you should seriously consider.",
  },
  {
    question: "How quickly can you set up cover for a new business?",
    answer:
      "We can often get you covered within a day or two. We know cash flow is tight when you're starting out, so we'll work with you to find affordable cover that protects what matters most. As your business grows, we grow your cover with you.",
  },
];

export default function BusinessInsurancePage() {
  return (
    <InsurancePageTemplate
      badge="Business & Employee Benefits"
      title="Protect Your Business and Your People"
      subtitle="You've worked hard to build this. We'll make sure one incident doesn't undo years of progress. Commercial cover and employee benefits, sorted."
      heroIcon="business"
      description="Running a business in South Africa means dealing with risk every day. Load shedding, theft, vehicle accidents, employee issues, the list goes on. At Metrosure, we help businesses like yours manage those risks with the right insurance and employee benefits. Since 2013, we've partnered with over 100 retail businesses including major brands like TFG, delivering a 75% average sales increase within 6 months. We don't believe in one-size-fits-all. We take the time to understand your business, then put together a package that actually makes sense. And when something goes wrong, we're in your corner, fighting to get your claim paid fast so you can get back to business."
      coverageFeatures={coverageFeatures}
      planTiers={planTiers}
      benefits={benefits}
      faqs={faqs}
    />
  );
}
