"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { InlineError } from "@/components/ui/InlineError";
import type { FieldState } from "@/lib/formValidation";

// ═══════════════════════════════════════════════════════════════════════════
// LABELLED TEXTAREA COMPONENT
// Standard textarea with label above - clean, reliable pattern
// ═══════════════════════════════════════════════════════════════════════════

export interface LabelledTextareaProps
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
 * LabelledTextarea - A standard labelled textarea component
 *
 * Features:
 * - Label positioned above the textarea
 * - Dark mode support via CSS variables
 * - Validation states (error, success)
 * - Character count display
 * - Helper text support
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <LabelledTextarea
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
export const LabelledTextarea = forwardRef<HTMLTextAreaElement, LabelledTextareaProps>(
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

        {/* Textarea */}
        <textarea
          ref={ref}
          id={name}
          name={name}
          value={value}
          required={required}
          maxLength={maxLength}
          rows={rows}
          className={cn(
            // Base styles
            "w-full py-3 px-4 rounded-xl resize-none",
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
                : "border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary/20"
          )}
          aria-required={required}
          aria-invalid={hasError ? "true" : undefined}
          aria-describedby={hasError ? `${name}-error` : undefined}
          {...props}
        />

        {/* Footer: error/helper text and character count */}
        <div className="flex justify-between items-start">
          {/* Error or helper text */}
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
                "text-xs font-medium ml-4 mt-0.5",
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

LabelledTextarea.displayName = "LabelledTextarea";

export default LabelledTextarea;
