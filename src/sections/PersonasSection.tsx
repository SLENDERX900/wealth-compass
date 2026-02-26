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
  {
    id: "tech",
    title: "The Tech Professional",
    pain: "Overwhelmed by fragmented investment platforms. No time to research ESG. Skeptical of greenwashing claims.",
    solution: "Aurora aggregates all accounts, automates ESG screening, and provides verified transparency scores — saving hours of research.",
    score: 82, values: ["Climate Action", "Innovation", "Governance"],
  },
  {
    id: "heir",
    title: "The Family-Office Heir",
    pain: "Inheriting a portfolio misaligned with personal values. Family advisors don't understand sustainability. Legacy reputation at stake.",
    solution: "Aurora bridges generational values with institutional rigor — real-time ESG scoring, advisor collaboration, and compliance-ready reporting.",
    score: 91, values: ["Legacy", "Stewardship", "Impact"],
  },
  {
    id: "entrepreneur",
    title: "The Conscious Entrepreneur",
    pain: "Wants investments to match business ethics. Lacks tools to measure real impact. Frustrated by opaque financial products.",
    solution: "Aurora quantifies the real-world impact of every dollar. Live preference controls, scenario modeling, and transparent greenwashing detection.",
    score: 76, values: ["Transparency", "Diversity", "Water"],
  },
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
  const onboardingValues = ["Climate", "Diversity", "Governance", "Water", "Human Rights"];

  const getCardView = (id: string) => cardView[id] || "pain";
  const toggleCardView = (id: string) => {
    setCardView((prev) => ({ ...prev, [id]: prev[id] === "solution" ? "pain" : "solution" }));
  };

  return (
    <SectionLayout id="foryou">
      <ScrollReveal><SectionLabel label="FOR YOU" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="Built For You" className="mb-4">Built For You</GradientHeadline>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <FilterToggleGroup options={["Beginner", "Intermediate", "Expert"]} selected={expLevel} onChange={setExpLevel} className="mb-2" />
        <p className="text-xs text-muted-foreground mb-8">{expLevels[expLevel]}</p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {personas.map((p, i) => (
          <ScrollReveal key={p.id} delay={0.2 + i * 0.1}>
            <GradientBorderCard
              className={`p-5 cursor-pointer transition-all duration-300 ${selected.id === p.id ? "ring-1 ring-aurora-cyan/30" : ""}`}
            >
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

      <ScrollReveal delay={0.4} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full p-4 bg-white text-gray-900 flex flex-col gap-3">
            <p className="pt-8 text-[10px] uppercase tracking-widest opacity-50 text-center">Onboarding</p>
            <p className="text-sm font-medium text-center">{selected.title}</p>

            {/* Value preference cards */}
            <div className="flex-1 flex flex-col justify-center items-center gap-2">
              <AnimatePresence mode="wait">
                <motion.div key={onboardingStep} className="w-full bg-gray-50 rounded-xl p-4 text-center"
                  initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }}>
                  <p className="text-xs text-gray-500 mb-1">Select your values</p>
                  <p className="text-sm font-medium">{onboardingValues[onboardingStep]}</p>
                </motion.div>
              </AnimatePresence>
              <div className="flex gap-1">
                {onboardingValues.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setOnboardingStep(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === onboardingStep ? "bg-emerald-400 w-3" : "bg-gray-300"}`} />
                ))}
              </div>
            </div>

            {/* ESG Identity Card */}
            <div className="bg-gray-50 rounded-xl p-3 mt-auto">
              <p className="text-[10px] text-gray-500 mb-1">ESG Identity Card</p>
              <div className="flex items-center gap-3">
                <ESGScoreRing score={selected.score} size={48} strokeWidth={3} />
                <div>
                  <p className="text-[10px] font-medium">{selected.title}</p>
                  <p className="text-[9px] text-gray-400">{selected.values.join(" · ")}</p>
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
