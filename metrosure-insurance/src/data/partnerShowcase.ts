/**
 * Partner Showcase data for the carousel section
 * Features actual partners (AVBOB, 1Life, TFG) with logos and stats
 */

export interface ShowcasePartner {
  id: string;
  name: string;
  logo: string;
  logoAlt: string;
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
    logo: "/images/partners/avbob.png",
    logoAlt: "AVBOB Mutual Assurance logo",
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
    id: "1life",
    name: "1Life",
    logo: "/images/partners/1life.png",
    logoAlt: "1Life Insurance logo",
    image: "/images/mission-image.jpg",
    imageAlt: "1Life partnership in action",
    title: "Accessible life cover for every South African",
    stat: {
      value: "48hrs",
      description: "Average claims turnaround",
    },
    link: "/partners",
    category: "insurer",
  },
  {
    id: "tfg",
    name: "TFG/Jet",
    logo: "/images/partners/tfg.svg",
    logoAlt: "The Foschini Group logo",
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
