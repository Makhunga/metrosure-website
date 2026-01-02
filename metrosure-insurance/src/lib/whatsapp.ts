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

// =============================================================================
// Calculator Results Sharing
// =============================================================================

export interface CalculatorBreakdownItem {
  label: string;
  value: number;
}

export interface CalculatorResultData {
  calculatorType: "life" | "funeral";
  totalAmount: number;
  premiumLow?: number;
  premiumHigh?: number;
  monthlyPremium?: number;
  breakdown: CalculatorBreakdownItem[];
  /** Life cover specific */
  yearsOfSupport?: number;
  dependents?: number;
  /** Funeral cover specific */
  planName?: string;
  memberCount?: number;
}

const CALCULATOR_ICONS: Record<string, string> = {
  life: "🛡️",
  funeral: "🕊️",
};

const CALCULATOR_LABELS: Record<string, string> = {
  life: "Life Cover Calculation",
  funeral: "Funeral Cover Plan",
};

/**
 * Generate WhatsApp message for calculator results
 */
export function generateCalculatorResultMessage(data: CalculatorResultData): string {
  const icon = CALCULATOR_ICONS[data.calculatorType] || "📊";
  const label = CALCULATOR_LABELS[data.calculatorType] || "Cover Calculation";

  const lines = [
    `${icon} *My ${label}*`,
    ``,
  ];

  // Total amount
  lines.push(`💰 *Recommended Cover:* ${formatCurrency(data.totalAmount)}`);

  // Premium range or single premium
  if (data.premiumLow && data.premiumHigh) {
    lines.push(
      `📊 *Estimated Premium:* ${formatCurrency(data.premiumLow)}–${formatCurrency(data.premiumHigh)}/month`
    );
  } else if (data.monthlyPremium) {
    lines.push(`📊 *Monthly Premium:* ${formatCurrency(data.monthlyPremium)}/month`);
  }

  // Additional context based on calculator type
  if (data.calculatorType === "life") {
    if (data.yearsOfSupport) {
      lines.push(`📅 *Income Replacement:* ${data.yearsOfSupport} years`);
    }
    if (data.dependents && data.dependents > 0) {
      lines.push(`👨‍👩‍👧‍👦 *Dependents Covered:* ${data.dependents}`);
    }
  } else if (data.calculatorType === "funeral") {
    if (data.planName) {
      lines.push(`📋 *Plan:* ${data.planName}`);
    }
    if (data.memberCount && data.memberCount > 1) {
      lines.push(`👥 *Family Members:* ${data.memberCount}`);
    }
  }

  // Breakdown section (top 3 items)
  if (data.breakdown.length > 0) {
    lines.push(``);
    lines.push(`📋 *Breakdown:*`);
    const topItems = data.breakdown.slice(0, 4);
    topItems.forEach((item) => {
      lines.push(`• ${item.label}: ${formatCurrency(item.value)}`);
    });
  }

  // Footer
  lines.push(
    ``,
    `_Calculate yours at metrosuregroup.co.za/tools/coverage-calculator_`,
    ``,
    `📞 087 265 1891 | FSP 47089`
  );

  return lines.join("\n");
}

/**
 * Generate WhatsApp URL for calculator results
 */
export function generateCalculatorWhatsAppUrl(data: CalculatorResultData): string {
  const message = generateCalculatorResultMessage(data);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/?text=${encodedMessage}`;
}

/**
 * Share calculator results via WhatsApp
 */
export function shareCalculatorResult(data: CalculatorResultData): void {
  const url = generateCalculatorWhatsAppUrl(data);
  window.open(url, "_blank", "noopener,noreferrer");
}
