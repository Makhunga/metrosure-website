import { Metadata } from "next";
import InsurancePageTemplate from "@/components/insurance/InsurancePageTemplate";

export const metadata: Metadata = {
  title: "Car & Home Insurance | Metrosure Insurance Brokers",
  description:
    "Protect your vehicle and home with comprehensive short-term insurance from Metrosure Insurance Brokers (FSP 47089). We work with SA's top insurers to find you the right cover.",
  openGraph: {
    title: "Car & Home Insurance | Metrosure Insurance Brokers",
    description:
      "Protect your vehicle and home with comprehensive short-term insurance from Metrosure Insurance Brokers.",
    type: "website",
  },
};

const coverageFeatures = [
  {
    icon: "directions_car",
    title: "Vehicle Insurance",
    description:
      "Comprehensive or third-party cover for your car, bakkie, or motorbike. We shop around SA's top insurers to find you the best rates.",
  },
  {
    icon: "home",
    title: "Home Buildings Cover",
    description:
      "Protect the structure of your home against fire, storms, flooding, and other damage. Essential if you own your property.",
  },
  {
    icon: "inventory_2",
    title: "Home Contents Cover",
    description:
      "Cover your furniture, appliances, electronics, and personal belongings against theft, fire, and damage — at home or on the move.",
  },
  {
    icon: "security",
    title: "All-Risk Cover",
    description:
      "Take your valuables with you and stay covered. Laptops, phones, jewellery, and more — protected wherever you go.",
  },
  {
    icon: "emergency",
    title: "Emergency Assistance",
    description:
      "24/7 roadside assistance, home emergency services, and medical response. Help is just a phone call away.",
  },
  {
    icon: "gavel",
    title: "Legal Liability",
    description:
      "Protection if someone is injured on your property or you accidentally damage someone else's property.",
  },
];

const planTiers = [
  {
    name: "Third Party",
    price: "From R250",
    period: "month",
    description: "Basic cover for budget-conscious drivers",
    features: [
      "Third-party liability cover",
      "Fire and theft protection",
      "24/7 roadside assistance",
      "Dedicated portfolio manager",
      "Claims support",
    ],
  },
  {
    name: "Comprehensive",
    price: "From R450",
    period: "month",
    description: "Full protection for everyday peace of mind",
    features: [
      "Full vehicle damage cover",
      "Windscreen and glass cover",
      "Car hire while yours is repaired",
      "Towing and storage",
      "Personal accident cover",
      "Credit shortfall cover",
    ],
    highlighted: true,
  },
  {
    name: "Premium Bundle",
    price: "Custom",
    period: "quote",
    description: "Car + Home combined for maximum savings",
    features: [
      "Full vehicle cover",
      "Home buildings & contents",
      "All-risk personal items",
      "Multi-policy discount",
      "Legal liability included",
      "Priority claims handling",
    ],
  },
];

const benefits = [
  "Dedicated portfolio manager who knows your name and your policy inside out",
  "We compare quotes from 30+ insurers to find you the best deal",
  "Claims handled by real people — no automated call centres",
  "Multi-policy discounts when you bundle car, home, and contents",
  "Flexible excess options to suit your budget",
  "No hidden fees or surprises — we explain everything in plain English",
];

const faqs = [
  {
    question: "Do I need comprehensive or third-party cover?",
    answer:
      "It depends on your vehicle and situation. Third-party covers damage you cause to others. Comprehensive covers that plus damage to your own vehicle. If your car is newer or financed, comprehensive is usually the better choice. We'll help you decide.",
  },
  {
    question: "How do you find me the best price?",
    answer:
      "As brokers, we work with over 30 insurance companies including Discovery, Santam, Hollard, and more. We compare quotes from multiple insurers to find you the best cover at the best price — it's like having a personal shopper for insurance.",
  },
  {
    question: "What happens when I need to claim?",
    answer:
      "Call your dedicated portfolio manager directly. They'll guide you through the process, help with paperwork, and follow up with the insurer on your behalf. You won't be passed around — you have a real person looking after you.",
  },
  {
    question: "Can I insure my home and car together?",
    answer:
      "Absolutely — and you'll often save money by bundling. We can arrange comprehensive cover for your vehicle, home buildings, contents, and personal items all in one package with one dedicated contact.",
  },
  {
    question: "What if I have a bad driving record?",
    answer:
      "We work with a range of insurers with different risk appetites. Even if you've had accidents or claims, we'll find an insurer willing to cover you and work to get you the best possible rate.",
  },
];

export default function AutoInsurancePage() {
  return (
    <InsurancePageTemplate
      badge="Car & Home Insurance"
      title="Protect What Gets You There"
      subtitle="Your car takes you to work. Your home is where you rest. We help protect both — with the right cover from SA's top insurers."
      heroIcon="directions_car"
      description="Your vehicle isn't just a car — it's how you get to work, pick up the kids, and live your life. Your home isn't just a building — it's where your family sleeps safely at night. At Metrosure, we understand that you're not just insuring things, you're protecting what matters. That's why we work with over 30 South African insurers to find you the right cover at the right price. And when something goes wrong, you'll have a real person — your dedicated portfolio manager — to guide you through every step."
      coverageFeatures={coverageFeatures}
      planTiers={planTiers}
      benefits={benefits}
      faqs={faqs}
    />
  );
}
