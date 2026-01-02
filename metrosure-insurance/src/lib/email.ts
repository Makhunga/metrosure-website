import { Resend } from 'resend';

// Initialize Resend lazily to avoid build-time errors
let resend: Resend | null = null;
let resendAvailable: boolean | null = null;

/**
 * Check if email service is available (API key is configured)
 * Use this before attempting to send emails
 */
export function isEmailAvailable(): boolean {
  if (resendAvailable === null) {
    resendAvailable = !!process.env.RESEND_API_KEY;
  }
  return resendAvailable;
}

function getResend(): Resend | null {
  if (!isEmailAvailable()) {
    return null;
  }
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// Email addresses
const EMAIL_INFO = 'info@metrosuregroup.co.za';
const EMAIL_CLIENTS = 'clients@metrosuregroup.co.za';
const EMAIL_CAREERS = 'careers@metrosuregroup.co.za';

// From email - uses verified metrosure.app domain for testing, metrosuregroup.co.za for production
// Set RESEND_FROM_EMAIL in .env.local to override (e.g., noreply@metrosure.app)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL
  || (process.env.NODE_ENV === 'production'
    ? 'Metrosure <noreply@metrosuregroup.co.za>'
    : 'Metrosure <noreply@metrosure.app>');

interface EmailAttachment {
  filename: string;
  content: Buffer;
}

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}

export interface SendEmailResult {
  success: boolean;
  id?: string;
  unavailable?: boolean;
  error?: string;
}

