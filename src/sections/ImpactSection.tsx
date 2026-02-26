import { useState } from "react";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import ImpactCounter from "@/components/aurora/ImpactCounter";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";
import GradientBorderCard from "@/components/aurora/GradientBorderCard";

const impactData: Record<string, Record<string, { co2: number; energy: number; water: number; co2Label: string; energyLabel: string; waterLabel: string }>> = {
  Personal: {
    "This Month": { co2: 1.2, energy: 87, water: 28, co2Label: "65 trees planted", energyLabel: "Powers 4 homes", waterLabel: "1,400 showers saved" },
    "This Year": { co2: 12.4, energy: 87, water: 340, co2Label: "680 trees planted", energyLabel: "Powers 48 homes", waterLabel: "17,000 showers saved" },
    "All Time": { co2: 38.7, energy: 91, water: 1020, co2Label: "2,120 trees planted", energyLabel: "Powers 144 homes", waterLabel: "51,000 showers saved" },
  },
  Community: {
    "This Month": { co2: 42, energy: 79, water: 890, co2Label: "2,310 trees", energyLabel: "Powers 140 homes", waterLabel: "44,500 showers" },
    "This Year": { co2: 480, energy: 82, water: 10200, co2Label: "26,400 trees", energyLabel: "Powers 1,680 homes", waterLabel: "510K showers" },
    "All Time": { co2: 1240, energy: 85, water: 28400, co2Label: "68,200 trees", energyLabel: "Powers 4,320 homes", waterLabel: "1.4M showers" },
  },
  Global: {
    "This Month": { co2: 1200, energy: 74, water: 24000, co2Label: "65K trees", energyLabel: "Powers 4K homes", waterLabel: "1.2M showers" },
    "This Year": { co2: 14400, energy: 76, water: 288000, co2Label: "792K trees", energyLabel: "Powers 48K homes", waterLabel: "14.4M showers" },
    "All Time": { co2: 42000, energy: 80, water: 840000, co2Label: "2.3M trees", energyLabel: "Powers 140K homes", waterLabel: "42M showers" },
  },
};

const ImpactSection = () => {
  const [tab, setTab] = useState("Personal");
  const [timeRange, setTimeRange] = useState("This Year");
  const [format, setFormat] = useState<"absolute" | "equivalent">("absolute");

  const data = impactData[tab][timeRange];

  return (
    <SectionLayout wash="cyan" id="impact">
      <ScrollReveal>
        <SectionLabel label="IMPACT" />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="Quantified" underline className="mb-4">
          Your Impact, Quantified
        </GradientHeadline>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground mb-8 max-w-lg">Every dollar invested creates measurable, real-world change.</p>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap gap-4 mb-10">
          <FilterToggleGroup options={["Personal", "Community", "Global"]} selected={tab} onChange={setTab} />
          <FilterToggleGroup options={["This Month", "This Year", "All Time"]} selected={timeRange} onChange={setTimeRange} />
          <FilterToggleGroup
            options={["Numbers", "Equivalents"]}
            selected={format === "absolute" ? "Numbers" : "Equivalents"}
            onChange={(v) => setFormat(v === "Numbers" ? "absolute" : "equivalent")}
          />
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { label: "CO₂ Saved", value: data.co2, suffix: "t", equiv: data.co2Label },
          { label: "Clean Energy", value: data.energy, suffix: "%", equiv: data.energyLabel },
          { label: "Water Saved", value: data.water, suffix: "kL", equiv: data.waterLabel },
        ].map((m, i) => (
          <ScrollReveal key={m.label} delay={0.2 + i * 0.1}>
            <GradientBorderCard className="p-6">
              <p className="text-sm text-muted-foreground mb-2">{m.label}</p>
              {format === "absolute" ? (
                <p className="text-3xl font-light">
                  <ImpactCounter value={m.value} suffix={m.suffix} decimals={m.suffix === "t" ? 1 : 0} />
                </p>
              ) : (
                <p className="text-lg font-light text-foreground">{m.equiv}</p>
              )}
            </GradientBorderCard>
          </ScrollReveal>
        ))}
      </div>

      {/* iPhone mockup */}
      <ScrollReveal delay={0.4} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full p-4 bg-white text-gray-900 flex flex-col gap-3">
            <p className="pt-8 text-[10px] uppercase tracking-widest opacity-50 text-center">Impact Dashboard</p>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              {["Personal", "Community"].map((t) => (
                <button key={t} className={`flex-1 text-[10px] py-1.5 rounded-md transition-all ${tab === t ? "bg-white shadow-sm font-medium" : ""}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="space-y-2 mt-2">
              {[
                { icon: "🌿", label: "CO₂ Saved", val: `${data.co2}t` },
                { icon: "⚡", label: "Clean Energy", val: `${data.energy}%` },
                { icon: "💧", label: "Water", val: `${data.water}kL` },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <span className="text-[11px]">{item.icon} {item.label}</span>
                  <span className="text-[11px] font-medium tabular-nums">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </IPhoneMockup>
      </ScrollReveal>
    </SectionLayout>
  );
};

export default ImpactSection;
