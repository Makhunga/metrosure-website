/**
 * Honeypot spam prevention utility
 *
 * Honeypot fields are hidden form fields that humans won't see or fill,
 * but automated bots typically fill in. If the honeypot field has a value,
 * we silently reject the submission (returning success to fool the bot).
 *
 * Usage:
 * - Client: Add HoneypotField component to forms
 * - Server: Call isHoneypotFilled() and return fake success if true
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * The field name used for honeypot detection.
 * Using "website" as it's commonly auto-filled by bots
 * but not typically shown in contact/inquiry forms.
 */
export const HONEYPOT_FIELD_NAME = 'website';

// ============================================================================
// SERVER-SIDE VALIDATION
// ============================================================================

/**
 * Check if the honeypot field was filled (indicates a bot submission)
 *
 * @param formData - FormData object from the request
 * @returns true if honeypot was filled (bot detected), false otherwise
 *
 * @example
 * ```typescript
 * // In API route
 * const formData = await request.formData();
 * if (isHoneypotFilled(formData)) {
 *   // Return fake success to fool bots
 *   return NextResponse.json({ success: true });
 * }
 * // Continue with normal processing...
 * ```
 */
export function isHoneypotFilled(formData: FormData): boolean {
  const honeypotValue = formData.get(HONEYPOT_FIELD_NAME);
  if (honeypotValue && typeof honeypotValue === 'string' && honeypotValue.trim() !== '') {
    console.log('[Honeypot] Bot submission detected and blocked');
    return true;
  }
  return false;
}

/**
 * Check if the honeypot field was filled from a JSON body
 *
 * @param body - Parsed JSON body object
 * @returns true if honeypot was filled (bot detected), false otherwise
 *
 * @example
 * ```typescript
 * // In API route with JSON body
 * const body = await request.json();
 * if (isHoneypotFilledJSON(body)) {
 *   return NextResponse.json({ success: true });
 * }
 * ```
 */
export function isHoneypotFilledJSON(body: Record<string, unknown>): boolean {
  const honeypotValue = body[HONEYPOT_FIELD_NAME];
  if (honeypotValue && typeof honeypotValue === 'string' && honeypotValue.trim() !== '') {
    console.log('[Honeypot] Bot submission detected and blocked');
    return true;
  }
  return false;
}

// ============================================================================
// CLIENT-SIDE COMPONENT PROPS
// ============================================================================

/**
 * Props for creating a honeypot input field in React
 * These styles ensure the field is invisible to humans but detectable by bots
 */
export const honeypotInputProps = {
  type: 'text',
  name: HONEYPOT_FIELD_NAME,
  autoComplete: 'off',
  tabIndex: -1,
  'aria-hidden': true,
  style: {
    position: 'absolute' as const,
    left: '-9999px',
    top: '-9999px',
    width: '1px',
    height: '1px',
    opacity: 0,
    overflow: 'hidden',
    pointerEvents: 'none' as const,
  },
};

/**
 * CSS class string for honeypot fields (alternative to inline styles)
 * Use with Tailwind: className={honeypotClassName}
 */
export const honeypotClassName = 'absolute -left-[9999px] -top-[9999px] w-px h-px opacity-0 overflow-hidden pointer-events-none';
