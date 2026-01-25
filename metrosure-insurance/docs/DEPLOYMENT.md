# Metrosure Insurance - Deployment Checklist

**Last Updated:** 25 January 2026 (Session 142)

---

## Environment Variables

### Required for Production

| Variable | Description | Where to Set |
|----------|-------------|--------------|
| `RESEND_API_KEY` | Resend email service API key | Vercel Dashboard |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps embed API key | Vercel Dashboard |
| `NEXT_PUBLIC_TAWK_PROPERTY_ID` | Tawk.to property ID | Vercel Dashboard |
| `NEXT_PUBLIC_TAWK_WIDGET_ID` | Tawk.to widget ID | Vercel Dashboard |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Production site URL | `https://metrosuregroup.co.za` |

---

## Pre-Deployment Verification

### 1. Build Verification

```bash
# Must pass without errors
npm run build

# Expected output: 54 pages + 7 API routes
```

### 2. Code Quality Checks

- [ ] `npm run lint` passes (no ESLint errors)
- [ ] No TypeScript errors in build output
- [ ] No console warnings in development mode

### 3. Content Verification

- [ ] Development banner removed from `src/components/DevelopmentBanner.tsx`
- [ ] All contact information correct in `src/data/companyInfo.ts`
- [ ] FSP number (47089) displayed correctly
- [ ] All links functional (internal and external)

### 4. Feature Verification

| Feature | Test Steps | Expected Result |
|---------|-----------|-----------------|
| Contact Form | Submit test enquiry | Email received, success toast shown |
| Quote Request | Submit test quote | Email received with details |
| Careers Application | Upload CV, submit | Email with attachment received |
| Calculator | Complete calculation, email results | PDF-style email received |
| Dark Mode | Toggle theme | All pages render correctly |
| Mobile Nav | Tap hamburger menu | Smooth animation, all links work |

### 5. Cross-Browser Testing

| Browser | Versions | Priority |
|---------|----------|----------|
| Chrome | Latest, -1 | High |
| Firefox | Latest, -1 | High |
| Safari | Latest | High |
| Edge | Latest | Medium |

### 6. Responsive Testing

Test on these breakpoints:
- [ ] 375px (Mobile)
- [ ] 768px (Tablet)
- [ ] 1024px (Desktop)
- [ ] 1440px (Large Desktop)

---

## Post-Deployment Validation

### 1. Security Headers

**Tool:** https://securityheaders.com/

Expected headers (via Vercel):
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`

### 2. SEO Validation

| Validator | URL | Pages to Test |
|-----------|-----|---------------|
| Google Rich Results Test | https://search.google.com/test/rich-results | `/`, `/contact`, `/help`, `/careers/*` |
| Facebook Sharing Debugger | https://developers.facebook.com/tools/debug/ | `/` |
| Twitter Card Validator | https://cards-dev.twitter.com/validator | `/` |
| LinkedIn Post Inspector | https://www.linkedin.com/post-inspector/ | `/partners`, `/corporate` |

### 3. Performance Audit

**Tool:** https://pagespeed.web.dev/

Target scores:
| Metric | Target |
|--------|--------|
| Performance | > 90 |
| Accessibility | > 95 |
| Best Practices | > 90 |
| SEO | > 95 |

Key pages to test:
- Homepage (`/`)
- Contact (`/contact`)
- About (`/about`)
- Insurance pages (`/insurance/*`)

### 4. Sitemap Verification

- [ ] `https://metrosuregroup.co.za/sitemap.xml` accessible
- [ ] All pages listed correctly
- [ ] No broken URLs in sitemap

### 5. Analytics Verification

- [ ] Vercel Analytics receiving data
- [ ] Vercel Speed Insights active
- [ ] Page views tracked correctly

---

## Rollback Procedures

### Quick Rollback (Vercel Dashboard)

1. Navigate to Vercel Dashboard → Project → Deployments
2. Find the last working deployment
3. Click the three-dot menu → "Promote to Production"
4. Confirm the rollback

### Git Rollback

```bash
# View recent commits
git log --oneline -10

# Revert to specific commit
git revert <commit-hash>
git push origin main

# Or reset to specific commit (destructive)
git reset --hard <commit-hash>
git push --force origin main  # Use with caution
```

### Environment Variable Issues

1. Check Vercel Dashboard → Settings → Environment Variables
2. Verify all required variables are set
3. Redeploy if variables were changed

---

## Deployment Checklist Summary

### Before Deploying

- [ ] Build passes locally (`npm run build`)
- [ ] Development banner removed (if going live)
- [ ] All forms tested and working
- [ ] Dark mode verified
- [ ] Mobile responsive checked
- [ ] Environment variables configured in Vercel

### After Deploying

- [ ] Production site loads correctly
- [ ] Security headers present (securityheaders.com)
- [ ] Structured data valid (Rich Results Test)
- [ ] Social sharing previews correct
- [ ] Contact forms deliver emails
- [ ] Analytics receiving data

---

## Emergency Contacts

| Role | Contact |
|------|---------|
| Technical | Developer on call |
| Domain/DNS | Domain registrar support |
| Hosting | Vercel support (vercel.com/support) |
| Email | Resend support (resend.com) |

---

## Change Log

| Date | Session | Changes |
|------|---------|---------|
| 25 Jan 2026 | 142 | Initial deployment checklist created |
