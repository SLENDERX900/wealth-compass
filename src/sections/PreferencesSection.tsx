import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import ESGScoreRing from "@/components/aurora/ESGScoreRing";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

const mockHoldings = [
  { name: "ExxonMobil", tags: ["fossil"], esg: 32 },
  { name: "BAE Systems", tags: ["weapons"], esg: 41 },
  { name: "Philip Morris", tags: ["tobacco"], esg: 28 },
  { name: "Johnson & Johnson", tags: ["animal-testing"], esg: 55 },
  { name: "Tesla Inc", tags: [], esg: 82 },
  { name: "Vanguard ESG ETF", tags: [], esg: 78 },
  { name: "CleanWater Inc", tags: [], esg: 91 },
  { name: "SG Green Bond", tags: [], esg: 88 },
  { name: "FastFashion Co", tags: ["animal-testing"], esg: 38 },
  { name: "SolarMax Energy", tags: [], esg: 85 },
];

const PreferencesSection = () => {
  const [fossilFuel, setFossilFuel] = useState(false);
  const [weapons, setWeapons] = useState(false);
  const [tobacco, setTobacco] = useState(false);
  const [animalTesting, setAnimalTesting] = useState(false);
  const [shariah, setShariah] = useState(false);
  const [genderDiversity, setGenderDiversity] = useState([50]);
  const [carbonCap, setCarbonCap] = useState([1]);
  const [strictness, setStrictness] = useState([5]);
  const [philosophy, setPhilosophy] = useState("Balanced");

  const { score, compatibility, excluded } = useMemo(() => {
    let base = 72;
    const excl: string[] = [];

    mockHoldings.forEach((h) => {
      if (fossilFuel && h.tags.includes("fossil")) excl.push(h.name);
      if (weapons && h.tags.includes("weapons")) excl.push(h.name);
      if (tobacco && h.tags.includes("tobacco")) excl.push(h.name);
      if (animalTesting && h.tags.includes("animal-testing")) excl.push(h.name);
      if (h.esg < strictness[0] * 10) excl.push(h.name);
    });

    const uniqueExcl = [...new Set(excl)];
    base += (fossilFuel ? 4 : 0) + (weapons ? 3 : 0) + (tobacco ? 3 : 0) + (animalTesting ? 2 : 0);
    base += Math.floor(genderDiversity[0] / 25);
    base += (3 - carbonCap[0]) * 2;
    base += philosophy === "Impact-First" ? 5 : philosophy === "Returns-First" ? -3 : 0;
    base = Math.min(98, Math.max(40, base));

    const compat = Math.round(((mockHoldings.length - uniqueExcl.length) / mockHoldings.length) * 100);
    return { score: base, compatibility: compat, excluded: uniqueExcl };
  }, [fossilFuel, weapons, tobacco, animalTesting, genderDiversity, carbonCap, strictness, philosophy, shariah]);

  const Toggle = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );

  return (
    <SectionLayout wash="cyan" id="preferences">
      <ScrollReveal><SectionLabel label="PREFERENCES" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="Your Rules." className="mb-4">Your Values. Your Rules.</GradientHeadline>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground mb-8 max-w-lg">Configure your investment filters in real time. Every toggle instantly recalculates your portfolio alignment.</p>
      </ScrollReveal>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <ScrollReveal delay={0.2} className="lg:col-span-2">
          <div className="bg-card rounded-2xl border border-border p-6 space-y-1">
            <h3 className="text-sm font-medium mb-4">Exclusion Filters</h3>
            <Toggle label="Fossil Fuel Exclusion" checked={fossilFuel} onChange={setFossilFuel} />
            <Toggle label="Weapons & Defense Exclusion" checked={weapons} onChange={setWeapons} />
            <Toggle label="Tobacco Exclusion" checked={tobacco} onChange={setTobacco} />
            <Toggle label="Animal Testing Exclusion" checked={animalTesting} onChange={setAnimalTesting} />
            <Toggle label="Shariah Compliant" checked={shariah} onChange={setShariah} />

            <div className="border-t border-border my-4" />
            <h3 className="text-sm font-medium mb-4">Thresholds</h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2"><span>Gender Diversity</span><span className="tabular-nums">{genderDiversity[0]}%</span></div>
                <Slider value={genderDiversity} onValueChange={setGenderDiversity} min={0} max={100} step={5} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2"><span>Carbon Intensity Cap</span><span>{["Low", "Medium", "High"][carbonCap[0]]}</span></div>
                <Slider value={carbonCap} onValueChange={setCarbonCap} min={0} max={2} step={1} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2"><span>ESG Strictness Level</span><span className="tabular-nums">{strictness[0]}/10</span></div>
                <Slider value={strictness} onValueChange={setStrictness} min={1} max={10} step={1} />
              </div>
            </div>

            <div className="border-t border-border my-4" />
            <h3 className="text-sm font-medium mb-3">Investment Philosophy</h3>
            <FilterToggleGroup options={["Impact-First", "Balanced", "Returns-First"]} selected={philosophy} onChange={setPhilosophy} />
          </div>

          {/* Holdings affected */}
          <AnimatePresence>
            {excluded.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 overflow-hidden">
                <div className="bg-card rounded-xl border border-border p-4">
                  <p className="text-sm font-medium mb-2">Holdings Excluded ({excluded.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {excluded.map((name) => (
                      <motion.span key={name} className="text-xs px-2 py-1 rounded-full bg-destructive/10 text-destructive"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        {name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>

        {/* Right side: score + mockup */}
        <ScrollReveal delay={0.3} className="flex flex-col items-center gap-6">
          <div className="bg-card rounded-2xl border border-border p-6 w-full text-center">
            <p className="text-sm text-muted-foreground mb-3">Live ESG Score</p>
            <ESGScoreRing score={score} size={140} strokeWidth={6} />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Compatibility</p>
                <p className="text-xl font-light tabular-nums">{compatibility}%</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Qualifying</p>
                <p className="text-xl font-light tabular-nums">{mockHoldings.length - excluded.length}/{mockHoldings.length}</p>
              </div>
            </div>
          </div>

          <IPhoneMockup>
            <div className="h-full p-4 bg-white text-gray-900 flex flex-col gap-2">
              <p className="pt-8 text-[10px] uppercase tracking-widest opacity-50 text-center">Preferences</p>
              <div className="flex justify-center my-2">
                <ESGScoreRing score={score} size={64} strokeWidth={3} />
              </div>
              <div className="space-y-1 text-[10px]">
                {[
                  ["Fossil Fuel", fossilFuel],
                  ["Weapons", weapons],
                  ["Tobacco", tobacco],
                  ["Animal Testing", animalTesting],
                ].map(([label, val]) => (
                  <div key={label as string} className="flex justify-between bg-gray-50 rounded-lg p-2">
                    <span>{label as string}</span>
                    <span className={val ? "text-emerald-500" : "text-gray-400"}>{val ? "ON" : "OFF"}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto text-center text-[10px] text-gray-400">{philosophy} Mode</div>
            </div>
          </IPhoneMockup>
        </ScrollReveal>
      </div>
    </SectionLayout>
  );
};

export default PreferencesSection;
