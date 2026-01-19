'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { mockUser } from '@/data/portalMockData';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

// Settings Section Card Component
function SettingsCard({
  icon,
  title,
  description,
  children,
}: {
  icon: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-xl text-red-600 dark:text-red-400">
            {icon}
          </span>
        </div>
        <div>
          <h2 className="font-semibold text-stone-900 dark:text-stone-100">{title}</h2>
          {description && (
            <p className="text-sm text-stone-500 dark:text-stone-400">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  // Notification preferences state (mockup - visual only)
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);
  const [claimUpdates, setClaimUpdates] = useState(true);
  const [policyReminders, setPolicyReminders] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Communication preferences state (mockup - visual only)
  const [language, setLanguage] = useState('en');
  const [documentDelivery, setDocumentDelivery] = useState('email');

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
          Settings
        </h1>
        <p className="text-[var(--text-muted)]">
          Manage your account preferences and security settings
        </p>
      </motion.div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <motion.div variants={itemVariants}>
          <SettingsCard
            icon="person"
            title="Personal Information"
            description="Your profile details"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[var(--border-light)]">
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-0.5">
                    Full Name
                  </p>
                  <p className="font-medium text-[var(--text-main)]">
                    {mockUser.firstName} {mockUser.lastName}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[var(--border-light)]">
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-0.5">
                    Email Address
                  </p>
                  <p className="font-medium text-[var(--text-main)]">
                    {mockUser.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[var(--border-light)]">
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-0.5">
                    Phone Number
                  </p>
                  <p className="font-medium text-[var(--text-main)]">
                    {mockUser.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-0.5">
                    Member Since
                  </p>
                  <p className="font-medium text-[var(--text-main)]">
                    {new Date(mockUser.memberSince).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-2 rounded-xl border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800">
                <span className="material-symbols-outlined text-lg">edit</span>
                Request Profile Update
              </Button>
            </div>
          </SettingsCard>
        </motion.div>

        {/* Security */}
        <motion.div variants={itemVariants}>
          <SettingsCard
            icon="security"
            title="Security"
            description="Protect your account"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-stone-200 dark:border-stone-700">
                <div className="flex-1">
                  <p className="font-medium text-stone-900 dark:text-stone-100">Password</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Last changed 3 months ago
                  </p>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800">
                  Change
                </Button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-stone-200 dark:border-stone-700">
                <div className="flex-1">
                  <p className="font-medium text-stone-900 dark:text-stone-100">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Add an extra layer of security
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                  <span className="material-symbols-outlined text-sm">
                    warning
                  </span>
                  Not enabled
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <p className="font-medium text-stone-900 dark:text-stone-100">
                    Active Sessions
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Manage devices logged into your account
                  </p>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800">
                  View
                </Button>
              </div>

              <Button className="w-full mt-2 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25">
                <span className="material-symbols-outlined text-lg">
                  verified_user
                </span>
                Enable Two-Factor Authentication
              </Button>
            </div>
          </SettingsCard>
        </motion.div>

        {/* Notification Preferences */}
        <motion.div variants={itemVariants}>
          <SettingsCard
            icon="notifications"
            title="Notification Preferences"
            description="Choose how you want to be notified"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-stone-200 dark:border-stone-700">
                <div>
                  <p className="font-medium text-stone-900 dark:text-stone-100">
                    Email Notifications
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Receive updates via email
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  aria-label="Email notifications"
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-stone-200 dark:border-stone-700">
                <div>
                  <p className="font-medium text-stone-900 dark:text-stone-100">
                    SMS Notifications
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Receive updates via SMS
                  </p>
                </div>
                <Switch
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                  aria-label="SMS notifications"
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-stone-200 dark:border-stone-700">
                <div>
                  <p className="font-medium text-stone-900 dark:text-stone-100">
                    Payment Reminders
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Get notified before payments are due
                  </p>
                </div>
                <Switch
                  checked={paymentReminders}
                  onCheckedChange={setPaymentReminders}
                  aria-label="Payment reminders"
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-stone-200 dark:border-stone-700">
                <div>
                  <p className="font-medium text-stone-900 dark:text-stone-100">
                    Claim Updates
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Get notified about claim status changes
                  </p>
                </div>
                <Switch
                  checked={claimUpdates}
                  onCheckedChange={setClaimUpdates}
                  aria-label="Claim updates"
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-stone-200 dark:border-stone-700">
                <div>
                  <p className="font-medium text-stone-900 dark:text-stone-100">
                    Policy Reminders
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Renewal and expiry notifications
                  </p>
                </div>
                <Switch
                  checked={policyReminders}
                  onCheckedChange={setPolicyReminders}
                  aria-label="Policy reminders"
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-stone-900 dark:text-stone-100">
                    Marketing Communications
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Offers, news, and product updates
                  </p>
                </div>
                <Switch
                  checked={marketingEmails}
                  onCheckedChange={setMarketingEmails}
                  aria-label="Marketing communications"
                />
              </div>
            </div>
          </SettingsCard>
        </motion.div>

        {/* Communication Preferences */}
        <motion.div variants={itemVariants}>
          <SettingsCard
            icon="language"
            title="Communication Preferences"
            description="Set your language and document delivery"
          >
            <div className="space-y-4">
              <div className="py-3 border-b border-stone-200 dark:border-stone-700">
                <label className="block font-medium text-stone-900 dark:text-stone-100 mb-2">
                  Preferred Language
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="af">Afrikaans</SelectItem>
                    <SelectItem value="zu">isiZulu</SelectItem>
                    <SelectItem value="xh">isiXhosa</SelectItem>
                    <SelectItem value="st">Sesotho</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="py-3">
                <label className="block font-medium text-stone-900 dark:text-stone-100 mb-2">
                  Document Delivery
                </label>
                <RadioGroup
                  value={documentDelivery}
                  onValueChange={setDocumentDelivery}
                  className="space-y-2"
                >
                  <label
                    htmlFor="delivery-email"
                    className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                  >
                    <RadioGroupItem value="email" id="delivery-email" />
                    <div>
                      <p className="font-medium text-stone-900 dark:text-stone-100">Email</p>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        Receive documents as email attachments
                      </p>
                    </div>
                  </label>
                  <label
                    htmlFor="delivery-portal"
                    className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                  >
                    <RadioGroupItem value="portal" id="delivery-portal" />
                    <div>
                      <p className="font-medium text-stone-900 dark:text-stone-100">
                        Portal Only
                      </p>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        Access documents exclusively via the portal
                      </p>
                    </div>
                  </label>
                  <label
                    htmlFor="delivery-post"
                    className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                  >
                    <RadioGroupItem value="post" id="delivery-post" />
                    <div>
                      <p className="font-medium text-stone-900 dark:text-stone-100">
                        Post
                      </p>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        Receive physical copies by mail
                      </p>
                    </div>
                  </label>
                </RadioGroup>
              </div>
            </div>
          </SettingsCard>
        </motion.div>
      </div>

      {/* Help & Support */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/help"
            className="p-5 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-red-300 dark:hover:border-red-700 transition-all group"
          >
            <span className="material-symbols-outlined text-2xl text-red-600 dark:text-red-400 mb-3 block">
              help
            </span>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
              Help Centre
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">
              Find answers to frequently asked questions.
            </p>
            <span className="text-sm text-red-600 dark:text-red-400 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Browse FAQs
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </span>
          </Link>

          <Link
            href="/contact"
            className="p-5 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-red-300 dark:hover:border-red-700 transition-all group"
          >
            <span className="material-symbols-outlined text-2xl text-red-600 dark:text-red-400 mb-3 block">
              support_agent
            </span>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
              Contact Support
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">
              Speak to our team for assistance.
            </p>
            <span className="text-sm text-red-600 dark:text-red-400 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Get in Touch
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </span>
          </Link>

          <Link
            href="/privacy"
            className="p-5 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-red-300 dark:hover:border-red-700 transition-all group"
          >
            <span className="material-symbols-outlined text-2xl text-red-600 dark:text-red-400 mb-3 block">
              privacy_tip
            </span>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
              Privacy & Legal
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">
              Review our privacy policy and terms.
            </p>
            <span className="text-sm text-red-600 dark:text-red-400 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              View Policies
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </span>
          </Link>
        </div>
      </motion.section>

      {/* Danger Zone */}
      <motion.section variants={itemVariants}>
        <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-2xl text-red-600 dark:text-red-400">
              warning
            </span>
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 dark:text-red-300 mb-1">
                Danger Zone
              </h3>
              <p className="text-sm text-red-700 dark:text-red-400 mb-4">
                These actions are irreversible. Please proceed with caution.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950"
                >
                  Download My Data
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950"
                >
                  Close Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
