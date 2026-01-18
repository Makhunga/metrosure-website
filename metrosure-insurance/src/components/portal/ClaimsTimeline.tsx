'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Claim,
  ClaimTimelineEvent,
  getStatusColour,
  formatCurrency,
  formatShortDate,
  formatDate,
  getPolicyIcon,
} from '@/data/portalMockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

interface ClaimsTimelineProps {
  claim: Claim;
  compact?: boolean;
}

export default function ClaimsTimeline({ claim, compact = false }: ClaimsTimelineProps) {
  if (compact) {
    return <CompactTimeline claim={claim} />;
  }

  return (
    <div className="relative">
      {/* Claim Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-[var(--primary)]">
                {getPolicyIcon(claim.policyType)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-main)]">
                {claim.type}
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                {claim.claimNumber}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColour(claim.status)}`}
          >
            {formatClaimStatus(claim.status)}
          </span>
        </div>

        {/* Amount display */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[var(--surface-inset)]">
          <div>
            <p className="text-xs text-[var(--text-muted)] mb-1">Claimed Amount</p>
            <p className="text-xl font-bold text-[var(--text-main)]">
              {formatCurrency(claim.amount)}
            </p>
          </div>
          {claim.approvedAmount !== undefined && (
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">Approved Amount</p>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(claim.approvedAmount)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative"
      >
        {/* Timeline line */}
        <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--primary)] via-[var(--border-medium)] to-[var(--border-light)]" />

        <ul className="space-y-0">
          {claim.timeline.map((event, index) => (
            <TimelineEvent
              key={event.id}
              event={event}
              isFirst={index === 0}
              isLast={index === claim.timeline.length - 1}
            />
          ))}
        </ul>
      </motion.div>

      {/* Documents section */}
      {claim.documents && claim.documents.length > 0 && (
        <div className="mt-6 pt-6 border-t border-[var(--border-light)]">
          <h4 className="font-medium text-[var(--text-main)] mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-[var(--text-muted)]">
              folder
            </span>
            Attached Documents
          </h4>
          <ul className="space-y-2">
            {claim.documents.map((doc) => (
              <li
                key={doc.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-inset)] hover:bg-[var(--surface)] transition-colours"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[var(--text-muted)]">
                    {doc.type === 'pdf' ? 'picture_as_pdf' : 'folder_zip'}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-main)]">
                      {doc.name}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      Uploaded {formatShortDate(doc.uploadedAt)}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    doc.status === 'approved'
                      ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950'
                      : doc.status === 'rejected'
                        ? 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950'
                        : 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950'
                  }`}
                >
                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Individual timeline event
function TimelineEvent({
  event,
  isFirst,
  isLast,
}: {
  event: ClaimTimelineEvent;
  isFirst: boolean;
  isLast: boolean;
}) {
  const isCompleted = event.status === 'completed';
  const isCurrent = event.status === 'current';
  const isPending = event.status === 'pending';

  return (
    <motion.li variants={itemVariants} className="relative pl-12 pb-6">
      {/* Timeline dot */}
      <div
        className={`absolute left-0 w-12 h-12 flex items-center justify-center ${
          isFirst ? 'top-0' : ''
        }`}
      >
        <div
          className={`relative flex items-center justify-center w-12 h-12 rounded-full ${
            isCompleted
              ? 'bg-emerald-100 dark:bg-emerald-900/50'
              : isCurrent
                ? 'bg-[var(--primary)]/10'
                : 'bg-[var(--surface-inset)]'
          }`}
        >
          {isCurrent && (
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="absolute inset-0 rounded-full bg-[var(--primary)]/30"
            />
          )}
          <span
            className={`material-symbols-outlined text-xl relative z-10 ${
              isCompleted
                ? 'text-emerald-600 dark:text-emerald-400'
                : isCurrent
                  ? 'text-[var(--primary)]'
                  : 'text-[var(--text-subtle)]'
            }`}
          >
            {isCompleted
              ? 'check_circle'
              : isCurrent
                ? event.icon || 'pending'
                : event.icon || 'radio_button_unchecked'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className={`p-4 rounded-xl ${
          isCurrent
            ? 'bg-[var(--primary)]/5 border border-[var(--primary)]/20'
            : isPending
              ? 'bg-[var(--surface-inset)]/50 opacity-60'
              : 'bg-[var(--surface-inset)]'
        }`}
      >
        <div className="flex items-start justify-between mb-1">
          <h4
            className={`font-medium ${
              isPending ? 'text-[var(--text-muted)]' : 'text-[var(--text-main)]'
            }`}
          >
            {event.title}
          </h4>
          {event.date && (
            <span className="text-xs text-[var(--text-subtle)]">
              {formatShortDate(event.date)}
            </span>
          )}
        </div>
        <p
          className={`text-sm ${
            isPending ? 'text-[var(--text-subtle)]' : 'text-[var(--text-muted)]'
          }`}
        >
          {event.description}
        </p>
      </div>
    </motion.li>
  );
}

// Compact timeline for dashboard/list views
function CompactTimeline({ claim }: { claim: Claim }) {
  const completedSteps = claim.timeline.filter((e) => e.status === 'completed').length;
  const totalSteps = claim.timeline.length;
  const progress = (completedSteps / totalSteps) * 100;

  return (
    <Link
      href={`/portal/claims/${claim.id}`}
      className="block p-4 rounded-xl bg-white dark:bg-stone-900 border border-[var(--border-light)] hover:border-[var(--border-medium)] hover:shadow-md transition-all group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-xl text-[var(--primary)]">
              {getPolicyIcon(claim.policyType)}
            </span>
          </div>
          <div>
            <h4 className="font-medium text-sm text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colours">
              {claim.type}
            </h4>
            <p className="text-xs text-[var(--text-muted)]">
              {claim.claimNumber}
            </p>
          </div>
        </div>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColour(claim.status)}`}
        >
          {formatClaimStatus(claim.status)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-1">
          <span>Progress</span>
          <span>
            {completedSteps}/{totalSteps} steps
          </span>
        </div>
        <div className="h-2 rounded-full bg-[var(--surface-inset)] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-emerald-500"
          />
        </div>
      </div>

      {/* Mini timeline dots */}
      <div className="flex items-center gap-1.5 mb-3">
        {claim.timeline.map((event) => (
          <div
            key={event.id}
            className={`w-2 h-2 rounded-full flex-shrink-0 ${
              event.status === 'completed'
                ? 'bg-emerald-500'
                : event.status === 'current'
                  ? 'bg-[var(--primary)] animate-pulse'
                  : 'bg-[var(--border-medium)]'
            }`}
            title={event.title}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-light)]">
        <div className="flex items-center gap-4 text-xs">
          <span className="text-[var(--text-muted)]">
            Claimed: <strong className="text-[var(--text-main)]">{formatCurrency(claim.amount)}</strong>
          </span>
          {claim.approvedAmount !== undefined && (
            <span className="text-emerald-600 dark:text-emerald-400">
              Approved: <strong>{formatCurrency(claim.approvedAmount)}</strong>
            </span>
          )}
        </div>
        <span className="material-symbols-outlined text-[var(--text-subtle)] group-hover:text-[var(--primary)] transition-colours">
          chevron_right
        </span>
      </div>
    </Link>
  );
}

// Claim card for list views
interface ClaimCardProps {
  claim: Claim;
  index?: number;
}

export function ClaimCard({ claim, index = 0 }: ClaimCardProps) {
  const completedSteps = claim.timeline.filter((e) => e.status === 'completed').length;
  const totalSteps = claim.timeline.length;
  const progress = (completedSteps / totalSteps) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100, damping: 15 }}
    >
      <Link
        href={`/portal/claims/${claim.id}`}
        className="block p-5 rounded-2xl bg-white dark:bg-stone-900 border border-[var(--border-light)] hover:border-[var(--border-medium)] hover:shadow-lg transition-all group"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-[var(--primary)]">
                {getPolicyIcon(claim.policyType)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colours">
                {claim.type}
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                {claim.claimNumber}
              </p>
              <p className="text-xs text-[var(--text-subtle)] mt-0.5">
                Submitted {formatDate(claim.dateSubmitted)}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColour(claim.status)}`}
          >
            <span className="w-2 h-2 rounded-full bg-current mr-2" />
            {formatClaimStatus(claim.status)}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--text-body)] mb-4 line-clamp-2">
          {claim.description}
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2">
            <span className="font-medium">Claim Progress</span>
            <span>
              {completedSteps} of {totalSteps} steps complete
            </span>
          </div>
          <div className="h-2 rounded-full bg-[var(--surface-inset)] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className={`h-full rounded-full ${
                claim.status === 'paid' || claim.status === 'approved'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                  : claim.status === 'rejected'
                    ? 'bg-gradient-to-r from-red-500 to-red-400'
                    : 'bg-gradient-to-r from-[var(--primary)] to-indigo-500'
              }`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)]">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs text-[var(--text-subtle)]">Claimed</p>
              <p className="font-semibold text-[var(--text-main)]">
                {formatCurrency(claim.amount)}
              </p>
            </div>
            {claim.approvedAmount !== undefined && (
              <div>
                <p className="text-xs text-[var(--text-subtle)]">Approved</p>
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(claim.approvedAmount)}
                </p>
              </div>
            )}
          </div>
          <span className="text-[var(--primary)] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            View Details
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// Helper function
function formatClaimStatus(status: Claim['status']): string {
  const labels: Record<Claim['status'], string> = {
    submitted: 'Submitted',
    under_review: 'Under Review',
    approved: 'Approved',
    rejected: 'Rejected',
    paid: 'Paid',
    pending_documents: 'Pending Documents',
  };
  return labels[status];
}
