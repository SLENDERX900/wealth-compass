

# Aurora — NextGen Sustainable Wealth
### Immersive Showcase Website · BNP Paribas Singapore Competition

A scroll-driven, cinematic presentation website showcasing the Aurora sustainable wealth management app. **Elegant, institutional-grade** design with Anthropic-inspired aesthetics. **Gradient color transitions** flow throughout — section backgrounds shift between cool cyan and warm gold tones, headlines shimmer with animated gradient fills, and accent elements use smooth color interpolation. **Every section is maximally interactive** — toggleable iPhone mockups, live data controls, real-time preference sliders, and hands-on demos that let the viewer *experience* Aurora, not just read about it.

---

## Design System

- **Font**: Helvetica 1443 (fallback: Helvetica Neue → system sans-serif) via @font-face. Headlines: weight 300-400, generous letter-spacing. Body: weight 400, 16-18px, line-height 1.6-1.7
- **Gradient Palette**:
  - Hero gradient: `linear-gradient(135deg, #99FFD6 0%, #FDDC5C 50%, #F4CA3E 100%)` — headline text fills, progress bar
  - Cyan wash: `rgba(153,255,214,0.06)` vertical gradient — impact/environment sections
  - Gold wash: `rgba(253,220,92,0.06)` vertical gradient — financial/rewards sections
  - Border gradients: `linear-gradient(90deg, #99FFD6, #FDDC5C)` on cards and dividers
  - Scroll-linked ambient gradient shift across the full page (cool top → warm middle → blended close)
- **Solid Colors**: White `#FFFFFF`, off-white `#FAFAF8`, charcoal `#1A1A1A`, secondary `#8A8A86`
- **Shadows**: Soft, diffused, color-tinted to match section theme
- **No backend** — all demo/mock data, purely frontend
- **Fully responsive** — desktop-first with mobile adaptation

---

## Animation & Motion System

- **Scroll reveals**: 20-30px fade-up, 600-800ms, cubic-bezier(0.16, 1, 0.3, 1), 100-150ms stagger between children
- **Scroll progress**: 2px gradient bar (cyan→gold) at viewport top
- **Gradient headlines**: `background-clip: text` with slowly rotating gradient angle (8s infinite loop)
- **iPhone mockups**: Subtle gradient glow shadow behind each, idle shadow pulse (4s), hover lifts 2px, toggle expands to 1.15x with frosted gradient backdrop (400ms ease)
- **Cards**: Gradient border via pseudo-element, slow rotation on hover, 2-3px lift
- **Buttons**: Gradient background shifts stops on hover (150ms), press feedback
- **Charts**: Lines draw left-to-right (1.2s), area fills gradient top-to-transparent, bars stagger upward (80ms each)
- **Score rings**: Conic gradient fill, stroke-dashoffset 1s ease-out
- **Counters**: RAF count-up with ease-out over 1.5s, tabular-nums, triggered once on scroll entry
- **Section dividers**: 40px gradient fade bands instead of hard lines
- **Tier cards**: Diagonal gold light sweep (1.5s, once) on scroll entry

---

## Section 1 — Hero & Opening
Full-viewport hero with radial gradient glow (cyan 8% opacity) behind headline. Monospaced label: `AURORA · SUSTAINABLE WEALTH`. Headline: **"Simple. Powerful. Personalized."** — "Personalized" with animated gradient text fill. Subtitle in secondary gray. iPhone mockup right-of-center with gradient shadow.

**iPhone Mockup (toggleable)**: Home dashboard with portfolio summary, animated ESG score ring (conic gradient), quick-action buttons.

**Live Interactions**:
- Toggle between **Light / Dark** app theme inside the mockup — the phone's UI switches color scheme in real time
- Toggle **"Compact View" / "Detailed View"** of the dashboard layout inside the phone
- Tap quick-action buttons to see animated screen transitions within the mockup

---

## Section 2 — Impact Dashboard
Cyan wash background gradient. Label: `IMPACT`. Headline: **"Your Impact, Quantified"** — "Quantified" with gradient underline. Three metric tiles with gradient top-border accents and animated counters.

