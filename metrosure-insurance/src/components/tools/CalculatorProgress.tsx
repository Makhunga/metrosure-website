"use client";

import { motion } from "framer-motion";

// =============================================================================
// Types
// =============================================================================

export interface CalculatorStep {
  id: string;
  label: string;
  icon?: string;
}

interface CalculatorProgressProps {
  steps: CalculatorStep[];
  currentStep: number;
  completedSteps: number[];
  className?: string;
}

// =============================================================================
// Step Data
// =============================================================================

/**
 * Life Cover Calculator steps
 */
export const lifeCalculatorSteps: CalculatorStep[] = [
  { id: "income", label: "Income", icon: "payments" },
  { id: "debts", label: "Debts", icon: "credit_card" },
  { id: "dependents", label: "Dependents", icon: "family_restroom" },
  { id: "years", label: "Years", icon: "schedule" },
];

/**
 * Funeral Cover Calculator steps
 */
export const funeralCalculatorSteps: CalculatorStep[] = [
  { id: "members", label: "Family", icon: "family_restroom" },
  { id: "tier", label: "Coverage", icon: "workspace_premium" },
];

// =============================================================================
// Sub-components
// =============================================================================

interface StepCircleProps {
  step: CalculatorStep;
  index: number;
  isCurrent: boolean;
  isCompleted: boolean;
}

function StepCircle({ step, index, isCurrent, isCompleted }: StepCircleProps) {
  return (
    <div className="relative">
      {/* Pulse ring for current step */}
      {isCurrent && (
        <motion.div
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute inset-0 rounded-full bg-primary"
        />
      )}

      {/* Main circle */}
      <motion.div
        initial={false}
        animate={{
          scale: isCurrent ? 1.05 : 1,
          backgroundColor: isCompleted
            ? "#22c55e"
            : isCurrent
              ? "#BF0603"
              : "#e2e8f0",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`
          relative z-10 flex h-9 w-9 items-center justify-center rounded-full
          shadow-sm transition-shadow duration-300
          sm:h-10 sm:w-10
          ${isCurrent ? "shadow-md shadow-primary/30" : ""}
          ${isCompleted ? "shadow-md shadow-green-500/20" : ""}
        `}
      >
        {isCompleted ? (
          <motion.svg
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        ) : step.icon ? (
          <span
            className={`
              material-symbols-outlined text-lg transition-colors duration-200
              sm:text-xl
              ${isCurrent ? "text-white" : "text-slate-500 dark:text-slate-400"}
            `}
          >
            {step.icon}
          </span>
        ) : (
          <span
            className={`
              text-sm font-semibold transition-colors duration-200
              ${isCurrent ? "text-white" : "text-slate-500 dark:text-slate-400"}
            `}
          >
            {index + 1}
          </span>
        )}
      </motion.div>
    </div>
  );
}

interface ConnectorLineProps {
  isCompleted: boolean;
  isActive: boolean;
}

function ConnectorLine({ isCompleted, isActive }: ConnectorLineProps) {
  return (
    <div className="relative mx-1 h-0.5 flex-1 sm:mx-2">
      {/* Background line */}
      <div
        className={`
          absolute inset-0 rounded-full transition-all duration-300
          ${isCompleted || isActive
            ? "bg-transparent"
            : "bg-slate-200 dark:bg-slate-700"
          }
        `}
        style={{
          backgroundImage:
            !isCompleted && !isActive
              ? "repeating-linear-gradient(90deg, transparent, transparent 4px, currentColor 4px, currentColor 8px)"
              : "none",
          color: "rgb(203 213 225)", // slate-300
        }}
      />

      {/* Progress fill */}
      <motion.div
        initial={false}
        animate={{
          scaleX: isCompleted ? 1 : isActive ? 0.5 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`
          absolute inset-0 origin-left rounded-full
          ${isCompleted ? "bg-green-500" : "bg-primary"}
        `}
      />
    </div>
  );
}

// =============================================================================
// Main Component
// =============================================================================

export function CalculatorProgress({
  steps,
  currentStep,
  completedSteps,
  className = "",
}: CalculatorProgressProps) {
  const getStepStatus = (index: number) => {
    const isCompleted = completedSteps.includes(index);
    const isCurrent = currentStep === index;
    return { isCompleted, isCurrent };
  };

  return (
    <nav
      aria-label="Calculator progress"
      className={`w-full ${className}`}
    >
      {/* Desktop/Tablet view */}
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const { isCompleted, isCurrent } = getStepStatus(index);
          const isLast = index === steps.length - 1;

          return (
            <li
              key={step.id}
              className={`flex items-center ${isLast ? "" : "flex-1"}`}
              aria-current={isCurrent ? "step" : undefined}
            >
              <div className="flex flex-col items-center">
                {/* Circle */}
                <StepCircle
                  step={step}
                  index={index}
                  isCurrent={isCurrent}
                  isCompleted={isCompleted}
                />

                {/* Label - hidden on mobile */}
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className={`
                    mt-2 hidden text-xs font-medium transition-colors duration-200
                    sm:block
                    ${isCompleted
                      ? "text-green-600 dark:text-green-400"
                      : isCurrent
                        ? "text-primary dark:text-red-400"
                        : "text-slate-500 dark:text-slate-400"
                    }
                  `}
                >
                  {step.label}
                </motion.span>

                {/* Screen reader text */}
                <span className="sr-only">
                  {step.label}:{" "}
                  {isCompleted
                    ? "Completed"
                    : isCurrent
                      ? "Current step"
                      : "Not started"}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <ConnectorLine
                  isCompleted={completedSteps.includes(index)}
                  isActive={currentStep > index}
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* Mobile step indicator */}
      <div className="mt-2 flex items-center justify-center gap-2 sm:hidden">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
        <span className="text-xs font-semibold text-primary dark:text-red-400">
          {steps[currentStep]?.label}
        </span>
      </div>
    </nav>
  );
}

export default CalculatorProgress;
