/**
 * Impact data for the Our Impact carousel section
 * Inspired by Starbucks About page impact slider
 */

export interface ImpactCard {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  readTime: number;
  stat: {
    value: string;
    description: string;
  };
  link: string;
}

export const impactCards: ImpactCard[] = [
  {
    id: "youth-employment",
    image: "/images/team-fp-tshabalala.jpg",
    imageAlt: "Metrosure team member at work",
    title: "Creating opportunities for South African youth since 2013",
    readTime: 3,
    stat: {
      value: "5,000+",
      description: "Jobs created across 7 provinces",
    },
    link: "/about#impact",
  },
  {
    id: "retail-partnerships",
    image: "/images/mission-image.jpg",
    imageAlt: "Retail partnership in action",
    title: "Empowering retail partners with comprehensive insurance solutions",
    readTime: 4,
    stat: {
      value: "100+",
      description: "Active retail partnerships nationwide",
    },
    link: "/partners",
  },
  {
    id: "sales-growth",
    image: "/images/about-hero.jpg",
    imageAlt: "Team celebrating success",
    title: "Driving partner success through dedicated training and support",
    readTime: 3,
    stat: {
      value: "75%",
      description: "Average partner sales increase",
    },
    link: "/partners#case-studies",
  },
];

export const impactContent = {
  heading: "OUR IMPACT",
  subheading:
    "See how we are making a difference in communities across South Africa through employment, partnership, and financial empowerment.",
};
