'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Policy,
  getPolicyIcon,
  getStatusColour,
  formatCurrency,
  formatShortDate,
} from '@/data/portalMockData';

interface PolicyCardProps {
  policy: Policy;
  variant?: 'default' | 'compact' | 'expanded';
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
      delay: i * 0.1,
    },
  }),
};

const hoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
  },
};

// Policy type gradient backgrounds
const policyGradients: Record<Policy['type'], string> = {
  motor:
    'from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20',
  home: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20',
  life: 'from-rose-500/10 to-pink-500/10 dark:from-rose-500/20 dark:to-pink-500/20',
  business:
    'from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20',
  travel:
    'from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20',
};

const policyIconColours: Record<Policy['type'], string> = {
  motor: 'text-blue-600 dark:text-blue-400',
  home: 'text-emerald-600 dark:text-emerald-400',
  life: 'text-rose-600 dark:text-rose-400',
  business: 'text-violet-600 dark:text-violet-400',
  travel: 'text-amber-600 dark:text-amber-400',
};

const policyIconBg: Record<Policy['type'], string> = {
  motor: 'bg-blue-100 dark:bg-blue-900/50',
  home: 'bg-emerald-100 dark:bg-emerald-900/50',
  life: 'bg-rose-100 dark:bg-rose-900/50',
  business: 'bg-violet-100 dark:bg-violet-900/50',
  travel: 'bg-amber-100 dark:bg-amber-900/50',
};

