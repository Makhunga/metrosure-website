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

// For development/testing, use Resend's test email
const FROM_EMAIL = process.env.NODE_ENV === 'production'
  ? 'Metrosure <noreply@metrosuregroup.co.za>'
  : 'Metrosure <onboarding@resend.dev>';

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
// OUTLOOK-COMPATIBLE EMAIL TEMPLATE HELPERS
// Uses table-based layout with inline styles for maximum compatibility
// ============================================================================

// Common inline styles (Outlook requires inline styles, no <style> blocks)
const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const COLOR_PRIMARY = "#BF0603";
const COLOR_TEXT = "#333333";
const COLOR_TEXT_LIGHT = "#666666";
const COLOR_LABEL = "#555555";
const COLOR_BG_LIGHT = "#f5f5f5";
const COLOR_BG_WHITE = "#ffffff";
const COLOR_BORDER = "#eeeeee";

/**
 * Creates a labeled field row (table-based for Outlook compatibility)
 */
export function createFieldRow(label: string, value: string, isLink: boolean = false): string {
  const valueContent = isLink
    ? `<a href="${value}" style="color: ${COLOR_PRIMARY}; text-decoration: none;">${value}</a>`
    : value;

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
      <tr>
        <td width="140" valign="top" style="font-family: ${FONT_FAMILY}; font-size: 14px; font-weight: bold; color: ${COLOR_LABEL}; padding: 6px 0; vertical-align: top;">${label}</td>
        <td valign="top" style="font-family: ${FONT_FAMILY}; font-size: 14px; color: ${COLOR_TEXT}; padding: 6px 0; vertical-align: top;">${valueContent}</td>
      </tr>
    </table>
  `;
}

/**
 * Creates a section title with underline (table-based for Outlook compatibility)
 */
export function createSectionTitle(title: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-bottom: 15px;">
      <tr>
        <td style="font-family: ${FONT_FAMILY}; font-size: 12px; font-weight: bold; color: ${COLOR_PRIMARY}; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 8px; border-bottom: 2px solid ${COLOR_PRIMARY};">
          ${title}
        </td>
      </tr>
    </table>
  `;
}

/**
 * Creates a message/quote box (table-based for Outlook compatibility)
 */
export function createMessageBox(content: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-top: 10px;">
      <tr>
        <td style="background-color: #f9f9f9; border-left: 4px solid ${COLOR_PRIMARY}; padding: 15px; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${COLOR_TEXT}; line-height: 1.6;">
          ${content}
        </td>
      </tr>
    </table>
  `;
}

/**
 * Creates an alert/action box (table-based for Outlook compatibility)
 */
export function createAlertBox(content: string, type: 'warning' | 'success' | 'info' = 'warning'): string {
  const colors = {
    warning: { bg: '#fff3cd', text: '#856404' },
    success: { bg: '#d4edda', text: '#155724' },
    info: { bg: '#d1ecf1', text: '#0c5460' },
  };
  const { bg, text } = colors[type];

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-top: 20px;">
      <tr>
        <td style="background-color: ${bg}; padding: 15px; border-radius: 4px; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${text};">
          ${content}
        </td>
      </tr>
    </table>
  `;
}

/**
 * Creates a section container with spacing
 */
