'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  mockUser,
  mockNotifications,
  getTierBadgeColour,
} from '@/data/portalMockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/portal/dashboard', icon: 'dashboard' },
  { label: 'My Policies', href: '/portal/policies', icon: 'shield' },
  { label: 'Claims', href: '/portal/claims', icon: 'assignment', badge: 1 },
  { label: 'Payments', href: '/portal/payments', icon: 'payments' },
  { label: 'Documents', href: '/portal/documents', icon: 'folder' },
];

const secondaryNavItems: NavItem[] = [
  { label: 'Settings', href: '/portal/settings', icon: 'settings' },
  { label: 'Help Centre', href: '/help', icon: 'help' },
];

// Animation variants
const sidebarVariants = {
  hidden: { x: -280, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const navItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 200, damping: 20 },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface PortalLayoutProps {
  children: React.ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadNotifications = mockNotifications.filter((n) => !n.read).length;

  const isActiveLink = (href: string) => {
    if (href === '/portal/dashboard') {
      return pathname === '/portal' || pathname === '/portal/dashboard';
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border-b border-[var(--border-light)]">
        <div className="flex items-center justify-between px-4 h-16">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 text-[var(--text-body)] hover:text-[var(--text-main)] transition-colours"
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          <Link href="/portal/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-[var(--text-main)]">
              MetroSure
            </span>
          </Link>

          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 -mr-2 text-[var(--text-body)] hover:text-[var(--text-main)] transition-colours relative"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-2xl">
              notifications
            </span>
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={sidebarVariants}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-white dark:bg-stone-900 z-50 overflow-y-auto"
            >
              <SidebarContent
                navItems={navItems}
                secondaryNavItems={secondaryNavItems}
                isActiveLink={isActiveLink}
                onClose={() => setMobileMenuOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        className="hidden lg:block fixed left-0 top-0 bottom-0 w-[280px] bg-white dark:bg-stone-900 border-r border-[var(--border-light)] z-40 overflow-y-auto"
      >
        <SidebarContent
          navItems={navItems}
          secondaryNavItems={secondaryNavItems}
          isActiveLink={isActiveLink}
        />
      </motion.aside>

      {/* Main Content */}
      <div className="lg:ml-[280px]">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 h-20 bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl border-b border-[var(--border-light)] sticky top-0 z-30">
          <div>
            <h1 className="text-lg font-semibold text-[var(--text-main)]">
              Welcome back, {mockUser.firstName}
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              Here&apos;s what&apos;s happening with your insurance today.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-subtle)] text-xl z-10">
                search
              </span>
              <Input
                type="text"
                placeholder="Search policies, claims..."
                className="w-64 pl-10 rounded-xl"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-[var(--text-body)] hover:text-[var(--text-main)] hover:bg-[var(--surface-inset)] rounded-xl transition-all relative"
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined text-2xl">
                  notifications
                </span>
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <NotificationsDropdown
                    onClose={() => setNotificationsOpen(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3 pl-4 border-l border-[var(--border-light)]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-semibold">
                {mockUser.firstName[0]}
                {mockUser.lastName[0]}
              </div>
              <div className="hidden xl:block">
                <p className="text-sm font-medium text-[var(--text-main)]">
                  {mockUser.firstName} {mockUser.lastName}
                </p>
                <p className="text-xs text-[var(--text-muted)] capitalize">
                  {mockUser.tier} Member
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <motion.main
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          className="p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

// Sidebar Content Component
interface SidebarContentProps {
  navItems: NavItem[];
  secondaryNavItems: NavItem[];
  isActiveLink: (href: string) => boolean;
  onClose?: () => void;
}

function SidebarContent({
  navItems,
  secondaryNavItems,
  isActiveLink,
  onClose,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-[var(--border-light)]">
        <Link
          href="/portal/dashboard"
          className="flex items-center gap-3"
          onClick={onClose}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div>
            <span className="font-bold text-lg text-[var(--text-main)]">
              MetroSure
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
              Client Portal
            </span>
          </div>
        </Link>
      </div>

      {/* User Card */}
      <motion.div variants={navItemVariants} className="p-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--surface-inset)] to-[var(--surface)] border border-[var(--border-light)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-semibold text-lg shadow-lg shadow-primary/20">
              {mockUser.firstName[0]}
              {mockUser.lastName[0]}
            </div>
            <div>
              <p className="font-semibold text-[var(--text-main)]">
                {mockUser.firstName} {mockUser.lastName}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {mockUser.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getTierBadgeColour(mockUser.tier)}`}
            >
              <span className="material-symbols-outlined text-sm mr-1">
                workspace_premium
              </span>
              {mockUser.tier}
            </span>
            <span className="text-xs text-[var(--text-subtle)]">
              Since{' '}
              {new Date(mockUser.memberSince).toLocaleDateString('en-GB', {
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-2">
        <p className="px-3 mb-2 text-[10px] uppercase tracking-widest text-[var(--text-subtle)] font-medium">
          Main Menu
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <motion.li key={item.href} variants={navItemVariants}>
              <Link
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                  isActiveLink(item.href)
                    ? 'bg-[var(--primary)] text-white shadow-lg shadow-primary/25'
                    : 'text-[var(--text-body)] hover:bg-[var(--surface-inset)] hover:text-[var(--text-main)]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${
                    isActiveLink(item.href)
                      ? 'text-white'
                      : 'text-[var(--text-muted)]'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span
                    className={`ml-auto px-2 py-0.5 text-xs font-bold rounded-full ${
                      isActiveLink(item.href)
                        ? 'bg-white/20 text-white'
                        : 'bg-[var(--primary)] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="my-6 h-px bg-[var(--border-light)]" />

        <p className="px-3 mb-2 text-[10px] uppercase tracking-widest text-[var(--text-subtle)] font-medium">
          Support
        </p>
        <ul className="space-y-1">
          {secondaryNavItems.map((item) => (
            <motion.li key={item.href} variants={navItemVariants}>
              <Link
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                  isActiveLink(item.href)
                    ? 'bg-[var(--primary)] text-white shadow-lg shadow-primary/25'
                    : 'text-[var(--text-body)] hover:bg-[var(--surface-inset)] hover:text-[var(--text-main)]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${
                    isActiveLink(item.href)
                      ? 'text-white'
                      : 'text-[var(--text-muted)]'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[var(--border-light)]">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--text-body)] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-400 transition-all group"
        >
          <span className="material-symbols-outlined text-xl text-[var(--text-muted)] group-hover:text-red-500 transition-colours">
            logout
          </span>
          <span className="font-medium text-sm">Sign Out</span>
        </Link>
      </div>
    </div>
  );
}

// Notifications Dropdown
function NotificationsDropdown({ onClose }: { onClose: () => void }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-[var(--border-light)] overflow-hidden z-50"
      >
        <div className="p-4 border-b border-[var(--border-light)] flex items-center justify-between">
          <h3 className="font-semibold text-[var(--text-main)]">
            Notifications
          </h3>
          <Button variant="link" size="sm" className="h-auto p-0 text-xs">
            Mark all read
          </Button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {mockNotifications.map((notification) => (
            <Link
              key={notification.id}
              href={notification.actionUrl || '#'}
              className={`block p-4 border-b border-[var(--border-light)] last:border-b-0 hover:bg-[var(--surface-inset)] transition-colours ${
                !notification.read ? 'bg-[var(--primary)]/5' : ''
              }`}
              onClick={onClose}
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
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-0.5">
                    {notification.message}
                  </p>
                  <p className="text-[10px] text-[var(--text-subtle)] mt-1">
                    {new Date(notification.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </p>
                </div>
                {!notification.read && (
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)] flex-shrink-0 mt-2" />
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="p-3 bg-[var(--surface-inset)] border-t border-[var(--border-light)]">
          <Link
            href="/portal/notifications"
            className="block text-center text-sm text-[var(--primary)] font-medium hover:underline"
            onClick={onClose}
          >
            View all notifications
          </Link>
        </div>
      </motion.div>
    </>
  );
}
