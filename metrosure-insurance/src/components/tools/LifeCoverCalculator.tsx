"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CalculatorResult } from "./CalculatorResult";
import { LIFE_COVER_CONSTANTS, getLifeCoverComparisonText } from "@/data/calculatorData";

interface LifeCoverData {
  annualIncome: string;
  outstandingDebts: string;
  dependents: number;
  yearsOfSupport: number;
}

export function LifeCoverCalculator() {
  const [data, setData] = useState<LifeCoverData>({
    annualIncome: "",
    outstandingDebts: "",
    dependents: 0,
    yearsOfSupport: 10,
  });

  const [showResult, setShowResult] = useState(false);

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
    const { dependents, yearsOfSupport } = data;

    if (income === 0) return null;

    const incomeReplacement = income * yearsOfSupport;
    const debtClearance = debts;
    const educationFund = dependents * LIFE_COVER_CONSTANTS.EDUCATION_FUND_PER_CHILD;
    const emergencyFund = Math.round(income * LIFE_COVER_CONSTANTS.EMERGENCY_FUND_MULTIPLIER);

    const total = incomeReplacement + debtClearance + educationFund + emergencyFund;

    // Estimate monthly premium (rough estimate: R1 per R1000 cover)
    const estimatedPremium = Math.round(total / (1000 / LIFE_COVER_CONSTANTS.PREMIUM_PER_THOUSAND));

    return {
      incomeReplacement,
      debtClearance,
      educationFund,
      emergencyFund,
      total,
      estimatedPremium,
    };
  }, [data]);

  const handleCalculate = () => {
    if (calculation) {
      setShowResult(true);
    }
  };

  const canCalculate = parseAmount(data.annualIncome) > 0;

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
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Life Cover Calculator
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Answer a few questions to find out how much life insurance you need.
          </p>
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
                className="w-full pl-8 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              Your gross annual salary before tax
            </p>
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
                className="w-full pl-8 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              Include mortgage, car loans, credit cards, etc.
            </p>
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

          {/* Disclaimer */}
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/15 rounded-xl border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-lg mt-0.5">
                info
              </span>
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                <strong>Indicative estimates only.</strong> Actual premiums depend on age, health, smoking status, and insurer underwriting. This calculator provides a general guide—speak to our advisers for an accurate quote.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <div className="lg:sticky lg:top-32 h-fit">
        {showResult && calculation ? (
          <CalculatorResult
            title="Recommended Life Cover"
            totalAmount={calculation.total}
            monthlyPremium={calculation.estimatedPremium}
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
