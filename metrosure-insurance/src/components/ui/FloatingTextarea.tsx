"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { InlineError } from "@/components/ui/InlineError";
import type { FieldState } from "@/lib/formValidation";

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING TEXTAREA COMPONENT
// Shared floating label textarea following the Metrosure design system
// ═══════════════════════════════════════════════════════════════════════════

export interface FloatingTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  /** Textarea label text */
  label: string;
  /** Field validation state from formValidation lib */
  fieldState?: FieldState;
  /** Additional wrapper className */
  wrapperClassName?: string;
  /** Show character count (requires maxLength) */
  showCharCount?: boolean;
  /** Current character count (if controlled externally) */
  charCount?: number;
  /** Helper text displayed below the textarea */
  helperText?: string;
}

/**
 * FloatingTextarea - A floating label textarea component
 *
 * Features:
 * - Floating label that animates on focus/value
 * - Dark mode support via CSS variables
 * - Validation states (error, success)
 * - Character count display
 * - Helper text support
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <FloatingTextarea
 *   name="message"
 *   label="Your Message"
 *   value={message}
 *   required
 *   rows={4}
 *   maxLength={2000}
 *   showCharCount
 *   onChange={handleChange}
 *   onBlur={handleBlur}
 *   fieldState={getFieldState("message")}
 * />
 * ```
 */
export const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  (
    {
      name,
      label,
      value,
      required = false,
      fieldState = { touched: false, error: null, valid: false },
      wrapperClassName,
      showCharCount = false,
      charCount,
      maxLength,
      helperText,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const hasError = fieldState.touched && fieldState.error;
    const isValid = fieldState.touched && fieldState.valid;
    const currentLength = charCount ?? (typeof value === "string" ? value.length : 0);
    const isAtLimit = maxLength ? currentLength >= maxLength : false;
    const hasValue = value !== "" && value !== undefined;

    return (
      <div className={cn("relative", wrapperClassName)}>
        <textarea
          ref={ref}
          id={name}
          name={name}
          value={value}
          placeholder={label}
          required={required}
          maxLength={maxLength}
          rows={rows}
          className={cn(
            // Base styles
            "peer w-full pt-6 pb-3 px-4 rounded-xl resize-none",
            "bg-white dark:bg-slate-800",
            "text-slate-900 dark:text-white",
            "placeholder-transparent",
            "transition-all duration-200",
            "focus:outline-none focus:ring-0",
            // Border styles
            "border-2",
            hasError
              ? "border-red-400 dark:border-red-400"
              : isValid
                ? "border-green-400 dark:border-green-400"
                : "border-slate-200 dark:border-slate-600 focus:border-primary"
          )}
          aria-required={required}
          aria-invalid={hasError ? "true" : undefined}
          aria-describedby={hasError ? `${name}-error` : undefined}
          {...props}
        />
        <label
          htmlFor={name}
          className={cn(
            "absolute left-4 transition-all duration-200 pointer-events-none",
            // Default position (floating)
            "top-2 text-xs",
            // When empty and not focused
            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base",
            // On focus
            "peer-focus:top-2 peer-focus:text-xs",
            // Colour states
            hasError
              ? "text-red-500"
              : isValid
                ? "text-green-500"
                : "text-slate-400 peer-focus:text-primary"
          )}
        >
          {label}
          {required && <span className="text-primary ml-0.5">*</span>}
        </label>

        {/* Footer: helper text and character count */}
        <div className="flex justify-between items-center mt-2 px-1">
          {/* Helper text or error */}
          <div className="flex-1">
            {fieldState.error ? (
              <InlineError error={fieldState.error} id={`${name}-error`} />
            ) : helperText ? (
              <span className="text-xs text-slate-400">{helperText}</span>
            ) : null}
          </div>

          {/* Character count */}
          {showCharCount && maxLength && (
            <span
              className={cn(
                "text-xs ml-4",
                isAtLimit ? "text-red-500" : "text-slate-400"
              )}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

FloatingTextarea.displayName = "FloatingTextarea";

export default FloatingTextarea;
