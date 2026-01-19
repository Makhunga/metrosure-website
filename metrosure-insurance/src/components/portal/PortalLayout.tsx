'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  mockUser,
  mockNotifications,
} from '@/data/portalMockData';
import { useTheme } from '../theme-provider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Badge, getTierBadgeVariant, type TierStatus } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadNotifications = mockNotifications.filter((n) => !n.read).length;

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const isActiveLink = (href: string) => {
    if (href === '/portal/dashboard') {
      return pathname === '/portal' || pathname === '/portal/dashboard';
    }
    return pathname?.startsWith(href);
  };

  return (
    <div data-portal className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-4 h-16">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 text-foreground hover:text-foreground transition-colors"
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          <Link href="/portal/dashboard" className="flex items-center">
            <div className="relative h-8 w-[100px]">
              <Image
                src={resolvedTheme === 'dark' ? '/images/logo-white.png' : '/images/logo.png'}
                alt="Metrosure Insurance Brokers"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle dark mode"
              whileTap={{ scale: 0.9 }}
            >
              <span className="material-symbols-outlined text-xl">
                {resolvedTheme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </motion.button>

            {/* Notifications */}
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 -mr-2 text-foreground hover:text-foreground transition-colors relative"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-2xl">
                notifications
              </span>
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
          </div>
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
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-card z-50 overflow-y-auto"
            >
              <SidebarContent
                navItems={navItems}
                secondaryNavItems={secondaryNavItems}
                isActiveLink={isActiveLink}
                onClose={() => setMobileMenuOpen(false)}
                resolvedTheme={resolvedTheme}
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
        className="hidden lg:block fixed left-0 top-0 bottom-0 w-[280px] bg-card border-r border-border z-40 overflow-y-auto"
      >
        <SidebarContent
          navItems={navItems}
          secondaryNavItems={secondaryNavItems}
          isActiveLink={isActiveLink}
          resolvedTheme={resolvedTheme}
        />
      </motion.aside>

      {/* Main Content */}
      <div className="lg:ml-[280px]">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 h-20 bg-card/60 backdrop-blur-xl border-b border-border sticky top-0 z-30">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Welcome back, {mockUser.firstName}
            </h1>
            <p className="text-sm text-muted-foreground">
              Here&apos;s what&apos;s happening with your insurance today.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xl z-10">
                search
              </span>
              <Input
                type="text"
                placeholder="Search policies, claims..."
                className="w-64 pl-10 pr-4 h-10 rounded-xl bg-muted/50"
              />
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 text-foreground hover:text-primary hover:bg-muted rounded-xl transition-all"
              aria-label="Toggle dark mode"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <motion.span
                className="material-symbols-outlined text-2xl block"
                key={resolvedTheme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {resolvedTheme === 'dark' ? 'light_mode' : 'dark_mode'}
              </motion.span>
            </motion.button>

            {/* Notifications */}
            <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <PopoverTrigger asChild>
                <button
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all relative"
                  aria-label="Notifications"
                >
                  <span className="material-symbols-outlined text-2xl">
                    notifications
                  </span>
                  {unreadNotifications > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-80 p-0 rounded-2xl shadow-2xl"
              >
                <NotificationsContent onClose={() => setNotificationsOpen(false)} />
              </PopoverContent>
            </Popover>

            {/* User Menu */}
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold">
                {mockUser.firstName[0]}
                {mockUser.lastName[0]}
              </div>
              <div className="hidden xl:block">
                <p className="text-sm font-medium text-foreground">
                  {mockUser.firstName} {mockUser.lastName}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
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
  resolvedTheme?: string;
}

function SidebarContent({
  navItems,
  secondaryNavItems,
  isActiveLink,
  onClose,
  resolvedTheme,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link
          href="/portal/dashboard"
          className="flex items-center cursor-pointer group"
          onClick={onClose}
        >
          <motion.div
            className="relative h-10 w-[140px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Image
              src={resolvedTheme === 'dark' ? '/images/logo-white.png' : '/images/logo.png'}
              alt="Metrosure Insurance Brokers"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </Link>
      </div>

      {/* User Card */}
      <motion.div variants={navItemVariants} className="p-4">
        <div className="p-4 rounded-2xl bg-muted border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/20">
              {mockUser.firstName[0]}
              {mockUser.lastName[0]}
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {mockUser.firstName} {mockUser.lastName}
              </p>
              <p className="text-xs text-muted-foreground">
                {mockUser.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={getTierBadgeVariant(mockUser.tier as TierStatus)}
              className="px-2.5 py-1 capitalize"
            >
              <span className="material-symbols-outlined text-sm mr-1">
                workspace_premium
              </span>
              {mockUser.tier}
            </Badge>
            <span className="text-xs text-muted-foreground">
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
        <p className="px-3 mb-2 text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
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
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'text-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${
                    isActiveLink(item.href)
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span
                    className={`ml-auto px-2 py-0.5 text-xs font-bold rounded-full ${
                      isActiveLink(item.href)
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="my-6 h-px bg-border" />

        <p className="px-3 mb-2 text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
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
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'text-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${
                    isActiveLink(item.href)
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground'
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
      <div className="p-4 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground hover:bg-destructive/10 hover:text-destructive transition-all group"
        >
          <span className="material-symbols-outlined text-xl text-muted-foreground group-hover:text-destructive transition-colors">
            logout
          </span>
          <span className="font-medium text-sm">Sign Out</span>
        </Link>
      </div>

      {/* Zoocora Attribution */}
      <div className="p-4 border-t border-border">
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            const user = 'makhunga';
            const domain = 'zoocora.co.za';
            window.location.href = `mailto:${user}@${domain}`;
          }}
          className="flex items-center justify-center cursor-pointer"
          title="Developed by Zoocora"
          initial={{ filter: 'drop-shadow(0 0 0px rgba(130,178,154,0))' }}
          whileHover={{
            filter: 'drop-shadow(0 0 8px rgba(130,178,154,0.6))',
            scale: 1.05,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Image
            src="/images/zoocora-logo.svg"
            alt="Zoocora"
            width={90}
            height={20}
            className="opacity-40 hover:opacity-100 transition-opacity duration-300"
          />
        </motion.a>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// NOTIFICATIONS CONTENT
// Used inside shadcn Popover for better accessibility and keyboard navigation
// ═══════════════════════════════════════════════════════════════════════════

function NotificationsContent({ onClose }: { onClose: () => void }) {
  const notificationTypeStyles = {
    urgent: { icon: 'error', colour: 'text-destructive' },
    success: { icon: 'check_circle', colour: 'text-emerald-500 dark:text-emerald-400' },
    warning: { icon: 'warning', colour: 'text-amber-500 dark:text-amber-400' },
    info: { icon: 'info', colour: 'text-blue-500 dark:text-blue-400' },
  };

  return (
    <>
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Notifications</h3>
        <button className="text-xs text-primary hover:underline">
          Mark all read
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {mockNotifications.map((notification) => {
          const typeStyle = notificationTypeStyles[notification.type as keyof typeof notificationTypeStyles]
            || notificationTypeStyles.info;

          return (
            <Link
              key={notification.id}
              href={notification.actionUrl || '#'}
              className={cn(
                'block p-4 border-b border-border last:border-b-0 hover:bg-muted transition-colors',
                !notification.read && 'bg-primary/5'
              )}
              onClick={onClose}
            >
              <div className="flex items-start gap-3">
                <span className={cn('material-symbols-outlined text-lg mt-0.5', typeStyle.colour)}>
                  {typeStyle.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                    {notification.message}
                  </p>
                  <p className="text-[10px] text-muted-foreground/70 mt-1">
                    {new Date(notification.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </p>
                </div>
                {!notification.read && (
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="p-3 bg-muted border-t border-border">
        <Link
          href="/portal/notifications"
          className="block text-center text-sm text-primary font-medium hover:underline"
          onClick={onClose}
        >
          View all notifications
        </Link>
      </div>
    </>
  );
}
