"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { InlineError } from "@/components/ui/InlineError";
import type { FieldState } from "@/lib/formValidation";

// ═══════════════════════════════════════════════════════════════════════════
// LABELLED INPUT COMPONENT
// Standard input with label above - clean, reliable pattern
// ═══════════════════════════════════════════════════════════════════════════

export interface LabelledInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  /** Input label text */
  label: string;
  /** Field validation state from formValidation lib */
  fieldState?: FieldState;
  /** Additional wrapper className */
  wrapperClassName?: string;
  /** Additional input className */
  inputClassName?: string;
  /** Show character count (requires maxLength) */
  showCharCount?: boolean;
  /** Current character count (if controlled externally) */
  charCount?: number;
}

/**
 * LabelledInput - A standard labelled input component
 *
 * Features:
 * - Label positioned above the input
 * - Dark mode support via CSS variables
 * - Validation states (error, success)
 * - Character count display
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <LabelledInput
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
export const LabelledInput = forwardRef<HTMLInputElement, LabelledInputProps>(
  (
    {
      name,
      label,
      type = "text",
      value,
      required = false,
      fieldState = { touched: false, error: null, valid: false },
      wrapperClassName,
      inputClassName,
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
      <div className={cn("space-y-1.5", wrapperClassName)}>
        {/* Label */}
        <label
          htmlFor={name}
          className={cn(
            "block text-sm font-semibold tracking-wide",
            hasError
              ? "text-red-600 dark:text-red-400"
              : isValid
                ? "text-green-600 dark:text-green-400"
                : "text-slate-700 dark:text-slate-300"
          )}
        >
          {label}
          {required && <span className="text-primary ml-1">*</span>}
        </label>

        {/* Input wrapper for relative positioning */}
        <div className="relative">
          <input
            ref={ref}
            type={type}
            id={name}
            name={name}
            value={value}
            required={required}
            maxLength={maxLength}
            className={cn(
              // Base styles
              "w-full py-3 px-4 rounded-xl",
              "bg-white dark:bg-slate-800",
              "text-slate-900 dark:text-white",
              "placeholder:text-slate-400 dark:placeholder:text-slate-500",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2",
              // Border and focus states
              "border-2",
              hasError
                ? "border-red-400 dark:border-red-400 focus:ring-red-200 dark:focus:ring-red-800/30"
                : isValid
                  ? "border-green-400 dark:border-green-400 focus:ring-green-200 dark:focus:ring-green-800/30"
                  : "border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary/20",
              inputClassName
            )}
            aria-required={required}
            aria-invalid={hasError ? "true" : undefined}
            aria-describedby={hasError ? `${name}-error` : undefined}
            {...props}
          />

          {/* Character count */}
          {showCharCount && maxLength && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <span
                className={cn(
                  "text-xs font-medium",
                  isAtLimit ? "text-red-500" : "text-slate-400"
                )}
              >
                {currentLength}/{maxLength}
              </span>
            </div>
          )}
        </div>

        {/* Error message */}
        <InlineError error={fieldState.error} id={`${name}-error`} />
      </div>
    );
  }
);

LabelledInput.displayName = "LabelledInput";

export default LabelledInput;
