# Session 156 Plan — 18 March 2026

**Previous Session:** 155 (26 Feb 2026) — Fixed GSC indexing issues, sitemap reduced 25→13 URLs, JobPosting JSON-LD schema fixes

**Build Status:** ✅ Passing

---

## Session Focus

1. **Add New Job Vacancy** — Sales Representative (field-based)
2. **Hide Existing Vacancies** — Sales Agent and Call Centre Agent
3. **Production Readiness** — Remove Development Banner

---

## Task Breakdown

### 1. Add Sales Representative Vacancy

**New job details:**

| Field | Value |
|-------|-------|
| id | `sales-representative` |
| slug | `sales-representative` |
| title | Sales Representative |
| department | Sales |
| category | sales |
| location | All Provinces |
| type | Full-time |

**Description:**
> We are seeking experienced field-based sales representatives to attract new clients and maximise profitability within their territory. Candidates will work prospects through the entire sales cycle including developing new leads and educating prospects.

**Responsibilities:**
- Close new deals and achieve sales targets
- Build relationships with existing customers
- Travel through the territory and visit customers on a recurring basis
- Represent the brand during all customer and prospect interactions
- Educate customers on how products or services can benefit them financially and professionally
- Monitor the company's industry competitors and market conditions

**Requirements:**
- Matric certificate (Grade 12)
- Experience in sales
- South African ID
- Valid driver's licence
- Strong communication and interpersonal skills

**Offers:**
- Competitive base salary + uncapped commission
- Full product training provided
- Career growth opportunities
- Supportive team environment

**Files to update (4 files per AGENTS.md):**

| File | Change |
|------|--------|
| `src/data/jobs.ts` | Add new job entry |
| `src/data/formOptions.ts` | Add `sales-representative` to `jobPositions` |
| `src/lib/validationSchemas.ts` | Add `sales-representative` to `validPositions` |
| `src/app/api/careers-application/route.ts` | Add label to `positionLabels` |

### 2. Hide Existing Vacancies

Set `hidden: true` on:
- `sales-agent` (currently visible)
- `call-centre-agent` (currently visible)

**Result:** Only Sales Representative will be visible on `/careers`

### 3. Update Sitemap Configuration

| File | Change |
|------|--------|
| `next-sitemap.config.js` | Update priority map: remove old job slugs, add `/careers/sales-representative` at 0.8 |

### 4. Verification

- [ ] `npm run build` passes
- [ ] `/careers` shows only Sales Representative
- [ ] `/careers/sales-representative` loads correctly
- [ ] Application form includes new position option
- [ ] Form validation accepts new position
### 5. Update SESSION_HANDOVER.md

Document all changes for Session 157.

---

## Deferred Tasks (from Session 155)

These remain pending for future sessions:

| Task | Notes |
|------|-------|
| GSC sitemap resubmission | Manual — do in browser |
| Request indexing on key pages | Manual — URL Inspection in GSC |
| Cross-browser testing | Chrome, Firefox, Edge, Safari |
| Mobile responsiveness audit | 375px, 768px, 1024px |
| Remove Development Banner | When ready for full production |
| Re-enable WhatsApp button | When ready |
| Re-enable applicant confirmation email | When ready |
| Cookie consent banner | When ready |

---

## Notable Date

Today (18 March 2026) marks **10 years since Metrosure's founding** (18 March 2016). Consider adding a celebration element in a future session if desired.

---

## Ready to Execute

Switch to **Code mode** to implement these changes.
