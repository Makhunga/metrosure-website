// Portal Mock Data for MetroSure Client Portal
// All data is fictional and for demonstration purposes only

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  memberSince: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface Policy {
  id: string;
  type: 'motor' | 'home' | 'life' | 'business' | 'travel';
  name: string;
  policyNumber: string;
  status: 'active' | 'pending' | 'expired' | 'cancelled';
  premium: number;
  frequency: 'monthly' | 'annually';
  nextPayment: string;
  startDate: string;
  endDate: string;
  coverAmount: number;
  excess: number;
  description: string;
  features: string[];
  insuredItems?: InsuredItem[];
}

export interface InsuredItem {
  id: string;
  name: string;
  value: number;
  description?: string;
}

export interface Claim {
  id: string;
  policyId: string;
  policyType: Policy['type'];
  claimNumber: string;
  type: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'paid' | 'pending_documents';
  amount: number;
  approvedAmount?: number;
  dateSubmitted: string;
  dateUpdated: string;
  description: string;
  timeline: ClaimTimelineEvent[];
  documents?: ClaimDocument[];
}

export interface ClaimTimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  icon?: string;
}

export interface ClaimDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  title: string;
  message: string;
  date: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  href: string;
  description: string;
  colour: 'primary' | 'secondary' | 'accent' | 'neutral';
}

export interface Payment {
  id: string;
  policyId: string;
  policyName: string;
  amount: number;
  dueDate: string;
  status: 'due' | 'scheduled' | 'paid' | 'overdue';
  frequency: 'monthly' | 'annually' | 'once-off';
  paymentMethod?: string;
}

export interface PaymentHistory {
  id: string;
  amount: number;
  date: string;
  method: 'debit_order' | 'card' | 'eft' | 'cash';
  status: 'successful' | 'failed' | 'pending' | 'reversed';
  transactionId: string;
  policyName?: string;
}

export interface Document {
  id: string;
  type: 'policy' | 'certificate' | 'invoice' | 'claim' | 'statement' | 'schedule';
  name: string;
  policyId?: string;
  uploadedDate: string;
  fileSize: string;
  category: 'policies' | 'claims' | 'invoices' | 'certificates';
}

// Mock User
export const mockUser: User = {
  id: 'usr_001',
  firstName: 'Thabo',
  lastName: 'Mokoena',
  email: 'thabo.mokoena@email.co.za',
  phone: '+27 82 555 1234',
  memberSince: '2021-03-15',
  tier: 'gold',
};

// Mock Policies
export const mockPolicies: Policy[] = [
  {
    id: 'pol_001',
    type: 'motor',
    name: 'Comprehensive Motor Insurance',
    policyNumber: 'MTR-2024-00847',
    status: 'active',
    premium: 1850,
    frequency: 'monthly',
    nextPayment: '2026-02-01',
    startDate: '2024-01-15',
    endDate: '2025-01-14',
    coverAmount: 450000,
    excess: 3500,
    description: 'Full comprehensive cover for your vehicle including theft, accident damage, and third-party liability.',
    features: [
      'Accident damage cover',
      'Theft and hijacking protection',
      'Third-party liability up to R5 million',
      'Roadside assistance 24/7',
      'Car hire while yours is being repaired',
      'Windscreen cover included',
    ],
    insuredItems: [
      {
        id: 'item_001',
        name: '2022 Toyota Hilux 2.8 GD-6',
        value: 420000,
        description: 'Registration: CA 123-456',
      },
    ],
  },
  {
    id: 'pol_002',
    type: 'home',
    name: 'Home Contents Insurance',
    policyNumber: 'HME-2024-01293',
    status: 'active',
    premium: 980,
    frequency: 'monthly',
    nextPayment: '2026-02-01',
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    coverAmount: 850000,
    excess: 2000,
    description: 'Protect your home contents against theft, fire, and natural disasters.',
    features: [
      'All-risk cover for valuables',
      'Accidental damage protection',
      'Fire and explosion cover',
      'Storm and flood damage',
      'Temporary accommodation if needed',
      'Power surge protection',
    ],
    insuredItems: [
      {
        id: 'item_002',
        name: 'Household Contents',
        value: 650000,
      },
      {
        id: 'item_003',
        name: 'All-Risk Items (Laptop, Phone, Watch)',
        value: 85000,
      },
    ],
  },
  {
    id: 'pol_003',
    type: 'life',
    name: 'Life Cover Essential',
    policyNumber: 'LIF-2023-00456',
    status: 'active',
    premium: 650,
    frequency: 'monthly',
    nextPayment: '2026-02-01',
    startDate: '2023-06-01',
    endDate: '2033-05-31',
    coverAmount: 2000000,
    excess: 0,
    description: 'Financial security for your loved ones with comprehensive life cover.',
    features: [
      'Death benefit payout',
      'Terminal illness acceleration',
      'Funeral cover included',
      'Disability cover option',
      'Premium waiver on disability',
      'Annual bonus accumulation',
    ],
  },
  {
    id: 'pol_004',
    type: 'travel',
    name: 'Annual Travel Insurance',
    policyNumber: 'TRV-2024-00089',
    status: 'pending',
    premium: 2400,
    frequency: 'annually',
    nextPayment: '2026-06-15',
    startDate: '2025-06-15',
    endDate: '2026-06-14',
    coverAmount: 5000000,
    excess: 500,
    description: 'Worldwide travel protection for business and leisure trips.',
    features: [
      'Medical emergency cover worldwide',
      'Trip cancellation protection',
      'Lost luggage reimbursement',
      'Flight delay compensation',
      'Emergency evacuation',
      'COVID-19 cover included',
    ],
  },
];

