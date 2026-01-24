# Metrosure Insurance Brokers - Session Handover

**Updated:** 25 January 2026 (Session 138)
**Stack:** Next.js 16 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12 | shadcn/ui
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 52 pages + 7 API routes
- **Last Build:** 25 January 2026
- **Branch:** `main`

---

## CURRENT SESSION (138) - 25 Jan 2026

### Documentation: Job Vacancy Process

**Goal:** Document the complete job vacancy pipeline in CLAUDE.md so future sessions automatically know the full 4-file process without re-explanation.

### Completed Tasks

| Task | Status | Details |
|------|--------|---------|
| **Research Pipeline** | ✅ | Read all 4 files involved in job vacancy creation |
| **Document Process** | ✅ | Added comprehensive "Adding a New Job Vacancy" section to CLAUDE.md |
| **Job Data Template** | ✅ | Included full `Job` interface with field explanations |
| **Category Reference** | ✅ | Documented `sales`, `call-centre`, `admin` categories |
| **Verification Checklist** | ✅ | Added 6-point checklist for confirming job was added correctly |

### Files Modified

| File | Changes |
|------|---------|
| `metrosure-insurance/CLAUDE.md` | Added "Adding a New Job Vacancy" section with 4-file pipeline documentation |

### Key Documentation Added

The new CLAUDE.md section covers:
- **4-file pipeline table** - Quick reference: `jobs.ts`, `formOptions.ts`, `validationSchemas.ts`, `route.ts`
- **Step-by-step instructions** - Code examples for each file
- **Job data template** - Complete interface with comments
- **Categories** - `sales`, `call-centre`, `admin` with department examples
- **Auto-generated features** - Pages, SEO, schemas, salary estimation
- **Verification checklist** - Ensures complete implementation

### Uncommitted Changes

| File | Status | Notes |
|------|--------|-------|
| `CLAUDE.md` | Modified | Job vacancy documentation added |
| `public/sitemap.xml` | Modified | From previous session |
| `src/app/api/careers-application/route.ts` | Modified | Sales Agent position added (previous session) |
| `src/data/formOptions.ts` | Modified | Sales Agent position added (previous session) |
| `src/data/jobs.ts` | Modified | Sales Agent job listing added (previous session) |
| `src/lib/validationSchemas.ts` | Modified | Sales Agent validation added (previous session) |

---

## PREVIOUS SESSION (137) - 24 Jan 2026

### UI: Premium Backgrounds & Polish

| Task | Status | Details |
|------|--------|---------|
| Fine-Grain Noise | ✅ | Glama-style SVG noise (baseFrequency 0.8) |
| Grid Tuning | ✅ | Hardcoded 20% settings |
| Fix FOUC | ✅ | Moved opacity to SVG attributes |
| Map Fade | ✅ | Reverted to full-height fade |

---

## DEFERRED TASKS

### Phase D: OG Image Enhancement (User Decision Pending)

| Task | Status | Notes |
|------|--------|-------|
| OG Image Redesign | Deferred | Current image functional (1200x630px). Awaiting design direction from stakeholder. |
| Page-Specific OG Images | Skipped | Using generic OG image across all pages for launch |

### Location Pages (Future Session)

| Task | Reason | Notes |
|------|--------|-------|
| Location-specific pages | Time | `/locations/durban`, etc. with LocalBusiness schema |
| Service page geo-optimisation | Time | Add location keywords to insurance pages |

### Technical SEO (Post-Deployment)

| Task | Reason | Notes |
|------|--------|-------|
| Core Web Vitals check | Post-deploy | Run PageSpeed Insights on key pages |
| Canonical URL verification | Post-deploy | Ensure no self-referencing loops |

---

## NEXT SESSION PRIORITIES

### Priority 1: Commit Pending Changes

Uncommitted work from sessions 137-138:

| Change | Files | Action |
|--------|-------|--------|
| Sales Agent job listing | `jobs.ts`, `formOptions.ts`, `validationSchemas.ts`, `route.ts` | Commit as "feat(careers): add Sales Agent job vacancy" |
| Job vacancy documentation | `CLAUDE.md` | Commit as "docs: document job vacancy process in CLAUDE.md" |
| Sitemap update | `sitemap.xml` | Include in relevant commit |

### Priority 2: SEO Validation Testing (Requires Deployment)

Test deployed site with external validators:

| Validator | URL | Pages to Test |
|-----------|-----|---------------|
| Google Rich Results Test | https://search.google.com/test/rich-results | `/`, `/contact`, `/help`, `/careers/*` |
| Facebook Sharing Debugger | https://developers.facebook.com/tools/debug/ | `/` |
| Twitter Card Validator | https://cards-dev.twitter.com/validator | `/` |
| LinkedIn Post Inspector | https://www.linkedin.com/post-inspector/ | `/partners`, `/corporate` |

