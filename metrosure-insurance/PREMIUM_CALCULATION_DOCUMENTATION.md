# Metrosure Premium Calculation Documentation

**Purpose:** Document the mathematical logic behind premium calculations for stakeholder review and refinement.

**Date:** 2 January 2026

---

## Executive Summary

The Metrosure coverage calculators use simplified premium estimation models to give users an indicative quote. These are **not** final premiums—they guide users toward speaking with advisers. This document outlines the current logic and poses questions to refine calculations for production accuracy.

---

## 1. LIFE COVER CALCULATOR

### 1.1 Total Cover Calculation

The calculator determines how much cover a person needs based on four components:

```
TOTAL COVER = Income Replacement + Debt Clearance + Education Fund + Emergency Fund
```

| Component | Formula | Current Value |
|-----------|---------|---------------|
| **Income Replacement** | Annual Income × Years of Support | User inputs |
| **Debt Clearance** | Outstanding Debts | User input (direct) |
| **Education Fund** | Number of Dependents × R250,000 | R250,000 per child |
| **Emergency Fund** | Annual Income × 0.5 | 50% of annual income |

### 1.2 Premium Estimation Formula

```
BASE PREMIUM = Total Cover ÷ 1,000 × R1.00

ADJUSTED PREMIUM = Base Premium × Age Factor × Smoker Factor

PREMIUM RANGE:
  - Low  = Adjusted Premium × (1 - 0.25)  = 75% of adjusted
  - High = Adjusted Premium × (1 + 0.25)  = 125% of adjusted
```

### 1.3 Age Premium Factors

Current age-based multipliers (relative to age 35 = 1.0):

| Age | Factor | Age | Factor |
|-----|--------|-----|--------|
| 20 | 0.50 | 45 | 1.60 |
| 25 | 0.60 | 50 | 2.00 |
| 30 | 0.80 | 55 | 2.50 |
| 35 | 1.00 | 60 | 3.20 |
| 40 | 1.30 | 65 | 4.00 |
|    |      | 70 | 5.00 |

**Interpolation:** Ages between defined points use linear interpolation.
- Example: Age 37 = 1.0 + ((37-35)/(40-35)) × (1.3-1.0) = 1.12

### 1.4 Smoker Loading

| Status | Factor |
|--------|--------|
| Non-smoker | 1.0× |
| Smoker | 1.5× |

### 1.5 Worked Example: Life Cover

**User Profile:**
- Annual Income: R600,000
- Outstanding Debts: R1,500,000 (home + car)
- Dependents: 2 children
- Years of Support: 15
- Age: 42
- Smoker: No

**Step 1: Calculate Total Cover**
```
Income Replacement:  R600,000 × 15        = R9,000,000
Debt Clearance:      R1,500,000           = R1,500,000
Education Fund:      2 × R250,000         = R500,000
Emergency Fund:      R600,000 × 0.5       = R300,000
─────────────────────────────────────────────────────
TOTAL COVER NEEDED:                       = R11,300,000
```

**Step 2: Calculate Base Premium**
```
Base Premium = R11,300,000 ÷ 1,000 × R1.00 = R11,300/month
```

**Step 3: Apply Age Factor**
```
Age 42 (interpolated):
  = 1.3 + ((42-40)/(45-40)) × (1.6-1.3)
  = 1.3 + 0.4 × 0.3
  = 1.42

Adjusted = R11,300 × 1.42 = R16,046/month
```

**Step 4: Apply Smoker Factor**
```
Non-smoker: R16,046 × 1.0 = R16,046/month
```

**Step 5: Apply Variance (±25%)**
```
Premium Low:  R16,046 × 0.75 = R12,035/month
Premium High: R16,046 × 1.25 = R20,058/month
```

**Result displayed to user:**
> "Estimated premium: R12,035 – R20,058/month"

---

## 2. FUNERAL COVER CALCULATOR

### 2.1 Tier Structure

| Tier | Cover Amount | Base Premium | Description |
|------|--------------|--------------|-------------|
| Basic | R15,000 | R99/month | Essential expenses |
| Standard | R30,000 | R199/month | Most popular |
| Premium | R50,000 | R349/month | Comprehensive |

