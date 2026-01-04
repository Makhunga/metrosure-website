"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  familyMembers,
  funeralTiers,
  FUNERAL_COVER_CONSTANTS,
  funeralPlanBenefits,
} from "@/data/calculatorData";
import { CalculatorProgress, funeralCalculatorSteps } from "./CalculatorProgress";
import {
  CalculatorResultData,
  generateCalculatorWhatsAppUrl,
} from "@/lib/whatsapp";
import { EmailResultsModal } from "./EmailResultsModal";
import { FuneralCostBreakdown } from "./FuneralCostBreakdown";

export function FuneralCoverCalculator() {
  const [selectedMembers, setSelectedMembers] = useState<string[]>(["self"]);
  const [selectedTier, setSelectedTier] = useState<string>("standard");
  const [showResult, setShowResult] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Scroll to results on mobile
  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

          {/* Live Preview - shows before Calculate is clicked */}
          <AnimatePresence>
            {calculation && !showResult && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-sm">preview</span>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">Live Preview</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    R{calculation.totalCover.toLocaleString("en-ZA")}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">total cover</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  R{calculation.monthlyPremium.toLocaleString("en-ZA")}/mo • {calculation.planName}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Calculate Button */}
          <motion.button
            onClick={handleCalculate}
            className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-[#a50502] shadow-lg shadow-primary/20 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
                See Your Plan
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
                <strong>Indicative estimates only.</strong> Actual premiums depend on age, health, and insurer underwriting. This calculator provides a general guide - speak to our advisers for an accurate quote.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <div ref={resultsRef} className="lg:sticky lg:top-32 h-fit">
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

                {/* Funeral Cost Breakdown */}
                <FuneralCostBreakdown selectedCoverAmount={calculation.totalCover} />

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
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

                  {/* Share Buttons Row */}
                  <div className="flex gap-3">
                    {/* Email Results Button */}
                    <motion.button
                      onClick={() => setIsEmailModalOpen(true)}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 transition-all duration-300"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span className="material-symbols-outlined text-xl">mail</span>
                      <span className="hidden sm:inline">Email Results</span>
                    </motion.button>

                    {/* WhatsApp Share Button */}
                    <motion.button
                      onClick={() => {
                        const sharePayload: CalculatorResultData = {
                          calculatorType: "funeral",
                          totalAmount: calculation.totalCover,
                          monthlyPremium: calculation.monthlyPremium,
                          breakdown: selectedMembers.map((memberId) => {
                            const member = familyMembers.find((m) => m.id === memberId);
                            return {
                              label: member?.label || memberId,
                              value: Math.round(calculation.tier.coverAmount * (member?.coverMultiplier || 1)),
                            };
                          }),
                          planName: calculation.planName,
                          memberCount: calculation.memberCount,
                        };
                        const url = generateCalculatorWhatsAppUrl(sharePayload);
                        window.open(url, "_blank", "noopener,noreferrer");
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-[#128C7E] bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366]/50 transition-all duration-300"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span className="hidden sm:inline">WhatsApp</span>
                    </motion.button>
                  </div>

                  <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                    Quick application. Cover starts immediately.
                  </p>
                </motion.div>

                {/* Email Results Modal */}
                <EmailResultsModal
                  isOpen={isEmailModalOpen}
                  onClose={() => setIsEmailModalOpen(false)}
                  calculatorData={{
                    calculatorType: "funeral",
                    totalAmount: calculation.totalCover,
                    monthlyPremium: calculation.monthlyPremium,
                    breakdown: selectedMembers.map((memberId) => {
                      const member = familyMembers.find((m) => m.id === memberId);
                      return {
                        label: member?.label || memberId,
                        value: Math.round(calculation.tier.coverAmount * (member?.coverMultiplier || 1)),
                      };
                    }),
                    planName: calculation.planName,
                    memberCount: calculation.memberCount,
                  }}
                />
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