// Mock Claims
export const mockClaims: Claim[] = [
  {
    id: 'clm_001',
    policyId: 'pol_001',
    policyType: 'motor',
    claimNumber: 'CLM-2025-08847',
    type: 'Accident Damage',
    status: 'under_review',
    amount: 45000,
    dateSubmitted: '2025-12-28',
    dateUpdated: '2026-01-15',
    description: 'Rear-end collision at traffic light on Jan Smuts Avenue. Other driver accepted liability.',
    timeline: [
      {
        id: 'evt_001',
        date: '2025-12-28',
        title: 'Claim Submitted',
        description: 'Your claim was successfully submitted with all required documents.',
        status: 'completed',
        icon: 'check_circle',
      },
      {
        id: 'evt_002',
        date: '2025-12-30',
        title: 'Documents Received',
        description: 'Police report and photos have been verified.',
        status: 'completed',
        icon: 'description',
      },
      {
        id: 'evt_003',
        date: '2026-01-08',
        title: 'Assessment Scheduled',
        description: 'Vehicle inspection booked at approved assessor.',
        status: 'completed',
        icon: 'event',
      },
      {
        id: 'evt_004',
        date: '2026-01-15',
        title: 'Under Review',
        description: 'Your claim is being reviewed by our claims team.',
        status: 'current',
        icon: 'pending',
      },
      {
        id: 'evt_005',
        date: '',
        title: 'Approval Decision',
        description: 'Awaiting final decision on your claim.',
        status: 'pending',
        icon: 'gavel',
      },
      {
        id: 'evt_006',
        date: '',
        title: 'Payment Processing',
        description: 'Payment will be processed once approved.',
        status: 'pending',
        icon: 'payments',
      },
    ],
    documents: [
      {
        id: 'doc_001',
        name: 'Police Report.pdf',
        type: 'pdf',
        uploadedAt: '2025-12-28',
        status: 'approved',
      },
      {
        id: 'doc_002',
        name: 'Accident Photos.zip',
        type: 'zip',
        uploadedAt: '2025-12-28',
        status: 'approved',
      },
      {
        id: 'doc_003',
        name: 'Assessment Report.pdf',
        type: 'pdf',
        uploadedAt: '2026-01-10',
        status: 'approved',
      },
    ],
  },
  {
    id: 'clm_002',
    policyId: 'pol_002',
    policyType: 'home',
    claimNumber: 'CLM-2025-07234',
    type: 'Theft',
    status: 'approved',
    amount: 32000,
    approvedAmount: 29500,
    dateSubmitted: '2025-11-10',
    dateUpdated: '2025-12-05',
    description: 'Burglary at residence. Laptop, television, and other electronics stolen.',
    timeline: [
      {
        id: 'evt_007',
        date: '2025-11-10',
        title: 'Claim Submitted',
        description: 'Claim submitted with police case number.',
        status: 'completed',
        icon: 'check_circle',
      },
      {
        id: 'evt_008',
        date: '2025-11-12',
        title: 'Investigation Started',
        description: 'Our investigator will contact you within 48 hours.',
        status: 'completed',
        icon: 'search',
      },
      {
        id: 'evt_009',
        date: '2025-11-20',
        title: 'Investigation Complete',
        description: 'All evidence reviewed and verified.',
        status: 'completed',
        icon: 'verified',
      },
      {
        id: 'evt_010',
        date: '2025-12-05',
        title: 'Claim Approved',
        description: 'Your claim has been approved for R29,500.',
        status: 'completed',
        icon: 'thumb_up',
      },
      {
        id: 'evt_011',
        date: '2025-12-08',
        title: 'Payment Processed',
        description: 'Funds transferred to your bank account.',
        status: 'completed',
        icon: 'payments',
      },
    ],
  },
  {
    id: 'clm_003',
    policyId: 'pol_001',
    policyType: 'motor',
    claimNumber: 'CLM-2024-04521',
    type: 'Windscreen Replacement',
    status: 'paid',
    amount: 4500,
    approvedAmount: 4500,
    dateSubmitted: '2024-08-15',
    dateUpdated: '2024-08-22',
    description: 'Cracked windscreen from stone chip on N1 highway.',
    timeline: [
      {
        id: 'evt_012',
        date: '2024-08-15',
        title: 'Claim Submitted',
        description: 'Windscreen claim submitted online.',
        status: 'completed',
        icon: 'check_circle',
      },
      {
        id: 'evt_013',
        date: '2024-08-16',
        title: 'Auto-Approved',
        description: 'Claim automatically approved under windscreen benefit.',
        status: 'completed',
        icon: 'bolt',
      },
      {
        id: 'evt_014',
        date: '2024-08-18',
        title: 'Repair Scheduled',
        description: 'Appointment booked with approved glass fitment centre.',
        status: 'completed',
        icon: 'build',
      },
      {
        id: 'evt_015',
        date: '2024-08-22',
        title: 'Repair Complete',
        description: 'Windscreen replaced and claim settled.',
        status: 'completed',
        icon: 'done_all',
      },
    ],
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif_001',
    type: 'urgent',
    title: 'Payment Due Soon',
    message: 'Your premium payment of R3,480 is due on 1 February 2026.',
    date: '2026-01-18',
    read: false,
    actionUrl: '/portal/payments',
    actionLabel: 'Pay Now',
  },
  {
    id: 'notif_002',
    type: 'success',
    title: 'Claim Update',
    message: 'Your motor claim (CLM-2025-08847) is now under review. Expected decision within 5 business days.',
    date: '2026-01-15',
    read: false,
    actionUrl: '/portal/claims',
    actionLabel: 'View Claim',
  },
  {
    id: 'notif_003',
    type: 'info',
    title: 'Policy Renewal Reminder',
    message: 'Your Comprehensive Motor Insurance renews on 15 January 2025. Review your cover details.',
    date: '2026-01-10',
    read: true,
    actionUrl: '/portal/policies',
    actionLabel: 'Review Policy',
  },
  {
    id: 'notif_004',
    type: 'warning',
    title: 'Travel Policy Pending',
    message: 'Your travel insurance application requires additional documentation.',
    date: '2026-01-05',
    read: true,
    actionUrl: '/portal/policies',
    actionLabel: 'Upload Documents',
  },
];

