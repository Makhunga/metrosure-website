"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  familyMembers,
  funeralTiers,
  FUNERAL_COVER_CONSTANTS,
  funeralPlanBenefits,
} from "@/data/calculatorData";
import { CalculatorProgress, funeralCalculatorSteps } from "./CalculatorProgress";

export function FuneralCoverCalculator() {
  const [selectedMembers, setSelectedMembers] = useState<string[]>(["self"]);
  const [selectedTier, setSelectedTier] = useState<string>("standard");
  const [showResult, setShowResult] = useState(false);

  const toggleMember = (memberId: string) => {
    setSelectedMembers((prev) => {
      if (prev.includes(memberId)) {
        // Don't allow removing "self" if it's the only one
        if (memberId === "self" && prev.length === 1) return prev;
        return prev.filter((id) => id !== memberId);
      }
      return [...prev, memberId];
    });
    setShowResult(false);
  };

  const calculation = useMemo(() => {
    const tier = funeralTiers.find((t) => t.id === selectedTier);
    if (!tier) return null;

    // Calculate total cover based on selected members
    const memberMultiplier = selectedMembers.reduce((sum, memberId) => {
      const member = familyMembers.find((m) => m.id === memberId);
      return sum + (member?.coverMultiplier || 0);
    }, 0);

    const totalCover = Math.round(tier.coverAmount * memberMultiplier);

    // Calculate premium (base + additional members)
    const additionalMembers = selectedMembers.length - 1;
    const monthlyPremium = tier.basePremium + additionalMembers * Math.round(tier.basePremium * FUNERAL_COVER_CONSTANTS.ADDITIONAL_MEMBER_MULTIPLIER);

    // Determine recommended plan name
    let planName = tier.name;
    if (selectedMembers.length >= 3) {
      planName = "Family " + tier.name;
    }

    return {
      totalCover,
      monthlyPremium,
      planName,
      tier,
      memberCount: selectedMembers.length,
    };
  }, [selectedMembers, selectedTier]);

  const handleCalculate = () => {
    if (selectedMembers.length > 0) {
      setShowResult(true);
    }
  };

  // Track completed steps for progress indicator
  const completedSteps = useMemo(() => {
    const completed: number[] = [];
    // Step 0: Family members selected (always complete since "self" is default)
    if (selectedMembers.length > 0) completed.push(0);
    // Step 1: Tier selected (always complete since "standard" is default)
    if (selectedTier) completed.push(1);
    return completed;
  }, [selectedMembers, selectedTier]);

  // Determine current step (which step the user is likely on)
  const currentStep = useMemo(() => {
    // If they haven't added anyone beyond self, they're on family selection
    if (selectedMembers.length === 1 && selectedMembers[0] === "self") return 0;
    // Otherwise they're on tier selection
    return 1;
  }, [selectedMembers]);

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
            Funeral Cover Calculator
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Find the right funeral plan for you and your family.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
          <CalculatorProgress
            steps={funeralCalculatorSteps}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        </div>

        <div className="space-y-8">
          {/* Family Members Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
              Who do you want to cover?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {familyMembers.map((member) => {
                const isSelected = selectedMembers.includes(member.id);
                return (
                  <motion.button
                    key={member.id}
                    onClick={() => toggleMember(member.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 dark:bg-primary/15"
                        : "border-slate-200 dark:border-slate-600 hover:border-primary/50 bg-white dark:bg-slate-700/30"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-primary text-white"
                            : "bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-300"
                        }`}
                      >
                        <span className="material-symbols-outlined">{member.icon}</span>
                      </div>
                      <span
                        className={`font-medium ${
                          isSelected
                            ? "text-primary"
                            : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {member.label}
                      </span>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-2 right-2"
                      >
                        <span className="material-symbols-outlined text-primary">
                          check_circle
                        </span>
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 text-center">
              {selectedMembers.length} {selectedMembers.length === 1 ? "person" : "people"} selected
            </p>
          </div>

          {/* Ceremony Tier Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
              Choose your ceremony preference
            </label>
            <div className="space-y-3">
              {funeralTiers.map((tier) => {
                const isSelected = selectedTier === tier.id;
                return (
                  <motion.button
                    key={tier.id}
                    onClick={() => {
                      setSelectedTier(tier.id);
                      setShowResult(false);
                    }}
                    className={`w-full p-5 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 dark:bg-primary/15"
                        : "border-slate-200 dark:border-slate-600 hover:border-primary/50 bg-white dark:bg-slate-700/30"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-bold ${
                              isSelected ? "text-primary" : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {tier.name}
                          </span>
                          {tier.isPopular && (
                            <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {tier.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          R{tier.coverAmount.toLocaleString("en-ZA")}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          From R{tier.basePremium}/mo
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute top-4 right-4">
                        <span className="material-symbols-outlined text-primary">
                          check_circle
                        </span>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Calculate Button */}
          <motion.button
            onClick={handleCalculate}
            className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-[#a50502] shadow-lg shadow-primary/20 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
                <strong>Indicative estimates only.</strong> Actual premiums depend on age, health, and insurer underwriting. This calculator provides a general guide—speak to our advisers for an accurate quote.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <div className="lg:sticky lg:top-32 h-fit">
        <AnimatePresence mode="wait">
          {showResult && calculation ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl"
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-primary via-primary to-[#a50502] p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <pattern id="funeral-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#funeral-grid)" />
                  </svg>
                </div>

                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-full mb-4"
                  >
                    <span className="material-symbols-outlined text-sm">recommend</span>
                    <span className="text-sm font-medium">Recommended Plan</span>
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-3xl font-bold mb-2"
                  >
                    {calculation.planName}
                  </motion.h3>

                  <div className="flex items-baseline gap-2">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-5xl font-bold"
                    >
                      R{calculation.totalCover.toLocaleString("en-ZA")}
                    </motion.span>
                    <span className="text-white/80">cover</span>
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-xl"
                  >
                    <span className="text-white/70">From </span>
                    <span className="font-bold">R{calculation.monthlyPremium}</span>
                    <span className="text-white/70">/month</span>
                  </motion.p>
                </div>
              </div>

              {/* Body */}
              <div className="p-8">
                {/* Coverage Summary */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                    Your Coverage Includes
                  </h4>
                  <div className="space-y-3">
                    {selectedMembers.map((memberId) => {
                      const member = familyMembers.find((m) => m.id === memberId);
                      if (!member) return null;
                      const memberCover = Math.round(
                        calculation.tier.coverAmount * member.coverMultiplier
                      );
                      return (
                        <motion.div
                          key={memberId}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                              <span className="material-symbols-outlined text-primary text-sm">
                                {member.icon}
                              </span>
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white">
                              {member.label}
                            </span>
                          </div>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            R{memberCover.toLocaleString("en-ZA")}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Benefits */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/15 rounded-xl border border-emerald-200 dark:border-emerald-800"
                >
                  <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
                    Plan Benefits
                  </h4>
                  <ul className="space-y-1.5 text-sm text-emerald-700 dark:text-emerald-400">
                    {funeralPlanBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">check</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Comparison */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/15 rounded-xl border border-amber-200 dark:border-amber-800"
                >
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 mt-0.5">
                      lightbulb
                    </span>
                    <div>
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                        Good to know
                      </p>
                      <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                        The average funeral in South Africa costs between R15,000 and R50,000. Your {calculation.tier.name} plan ensures a dignified service.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href={`/quote?coverageType=funeral&coverageAmount=${calculation.totalCover}&planTier=${calculation.tier.id}`}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-[#a50502] text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 group"
                  >
                    Apply for This Plan
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                  <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">
                    Quick application. Cover starts immediately.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-slate-50 dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-600 p-12 text-center"
            >
              <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
                family_restroom
              </span>
              <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
                Your plan will appear here
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                Select your family members and ceremony preference, then click &quot;Calculate&quot; to see your recommended plan.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FuneralCoverCalculator;