**iPhone Mockup (toggleable)**: Impact metrics — CO₂ saved (12.4t), clean energy (87%), water (340kL).

**Live Interactions**:
- Toggle between **"Personal Impact" / "Community Impact" / "Global Comparison"** tabs — each switches the counter values and equivalents with smooth crossfade
- Toggle **"Absolute Numbers" / "Real-World Equivalents"** — switches between "12.4 tonnes CO₂" and "680 trees planted" with animated counter transition
- Toggle **time range**: "This Month" / "This Year" / "All Time" — counters re-animate to new values

---

## Section 3 — Impact to Society & Environment
Background transitions from cyan wash to neutral. Label: `SOCIETY`. Headline: **"Your Money. Real Change."** — "Real Change" in gradient text. Minimal Singapore map with cyan gradient hotspot dots.

**iPhone Mockup (toggleable)**: Singapore map with tappable project hotspots.

**Live Interactions**:
- Toggle map **filter categories**: "Clean Energy" / "Water" / "Green Buildings" / "Marine Conservation" — dots filter in/out with fade animation
- Toggle **"Map View" / "List View"** of funded projects
- Click individual hotspots on the page-level map (not just inside the phone) — each reveals a project info card with gradient left-border accent, sliding up smoothly
- Toggle **"Funded" / "In Progress" / "Completed"** project status filter

---

## Section 4 — Why Singapore Needs This
Background shifts toward warm gold wash. Label: `CONTEXT`. Headline: **"The Rules Are Changing"**. Carbon tax timeline with gradient connecting line (cyan→gold).

**iPhone Mockup (toggleable)**: Carbon Tax Calculator with interactive slider.

**Live Interactions**:
- **Draggable carbon tax timeline slider** on the page itself — drag between 2024-2035, watch tax amount, portfolio impact %, and projected cost animate in real time
- Toggle **"Your Portfolio" / "Average Singaporean" / "Industry Benchmark"** to compare impact across profiles
- Toggle **"Optimistic Regulation" / "Current Trajectory" / "Aggressive Regulation"** scenario — timeline milestones and values shift with animated transitions
- Toggle **"Show MAS Guidelines" overlay** — bullet points fade in alongside the timeline

---

## Section 5 — Portfolio Aggregation
Label: `PORTFOLIO`. Headline: **"All Your Wealth. One View."** — "One View" with gradient underline. Provider logos, Recharts donut with gradient segment fills.

**iPhone Mockup (toggleable)**: Tabbed portfolio view with provider tabs.

**Live Interactions**:
- **Toggle providers on/off**: Clickable provider logos (Syfe, StashAway, DBS Vickers, Tiger Brokers) — each toggles that provider's holdings in/out of the donut chart, chart animates segment redistribution in real time
- Toggle **"By Provider" / "By Asset Class" / "By ESG Rating"** chart grouping — donut re-renders with different segment colors and labels
- Toggle **"Financial Return" / "ESG Score" / "Risk Level"** sort order on the holdings list
- Toggle **"Show ESG Badges"** on/off — green/amber/red dots appear/disappear next to each holding with fade animation
- Hover donut segments to see animated tooltip with holding details

---

## Section 6 — ESG Scoring & Greenwashing Detection
Label: `TRANSPARENCY`. Headline: **"See Through the Noise"** with gradient text. Divergence Gap visualization with gradient-filled bars.

**iPhone Mockup (toggleable)**: Company ESG detail screen with animated bars.

**Live Interactions**:
- **Company selector dropdown** on the page — choose between 5-6 demo companies (e.g., "GreenTech Corp", "PetroGlobal", "CleanWater Inc") — the Divergence Gap bars, risk badge, and analysis text all update with smooth animated transitions
- Toggle **"Claimed" / "Verified" / "Projected"** score layers — show/hide each bar independently to see the gaps
- Toggle **"Simple View" / "Detailed Analysis"** — simple shows just the gap, detailed reveals the three-layer breakdown with expandable sections
- Toggle **"Greenwashing Risk Overlay"** — a color-coded heat overlay fades onto the bars highlighting risk zones
- Toggle **"Industry Average Comparison"** — a ghost bar fades in showing industry benchmark alongside company scores