// Quick Actions
export const mockQuickActions: QuickAction[] = [
  {
    id: 'qa_001',
    label: 'Submit a Claim',
    icon: 'add_circle',
    href: '/portal/claims/new',
    description: 'Start a new insurance claim',
    colour: 'primary',
  },
  {
    id: 'qa_002',
    label: 'Make a Payment',
    icon: 'payments',
    href: '/portal/payments',
    description: 'Pay your premium or excess',
    colour: 'secondary',
  },
  {
    id: 'qa_003',
    label: 'Get a Quote',
    icon: 'calculate',
    href: '/quote',
    description: 'Add new cover to your portfolio',
    colour: 'accent',
  },
  {
    id: 'qa_004',
    label: 'Contact Support',
    icon: 'support_agent',
    href: '/contact',
    description: 'Chat with our team',
    colour: 'neutral',
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: 'pay_001',
    policyId: 'pol_001',
    policyName: 'Comprehensive Motor Insurance',
    amount: 1850,
    dueDate: '2026-02-01',
    status: 'due',
    frequency: 'monthly',
    paymentMethod: 'Debit Order - Nedbank ****4521',
  },
  {
    id: 'pay_002',
    policyId: 'pol_002',
    policyName: 'Home Contents Insurance',
    amount: 980,
    dueDate: '2026-02-01',
    status: 'due',
    frequency: 'monthly',
    paymentMethod: 'Debit Order - Nedbank ****4521',
  },
  {
    id: 'pay_003',
    policyId: 'pol_003',
    policyName: 'Life Cover Essential',
    amount: 650,
    dueDate: '2026-02-01',
    status: 'scheduled',
    frequency: 'monthly',
    paymentMethod: 'Debit Order - Nedbank ****4521',
  },
  {
    id: 'pay_004',
    policyId: 'pol_004',
    policyName: 'Annual Travel Insurance',
    amount: 2400,
    dueDate: '2026-06-15',
    status: 'scheduled',
    frequency: 'annually',
    paymentMethod: 'Card - Visa ****8832',
  },
];

