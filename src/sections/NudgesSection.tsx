import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";
import ImpactCounter from "@/components/aurora/ImpactCounter";
import { Switch } from "@/components/ui/switch";

const nudges = [
  { id: 1, category: "Regulatory", urgency: "Critical", title: "Carbon Tax Increase — Q3 2026", body: "Rebalance now", softBody: "Consider adjusting over the next quarter", cost: 2400, why: "Singapore MAS announced carbon tax rising to $45/tonne. Your portfolio has 12% exposure to high-carbon assets." },
  { id: 2, category: "Performance", urgency: "Important", title: "CleanTech Fund +18% YTD", body: "Increase allocation", softBody: "Review your allocation when convenient", cost: 0, why: "Your CleanTech Fund is outperforming benchmark by 6.2%. Similar funds show continued momentum." },
  { id: 3, category: "ESG Downgrade", urgency: "Critical", title: "PetroGlobal ESG Downgrade", body: "Exit position immediately", softBody: "Plan to reduce exposure gradually", cost: 3100, why: "Independent audit revealed 34-point divergence between claimed and verified ESG scores." },
  { id: 4, category: "Opportunity", urgency: "Important", title: "New Green Bond Issue — SG Govt", body: "Allocate 5% portfolio", softBody: "Worth exploring when ready", cost: 0, why: "Singapore government issuing AAA-rated green bonds at 3.8% yield. Aligns with your climate-first preferences." },
  { id: 5, category: "Performance", urgency: "All", title: "Portfolio Rebalancing Due", body: "Review allocations", softBody: "Schedule a review at your convenience", cost: 800, why: "Quarterly rebalancing helps maintain target allocation. Current drift: 4.2% from targets." },
];

const NudgesSection = () => {
  const [categories, setCategories] = useState<string[]>(["Regulatory", "Performance", "ESG Downgrade", "Opportunity"]);
  const [gradualShift, setGradualShift] = useState(false);
  const [showCost, setShowCost] = useState(false);
  const [urgency, setUrgency] = useState("All");
  const [expandedWhy, setExpandedWhy] = useState<number[]>([]);
  const [dismissed, setDismissed] = useState<number[]>([]);

  const toggleCategory = (cat: string) => {
    setCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
  };

  const filtered = nudges.filter(
    (n) => categories.includes(n.category) && !dismissed.includes(n.id) &&
      (urgency === "All" || (urgency === "Important Only" ? n.urgency !== "All" : n.urgency === "Critical"))
  );

  const borderColor = (cat: string) => cat === "Regulatory" || cat === "ESG Downgrade" ? "hsl(46 97% 64%)" : "hsl(155 100% 80%)";

  return (
    <SectionLayout id="guidance">
      <ScrollReveal><SectionLabel label="GUIDANCE" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline className="mb-4">Smart Nudges. Your Pace.</GradientHeadline>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap gap-4 mb-4">
          <FilterToggleGroup options={["Regulatory", "Performance", "ESG Downgrade", "Opportunity"]} selected={categories} onChange={toggleCategory} multi />
          <FilterToggleGroup options={["All", "Important Only", "Critical Only"]} selected={urgency} onChange={setUrgency} />
        </div>
        <div className="flex gap-6 mb-8">
          <div className="flex items-center gap-2"><span className="text-sm">Gradual Shift</span><Switch checked={gradualShift} onCheckedChange={setGradualShift} /></div>
          <div className="flex items-center gap-2"><span className="text-sm">Cost of Inaction</span><Switch checked={showCost} onCheckedChange={setShowCost} /></div>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">
          <AnimatePresence>
            {filtered.map((n, i) => (
              <motion.div key={n.id} className="bg-card rounded-xl border border-border p-4 border-l-[3px]"
                style={{ borderLeftColor: borderColor(n.category) }}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ delay: i * 0.08 }} layout>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{gradualShift ? n.softBody : n.body}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary">{n.category}</span>
                </div>

                {showCost && n.cost > 0 && (
                  <div className="text-xs mt-2">
                    Cost of inaction: <span className="text-destructive font-medium">$<ImpactCounter value={n.cost} /></span>/yr
                  </div>
                )}

                <AnimatePresence>
                  {expandedWhy.includes(n.id) && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">{n.why}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-2 mt-3">
                  <button onClick={() => setExpandedWhy((prev) => prev.includes(n.id) ? prev.filter((x) => x !== n.id) : [...prev, n.id])}
                    className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                    {expandedWhy.includes(n.id) ? "Hide details" : "Why this?"}
                  </button>
                  <button onClick={() => setDismissed((prev) => [...prev, n.id])} className="text-[10px] text-muted-foreground hover:text-foreground">Dismiss</button>
                  <button className="text-[10px] text-aurora-cyan hover:underline">Act</button>
                  <button className="text-[10px] text-muted-foreground hover:text-foreground">Snooze</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <ScrollReveal delay={0.3} className="flex justify-center">
          <IPhoneMockup>
            <div className="h-full p-4 bg-white text-gray-900 flex flex-col gap-2">
              <p className="pt-8 text-[10px] uppercase tracking-widest opacity-50 text-center">Notifications</p>
              <div className="flex-1 space-y-2 mt-2 overflow-hidden">
                {filtered.slice(0, 3).map((n) => (
                  <div key={n.id} className="bg-gray-50 rounded-lg p-2 border-l-2" style={{ borderLeftColor: borderColor(n.category) }}>
                    <p className="text-[10px] font-medium">{n.title}</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">{gradualShift ? n.softBody : n.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </IPhoneMockup>
        </ScrollReveal>
      </div>
    </SectionLayout>
  );
};

export default NudgesSection;
