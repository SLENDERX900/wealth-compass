import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";

const nudges = [
  { id: 1, category: "Regulatory", urgency: "Critical", title: "Carbon Tax Increase — Q3 2026", body: "Rebalance now", softBody: "Consider adjusting next quarter", cost: 2400, why: "MAS announced carbon tax rising to $45/tonne. 12% exposure to high-carbon assets." },
  { id: 2, category: "Performance", urgency: "Important", title: "CleanTech Fund +18% YTD", body: "Increase allocation", softBody: "Review when convenient", cost: 0, why: "CleanTech Fund outperforming benchmark by 6.2%." },
  { id: 3, category: "ESG Downgrade", urgency: "Critical", title: "PetroGlobal ESG Downgrade", body: "Exit position", softBody: "Plan to reduce exposure", cost: 3100, why: "34-point divergence between claimed and verified ESG scores." },
  { id: 4, category: "Opportunity", urgency: "Important", title: "SG Green Bond Issue", body: "Allocate 5%", softBody: "Worth exploring", cost: 0, why: "AAA-rated green bonds at 3.8% yield. Aligns with climate-first preferences." },
];

const catColors: Record<string, string> = { Regulatory: "#f59e0b", Performance: "#22c55e", "ESG Downgrade": "#ef4444", Opportunity: "#3b82f6" };

const NudgesSection = () => {
  const [categories, setCategories] = useState<string[]>(["Regulatory", "Performance", "ESG Downgrade", "Opportunity"]);
  const [gradualShift, setGradualShift] = useState(false);
  const [showCost, setShowCost] = useState(false);
  const [urgency, setUrgency] = useState("All");
  const [expandedWhy, setExpandedWhy] = useState<number[]>([]);
  const [dismissed, setDismissed] = useState<number[]>([]);

  const toggleCategory = (cat: string) => setCategories((p) => p.includes(cat) ? p.filter((c) => c !== cat) : [...p, cat]);

  const filtered = nudges.filter(
    (n) => categories.includes(n.category) && !dismissed.includes(n.id) &&
      (urgency === "All" || (urgency === "Important" ? n.urgency !== "All" : n.urgency === "Critical"))
  );

  return (
    <SectionLayout id="guidance">
      <ScrollReveal><SectionLabel label="GUIDANCE" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline className="mb-4">Smart Nudges. Your Pace.</GradientHeadline>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground mb-6 max-w-lg">Aurora uses behavioral finance principles to guide you toward better outcomes — never pushing, always explaining.</p>
      </ScrollReveal>

      {/* Example editorial nudge */}
      <ScrollReveal delay={0.2}>
        <div className="bg-card rounded-xl border border-border p-4 border-l-[3px] max-w-md mb-12" style={{ borderLeftColor: "#f59e0b" }}>
          <p className="text-sm font-medium">Carbon Tax Increase — Q3 2026</p>
          <p className="text-xs text-muted-foreground mt-1">Nudges adapt to your pace and communication style.</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full bg-white text-gray-900 flex flex-col">
            <div className="pt-10 px-3 pb-1">
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-center mb-2">Notifications</p>

              {/* Category chips */}
              <div className="flex gap-0.5 overflow-x-auto pb-1" onClick={(e) => e.stopPropagation()}>
                {["Regulatory", "Performance", "ESG Downgrade", "Opportunity"].map((cat) => (
                  <button key={cat} onClick={(e) => { e.stopPropagation(); toggleCategory(cat); }}
                    className={`flex-shrink-0 text-[8px] px-1.5 py-0.5 rounded-full border transition-all flex items-center gap-0.5 ${
                      categories.includes(cat) ? "border-gray-300 bg-gray-50" : "border-gray-200 opacity-40"
                    }`}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: catColors[cat] }} />
                    {cat.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Urgency + toggles */}
              <div className="flex gap-1 mt-1 items-center" onClick={(e) => e.stopPropagation()}>
                <FilterToggleGroup compact options={["All", "Important", "Critical"]} selected={urgency} onChange={setUrgency} />
              </div>

              <div className="flex gap-2 mt-1" onClick={(e) => e.stopPropagation()}>
                <button onClick={(e) => { e.stopPropagation(); setGradualShift(!gradualShift); }}
                  className={`text-[8px] px-2 py-0.5 rounded-full border ${gradualShift ? "bg-blue-50 border-blue-200" : "border-gray-200"}`}>
                  {gradualShift ? "🐢 Gradual" : "⚡ Direct"}
                </button>
                <button onClick={(e) => { e.stopPropagation(); setShowCost(!showCost); }}
                  className={`text-[8px] px-2 py-0.5 rounded-full border ${showCost ? "bg-red-50 border-red-200" : "border-gray-200"}`}>
                  💰 Cost
                </button>
              </div>
            </div>

            {/* Nudge cards */}
            <div className="flex-1 px-3 pb-3 mt-2 space-y-1.5 overflow-y-auto">
              <AnimatePresence>
                {filtered.map((n) => (
                  <motion.div key={n.id} className="bg-gray-50 rounded-xl p-2.5 border-l-[3px]"
                    style={{ borderLeftColor: catColors[n.category] }}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, height: 0 }} layout>
                    <p className="text-[10px] font-medium">{n.title}</p>
                    <p className="text-[9px] text-gray-500 mt-0.5">{gradualShift ? n.softBody : n.body}</p>

                    {showCost && n.cost > 0 && (
                      <p className="text-[9px] text-red-500 mt-0.5">⚠️ ${n.cost.toLocaleString()}/yr inaction cost</p>
                    )}

                    <AnimatePresence>
                      {expandedWhy.includes(n.id) && (
                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="text-[8px] text-gray-400 mt-1 overflow-hidden">{n.why}</motion.p>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-1.5 mt-1.5" onClick={(e) => e.stopPropagation()}>
                      <button onClick={(e) => { e.stopPropagation(); setExpandedWhy((p) => p.includes(n.id) ? p.filter((x) => x !== n.id) : [...p, n.id]); }}
                        className="text-[8px] text-gray-400">Why?</button>
                      <button onClick={(e) => { e.stopPropagation(); setDismissed((p) => [...p, n.id]); }}
                        className="text-[8px] text-gray-400">Dismiss</button>
                      <button className="text-[8px] text-emerald-500 font-medium">Act</button>
                      <button className="text-[8px] text-gray-400">Snooze</button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </IPhoneMockup>
      </ScrollReveal>
    </SectionLayout>
  );
};

export default NudgesSection;