### 2.2 Family Member Multipliers

Each family member type has a cover multiplier applied to the tier amount:

| Member Type | Cover Multiplier | Example (Standard Tier) |
|-------------|------------------|-------------------------|
| Yourself | 1.0× | R30,000 |
| Spouse | 1.0× | R30,000 |
| Children | 0.5× | R15,000 |
| Parents | 0.75× | R22,500 |

### 2.3 Premium Calculation Formula

```
ADDITIONAL MEMBERS = Total Members Selected - 1

MONTHLY PREMIUM = Base Premium + (Additional Members × Base Premium × 0.4)
```

The `0.4` factor means each additional family member adds 40% of the base premium.

### 2.4 Worked Example: Funeral Cover

**User Profile:**
- Tier: Standard (R30,000, R199 base)
- Members: Self + Spouse + 2 Children + 1 Parent

**Step 1: Calculate Total Cover**
```
Self:       R30,000 × 1.0  = R30,000
Spouse:     R30,000 × 1.0  = R30,000
Children:   R30,000 × 0.5  = R15,000 (each) × 2 = R30,000
Parent:     R30,000 × 0.75 = R22,500
─────────────────────────────────────────────────
TOTAL FAMILY COVER:        = R112,500
```

**Step 2: Calculate Premium**
```
Members selected: 5 (Self + Spouse + 2 Children + 1 Parent)
Additional members: 5 - 1 = 4

Premium = R199 + (4 × R199 × 0.4)
        = R199 + R318.40
        = R517.40/month
```

**Result displayed to user:**
> "Monthly premium: R517.40 for R112,500 total family cover"

---

## 3. CURRENT ASSUMPTIONS & LIMITATIONS

### 3.1 Life Cover Assumptions

| Assumption | Current Value | Notes |
|------------|---------------|-------|
| Cost per R1,000 cover | R1.00 | Industry baseline |
| Education fund per child | R250,000 | Fixed amount |
| Emergency fund | 50% of income | Fixed percentage |
| Premium variance | ±25% | To account for health factors |
| Age range | 20-70 | Outside this, clamped |

### 3.2 Funeral Cover Assumptions

| Assumption | Current Value | Notes |
|------------|---------------|-------|
| Additional member loading | 40% | Per extra member |
| Children cover | 50% of adult | Fixed ratio |
| Parents cover | 75% of adult | Fixed ratio |

---

## 4. STAKEHOLDER QUESTIONS

### 4.1 Life Cover Premium Questions

1. **Base Rate Accuracy**
   > The calculator uses R1.00 per R1,000 cover as a baseline. What is Metrosure's actual average rate across product providers? Does this vary by insurer?

2. **Age Factor Validation**
   > Are the age factors (0.5× at 20, 5.0× at 70) aligned with actual underwriting tables from your primary insurers (Old Mutual, Sanlam, etc.)?

3. **Smoker Loading**
   > Is 1.5× for smokers accurate? Some insurers use 2.0× or higher. What loading does Metrosure typically see?

4. **Health Factor Variance**
   > The ±25% variance accounts for health conditions. Should this be wider (e.g., ±40%) to reflect more extreme cases, or is it better to keep it conservative?

5. **Education Fund Amount**
   > R250,000 per child assumes private schooling + tertiary. Should this be:
   > - Tiered by age of child?
   > - Adjustable by user?
   > - Different for different education levels?

