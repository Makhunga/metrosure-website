'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import PolicyCard from '@/components/portal/PolicyCard';
import { SectionHeader } from '@/components/portal/QuickActions';
import { mockPolicies, Policy, formatCurrency } from '@/data/portalMockData';

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

type FilterStatus = 'all' | 'active' | 'pending' | 'expired';
type FilterType = 'all' | Policy['type'];

export default function PoliciesPage() {
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');

  const filteredPolicies = mockPolicies.filter((policy) => {
    if (statusFilter !== 'all' && policy.status !== statusFilter) return false;
    if (typeFilter !== 'all' && policy.type !== typeFilter) return false;
    return true;
  });

  const activePolicies = mockPolicies.filter((p) => p.status === 'active');
  const totalMonthlyPremium = activePolicies.reduce(
    (sum, p) => sum + (p.frequency === 'monthly' ? p.premium : p.premium / 12),
    0
  );
  const totalCover = activePolicies.reduce((sum, p) => sum + p.coverAmount, 0);

  const statusOptions: { value: FilterStatus; label: string; count: number }[] = [
    { value: 'all', label: 'All Policies', count: mockPolicies.length },
    {
      value: 'active',
      label: 'Active',
      count: mockPolicies.filter((p) => p.status === 'active').length,
    },
    {
      value: 'pending',
      label: 'Pending',
      count: mockPolicies.filter((p) => p.status === 'pending').length,
    },
    {
      value: 'expired',
      label: 'Expired',
      count: mockPolicies.filter((p) => p.status === 'expired').length,
    },
  ];

  const typeOptions: { value: FilterType; label: string; icon: string }[] = [
    { value: 'all', label: 'All Types', icon: 'category' },
    { value: 'motor', label: 'Motor', icon: 'directions_car' },
    { value: 'home', label: 'Home', icon: 'home' },
    { value: 'life', label: 'Life', icon: 'favorite' },
    { value: 'business', label: 'Business', icon: 'business' },
    { value: 'travel', label: 'Travel', icon: 'flight' },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-[var(--text-main)] mb-2">
          My Policies
        </h1>
        <p className="text-[var(--text-muted)]">
          View and manage all your insurance policies in one place
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 border border-[var(--primary)]/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl text-[var(--primary)]">
                shield
              </span>
            </div>
            <span className="text-sm font-medium text-[var(--text-muted)]">
              Active Policies
            </span>
          </div>
          <p className="text-3xl font-bold text-[var(--text-main)]">
            {activePolicies.length}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl text-blue-600 dark:text-blue-400">
                payments
              </span>
            </div>
            <span className="text-sm font-medium text-[var(--text-muted)]">
              Monthly Premium
            </span>
          </div>
          <p className="text-3xl font-bold text-[var(--text-main)]">
            {formatCurrency(Math.round(totalMonthlyPremium))}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl text-emerald-600 dark:text-emerald-400">
                verified_user
              </span>
            </div>
            <span className="text-sm font-medium text-[var(--text-muted)]">
              Total Cover
            </span>
          </div>
          <p className="text-3xl font-bold text-[var(--text-main)]">
            {formatCurrency(totalCover)}
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
        {/* Status Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
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

        {/* Type Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 sm:ml-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          {typeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTypeFilter(option.value)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                typeFilter === option.value
                  ? 'bg-[var(--text-main)] text-white dark:bg-white dark:text-stone-900'
                  : 'bg-[var(--surface-inset)] text-[var(--text-body)] hover:bg-[var(--surface)] border border-[var(--border-light)]'
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                {option.icon}
              </span>
              <span className="hidden sm:inline">{option.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Policies Grid */}
      <motion.div variants={itemVariants}>
        {filteredPolicies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPolicies.map((policy, index) => (
              <PolicyCard key={policy.id} policy={policy} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-4 rounded-2xl bg-[var(--surface-inset)]">
            <span className="material-symbols-outlined text-5xl text-[var(--text-subtle)] mb-4">
              search_off
            </span>
            <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">
              No policies found
            </h3>
            <p className="text-[var(--text-muted)] max-w-md mx-auto">
              No policies match your current filters. Try adjusting your search
              criteria or browse all policies.
            </p>
            <button
              onClick={() => {
                setStatusFilter('all');
                setTypeFilter('all');
              }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)] text-white font-medium text-sm hover:bg-[var(--primary-hover)] transition-colours"
            >
              <span className="material-symbols-outlined text-lg">refresh</span>
              Clear Filters
            </button>
          </div>
        )}
      </motion.div>

      {/* Add New Policy CTA */}
      <motion.div variants={itemVariants}>
        <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-[var(--border-medium)] p-8 text-center hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all group cursor-pointer">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--surface-inset)] group-hover:bg-[var(--primary)]/10 flex items-center justify-center transition-colours">
            <span className="material-symbols-outlined text-3xl text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colours">
              add_circle
            </span>
          </div>
          <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">
            Add More Cover
          </h3>
          <p className="text-[var(--text-muted)] max-w-md mx-auto mb-4">
            Protect what matters most. Get a quote for additional insurance
            cover in minutes.
          </p>
          <a
            href="/quote"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white font-medium text-sm hover:bg-[var(--primary-hover)] transition-colours shadow-lg shadow-primary/25"
          >
            <span className="material-symbols-outlined text-lg">calculate</span>
            Get a Quote
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
