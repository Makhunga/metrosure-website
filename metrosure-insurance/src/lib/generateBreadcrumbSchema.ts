/**
 * BreadcrumbList Schema Generator
 *
 * Generates JSON-LD structured data for breadcrumb navigation
 * @see https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

const BASE_URL = "https://www.metrosuregroup.co.za";

/**
 * Generates BreadcrumbList JSON-LD schema for Google rich results
 * @param items - Array of breadcrumb items (in order from home to current page)
 * @param baseUrl - Base URL for the site (defaults to metrosuregroup.co.za)
 * @returns JSON-LD schema object for BreadcrumbList
 *
 * @example
 * ```tsx
 * // For /careers/sales-representative page:
 * const breadcrumbSchema = generateBreadcrumbSchema([
 *   { name: "Home", url: "/" },
 *   { name: "Careers", url: "/careers" },
 *   { name: "Sales Representative", url: "/careers/sales-representative" },
 * ]);
 *
 * // In the page:
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
 * />
 * ```
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  baseUrl: string = BASE_URL
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generates a JSON string for the breadcrumb schema (for script tags)
 * @param items - Array of breadcrumb items
 * @param baseUrl - Base URL for the site
 * @returns JSON string ready for script tag
 */
export function generateBreadcrumbSchemaScript(
  items: BreadcrumbItem[],
  baseUrl: string = BASE_URL
): string {
  return JSON.stringify(generateBreadcrumbSchema(items, baseUrl));
}

/**
 * Common breadcrumb paths for reuse
 */
export const commonBreadcrumbs = {
  home: { name: "Home", url: "/" },
  about: { name: "About", url: "/about" },
  careers: { name: "Careers", url: "/careers" },
  insurance: { name: "Insurance", url: "/" },
  contact: { name: "Contact", url: "/contact" },
  partners: { name: "Partners", url: "/partners" },
  claims: { name: "Claims", url: "/claims" },
  corporate: { name: "Corporate", url: "/corporate" },
  tools: { name: "Tools", url: "/" },
};
