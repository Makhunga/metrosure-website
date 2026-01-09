"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { InlineError } from "@/components/ui/InlineError";
import type { FieldState } from "@/lib/formValidation";

// ═══════════════════════════════════════════════════════════════════════════
// LABELLED SELECT COMPONENT
// Standard select with label above - clean, reliable pattern
// ═══════════════════════════════════════════════════════════════════════════

/** Option can be a string or an object with value and label */
export type SelectOption = string | { value: string; label: string };

export interface LabelledSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  /** Select label text */
  label: string;
  /** Array of options - can be strings or { value, label } objects */
  options: SelectOption[];
  /** Field validation state from formValidation lib */
  fieldState?: FieldState;
  /** Additional wrapper className */
  wrapperClassName?: string;
  /** Placeholder text shown when no value selected */
  placeholder?: string;
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
 * LabelledSelect - A standard labelled select component
 *
 * Features:
 * - Label positioned above the select
 * - Supports both string[] and { value, label }[] options
 * - Dark mode support via CSS variables
 * - Validation states (error, success)
 * - Custom dropdown arrow icon
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * // With string options
 * <LabelledSelect
 *   name="province"
 *   label="Province"
 *   options={["Gauteng", "Western Cape", "KwaZulu-Natal"]}
 *   value={province}
 *   required
 *   onChange={handleChange}
 * />
 *
 * // With object options
 * <LabelledSelect
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
export const LabelledSelect = forwardRef<HTMLSelectElement, LabelledSelectProps>(
  (
    {
      name,
      label,
      options,
      value,
      required = false,
      fieldState = { touched: false, error: null, valid: false },
      wrapperClassName,
      placeholder,
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

        {/* Select wrapper for relative positioning */}
        <div className="relative">
          <select
            ref={ref}
            id={name}
            name={name}
            value={value}
            required={required}
            className={cn(
              // Base styles
              "w-full py-3 px-4 pr-10 rounded-xl appearance-none cursor-pointer",
              "bg-white dark:bg-slate-800",
              "text-slate-900 dark:text-white",
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
          >
            <option value="">{placeholder || `Select ${label.toLowerCase()}...`}</option>
            {options.map((opt) => {
              const { value: optValue, label: optLabel } = normaliseOption(opt);
              return (
                <option key={optValue} value={optValue}>
                  {optLabel}
                </option>
              );
            })}
          </select>

          {/* Dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </div>
        </div>

        {/* Error message */}
        <InlineError error={fieldState.error} id={`${name}-error`} />
      </div>
    );
  }
);

LabelledSelect.displayName = "LabelledSelect";

export default LabelledSelect;