---

## Section 7 — Who Is This For? (Center Position)
Background: neutral white with gradient card accents. Label: `FOR YOU`. Headline: **"Built For You"** with gradient text. Three persona cards with gradient top-edge accents.

**iPhone Mockup (toggleable)**: Onboarding flow with ESG Identity Card.

**Live Interactions**:
- **Click to select a persona** (Tech Professional / Family-Office Heir / Conscious Entrepreneur) — the entire section adapts: the phone mockup switches to that persona's tailored dashboard, the pain points and solutions text morphs with crossfade, and the gradient accent color subtly shifts
- Toggle **"Pain Points" / "Aurora Solution"** on each card — text swaps with smooth fade
- **Interactive onboarding inside the mockup**: swipe/click through value preference cards (climate, diversity, governance, water, human rights) — each choice updates the ESG Identity Card in real time
- Toggle **"Beginner" / "Intermediate" / "Expert"** experience level — adjusts the complexity of displayed data and terminology

---

## Section 8 — Real-Time Preference Setting
Cyan wash background. Label: `PREFERENCES`. Headline: **"Your Values. Your Rules."** — "Your Rules" in gradient text.

**iPhone Mockup (toggleable)**: Settings screen with live ESG score.

**Live Interactions — THIS IS THE MOST INTERACTIVE SECTION**:
- **All controls are live on the page itself (not just in the mockup)**:
  - Toggle **Fossil Fuel Exclusion**: ON/OFF switch — portfolio score updates instantly
  - Toggle **Weapons & Defense Exclusion**: ON/OFF switch
  - Toggle **Tobacco Exclusion**: ON/OFF switch
  - Toggle **Animal Testing Exclusion**: ON/OFF switch
  - Slider: **Gender Diversity Threshold** (0-100%) — score ring animates as you drag
  - Slider: **Carbon Intensity Cap** (low/medium/high) — score updates
  - Slider: **ESG Strictness Level** (1-10) — the higher, the fewer holdings qualify; a "qualifying holdings" counter updates in real time
  - Toggle **"Shariah Compliant"**: ON/OFF — additional filter applied
  - Toggle **"Impact-First" / "Returns-First" / "Balanced"** investment philosophy radio buttons — changes the weighting formula, score recalculates
- A **live ESG Score Ring** on the page updates in real time with every toggle/slider change — the conic gradient fill smoothly re-animates
- A **live "Portfolio Compatibility" indicator** shows what % of your current holdings pass the filter — animates as settings change
- A **"Holdings Affected" list** below shows which mock holdings would be excluded, fading in/out as toggles change
- The iPhone mockup mirrors all page-level control changes in real time

---

## Section 9 — Scenario Analysis
Label: `PROJECTIONS`. Headline: **"See Your Future"** with gradient underline. Recharts area chart with gradient fills.

**iPhone Mockup (toggleable)**: Dual projection curves with time slider.

**Live Interactions**:
- **Draggable time horizon slider** on the page (5 / 10 / 15 / 20 / 25 / 30 years) — chart X-axis extends/contracts, projections recalculate with interpolated animation
- Toggle **scenario pathways**: "1.5°C" / "2°C" / "3°C" — each toggleable independently, showing/hiding that projection line with draw animation
- Toggle **"Optimistic" / "Base Case" / "Pessimistic"** outlook within each pathway
- Toggle **"Show Stranded Asset Risk"** — a red-tinted overlay zone appears on the chart highlighting risk periods
- Toggle **"Show Transition Opportunities"** — green-tinted zones appear showing opportunity windows
- Toggle **"Include Carbon Tax Impact"** — projections shift based on Section 4's carbon tax trajectory
- Toggle **"Nominal" / "Inflation-Adjusted"** values — all numbers and chart values recalculate

---

