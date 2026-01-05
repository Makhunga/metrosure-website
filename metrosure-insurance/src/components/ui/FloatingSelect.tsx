"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { InlineError } from "@/components/ui/InlineError";
import type { FieldState } from "@/lib/formValidation";

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING SELECT COMPONENT
// Shared floating label select following the Metrosure design system
// ═══════════════════════════════════════════════════════════════════════════

/** Option can be a string or an object with value and label */
export type SelectOption = string | { value: string; label: string };

export interface FloatingSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  /** Select label text */
  label: string;
  /** Array of options - can be strings or { value, label } objects */
  options: SelectOption[];
  /** Field validation state from formValidation lib */
  fieldState?: FieldState;
  /** Additional wrapper className */
  wrapperClassName?: string;
}

/**
 * Normalise option to { value, label } format
 */
function normaliseOption(option: SelectOption): { value: string; label: string } {
  if (typeof option === "string") {
    return { value: option, label: option };
  }
  return option;
}

/**
 * FloatingSelect - A floating label select component
 *
 * Features:
 * - Floating label that appears when value is selected
 * - Supports both string[] and { value, label }[] options
 * - Dark mode support via CSS variables
 * - Validation states (error, success)
 * - Custom dropdown arrow icon
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * // With string options
 * <FloatingSelect
 *   name="province"
 *   label="Province"
 *   options={["Gauteng", "Western Cape", "KwaZulu-Natal"]}
 *   value={province}
 *   required
 *   onChange={handleChange}
 * />
 *
 * // With object options
 * <FloatingSelect
 *   name="industry"
 *   label="Industry"
 *   options={[
 *     { value: "retail", label: "Retail" },
 *     { value: "tech", label: "Technology" }
 *   ]}
 *   value={industry}
 *   required
 *   onChange={handleChange}
 * />
 * ```
 */
export const FloatingSelect = forwardRef<HTMLSelectElement, FloatingSelectProps>(
  (
    {
      name,
      label,
      options,
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
    const hasValue = value !== "" && value !== undefined;

    return (
      <div className={cn("relative", wrapperClassName)}>
        <select
          ref={ref}
          id={name}
          name={name}
          value={value}
          required={required}
          className={cn(
            // Base styles
            "peer w-full px-4 rounded-xl appearance-none cursor-pointer",
            "bg-white dark:bg-slate-800",
            "text-slate-900 dark:text-white",
            "transition-all duration-200",
            "focus:outline-none focus:ring-0",
            // Padding based on value state
            hasValue ? "pt-6 pb-3" : "py-4",
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
        >
          <option value="">{label}</option>
          {options.map((opt) => {
            const { value: optValue, label: optLabel } = normaliseOption(opt);
            return (
              <option key={optValue} value={optValue}>
                {optLabel}
              </option>
            );
          })}
        </select>

        {/* Floating label - only shows when value is selected */}
        {hasValue && (
          <label
            htmlFor={name}
            className={cn(
              "absolute left-4 top-2 text-xs pointer-events-none",
              hasError
                ? "text-red-500"
                : isValid
                  ? "text-green-500"
                  : "text-slate-400"
            )}
          >
            {label}
            {required && <span className="text-primary ml-0.5">*</span>}
          </label>
        )}

        {/* Dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
          <span className="material-symbols-outlined">expand_more</span>
        </div>

        {/* Error message */}
        <InlineError error={fieldState.error} id={`${name}-error`} />
      </div>
    );
  }
);

FloatingSelect.displayName = "FloatingSelect";

export default FloatingSelect;
