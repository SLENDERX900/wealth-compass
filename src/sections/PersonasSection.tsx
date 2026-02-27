import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";
import GradientBorderCard from "@/components/aurora/GradientBorderCard";
import ESGScoreRing from "@/components/aurora/ESGScoreRing";
import { Check } from "lucide-react";

const personas = [
  {
    id: "tech", title: "The Tech Professional",
    pain: "Overwhelmed by fragmented platforms. No time for ESG research. Skeptical of greenwashing.",
    solution: "Aurora aggregates all accounts, automates ESG screening, and provides verified scores.",
    score: 82, values: ["Climate Action", "Innovation", "Governance"],
    style: "Growth-Oriented", risk: "Moderate",
    holdings: [
      { name: "CleanTech Fund", grade: "A+", ret: "+12.3%" },
      { name: "SG Tech Index", grade: "A", ret: "+9.8%" },
      { name: "Green Innovation ETF", grade: "A-", ret: "+7.4%" },
    ],
    esgBreakdown: { E: 85, S: 78, G: 83 },
  },
  {
    id: "heir", title: "The Family-Office Heir",
    pain: "Inheriting a misaligned portfolio. Advisors don't understand sustainability. Legacy at stake.",
    solution: "Aurora bridges generational values with institutional rigor -- real-time scoring, advisor collaboration.",
    score: 91, values: ["Legacy", "Stewardship", "Impact"],
    style: "Balanced", risk: "Conservative",
    holdings: [
      { name: "Impact Wealth Fund", grade: "A+", ret: "+8.1%" },
      { name: "SG Green Bond", grade: "A+", ret: "+5.4%" },
      { name: "Sustainable Legacy", grade: "A", ret: "+6.9%" },
    ],
    esgBreakdown: { E: 92, S: 89, G: 91 },
  },
  {
    id: "entrepreneur", title: "The Conscious Entrepreneur",
    pain: "Wants investments to match ethics. Lacks tools to measure real impact. Frustrated by opacity.",
    solution: "Aurora quantifies real-world impact. Live controls, scenario modeling, and transparent detection.",
    score: 76, values: ["Transparency", "Diversity", "Water"],
    style: "Aggressive", risk: "High",
    holdings: [
      { name: "Water Stewardship", grade: "A", ret: "+11.2%" },
      { name: "DEI Leaders ETF", grade: "A-", ret: "+8.7%" },
      { name: "CleanTech Venture", grade: "B+", ret: "+14.5%" },
    ],
    esgBreakdown: { E: 80, S: 71, G: 74 },
  },
];

