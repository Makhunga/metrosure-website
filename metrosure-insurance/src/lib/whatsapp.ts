/**
 * WhatsApp Integration Utilities
 * Generates WhatsApp share links with pre-formatted messages
 */

export interface QuoteData {
  referenceNumber: string;
  coverageType: "home" | "auto" | "life" | "business";
  estimatedPremium: number;
  firstName: string;
  coverageAmount?: number;
  additionalCoverage?: string[];
}

const COVERAGE_LABELS: Record<string, string> = {
  home: "Home Insurance",
  auto: "Auto Insurance",
  life: "Life & Funeral Cover",
  business: "Business Insurance",
};

const COVERAGE_ICONS: Record<string, string> = {
  home: "🏠",
  auto: "🚗",
  life: "❤️",
  business: "🏢",
};

/**
 * Generate a unique quote reference number
 */
export function generateQuoteReference(): string {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `QT-${year}-${random}`;
}

/**
 * Format currency in South African Rand
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generate WhatsApp message for quote
 */
export function generateQuoteMessage(quote: QuoteData): string {
  const icon = COVERAGE_ICONS[quote.coverageType] || "📋";
  const label = COVERAGE_LABELS[quote.coverageType] || "Insurance";

  const lines = [
    `Hi! Here's your Metrosure insurance quote:`,
    ``,
    `📋 *Quote Reference:* ${quote.referenceNumber}`,
    `${icon} *Coverage Type:* ${label}`,
    `💰 *Estimated Premium:* ${formatCurrency(quote.estimatedPremium)}/month`,
  ];

  if (quote.coverageAmount) {
    lines.push(`🛡️ *Coverage Amount:* ${formatCurrency(quote.coverageAmount)}`);
  }

  if (quote.additionalCoverage && quote.additionalCoverage.length > 0) {
    lines.push(`✅ *Add-ons:* ${quote.additionalCoverage.length} selected`);
  }

  lines.push(
    ``,
    `_This is an estimate only. Our team will contact you within 24 hours with your final quote._`,
    ``,
    `📞 Call us: 087 265 1891`,
    `🌐 Visit: www.metrosuregroup.co.za`,
    ``,
    `_Metrosure Insurance Brokers (FSP 47089)_`
  );

  return lines.join("\n");
}

/**
 * Generate WhatsApp share URL
 * Opens WhatsApp with pre-filled message
 */
export function generateWhatsAppUrl(quote: QuoteData): string {
  const message = generateQuoteMessage(quote);
  const encodedMessage = encodeURIComponent(message);

  // wa.me link without phone number opens WhatsApp to share with any contact
  return `https://wa.me/?text=${encodedMessage}`;
}

/**
 * Generate WhatsApp URL to send to Metrosure directly
 * Uses the Metrosure WhatsApp business number
 */
export function generateWhatsAppToMetrosure(
  quote: QuoteData,
  phoneNumber: string = "27872651891"
): string {
  const message = `Hi Metrosure! I just requested a quote online.\n\nReference: ${quote.referenceNumber}\nName: ${quote.firstName}\n\nPlease send me my final quote.`;
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Open WhatsApp share dialog
 */
export function shareViaWhatsApp(quote: QuoteData): void {
  const url = generateWhatsAppUrl(quote);
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Check if device likely supports WhatsApp
 */
export function isWhatsAppSupported(): boolean {
  // WhatsApp is available on all major platforms
  // On desktop, it will open WhatsApp Web or prompt to download
  return true;
}