## Section 10 — Behavioral Nudges
Label: `GUIDANCE`. Headline: **"Smart Nudges. Your Pace."** with cyan gradient pill. Nudge cards with gradient left-border accents.

**iPhone Mockup (toggleable)**: Notification-style nudge cards.

**Live Interactions**:
- Toggle **nudge categories**: "Regulatory" / "Performance" / "ESG Downgrade" / "Opportunity" — filter which nudge cards are visible
- Toggle **"Gradual Shift Mode"**: ON/OFF — when ON, nudge language softens from "Rebalance now" to "Consider adjusting over the next quarter", all card text morphs with crossfade
- Toggle **"Show Cost of Inaction"**: ON/OFF — a projected cost number appears on each nudge card with count-up animation
- Toggle **"Why am I seeing this?"** on each nudge card — expandable explanation section with smooth height animation
- Toggle **notification urgency level**: "All" / "Important Only" / "Critical Only" — cards filter with staggered fade in/out
- Click **"Dismiss" / "Act" / "Snooze"** on each card — card animates away (slide out, or collapses with scale-down)

---

## Section 11 — Advisor Connection
Gold wash background. Label: `ADVISORY`. Headline: **"Your Advisor. Always Close."** — "Always Close" with gradient underline. Advisor profile card with rotating gradient border on hover.

**iPhone Mockup (toggleable)**: Chat interface with advisor profile.

**Live Interactions**:
- Toggle between **multiple advisor profiles** (2-3 demo advisors with different specialties) — card content, chat messages, and credentials morph with crossfade
- Toggle **"Chat" / "Video Call" / "Schedule Meeting"** tabs in the mockup — each shows a different interface view
- Toggle **"Show Credentials"**: ON/OFF — credentials section expands/collapses with smooth height animation
- **Live demo chat**: Click pre-scripted message options to see animated chat bubbles appear with staggered timing (simulating a real conversation flow)
- Toggle **"Formal" / "Casual"** communication style — the demo chat messages rephrase with crossfade

---

## Section 12 — Rewards & Unlock System
Label: `REWARDS`. Headline: **"Grow Your Impact. Unlock Rewards."** with gradient text. Three tier cards with progressive gradient intensity and diagonal light sweep.

**iPhone Mockup (toggleable)**: Rewards dashboard with progress bar.

**Live Interactions**:
- **Interactive tier progress slider** on the page — drag to simulate different impact scores and watch tier cards unlock/lock with animations (locked cards are desaturated with a subtle lock icon, unlocking triggers the gold shimmer sweep + full color restoration)
- Toggle **"Current Perks" / "Next Tier Preview"** — shows what you have vs what you're working toward
- Toggle individual **reward categories**: "Dining" / "Experiences" / "Financial Services" — filters visible perks within each tier
- Click each tier card to **expand full perk details** — card expands with smooth height animation showing venue imagery, descriptions, and terms
- Toggle **"Show Point Breakdown"** — reveals how points are earned (investments, referrals, ESG improvements) with an animated pie chart

---

## Section 13 — Compliance & Trust
Clean white background. Label: `TRUST`. Headline: **"Built for Trust"** with subtle gradient border frame. Audit timeline, compliance checklist, privacy controls.

**iPhone Mockup (toggleable)**: Compliance dashboard with suitability gauge and audit trail.

**Live Interactions**:
- Toggle **"Simplified" / "Full Legal"** compliance view — switches between plain English explanations and formal regulatory language with crossfade
- Toggle **privacy controls** (live on the page): "Share with Advisor" / "Anonymous Analytics" / "Third-Party Data" — each is an ON/OFF switch with smooth state transition
- Toggle **"Show Audit Trail"**: ON/OFF — audit timeline section expands with staggered entry animations for each event
- Toggle **"Conflict of Interest Disclosures"**: ON/OFF — disclosure section expands with smooth height animation
- Toggle **"MAS Compliance Checklist"**: items check/uncheck to show which requirements Aurora satisfies, with animated checkmarks

---