function formatStatus(status: Policy['status']): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function PolicyCard({
  policy,
  variant = 'default',
  index = 0,
}: PolicyCardProps) {
  if (variant === 'compact') {
    return <CompactPolicyCard policy={policy} index={index} />;
  }

  if (variant === 'expanded') {
    return <ExpandedPolicyCard policy={policy} index={index} />;
  }

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
    >
      <motion.div variants={hoverVariants}>
        <Link
          href={`/portal/policies/${policy.id}`}
          className="block group"
        >
          <div
            className={`relative overflow-hidden rounded-2xl bg-[var(--surface-card)] border border-[var(--border-light)] shadow-sm hover:shadow-xl hover:border-[var(--border-medium)] transition-all duration-300`}
          >
            {/* Gradient header */}
            <div
              className={`h-2 bg-gradient-to-r ${policyGradients[policy.type]}`}
            />

            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl ${policyIconBg[policy.type]} flex items-center justify-center transition-transform group-hover:scale-110`}
                  >
                    <span
                      className={`material-symbols-outlined text-2xl ${policyIconColours[policy.type]}`}
                    >
                      {getPolicyIcon(policy.type)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colours">
                      {policy.name}
                    </h3>
                    <p className="text-xs text-[var(--text-body)]">
                      {policy.policyNumber}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColour(policy.status)}`}
                >
                  {formatStatus(policy.status)}
                </span>
              </div>

              {/* Cover Amount */}
              <div className="mb-4 p-3 rounded-xl bg-[var(--surface-inset)]">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[var(--text-muted)]">
                    Cover Amount
                  </span>
                  <span className="text-lg font-bold text-[var(--text-main)]">
                    {formatCurrency(policy.coverAmount)}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[var(--text-muted)] text-xs mb-0.5">
                    Premium
                  </p>
                  <p className="font-medium text-[var(--text-main)]">
                    {formatCurrency(policy.premium)}/{policy.frequency === 'monthly' ? 'mo' : 'yr'}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--text-muted)] text-xs mb-0.5">
                    Excess
                  </p>
                  <p className="font-medium text-[var(--text-main)]">
                    {formatCurrency(policy.excess)}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--text-muted)] text-xs mb-0.5">
                    Next Payment
                  </p>
                  <p className="font-medium text-[var(--text-main)]">
                    {formatShortDate(policy.nextPayment)}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--text-muted)] text-xs mb-0.5">
                    Valid Until
                  </p>
                  <p className="font-medium text-[var(--text-main)]">
                    {formatShortDate(policy.endDate)}
                  </p>
                </div>
              </div>

              {/* Hover Action */}
              <div className="mt-4 pt-4 border-t border-[var(--border-light)] flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">
                  {policy.features.length} benefits included
                </span>
                <span className="text-[var(--primary)] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Details
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// Compact variant for dashboard widgets
function CompactPolicyCard({
  policy,
  index,
}: {
  policy: Policy;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Link
        href={`/portal/policies/${policy.id}`}
        className="flex items-center gap-4 p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-light)] hover:border-[var(--border-medium)] hover:shadow-md transition-all group"
      >
        <div
          className={`w-10 h-10 rounded-lg ${policyIconBg[policy.type]} flex items-center justify-center flex-shrink-0`}
        >
          <span
            className={`material-symbols-outlined text-xl ${policyIconColours[policy.type]}`}
          >
            {getPolicyIcon(policy.type)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-[var(--text-main)] truncate group-hover:text-[var(--primary)] transition-colours">
            {policy.name}
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            {formatCurrency(policy.premium)}/{policy.frequency === 'monthly' ? 'mo' : 'yr'}
          </p>
        </div>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0 ${getStatusColour(policy.status)}`}
        >
          {formatStatus(policy.status)}
        </span>
        <span className="material-symbols-outlined text-[var(--text-subtle)] group-hover:text-[var(--primary)] transition-colors">
          chevron_right
        </span>
      </Link>
    </motion.div>
  );
}

// Expanded variant for policy details page
function ExpandedPolicyCard({
  policy,
  index,
}: {
  policy: Policy;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="rounded-2xl bg-[var(--surface-card)] border border-[var(--border-light)] shadow-sm overflow-hidden"
    >
      {/* Header with gradient */}
      <div
        className={`relative p-6 bg-gradient-to-br ${policyGradients[policy.type]}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl bg-[var(--surface-card)]/80 backdrop-blur-sm flex items-center justify-center shadow-lg`}
            >
              <span
                className={`material-symbols-outlined text-3xl ${policyIconColours[policy.type]}`}
              >
                {getPolicyIcon(policy.type)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-main)]">
                {policy.name}
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Policy #{policy.policyNumber}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColour(policy.status)}`}
          >
            <span className="w-2 h-2 rounded-full bg-current mr-2" />
            {formatStatus(policy.status)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-[var(--text-body)] mb-6">{policy.description}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-[var(--surface-inset)]">
            <p className="text-xs text-[var(--text-muted)] mb-1">Cover Amount</p>
            <p className="text-xl font-bold text-[var(--text-main)]">
              {formatCurrency(policy.coverAmount)}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--surface-inset)]">
            <p className="text-xs text-[var(--text-muted)] mb-1">Premium</p>
            <p className="text-xl font-bold text-[var(--text-main)]">
              {formatCurrency(policy.premium)}
              <span className="text-sm font-normal text-[var(--text-muted)]">
                /{policy.frequency === 'monthly' ? 'mo' : 'yr'}
              </span>
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--surface-inset)]">
            <p className="text-xs text-[var(--text-muted)] mb-1">Excess</p>
            <p className="text-xl font-bold text-[var(--text-main)]">
              {formatCurrency(policy.excess)}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--surface-inset)]">
            <p className="text-xs text-[var(--text-muted)] mb-1">Valid Until</p>
            <p className="text-xl font-bold text-[var(--text-main)]">
              {formatShortDate(policy.endDate)}
            </p>
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="font-semibold text-[var(--text-main)] mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--primary)]">
              check_circle
            </span>
            What&apos;s Covered
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {policy.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm text-[var(--text-body)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Insured Items */}
        {policy.insuredItems && policy.insuredItems.length > 0 && (
          <div className="mt-6 pt-6 border-t border-[var(--border-light)]">
            <h3 className="font-semibold text-[var(--text-main)] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--primary)]">
                inventory_2
              </span>
              Insured Items
            </h3>
            <div className="space-y-2">
              {policy.insuredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-inset)]"
                >
                  <div>
                    <p className="font-medium text-[var(--text-main)]">
                      {item.name}
                    </p>
                    {item.description && (
                      <p className="text-xs text-[var(--text-muted)]">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <p className="font-semibold text-[var(--text-main)]">
                    {formatCurrency(item.value)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 pt-6 border-t border-[var(--border-light)] flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium text-sm transition-colors shadow-lg shadow-primary/25">
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Submit Claim
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-medium)] text-[var(--text-body)] font-medium text-sm hover:bg-[var(--surface-inset)] transition-colors">
            <span className="material-symbols-outlined text-lg">edit</span>
            Update Cover
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-medium)] text-[var(--text-body)] font-medium text-sm hover:bg-[var(--surface-inset)] transition-colors">
            <span className="material-symbols-outlined text-lg">download</span>
            Download Schedule
          </button>
        </div>
      </div>
    </motion.div>
  );
}
