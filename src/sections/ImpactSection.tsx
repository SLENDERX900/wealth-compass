import { useState } from "react";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import ImpactCounter from "@/components/aurora/ImpactCounter";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";

const impactData: Record<string, Record<string, { co2: number; energy: number; water: number; co2Label: string; energyLabel: string; waterLabel: string }>> = {
  Personal: {
    "Month": { co2: 1.2, energy: 87, water: 28, co2Label: "65 trees planted", energyLabel: "Powers 4 homes", waterLabel: "1,400 showers saved" },
    "Year": { co2: 12.4, energy: 87, water: 340, co2Label: "680 trees planted", energyLabel: "Powers 48 homes", waterLabel: "17,000 showers saved" },
    "All": { co2: 38.7, energy: 91, water: 1020, co2Label: "2,120 trees planted", energyLabel: "Powers 144 homes", waterLabel: "51,000 showers saved" },
  },
  Community: {
    "Month": { co2: 42, energy: 79, water: 890, co2Label: "2,310 trees", energyLabel: "Powers 140 homes", waterLabel: "44,500 showers" },
    "Year": { co2: 480, energy: 82, water: 10200, co2Label: "26,400 trees", energyLabel: "Powers 1,680 homes", waterLabel: "510K showers" },
    "All": { co2: 1240, energy: 85, water: 28400, co2Label: "68,200 trees", energyLabel: "Powers 4,320 homes", waterLabel: "1.4M showers" },
  },
  Global: {
    "Month": { co2: 1200, energy: 74, water: 24000, co2Label: "65K trees", energyLabel: "Powers 4K homes", waterLabel: "1.2M showers" },
    "Year": { co2: 14400, energy: 76, water: 288000, co2Label: "792K trees", energyLabel: "Powers 48K homes", waterLabel: "14.4M showers" },
    "All": { co2: 42000, energy: 80, water: 840000, co2Label: "2.3M trees", energyLabel: "Powers 140K homes", waterLabel: "42M showers" },
  },
};

const ImpactSection = () => {
  const [tab, setTab] = useState("Personal");
  const [timeRange, setTimeRange] = useState("Year");
  const [format, setFormat] = useState<"abs" | "equiv">("abs");

  const data = impactData[tab][timeRange];

  return (
    <SectionLayout wash="cyan" id="impact">
      <ScrollReveal><SectionLabel label="IMPACT" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="Quantified" underline className="mb-4">
          Your Impact, Quantified
        </GradientHeadline>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground mb-4 max-w-lg">Every dollar invested creates measurable, real-world change. Explore your impact dashboard inside the app.</p>
      </ScrollReveal>

      {/* Read-only editorial stats */}
      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap gap-6 mb-12 text-sm text-muted-foreground">
          <span>🌿 <strong className="text-foreground">12.4t</strong> CO₂ saved this year</span>
          <span>⚡ <strong className="text-foreground">87%</strong> clean energy</span>
          <span>💧 <strong className="text-foreground">340kL</strong> water saved</span>
        </div>
      </ScrollReveal>

      {/* Phone with all controls */}
      <ScrollReveal delay={0.3} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full bg-white text-gray-900 flex flex-col">
            <div className="pt-10 px-3 pb-2">
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-center mb-2">Impact Dashboard</p>

              {/* Scope toggle */}
              <FilterToggleGroup compact options={["Personal", "Community", "Global"]} selected={tab} onChange={setTab} className="justify-center mb-2" />

              {/* Time range */}
              <FilterToggleGroup compact options={["Month", "Year", "All"]} selected={timeRange} onChange={setTimeRange} className="justify-center mb-2" />

              {/* Format toggle */}
              <FilterToggleGroup compact options={["Numbers", "Equivalents"]} selected={format === "abs" ? "Numbers" : "Equivalents"} onChange={(v) => setFormat(v === "Numbers" ? "abs" : "equiv")} className="justify-center" />
            </div>

            {/* Metrics */}
            <div className="flex-1 px-3 space-y-2 mt-2 overflow-y-auto">
              {[
                { icon: "🌿", label: "CO₂ Saved", value: data.co2, suffix: "t", equiv: data.co2Label, color: "bg-emerald-50 border-emerald-200" },
                { icon: "⚡", label: "Clean Energy", value: data.energy, suffix: "%", equiv: data.energyLabel, color: "bg-cyan-50 border-cyan-200" },
                { icon: "💧", label: "Water Saved", value: data.water, suffix: "kL", equiv: data.waterLabel, color: "bg-blue-50 border-blue-200" },
              ].map((m) => (
                <div key={m.label} className={`rounded-xl p-3 border ${m.color}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{m.icon}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">{m.label}</span>
                  </div>
                  {format === "abs" ? (
                    <p className="text-xl font-light tabular-nums">
                      <ImpactCounter value={m.value} suffix={m.suffix} decimals={m.suffix === "t" ? 1 : 0} />
                    </p>
                  ) : (
                    <p className="text-sm font-medium text-gray-700">{m.equiv}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom indicator */}
            <div className="px-3 pb-3 pt-2 text-center">
              <p className="text-[9px] text-gray-400">{tab} · {timeRange === "All" ? "All Time" : timeRange === "Month" ? "This Month" : "This Year"}</p>
            </div>
          </div>
        </IPhoneMockup>
      </ScrollReveal>
    </SectionLayout>
  );
};

export default ImpactSection;
