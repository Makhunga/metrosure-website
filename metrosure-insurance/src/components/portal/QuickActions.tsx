'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { QuickAction, mockQuickActions } from '@/data/portalMockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 150,
      damping: 15,
    },
  },
};

const actionColours: Record<QuickAction['colour'], { bg: string; icon: string; hover: string }> = {
  primary: {
    bg: 'bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]',
    icon: 'text-white',
    hover: 'hover:shadow-xl hover:shadow-primary/30',
  },
  secondary: {
    bg: 'bg-gradient-to-br from-indigo-500 to-violet-600',
    icon: 'text-white',
    hover: 'hover:shadow-xl hover:shadow-indigo-500/30',
  },
  accent: {
    bg: 'bg-gradient-to-br from-amber-400 to-orange-500',
    icon: 'text-white',
    hover: 'hover:shadow-xl hover:shadow-amber-500/30',
  },
  neutral: {
    bg: 'bg-gradient-to-br from-stone-600 to-stone-800 dark:from-stone-500 dark:to-stone-700',
    icon: 'text-white',
    hover: 'hover:shadow-xl hover:shadow-stone-500/30',
  },
};

interface QuickActionsProps {
  actions?: QuickAction[];
  variant?: 'grid' | 'row';
}

export default function QuickActions({
  actions = mockQuickActions,
  variant = 'grid',
}: QuickActionsProps) {
  if (variant === 'row') {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
      >
        {actions.map((action) => (
          <QuickActionButton key={action.id} action={action} compact />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {actions.map((action) => (
        <QuickActionCard key={action.id} action={action} />
      ))}
    </motion.div>
  );
}

// Card variant for grid layout
function QuickActionCard({ action }: { action: QuickAction }) {
  const colours = actionColours[action.colour];

  return (
    <motion.div variants={itemVariants}>
      <Link
        href={action.href}
        className={`group relative block p-5 rounded-2xl ${colours.bg} ${colours.hover} transition-all duration-300 overflow-hidden`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full border-4 border-white/50" />
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full border-4 border-white/30" />
        </div>

        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className={`material-symbols-outlined text-2xl ${colours.icon}`}>
              {action.icon}
            </span>
          </div>
          <h3 className="font-semibold text-white mb-1">{action.label}</h3>
          <p className="text-sm text-white/70">{action.description}</p>
        </div>

        {/* Hover arrow */}
        <span className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-white/80">
            arrow_forward
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

// Compact button variant for row layout
function QuickActionButton({
  action,
  compact = false,
}: {
  action: QuickAction;
  compact?: boolean;
}) {
  const colours = actionColours[action.colour];

  return (
    <motion.div variants={itemVariants} className="flex-shrink-0">
      <Link
        href={action.href}
        className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl ${colours.bg} ${colours.hover} transition-all duration-300 ${compact ? '' : 'w-full justify-center'}`}
      >
        <span className={`material-symbols-outlined text-xl ${colours.icon}`}>
          {action.icon}
        </span>
        <span className="font-medium text-sm text-white whitespace-nowrap">
          {action.label}
        </span>
      </Link>
    </motion.div>
  );
}

// Summary stats component often used alongside quick actions
interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: { value: number; positive: boolean };
  colour?: 'primary' | 'success' | 'warning' | 'info';
}

const statColours = {
  primary: 'from-[var(--primary)]/10 to-[var(--primary)]/5 dark:from-[var(--primary)]/20 dark:to-[var(--primary)]/10',
  success: 'from-emerald-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-emerald-500/10',
  warning: 'from-amber-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-amber-500/10',
  info: 'from-blue-500/10 to-blue-500/5 dark:from-blue-500/20 dark:to-blue-500/10',
};

const statIconColours = {
  primary: 'text-[#BF0603] bg-[#BF0603]/10 dark:text-[#e65350]',
  success: 'text-emerald-600 bg-emerald-500/10 dark:text-emerald-400',
  warning: 'text-amber-600 bg-amber-500/10 dark:text-amber-400',
  info: 'text-blue-600 bg-blue-500/10 dark:text-blue-400',
};

export function StatCard({
  label,
  value,
  icon,
  trend,
  colour = 'primary',
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className={`relative p-5 rounded-2xl bg-gradient-to-br ${statColours[colour]} border border-[var(--border-light)] overflow-hidden`}
    >
      {/* Decorative circle */}
      <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-current opacity-[0.03]" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--text-muted)] mb-1">{label}</p>
          <p className="text-2xl font-bold text-[var(--text-main)]">{value}</p>
          {trend && (
            <p
              className={`text-xs mt-1 flex items-center gap-1 ${
                trend.positive ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {trend.positive ? 'trending_up' : 'trending_down'}
              </span>
              {trend.positive ? '+' : ''}
              {trend.value}% from last month
            </p>
          )}
        </div>
        <div
          className={`w-10 h-10 rounded-xl ${statIconColours[colour]} flex items-center justify-center`}
        >
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
      </div>
    </motion.div>
  );
}

// Section header component
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    href: string;
  };
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-main)]">{title}</h2>
        {subtitle && (
          <p className="text-sm text-[var(--text-muted)]">{subtitle}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="text-sm text-[var(--primary)] font-medium hover:underline flex items-center gap-1"
        >
          {action.label}
          <span className="material-symbols-outlined text-lg">
            arrow_forward
          </span>
        </Link>
      )}
    </div>
  );
}
