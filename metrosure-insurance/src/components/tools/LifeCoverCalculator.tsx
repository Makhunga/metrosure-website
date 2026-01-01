"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalculatorResult } from "./CalculatorResult";
import { CalculatorProgress, lifeCalculatorSteps } from "./CalculatorProgress";
import { LIFE_COVER_CONSTANTS, VALIDATION_CONSTANTS, getLifeCoverComparisonText, getAgePremiumFactor } from "@/data/calculatorData";

interface LifeCoverData {
  annualIncome: string;
  outstandingDebts: string;
  dependents: number;
  yearsOfSupport: number;
  age: number;
  isSmoker: boolean;
}

export function LifeCoverCalculator() {
  const [data, setData] = useState<LifeCoverData>({
    annualIncome: "",
    outstandingDebts: "",
    dependents: 0,
    yearsOfSupport: 10,
    age: LIFE_COVER_CONSTANTS.DEFAULT_AGE,
    isSmoker: false,
  });

  const [showResult, setShowResult] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Scroll to results on mobile
  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Parse currency input
  const parseAmount = (value: string): number => {
    return parseInt(value.replace(/[^\d]/g, "")) || 0;
  };

  // Format currency for display
  const formatCurrency = (value: string): string => {
    const num = parseAmount(value);
    if (num === 0) return "";
    return num.toLocaleString("en-ZA");
  };

  // Handle currency input change
  const handleCurrencyChange = (field: "annualIncome" | "outstandingDebts", value: string) => {
    // Only allow numbers
    const cleaned = value.replace(/[^\d]/g, "");
    setData((prev) => ({ ...prev, [field]: cleaned }));
    setShowResult(false);
  };

  // Calculate coverage breakdown
  const calculation = useMemo(() => {
    const income = parseAmount(data.annualIncome);
    const debts = parseAmount(data.outstandingDebts);
    const { dependents, yearsOfSupport, age, isSmoker } = data;

    if (income === 0) return null;

    const incomeReplacement = income * yearsOfSupport;
    const debtClearance = debts;
    const educationFund = dependents * LIFE_COVER_CONSTANTS.EDUCATION_FUND_PER_CHILD;
    const emergencyFund = Math.round(income * LIFE_COVER_CONSTANTS.EMERGENCY_FUND_MULTIPLIER);

    const total = incomeReplacement + debtClearance + educationFund + emergencyFund;

    // Calculate personalised premium using age and smoker factors
    const ageFactor = getAgePremiumFactor(age);
    const smokerFactor = isSmoker ? LIFE_COVER_CONSTANTS.SMOKER_LOADING : 1.0;
    const basePremium = Math.round(total / (1000 / LIFE_COVER_CONSTANTS.PREMIUM_PER_THOUSAND));
    const adjustedPremium = Math.round(basePremium * ageFactor * smokerFactor);
    const variance = LIFE_COVER_CONSTANTS.PREMIUM_VARIANCE;
    const premiumLow = Math.round(adjustedPremium * (1 - variance));
    const premiumHigh = Math.round(adjustedPremium * (1 + variance));

    return {
      incomeReplacement,
      debtClearance,
      educationFund,
      emergencyFund,
      total,
      premiumLow,
      premiumHigh,
      age,
      isSmoker,
    };
  }, [data]);

  const handleCalculate = () => {
    if (calculation) {
      setShowResult(true);
    }
  };

  const canCalculate = parseAmount(data.annualIncome) > 0;

  // Validation states
  const incomeValidation = useMemo(() => {
    const income = parseAmount(data.annualIncome);
    if (income === 0) return { type: "hint" as const, message: VALIDATION_CONSTANTS.MESSAGES.INCOME_HINT };
    if (income < VALIDATION_CONSTANTS.INCOME.MIN) return { type: "warning" as const, message: VALIDATION_CONSTANTS.MESSAGES.INCOME_TOO_LOW };
    if (income > VALIDATION_CONSTANTS.INCOME.MAX) return { type: "warning" as const, message: VALIDATION_CONSTANTS.MESSAGES.INCOME_TOO_HIGH };
    return { type: "hint" as const, message: VALIDATION_CONSTANTS.MESSAGES.INCOME_HINT };
  }, [data.annualIncome]);

  const debtValidation = useMemo(() => {
    const debts = parseAmount(data.outstandingDebts);
    if (debts > VALIDATION_CONSTANTS.DEBT.MAX) return { type: "warning" as const, message: VALIDATION_CONSTANTS.MESSAGES.DEBT_TOO_HIGH };
    return { type: "hint" as const, message: VALIDATION_CONSTANTS.MESSAGES.DEBT_HINT };
  }, [data.outstandingDebts]);

  // Track completed steps for progress indicator
  const completedSteps = useMemo(() => {
    const completed: number[] = [];
    if (parseAmount(data.annualIncome) > 0) completed.push(0); // Income
    if (parseAmount(data.outstandingDebts) > 0) completed.push(1); // Debts
    if (data.dependents > 0) completed.push(2); // Family
    if (data.yearsOfSupport !== LIFE_COVER_CONSTANTS.DEFAULT_YEARS_SUPPORT) completed.push(3); // Years
    if (data.age !== LIFE_COVER_CONSTANTS.DEFAULT_AGE) completed.push(4); // Age
    // Profile (smoker) is always "complete" once user has made a choice (default is non-smoker)
    completed.push(5);
    return completed;
  }, [data]);

  // Determine current step (first incomplete step)
  const currentStep = useMemo(() => {
    if (parseAmount(data.annualIncome) === 0) return 0;
    if (parseAmount(data.outstandingDebts) === 0) return 1;
    if (data.dependents === 0) return 2;
    if (data.yearsOfSupport === LIFE_COVER_CONSTANTS.DEFAULT_YEARS_SUPPORT) return 3;
    if (data.age === LIFE_COVER_CONSTANTS.DEFAULT_AGE) return 4;
    return 5;
  }, [data]);

  const breakdown = calculation
    ? [
        { label: "Income Replacement", value: calculation.incomeReplacement, color: "#BF0603" },
        { label: "Debt Clearance", value: calculation.debtClearance, color: "#690025" },
        { label: "Education Fund", value: calculation.educationFund, color: "#EF4444" },
        { label: "Emergency Fund", value: calculation.emergencyFund, color: "#F97316" },
      ].filter((item) => item.value > 0)
    : [];

  const comparisonText = calculation
    ? getLifeCoverComparisonText(calculation.total)
    : "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Calculator Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-lg"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Life Cover Calculator
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Answer a few questions to find out how much life insurance you need.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
          <CalculatorProgress
            steps={lifeCalculatorSteps}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        </div>

        <div className="space-y-6">
          {/* Annual Income */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              What is your annual income?
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-medium">
                R
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={formatCurrency(data.annualIncome)}
                onChange={(e) => handleCurrencyChange("annualIncome", e.target.value)}
                placeholder="500,000"
                className={`w-full pl-8 pr-4 py-4 rounded-xl border bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white text-lg font-medium focus:outline-none focus:ring-2 transition-all ${
                  incomeValidation.type === "warning"
                    ? "border-amber-400 dark:border-amber-500 focus:ring-amber-200 dark:focus:ring-amber-800 focus:border-amber-500"
                    : "border-slate-200 dark:border-slate-600 focus:ring-primary/20 focus:border-primary"
                }`}
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={incomeValidation.type + incomeValidation.message}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className={`mt-1.5 flex items-center gap-1.5 text-xs ${
                  incomeValidation.type === "warning"
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {incomeValidation.type === "warning" ? "warning" : "info"}
                </span>
                <span>{incomeValidation.message}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Outstanding Debts */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Total outstanding debts
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-medium">
                R
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={formatCurrency(data.outstandingDebts)}
                onChange={(e) => handleCurrencyChange("outstandingDebts", e.target.value)}
                placeholder="1,000,000"
                className={`w-full pl-8 pr-4 py-4 rounded-xl border bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white text-lg font-medium focus:outline-none focus:ring-2 transition-all ${
                  debtValidation.type === "warning"
                    ? "border-amber-400 dark:border-amber-500 focus:ring-amber-200 dark:focus:ring-amber-800 focus:border-amber-500"
                    : "border-slate-200 dark:border-slate-600 focus:ring-primary/20 focus:border-primary"
                }`}
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={debtValidation.type + debtValidation.message}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className={`mt-1.5 flex items-center gap-1.5 text-xs ${
                  debtValidation.type === "warning"
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {debtValidation.type === "warning" ? "warning" : "info"}
                </span>
                <span>{debtValidation.message}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Number of Dependents */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Number of dependents
            </label>
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    dependents: Math.max(0, prev.dependents - 1),
                  }))
                }
                className="w-14 h-14 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 font-bold text-2xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                disabled={data.dependents === 0}
                whileTap={{ scale: 0.95 }}
              >
                -
              </motion.button>
              <div className="flex-1 text-center">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">
                  {data.dependents}
                </span>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {data.dependents === 1 ? "dependent" : "dependents"}
                </p>
              </div>
              <motion.button
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    dependents: Math.min(LIFE_COVER_CONSTANTS.MAX_DEPENDENTS, prev.dependents + 1),
                  }))
                }
                className="w-14 h-14 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 font-bold text-2xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                +
              </motion.button>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-center">
              We allocate R250,000 per dependent for education
            </p>
          </div>

          {/* Years of Support */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Years of income replacement needed
            </label>
            <div className="px-2">
              <input
                type="range"
                min={LIFE_COVER_CONSTANTS.MIN_YEARS_SUPPORT}
                max={LIFE_COVER_CONSTANTS.MAX_YEARS_SUPPORT}
                value={data.yearsOfSupport}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    yearsOfSupport: parseInt(e.target.value),
                  }));
                  setShowResult(false);
                }}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">{LIFE_COVER_CONSTANTS.MIN_YEARS_SUPPORT} years</span>
                <span className="text-lg font-bold text-primary">{data.yearsOfSupport} years</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{LIFE_COVER_CONSTANTS.MAX_YEARS_SUPPORT} years</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-center">
              How long should your family be financially supported?
            </p>
          </div>

          {/* Age Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Your current age
            </label>
            <div className="px-2">
              <input
                type="range"
                min={LIFE_COVER_CONSTANTS.MIN_AGE}
                max={LIFE_COVER_CONSTANTS.MAX_AGE}
                value={data.age}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    age: parseInt(e.target.value),
                  }));
                  setShowResult(false);
                }}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">{LIFE_COVER_CONSTANTS.MIN_AGE}</span>
                <span className="text-lg font-bold text-primary">{data.age} years</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{LIFE_COVER_CONSTANTS.MAX_AGE}</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-center">
              Premiums increase with age
            </p>
          </div>

          {/* Smoker Toggle */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Do you smoke?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: false, label: "Non-smoker", icon: "smoke_free" },
                { value: true, label: "Smoker", icon: "smoking_rooms" },
              ].map((option) => (
                <motion.button
                  key={option.label}
                  type="button"
                  onClick={() => {
                    setData((prev) => ({ ...prev, isSmoker: option.value }));
                    setShowResult(false);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    data.isSmoker === option.value
                      ? "border-primary bg-primary/5 dark:bg-primary/15"
                      : "border-slate-200 dark:border-slate-600 hover:border-primary/50"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className={`material-symbols-outlined text-2xl ${
                        data.isSmoker === option.value
                          ? "text-primary"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {option.icon}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        data.isSmoker === option.value
                          ? "text-primary"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-center">
              Smokers typically pay 50% more due to health risks
            </p>
          </div>

          {/* Calculate Button */}
          <motion.button
            onClick={handleCalculate}
            disabled={!canCalculate}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              canCalculate
                ? "bg-primary text-white hover:bg-[#a50502] shadow-lg shadow-primary/20"
                : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
            }`}
            whileHover={canCalculate ? { scale: 1.02 } : {}}
            whileTap={canCalculate ? { scale: 0.98 } : {}}
          >
            Calculate My Cover
          </motion.button>

          {/* Mobile scroll-to-results button */}
          <AnimatePresence>
            {showResult && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={scrollToResults}
                className="lg:hidden w-full mt-3 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  arrow_downward
                </span>
                See Your Results
              </motion.button>
            )}
          </AnimatePresence>

          {/* Disclaimer */}
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/15 rounded-xl border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-lg mt-0.5">
                info
              </span>
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                <strong>Personalised estimate.</strong> This calculation uses your age ({data.age}) and smoking status for a more accurate range. Actual premiums depend on detailed health history, occupation, and insurer underwriting. Speak to our advisers for a final quote.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <div ref={resultsRef} className="lg:sticky lg:top-32 h-fit">
        {showResult && calculation ? (
          <CalculatorResult
            title="Recommended Life Cover"
            totalAmount={calculation.total}
            premiumLow={calculation.premiumLow}
            premiumHigh={calculation.premiumHigh}
            breakdown={breakdown}
            comparisonText={comparisonText}
            ctaText="Get a Quote for This Amount"
            ctaLink={`/quote?coverageType=life&coverageAmount=${calculation.total}`}
            isVisible={showResult}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-50 dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-600 p-12 text-center"
          >
            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
              calculate
            </span>
            <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
              Your results will appear here
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Fill in your details and click &quot;Calculate&quot; to see your recommended life cover amount.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default LifeCoverCalculator;
