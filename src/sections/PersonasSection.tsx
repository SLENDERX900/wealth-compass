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

const personas = [
  { id: "tech", title: "The Tech Professional", pain: "Overwhelmed by fragmented platforms. No time for ESG research. Skeptical of greenwashing.", solution: "Aurora aggregates all accounts, automates ESG screening, and provides verified scores.", score: 82, values: ["Climate Action", "Innovation", "Governance"] },
  { id: "heir", title: "The Family-Office Heir", pain: "Inheriting a misaligned portfolio. Advisors don't understand sustainability. Legacy at stake.", solution: "Aurora bridges generational values with institutional rigor — real-time scoring, advisor collaboration.", score: 91, values: ["Legacy", "Stewardship", "Impact"] },
  { id: "entrepreneur", title: "The Conscious Entrepreneur", pain: "Wants investments to match ethics. Lacks tools to measure real impact. Frustrated by opacity.", solution: "Aurora quantifies real-world impact. Live controls, scenario modeling, and transparent detection.", score: 76, values: ["Transparency", "Diversity", "Water"] },
];

const onboardingValues = [
  { name: "Climate", icon: "🌿", color: "bg-emerald-50 border-emerald-200" },
  { name: "Diversity", icon: "👥", color: "bg-purple-50 border-purple-200" },
  { name: "Governance", icon: "🛡️", color: "bg-blue-50 border-blue-200" },
  { name: "Water", icon: "💧", color: "bg-cyan-50 border-cyan-200" },
  { name: "Human Rights", icon: "❤️", color: "bg-red-50 border-red-200" },
];

const expLevels: Record<string, string> = {
  Beginner: "Simple metrics, plain language, guided recommendations",
  Intermediate: "Detailed breakdowns, comparative benchmarks, ESG methodology",
  Expert: "Full data access, raw scores, factor decomposition, regulatory context",
};

const PersonasSection = () => {
  const [selected, setSelected] = useState(personas[0]);
  const [cardView, setCardView] = useState<Record<string, "pain" | "solution">>({});
  const [expLevel, setExpLevel] = useState("Beginner");
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [selectedValues, setSelectedValues] = useState<string[]>(["Climate"]);

  const getCardView = (id: string) => cardView[id] || "pain";
  const toggleCardView = (id: string) => setCardView((p) => ({ ...p, [id]: p[id] === "solution" ? "pain" : "solution" }));

  const toggleValue = (v: string) => {
    setSelectedValues((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);
  };

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
                {getCardView(p.id) === "pain" ? "See Aurora Solution →" : "← See Pain Points"}
              </button>
            </GradientBorderCard>
          </ScrollReveal>
        ))}
      </div>

      {/* iPhone with onboarding */}
      <ScrollReveal delay={0.4} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full bg-white text-gray-900 flex flex-col">
            <div className="pt-10 px-3">
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-center mb-1">Onboarding</p>
              <p className="text-[11px] font-medium text-center mb-1">{selected.title}</p>
              <p className="text-[8px] text-gray-400 text-center mb-3">{expLevel} Mode</p>
            </div>

            {/* Value preference cards */}
            <div className="flex-1 px-3 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div key={onboardingStep}
                  className={`rounded-xl p-4 text-center border ${onboardingValues[onboardingStep].color}`}
                  initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }}>
                  <span className="text-2xl">{onboardingValues[onboardingStep].icon}</span>
                  <p className="text-sm font-medium mt-2">{onboardingValues[onboardingStep].name}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleValue(onboardingValues[onboardingStep].name); }}
                    className={`mt-2 text-[10px] px-3 py-1 rounded-full border transition-all ${
                      selectedValues.includes(onboardingValues[onboardingStep].name)
                        ? "bg-emerald-100 border-emerald-300 text-emerald-700" : "border-gray-300 text-gray-500"
                    }`}>
                    {selectedValues.includes(onboardingValues[onboardingStep].name) ? "✓ Selected" : "Select"}
                  </button>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex gap-1 justify-center mt-3" onClick={(e) => e.stopPropagation()}>
                {onboardingValues.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setOnboardingStep(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === onboardingStep ? "bg-emerald-400 w-3" : "bg-gray-300"}`} />
                ))}
              </div>
            </div>

            {/* ESG Identity Card */}
            <div className="px-3 pb-3 mt-auto">
              <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-3 border border-emerald-100">
                <p className="text-[9px] text-gray-500 mb-1">ESG Identity Card</p>
                <div className="flex items-center gap-3">
                  <ESGScoreRing score={selected.score} size={44} strokeWidth={3} />
                  <div>
                    <p className="text-[10px] font-medium">{selected.title}</p>
                    <p className="text-[8px] text-gray-400">{selectedValues.join(" · ") || "No values selected"}</p>
                  </div>
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
