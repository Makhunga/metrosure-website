"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { InlineError } from "@/components/ui/InlineError";
import type { FieldState } from "@/lib/formValidation";

// ═══════════════════════════════════════════════════════════════════════════
// LABELLED DATE INPUT COMPONENT
// Standard date input with label above - clean, reliable pattern
// ═══════════════════════════════════════════════════════════════════════════

export interface LabelledDateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
  /** Input label text */
  label: string;
  /** Field validation state from formValidation lib */
  fieldState?: FieldState;
  /** Additional wrapper className */
  wrapperClassName?: string;
}

/**
 * LabelledDateInput - A standard labelled date input component
 *
 * Features:
 * - Label positioned above the input
 * - Dark mode support via CSS variables
 * - Validation states (error, success)
 * - Custom calendar icon
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <LabelledDateInput
 *   name="startDate"
 *   label="Start Date"
 *   value={startDate}
 *   required
 *   onChange={handleChange}
 *   onBlur={handleBlur}
 *   fieldState={getFieldState("startDate")}
 * />
 * ```
 */
export const LabelledDateInput = forwardRef<HTMLInputElement, LabelledDateInputProps>(
  (
    {
      name,
      label,
      value,
      required = false,
      fieldState = { touched: false, error: null, valid: false },
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const hasError = fieldState.touched && fieldState.error;
    const isValid = fieldState.touched && fieldState.valid;

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
            type="date"
            id={name}
            name={name}
            value={value}
            required={required}
            className={cn(
              // Base styles
              "w-full py-3 px-4 pr-10 rounded-xl",
              "bg-white dark:bg-slate-800",
              "text-slate-900 dark:text-white",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2",
              // Hide default calendar icon on some browsers
              "[&::-webkit-calendar-picker-indicator]:opacity-0",
              "[&::-webkit-calendar-picker-indicator]:absolute",
              "[&::-webkit-calendar-picker-indicator]:right-0",
              "[&::-webkit-calendar-picker-indicator]:w-full",
              "[&::-webkit-calendar-picker-indicator]:h-full",
              "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
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

          {/* Calendar icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
            <span className="material-symbols-outlined text-lg">calendar_today</span>
          </div>
        </div>

        {/* Error message */}
        <InlineError error={fieldState.error} id={`${name}-error`} />
      </div>
    );
  }
);

LabelledDateInput.displayName = "LabelledDateInput";

export default LabelledDateInput;
