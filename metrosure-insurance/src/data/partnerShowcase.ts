/**
 * Partner Showcase data for the carousel section
 * Features actual partners (AVBOB, 1Life, TFG) with logos and stats
 */

export interface ShowcasePartner {
  id: string;
  name: string;
  logo: string;
  /** Optional dark mode logo - if provided, used instead of CSS inversion */
  logoDark?: string;
  logoAlt: string;
  /** Set to true for logos that need CSS inversion in dark mode (only used if logoDark is not provided) */
  darkModeInvert: boolean;
  image: string;
  imageAlt: string;
  title: string;
  stat: {
    value: string;
    description: string;
  };
  link: string;
  category: "insurer" | "retail" | "strategic";
}

export interface ShowcaseContent {
  heading: string;
  subheading: string;
}

export const showcasePartners: ShowcasePartner[] = [
  {
    id: "avbob",
    name: "AVBOB",
    logo: "/images/partners/avbob-new-logo.png",
    logoAlt: "AVBOB Mutual Assurance logo",
    darkModeInvert: false, // Green background works on both light and dark
    image: "/images/team-fp-tshabalala.jpg",
    imageAlt: "Metrosure and AVBOB partnership team",
    title: "Trusted funeral cover provider since 2013",
    stat: {
      value: "10K+",
      description: "Policies facilitated",
    },
    link: "/partners",
    category: "insurer",
  },
  {
    id: "bolttech",
    name: "bolttech",
    logo: "/images/partners/bolttech.svg",
    logoAlt: "bolttech insurtech logo",
    darkModeInvert: true,
    image: "/images/mission-image.jpg",
    imageAlt: "bolttech digital insurance partnership",
    title: "Digital insurance solutions for modern South Africa",
    stat: {
      value: "24/7",
      description: "Digital claims processing",
    },
    link: "/partners",
    category: "insurer",
  },
  {
    id: "tfg",
    name: "TFG/Jet",
    logo: "/images/partners/tfg.svg",
    logoAlt: "The Foschini Group logo",
    darkModeInvert: false, // SVG has its own purple background
    image: "/images/about-hero.jpg",
    imageAlt: "TFG retail partnership location",
    title: "Bringing insurance to retail point of sale",
    stat: {
      value: "100+",
      description: "In-store locations",
    },
    link: "/partners#retail",
    category: "retail",
  },
  {
    id: "metropolitan",
    name: "Metropolitan",
    logo: "/images/partners/metropolitan-logo-light.svg",
    logoDark: "/images/partners/metropolitan-logo-dark.svg",
    logoAlt: "Metropolitan insurance logo",
    darkModeInvert: false, // Using dedicated dark mode logo instead
    image: "/images/team-professional-event.jpg",
    imageAlt: "Metropolitan partnership team",
    title: "Life and funeral insurance for every South African",
    stat: {
      value: "48hrs",
      description: "Average claim turnaround",
    },
    link: "/partners",
    category: "insurer",
  },
];

export const showcaseContent: ShowcaseContent = {
  heading: "OUR PARTNERS",
  subheading:
    "Working with South Africa's leading insurers and retailers to make quality cover accessible to every community.",
};

// Helper functions
export function getShowcasePartnerById(
  id: string
): ShowcasePartner | undefined {
  return showcasePartners.find((p) => p.id === id);
}

export function getShowcasePartnersByCategory(
  category: ShowcasePartner["category"]
): ShowcasePartner[] {
  return showcasePartners.filter((p) => p.category === category);
}