export async function sendEmail({ to, subject, html, replyTo, attachments }: SendEmailOptions): Promise<SendEmailResult> {
  const resendClient = getResend();

  if (!resendClient) {
    console.warn('Email service unavailable: RESEND_API_KEY not configured');
    return { success: false, unavailable: true };
  }

  try {
    const { data, error } = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
      attachments,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Pre-configured email senders for different purposes
export const emailTo = {
  info: EMAIL_INFO,
  clients: EMAIL_CLIENTS,
  careers: EMAIL_CAREERS,
};

// ============================================================================
// PREMIUM EMAIL TEMPLATE SYSTEM
// Outlook-compatible table-based layout with refined financial services aesthetic
// ============================================================================

// Typography & Colour System
const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_SIZE_XS = "11px";
const FONT_SIZE_SM = "12px";
const FONT_SIZE_BASE = "14px";
const FONT_SIZE_MD = "15px";
const FONT_SIZE_LG = "18px";
const FONT_SIZE_XL = "22px";
const FONT_SIZE_2XL = "26px";

// Brand Colours
const COLOR_PRIMARY = "#BF0603";       // Metrosure red
const COLOR_PRIMARY_DARK = "#8B0000";  // Darker red for accents
const COLOR_TEXT = "#1a1a1a";          // Near-black for better readability
const COLOR_TEXT_SECONDARY = "#4a4a4a"; // Secondary text
const COLOR_TEXT_MUTED = "#6b6b6b";    // Muted text
const COLOR_LABEL = "#374151";         // Label colour (slate-700)

// Background Colours
const COLOR_BG_BODY = "#f3f4f6";       // Light grey body (gray-100)
const COLOR_BG_WHITE = "#ffffff";
const COLOR_BG_SUBTLE = "#f9fafb";     // Very subtle grey (gray-50)
const COLOR_BG_ACCENT = "#fef2f2";     // Light red tint for accents

// Borders & Dividers
const COLOR_BORDER = "#e5e7eb";        // Subtle border (gray-200)
const COLOR_DIVIDER = "#d1d5db";       // Divider lines (gray-300)

// Alert Colours (refined palette)
const ALERT_COLORS = {
  warning: { bg: '#fffbeb', border: '#f59e0b', text: '#92400e', icon: '⚠️' },
  success: { bg: '#ecfdf5', border: '#10b981', text: '#065f46', icon: '✓' },
  info: { bg: '#eff6ff', border: '#3b82f6', text: '#1e40af', icon: 'ℹ' },
};

/**
 * Creates a premium labeled field row with subtle zebra striping
 * Table-based for Outlook compatibility
 */
export function createFieldRow(label: string, value: string, isLink: boolean = false, isHighlighted: boolean = false): string {
  const valueContent = isLink
    ? `<a href="${value}" style="color: ${COLOR_PRIMARY}; text-decoration: none; font-weight: 600;">${value}</a>`
    : value;

  const bgColor = isHighlighted ? COLOR_BG_ACCENT : "transparent";
  const valueWeight = isHighlighted ? "font-weight: 700;" : "";
  const valueColor = isHighlighted ? COLOR_PRIMARY : COLOR_TEXT;

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
      <tr>
        <td width="160" valign="top" bgcolor="${bgColor}" style="background-color: ${bgColor}; font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_SM}; font-weight: 600; color: ${COLOR_LABEL}; text-transform: uppercase; letter-spacing: 0.5px; padding: 12px 15px 12px 0; vertical-align: top; border-bottom: 1px solid ${COLOR_BORDER};">
          ${label}
        </td>
        <td valign="top" bgcolor="${bgColor}" style="background-color: ${bgColor}; font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_MD}; color: ${valueColor}; ${valueWeight} padding: 12px 0; vertical-align: top; border-bottom: 1px solid ${COLOR_BORDER};">
          ${valueContent}
        </td>
      </tr>
    </table>
  `;
}

/**
 * Creates a premium section title with red accent bar
 * Refined financial services aesthetic
 */
export function createSectionTitle(title: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
      <tr>
        <td height="8" style="font-size: 1px; line-height: 8px;">&nbsp;</td>
      </tr>
      <tr>
        <td>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr>
              <td width="4" bgcolor="${COLOR_PRIMARY}" style="background-color: ${COLOR_PRIMARY};">&nbsp;</td>
              <td width="12" style="font-size: 1px;">&nbsp;</td>
              <td style="font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_SM}; font-weight: 700; color: ${COLOR_TEXT}; text-transform: uppercase; letter-spacing: 1.5px;">
                ${title}
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td height="16" style="font-size: 1px; line-height: 16px;">&nbsp;</td>
      </tr>
    </table>
  `;
}

/**
 * Creates a premium message/quote box with refined styling
 * Elegant quote styling with subtle background
 */
export function createMessageBox(content: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
      <tr>
        <td height="12" style="font-size: 1px; line-height: 12px;">&nbsp;</td>
      </tr>
      <tr>
        <td>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr>
              <td width="4" bgcolor="${COLOR_PRIMARY}" style="background-color: ${COLOR_PRIMARY};">&nbsp;</td>
              <td bgcolor="${COLOR_BG_SUBTLE}" style="background-color: ${COLOR_BG_SUBTLE}; padding: 20px 24px; font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_BASE}; color: ${COLOR_TEXT_SECONDARY}; line-height: 1.7; font-style: italic;">
                ${content}
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td height="8" style="font-size: 1px; line-height: 8px;">&nbsp;</td>
      </tr>
    </table>
  `;
}

/**
 * Creates a premium alert/action box with left accent border
 * Refined colour palette with clear visual hierarchy
 */
export function createAlertBox(content: string, type: 'warning' | 'success' | 'info' = 'warning'): string {
  const { bg, border, text, icon } = ALERT_COLORS[type];

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
      <tr>
        <td height="20" style="font-size: 1px; line-height: 20px;">&nbsp;</td>
      </tr>
      <tr>
        <td>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr>
              <td width="4" bgcolor="${border}" style="background-color: ${border};">&nbsp;</td>
              <td bgcolor="${bg}" style="background-color: ${bg}; padding: 18px 20px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                  <tr>
                    <td width="28" valign="top" style="font-size: 16px; padding-right: 12px; vertical-align: top;">${icon}</td>
                    <td style="font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_BASE}; color: ${text}; line-height: 1.6;">
                      ${content}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td height="8" style="font-size: 1px; line-height: 8px;">&nbsp;</td>
      </tr>
    </table>
  `;
}

/**
 * Creates a section container with refined spacing
 * Optimised padding for professional appearance
 */
export function createSection(content: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
      <tr>
        <td style="padding: 0;">
          ${content}
        </td>
      </tr>
      <tr>
        <td height="24" style="font-size: 1px; line-height: 24px;">&nbsp;</td>
      </tr>
    </table>
  `;
}

/**
 * Premium email template wrapper with refined financial services aesthetic
 * Outlook-compatible with sophisticated visual hierarchy
 */
export function wrapEmailTemplate(content: string, title: string): string {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!--<![endif]-->
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    /* Reset styles */
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      outline: none;
      text-decoration: none;
    }
    /* Outlook.com line-height fix */
    .ExternalClass { width: 100%; }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td { line-height: 100%; }
    /* Mobile responsive */
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .fluid { width: 100% !important; max-width: 100% !important; }
      .stack-column { display: block !important; width: 100% !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${COLOR_BG_BODY}; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <!--[if mso]>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR_BG_BODY}" style="background-color: ${COLOR_BG_BODY};">
  <tr>
  <td align="center">
  <![endif]-->

  <!-- Preheader (hidden preview text) -->
  <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    ${title} - Metrosure Insurance Brokers | FSP 47089
  </div>

  <!-- Email Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR_BG_BODY}" style="background-color: ${COLOR_BG_BODY};">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <!--[if mso]>
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center">
        <tr>
        <td>
        <![endif]-->

        <!-- Main Container -->
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width: 600px; border-collapse: collapse;">

          <!-- ===== HEADER ===== -->
          <tr>
            <td bgcolor="${COLOR_PRIMARY}" style="background-color: ${COLOR_PRIMARY};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                <!-- Top accent line -->
                <tr>
                  <td height="4" bgcolor="${COLOR_PRIMARY_DARK}" style="background-color: ${COLOR_PRIMARY_DARK}; font-size: 1px; line-height: 4px;">&nbsp;</td>
                </tr>
                <!-- Logo & Title -->
                <tr>
                  <td align="center" style="padding: 28px 40px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                      <!-- White Logo Image -->
                      <tr>
                        <td align="center" style="padding-bottom: 8px;">
                          <img src="https://www.metrosuregroup.co.za/images/logo-white.png" alt="Metrosure Insurance Brokers" width="180" height="auto" style="display: block; max-width: 180px; height: auto; border: 0;" />
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_XS}; font-weight: 400; color: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 2px;">
                          Insurance Brokers
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== CONTENT ===== -->
          <tr>
            <td bgcolor="${COLOR_BG_WHITE}" style="background-color: ${COLOR_BG_WHITE};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                <!-- Top spacing -->
                <tr>
                  <td height="36" style="font-size: 1px; line-height: 36px;">&nbsp;</td>
                </tr>
                <!-- Main content -->
                <tr>
                  <td class="mobile-padding" style="padding: 0 40px; font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_BASE}; line-height: 1.7; color: ${COLOR_TEXT};">
                    ${content}
                  </td>
                </tr>
                <!-- Bottom spacing -->
                <tr>
                  <td height="40" style="font-size: 1px; line-height: 40px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== FOOTER ===== -->
          <tr>
            <td bgcolor="${COLOR_BG_SUBTLE}" style="background-color: ${COLOR_BG_SUBTLE}; border-top: 1px solid ${COLOR_BORDER};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                <tr>
                  <td class="mobile-padding" style="padding: 32px 40px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                      <!-- Company info -->
                      <tr>
                        <td align="center" style="font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_SM}; color: ${COLOR_TEXT_SECONDARY}; line-height: 1.6;">
                          <strong style="color: ${COLOR_TEXT}; font-weight: 700;">Metrosure Insurance Brokers (Pty) Ltd</strong>
                        </td>
                      </tr>
                      <tr>
                        <td height="4" style="font-size: 1px; line-height: 4px;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td align="center" style="font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_XS}; color: ${COLOR_PRIMARY}; font-weight: 600; letter-spacing: 0.5px;">
                          FSP 47089
                        </td>
                      </tr>
                      <tr>
                        <td height="16" style="font-size: 1px; line-height: 16px;">&nbsp;</td>
                      </tr>
                      <!-- Divider -->
                      <tr>
                        <td align="center">
                          <table role="presentation" width="60" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td height="1" bgcolor="${COLOR_DIVIDER}" style="background-color: ${COLOR_DIVIDER}; font-size: 1px; line-height: 1px;">&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td height="16" style="font-size: 1px; line-height: 16px;">&nbsp;</td>
                      </tr>
                      <!-- Address -->
                      <tr>
                        <td align="center" style="font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_XS}; color: ${COLOR_TEXT_MUTED}; line-height: 1.6;">
                          391 Anton Lembede Street, Metropolitan Life Building<br />
                          5th Floor, Durban 4001
                        </td>
                      </tr>
                      <tr>
                        <td height="12" style="font-size: 1px; line-height: 12px;">&nbsp;</td>
                      </tr>
                      <!-- Contact -->
                      <tr>
                        <td align="center" style="font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_SM}; color: ${COLOR_TEXT_SECONDARY};">
                          <a href="tel:+27313011192" style="color: ${COLOR_PRIMARY}; text-decoration: none; font-weight: 600;">+27 31 301 1192</a>
                          &nbsp;&nbsp;|&nbsp;&nbsp;
                          <a href="mailto:info@metrosuregroup.co.za" style="color: ${COLOR_PRIMARY}; text-decoration: none; font-weight: 600;">info@metrosuregroup.co.za</a>
                        </td>
                      </tr>
                      <tr>
                        <td height="20" style="font-size: 1px; line-height: 20px;">&nbsp;</td>
                      </tr>
                      <!-- Legal -->
                      <tr>
                        <td align="center" style="font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_XS}; color: ${COLOR_TEXT_MUTED}; line-height: 1.5;">
                          This email and any attachments are confidential and intended solely for the addressee.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Bottom accent line -->
          <tr>
            <td height="4" bgcolor="${COLOR_PRIMARY}" style="background-color: ${COLOR_PRIMARY}; font-size: 1px; line-height: 4px;">&nbsp;</td>
          </tr>

        </table>
        <!-- End Main Container -->

        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->

      </td>
    </tr>
  </table>

  <!--[if mso]>
  </td>
  </tr>
  </table>
  <![endif]-->
</body>
</html>`;
}

/**
 * Creates a premium content header with elegant typography
 * Uses large, bold title with optional subtitle in muted text
 * Includes decorative underline accent
 */
export function createEmailHeader(title: string, subtitle?: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
      <tr>
        <td style="padding-bottom: 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
            <!-- Title -->
            <tr>
              <td style="font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_XL}; font-weight: 700; color: ${COLOR_TEXT}; line-height: 1.3;">
                ${title}
              </td>
            </tr>
            ${subtitle ? `
            <tr>
              <td height="8" style="font-size: 1px; line-height: 8px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_BASE}; color: ${COLOR_TEXT_SECONDARY}; line-height: 1.5;">
                ${subtitle}
              </td>
            </tr>
            ` : ''}
            <!-- Decorative underline -->
            <tr>
              <td height="16" style="font-size: 1px; line-height: 16px;">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                  <tr>
                    <td width="48" height="3" bgcolor="${COLOR_PRIMARY}" style="background-color: ${COLOR_PRIMARY}; font-size: 1px; line-height: 3px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

/**
 * Creates a premium bullet list with branded styling
 * Uses red square bullets for visual consistency with brand
 * Table-based for Outlook compatibility
 */
export function createBulletList(items: string[]): string {
  const listItems = items.map((item, index) => `
    <tr>
      <td width="20" valign="top" style="font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_XS}; color: ${COLOR_PRIMARY}; padding: 8px 0 8px 0; vertical-align: top;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="6" height="6" bgcolor="${COLOR_PRIMARY}" style="background-color: ${COLOR_PRIMARY}; font-size: 1px; line-height: 6px;">&nbsp;</td>
          </tr>
        </table>
      </td>
      <td valign="top" style="font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_BASE}; color: ${COLOR_TEXT}; padding: 6px 0; line-height: 1.6; vertical-align: top;">${item}</td>
    </tr>
    ${index < items.length - 1 ? `<tr><td height="2" colspan="2" style="font-size: 1px; line-height: 2px;">&nbsp;</td></tr>` : ''}
  `).join('');

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
      <tr>
        <td height="8" style="font-size: 1px; line-height: 8px;">&nbsp;</td>
      </tr>
      ${listItems}
      <tr>
        <td height="8" colspan="2" style="font-size: 1px; line-height: 8px;">&nbsp;</td>
      </tr>
    </table>
  `;
}

/**
 * Creates a refined paragraph with table-based spacing
 * Uses Outlook-compatible spacing instead of CSS margin
 */
export function createParagraph(text: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
      <tr>
        <td style="font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_BASE}; color: ${COLOR_TEXT}; line-height: 1.7;">
          ${text}
        </td>
      </tr>
      <tr>
        <td height="16" style="font-size: 1px; line-height: 16px;">&nbsp;</td>
      </tr>
    </table>
  `;
}

/**
 * Creates a link
 */
export function createLink(href: string, text: string): string {
  return `<a href="${href}" style="color: ${COLOR_PRIMARY}; text-decoration: none;">${text}</a>`;
}

// ============================================================================
// CALCULATOR RESULTS EMAIL TEMPLATE
// ============================================================================

interface CalculatorEmailData {
  calculatorType: "life" | "funeral";
  totalAmount: number;
  premiumLow?: number;
  premiumHigh?: number;
  monthlyPremium?: number;
  breakdown: Array<{ label: string; value: number }>;
  yearsOfSupport?: number;
  dependents?: number;
  planName?: string;
  memberCount?: number;
}

function formatZAR(amount: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Creates a premium CTA button with VML fallback for Outlook desktop
 * VML provides rounded corners in Outlook desktop (Word engine)
 * Modern clients use CSS border-radius
 * Refined with proper font sizing and letter-spacing
 */
function createCTAButton(href: string, text: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
      <tr>
        <td height="28" style="font-size: 1px; line-height: 28px;">&nbsp;</td>
      </tr>
      <tr>
        <td align="center">
          <!--[if mso]>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:50px;v-text-anchor:middle;width:260px;" arcsize="10%" stroke="f" fillcolor="${COLOR_PRIMARY}">
            <w:anchorlock/>
            <center style="color:#ffffff;font-family:${FONT_FAMILY};font-size:${FONT_SIZE_MD};font-weight:bold;letter-spacing:0.5px;">
              ${text}
            </center>
          </v:roundrect>
          <![endif]-->
          <!--[if !mso]><!-->
          <a href="${href}" target="_blank" style="display: inline-block; padding: 16px 40px; font-family: ${FONT_FAMILY}; font-size: ${FONT_SIZE_MD}; font-weight: 700; color: #ffffff; text-decoration: none; background-color: ${COLOR_PRIMARY}; border-radius: 6px; letter-spacing: 0.5px; text-transform: none;">
            ${text}
          </a>
          <!--<![endif]-->
        </td>
      </tr>
      <tr>
        <td height="28" style="font-size: 1px; line-height: 28px;">&nbsp;</td>
      </tr>
    </table>
  `;
}

/**
 * Generates email template for calculator results
 */
export function generateCalculatorResultsEmail(data: CalculatorEmailData): string {
  const isLife = data.calculatorType === "life";
  const title = isLife ? "Your Life Cover Calculation" : "Your Funeral Cover Plan";
  const icon = isLife ? "🛡️" : "🕊️";

  // Build breakdown rows
  const breakdownRows = data.breakdown
    .filter(item => item.value > 0)
    .map(item => createFieldRow(item.label, formatZAR(item.value)))
    .join("");

  // Premium display
  let premiumText = "";
  if (data.premiumLow && data.premiumHigh) {
    premiumText = `${formatZAR(data.premiumLow)} – ${formatZAR(data.premiumHigh)} per month`;
  } else if (data.monthlyPremium) {
    premiumText = `${formatZAR(data.monthlyPremium)} per month`;
  }

  // Additional context
  let contextRows = "";
  if (isLife) {
    if (data.yearsOfSupport) {
      contextRows += createFieldRow("Income Replacement", `${data.yearsOfSupport} years`);
    }
    if (data.dependents && data.dependents > 0) {
      contextRows += createFieldRow("Dependents Covered", data.dependents.toString());
    }
  } else {
    if (data.planName) {
      contextRows += createFieldRow("Plan", data.planName);
    }
    if (data.memberCount && data.memberCount > 1) {
      contextRows += createFieldRow("Family Members", data.memberCount.toString());
    }
  }

  // CTA link
  const ctaLink = isLife
    ? `https://www.metrosuregroup.co.za/quote?coverageType=life&coverageAmount=${data.totalAmount}`
    : `https://www.metrosuregroup.co.za/quote?coverageType=funeral&coverageAmount=${data.totalAmount}`;

  const content = `
    ${createEmailHeader(`${icon} ${title}`)}

    ${createSection(`
      ${createParagraph("Thank you for using the Metrosure Coverage Calculator. Here's a summary of your calculation:")}
    `)}

    ${createSection(`
      ${createSectionTitle("Coverage Summary")}
      ${createFieldRow("Recommended Cover", formatZAR(data.totalAmount))}
      ${premiumText ? createFieldRow("Estimated Premium", premiumText) : ""}
      ${contextRows}
    `)}

    ${data.breakdown.length > 0 ? createSection(`
      ${createSectionTitle("Coverage Breakdown")}
      ${breakdownRows}
    `) : ""}

    ${createSection(`
      ${createAlertBox(
        "<strong>Next Step:</strong> Get a personalised quote from our advisers. Your actual premium may vary based on age, health, and other factors.",
        "info"
      )}
    `)}

    ${createSection(`
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center">
            ${createCTAButton(ctaLink, "Get Your Personalised Quote")}
          </td>
        </tr>
      </table>
    `)}

    ${createSection(`
      ${createParagraph("Have questions? Our team is here to help:")}
      ${createBulletList([
        "Call us: <strong>087 265 1891</strong>",
        "Email: <strong>info@metrosuregroup.co.za</strong>",
        "Visit: <strong>www.metrosuregroup.co.za</strong>",
      ])}
    `)}

    ${createSection(`
      ${createParagraph(`<em style="color: ${COLOR_TEXT_MUTED}; font-size: ${FONT_SIZE_XS};">This calculation is an estimate only and does not constitute financial advice. Actual premiums are determined through underwriting and depend on factors including age, health status, smoking status, and occupation. Metrosure Insurance Brokers (Pty) Ltd is an authorised Financial Services Provider (FSP 47089).</em>`)}
    `)}
  `;

  return wrapEmailTemplate(content, title);
}
