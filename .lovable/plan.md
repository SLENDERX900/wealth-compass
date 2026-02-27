
# Restructure Aurora: All Interactivity Inside the iPhone Mockup

## Overview

Every section currently has interactive controls (FilterToggleGroup, Switch, Slider, buttons) living on the **web page**. The iPhone mockup passively mirrors state. This plan flips the architecture: the website becomes editorial context, and the iPhone mockup becomes the sole interactive demo surface.

## Global Changes

### IPhoneMockup Component
- Keep the structural frame (border, notch, home indicator, expand/collapse) unchanged
- Set `expandable={true}` default so users can zoom in for better interaction
- Add `onClick` stopPropagation handling on all interactive elements inside to prevent expand/collapse when tapping controls

### FilterToggleGroup — Compact "Phone" Variant
- Add a `compact` prop that renders at `text-[9px]` with `px-2 py-1` padding and tighter gap
- Used exclusively inside mockups for segmented controls

### General Pattern Per Section
- **Page side**: `SectionLabel` + `GradientHeadline` + 2-3 sentences of editorial copy + optionally 1-2 read-only stat cards or a summary visualization
- **Phone side**: ALL toggles, sliders, filters, switches, dropdowns, and interactive data live inside the `IPhoneMockup` children

---

## Section-by-Section Changes

### 1. Hero Section
**Page (left column):**
- Keep: SectionLabel, GradientHeadline, subtitle paragraph
- Remove: Both FilterToggleGroups (Light/Dark, Detailed/Compact)

**Phone (right column):**
- Add iOS-style segmented control at top for Light/Dark theme toggle
- Add a segmented control for Detailed/Compact view toggle
- Keep: Portfolio value, ESG ring, holdings list, bottom tab bar
- Enrich: Add a mini sparkline chart (simple SVG path) above portfolio value showing 7-day trend
- Use color: Emerald accent on positive numbers, warm amber on the ESG ring, gradient bottom tab bar active indicator

### 2. Impact Section
**Page:**
- Keep: SectionLabel, GradientHeadline, subtitle
- Remove: All three FilterToggleGroups (Personal/Community/Global, time range, format) and the three GradientBorderCard metric tiles
- Add: 2-3 read-only editorial stat cards (e.g., "12.4 tonnes CO2 saved this year", "87% clean energy") as simple text blocks

**Phone:**
- Move Personal/Community/Global as a segmented control inside phone
- Move time range (This Month / This Year / All Time) as a segmented control
- Move format toggle (Numbers / Equivalents) as a small pill toggle
- Display the three metrics as rich cards inside the phone with icons (leaf for CO2, lightning for energy, droplet for water) using emerald/cyan/blue colors
- Animated counters triggered on toggle change

### 3. Society (Singapore Map)
**Page:**
- Keep: SectionLabel, GradientHeadline, subtitle
- Remove: All FilterToggleGroups (category, Map/List, status filter) and the entire map/list visualization
- Add: 2-3 highlighted project cards as editorial content (e.g., "Marina Solar Farm — $12.4M funded, powers 2,400 homes")

**Phone:**
- Replace the abstract SVG blob with a more recognizable Singapore outline SVG with labeled regions (Marina Bay, Tuas, Punggol, Sentosa, Semakau, Jurong) as text labels positioned near the dots
- Move category filter chips (Clean Energy, Water, Green Buildings, Marine Conservation) inside the phone as compact horizontal scrollable chips
- Move Map/List toggle as a segmented control inside phone
- Move status filter inside phone
- Tapping a dot slides up a project detail card inside the phone with gradient left-border accent
- Use colored dots: green for Clean Energy, blue for Water, amber for Green Buildings, cyan for Marine Conservation

### 4. Carbon Tax
**Page:**
- Keep: SectionLabel, GradientHeadline, subtitle
- Remove: FilterToggleGroups (scenario, profile), MAS button, Slider, timeline, stat cards
- Add: 3 read-only editorial stat cards showing current trajectory headline numbers

**Phone:**
- Full carbon tax calculator inside the phone
- Scenario segmented control (Current / Optimistic / Aggressive)
- Profile segmented control (Your Portfolio / Average / Benchmark)
- Year slider with milestone labels
- Three stat readouts (Tax, Impact, Cost) as colored cards
- MAS Guidelines toggle as a small button that expands a list inside the phone
- Timeline visualization as a horizontal gradient bar with year markers

### 5. Portfolio
**Page:**
- Keep: SectionLabel, GradientHeadline
- Remove: Provider toggle buttons, all FilterToggleGroups, ESG badge toggle, the pie chart, and holdings list
- Add: Editorial paragraph about aggregation + a large simplified total portfolio value display

**Phone:**
- Provider tab bar at top (compact, scrollable)
- Grouping segmented control (By Provider / Asset Class / ESG Rating)
- Mini pie chart rendered inside phone using Recharts with `ResponsiveContainer` at ~100px height
- Scrollable holdings list below with ESG badge dots
- Sort toggle and ESG badge toggle as compact controls
- Use rich colors on pie chart segments