## Section 14 — Closing & Call to Action
Full-viewport cinematic close. Aurora logo with radial gradient glow (blended cyan+gold at 10%). **"The Future of Sustainable Wealth."** with gradient text fill. Full-width gradient rule beneath. BNP Paribas branding.

**iPhone Mockup (toggleable)**: App Store preview with auto-advancing carousel.

**Live Interactions**:
- **Manual carousel control**: Click/swipe through app screenshots (one from each previous section), or toggle **"Auto-play" / "Manual"** mode
- Toggle **"Key Features" / "User Reviews" / "Technical Specs"** tabs beneath the app preview
- Toggle **"English" / "中文" / "Bahasa Melayu"** language preview — app screenshots and text swap to show localization
- A **"Replay Journey"** button that smooth-scrolls back to the top with a cinematic fade transition

---

## Interactive Summary — Total Toggleable Features

| Section | Toggle/Interactive Count |
|---------|------------------------|
| 1. Hero | 3 (theme, view density, quick actions) |
| 2. Impact | 3 (tabs, format, time range) |
| 3. Society | 4 (category filter, view mode, hotspots, status filter) |
| 4. Carbon Tax | 4 (timeline slider, profile comparison, scenario, MAS overlay) |
| 5. Portfolio | 5 (provider toggles, chart grouping, sort order, ESG badges, hover) |
| 6. ESG/Greenwashing | 5 (company selector, layer toggles, view mode, risk overlay, industry comparison) |
| 7. Personas | 4 (persona selection, pain/solution toggle, onboarding interaction, experience level) |
| 8. Preferences | 12+ (6 toggles, 3 sliders, philosophy selector, score ring, compatibility, affected list) |
| 9. Scenarios | 7 (time slider, 3 pathway toggles, outlook, risk/opportunity overlays, carbon tax, nominal/real) |
| 10. Nudges | 6 (category filter, gradual shift, cost of inaction, explainers, urgency filter, card actions) |
| 11. Advisor | 5 (advisor profiles, communication tabs, credentials, demo chat, tone toggle) |
| 12. Rewards | 5 (progress slider, current/next toggle, category filter, card expand, point breakdown) |
| 13. Compliance | 5 (view mode, privacy controls, audit trail, disclosures, checklist) |
| 14. Closing | 4 (carousel control, info tabs, language preview, replay) |
| **Total** | **72+ live interactive elements** |

---

## Shared Components
- `IPhoneMockup` — Toggleable iPhone 15 Pro frame with gradient glow, 1.15x expand with frosted backdrop
- `GradientHeadline` — Animated `background-clip: text` gradient fill with slow angle rotation
- `GradientUnderline` — 1-2px animated gradient underline drawing left-to-right
- `GradientBorderCard` — Pseudo-element gradient border with optional hover rotation
- `ScrollReveal` — Intersection Observer fade-up with stagger and configurable easing
- `SectionLayout` — Alternating gradient wash backgrounds, 120-160px padding, mockup alternation
- `ESGScoreRing` — Conic gradient fill, animated stroke-dashoffset, responds to live data changes
- `ImpactCounter` — RAF count-up with ease-out, re-triggerable when values change via toggles
- `LiveToggle` — Styled ON/OFF switch with smooth thumb slide and gradient track fill transition
- `LiveSlider` — Draggable slider with gradient track fill, value label, and real-time callback
- `PersonaCard` — Gradient accent edge, hover lift, content swap on selection
- `NudgeCard` — Gradient left-border, expandable sections, dismiss/act/snooze actions with exit animations
- `ScrollProgress` — 2px gradient line (cyan→gold) at viewport top
- `SectionLabel` — Small monospaced uppercase label above each headline
- `GradientButton` — Shifting gradient background on hover, press feedback
- `FilterToggleGroup` — Row of toggle buttons for category filtering with animated active state
- `TierCard` — Gradient intensity progression, gold shimmer sweep, expand/collapse detail view
- `CompanySelector` — Dropdown that triggers full-section data swap with animated transitions
- `TimelineSlider` — Draggable timeline with milestone markers and real-time data binding

