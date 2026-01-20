# Client Portal Architecture Plan

**Document Version:** 1.0
**Created:** 20 January 2026 (Session 124)
**Status:** Draft for Stakeholder Review
**Author:** Development Team

---

## Executive Summary

This document outlines the architecture plan for the Metrosure Client Portal, a self-service platform enabling policyholders to manage their insurance products online.

**Business Goal:** Reduce call centre volume by 40% while improving customer satisfaction through digital self-service.

**Key Features:**
- View and manage active policies
- Track claims in real-time
- Make premium payments
- Download policy documents
- Update personal details

**Timeline:** 5-phase implementation over multiple sessions

---

## Table of Contents

1. [Architecture Decision Records (ADRs)](#architecture-decision-records)
2. [User Flows](#user-flows)
3. [Data Models](#data-models)
4. [Component Hierarchy](#component-hierarchy)
5. [Implementation Roadmap](#implementation-roadmap)
6. [Technical Specifications](#technical-specifications)
7. [Risk Mitigation](#risk-mitigation)

---

## Architecture Decision Records

### ADR-001: Authentication Strategy

| | |
|---|---|
| **Status** | Proposed |
| **Context** | Portal requires secure user authentication for accessing sensitive policy data |
| **Decision** | Use NextAuth.js with JWT tokens |
| **Options Considered** | 1. NextAuth.js (JWT) 2. Auth0 3. Supabase Auth 4. Custom JWT implementation |
| **Rationale** | NextAuth.js integrates natively with Next.js, supports multiple providers (Google, Apple, email), and handles session management. Lower operational cost than Auth0 for expected user volume. |
| **Consequences** | + Native Next.js integration, + Multiple auth providers, + Active community, - Limited enterprise features vs Auth0 |

**Authentication Flow:**
```
User → Login Page → NextAuth.js → Provider (Google/Apple/Credentials)
                          ↓
                    JWT Token Created
                          ↓
                    Session Cookie Set
                          ↓
                    Portal Access Granted
```

---

### ADR-002: Data Layer Architecture

| | |
|---|---|
| **Status** | Proposed |
| **Context** | Portal needs to fetch and display policy/claims data from backend systems |
| **Decision** | API Routes with Server Components + React Query for client-side caching |
| **Options Considered** | 1. REST API + React Query 2. GraphQL + Apollo 3. tRPC |
| **Rationale** | REST APIs align with existing backend systems. React Query provides intelligent caching, background refetching, and excellent devtools. Server Components reduce client bundle. |
| **Consequences** | + Familiar REST patterns, + Automatic caching, + Works with existing APIs, - No type safety like tRPC |

**Data Fetching Pattern:**
```typescript
// Server Component (initial load)
async function PoliciesPage() {
  const policies = await fetchPolicies(userId);
  return <PoliciesClient initialData={policies} />;
}

// Client Component (mutations, refetch)
function PoliciesClient({ initialData }) {
  const { data } = useQuery({
    queryKey: ['policies'],
    initialData,
    refetchOnWindowFocus: true,
  });
}
```

---

### ADR-003: State Management

| | |
|---|---|
| **Status** | Proposed |
| **Context** | Portal needs consistent state across components (user session, notifications, theme) |
| **Decision** | React Context for global state + React Query for server state |
| **Options Considered** | 1. React Context 2. Zustand 3. Redux Toolkit 4. Jotai |
| **Rationale** | Portal state is relatively simple (user, theme, notifications). Context handles these cases well. Server state (policies, claims) managed by React Query. Avoids additional dependencies. |
| **Consequences** | + No extra dependencies, + Sufficient for requirements, - May need migration if state grows complex |

**State Architecture:**
```
┌─────────────────────────────────────────┐
│           React Context                 │
│  ┌─────────────┐  ┌─────────────────┐   │
│  │ UserContext │  │ NotificationsCtx│   │
│  │ - session   │  │ - unread count  │   │
│  │ - profile   │  │ - notifications │   │
│  │ - tier      │  │ - mark as read  │   │
│  └─────────────┘  └─────────────────┘   │
└─────────────────────────────────────────┘
            ↕ (separate concern)
┌─────────────────────────────────────────┐
│          React Query Cache              │
│  ┌──────────┐ ┌──────────┐ ┌─────────┐  │
│  │ policies │ │ claims   │ │ payments│  │
│  │ []       │ │ []       │ │ []      │  │
│  └──────────┘ └──────────┘ └─────────┘  │
└─────────────────────────────────────────┘
```

---

### ADR-004: Component Library

| | |
|---|---|
| **Status** | Approved |
| **Context** | Portal needs consistent, accessible UI components |
| **Decision** | Continue using shadcn/ui with existing Metrosure theme |
| **Options Considered** | 1. shadcn/ui 2. Radix UI (raw) 3. Chakra UI 4. MUI |
| **Rationale** | shadcn/ui already installed (Session 117). Components are accessible, customisable, and match Metrosure brand. Badge variants already created (Session 121). |
| **Consequences** | + Already integrated, + Full customisation, + Accessible by default, - Manual updates required |

**Existing shadcn/ui Components:**
- Button, Input, Select, Textarea (forms)
- Dialog, Popover, DropdownMenu (overlays)
- Card, Table (layout)
- Badge (with custom variants: success, warning, error, tier badges)
- Progress, Tooltip, Avatar (UI elements)
- Sonner (toast notifications)

---

### ADR-005: Routing Strategy

| | |
|---|---|
| **Status** | Proposed |
| **Context** | Portal needs clear navigation and URL structure |
| **Decision** | Nested route groups with shared layout |
| **Rationale** | App Router's nested layouts allow shared portal chrome (sidebar, header) without remounting on navigation. Route groups keep portal separate from marketing site. |

**Route Structure:**
```
src/app/
├── (marketing)/          # Marketing site (existing)
│   ├── page.tsx          # Homepage
│   ├── about/
│   └── ...
│
├── (portal)/             # Client portal (new)
│   ├── layout.tsx        # Shared portal layout (sidebar, header)
│   ├── dashboard/
│   │   └── page.tsx      # /dashboard
│   ├── policies/
│   │   ├── page.tsx      # /policies (list)
│   │   └── [id]/
│   │       └── page.tsx  # /policies/POL-001 (detail)
│   ├── claims/
│   │   ├── page.tsx      # /claims (list)
│   │   ├── new/
│   │   │   └── page.tsx  # /claims/new (file claim)
│   │   └── [id]/
│   │       └── page.tsx  # /claims/CLM-001 (detail)
│   ├── payments/
│   │   └── page.tsx      # /payments
│   ├── documents/
│   │   └── page.tsx      # /documents
│   └── settings/
│       └── page.tsx      # /settings
│
├── login/                # Login page (exists)
│   └── page.tsx
│
└── api/
    └── auth/             # NextAuth.js routes
        └── [...nextauth]/
            └── route.ts
```

---

### ADR-006: Theming Approach

| | |
|---|---|
| **Status** | Proposed |
| **Context** | Portal needs distinct but consistent look from marketing site |
| **Decision** | CSS variable overrides with `[data-portal]` scope |
| **Options Considered** | 1. Scoped CSS variables 2. Separate theme file 3. CSS-in-JS |
| **Rationale** | Scoped approach (used in Sessions 119-122) allows portal-specific colours while reusing base theme. Warm neutrals for portal vs crisp neutrals for marketing. |
| **Consequences** | + Consistent approach, + Easy to adjust, + Dark mode compatible, - Requires discipline |

**Theme Approach:**
```css
/* Base theme (marketing) */
:root {
  --background: 250 249 247;  /* Cool stone */
  --foreground: 26 24 22;
}

/* Portal override */
[data-portal] {
  --background: 250 247 245;  /* Warmer cream */
  --foreground: 26 26 26;
  --card: 255 255 255;
}

.dark [data-portal] {
  --background: 28 25 23;     /* Warm charcoal */
  --foreground: 245 245 244;
}
```

---

## User Flows

### Flow 1: Login

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Landing    │────▶│  Login Page  │────▶│  Dashboard  │
│  Page       │     │              │     │             │
└─────────────┘     └──────────────┘     └─────────────┘
                          │
                          ▼
                    ┌─────────────┐
                    │   Choose    │
                    │   Provider  │
                    └─────────────┘
                          │
           ┌──────────────┼──────────────┐
           ▼              ▼              ▼
      ┌─────────┐   ┌─────────┐   ┌─────────────┐
      │ Google  │   │  Apple  │   │   Email +   │
      │  OAuth  │   │  OAuth  │   │   Password  │
      └─────────┘   └─────────┘   └─────────────┘
           │              │              │
           └──────────────┴──────────────┘
                          │
                          ▼
                    ┌─────────────┐
                    │  Validate   │
                    │  & Create   │
                    │   Session   │
                    └─────────────┘
                          │
                          ▼
                    ┌─────────────┐
                    │  Dashboard  │
                    │  (Logged In)│
                    └─────────────┘
```

### Flow 2: View Policy

```
┌───────────┐     ┌───────────────┐     ┌───────────────┐
│ Dashboard │────▶│ Policies List │────▶│ Policy Detail │
└───────────┘     └───────────────┘     └───────────────┘
                                              │
                        ┌─────────────────────┼─────────────────────┐
                        ▼                     ▼                     ▼
                  ┌───────────┐         ┌───────────┐         ┌───────────┐
                  │  Coverage │         │  Payment  │         │  Download │
                  │  Details  │         │  History  │         │  Document │
                  └───────────┘         └───────────┘         └───────────┘
```

### Flow 3: File a Claim

```
┌───────────┐     ┌───────────┐     ┌───────────────┐     ┌───────────────┐
│ Dashboard │────▶│  Claims   │────▶│  Select       │────▶│  Fill Claim   │
│           │     │  Page     │     │  Policy       │     │  Form         │
└───────────┘     └───────────┘     └───────────────┘     └───────────────┘
                                                                │
                                                                ▼
                                                          ┌───────────────┐
                                                          │  Upload       │
                                                          │  Documents    │
                                                          └───────────────┘
                                                                │
                                                                ▼
                                                          ┌───────────────┐
                                                          │  Review &     │
                                                          │  Submit       │
                                                          └───────────────┘
                                                                │
                                                                ▼
                                                          ┌───────────────┐
                                                          │  Confirmation │
                                                          │  + Reference  │
                                                          └───────────────┘
```

### Flow 4: Make Payment

```
┌───────────┐     ┌───────────────┐     ┌───────────────┐
│ Dashboard │────▶│   Payments    │────▶│  Select       │
│           │     │   Page        │     │  Payment      │
└───────────┘     └───────────────┘     └───────────────┘
                                              │
                                              ▼
                                        ┌───────────────┐
                                        │  Payment      │
                                        │  Method       │
                                        └───────────────┘
                                              │
                          ┌───────────────────┼───────────────────┐
                          ▼                   ▼                   ▼
                    ┌───────────┐       ┌───────────┐       ┌───────────┐
                    │   Card    │       │   EFT     │       │   Debit   │
                    │           │       │           │       │   Order   │
                    └───────────┘       └───────────┘       └───────────┘
                          │                   │                   │
                          └───────────────────┴───────────────────┘
                                              │
                                              ▼
                                        ┌───────────────┐
                                        │ Confirmation  │
                                        │ + Receipt     │
                                        └───────────────┘
```

---

## Data Models

### TypeScript Interfaces

```typescript
// ═══════════════════════════════════════════════════════════════════════════
// USER & AUTHENTICATION
// ═══════════════════════════════════════════════════════════════════════════

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  idNumber: string;  // SA ID number (13 digits)
  dateOfBirth: string;
  address: Address;
  tier: "bronze" | "silver" | "gold" | "platinum";
  createdAt: string;
  lastLogin: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  province: Province;
  postalCode: string;
}

export type Province =
  | "Eastern Cape"
  | "Free State"
  | "Gauteng"
  | "KwaZulu-Natal"
  | "Limpopo"
  | "Mpumalanga"
  | "Northern Cape"
  | "North West"
  | "Western Cape";

// ═══════════════════════════════════════════════════════════════════════════
// POLICIES
// ═══════════════════════════════════════════════════════════════════════════

export interface Policy {
  id: string;  // e.g., "POL-2024-001234"
  userId: string;
  type: PolicyType;
  status: PolicyStatus;
  provider: InsuranceProvider;

  // Coverage details
  coverAmount: number;  // in ZAR cents
  premium: number;      // monthly, in ZAR cents
  excess?: number;      // in ZAR cents

  // Dates
  startDate: string;
  endDate: string;
  nextPaymentDate: string;

  // Beneficiaries (for life/funeral)
  beneficiaries?: Beneficiary[];

  // Assets (for vehicle/home)
  insuredAsset?: InsuredAsset;

  createdAt: string;
  updatedAt: string;
}

export type PolicyType =
  | "funeral"
  | "life"
  | "vehicle"
  | "home"
  | "health"
  | "device";

export type PolicyStatus =
  | "active"
  | "pending"
  | "lapsed"
  | "cancelled"
  | "expired";

export interface InsuranceProvider {
  id: string;
  name: string;  // e.g., "AVBOB", "Metropolitan", "bolttech"
  logo: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  relationship: string;
  idNumber: string;
  percentage: number;  // 0-100
}

export interface InsuredAsset {
  type: "vehicle" | "property" | "device";
  description: string;
  value: number;  // in ZAR cents

  // Vehicle specific
  registration?: string;
  make?: string;
  model?: string;
  year?: number;

  // Property specific
  address?: Address;
  propertyType?: "house" | "flat" | "townhouse";

  // Device specific
  imei?: string;
  serialNumber?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// CLAIMS
// ═══════════════════════════════════════════════════════════════════════════

export interface Claim {
  id: string;  // e.g., "CLM-2024-005678"
  policyId: string;
  userId: string;
  type: ClaimType;
  status: ClaimStatus;

  // Claim details
  description: string;
  incidentDate: string;
  claimAmount: number;  // requested, in ZAR cents
  approvedAmount?: number;  // if approved, in ZAR cents

  // Documents
  documents: ClaimDocument[];

  // Timeline
  timeline: ClaimTimelineEvent[];

  // Assignment
  assessorName?: string;
  assessorContact?: string;

  createdAt: string;
  updatedAt: string;
}

export type ClaimType =
  | "death"
  | "accident"
  | "theft"
  | "damage"
  | "illness"
  | "hospitalisation";

export type ClaimStatus =
  | "submitted"
  | "under_review"
  | "pending_documents"
  | "approved"
  | "rejected"
  | "paid";

export interface ClaimDocument {
  id: string;
  name: string;
  type: DocumentType;
  url: string;
  uploadedAt: string;
  status: "pending" | "verified" | "rejected";
}

export type DocumentType =
  | "id_document"
  | "death_certificate"
  | "police_report"
  | "medical_report"
  | "proof_of_loss"
  | "bank_statement"
  | "invoice"
  | "other";

export interface ClaimTimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "info" | "action_required" | "completed" | "warning";
}

// ═══════════════════════════════════════════════════════════════════════════
// PAYMENTS
// ═══════════════════════════════════════════════════════════════════════════

export interface Payment {
  id: string;  // e.g., "PAY-2024-009012"
  policyId: string;
  userId: string;

  amount: number;  // in ZAR cents
  status: PaymentStatus;
  method: PaymentMethod;

  dueDate: string;
  paidDate?: string;

  reference?: string;  // bank reference
  receiptUrl?: string;

  createdAt: string;
}

export type PaymentStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "refunded";

export type PaymentMethod =
  | "debit_order"
  | "card"
  | "eft"
  | "cash";

// ═══════════════════════════════════════════════════════════════════════════
// DOCUMENTS
// ═══════════════════════════════════════════════════════════════════════════

export interface Document {
  id: string;
  userId: string;
  policyId?: string;
  claimId?: string;

  name: string;
  category: DocumentCategory;
  type: string;  // MIME type
  size: number;  // bytes
  url: string;

  createdAt: string;
}

export type DocumentCategory =
  | "policy_schedule"
  | "policy_wording"
  | "claim_form"
  | "payment_receipt"
  | "tax_certificate"
  | "correspondence";

// ═══════════════════════════════════════════════════════════════════════════
// NOTIFICATIONS
// ═══════════════════════════════════════════════════════════════════════════

export interface Notification {
  id: string;
  userId: string;

  title: string;
  message: string;
  type: NotificationType;
  priority: "low" | "normal" | "high" | "urgent";

  link?: string;  // internal link to relevant page
  read: boolean;

  createdAt: string;
}

export type NotificationType =
  | "payment_reminder"
  | "payment_success"
  | "payment_failed"
  | "claim_update"
  | "policy_renewal"
  | "document_ready"
  | "general";
```

### Database Schema (Conceptual)

```
┌─────────────────┐       ┌─────────────────┐
│     users       │       │    policies     │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │──┐    │ id (PK)         │
│ email           │  │    │ user_id (FK)    │──┐
│ first_name      │  └───▶│ type            │  │
│ last_name       │       │ status          │  │
│ phone           │       │ provider_id     │  │
│ id_number       │       │ cover_amount    │  │
│ tier            │       │ premium         │  │
│ ...             │       │ ...             │  │
└─────────────────┘       └─────────────────┘  │
                                │               │
                                ▼               │
┌─────────────────┐       ┌─────────────────┐  │
│    claims       │       │   payments      │  │
├─────────────────┤       ├─────────────────┤  │
│ id (PK)         │       │ id (PK)         │  │
│ policy_id (FK)  │──────▶│ policy_id (FK)  │◀─┘
│ user_id (FK)    │       │ user_id (FK)    │
│ type            │       │ amount          │
│ status          │       │ status          │
│ ...             │       │ ...             │
└─────────────────┘       └─────────────────┘
        │
        ▼
┌─────────────────┐       ┌─────────────────┐
│ claim_documents │       │  notifications  │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ claim_id (FK)   │       │ user_id (FK)    │
│ name            │       │ title           │
│ type            │       │ message         │
│ url             │       │ type            │
│ status          │       │ read            │
│ ...             │       │ ...             │
└─────────────────┘       └─────────────────┘
```

---

## Component Hierarchy

### Layout Components

```
PortalLayout
├── PortalSidebar
│   ├── Logo (with dark/light variants)
│   ├── NavLinks
│   │   ├── NavItem (Dashboard)
│   │   ├── NavItem (Policies)
│   │   ├── NavItem (Claims)
│   │   ├── NavItem (Payments)
│   │   ├── NavItem (Documents)
│   │   └── NavItem (Settings)
│   └── PoweredBy (Zoocora logo)
│
├── PortalHeader
│   ├── MobileMenuTrigger
│   ├── SearchBar
│   ├── NotificationsBell
│   │   └── NotificationsPopover
│   ├── ThemeToggle
│   └── UserMenu
│       └── UserDropdown
│
└── PortalContent
    └── {children}
```

### Page Components

```
DashboardPage
├── WelcomeSection
├── QuickActions
│   ├── ActionCard (View Policies)
│   ├── ActionCard (File Claim)
│   ├── ActionCard (Make Payment)
│   └── ActionCard (Get Quote)
├── StatsRow
│   ├── StatCard (Active Policies)
│   ├── StatCard (Pending Claims)
│   ├── StatCard (Next Payment)
│   └── StatCard (Tier Status)
├── PoliciesPreview
│   └── PolicyCard (compact) × 3
├── ClaimsPreview
│   └── ClaimCard (compact) × 3
└── AnalyticsSection
    ├── PremiumTrendChart
    ├── PolicyDistributionChart
    ├── ClaimsStatusChart
    └── SpendingTrendsChart
```

```
PoliciesPage
├── PageHeader
├── FiltersBar
│   ├── StatusFilter
│   ├── TypeFilter
│   └── SortSelect
├── PoliciesList
│   └── PolicyCard (default) × n
└── PolicyDetailSheet (on click)
    ├── PolicyHeader
    ├── CoverageDetails
    ├── BeneficiariesList
    ├── PaymentHistory
    └── DocumentsList
```

```
ClaimsPage
├── PageHeader
├── FiltersBar
├── ClaimsList
│   └── ClaimCard × n
├── NewClaimButton
└── ClaimDetailSheet (on click)
    ├── ClaimHeader
    ├── ClaimsTimeline
    ├── DocumentsList
    └── ActionButtons

NewClaimPage
├── PageHeader
├── ClaimForm (multi-step)
│   ├── Step 1: SelectPolicy
│   ├── Step 2: ClaimDetails
│   ├── Step 3: UploadDocuments
│   └── Step 4: Review & Submit
└── FormNavigation
```

### Shared Components

```
UI Components (shadcn/ui)
├── Button
├── Input
├── Select
├── Textarea
├── Card
├── Table
├── Badge (with custom variants)
├── Dialog
├── Popover
├── Progress
├── Tooltip
├── Avatar
└── Sonner (toast)

Portal Components
├── PolicyCard (default, compact, expanded)
├── ClaimCard (default, compact)
├── PaymentCard
├── DocumentCard
├── StatCard
├── ActionCard
├── ClaimsTimeline
├── EmptyState
└── LoadingState
```

---

## Implementation Roadmap

### Phase 1: Foundation (Session 125-126)

**Goal:** Core infrastructure and authentication

| Task | Priority | Complexity |
|------|----------|------------|
| Set up NextAuth.js with credentials provider | High | Medium |
| Create PortalLayout component | High | Medium |
| Implement protected routes middleware | High | Low |
| Create dashboard page skeleton | High | Low |
| Set up React Query provider | Medium | Low |

**Deliverables:**
- Working login/logout flow
- Basic dashboard with placeholder content
- Protected portal routes

### Phase 2: Core Features (Session 127-129)

**Goal:** Policy and claims viewing

| Task | Priority | Complexity |
|------|----------|------------|
| Create mock data service | High | Low |
| Build PolicyCard component (3 variants) | High | Medium |
| Build policies list page | High | Medium |
| Build policy detail sheet | High | Medium |
| Build ClaimsTimeline component | High | Medium |
| Build claims list page | High | Medium |
| Build claim detail sheet | High | Medium |

**Deliverables:**
- View all policies with filtering
- View policy details
- View claims with timeline
- View claim details

### Phase 3: Transactions (Session 130-132)

**Goal:** Payments and document management

| Task | Priority | Complexity |
|------|----------|------------|
| Build payments page | High | Medium |
| Create payment cards | Medium | Low |
| Build documents page | High | Medium |
| Implement document download | Medium | Low |
| Build file claim wizard | High | High |
| Implement document upload | Medium | Medium |

**Deliverables:**
- View payment history
- Download documents
- File new claims with document upload

### Phase 4: User Experience (Session 133-134)

**Goal:** Settings and notifications

| Task | Priority | Complexity |
|------|----------|------------|
| Build settings page | Medium | Medium |
| Implement notification system | Medium | Medium |
| Add notification bell with popover | Medium | Low |
| Implement theme toggle (dark/light) | Low | Low |
| Add analytics charts to dashboard | Low | Medium |

**Deliverables:**
- User profile settings
- Notification preferences
- Real-time notification display
- Dashboard analytics

### Phase 5: Polish & Integration (Session 135+)

**Goal:** Production readiness

| Task | Priority | Complexity |
|------|----------|------------|
| API integration (replace mock data) | High | High |
| Error handling and edge cases | High | Medium |
| Loading states and skeletons | Medium | Low |
| Mobile responsiveness audit | High | Medium |
| Accessibility audit (WCAG 2.1) | High | Medium |
| Performance optimisation | Medium | Medium |
| Security audit | High | Medium |

**Deliverables:**
- Production-ready portal
- Real API integration
- Comprehensive error handling

---

## Technical Specifications

### Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 16.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Components | shadcn/ui | Latest |
| Animation | Framer Motion | 12.x |
| Auth | NextAuth.js | 5.x (beta) |
| Data Fetching | React Query | 5.x |
| Charts | Recharts | 2.x |
| Forms | React Hook Form + Zod | Latest |

### Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to Interactive (TTI) | < 3.5s |
| Bundle size (initial) | < 150KB (gzipped) |

### Security Requirements

| Requirement | Implementation |
|-------------|----------------|
| Authentication | NextAuth.js with JWT |
| Session management | HTTP-only cookies, 24h expiry |
| CSRF protection | Built into NextAuth.js |
| Rate limiting | API route middleware |
| Input validation | Zod schemas |
| XSS prevention | React's built-in escaping |
| HTTPS only | Vercel platform |
| POPIA compliance | Data handling procedures |

### Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| WCAG Level | 2.1 AA |
| Keyboard navigation | Full support |
| Screen reader | ARIA labels, semantic HTML |
| Colour contrast | 4.5:1 minimum |
| Focus indicators | Visible focus rings |
| Reduced motion | Respect `prefers-reduced-motion` |

---

## Risk Mitigation

### Technical Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| API latency affects UX | High | Medium | React Query caching, optimistic updates, loading skeletons |
| Authentication failures | High | Low | Multiple auth providers, error handling, retry logic |
| Mobile performance issues | Medium | Medium | Code splitting, lazy loading, performance monitoring |
| Browser compatibility | Low | Low | Testing matrix, progressive enhancement |

### Business Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Low user adoption | High | Medium | User testing, feedback loops, gradual rollout |
| Data inconsistency | High | Low | API validation, optimistic UI with rollback |
| Security breach | Critical | Low | Regular security audits, penetration testing |
| Scope creep | Medium | High | Strict phase boundaries, MVP focus |

### Operational Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| API unavailability | High | Low | Graceful degradation, offline indicators |
| High support volume | Medium | Medium | In-app help, FAQ section, tooltips |
| Deployment failures | Medium | Low | Staged rollouts, feature flags, rollback plan |

---

## Appendix

### A. Colour Reference (Portal Theme)

**Light Mode:**
| Variable | RGB | Hex | Usage |
|----------|-----|-----|-------|
| Background | 250 247 245 | #FAF7F5 | Page background |
| Foreground | 26 26 26 | #1A1A1A | Primary text |
| Card | 255 255 255 | #FFFFFF | Card backgrounds |
| Primary | 191 6 3 | #BF0603 | Brand red |
| Secondary | 105 0 37 | #690025 | Maroon |
| Muted | 240 235 232 | #F0EBE8 | Subtle backgrounds |
| Border | 245 232 210 | #F5E8D2 | Warm borders |

**Dark Mode:**
| Variable | RGB | Hex | Usage |
|----------|-----|-----|-------|
| Background | 28 25 23 | #1C1917 | Page background |
| Foreground | 245 245 244 | #F5F5F4 | Primary text |
| Card | 41 37 36 | #292524 | Card backgrounds |
| Primary | 185 28 28 | #B91C1C | Red |
| Secondary | 105 0 37 | #690025 | Maroon |
| Muted | 31 28 26 | #1F1C1A | Subtle backgrounds |
| Border | 68 64 60 | #44403C | Borders |

### B. Icon Reference

Portal uses Material Symbols Outlined. Common icons:

| Context | Icon |
|---------|------|
| Dashboard | `dashboard` |
| Policies | `shield` |
| Claims | `description` |
| Payments | `payments` |
| Documents | `folder` |
| Settings | `settings` |
| Notifications | `notifications` |
| Search | `search` |
| Light mode | `light_mode` |
| Dark mode | `dark_mode` |
| Logout | `logout` |

### C. Status Badge Mappings

```typescript
// Policy status
active → success (green)
pending → warning (amber)
lapsed → error (red)
cancelled → neutral (stone)
expired → neutral (stone)

// Claim status
submitted → info (blue)
under_review → info (blue)
pending_documents → warning (amber)
approved → success (green)
rejected → error (red)
paid → success (green)

// Payment status
pending → warning (amber)
processing → info (blue)
completed → success (green)
failed → error (red)
refunded → neutral (stone)

// User tier
bronze → bronze (amber metallic)
silver → silver (slate metallic)
gold → gold (yellow metallic)
platinum → platinum (violet metallic)
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 20 Jan 2026 | Development Team | Initial draft for stakeholder review |

---

*This document is for internal planning purposes. Implementation details may change based on stakeholder feedback and technical discoveries.*