// Mock Payment History
export const mockPaymentHistory: PaymentHistory[] = [
  {
    id: 'hist_001',
    amount: 3480,
    date: '2026-01-01',
    method: 'debit_order',
    status: 'successful',
    transactionId: 'TXN-2026-00001',
    policyName: 'Multiple Policies',
  },
  {
    id: 'hist_002',
    amount: 3480,
    date: '2025-12-01',
    method: 'debit_order',
    status: 'successful',
    transactionId: 'TXN-2025-00012',
    policyName: 'Multiple Policies',
  },
  {
    id: 'hist_003',
    amount: 3480,
    date: '2025-11-01',
    method: 'debit_order',
    status: 'successful',
    transactionId: 'TXN-2025-00011',
    policyName: 'Multiple Policies',
  },
  {
    id: 'hist_004',
    amount: 3480,
    date: '2025-10-01',
    method: 'debit_order',
    status: 'failed',
    transactionId: 'TXN-2025-00010',
    policyName: 'Multiple Policies',
  },
  {
    id: 'hist_005',
    amount: 3480,
    date: '2025-10-05',
    method: 'eft',
    status: 'successful',
    transactionId: 'TXN-2025-00010R',
    policyName: 'Multiple Policies (Retry)',
  },
  {
    id: 'hist_006',
    amount: 3480,
    date: '2025-09-01',
    method: 'debit_order',
    status: 'successful',
    transactionId: 'TXN-2025-00009',
    policyName: 'Multiple Policies',
  },
];

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: 'doc_001',
    type: 'policy',
    name: 'Motor Insurance Policy Schedule 2024.pdf',
    policyId: 'pol_001',
    uploadedDate: '2024-01-15',
    fileSize: '245 KB',
    category: 'policies',
  },
  {
    id: 'doc_002',
    type: 'certificate',
    name: 'Certificate of Insurance - Motor.pdf',
    policyId: 'pol_001',
    uploadedDate: '2024-01-15',
    fileSize: '120 KB',
    category: 'certificates',
  },
  {
    id: 'doc_003',
    type: 'policy',
    name: 'Home Contents Policy Schedule 2024.pdf',
    policyId: 'pol_002',
    uploadedDate: '2024-02-01',
    fileSize: '198 KB',
    category: 'policies',
  },
  {
    id: 'doc_004',
    type: 'invoice',
    name: 'Invoice January 2026.pdf',
    uploadedDate: '2026-01-01',
    fileSize: '85 KB',
    category: 'invoices',
  },
  {
    id: 'doc_005',
    type: 'invoice',
    name: 'Invoice December 2025.pdf',
    uploadedDate: '2025-12-01',
    fileSize: '85 KB',
    category: 'invoices',
  },
  {
    id: 'doc_006',
    type: 'claim',
    name: 'Claim Report CLM-2025-08847.pdf',
    uploadedDate: '2025-12-28',
    fileSize: '1.2 MB',
    category: 'claims',
  },
  {
    id: 'doc_007',
    type: 'claim',
    name: 'Claim Settlement CLM-2025-07234.pdf',
    uploadedDate: '2025-12-08',
    fileSize: '156 KB',
    category: 'claims',
  },
  {
    id: 'doc_008',
    type: 'policy',
    name: 'Life Cover Policy Schedule 2023.pdf',
    policyId: 'pol_003',
    uploadedDate: '2023-06-01',
    fileSize: '312 KB',
    category: 'policies',
  },
  {
    id: 'doc_009',
    type: 'statement',
    name: 'Annual Statement 2025.pdf',
    uploadedDate: '2025-12-15',
    fileSize: '425 KB',
    category: 'invoices',
  },
  {
    id: 'doc_010',
    type: 'certificate',
    name: 'Certificate of Insurance - Home.pdf',
    policyId: 'pol_002',
    uploadedDate: '2024-02-01',
    fileSize: '118 KB',
    category: 'certificates',
  },
];

