# Aurora Wealth Compass

A marketing website showcasing **Aurora** — a next-generation sustainable wealth management app designed for Singapore's next generation of investors.

**Live Demo**: [https://wealth-compass-lime.vercel.app](https://wealth-compass-lime.vercel.app)

---

## What is Aurora?

Aurora is a conceptual fintech application that simplifies sustainable investing by combining traditional portfolio management with advanced ESG (Environmental, Social, Governance) analytics. The app addresses a critical gap in the market: helping young investors align their wealth with their values without sacrificing returns or usability.

### The Problem We're Solving

- **Greenwashing is rampant** — companies inflate ESG claims while independent audits reveal stark differences
- **Fragmented portfolios** — investors juggle multiple platforms (Syfe, StashAway, DBS, Tiger Brokers) with no unified view
- **Values misalignment** — investors unknowingly hold stocks that conflict with their personal ethics
- **Climate complexity** — policy changes like carbon taxes directly impact portfolio performance, but investors lack tools to adapt
- **Impersonal advice** — traditional wealth management feels distant and doesn't account for individual values

---

## Key Features

### 1. Unified Portfolio Aggregation
Consolidate holdings across multiple providers into a single dashboard. View total portfolio value, asset allocation, and cross-platform ESG scoring in one place.

**Interactive Demo**: Toggle between providers, group holdings by asset class or ESG rating, and visualize allocation through dynamic pie charts.

### 2. ESG Transparency Engine
See through corporate greenwashing with our divergence detection system that compares:
- **Claimed scores** — what companies report
- **Verified scores** — independent auditor assessments
- **Projected scores** — AI-powered sustainability forecasts

**Example**: PetroGlobal claims an ESG score of 68, but verified data shows 34 — a 34-point divergence flagged as high risk.

### 3. Impact Dashboard
Quantify the real-world effects of your investments across three scopes:
- **Personal** — your individual contribution
- **Community** — collective impact of Aurora users
- **Global** — worldwide sustainable investment movement

Track CO₂ saved, clean energy percentage, and water conservation with relatable equivalents ("680 trees planted").

### 4. Values-Based Filtering
Configure your investment universe through granular ethical preferences:
- Exclude fossil fuels, weapons, tobacco, animal testing
- Set board gender diversity thresholds
- Apply Shariah compliance filters
- Adjust carbon intensity caps
- Balance between "Impact-First" and "Returns-First" philosophies

### 5. Carbon Tax Intelligence
Simulate the financial impact of Singapore's rising carbon tax (increasing to S$45/tonne by Q3 2026). The app identifies high-carbon exposures and suggests rebalancing strategies to minimize tax drag on returns.

### 6. Smart Behavioral Nudges
AI-powered notifications that guide without pushing:
- **Regulatory alerts** — upcoming policy changes affecting your holdings
- **Performance opportunities** — funds outperforming benchmarks
- **ESG downgrades** — divergence detection triggering exit recommendations
- **Green bond alerts** — new sustainable investment opportunities

Toggle between "Direct" and "Gradual" communication styles based on your preference.

### 7. Certified ESG Advisory
Connect with verified advisors specializing in sustainable investing:
- View credentials (CFA, GSIA Certified, SASB FSA)
- Toggle between formal and casual conversation tones
- Chat, schedule video calls, or book in-person consultations
- Advisors understand both your financial goals and values

### 8. Impact Rewards Program
Gamified sustainability with tangible perks:
- **Green Explorer** (30+ score) — dining priorities, eco-workshops, free ESG reviews
- **Impact Leader** (60+ score) — VIP summits, dedicated relationship managers
- **Legacy Architect** (85+ score) — concierge service, private wealth management, family office advisory

---

## Design Philosophy

### "Simple. Powerful. Personalized."

Aurora's design language reflects three core principles:

1. **Radical Transparency** — No hidden fees, no greenwashing, no black-box algorithms. Every score shows its methodology.

2. **Behavioral Empowerment** — Nudges educate rather than manipulate. Users control notification intensity and communication style.

3. **Values Integration** — Ethics aren't an afterthought. They're a primary filter that shapes the entire investment universe.

### Visual Language

- **Emerald and amber gradients** — symbolizing growth and value
- **Clean, minimalist interfaces** — reducing cognitive load for financial decisions
- **Interactive phone mockups** — demonstrating real app functionality within the marketing site
- **Scroll-triggered animations** — progressive disclosure that respects user attention

---

## Technical Architecture

This marketing website is built with modern web technologies:

| Technology | Purpose |
|------------|---------|
| **Vite** | Fast development and optimized builds |
| **React 18** | Component-based UI architecture |
| **TypeScript** | Type safety and developer experience |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Accessible, customizable component primitives |
| **Framer Motion** | Smooth scroll animations and transitions |
| **Recharts** | Interactive data visualizations |
| **React Router** | SPA navigation |
| **TanStack Query** | Data fetching and caching |

### Project Structure

```
src/
├── sections/           # Page sections (Hero, ESG, Portfolio, etc.)
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui primitives
│   └── aurora/        # Custom Aurora components
├── pages/             # Route-level components
├── hooks/             # Custom React hooks
└── lib/               # Utility functions
```

---

## Thought Process & Methodology

### Why Sustainable Wealth Management?

The project emerged from three converging trends:

1. **Regulatory pressure** — Singapore's carbon tax increases and MAS sustainability guidelines are making ESG factors financially material
2. **Generational shift** — Millennials and Gen Z investors prioritize values alignment, with 73% willing to pay higher fees for sustainable options
3. **Technology maturity** — APIs now enable seamless aggregation across robo-advisors, banks, and brokerages

### Design Decisions

**Interactive Mockups over Static Screenshots**
Instead of passive marketing imagery, we built functional mini-apps within each section. Users can actually toggle settings, filter holdings, and see real-time recalculations — demonstrating Aurora's responsiveness.

**Progressive Disclosure**
Information architecture follows a journey: from surface-level portfolio view → deep ESG analysis → behavioral guidance → professional advisory. Each section reveals more sophisticated capabilities.

**Dual-Mode Communication**
Research shows investor preferences split between formal, data-dense communication and casual, conversational guidance. Aurora supports both through toggleable interfaces.

### Future Considerations

- **Open banking integration** — Real-time data aggregation via Singapore's financial data exchange
- **AI advisor training** — Fine-tuned models on MAS regulations and ESG frameworks
- **Community features** — Anonymous benchmarking against peer sustainability scores
- **Carbon offset marketplace** — Direct purchasing of verified credits within the app

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```sh
# Clone the repository
git clone https://github.com/yourusername/wealth-compass.git

# Navigate to project directory
cd wealth-compass

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

```sh
npm run build
```

Output will be in the `dist/` directory, ready for deployment.

---

## Contributing

This is a concept demonstration project. For questions or feedback about Aurora:

- Open an issue for feature suggestions
- Submit a pull request for improvements
- Contact the team at hello@aurora-wealth.sg

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Acknowledgments

- Design inspiration from Linear, Notion, and Apple
- ESG data methodologies from MSCI, Sustainalytics, and SASB
- Singapore regulatory framework guidance from MAS