### 6. ESG / Greenwashing
**Page:**
- Keep: SectionLabel, GradientHeadline
- Remove: Company dropdown, FilterToggleGroups, layer toggles, Risk/Industry buttons, the entire BarViz card
- Add: Editorial paragraph about greenwashing methodology + one read-only highlight (e.g., "Average divergence gap: 21 points")

**Phone:**
- Company picker as a dropdown/select inside phone
- Layer chips (Claimed / Verified / Projected) as toggleable pills
- Animated bar visualizations inside phone with color: green for claimed, gold for verified, blue for projected, gray ghost for industry avg
- Risk badge prominently colored (red/amber/green)
- Simple/Detailed toggle as segmented control
- Risk overlay and Industry Average as toggle chips
- Divergence gap callout card

### 7. Personas
**Page:**
- Keep: SectionLabel, GradientHeadline, persona card grid (these ARE the page-level selection mechanism), experience level toggle
- These stay on the page because selecting a persona is about choosing "who you are" -- it's editorial context

**Phone:**
- Keep: Onboarding flow with swipeable value cards, ESG Identity Card
- Enhance: Make the onboarding cards more visually rich with colored icons per value (green leaf for Climate, purple people for Diversity, blue shield for Governance, blue droplet for Water, red heart for Human Rights)
- Add experience level indicator inside phone reflecting page-level selection

### 8. Preferences (Biggest Change)
**Page:**
- Keep: SectionLabel, GradientHeadline, subtitle
- Remove: ALL toggle rows, ALL sliders, philosophy selector, excluded holdings list from the page
- Keep: Large read-only ESG Score Ring + Compatibility/Qualifying stats as a summary panel

**Phone:**
- Full settings screen with ALL controls:
  - ESG Score Ring at top (smaller, ~56px)
  - iOS-style toggle rows for Fossil Fuel, Weapons, Tobacco, Animal Testing, Shariah
  - Compact sliders for Gender Diversity, Carbon Cap, Strictness
  - Philosophy segmented control (Impact-First / Balanced / Returns-First)
  - Compatibility % and qualifying count at bottom
- All changes update the page-level read-only ESG Score Ring in real time (state stays in section component)

### 9. Scenarios (Major Upgrade)
**Page:**
- Keep: SectionLabel, GradientHeadline
- Remove: All FilterToggleGroups, pathway buttons, risk/opportunity/carbon buttons, slider, the large chart
- Add: Editorial paragraph about climate scenario analysis + a large read-only area chart (keep the existing Recharts chart but make it non-interactive / display-only, driven by phone controls)

**Phone:**
- Render a REAL mini Recharts AreaChart inside phone using `ResponsiveContainer` with ~120px fixed height
- Pathway toggle chips (1.5C / 2C / 3C) as colored pills inside phone
- Outlook segmented control (Optimistic / Base Case / Pessimistic)
- Compact time horizon slider inside phone
- Projected portfolio values displayed below chart as colored stat cards
- Risk/Opportunity/Carbon Tax toggles as compact chips
- Nominal/Inflation toggle
- The page-level chart updates reactively from phone state

### 10. Nudges
**Page:**
- Keep: SectionLabel, GradientHeadline
- Remove: FilterToggleGroups (category, urgency), Switch toggles (gradual shift, cost), the entire nudge card stack
- Add: Editorial paragraph about behavioral finance approach + 1 read-only example nudge as an illustrative card

**Phone:**
- Category filter chips at top (Regulatory, Performance, ESG Downgrade, Opportunity)
- Urgency segmented control (All / Important / Critical)
- Gradual Shift toggle as iOS switch
- Cost of Inaction toggle as iOS switch
- Notification card stack inside phone with colored left borders
- Each card has "Why?", "Dismiss", "Act", "Snooze" actions
- Dismissed cards animate out

### 11. Advisor
**Page:**
- Keep: SectionLabel, GradientHeadline
- Remove: FilterToggleGroups (advisor names, tone), credentials button, entire chat card with demo messages
- Add: Editorial paragraph about advisor model + a simple advisor highlight card (read-only)

**Phone:**
- Advisor picker as a horizontal scrollable avatar row at top
- Chat/Video/Schedule segmented control
- Tone toggle (Formal / Casual) as a small switch
- Credentials expandable section
- Full chat interface with message bubbles and quick-reply options
- "Request Portfolio Review" button at bottom with gradient styling

### 12. Rewards (Clear Tier-to-Service Mapping)
**Page:**
- Keep: SectionLabel, GradientHeadline
- Remove: FilterToggleGroups (view, category), point breakdown button, impact score slider, entire tier card grid
- Add: Editorial paragraph about reward philosophy + a simple read-only current tier badge