// Helper functions
export function getPolicyIcon(type: Policy['type']): string {
  const icons: Record<Policy['type'], string> = {
    motor: 'directions_car',
    home: 'home',
    life: 'favorite',
    business: 'business',
    travel: 'flight',
  };
  return icons[type];
}

export function getStatusColour(status: Policy['status'] | Claim['status']): string {
  const colours: Record<string, string> = {
    active: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950',
    pending: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950',
    pending_documents: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950',
    expired: 'text-stone-500 bg-stone-100 dark:text-stone-400 dark:bg-stone-800',
    cancelled: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950',
    submitted: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950',
    under_review: 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950',
    approved: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950',
    rejected: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950',
    paid: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950',
  };
  return colours[status] || 'text-stone-500 bg-stone-100';
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatShortDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

export function getTierBadgeColour(tier: User['tier']): string {
  const colours: Record<User['tier'], string> = {
    bronze: 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/50',
    silver: 'text-slate-600 bg-slate-100 dark:text-slate-300 dark:bg-slate-800',
    gold: 'text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/50',
    platinum: 'text-violet-700 bg-violet-100 dark:text-violet-300 dark:bg-violet-900/50',
  };
  return colours[tier];
}

export function getPaymentStatusColour(status: Payment['status']): string {
  const colours: Record<Payment['status'], string> = {
    due: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950',
    scheduled: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950',
    paid: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950',
    overdue: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950',
  };
  return colours[status];
}

export function getPaymentHistoryStatusColour(status: PaymentHistory['status']): string {
  const colours: Record<PaymentHistory['status'], string> = {
    successful: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950',
    failed: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950',
    pending: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950',
    reversed: 'text-stone-600 bg-stone-100 dark:text-stone-400 dark:bg-stone-800',
  };
  return colours[status];
}

export function getDocumentIcon(type: Document['type']): string {
  const icons: Record<Document['type'], string> = {
    policy: 'description',
    certificate: 'verified',
    invoice: 'receipt',
    claim: 'assignment',
    statement: 'summarize',
    schedule: 'calendar_today',
  };
  return icons[type];
}

export function getPaymentMethodIcon(method: PaymentHistory['method']): string {
  const icons: Record<PaymentHistory['method'], string> = {
    debit_order: 'account_balance',
    card: 'credit_card',
    eft: 'send',
    cash: 'payments',
  };
  return icons[method];
}

// ═══════════════════════════════════════════════════════════════════════════
// ANALYTICS DATA & HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export interface MonthlyPayment {
  month: string;
  amount: number;
  claims: number;
}

export interface PolicyDistribution {
  type: string;
  count: number;
  premium: number;
  fill: string;
}

export interface ClaimsBreakdown {
  status: string;
  count: number;
  amount: number;
  fill: string;
}

export interface MonthlySpending {
  month: string;
  premiums: number;
  claims: number;
}

