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
    name: "Green Explorer", threshold: 30, icon: "🌱", color: "bg-emerald-50 border-emerald-200",
    perks: [
      { icon: "🍽️", name: "Priority dining reservations", desc: "At 20+ partner restaurants", cat: "Dining" },
      { icon: "🌿", name: "Eco-workshop access", desc: "Monthly sustainability workshops", cat: "Experiences" },
      { icon: "📊", name: "Free ESG portfolio review", desc: "Quarterly analysis by certified advisors", cat: "Financial" },
    ],
  },
  {
    name: "Impact Leader", threshold: 60, icon: "⭐", color: "bg-amber-50 border-amber-200",
    perks: [
      { icon: "🏛️", name: "VIP sustainability summits", desc: "Exclusive access to industry events", cat: "Experiences" },
      { icon: "👤", name: "Dedicated relationship manager", desc: "Personal financial advisor", cat: "Financial" },
      { icon: "🏢", name: "Social club membership", desc: "Premium networking community", cat: "Experiences" },
    ],
  },
  {
    name: "Legacy Architect", threshold: 85, icon: "👑", color: "bg-yellow-50 border-yellow-300",
    perks: [
      { icon: "🔔", name: "Personal concierge service", desc: "24/7 lifestyle & financial concierge", cat: "Financial" },
      { icon: "💼", name: "Private wealth manager", desc: "Bespoke portfolio construction", cat: "Financial" },
      { icon: "🛡️", name: "Family office advisory", desc: "Multi-generational wealth planning", cat: "Financial" },
      { icon: "🌍", name: "Global restaurant network", desc: "Access to 500+ partner venues worldwide", cat: "Dining" },
    ],
  },
];

const RewardsSection = () => {
  const [impactScore, setImpactScore] = useState([50]);
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const currentTierIndex = tiers.findIndex((t) => impactScore[0] < t.threshold) - 1;
  const activeTier = currentTierIndex >= 0 ? currentTierIndex : impactScore[0] >= 85 ? 2 : -1;
  const nextTier = activeTier < 2 ? tiers[activeTier + 1] : null;

  return (
    <SectionLayout id="rewards">
      <ScrollReveal><SectionLabel label="REWARDS" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="Unlock Rewards." className="mb-4">Grow Your Impact. Unlock Rewards.</GradientHeadline>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground mb-6 max-w-lg">Your sustainable choices earn real perks — from dining experiences to private wealth management. The more impact, the more you unlock.</p>
      </ScrollReveal>

      {/* Read-only tier badge */}
      <ScrollReveal delay={0.2}>
        <div className="mb-12">
          <p className="text-sm text-muted-foreground">Current Tier: <strong className="text-foreground">{activeTier >= 0 ? tiers[activeTier].name : "No Tier"}</strong> · Score: {impactScore[0]}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full bg-white text-gray-900 flex flex-col overflow-y-auto">
            <div className="pt-10 px-3 pb-1">
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-center mb-2">Rewards</p>

              {/* Current tier badge */}
              <div className="text-center mb-2">
                <span className="text-2xl">{activeTier >= 0 ? tiers[activeTier].icon : "🔒"}</span>
                <p className="text-sm font-medium mt-1">{activeTier >= 0 ? tiers[activeTier].name : "No Tier"}</p>
              </div>

              {/* Progress bar */}
              {nextTier && (
                <div className="mb-2">
                  <div className="flex justify-between text-[8px] text-gray-400 mb-0.5">
                    <span>Score: {impactScore[0]}</span>
                    <span>{nextTier.threshold - impactScore[0]} pts to {nextTier.name}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, hsl(155 100% 80%), hsl(46 97% 64%))" }}
                      animate={{ width: `${(impactScore[0] / nextTier.threshold) * 100}%` }} />
                  </div>
                </div>
              )}

              {/* Impact score slider */}
              <div onClick={(e) => e.stopPropagation()} className="mb-2">
                <div className="flex justify-between text-[8px] text-gray-400 mb-0.5"><span>Impact Score</span><span>{impactScore[0]}</span></div>
                <Slider value={impactScore} onValueChange={setImpactScore} min={0} max={100} step={1} />
              </div>

              {/* Category filter */}
              <FilterToggleGroup compact options={["All", "Dining", "Experiences", "Financial"]} selected={category} onChange={setCategory} className="justify-center" />
            </div>

            {/* Tier cards */}
            <div className="flex-1 px-3 pb-3 mt-2 space-y-2">
              {tiers.map((tier, i) => {
                const unlocked = i <= activeTier;
                const filteredPerks = tier.perks.filter((p) => category === "All" || p.cat === category);
                if (filteredPerks.length === 0) return null;

                return (
                  <motion.div key={tier.name}
                    className={`rounded-xl border overflow-hidden transition-all ${unlocked ? tier.color : "bg-gray-50 border-gray-200 opacity-50"}`}
                    layout onClick={(e) => { e.stopPropagation(); setExpanded(expanded === tier.name ? null : tier.name); }}>

                    {/* Header */}
                    <div className="p-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{unlocked ? tier.icon : "🔒"}</span>
                        <div>
                          <p className="text-[10px] font-medium">{tier.name}</p>
                          <p className="text-[8px] text-gray-400">{tier.threshold}+ pts · {filteredPerks.length} perks</p>
                        </div>
                      </div>
                      <span className="text-[9px] text-gray-400">{expanded === tier.name ? "▲" : "▼"}</span>
                    </div>

                    {/* Expanded perks */}
                    <AnimatePresence>
                      {expanded === tier.name && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="px-2.5 pb-2.5 space-y-1.5 border-t border-gray-200/50 pt-2">
                            {filteredPerks.map((perk) => (
                              <div key={perk.name} className="flex items-start gap-2">
                                <span className="text-xs mt-0.5">{perk.icon}</span>
                                <div>
                                  <p className="text-[10px] font-medium">{perk.name}</p>
                                  <p className="text-[8px] text-gray-400">{perk.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </IPhoneMockup>
      </ScrollReveal>
    </SectionLayout>
  );
};

export default RewardsSection;
