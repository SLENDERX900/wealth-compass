import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";
import { Slider } from "@/components/ui/slider";

const tiers = [
  {
    name: "Green Explorer", threshold: 30,
    perks: {
      Dining: ["Priority reservations at partner restaurants", "10% off at selected organic cafés"],
      Experiences: ["Guided nature walks in MacRitchie", "Eco-workshop invitations"],
      "Financial Services": ["Free ESG portfolio review", "Quarterly impact report"],
    },
  },
  {
    name: "Impact Leader", threshold: 60,
    perks: {
      Dining: ["Exclusive chef's table events", "Complimentary welcome at 5-star restaurants"],
      Experiences: ["VIP access to sustainability summits", "Private gallery viewings"],
      "Financial Services": ["Dedicated relationship manager", "Priority fund access"],
    },
  },
  {
    name: "Legacy Architect", threshold: 85,
    perks: {
      Dining: ["Personal concierge dining service", "Global restaurant network access"],
      Experiences: ["Private island retreats", "Board-level advisory invitations"],
      "Financial Services": ["Bespoke wealth structuring", "Private wealth manager", "Family office services"],
    },
  },
];

const RewardsSection = () => {
  const [impactScore, setImpactScore] = useState([50]);
  const [view, setView] = useState("Current Perks");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const currentTierIndex = tiers.findIndex((t) => impactScore[0] < t.threshold) - 1;
  const activeTier = currentTierIndex >= 0 ? currentTierIndex : impactScore[0] >= 85 ? 2 : -1;

  return (
    <SectionLayout id="rewards">
      <ScrollReveal><SectionLabel label="REWARDS" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="Grow Your Impact. Unlock Rewards." className="mb-4">Grow Your Impact. Unlock Rewards.</GradientHeadline>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap gap-4 mb-4">
          <FilterToggleGroup options={["Current Perks", "Next Tier Preview"]} selected={view} onChange={setView} />
          <FilterToggleGroup options={["All", "Dining", "Experiences", "Financial Services"]} selected={category} onChange={setCategory} />
          <button onClick={() => setShowBreakdown(!showBreakdown)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${showBreakdown ? "bg-aurora-gold/15 text-foreground" : "text-muted-foreground"}`}
          >Point Breakdown</button>
        </div>
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2"><span>Impact Score</span><span className="tabular-nums">{impactScore[0]}</span></div>
          <Slider value={impactScore} onValueChange={setImpactScore} min={0} max={100} step={1} />
        </div>
      </ScrollReveal>

      <AnimatePresence>
        {showBreakdown && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-8 overflow-hidden">
            <ScrollReveal>
              <div className="bg-card rounded-xl border border-border p-4 grid grid-cols-3 gap-4 text-center">
                {[["Investments", 45], ["Referrals", 25], ["ESG Improvements", 30]].map(([label, pct]) => (
                  <div key={label as string}>
                    <p className="text-2xl font-light gradient-text">{pct as number}%</p>
                    <p className="text-xs text-muted-foreground">{label as string}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {tiers.map((tier, i) => {
          const unlocked = i <= activeTier;
          const showTier = view === "Current Perks" ? i <= activeTier : i === activeTier + 1;
          if (!showTier && view === "Next Tier Preview") return null;

          const filteredPerks = category === "All"
            ? Object.entries(tier.perks).flatMap(([cat, perks]) => perks.map((p) => ({ cat, p })))
            : (tier.perks[category as keyof typeof tier.perks] || []).map((p) => ({ cat: category, p }));

          return (
            <ScrollReveal key={tier.name} delay={0.2 + i * 0.1}>
              <motion.div
                className={`relative rounded-xl border border-border p-5 cursor-pointer overflow-hidden transition-all
                  ${unlocked ? "bg-card" : "bg-muted/30 opacity-60"}`}
                onClick={() => setExpanded(expanded === tier.name ? null : tier.name)}
                layout
              >
                {/* Gold shimmer for top tier */}
                {i === 2 && unlocked && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 -translate-x-full" style={{
                      background: "linear-gradient(105deg, transparent 40%, hsla(46,97%,64%,0.08) 45%, hsla(46,97%,64%,0.12) 50%, hsla(46,97%,64%,0.08) 55%, transparent 60%)",
                      animation: "shimmer-sweep 1.5s ease-in-out forwards",
                    }} />
                  </div>
                )}

                <div className="h-1 w-full rounded-full mb-4" style={{
                  background: i === 0 ? "hsl(155 100% 80%)" : i === 1 ? "linear-gradient(90deg, hsl(155 100% 80%), hsl(46 97% 64%))" : "linear-gradient(90deg, hsl(46 97% 64%), hsl(44 90% 60%))",
                }} />

                <h3 className="text-sm font-medium mb-1">{tier.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{unlocked ? "Unlocked" : `Requires ${tier.threshold} points`}</p>

                <AnimatePresence>
                  {expanded === tier.name && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="space-y-1 pt-2 border-t border-border">
                        {filteredPerks.map((fp, j) => (
                          <p key={j} className="text-xs text-muted-foreground">{fp.p}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal delay={0.4} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full p-4 bg-white text-gray-900 flex flex-col gap-3">
            <p className="pt-8 text-[10px] uppercase tracking-widest opacity-50 text-center">Rewards</p>
            <div className="text-center">
              <p className="text-lg font-light">{activeTier >= 0 ? tiers[activeTier].name : "No Tier"}</p>
              <p className="text-[10px] text-gray-400">Impact Score: {impactScore[0]}</p>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{
                width: `${impactScore[0]}%`,
                background: "linear-gradient(90deg, hsl(155 100% 80%), hsl(46 97% 64%))",
              }} />
            </div>
            <div className="flex-1 space-y-1 mt-2">
              {tiers.filter((_, i) => i <= activeTier).map((t) => (
                <div key={t.name} className="bg-gray-50 rounded-lg p-2 text-[10px]">
                  <p className="font-medium">{t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </IPhoneMockup>
      </ScrollReveal>
    </SectionLayout>
  );
};

export default RewardsSection;
