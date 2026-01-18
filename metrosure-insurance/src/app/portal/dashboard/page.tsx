'use client';

import { motion } from 'framer-motion';
import PolicyCard from '@/components/portal/PolicyCard';
import QuickActions, { StatCard, SectionHeader } from '@/components/portal/QuickActions';
import ClaimsTimeline, { ClaimCard } from '@/components/portal/ClaimsTimeline';
import {
  mockPolicies,
  mockClaims,
  mockNotifications,
  formatCurrency,
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

export default function DashboardPage() {
  const activePolicies = mockPolicies.filter((p) => p.status === 'active');
  const activeClaims = mockClaims.filter(
    (c) => c.status === 'submitted' || c.status === 'under_review'
  );
  const totalMonthlyPremium = activePolicies.reduce(
    (sum, p) => sum + (p.frequency === 'monthly' ? p.premium : p.premium / 12),
    0
  );
  const totalCoverAmount = activePolicies.reduce(
    (sum, p) => sum + p.coverAmount,
    0
  );
  const unreadNotifications = mockNotifications.filter((n) => !n.read).length;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Quick Actions */}
      <motion.section variants={itemVariants}>
        <SectionHeader
          title="Quick Actions"
          subtitle="Get things done faster"
        />
        <QuickActions />
      </motion.section>

      {/* Stats Overview */}
      <motion.section variants={itemVariants}>
        <SectionHeader title="Portfolio Overview" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Active Policies"
            value={activePolicies.length}
            icon="shield"
            colour="primary"
          />
          <StatCard
            label="Monthly Premium"
            value={formatCurrency(Math.round(totalMonthlyPremium))}
            icon="payments"
            colour="info"
          />
          <StatCard
            label="Total Cover"
            value={formatCurrency(totalCoverAmount)}
            icon="verified_user"
            colour="success"
          />
          <StatCard
            label="Open Claims"
            value={activeClaims.length}
            icon="assignment"
            colour="warning"
          />
        </div>
      </motion.section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Policies */}
        <motion.section variants={itemVariants} className="xl:col-span-2">
          <SectionHeader
            title="Your Policies"
            subtitle="Active insurance cover"
            action={{ label: 'View All', href: '/portal/policies' }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activePolicies.slice(0, 4).map((policy, index) => (
              <PolicyCard key={policy.id} policy={policy} index={index} />
            ))}
          </div>
        </motion.section>

        {/* Right Column - Claims & Notifications */}
        <motion.section variants={itemVariants} className="space-y-8">
          {/* Active Claims */}
          <div>
            <SectionHeader
              title="Recent Claims"
              action={{ label: 'View All', href: '/portal/claims' }}
            />
            <div className="space-y-4">
              {activeClaims.length > 0 ? (
                activeClaims.slice(0, 2).map((claim) => (
                  <ClaimsTimeline key={claim.id} claim={claim} compact />
                ))
              ) : (
                <div className="p-6 rounded-2xl bg-[var(--surface-inset)] text-center">
                  <span className="material-symbols-outlined text-4xl text-[var(--text-subtle)] mb-2">
                    assignment_turned_in
                  </span>
                  <p className="text-[var(--text-muted)]">No active claims</p>
                  <p className="text-sm text-[var(--text-subtle)]">
                    All your claims have been processed
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Notifications Summary */}
          <div>
            <SectionHeader
              title="Notifications"
              action={{ label: 'View All', href: '/portal/notifications' }}
            />
            <div className="space-y-2">
              {mockNotifications.slice(0, 3).map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-xl border ${
                    !notification.read
                      ? 'bg-[var(--primary)]/5 border-[var(--primary)]/20'
                      : 'bg-[var(--surface-inset)] border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`material-symbols-outlined text-lg mt-0.5 ${
                        notification.type === 'urgent'
                          ? 'text-red-500'
                          : notification.type === 'success'
                            ? 'text-emerald-500'
                            : notification.type === 'warning'
                              ? 'text-amber-500'
                              : 'text-blue-500'
                      }`}
                    >
                      {notification.type === 'urgent'
                        ? 'error'
                        : notification.type === 'success'
                          ? 'check_circle'
                          : notification.type === 'warning'
                            ? 'warning'
                            : 'info'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-main)] truncate">
                        {notification.title}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-1">
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-[var(--primary)] flex-shrink-0 mt-2" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

      {/* Help Banner */}
      <motion.section variants={itemVariants}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-6 md:p-8">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full border-8 border-white" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border-8 border-white" />
            <div className="absolute left-1/4 top-1/4 w-20 h-20 rounded-full border-4 border-white" />
          </div>

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-3xl text-white">
                  support_agent
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Need Assistance?
                </h3>
                <p className="text-white/80 text-sm max-w-md">
                  Our support team is available 24/7 to help with your insurance
                  queries. Reach out via phone, email, or live chat.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:0860111911"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[var(--primary)] font-medium text-sm hover:bg-white/90 transition-colours shadow-lg"
              >
                <span className="material-symbols-outlined text-lg">call</span>
                0860 111 911
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white font-medium text-sm hover:bg-white/30 transition-colours border border-white/30"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
                Start Chat
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
