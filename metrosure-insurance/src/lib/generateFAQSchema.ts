/**
 * FAQPage Schema Generator
 *
 * Generates JSON-LD structured data for FAQ sections
 * @see https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generates FAQPage JSON-LD schema for Google rich results
 * @param faqs - Array of FAQ items with question and answer
 * @returns JSON-LD schema object for FAQPage
 *
 * @example
 * ```tsx
 * // In a page component:
 * const faqSchema = generateFAQSchema([
 *   { question: "What is insurance?", answer: "Insurance is..." },
 *   { question: "How do I claim?", answer: "To claim..." },
 * ]);
 *
 * // In the page:
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
 * />
 * ```
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  // Strip HTML tags from answers for schema (Google prefers plain text)
  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, "").trim();
  };

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(faq.answer),
      },
    })),
  };
}

/**
 * Generates a JSON string for the FAQ schema (for script tags)
 * @param faqs - Array of FAQ items
 * @returns JSON string ready for script tag
 */
export function generateFAQSchemaScript(faqs: FAQItem[]): string {
  return JSON.stringify(generateFAQSchema(faqs));
}