**Phone — completely redesigned for clarity:**
- Current tier badge at top with gradient accent and icon
- Progress bar to next tier with points label ("42/60 to Impact Leader")
- Impact score slider inside phone to simulate progression
- Expandable tier cards with CLEAR mapping:
  - **Green Explorer (30+ pts)** with green accent:
    - Priority dining reservations (utensils icon)
    - Eco-workshop access (leaf icon)
    - Free ESG portfolio review (chart icon)
  - **Impact Leader (60+ pts)** with gold accent:
    - VIP sustainability summits (star icon)
    - Dedicated relationship manager (user icon)
    - Social club membership (building icon)
  - **Legacy Architect (85+ pts)** with premium gold gradient:
    - Personal concierge service (concierge bell icon)
    - Private wealth manager (briefcase icon)
    - Family office advisory (shield icon)
    - Global restaurant network (globe icon)
- Each perk has an icon + name + one-line description
- Category filter chips (Dining / Experiences / Financial Services) inside phone
- Locked tiers shown dimmed with lock icon; unlocking triggers shimmer animation

### 13. Compliance
**Page:**
- Keep: SectionLabel, GradientHeadline
- Remove: FilterToggleGroups (view mode), audit/disclosure buttons, entire checklist card, privacy controls, audit trail, disclosures
- Add: Editorial paragraph about MAS compliance + 1-2 read-only trust indicators

**Phone:**
- Suitability score gauge at top (92%) with gradient arc
- View mode segmented control (Simplified / Full Legal)
- MAS checklist with animated checkmarks
- Privacy toggle rows (Share with Advisor, Analytics, Third-Party)
- Audit Trail toggle that expands timeline inside phone
- Conflict Disclosures expandable section

### 14. Closing
**Page:**
- Keep: SectionLabel, large gradient headline, subtitle, gradient divider line, BNP branding, Replay Journey button
- Remove: FilterToggleGroups (auto-play, info tabs, language) and the info card
- Keep the language toggle on the page (it affects the BNP branding text)

**Phone:**
- App Store preview with Aurora icon, rating, and screenshot carousel
- Auto-play/Manual toggle inside phone
- Info tabs (Key Features / Reviews / Specs) as segmented control inside phone
- Screenshot carousel with dot indicators
- All info content rendered inside phone

---

## Technical Approach

### State Management
- All state remains in the section component (e.g., `HeroSection` owns `appTheme`, `viewMode`)
- State setters are called from within the phone's JSX via `onClick` with `e.stopPropagation()` to prevent mockup expand/collapse
- The page-level read-only displays consume the same state

### Compact Controls Inside Phone
- `FilterToggleGroup` gets a `compact` prop: `text-[9px] px-2 py-1 gap-1`
- `Switch` used directly at a smaller scale with Tailwind size overrides
- `Slider` used with custom smaller styling
- All interactive elements inside phone get `onClick={(e) => e.stopPropagation()}` wrapper

### Recharts Inside Phone
- For Scenarios: `<ResponsiveContainer width="100%" height={120}>` inside phone div
- For Portfolio: `<ResponsiveContainer width="100%" height={100}>` for mini pie
- Reduce font sizes on axes: `tick={{ fontSize: 8 }}`
- Minimal axis labels, no legends (use colored chips above chart instead)

### Singapore Map
- Replace the abstract `<svg viewBox="0 0 100 100"><path d="M20,40 Q30,30..."/>` with a more detailed SVG path that shows the actual island shape with recognizable peninsulas
- Add `<text>` elements at key coordinates for region labels (Marina Bay, Jurong, Tuas, Punggol, Sentosa, Semakau)
- Colored dots positioned at actual geographic locations with larger click targets inside phone
- On tap, a detail card slides up from bottom inside phone

### No New Dependencies
- All implementation uses existing: React, framer-motion, recharts, radix-ui, lucide-react, tailwind

---

## Files to Modify (14 sections + 1 component)

1. `src/components/aurora/FilterToggleGroup.tsx` — add `compact` prop
2. `src/sections/HeroSection.tsx` — move controls into phone
3. `src/sections/ImpactSection.tsx` — move controls into phone
4. `src/sections/SocietySection.tsx` — move controls into phone + better map
5. `src/sections/CarbonTaxSection.tsx` — move controls into phone
6. `src/sections/PortfolioSection.tsx` — move controls into phone + mini pie
7. `src/sections/ESGSection.tsx` — move controls into phone
8. `src/sections/PersonasSection.tsx` — enhance phone onboarding
9. `src/sections/PreferencesSection.tsx` — major: all controls into phone
10. `src/sections/ScenariosSection.tsx` — major: mini chart in phone
11. `src/sections/NudgesSection.tsx` — move controls into phone
12. `src/sections/AdvisorSection.tsx` — move controls into phone
13. `src/sections/RewardsSection.tsx` — major: redesign with clear tier mapping
14. `src/sections/ComplianceSection.tsx` — move controls into phone
15. `src/sections/ClosingSection.tsx` — move controls into phone
