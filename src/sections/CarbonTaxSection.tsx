import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";
import ImpactCounter from "@/components/aurora/ImpactCounter";
import { Slider } from "@/components/ui/slider";

const taxData: Record<string, { milestones: { year: number; tax: number; impact: number; cost: number }[] }> = {
  "Current Trajectory": {
    milestones: [
      { year: 2024, tax: 25, impact: 2.1, cost: 840 },
      { year: 2026, tax: 45, impact: 3.8, cost: 1520 },
      { year: 2028, tax: 50, impact: 4.2, cost: 1680 },
      { year: 2030, tax: 50, impact: 4.2, cost: 1680 },
      { year: 2035, tax: 80, impact: 6.7, cost: 2680 },
    ],
  },
  "Optimistic Regulation": {
    milestones: [
      { year: 2024, tax: 25, impact: 2.1, cost: 840 },
      { year: 2026, tax: 35, impact: 2.9, cost: 1160 },
      { year: 2028, tax: 40, impact: 3.4, cost: 1360 },
      { year: 2030, tax: 45, impact: 3.8, cost: 1520 },
      { year: 2035, tax: 55, impact: 4.6, cost: 1840 },
    ],
  },
  "Aggressive Regulation": {
    milestones: [
      { year: 2024, tax: 25, impact: 2.1, cost: 840 },
      { year: 2026, tax: 60, impact: 5.0, cost: 2000 },
      { year: 2028, tax: 80, impact: 6.7, cost: 2680 },
      { year: 2030, tax: 100, impact: 8.4, cost: 3360 },
      { year: 2035, tax: 150, impact: 12.6, cost: 5040 },
    ],
  },
};

const profiles = { "Your Portfolio": 1, "Average Singaporean": 1.3, "Industry Benchmark": 0.8 };

const masGuidelines = [
  "Environmental Risk Management Guidelines (2020)",
  "Taxonomy for Sustainable Finance (2023)",
  "Climate-related Financial Disclosures (2025)",
  "Mandatory ESG Fund Labeling (2026)",
];

const CarbonTaxSection = () => {
  const [yearIndex, setYearIndex] = useState([1]);
  const [scenario, setScenario] = useState("Current Trajectory");
  const [profile, setProfile] = useState("Your Portfolio");
  const [showMAS, setShowMAS] = useState(false);

  const scenarioData = taxData[scenario];
  const current = scenarioData.milestones[yearIndex[0]] || scenarioData.milestones[0];
  const multiplier = profiles[profile as keyof typeof profiles];

  return (
    <SectionLayout wash="gold" id="context">
      <ScrollReveal><SectionLabel label="CONTEXT" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline className="mb-4">The Rules Are Changing</GradientHeadline>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground mb-8 max-w-lg">Singapore's carbon tax is rising. Understanding the trajectory is essential for future-proof investing.</p>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap gap-4 mb-8">
          <FilterToggleGroup options={Object.keys(taxData)} selected={scenario} onChange={setScenario} />
          <FilterToggleGroup options={Object.keys(profiles)} selected={profile} onChange={setProfile} />
          <button
            className={`px-4 py-1.5 rounded-full text-sm transition-all ${showMAS ? "bg-aurora-gold/20 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setShowMAS(!showMAS)}
          >
            {showMAS ? "Hide" : "Show"} MAS Guidelines
          </button>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <ScrollReveal delay={0.25}>
          <div className="space-y-8">
            {/* Timeline */}
            <div className="relative">
              <div className="h-1 rounded-full mb-6" style={{ background: "linear-gradient(90deg, hsl(155 100% 80%), hsl(46 97% 64%))" }} />
              <div className="flex justify-between text-xs text-muted-foreground mb-4">
                {scenarioData.milestones.map((m) => (
                  <span key={m.year} className="tabular-nums">{m.year}</span>
                ))}
              </div>
              <Slider value={yearIndex} onValueChange={setYearIndex} min={0} max={scenarioData.milestones.length - 1} step={1} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card rounded-xl p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Carbon Tax</p>
                <p className="text-2xl font-light">$<ImpactCounter value={current.tax} /></p>
                <p className="text-xs text-muted-foreground">/tonne</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Portfolio Impact</p>
                <p className="text-2xl font-light"><ImpactCounter value={current.impact * multiplier} decimals={1} suffix="%" /></p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Annual Cost</p>
                <p className="text-2xl font-light">$<ImpactCounter value={Math.round(current.cost * multiplier)} /></p>
              </div>
            </div>

            {/* MAS Guidelines overlay */}
            <AnimatePresence>
              {showMAS && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="bg-card rounded-xl p-4 border border-border space-y-2">
                    <p className="text-sm font-medium mb-2">MAS Sustainability Guidelines</p>
                    {masGuidelines.map((g, i) => (
                      <motion.p key={g} className="text-xs text-muted-foreground flex items-center gap-2" initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-aurora-gold" /> {g}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35} className="flex justify-center">
          <IPhoneMockup>
            <div className="h-full p-4 bg-white text-gray-900 flex flex-col gap-3">
              <p className="pt-8 text-[10px] uppercase tracking-widest opacity-50 text-center">Carbon Tax Calculator</p>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-light">${current.tax}/t</p>
                <p className="text-[10px] text-gray-500">{current.year} · {scenario}</p>
              </div>
              <div className="mt-auto bg-gray-50 rounded-lg p-3">
                <p className="text-[10px] text-gray-500">Portfolio Exposure</p>
                <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, hsl(155 100% 80%), hsl(46 97% 64%))" }} animate={{ width: `${current.impact * multiplier * 8}%` }} />
                </div>
              </div>
            </div>
          </IPhoneMockup>
        </ScrollReveal>
      </div>
    </SectionLayout>
  );
};

export default CarbonTaxSection;
