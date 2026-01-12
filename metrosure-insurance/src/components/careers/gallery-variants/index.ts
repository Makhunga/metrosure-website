/**
 * Gallery Variants for Careers Page
 *
 * 3 approaches to displaying community/team imagery:
 *
 * 1. Current - Existing masonry grid layout
 * 2. GalleryMarquee - Editorial magazine style with continuous scroll
 * 3. GalleryOverflowSlider - Clean minimal slider (ThoughtFarmer-inspired)
 */

export { default as GalleryMarquee } from "./GalleryMarquee";
export { default as GalleryOverflowSlider } from "./GalleryOverflowSlider";

// Gallery variant type for switcher
export type GalleryVariant = "current" | "marquee" | "overflow";

export const galleryVariants: {
  id: GalleryVariant;
  name: string;
  description: string;
}[] = [
  {
    id: "current",
    name: "Current (Grid)",
    description: "Existing masonry grid layout",
  },
  {
    id: "overflow",
    name: "Clean Slider",
    description: "Simple overflow slider with arrows",
  },
  {
    id: "marquee",
    name: "Magazine",
    description: "Editorial marquee, dual rows",
  },
];
