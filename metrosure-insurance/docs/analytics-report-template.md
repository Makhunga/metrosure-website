# Metrosure Analytics Report Template

A guide for exporting and analysing website analytics data from Vercel.

---

## Exporting Data from Vercel

### Step 1: Access Analytics Dashboard
1. Log in to [Vercel Dashboard](https://vercel.com)
2. Select the **metrosure-website** project
3. Click **Analytics** in the left sidebar

### Step 2: Export CSV
1. Select your desired date range (top right)
2. Click the **Export** button (download icon)
3. Choose **CSV** format
4. File downloads automatically

---

## Google Sheets Template Structure

Create a new Google Sheet with the following tabs:

### Tab 1: Dashboard (Summary)

| Metric | This Month | Last Month | Change |
|--------|------------|------------|--------|
| Total Page Views | `=SUM('Raw Data'!C:C)` | - | - |
| Unique Visitors | `=COUNTUNIQUE('Raw Data'!B:B)` | - | - |
| Form Submissions | `=COUNTIF('Events'!A:A,"*_submitted")` | - | - |
| Quote Requests | `=COUNTIF('Events'!A:A,"quote_submitted")` | - | - |
| Calculator Shares | `=COUNTIF('Events'!A:A,"calculator_*")` | - | - |

**Key Performance Indicators:**
- **Conversion Rate:** `=(Quote Requests / Unique Visitors) * 100`
- **Engagement Rate:** `=(Form Submissions / Page Views) * 100`

### Tab 2: Traffic Sources

| Source | Visits | % of Total |
|--------|--------|------------|
| Direct | - | `=B2/SUM(B:B)*100` |
| Google | - | - |
| Facebook | - | - |
| WhatsApp | - | - |
| LinkedIn | - | - |
| Other | - | - |

**Visualisation:** Pie chart showing referrer distribution

### Tab 3: Top Pages

| Page | Views | Avg Time | Bounce Rate |
|------|-------|----------|-------------|
| / (Homepage) | - | - | - |
| /quote | - | - | - |
| /insurance/life | - | - | - |
| /insurance/funeral | - | - | - |
| /contact | - | - | - |
| /partners | - | - | - |
| /corporate | - | - | - |
| /careers | - | - | - |

**Conditional Formatting:**
- Green: Top 3 pages by views
- Yellow: Pages with high bounce rate (>60%)

### Tab 4: Form Submissions (Custom Events)

| Event | Count | Conversion Rate |
|-------|-------|-----------------|
| `quote_submitted` | - | `=B2/TotalVisitors*100` |
| `contact_submitted` | - | - |
| `partner_inquiry_submitted` | - | - |
| `corporate_inquiry_submitted` | - | - |
| `career_application_submitted` | - | - |
| `calculator_results_shared` | - | - |

**Filter by source:**
- Quote by customer type (individual/business)
- Contact by form type (message/callback)
- Calculator by method (email/whatsapp)

### Tab 5: Geographic Distribution

| Province | Visitors | % of Total |
|----------|----------|------------|
| Gauteng | - | - |
| KwaZulu-Natal | - | - |
| Western Cape | - | - |
| Eastern Cape | - | - |
| Other | - | - |

**Use for:** Regional marketing targeting, branch performance

### Tab 6: Monthly Trends

| Month | Page Views | Visitors | Conversions | Conv. Rate |
|-------|------------|----------|-------------|------------|
| Jan 2026 | - | - | - | - |
| Feb 2026 | - | - | - | - |
| Mar 2026 | - | - | - | - |

**Charts:**
- Line chart: Traffic over time
- Bar chart: Conversions by month

---

## Event Tracking Reference

### Form Submission Events

| Event Name | Properties | Trigger |
|------------|------------|---------|
| `quote_submitted` | `customerType`, `coverageType` | Quote form submitted |
| `contact_submitted` | `formType`, `topic` or `reason` | Contact form submitted |
| `partner_inquiry_submitted` | `businessType`, `servicesCount` | Partner form submitted |
| `corporate_inquiry_submitted` | `industry`, `employeeCount` | Corporate form submitted |
| `career_application_submitted` | `position`, `experience` | Job application submitted |
| `calculator_results_shared` | `method`, `calculatorType` | Calculator results shared |

### Property Values

**customerType:** `individual`, `business`, `unknown`
**coverageType:** `life`, `funeral`, `auto`, `home`, etc.
**formType:** `message`, `callback`
**method:** `email`, `whatsapp`
**calculatorType:** `life`, `funeral`

---

## Useful Formulas

### Conversion Rate
```
=COUNTIF(Events!A:A,"quote_submitted") / COUNTUNIQUE(RawData!B:B) * 100
```

### Month-over-Month Growth
```
=(ThisMonth - LastMonth) / LastMonth * 100
```

### Average Per Day
```
=SUM(Range) / DAYS(EndDate, StartDate)
```

### Conditional Formatting Rules

**Positive change (green):**
```
Custom formula: =C2>0
Background: #D4EDDA
```

**Negative change (red):**
```
Custom formula: =C2<0
Background: #F8D7DA
```

---

## Reporting Schedule

| Report | Frequency | Recipients | Due |
|--------|-----------|------------|-----|
| Weekly Summary | Weekly | Marketing | Monday AM |
| Monthly Report | Monthly | Leadership | 5th of month |
| Quarterly Review | Quarterly | Board | Q+10 days |

---

## Notes

- Vercel Analytics is cookie-free (no consent required)
- Data updates in real-time
- Historical data retained for duration of plan
- Custom events require `track()` function in code
- For advanced analysis, consider Vercel Drains to BigQuery

---

*Last updated: 4 January 2026 (Session 84)*
