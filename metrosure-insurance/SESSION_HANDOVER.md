# Metrosure Insurance Brokers - Session Handover

**Updated:** 17 January 2026 (Session 111)
**Stack:** Next.js 16 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 45 (38 pages + 7 API routes)
- **Last Build:** 17 January 2026

---

## SESSION 111 (17 Jan 2026) - Employee Testimonials & UI Polish

### Completed
| Task | Status |
|------|--------|
| Update employee testimonials (names, roles, stories) | ✅ Complete |
| Add warning icon to Development Banner | ✅ Complete |
| Minimise SESSION_HANDOVER.md | ✅ Complete |

### Employee Updates
| Name | Role | Department |
|------|------|------------|
| Khayakazi Cele | Accounts Clerk | Finance |
| Selona Ramjiawan | Executive Administrator | Executive Office |
| Thami Mbambo | Project Manager | Operations |
| Mercutio Buthelezi | Sales Manager | Sales |
| Khwezi Dube | Facilitator | Learning & Development |
| Mvelo Mkhanazi | Sales Manager | Sales |

### Files Modified
- `src/data/employeeTestimonials.ts` - Updated 6 employees with new names, roles, professional growth stories
- `src/components/DevelopmentBanner.tsx` - Added warning icon before text
- `SESSION_HANDOVER.md` - Reduced from ~1400 to ~250 lines

---

## NEXT SESSION PRIORITIES

### Priority 1: Job Service Activation (When Ready)
- Client creates Workable account at https://www.workable.com/
- Generate API token, set `WORKABLE_API_TOKEN` and `WORKABLE_SUBDOMAIN` in Vercel
- Alternative: Indeed Publisher API at https://ads.indeed.com/jobroll/

### Priority 2: Production Readiness Review
- Cross-browser testing (Chrome, Firefox, Edge)
- Mobile responsive testing (375px, 768px, 1024px)
- Social media metadata testing (OG tags, Twitter cards)

### Priority 3: Final Decisions
- Home testimonials: Decide between Bold Statement or Minimal
- Remove TestimonialsVariantSwitcher when final decision made
- CaseStudies reinstatement (awaiting stakeholder decision)
- Gallery reimplementation (currently removed from About and Careers)

### Priority 4: Pre-Production
- Remove Development Banner before go-live

---

## KEY FILE LOCATIONS

### Core Configuration
| File | Purpose |
|------|---------|
| `CLAUDE.md` | Complete style guide, coding conventions, patterns |
| `src/data/` | Centralised data (jobs, partners, services, testimonials) |
| `src/lib/` | Utilities (email, validation, rate limiting) |

### Job Integration (Session 110)
| File | Purpose |
|------|---------|
| `src/lib/workable.ts` | Workable ATS API client |
| `src/lib/indeed.ts` | Indeed Publisher API client |
| `src/data/jobs.ts` | Job fetching with priority fallback |

### Email Routing
| Type | Address |
|------|---------|
| Careers applications | `hr@metrosureconsult.co.za` |
| CC on applications | `lazola@metrosureconsult.co.za` |
| General contact | `info@metrosuregroup.co.za` |

### Feature Toggles
| Feature | Status | Location |
|---------|--------|----------|
| Cookie consent | Disabled | `src/components/ClientLayout.tsx` |
| Development Banner | Active | `src/components/DevelopmentBanner.tsx` |
| Home testimonial switcher | Active | `src/app/page.tsx` |

---

## QUICK REFERENCE

### Commands
```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (must pass before commit)
```

### Environment Variables (Job Integration)
```bash
# Workable (ATS)
WORKABLE_API_TOKEN=your_token
WORKABLE_SUBDOMAIN=metrosure

# Indeed (Job Board)
INDEED_PUBLISHER_ID=your_id
INDEED_EMPLOYER_ID=your_id
```

### Rate Limits
| Route | Limit |
|-------|-------|
| Careers application | 3/hour |
| Partner/Corporate inquiry | 5/hour |
| Calculator email | 10/hour |
| Quote request | 10/hour |
| Contact form | 15/hour |

---

## LESSONS LEARNED (Summary)

### Critical Patterns
- **AnimatePresence + App Router:** Incompatible - use `whileInView` instead
- **Footer overlap:** Requires `-mt-8 md:-mt-12` + `z-20` for rounded corners
- **Dark mode:** Use warm neutrals, test both modes before committing
- **British English:** Always use en-GB spelling (colour, organisation, programme)

### Form Components
Use `Labelled*` components (LabelledInput, LabelledSelect, LabelledTextarea) - floating labels deprecated.

### Build Discipline
Always run `npm run build` before committing. TypeScript errors will break Vercel deploy.

### Documentation Location
Detailed style guides, coding conventions, and historical lessons are in `CLAUDE.md`.

---

## RECENT SESSION HIGHLIGHTS

| Session | Focus | Key Outcomes |
|---------|-------|--------------|
| 110 | Job Service Integration | Workable + Indeed API clients ready, email routing updated |
| 109 | Git Learning | Cherry-pick vs checkout, HomerunHero dark mode |
| 104 | Variant Cleanup | Deleted 6 unused components, login redirects to under-development |
| 103 | Style Guide | Variant selections finalised, CLAUDE.md patterns documented |

---

*For detailed coding conventions, patterns, and historical lessons, see `CLAUDE.md`.*
