/**
 * Form validation utilities
 * Reusable validation functions for form inputs
 */

// Field validation state type
export interface FieldState {
  touched: boolean;
  error: string | null;
  valid: boolean;
}

export type FieldStates = Record<string, FieldState>;

/**
 * Email validation
 * Returns error message if invalid, null if valid
 * Uses stricter regex that prevents:
 * - Consecutive dots
 * - Starting/ending with dots
 * - Double @ symbols
 * - Missing/invalid domain structure
 */
export const validateEmail = (email: string): string | null => {
  if (!email) return "Email is required";

  // Stricter email regex:
  // - Local part: alphanumeric, dots, underscores, hyphens (no consecutive dots)
  // - @ symbol
  // - Domain: alphanumeric with hyphens, at least one dot, valid TLD
  const emailRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

  // Check for consecutive dots or @ symbols
  if (/\.\./.test(email) || /@@/.test(email)) {
    return "Please enter a valid email address";
  }

  if (!emailRegex.test(email)) return "Please enter a valid email address";

  // Maximum length check (RFC 5321)
  if (email.length > 254) return "Email address is too long";

  return null;
};

/**
 * Phone validation (SA format)
 * Returns error message if invalid, null if valid
 */
export const validatePhone = (phone: string): string | null => {
  if (!phone) return "Phone number is required";
  // SA phone format: +27, 0, or just digits
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
  if (cleanPhone.length < 10) return "Phone number must be at least 10 digits";
  if (!/^(\+27|0)?[0-9]{9,}$/.test(cleanPhone)) return "Please enter a valid SA phone number";
  return null;
};

/**
 * Required field validation
 * Returns error message if empty, null if valid
 */
export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || !value.trim()) return `${fieldName} is required`;
  return null;
};

/**
 * Future date validation
 * Returns error message if date is in the past, null if valid
 */
export const validateFutureDate = (dateString: string, fieldName: string = "Date"): string | null => {
  if (!dateString) return `${fieldName} is required`;
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to start of day for fair comparison
  if (selectedDate < today) return `${fieldName} must be today or in the future`;
  return null;
};

/**
 * Max length validation
 * Returns error message if exceeds limit, null if valid
 */
export const validateMaxLength = (value: string, maxLength: number, fieldName: string): string | null => {
  if (value && value.length > maxLength) {
    return `${fieldName} must be ${maxLength} characters or less`;
  }
  return null;
};

/**
 * Get initial/default field state
 */
export const getDefaultFieldState = (): FieldState => ({
  touched: false,
  error: null,
  valid: false
});

/**
 * Dynamic input classes based on validation state
 * For inputs WITH icons (left padding)
 */
export const getInputClassesWithIcon = (state: FieldState): string => {
  const baseClasses = "w-full rounded-xl shadow-sm transition-all py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500";

  if (state.touched && state.error) {
    return `${baseClasses} border-2 border-red-400 bg-red-50 dark:bg-red-900/15 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800/30 pl-12 pr-4`;
  }
  if (state.touched && state.valid) {
    return `${baseClasses} border-2 border-green-400 bg-green-50 dark:bg-green-900/15 focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800/30 pl-12 pr-4`;
  }
  return `${baseClasses} border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-700 pl-12 pr-4`;
};

/**
 * Standard input classes (no icon)
 */
export const inputClasses =
  "w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-700 transition-all py-3.5 px-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500";

/**
 * Standard label classes
 */
export const labelClasses =
  "block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider ml-1 mb-2";
