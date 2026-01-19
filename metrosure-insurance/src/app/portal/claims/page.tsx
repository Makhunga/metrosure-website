'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import ClaimsTimeline, { ClaimCard } from '@/components/portal/ClaimsTimeline';
import { mockClaims, Claim, formatCurrency } from '@/data/portalMockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

type FilterStatus = 'all' | 'active' | 'approved' | 'paid' | 'rejected';

export default function ClaimsPage() {
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

  const filteredClaims = mockClaims.filter((claim) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') {
      return claim.status === 'submitted' || claim.status === 'under_review';
    }
    return claim.status === statusFilter;
  });

  const activeClaims = mockClaims.filter(
    (c) => c.status === 'submitted' || c.status === 'under_review'
  );
  const approvedClaims = mockClaims.filter((c) => c.status === 'approved');
  const paidClaims = mockClaims.filter((c) => c.status === 'paid');
  const totalClaimed = mockClaims.reduce((sum, c) => sum + c.amount, 0);
  const totalPaid = paidClaims.reduce((sum, c) => sum + (c.approvedAmount || 0), 0);

  const statusOptions: { value: FilterStatus; label: string; count: number }[] = [
    { value: 'all', label: 'All Claims', count: mockClaims.length },
    { value: 'active', label: 'Active', count: activeClaims.length },
    { value: 'approved', label: 'Approved', count: approvedClaims.length },
    { value: 'paid', label: 'Paid', count: paidClaims.length },
    {
      value: 'rejected',
      label: 'Rejected',
      count: mockClaims.filter((c) => c.status === 'rejected').length,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)] mb-2">
            My Claims
          </h1>
          <p className="text-[var(--text-muted)]">
            Track and manage your insurance claims
          </p>
        </div>
        <Link
          href="/portal/claims/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white font-medium text-sm hover:bg-[var(--primary-hover)] transition-colours shadow-lg shadow-primary/25 w-fit"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Submit New Claim
        </Link>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 border border-indigo-500/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-lg text-indigo-600 dark:text-indigo-400">
              pending
            </span>
            <span className="text-sm text-[var(--text-muted)]">Active Claims</span>
          </div>
          <p className="text-2xl font-bold text-[var(--text-main)]">
            {activeClaims.length}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-lg text-emerald-600 dark:text-emerald-400">
              check_circle
            </span>
            <span className="text-sm text-[var(--text-muted)]">Approved</span>
          </div>
          <p className="text-2xl font-bold text-[var(--text-main)]">
            {approvedClaims.length + paidClaims.length}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-lg text-amber-600 dark:text-amber-400">
              receipt_long
            </span>
            <span className="text-sm text-[var(--text-muted)]">Total Claimed</span>
          </div>
          <p className="text-2xl font-bold text-[var(--text-main)]">
            {formatCurrency(totalClaimed)}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-lg text-blue-600 dark:text-blue-400">
              payments
            </span>
            <span className="text-sm text-[var(--text-muted)]">Total Paid</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(totalPaid)}
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants}>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                statusFilter === option.value
                  ? 'bg-[var(--primary)] text-white shadow-lg shadow-primary/25'
                  : 'bg-[var(--surface-inset)] text-[var(--text-body)] hover:bg-[var(--surface)] border border-[var(--border-light)]'
              }`}
            >
              {option.label}
              <span
                className={`px-1.5 py-0.5 rounded-full text-xs ${
                  statusFilter === option.value
                    ? 'bg-white/20 text-white'
                    : 'bg-[var(--surface)] text-[var(--text-muted)]'
                }`}
              >
                {option.count}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Claims Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Claims List */}
        <motion.div
          variants={itemVariants}
          className={`${selectedClaim ? 'xl:col-span-1' : 'xl:col-span-3'}`}
        >
          {filteredClaims.length > 0 ? (
            <div
              className={`grid gap-4 ${
                selectedClaim
                  ? 'grid-cols-1'
                  : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
              }`}
            >
              {filteredClaims.map((claim, index) =>
                selectedClaim ? (
                  <button
                    key={claim.id}
                    onClick={() => setSelectedClaim(claim)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      selectedClaim.id === claim.id
                        ? 'bg-[var(--primary)]/5 border-[var(--primary)]/20'
                        : 'bg-white dark:bg-stone-900 border-[var(--border-light)] hover:border-[var(--border-medium)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm text-[var(--text-main)]">
                          {claim.type}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {claim.claimNumber}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-[var(--text-subtle)]">
                        chevron_right
                      </span>
                    </div>
                  </button>
                ) : (
                  <div
                    key={claim.id}
                    onClick={() => setSelectedClaim(claim)}
                    className="cursor-pointer"
                  >
                    <ClaimCard claim={claim} index={index} />
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="text-center py-12 px-4 rounded-2xl bg-[var(--surface-inset)]">
              <span className="material-symbols-outlined text-5xl text-[var(--text-subtle)] mb-4">
                search_off
              </span>
              <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">
                No claims found
              </h3>
              <p className="text-[var(--text-muted)] max-w-md mx-auto">
                No claims match your current filters. Try adjusting your search
                criteria.
              </p>
              <button
                onClick={() => setStatusFilter('all')}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)] text-white font-medium text-sm hover:bg-[var(--primary-hover)] transition-colours"
              >
                <span className="material-symbols-outlined text-lg">refresh</span>
                Clear Filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Claim Detail Panel */}
        {selectedClaim && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="xl:col-span-2"
          >
            <div className="sticky top-24 bg-white dark:bg-stone-900 rounded-2xl border border-[var(--border-light)] p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[var(--text-main)]">
                  Claim Details
                </h2>
                <button
                  onClick={() => setSelectedClaim(null)}
                  className="p-2 rounded-lg hover:bg-[var(--surface-inset)] transition-colours"
                  aria-label="Close details"
                >
                  <span className="material-symbols-outlined text-[var(--text-muted)]">
                    close
                  </span>
                </button>
              </div>
              <ClaimsTimeline claim={selectedClaim} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Help Section */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
            <span className="material-symbols-outlined text-2xl text-red-600 dark:text-red-400 mb-3 block">
              help
            </span>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
              How to Submit a Claim
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">
              Learn about the claims process and what documents you need.
            </p>
            <a
              href="/help/claims"
              className="text-sm text-red-600 dark:text-red-400 font-medium hover:underline inline-flex items-center gap-1"
            >
              Read Guide
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
            <span className="material-symbols-outlined text-2xl text-red-600 dark:text-red-400 mb-3 block">
              timer
            </span>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
              Claims Processing Time
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">
              Most claims are processed within 5-10 business days.
            </p>
            <a
              href="/help/claims-timeline"
              className="text-sm text-red-600 dark:text-red-400 font-medium hover:underline inline-flex items-center gap-1"
            >
              Learn More
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
            <span className="material-symbols-outlined text-2xl text-red-600 dark:text-red-400 mb-3 block">
              support_agent
            </span>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
              Need Help?
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">
              Our claims team is available 24/7 to assist you.
            </p>
            <a
              href="tel:0860111911"
              className="text-sm text-red-600 dark:text-red-400 font-medium hover:underline inline-flex items-center gap-1"
            >
              Call 0860 111 911
              <span className="material-symbols-outlined text-lg">call</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