### Priority 3: Production Readiness (Critical)

| Task | Status | Notes |
|------|--------|-------|
| Remove Development Banner | Pending | `src/components/DevelopmentBanner.tsx` |
| Cross-browser testing | Pending | Chrome, Firefox, Edge, Safari |
| Mobile responsiveness audit | Pending | Test on real devices |
| Post-deploy CSP verification | Pending | https://securityheaders.com/ |

### Priority 4: Location Pages

Create location landing pages with LocalBusiness schema:
- `/locations/durban` (Head Office)
- `/locations/pietermaritzburg`
- `/locations/pretoria`
- `/locations/boksburg`

---

## RECOMMENDATIONS FOR NEXT SESSION

### Immediate Actions
1. **Commit pending changes** - Multiple files have uncommitted modifications from sessions 137-138
2. **Run `npm run build`** - Verify build passes before committing
3. **Push to remote** - Keep repository in sync

### Suggested Improvements
1. **Form Validation Consistency** - Consider centralising position/label mappings to avoid duplication across 4 files when adding jobs
2. **Automation Script** - Could create a CLI script to add new job vacancies (updates all 4 files automatically)
3. **Job Expiry Handling** - Jobs have `validThrough` dates but no mechanism to hide expired listings

---

## RECENT SESSION HISTORY

| Session | Date | Focus | Key Outcomes |
|---------|------|-------|--------------|
| **138** | 25 Jan | **Documentation** | Job vacancy process documented in CLAUDE.md (4-file pipeline) |
| **137** | 24 Jan | UI: Premium Backgrounds | Glama-style noise, tuned grid opacity, fixed FOUC, reverted map fade |
| **136** | 24 Jan | UX: Skeletons & Footer | Added skeleton loaders to 7 heavy pages, fixed footer link hover animation |
| **135** | 23 Jan | SEO Phase 3 | Social URLs, Twitter handle, home metadata, breadcrumb schemas for 6 pages, FAQ schema for Contact |
| **134** | 22 Jan | UI Refinement | Fixed background color on Careers page contact card |
| **133** | 22 Jan | SEO Phase 2 | Image alt text fixes, meta description optimization, Help page FAQ schema |
| **132** | 21 Jan | SEO Research | Sitemap cleanup, FAQ/Breadcrumb schema utilities |

---

## SKELETON LOADER COVERAGE

| Page | Skeleton | Key Elements |
|------|----------|--------------|
| `/careers` | ✅ Existing | Hero, stats bar, content placeholder |
| `/partners` | ✅ Session 136 | Hero with badge/CTAs, 4-col stats |
| `/` (Home) | ✅ Session 136 | Hero, stats bar, partner logos hint |
| `/about` | ✅ Session 136 | Hero, 4-col stats grid |
| `/tools/coverage-calculator` | ✅ Session 136 | Dark hero, tab nav, calculator card |
| `/corporate` | ✅ Session 136 | Hero, 3-col services preview |
| `/contact` | ✅ Session 136 | Hero, 4-col contact options |
| `/help` | ✅ Session 136 | Search, category tabs, FAQ placeholders |

---

## SEO IMPLEMENTATION STATUS

### Structured Data Coverage

| Schema Type | Pages | Status |
|-------------|-------|--------|
| InsuranceAgency | Root layout | ✅ Complete (with sameAs URLs) |
| BreadcrumbList | Contact, About, Help, Partners, Corporate, Calculator, Careers | ✅ Complete |
| FAQPage | Contact, Help, Partners | ✅ Complete |
| JobPosting | /careers/[slug] | ✅ Complete |

### Social Media Metadata

| Platform | Implementation | Status |
|----------|----------------|--------|
| OpenGraph | og:title, og:description, og:image, og:url | ✅ All pages |
| Twitter | summary_large_image, site handle | ✅ Root + pages |
| LinkedIn | Uses OpenGraph tags | ✅ Automatic |

---

## QUICK REFERENCE

### Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (must pass before commit)
```

### Contact Info (Single Source: `src/data/companyInfo.ts`)

| Type | Value |
|------|-------|
| **Head Office** | 32 Stephen Dlamini Road, Musgrave, Durban, 4001 |
| **Phone** | +27 31 301 1192 |
| **WhatsApp** | +27 67 120 9527 |
| **Email (B2C)** | info@metrosuregroup.co.za |
| **Email (B2B)** | clients@metrosureconsult.co.za |
| **FSP Number** | 47089 |

### Social Media

| Platform | URL |
|----------|-----|
| Facebook | https://www.facebook.com/people/Metrosure-Insurance-Brokers/100083163880679/ |
| LinkedIn | https://za.linkedin.com/company/metrosure |
| Instagram | https://www.instagram.com/metrosure_insurance_/ |
| Twitter Handle | @metrosure_insurance_ |
