import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";

const companies = [
  { name: "GreenTech Corp", claimed: 82, verified: 61, projected: 70, risk: "Moderate", industry: 65, analysis: "Marketing claims exceed third-party verified sustainability metrics by 21 points. Carbon offset quality questioned." },
  { name: "CleanWater Inc", claimed: 91, verified: 88, projected: 90, risk: "Low", industry: 65, analysis: "Strong alignment between claims and verification. Water stewardship certifications are current and comprehensive." },
  { name: "PetroGlobal", claimed: 68, verified: 34, projected: 42, risk: "High", industry: 65, analysis: "Significant greenwashing risk. Claimed ESG score inflated by 34 points vs independent verification." },
  { name: "SolarMax Energy", claimed: 88, verified: 85, projected: 92, risk: "Low", industry: 65, analysis: "Near-complete alignment. Renewable energy generation verified by independent auditors." },
  { name: "FastFashion Co", claimed: 72, verified: 41, projected: 48, risk: "High", industry: 65, analysis: "Supply chain labor practices not independently verified. Environmental claims lack third-party certification." },
];

const riskColors: Record<string, string> = { Low: "text-emerald-500", Moderate: "text-amber-500", High: "text-red-500" };

const ESGSection = () => {
  const [company, setCompany] = useState(companies[0]);
  const [layers, setLayers] = useState({ claimed: true, verified: true, projected: false });
  const [viewMode, setViewMode] = useState("Simple");
  const [showRiskOverlay, setShowRiskOverlay] = useState(false);
  const [showIndustry, setShowIndustry] = useState(false);

  const toggleLayer = (layer: "claimed" | "verified" | "projected") => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const BarViz = ({ label, value, color, show }: { label: string; value: number; color: string; show: boolean }) => (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>{label}</span>
            <span className="tabular-nums">{value}</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden relative">
            <motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8, ease: "easeOut" }} />
            {showRiskOverlay && company.risk === "High" && value > 50 && (
              <div className="absolute inset-0 bg-red-500/10 rounded-full" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <SectionLayout wash="cyan" id="transparency">
      <ScrollReveal><SectionLabel label="TRANSPARENCY" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="See Through the Noise" className="mb-4">See Through the Noise</GradientHeadline>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap gap-4 mb-8">
          <select value={company.name} onChange={(e) => setCompany(companies.find((c) => c.name === e.target.value)!)}
            className="px-4 py-1.5 rounded-full text-sm bg-card border border-border text-foreground">
            {companies.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
          <FilterToggleGroup options={["Simple", "Detailed"]} selected={viewMode} onChange={setViewMode} />
          <div className="flex gap-2">
            {(["claimed", "verified", "projected"] as const).map((l) => (
              <button key={l} onClick={() => toggleLayer(l)}
                className={`px-3 py-1.5 rounded-full text-sm capitalize transition-all ${layers[l] ? "bg-aurora-cyan/15 text-foreground" : "text-muted-foreground"}`}
              >{l}</button>
            ))}
          </div>
          <button onClick={() => setShowRiskOverlay(!showRiskOverlay)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${showRiskOverlay ? "bg-red-500/15 text-foreground" : "text-muted-foreground"}`}
          >Risk Overlay</button>
          <button onClick={() => setShowIndustry(!showIndustry)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${showIndustry ? "bg-aurora-gold/15 text-foreground" : "text-muted-foreground"}`}
          >Industry Avg</button>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <ScrollReveal delay={0.25}>
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">{company.name}</h3>
              <span className={`text-sm font-medium ${riskColors[company.risk]}`}>{company.risk} Risk</span>
            </div>

            <BarViz label="Claimed Score" value={company.claimed} color="hsl(155 100% 75%)" show={layers.claimed} />
            <BarViz label="Verified Score" value={company.verified} color="hsl(46 97% 64%)" show={layers.verified} />
            <BarViz label="Projected Score" value={company.projected} color="hsl(200 80% 70%)" show={layers.projected} />
            {showIndustry && <BarViz label="Industry Average" value={company.industry} color="hsl(var(--muted-foreground))" show={true} />}

            {layers.claimed && layers.verified && (
              <div className="mt-4 p-3 rounded-lg bg-secondary/50">
                <p className="text-sm font-medium">Divergence Gap: <span className="tabular-nums">{company.claimed - company.verified} points</span></p>
              </div>
            )}

            <AnimatePresence>
              {viewMode === "Detailed" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <p className="text-sm text-muted-foreground mt-4">{company.analysis}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35} className="flex justify-center">
          <IPhoneMockup>
            <div className="h-full p-4 bg-white text-gray-900 flex flex-col gap-3">
              <p className="pt-8 text-[10px] uppercase tracking-widest opacity-50 text-center">ESG Analysis</p>
              <p className="text-sm font-medium text-center">{company.name}</p>
              <div className="space-y-2 mt-2">
                {[
                  { l: "Claimed", v: company.claimed },
                  { l: "Verified", v: company.verified },
                ].map((item) => (
                  <div key={item.l} className="bg-gray-50 rounded-lg p-2">
                    <div className="flex justify-between text-[10px] mb-1">
                      <span>{item.l}</span><span>{item.v}</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-400" style={{ width: `${item.v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className={`text-center text-[10px] mt-auto ${riskColors[company.risk]}`}>
                Greenwashing Risk: {company.risk}
              </div>
            </div>
          </IPhoneMockup>
        </ScrollReveal>
      </div>
    </SectionLayout>
  );
};

export default ESGSection;