// Historical payment trends (12 months)
export const paymentTrends: MonthlyPayment[] = [
  { month: 'Feb 2025', amount: 3480, claims: 0 },
  { month: 'Mar 2025', amount: 3480, claims: 0 },
  { month: 'Apr 2025', amount: 3480, claims: 0 },
  { month: 'May 2025', amount: 3480, claims: 4500 },
  { month: 'Jun 2025', amount: 3480, claims: 0 },
  { month: 'Jul 2025', amount: 3480, claims: 0 },
  { month: 'Aug 2025', amount: 3480, claims: 0 },
  { month: 'Sep 2025', amount: 3480, claims: 0 },
  { month: 'Oct 2025', amount: 3480, claims: 0 },
  { month: 'Nov 2025', amount: 3480, claims: 32000 },
  { month: 'Dec 2025', amount: 3480, claims: 0 },
  { month: 'Jan 2026', amount: 3480, claims: 45000 },
];

// Chart colour palette (using tweakcn CSS variables)
export const chartColours = {
  primary: 'var(--chart-1)',      // Primary chart colour
  secondary: 'var(--chart-2)',    // Secondary chart colour
  accent: 'var(--chart-4)',       // Accent chart colour
  // Policy type colours
  motor: 'var(--chart-1)',        // Primary
  home: 'var(--chart-3)',         // Tertiary
  life: 'var(--chart-2)',         // Secondary
  travel: 'var(--chart-4)',       // Accent
  business: 'var(--chart-5)',     // Fifth
  // Status colours
  approved: 'var(--chart-3)',     // Tertiary (success)
  pending: 'var(--chart-4)',      // Accent (warning)
  underReview: 'var(--chart-5)',  // Fifth (info)
  rejected: 'var(--chart-2)',     // Secondary (error)
  paid: 'var(--chart-3)',         // Tertiary (success)
};

// Get policy distribution by type
export function getPolicyDistribution(): PolicyDistribution[] {
  const distribution = mockPolicies.reduce((acc, policy) => {
    const existing = acc.find((item) => item.type === policy.type);
    if (existing) {
      existing.count += 1;
      existing.premium += policy.frequency === 'monthly' ? policy.premium : policy.premium / 12;
    } else {
      acc.push({
        type: policy.type,
        count: 1,
        premium: policy.frequency === 'monthly' ? policy.premium : policy.premium / 12,
        fill: chartColours[policy.type as keyof typeof chartColours] || chartColours.primary,
      });
    }
    return acc;
  }, [] as PolicyDistribution[]);

  return distribution;
}

// Get claims breakdown by status
export function getClaimsBreakdown(): ClaimsBreakdown[] {
  const statusMap: Record<Claim['status'], { label: string; fill: string }> = {
    submitted: { label: 'Submitted', fill: chartColours.pending },
    under_review: { label: 'Under Review', fill: chartColours.underReview },
    approved: { label: 'Approved', fill: chartColours.approved },
    rejected: { label: 'Rejected', fill: chartColours.rejected },
    paid: { label: 'Paid', fill: chartColours.paid },
    pending_documents: { label: 'Pending Docs', fill: chartColours.accent },
  };

  const breakdown = mockClaims.reduce((acc, claim) => {
    const existing = acc.find((item) => item.status === statusMap[claim.status].label);
    if (existing) {
      existing.count += 1;
      existing.amount += claim.approvedAmount || claim.amount;
    } else {
      acc.push({
        status: statusMap[claim.status].label,
        count: 1,
        amount: claim.approvedAmount || claim.amount,
        fill: statusMap[claim.status].fill,
      });
    }
    return acc;
  }, [] as ClaimsBreakdown[]);

  return breakdown;
}

// Get monthly spending trends (premiums vs claims paid)
export function getMonthlySpendingTrends(): MonthlySpending[] {
  return paymentTrends.map((payment) => ({
    month: payment.month,
    premiums: payment.amount,
    claims: payment.claims,
  }));
}

// Get policy type label for display
export function getPolicyTypeLabel(type: Policy['type']): string {
  const labels: Record<Policy['type'], string> = {
    motor: 'Motor',
    home: 'Home',
    life: 'Life',
    business: 'Business',
    travel: 'Travel',
  };
  return labels[type];
}