export function createSection(content: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-bottom: 25px;">
      <tr>
        <td>
          ${content}
        </td>
      </tr>
    </table>
  `;
}

/**
 * Main email template wrapper - Outlook-compatible with table-based layout
 * Uses XHTML Transitional DOCTYPE and inline styles for maximum compatibility
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
    /* Reset styles - these help non-Outlook clients */
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
    }
    /* Mobile styles */
    @media only screen and (max-width: 620px) {
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
      }
      .fluid {
        width: 100% !important;
        max-width: 100% !important;
      }
      .stack-column {
        display: block !important;
        width: 100% !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${COLOR_BG_LIGHT}; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <!--[if mso]>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${COLOR_BG_LIGHT};">
  <tr>
  <td align="center">
  <![endif]-->

  <!-- Visually Hidden Preheader Text -->
  <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    ${title} - Metrosure Insurance Brokers
  </div>

  <!-- Email Wrapper Table -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${COLOR_BG_LIGHT};">
    <tr>
      <td align="center" style="padding: 20px 10px;">

        <!--[if mso]>
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center">
        <tr>
        <td>
        <![endif]-->

        <!-- Main Email Container -->
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width: 600px; background-color: ${COLOR_BG_WHITE}; border-collapse: collapse;">

          <!-- Header Row -->
          <tr>
            <td align="center" bgcolor="${COLOR_PRIMARY}" style="background-color: ${COLOR_PRIMARY}; padding: 30px 30px; text-align: center;">
              <!--[if mso]>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
              <td style="padding: 0; text-align: center;">
              <![endif]-->
              ${content.includes('<div class="header">') ? '' : ''}
              <!--[if mso]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>

          <!-- Content Row -->
          <tr>
            <td style="padding: 30px; font-family: ${FONT_FAMILY}; font-size: 14px; line-height: 1.6; color: ${COLOR_TEXT};">
              ${content}
            </td>
          </tr>

          <!-- Footer Row -->
          <tr>
            <td align="center" bgcolor="#f9f9f9" style="background-color: #f9f9f9; padding: 25px 30px; border-top: 1px solid ${COLOR_BORDER};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                <tr>
                  <td align="center" style="font-family: ${FONT_FAMILY}; font-size: 12px; color: ${COLOR_TEXT_LIGHT}; line-height: 1.6;">
                    <p style="margin: 0 0 8px 0;"><strong style="color: ${COLOR_TEXT};">Metrosure Insurance Brokers (Pty) Ltd</strong> | FSP 47089</p>
                    <p style="margin: 0 0 8px 0;">391 Anton Lembede Street, Metropolitan Life Building, 5th Floor, Durban 4001</p>
                    <p style="margin: 0;">Phone: <a href="tel:+27313011192" style="color: ${COLOR_PRIMARY}; text-decoration: none;">+27 31 301 1192</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- End Main Email Container -->

        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->

      </td>
    </tr>
  </table>
  <!-- End Email Wrapper Table -->

  <!--[if mso]>
  </td>
  </tr>
  </table>
  <![endif]-->
</body>
</html>`;
}

/**
 * Creates email header section (to be used inside wrapEmailTemplate content)
 */
export function createEmailHeader(title: string, subtitle?: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-bottom: 25px;">
      <tr>
        <td align="center" bgcolor="${COLOR_PRIMARY}" style="background-color: ${COLOR_PRIMARY}; padding: 25px; border-radius: 4px;">
          <h1 style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 24px; font-weight: bold; color: #ffffff;">${title}</h1>
          ${subtitle ? `<p style="margin: 10px 0 0 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: rgba(255,255,255,0.9);">${subtitle}</p>` : ''}
        </td>
      </tr>
    </table>
  `;
}

/**
 * Creates a bullet list (table-based for Outlook compatibility)
 */
export function createBulletList(items: string[]): string {
  const listItems = items.map(item => `
    <tr>
      <td width="20" valign="top" style="font-family: ${FONT_FAMILY}; font-size: 14px; color: ${COLOR_PRIMARY}; padding: 4px 0;">&#8226;</td>
      <td valign="top" style="font-family: ${FONT_FAMILY}; font-size: 14px; color: ${COLOR_TEXT}; padding: 4px 0; line-height: 1.5;">${item}</td>
    </tr>
  `).join('');

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
      ${listItems}
    </table>
  `;
}

/**
 * Creates a simple paragraph
 */
export function createParagraph(text: string): string {
  return `<p style="margin: 0 0 15px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${COLOR_TEXT}; line-height: 1.6;">${text}</p>`;
}

/**
 * Creates a link
 */
export function createLink(href: string, text: string): string {
  return `<a href="${href}" style="color: ${COLOR_PRIMARY}; text-decoration: none;">${text}</a>`;
}
