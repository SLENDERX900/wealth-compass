import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";

const companies = [
  { name: "GreenTech Corp", claimed: 82, verified: 61, projected: 70, risk: "Moderate", industry: 65, analysis: "Marketing claims exceed verified metrics by 21 points. Carbon offset quality questioned." },
  { name: "CleanWater Inc", claimed: 91, verified: 88, projected: 90, risk: "Low", industry: 65, analysis: "Strong alignment. Water stewardship certifications are comprehensive." },
  { name: "PetroGlobal", claimed: 68, verified: 34, projected: 42, risk: "High", industry: 65, analysis: "Significant greenwashing risk. Claimed score inflated by 34 points." },
  { name: "SolarMax", claimed: 88, verified: 85, projected: 92, risk: "Low", industry: 65, analysis: "Near-complete alignment. Renewable generation verified by auditors." },
  { name: "FastFashion Co", claimed: 72, verified: 41, projected: 48, risk: "High", industry: 65, analysis: "Supply chain practices not independently verified." },
];

const riskColors: Record<string, string> = { Low: "#22c55e", Moderate: "#f59e0b", High: "#ef4444" };
const barColors = { claimed: "#22c55e", verified: "#eab308", projected: "#3b82f6", industry: "#9ca3af" };

const ESGSection = () => {
  const [company, setCompany] = useState(companies[0]);
  const [layers, setLayers] = useState({ claimed: true, verified: true, projected: false });
  const [viewMode, setViewMode] = useState("Simple");
  const [showRisk, setShowRisk] = useState(false);
  const [showIndustry, setShowIndustry] = useState(false);

  const toggleLayer = (l: "claimed" | "verified" | "projected") => setLayers((p) => ({ ...p, [l]: !p[l] }));

  return (
    <SectionLayout wash="cyan" id="transparency">
      <ScrollReveal><SectionLabel label="TRANSPARENCY" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="See Through the Noise" className="mb-4">See Through the Noise</GradientHeadline>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground mb-4 max-w-lg">Aurora's greenwashing detection engine compares claimed, verified, and projected ESG scores across independent auditors.</p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <p className="text-sm text-muted-foreground mb-12">Average divergence gap across monitored companies: <strong className="text-foreground">21 points</strong></p>
      </ScrollReveal>

      <ScrollReveal delay={0.3} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full bg-white text-gray-900 flex flex-col">
            <div className="pt-10 px-3 pb-1">
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-center mb-2">ESG Analysis</p>

              {/* Company picker */}
              <select value={company.name}
                onChange={(e) => { e.stopPropagation(); setCompany(companies.find((c) => c.name === e.target.value)!); }}
                onClick={(e) => e.stopPropagation()}
                className="w-full text-[10px] bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 mb-2">
                {companies.map((c) => <option key={c.name}>{c.name}</option>)}
              </select>

              {/* Layer chips */}
              <div className="flex gap-1 mb-1" onClick={(e) => e.stopPropagation()}>
                {(["claimed", "verified", "projected"] as const).map((l) => (
                  <button key={l} onClick={(e) => { e.stopPropagation(); toggleLayer(l); }}
                    className={`text-[8px] px-2 py-0.5 rounded-full border capitalize transition-all ${
                      layers[l] ? "border-gray-300 bg-gray-50" : "border-gray-200 opacity-40"
                    }`}>
                    <span className="inline-block w-1.5 h-1.5 rounded-full mr-0.5" style={{ background: barColors[l] }} />
                    {l}
                  </button>
                ))}
              </div>

              {/* View + toggles */}
              <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                <FilterToggleGroup compact options={["Simple", "Detailed"]} selected={viewMode} onChange={setViewMode} />
                <button onClick={(e) => { e.stopPropagation(); setShowRisk(!showRisk); }}
                  className={`text-[8px] px-2 py-0.5 rounded-full border ${showRisk ? "bg-red-50 border-red-200" : "border-gray-200"}`}>Risk</button>
                <button onClick={(e) => { e.stopPropagation(); setShowIndustry(!showIndustry); }}
                  className={`text-[8px] px-2 py-0.5 rounded-full border ${showIndustry ? "bg-gray-100 border-gray-300" : "border-gray-200"}`}>Avg</button>
              </div>
            </div>

            {/* Risk badge */}
            <div className="px-3 mt-2 flex items-center justify-between">
              <p className="text-[11px] font-medium">{company.name}</p>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${riskColors[company.risk]}20`, color: riskColors[company.risk] }}>
                {company.risk} Risk
              </span>
            </div>

            {/* Bars */}
            <div className="flex-1 px-3 mt-3 space-y-2">
              {[
                { key: "claimed" as const, label: "Claimed", value: company.claimed },
                { key: "verified" as const, label: "Verified", value: company.verified },
                { key: "projected" as const, label: "Projected", value: company.projected },
              ].map((bar) => (
                <AnimatePresence key={bar.key}>
                  {layers[bar.key] && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                      <div className="flex justify-between text-[9px] mb-0.5">
                        <span>{bar.label}</span><span className="tabular-nums">{bar.value}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden relative">
                        <motion.div className="h-full rounded-full" style={{ background: barColors[bar.key] }}
                          initial={{ width: 0 }} animate={{ width: `${bar.value}%` }} transition={{ duration: 0.6 }} />
                        {showRisk && company.risk === "High" && (
                          <div className="absolute inset-0 bg-red-500/10 rounded-full" />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
              {showIndustry && (
                <div>
                  <div className="flex justify-between text-[9px] mb-0.5"><span className="text-gray-400">Industry Avg</span><span className="tabular-nums text-gray-400">{company.industry}</span></div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gray-300" style={{ width: `${company.industry}%` }} />
                  </div>
                </div>
              )}

              {/* Divergence gap */}
              {layers.claimed && layers.verified && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2">
                  <p className="text-[10px] font-medium">Divergence Gap: <span className="tabular-nums">{company.claimed - company.verified} pts</span></p>
                </div>
              )}

              {/* Analysis */}
              <AnimatePresence>
                {viewMode === "Detailed" && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-[9px] text-gray-500 mt-1">{company.analysis}</motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </IPhoneMockup>
      </ScrollReveal>
    </SectionLayout>
  );
};

export default ESGSection;
