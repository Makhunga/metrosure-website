"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
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
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasError = fieldState.touched && fieldState.error;
    const isValid = fieldState.touched && fieldState.valid;
    const currentLength = charCount ?? (typeof value === "string" ? value.length : 0);
    const isAtLimit = maxLength ? currentLength >= maxLength : false;
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
          type={type}
          id={name}
          name={name}
          value={value}
          placeholder=" "
          required={required}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            // Base styles
            "w-full pt-6 pb-3 px-4 rounded-xl",
            "bg-white dark:bg-slate-800",
            "text-slate-900 dark:text-white",
            "transition-colors duration-200",
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
