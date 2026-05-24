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
import PhoneNavBar from "@/components/aurora/PhoneNavBar";

const taxData: Record<string, { milestones: { year: number; tax: number; impact: number; cost: number }[] }> = {
  Current: {
    milestones: [
      { year: 2024, tax: 25, impact: 2.1, cost: 840 },
      { year: 2026, tax: 45, impact: 3.8, cost: 1520 },
      { year: 2028, tax: 50, impact: 4.2, cost: 1680 },
      { year: 2030, tax: 50, impact: 4.2, cost: 1680 },
      { year: 2035, tax: 80, impact: 6.7, cost: 2680 },
    ],
  },
  Optimistic: {
    milestones: [
      { year: 2024, tax: 25, impact: 2.1, cost: 840 },
      { year: 2026, tax: 35, impact: 2.9, cost: 1160 },
      { year: 2028, tax: 40, impact: 3.4, cost: 1360 },
      { year: 2030, tax: 45, impact: 3.8, cost: 1520 },
      { year: 2035, tax: 55, impact: 4.6, cost: 1840 },
    ],
  },
  Aggressive: {
    milestones: [
      { year: 2024, tax: 25, impact: 2.1, cost: 840 },
      { year: 2026, tax: 60, impact: 5.0, cost: 2000 },
      { year: 2028, tax: 80, impact: 6.7, cost: 2680 },
      { year: 2030, tax: 100, impact: 8.4, cost: 3360 },
      { year: 2035, tax: 150, impact: 12.6, cost: 5040 },
    ],
  },
};

const profiles = { "You": 1, "Average": 1.3, "Industry": 0.8 };

const masGuidelines = [
  "Environmental Risk Management (2020)",
  "Sustainable Finance Taxonomy (2023)",
  "Climate-related Disclosures (2025)",
  "Mandatory ESG Labeling (2026)",
];

const CarbonTaxSection = () => {
  const [yearIndex, setYearIndex] = useState([1]);
  const [scenario, setScenario] = useState("Current");
  const [profile, setProfile] = useState("You");
  const [showMAS, setShowMAS] = useState(false);
  const [activeNav, setActiveNav] = useState("insights");

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
        <p className="text-muted-foreground mb-6 max-w-lg">Singapore's carbon tax is rising. Understanding the trajectory is essential for future-proof investing.</p>
      </ScrollReveal>

      {/* Read-only editorial stats */}
      <ScrollReveal delay={0.2}>
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-lg">
          {[["$25→$80/t", "Tax trajectory"], ["6.7%", "Max impact"], ["$2,680/yr", "Projected cost"]].map(([val, label]) => (
            <div key={label} className="text-center">
              <p className="text-lg font-light text-foreground">{val}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full bg-white text-gray-900 flex flex-col">
            {activeNav === "insights" ? (
              <>
            <div className="pt-10 px-3 pb-1">
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-center mb-2">Carbon Tax Calculator</p>
              <FilterToggleGroup compact options={["Current", "Optimistic", "Aggressive"]} selected={scenario} onChange={setScenario} className="justify-center mb-1" />
              <FilterToggleGroup compact options={["You", "Average", "Industry"]} selected={profile} onChange={setProfile} className="justify-center mb-2" />
            </div>

            <div className="px-3 mb-2" onClick={(e) => e.stopPropagation()}>
              <div className="h-1 rounded-full mb-1" style={{ background: "linear-gradient(90deg, hsl(155 100% 80%), hsl(46 97% 64%))" }} />
              <div className="flex justify-between text-[8px] text-gray-400 mb-1">
                {scenarioData.milestones.map((m) => <span key={m.year}>{m.year}</span>)}
              </div>
              <Slider value={yearIndex} onValueChange={setYearIndex} min={0} max={scenarioData.milestones.length - 1} step={1} className="w-full" />
            </div>

            <div className="px-3 grid grid-cols-3 gap-1.5 mb-2">
              {[
                { label: "Tax", val: `$${current.tax}`, sub: "/tonne", color: "bg-amber-50 border-amber-200" },
                { label: "Impact", val: `${(current.impact * multiplier).toFixed(1)}%`, sub: "portfolio", color: "bg-red-50 border-red-200" },
                { label: "Cost", val: `$${Math.round(current.cost * multiplier)}`, sub: "/year", color: "bg-orange-50 border-orange-200" },
              ].map((s) => (
                <div key={s.label} className={`rounded-xl p-2 border text-center ${s.color}`}>
                  <p className="text-[8px] text-gray-500 uppercase">{s.label}</p>
                  <p className="text-sm font-medium">{s.val}</p>
                  <p className="text-[8px] text-gray-400">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="px-3 mt-auto pb-3">
              <button
                onClick={(e) => { e.stopPropagation(); setShowMAS(!showMAS); }}
                className={`w-full text-[9px] py-1.5 rounded-lg transition-all border ${showMAS ? "bg-amber-50 border-amber-200 text-gray-700" : "bg-gray-50 border-gray-200 text-gray-500"}`}
              >
                {showMAS ? "Hide" : "Show"} MAS Guidelines
              </button>
              <AnimatePresence>
                {showMAS && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-1">
                    {masGuidelines.map((g, i) => (
                      <motion.p key={g} className="text-[9px] text-gray-500 py-0.5 flex items-center gap-1"
                        initial={{ x: -5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                        <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" /> {g}
                      </motion.p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center pt-10">
                <p className="text-[11px] text-gray-400 capitalize">{activeNav} screen</p>
              </div>
            )}
            <PhoneNavBar activeTab={activeNav} onTabChange={setActiveNav} />
          </div>
        </IPhoneMockup>
      </ScrollReveal>
    </SectionLayout>
  );
};

export default CarbonTaxSection;
