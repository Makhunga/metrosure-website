"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { InlineError } from "@/components/ui/InlineError";
import type { FieldState } from "@/lib/formValidation";

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING INPUT COMPONENT
// Shared floating label input following the Metrosure design system
// ═══════════════════════════════════════════════════════════════════════════

export interface FloatingInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  /** Input label text */
  label: string;
  /** Field validation state from formValidation lib */
  fieldState?: FieldState;
  /** Additional wrapper className */
  wrapperClassName?: string;
  /** Show character count (requires maxLength) */
  showCharCount?: boolean;
  /** Current character count (if controlled externally) */
  charCount?: number;
}

/**
 * FloatingInput - A floating label input component
 *
 * Features:
 * - Floating label that animates on focus/value
 * - Dark mode support via CSS variables
 * - Validation states (error, success)
 * - Character count display
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <FloatingInput
 *   name="email"
 *   label="Email Address"
 *   type="email"
 *   value={email}
 *   required
 *   onChange={handleChange}
 *   onBlur={handleBlur}
 *   fieldState={getFieldState("email")}
 * />
 * ```
 */
export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  (
    {
      name,
      label,
      type = "text",
      value,
      required = false,
      fieldState = { touched: false, error: null, valid: false },
      wrapperClassName,
      showCharCount = false,
      charCount,
      maxLength,
      ...props
    },
    ref
  ) => {
    const hasError = fieldState.touched && fieldState.error;
    const isValid = fieldState.touched && fieldState.valid;
    const currentLength = charCount ?? (typeof value === "string" ? value.length : 0);
    const isAtLimit = maxLength ? currentLength >= maxLength : false;

    return (
      <div className={cn("relative", wrapperClassName)}>
        <input
          ref={ref}
          type={type}
          id={name}
          name={name}
          value={value}
          placeholder={label}
          required={required}
          maxLength={maxLength}
          className={cn(
            // Base styles
            "peer w-full pt-6 pb-3 px-4 rounded-xl",
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
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base",
            // On focus
            "peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0",
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

        {/* Character count */}
        {showCharCount && maxLength && (
          <div className="absolute right-4 bottom-3 pointer-events-none">
            <span
              className={cn(
                "text-xs",
                isAtLimit ? "text-red-500" : "text-slate-400"
              )}
            >
              {currentLength}/{maxLength}
            </span>
          </div>
        )}

        {/* Error message */}
        <InlineError error={fieldState.error} id={`${name}-error`} />
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;
