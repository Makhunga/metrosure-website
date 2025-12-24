import { Metadata } from "next";
import InsurancePageTemplate from "@/components/insurance/InsurancePageTemplate";

export const metadata: Metadata = {
  title: "Life, Funeral & Credit Life Insurance | Metrosure Insurance Brokers",
  description:
    "Protect your family's future with life insurance, credit life cover, funeral cover, and estate planning from Metrosure Insurance Brokers (FSP 47089). We help South African families feel secure.",
  openGraph: {
    title: "Life, Funeral & Credit Life Insurance | Metrosure Insurance Brokers",
    description:
      "Protect your family's future with life insurance, credit life, and funeral cover from Metrosure Insurance Brokers.",
    type: "website",
  },
};

const coverageFeatures = [
  {
    icon: "favorite",
    title: "Life Cover",
    description:
      "Make sure your family is looked after if something happens to you. A lump sum to pay off debt, cover expenses, and give them time to adjust.",
  },
  {
    icon: "groups",
    title: "Funeral Cover",
    description:
      "Give your family peace of mind with dignified funeral cover. Individual or family plans that pay out quickly when it matters most.",
  },
  {
    icon: "credit_card",
    title: "Credit Life Insurance",
    description:
      "Protect yourself and your family from debt. Credit life pays off your loan if you die, become disabled, or lose your job — so debt doesn't become a burden.",
  },
  {
    icon: "savings",
    title: "Retirement Planning",
    description:
      "Start planning for the future you deserve. We help you build wealth and prepare for a comfortable retirement with the right products.",
  },
  {
    icon: "description",
    title: "Estate Planning & Wills",
    description:
      "Protect your legacy with estate planning and a professionally drafted will. Make sure your assets go to the people you choose, not the state.",
  },
  {
    icon: "health_and_safety",
    title: "Disability Cover",
    description:
      "If you can't work due to illness or injury, disability cover replaces your income so you can focus on recovery, not bills.",
  },
];

const planTiers = [
  {
    name: "Essential Life",
    price: "From R150",
    period: "month",
    description: "Basic protection for peace of mind",
    features: [
      "Life cover up to R500,000",
      "Funeral benefit included",
      "Spouse and children add-ons",
      "No medical exam needed",
      "Dedicated portfolio manager",
    ],
  },
  {
    name: "Family Protect",
    price: "From R350",
    period: "month",
    description: "Comprehensive family protection",
    features: [
      "Life cover up to R2 million",
      "Family funeral cover",
      "Disability cover included",
      "Dread disease benefit",
      "Free will drafting",
      "Income protection option",
    ],
    highlighted: true,
  },
  {
    name: "Legacy Builder",
    price: "Custom",
    period: "quote",
    description: "Build wealth while staying protected",
    features: [
      "Tailored life cover amount",
      "Retirement annuity integration",
      "Tax-efficient planning",
      "Estate planning included",
      "Full family protection",
      "Investment components",
    ],
  },
];

const benefits = [
  "No complicated medical exams for most cover — just answer a few health questions",
  "Quick claim payouts when your family needs it most — usually within 48 hours",
  "Dedicated portfolio manager who knows your family's needs",
  "We compare products from SA's top insurers to find you the best fit",
  "Free will drafting service included with most life products",
  "Cover that grows with you — we review your needs as your life changes",
];

const faqs = [
  {
    question: "How much life cover do I need?",
    answer:
      "A good starting point is 10-15 times your annual income, but the right amount depends on your situation — your debts, dependants, and future expenses like education. We'll sit down with you and work out exactly what your family would need.",
  },
  {
    question: "What's the difference between life cover and funeral cover?",
    answer:
      "Life cover pays a larger lump sum (typically R100,000+) to replace income, pay off bonds, and secure your family's future. Funeral cover is designed specifically for funeral costs and pays out within days. Most families benefit from having both.",
  },
  {
    question: "What is credit life insurance?",
    answer:
      "Credit life insurance protects you and your family from debt. If you die, become disabled, or lose your job, it pays off your outstanding loan — like furniture, a vehicle, or appliance purchases. It means your family won't inherit your debt, and the item stays theirs.",
  },
  {
    question: "Can I include my whole family on one policy?",
    answer:
      "Yes, many of our funeral and life products allow you to add your spouse, children, parents, and extended family members. It's often more affordable than separate policies, and you have one person (your portfolio manager) to help with everything.",
  },
  {
    question: "Do I need a medical exam?",
    answer:
      "For most cover amounts, no medical exam is required. You'll answer some health questions, and based on your answers, we can often approve you the same day. Larger amounts may need more information, but we'll guide you through it.",
  },
  {
    question: "How quickly does funeral cover pay out?",
    answer:
      "Most funeral claims are paid within 24-48 hours of receiving the required documents. This is crucial — your family shouldn't have to worry about money during a difficult time. We make sure the process is as quick and easy as possible.",
  },
];

export default function LifeInsurancePage() {
  return (
    <InsurancePageTemplate
      badge="Life, Funeral & Credit Life"
      title="Look After the People Who Matter Most"
      subtitle="Life insurance isn't about you — it's about making sure your family is okay if something happens. Let's make sure they're protected."
      heroIcon="favorite"
      description="Nobody wants to think about not being here. But if you've got a family, a bond, or people who depend on you, life cover is one of the most important things you can do for them. At Metrosure, we make it simple. We'll help you work out how much cover you need, find the right product from SA's leading insurers, and be there when your family needs to claim. Because at the end of the day, this is about giving the people you love security and peace of mind."
      coverageFeatures={coverageFeatures}
      planTiers={planTiers}
      benefits={benefits}
      faqs={faqs}
    />
  );
}