const onboardingValues = [
  { name: "Climate", icon: "leaf", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  { name: "Diversity", icon: "users", color: "bg-purple-50 border-purple-200 text-purple-700" },
  { name: "Governance", icon: "shield", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { name: "Water", icon: "droplet", color: "bg-cyan-50 border-cyan-200 text-cyan-700" },
  { name: "Human Rights", icon: "heart", color: "bg-red-50 border-red-200 text-red-700" },
  { name: "Innovation", icon: "zap", color: "bg-amber-50 border-amber-200 text-amber-700" },
];

const valueIcons: Record<string, string> = {
  leaf: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10",
  droplet: "M12 22c4-4 8-8 8-12A8 8 0 0 0 4 10c0 4 4 8 8 12",
  heart: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8",
};

const expLevels: Record<string, string> = {
  Beginner: "Simple metrics, plain language, guided recommendations",
  Intermediate: "Detailed breakdowns, comparative benchmarks, ESG methodology",
  Expert: "Full data access, raw scores, factor decomposition, regulatory context",
};

/* --- Small icon component for value tiles --- */
const ValueIcon = ({ icon, size = 14 }: { icon: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={valueIcons[icon] || ""} />
  </svg>
);

/* --- Mini bar for ESG breakdown --- */
const MiniBar = ({ label, value, max = 100 }: { label: string; value: number; max?: number }) => (
  <div className="flex items-center gap-1.5">
    <span className="text-[8px] font-medium w-2 text-gray-500">{label}</span>
    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ background: "linear-gradient(90deg, hsl(155 100% 75%), hsl(46 97% 64%))" }}
      />
    </div>
    <span className="text-[8px] text-gray-400 tabular-nums w-4 text-right">{value}</span>
  </div>
);

const PersonasSection = () => {
  const [selected, setSelected] = useState(personas[0]);
  const [cardView, setCardView] = useState<Record<string, "pain" | "solution">>({});
  const [expLevel, setExpLevel] = useState("Beginner");
  const [selectedValues, setSelectedValues] = useState<string[]>(["Climate", "Governance"]);

  const getCardView = (id: string) => cardView[id] || "pain";
  const toggleCardView = (id: string) => setCardView((p) => ({ ...p, [id]: p[id] === "solution" ? "pain" : "solution" }));
  const toggleValue = (v: string) => {
    setSelectedValues((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);
  };

  const compatibility = Math.round(
    (selectedValues.filter((v) => selected.values.some((sv) => sv.toLowerCase().includes(v.toLowerCase()))).length / Math.max(selectedValues.length, 1)) * 100
  );

  return (
    <SectionLayout id="foryou">
      <ScrollReveal><SectionLabel label="FOR YOU" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="Built For You" className="mb-4">Built For You</GradientHeadline>
      </ScrollReveal>

      {/* Page-level persona cards + experience level */}
      <ScrollReveal delay={0.2}>
        <FilterToggleGroup options={["Beginner", "Intermediate", "Expert"]} selected={expLevel} onChange={setExpLevel} className="mb-2" />
        <p className="text-xs text-muted-foreground mb-8">{expLevels[expLevel]}</p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {personas.map((p, i) => (
          <ScrollReveal key={p.id} delay={0.2 + i * 0.1}>
            <GradientBorderCard className={`p-5 cursor-pointer transition-all duration-300 ${selected.id === p.id ? "ring-1 ring-aurora-cyan/30" : ""}`}>
              <div onClick={() => setSelected(p)}>
                <h3 className="text-sm font-medium mb-3">{p.title}</h3>
                <AnimatePresence mode="wait">
                  <motion.p key={getCardView(p.id)} className="text-sm text-muted-foreground leading-relaxed" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                    {getCardView(p.id) === "pain" ? p.pain : p.solution}
                  </motion.p>
                </AnimatePresence>
              </div>
              <button onClick={() => toggleCardView(p.id)} className="text-xs text-aurora-cyan mt-3 hover:underline">
                {getCardView(p.id) === "pain" ? "See Aurora Solution \u2192" : "\u2190 See Pain Points"}
              </button>
            </GradientBorderCard>
          </ScrollReveal>
        ))}
      </div>

      {/* iPhone with rich onboarding content */}
      <ScrollReveal delay={0.4} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full bg-white text-gray-900 flex flex-col overflow-y-auto">
            <div className="pt-10 px-3">
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-center mb-0.5">Onboarding</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={selected.id}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="text-[11px] font-medium text-center mb-0.5"
                >
                  {selected.title}
                </motion.p>
              </AnimatePresence>
              <p className="text-[8px] text-gray-400 text-center mb-2">{expLevel} Mode</p>
            </div>

            {/* VALUE GRID - 2 columns, all visible */}
            <div className="px-3 mb-2" onClick={(e) => e.stopPropagation()}>
              <p className="text-[9px] font-medium text-gray-500 mb-1.5">Select your values</p>
              <div className="grid grid-cols-2 gap-1.5">
                {onboardingValues.map((v) => {
                  const isSelected = selectedValues.includes(v.name);
                  return (
                    <button
                      key={v.name}
                      onClick={(e) => { e.stopPropagation(); toggleValue(v.name); }}
                      className={`relative flex items-center gap-1.5 rounded-lg p-2 border text-left transition-all ${
                        isSelected ? v.color + " border-current/20" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <ValueIcon icon={v.icon} size={12} />
                      <span className="text-[9px] font-medium">{v.name}</span>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1 right-1"
                        >
                          <Check className="w-2.5 h-2.5" />
                        </motion.span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PERSONA PROFILE SUMMARY */}
            <div className="px-3 mb-2">
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-[9px] font-medium text-gray-500 mb-1">Profile Summary</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                  <div className="flex justify-between">
                    <span className="text-[8px] text-gray-400">Style</span>
                    <span className="text-[8px] font-medium">{selected.style}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[8px] text-gray-400">Risk</span>
                    <span className="text-[8px] font-medium">{selected.risk}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {selected.values.map((val) => (
                    <span key={val} className="text-[7px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-50 to-amber-50 border border-emerald-100 font-medium text-gray-600">
                      {val}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RECOMMENDED HOLDINGS */}
            <div className="px-3 mb-2">
              <p className="text-[9px] font-medium text-gray-500 mb-1">Recommended Holdings</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-1"
                >
                  {selected.holdings.map((h, i) => (
                    <div key={h.name} className="flex items-center justify-between bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-100 to-amber-100 flex items-center justify-center text-[7px] font-bold text-gray-600">
                          {i + 1}
                        </span>
                        <span className="text-[9px] font-medium">{h.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8px] px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium border border-emerald-100">
                          {h.grade}
                        </span>
                        <span className="text-[8px] text-emerald-600 font-medium tabular-nums">{h.ret}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ESG Identity Card - enriched with breakdown */}
            <div className="px-3 pb-3 mt-auto">
              <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-3 border border-emerald-100">
                <p className="text-[9px] text-gray-500 mb-1.5">ESG Identity Card</p>
                <div className="flex items-center gap-3 mb-2">
                  <ESGScoreRing score={selected.score} size={40} strokeWidth={3} />
                  <div className="flex-1">
                    <p className="text-[10px] font-medium">{selected.title}</p>
                    <p className="text-[8px] text-gray-400">{selectedValues.join(" \u00b7 ") || "No values selected"}</p>
                  </div>
                </div>
                {/* E/S/G Breakdown bars */}
                <div className="space-y-1">
                  <MiniBar label="E" value={selected.esgBreakdown.E} />
                  <MiniBar label="S" value={selected.esgBreakdown.S} />
                  <MiniBar label="G" value={selected.esgBreakdown.G} />
                </div>
                {/* Compatibility */}
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-[8px] text-gray-400">Values Match</span>
                  <span className="text-[9px] font-semibold" style={{ background: "linear-gradient(135deg, hsl(155 100% 75%), hsl(46 97% 64%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {compatibility}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </IPhoneMockup>
      </ScrollReveal>
    </SectionLayout>
  );
};

export default PersonasSection;
