'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SectionHeader, StatCard } from '@/components/portal/QuickActions';
import {
  mockPayments,
  mockPaymentHistory,
  formatCurrency,
  formatDate,
  formatShortDate,
  getPaymentStatusColour,
  getPaymentHistoryStatusColour,
  getPaymentMethodIcon,
} from '@/data/portalMockData';

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

export default function PaymentsPage() {
  const duePayments = mockPayments.filter(
    (p) => p.status === 'due' || p.status === 'overdue'
  );
  const scheduledPayments = mockPayments.filter((p) => p.status === 'scheduled');
  const totalDue = duePayments.reduce((sum, p) => sum + p.amount, 0);
  const nextPaymentDate = duePayments[0]?.dueDate || scheduledPayments[0]?.dueDate;
  const lastPayment = mockPaymentHistory.find((h) => h.status === 'successful');
  const paymentMethod = mockPayments[0]?.paymentMethod || 'Not set up';

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
            Payments
          </h1>
          <p className="text-[var(--text-muted)]">
            Manage your premiums and view payment history
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white font-medium text-sm hover:bg-[var(--primary-hover)] transition-colours shadow-lg shadow-primary/25 w-fit">
          <span className="material-symbols-outlined text-lg">credit_card</span>
          Make a Payment
        </button>
      </motion.div>

      {/* Stats Overview */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Due"
            value={formatCurrency(totalDue)}
            icon="payments"
            colour="warning"
          />
          <StatCard
            label="Next Payment"
            value={formatShortDate(nextPaymentDate)}
            icon="event"
            colour="info"
          />
          <StatCard
            label="Last Paid"
            value={lastPayment ? formatShortDate(lastPayment.date) : 'N/A'}
            icon="check_circle"
            colour="success"
          />
          <div className="p-5 rounded-2xl bg-gradient-to-br from-stone-500/10 to-stone-500/5 border border-stone-500/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-lg text-stone-600 dark:text-stone-400">
                account_balance
              </span>
              <span className="text-sm text-[var(--text-muted)]">Payment Method</span>
            </div>
            <p className="text-sm font-semibold text-[var(--text-main)] truncate">
              {paymentMethod}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Upcoming Payments */}
        <motion.section variants={itemVariants} className="xl:col-span-2">
          <SectionHeader
            title="Upcoming Payments"
            subtitle="Premiums due this month"
          />
          <div className="space-y-4">
            {[...duePayments, ...scheduledPayments].map((payment) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-light)] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-[var(--text-main)] truncate">
                        {payment.policyName}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getPaymentStatusColour(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base">
                          event
                        </span>
                        Due {formatDate(payment.dueDate)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base">
                          repeat
                        </span>
                        {payment.frequency === 'monthly'
                          ? 'Monthly'
                          : payment.frequency === 'annually'
                            ? 'Annual'
                            : 'Once-off'}
                      </span>
                    </div>
                    {payment.paymentMethod && (
                      <p className="mt-2 text-xs text-[var(--text-subtle)]">
                        {payment.paymentMethod}
                      </p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xl font-bold text-[var(--text-main)]">
                      {formatCurrency(payment.amount)}
                    </p>
                    {payment.status === 'due' || payment.status === 'overdue' ? (
                      <button className="mt-2 text-sm text-[var(--primary)] font-medium hover:underline inline-flex items-center gap-1">
                        Pay Now
                        <span className="material-symbols-outlined text-lg">
                          arrow_forward
                        </span>
                      </button>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section variants={itemVariants} className="space-y-6">
          <SectionHeader title="Quick Actions" />
          <div className="space-y-3">
            <button className="w-full p-4 rounded-xl bg-[var(--surface-inset)] border border-[var(--border-light)] hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/5 transition-all text-left group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[var(--primary)]">
                    schedule
                  </span>
                </div>
                <div>
                  <p className="font-medium text-[var(--text-main)]">
                    Set Up Auto-Pay
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Never miss a payment
                  </p>
                </div>
                <span className="material-symbols-outlined text-[var(--text-subtle)] ml-auto group-hover:text-[var(--primary)] transition-colours">
                  chevron_right
                </span>
              </div>
            </button>

            <button className="w-full p-4 rounded-xl bg-[var(--surface-inset)] border border-[var(--border-light)] hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/5 transition-all text-left group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[var(--primary)]">
                    credit_card
                  </span>
                </div>
                <div>
                  <p className="font-medium text-[var(--text-main)]">
                    Update Payment Method
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Change card or bank details
                  </p>
                </div>
                <span className="material-symbols-outlined text-[var(--text-subtle)] ml-auto group-hover:text-[var(--primary)] transition-colours">
                  chevron_right
                </span>
              </div>
            </button>

            <Link
              href="/portal/documents"
              className="w-full p-4 rounded-xl bg-[var(--surface-inset)] border border-[var(--border-light)] hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/5 transition-all text-left group flex"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[var(--primary)]">
                    download
                  </span>
                </div>
                <div>
                  <p className="font-medium text-[var(--text-main)]">
                    Download Statement
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Get your payment history
                  </p>
                </div>
                <span className="material-symbols-outlined text-[var(--text-subtle)] ml-auto group-hover:text-[var(--primary)] transition-colours">
                  chevron_right
                </span>
              </div>
            </Link>
          </div>
        </motion.section>
      </div>

      {/* Payment History */}
      <motion.section variants={itemVariants}>
        <SectionHeader
          title="Payment History"
          subtitle="Your recent transactions"
        />
        <div className="bg-[var(--surface-card)] rounded-2xl border border-[var(--border-light)] overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--surface-inset)]">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Description
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Method
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-light)]">
                {mockPaymentHistory.map((history) => (
                  <tr key={history.id} className="hover:bg-[var(--surface-inset)]/50">
                    <td className="px-5 py-4 text-sm text-[var(--text-body)]">
                      {formatShortDate(history.date)}
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-[var(--text-main)]">
                        {history.policyName}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {history.transactionId}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm text-[var(--text-body)]">
                        <span className="material-symbols-outlined text-base text-[var(--text-subtle)]">
                          {getPaymentMethodIcon(history.method)}
                        </span>
                        {history.method === 'debit_order'
                          ? 'Debit Order'
                          : history.method === 'eft'
                            ? 'EFT'
                            : history.method === 'card'
                              ? 'Card'
                              : 'Cash'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getPaymentHistoryStatusColour(
                          history.status
                        )}`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {history.status === 'successful'
                            ? 'check_circle'
                            : history.status === 'failed'
                              ? 'error'
                              : history.status === 'pending'
                                ? 'schedule'
                                : 'undo'}
                        </span>
                        {history.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span
                        className={`text-sm font-semibold ${
                          history.status === 'failed'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-[var(--text-main)]'
                        }`}
                      >
                        {formatCurrency(history.amount)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile List */}
          <div className="md:hidden divide-y divide-[var(--border-light)]">
            {mockPaymentHistory.map((history) => (
              <div key={history.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[var(--text-main)]">
                    {history.policyName}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      history.status === 'failed'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-[var(--text-main)]'
                    }`}
                  >
                    {formatCurrency(history.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)]">
                    {formatShortDate(history.date)}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getPaymentHistoryStatusColour(
                      history.status
                    )}`}
                  >
                    {history.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Help Section */}
      <motion.section variants={itemVariants}>
        <div className="p-6 rounded-2xl bg-[var(--surface-inset)] border border-[var(--border-light)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-3xl text-[var(--primary)]">
                help
              </span>
              <div>
                <h3 className="font-semibold text-[var(--text-main)] mb-1">
                  Need Help with Payments?
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Our finance team is here to assist with any payment queries or
                  concerns.
                </p>
              </div>
            </div>
            <a
              href="tel:0860111911"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white font-medium text-sm hover:bg-[var(--primary-hover)] transition-colours shadow-lg shadow-primary/25 w-fit"
            >
              <span className="material-symbols-outlined text-lg">call</span>
              0860 111 911
            </a>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