6. **Emergency Fund Multiplier**
   > 50% of annual income (6 months' expenses) is industry standard. Is this appropriate for Metrosure's target market?

7. **Income Replacement Period**
   > Currently allows 5-30 years. Should this cap be adjusted? What does the average Metrosure client select?

### 4.2 Funeral Cover Premium Questions

1. **Tier Pricing Accuracy**
   > Are the tier prices (R99/R199/R349) aligned with actual Metrosure funeral products? Which insurer's products do these reflect?

2. **Additional Member Loading**
   > The 40% loading per additional member—is this competitive with market rates? Some products charge less for family add-ons.

3. **Children's Cover Ratio**
   > 50% for children's cover—is this in line with ASISA guidelines and Metrosure's actual products?

4. **Parents' Cover Ratio**
   > 75% for parents—does this reflect actual extended family cover products? Should this be configurable?

5. **Age Banding for Funeral**
   > The funeral calculator doesn't consider age at all. Should it? Funeral premiums often increase with age.

6. **Maximum Family Size**
   > Is there a maximum number of family members that can be covered under one policy?

### 4.3 General Questions

1. **Disclaimer Accuracy**
   > The current disclaimer states "indicative estimates only." Is this sufficient for FSCA compliance, or should specific product limitations be mentioned?

2. **Lead Qualification**
   > Should the calculator capture more information (e.g., existing cover, health conditions) to pre-qualify leads before handoff to advisers?

3. **Comparison with Competitors**
   > Have you compared these estimates with competitor calculators (1Life, Sanlam, Discovery)? Are they in the same ballpark?

4. **Conversion Tracking**
   > What percentage of calculator users request quotes? Should the calculator be adjusted to improve conversion?

---

## 5. RECOMMENDATIONS

### 5.1 Consider Adding

1. **Product-Specific Calculators**
   > Instead of generic life/funeral, calculators for specific products (Discovery Life, Sanlam Sky, etc.) with accurate rates.

2. **Existing Cover Offset**
   > Allow users to input existing cover to show the "gap" they need to fill.

3. **Inflation Adjustment**
   > Education costs and funeral costs increase annually. Consider showing future values.

4. **Income Tax Considerations**
   > Life cover payouts are tax-free in SA, but income replacement calculations could factor in take-home vs. gross salary.

### 5.2 Data Validation

The calculator currently validates:
- Income: R50,000 – R10,000,000
- Debt: R0 – R20,000,000
- Age: 20 – 70
- Years of support: 5 – 30
- Dependents: 0 – 10

**Question:** Are these ranges appropriate for Metrosure's target market?

---

## 6. CODE LOCATIONS

For development reference:

| Component | File | Key Lines |
|-----------|------|-----------|
| Life cover calculation | `src/components/tools/LifeCoverCalculator.tsx` | 59-80 |
| Funeral cover calculation | `src/components/tools/FuneralCoverCalculator.tsx` | 46-75 |
| All constants | `src/data/calculatorData.ts` | 53-170 |
| Age factor interpolation | `src/data/calculatorData.ts` | 401-421 |
| Validation constants | `src/data/calculatorData.ts` | 112-149 |

---

## 7. NEXT STEPS

After stakeholder feedback:

1. **Update Constants** — Adjust multipliers, factors, and base rates based on actual product data
2. **Add Product Selection** — Allow users to select specific insurer products for more accurate quotes
3. **Implement Age Banding for Funeral** — If required by stakeholder
4. **Refine Variance Range** — Based on actual underwriting variance data
5. **Add Existing Cover Input** — Show "gap" calculation

---

## 8. MARKET RESEARCH ADDENDUM

*Research conducted: 2 January 2026*

### 8.1 ASISA 2025 Insurance Gap Study

The authoritative source for SA life insurance benchmarks.

| Metric | Value | Source |
|--------|-------|--------|
| **Total insurance gap** | R50.4 trillion | [ASISA 2025 Study](https://www.asisa.org.za/media-releases/south-africa-s-life-and-disability-insurance-shortfall-widens-to-r504-trillion/) |
| **Average cover needed** | R2.1 million | ASISA |
| **Average cover held** | R800,000 | ASISA |
| **Average shortfall** | R1.3 million per earner | ASISA |
| **Coverage ratio** | 39% of needs covered | ASISA |
| **Formally employed earners** | 16.1 million | Stats SA |
| **Daily deaths (income earners)** | ~440 per day | ASISA |
| **Cost to close gap** | 8.2% of earnings | ASISA |

**Key insight:** The gap widened by 12.5% per annum from R35.4 trillion (Dec 2021) to R50.4 trillion (Dec 2024).

---

### 8.2 Smoker Loading – Industry Benchmarks

Research from multiple sources confirms smoker loadings are typically **higher** than Metrosure's current 1.5×:

| Source | Smoker Loading |
|--------|----------------|
| **SA industry typical** | 1.3× – 2.0× (30-100% increase) |
| **International benchmark** | 1.5× – 2.5× (50-150% increase) |
| **Legal & General (UK study)** | 1.63× at age 30, 2.0×+ at age 50 |
| **US insurers (35-year-old)** | 1.85× – 2.28× |

**Stakeholder question:** Is 1.5× conservative? Consider increasing to **1.75× or 2.0×** for accuracy.

Sources: [1Life](https://www.1life.co.za/blog/premium-increase), [ACKO](https://www.acko.com/life-insurance/glossary/premium-loading/)

---

### 8.3 Funeral Costs in South Africa (2025)

Actual funeral costs are **significantly higher** than calculator tier amounts:

| Expense Category | Typical Cost | Source |
|------------------|--------------|--------|
| **Basic funeral (low-income)** | R3,000 – R10,000 | [Hippo](https://www.hippo.co.za/blog/insurance/average-funeral-costs-in-south-africa/) |
| **Average funeral** | R20,000 – R50,000 | [1Life](https://www.1life.co.za/blog/funeral-expenses) |
| **Traditional with burial** | R20,000 – R40,000 | [Fincheck](https://academy.fincheck.co.za/insights/how-much-does-the-average-funeral-cost-in-sa) |
| **Full service (50 guests)** | R70,000 – R84,000 | [MiWayLife 2025](https://www.miwaylife.co.za/blog/how-much-does-a-funeral-cost-in-2025/) |
| **Premium funeral** | Up to R150,000 | Industry data |

**Detailed Breakdown (OUTsurance 2025):**

| Item | Cost |
|------|------|
| Funeral home fees | R5,000 |
| Coffin/casket | R40,000 |
| Burial plot + fees | R35,000 |
| Tombstone | R5,500 |
| Catering (50 guests) | R20,000 |
| Venue hire | R2,000 |
| Transport | R1,500 – R10,000 |
| Flowers | R2,500 |
| Pamphlets | R2,000 |
| **TOTAL** | **R113,500+** |

**Gauteng Burial Plot Costs:**

| Location | Resident | Non-Resident |
|----------|----------|--------------|
| Joburg municipal | R2,250 | R6,749 |
| West Park/Brixton | ~R4,500 | ~R13,500 |
| Private (Enokuthula) | R14,000+ | — |
| Private (Nasrec) | R34,000+ | — |

Source: [OUTsurance](https://www.outsurance.co.za/life-insurance/funeral-plan/funeral-costs/), [Procompare](https://www.procompare.co.za/prices/funeral-parlours/burial)

**Stakeholder question:** Current tiers (R15k/R30k/R50k) may leave families **underinsured** for traditional funerals. Consider adding a R75,000 or R100,000 tier.

---

### 8.4 AVBOB Funeral Cover Pricing

AVBOB is the market leader. Their pricing model:

| Factor | Details |
|--------|---------|
| **Cover range** | R5,000 – R50,000 |
| **Starting premium** | From R37–R46/month |
| **Age banding** | Yes – older = more expensive |
| **Family pricing** | Spouse cheaper than parents |
| **Waiting period** | 6 months (natural death), immediate (accident) |
| **Bonus** | R15,000 discount if using AVBOB services |

**Key insight:** AVBOB uses **age-based pricing** for funeral cover—Metrosure's calculator currently does not.

Source: [AVBOB](https://www.avbob.co.za/), [Funeral Cover Finder](https://www.funeralcoverfinder.co.za/avbob-funeral-cover/)

---

### 8.5 Competitor Calculator Comparison

How do 1Life, MiWayLife, and Discovery structure their calculators?

| Feature | 1Life | MiWayLife | Discovery | **Metrosure** |
|---------|-------|-----------|-----------|---------------|
| **Shows cover needed** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Shows premium estimate** | ❌ No | ❌ No | ❌ No | ✅ Yes |
| **Age input** | ✅ Year only | ✅ Full DOB | ✅ DOB | ✅ Slider |
| **Income input** | ✅ Yes | ✅ Yes | Via quote | ✅ Yes |
| **Debts input** | ✅ Detailed | ✅ Yes | Via quote | ✅ Yes |
| **Existing cover offset** | ✅ Yes | ❌ No | Via quote | ❌ No |
| **Smoker question** | ❌ Quote only | ❌ Quote only | ❌ Quote only | ✅ Yes |

**Key insight:** Competitors do **not** show premium estimates in their calculators—they require users to get a quote. Metrosure's approach of showing indicative premiums is more transparent but carries more risk of inaccuracy.

**1Life Methodology:**
```
Cover Needed = (Monthly Expenses × Years) + Total Debts - Assets - Existing Cover
```

**MiWayLife Methodology:**
```
Lost Income Cover = Assumes retirement at 65
Liabilities = Home loan + Personal loans + Other
```

Sources: [1Life Calculator](https://www.1life.co.za/tools/calculators/life-insurance), [MiWayLife Calculator](https://www.miwaylife.co.za/tools/life-insurance-calculator/)

---

### 8.6 Recommended Calculation Adjustments

Based on research, consider these refinements:

| Current | Research Finding | Recommendation |
|---------|------------------|----------------|
| **Smoker: 1.5×** | Industry uses 1.5–2.5× | Increase to **1.75× or 2.0×** |
| **No age banding (funeral)** | AVBOB uses age-based pricing | Add age factor for funeral |
| **R50k max funeral** | Average funeral = R70k+ | Add **R75k/R100k tiers** |
| **No existing cover input** | 1Life includes this | Add "gap" calculation |
| **Fixed education R250k** | Consider inflation | Show inflated future value |
| **Base rate R1/R1,000** | Validate with insurers | Confirm or adjust |

---

### 8.7 Premium Rate Benchmarks

Unfortunately, insurers do not publish explicit "cost per R1,000" rates publicly. However:

| Data Point | Value |
|------------|-------|
| **Old Mutual** | R50k–R500k cover available without medicals |
| **Typical SA premium range** | R200–R2,000+/month depending on cover |
| **Industry rule of thumb** | 10-15× annual salary for cover amount |
| **ASISA recommendation** | R2.1 million minimum per income earner |

**Stakeholder action needed:** Request actual rate cards from primary insurers (Discovery, Sanlam, Old Mutual, Momentum) to validate the R1.00/R1,000 baseline.

---

### 8.8 Sources & References

1. [ASISA 2025 Insurance Gap Study](https://www.asisa.org.za/media-releases/south-africa-s-life-and-disability-insurance-shortfall-widens-to-r504-trillion/)
2. [Daily Maverick: Insurance gap analysis](https://www.dailymaverick.co.za/article/2025-11-02-insurance-gap-death-and-disability-cover-insufficient-in-sa/)
3. [Hippo: Average Funeral Costs](https://www.hippo.co.za/blog/insurance/average-funeral-costs-in-south-africa/)
4. [1Life: Funeral Expenses](https://www.1life.co.za/blog/funeral-expenses)
5. [MiWayLife: Funeral Costs 2025](https://www.miwaylife.co.za/blog/how-much-does-a-funeral-cost-in-2025/)
6. [OUTsurance: Funeral Costs](https://www.outsurance.co.za/life-insurance/funeral-plan/funeral-costs/)
7. [AVBOB Funeral Cover](https://www.avbob.co.za/)
8. [1Life Calculator](https://www.1life.co.za/tools/calculators/life-insurance)
9. [MiWayLife Calculator](https://www.miwaylife.co.za/tools/life-insurance-calculator/)
10. [Procompare: Burial Prices 2025](https://www.procompare.co.za/prices/funeral-parlours/burial)

---

*Document prepared for stakeholder review. Responses to questions in Section 4 will inform calculator refinements.*
