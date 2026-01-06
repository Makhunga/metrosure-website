"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { InlineError } from "@/components/ui/InlineError";
import type { FieldState } from "@/lib/formValidation";

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING DATE INPUT COMPONENT
// Shared floating label date input following the Metrosure design system
// ═══════════════════════════════════════════════════════════════════════════

export interface FloatingDateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
  /** Input label text */
  label: string;
  /** Field validation state from formValidation lib */
  fieldState?: FieldState;
  /** Additional wrapper className */
  wrapperClassName?: string;
}

/**
 * FloatingDateInput - A floating label date input component
 *
 * Features:
 * - Floating label that animates on focus/value
 * - Dark mode support via CSS variables
 * - Validation states (error, success)
 * - Custom calendar icon
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <FloatingDateInput
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
export const FloatingDateInput = forwardRef<HTMLInputElement, FloatingDateInputProps>(
  (
    {
      name,
      label,
      value,
      required = false,
      fieldState = { touched: false, error: null, valid: false },
      wrapperClassName,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasError = fieldState.touched && fieldState.error;
    const isValid = fieldState.touched && fieldState.valid;
    const hasValue = value !== "" && value !== undefined;

    // Label should float when focused OR has value
    const shouldFloat = isFocused || hasValue;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div className={cn("relative", wrapperClassName)}>
        <input
          ref={ref}
          type="date"
          id={name}
          name={name}
          value={value}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            // Base styles
            "w-full pt-6 pb-3 px-4 rounded-xl",
            "bg-white dark:bg-slate-800",
            "text-slate-900 dark:text-white",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-0",
            // Hide default calendar icon on some browsers
            "[&::-webkit-calendar-picker-indicator]:opacity-0",
            "[&::-webkit-calendar-picker-indicator]:absolute",
            "[&::-webkit-calendar-picker-indicator]:right-0",
            "[&::-webkit-calendar-picker-indicator]:w-full",
            "[&::-webkit-calendar-picker-indicator]:h-full",
            "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
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
        <motion.label
          htmlFor={name}
          className={cn(
            "absolute left-3 pointer-events-none origin-left",
            // Background to mask border when floating
            shouldFloat && "bg-white dark:bg-slate-800 px-1",
            // Colour states
            hasError
              ? "text-red-500"
              : isValid
                ? "text-green-500"
                : isFocused
                  ? "text-primary"
                  : "text-slate-400"
          )}
          initial={false}
          animate={{
            y: shouldFloat ? -24 : 8,
            scale: shouldFloat ? 0.85 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          style={{ top: 16 }}
        >
          {label}
          {required && <span className="text-primary ml-0.5">*</span>}
        </motion.label>

        {/* Calendar icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
          <span className="material-symbols-outlined">calendar_today</span>
        </div>

        {/* Error message */}
        <InlineError error={fieldState.error} id={`${name}-error`} />
      </div>
    );
  }
);

FloatingDateInput.displayName = "FloatingDateInput";

export default FloatingDateInput;
