import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import ESGScoreRing from "@/components/aurora/ESGScoreRing";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";
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

  const IOSToggle = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <div className="flex items-center justify-between py-1.5" onClick={(e) => e.stopPropagation()}>
      <span className="text-[10px]">{label}</span>
      <button onClick={(e) => { e.stopPropagation(); onChange(!checked); }}
        className={`w-8 h-4.5 rounded-full relative transition-colors ${checked ? "bg-emerald-400" : "bg-gray-300"}`}
        style={{ width: 32, height: 18 }}>
        <motion.div className="absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow"
          animate={{ left: checked ? 14 : 2 }} transition={{ duration: 0.15 }} style={{ width: 14, height: 14 }} />
      </button>
    </div>
  );

  return (
    <SectionLayout wash="cyan" id="preferences">
      <ScrollReveal><SectionLabel label="PREFERENCES" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="Your Rules." className="mb-4">Your Values. Your Rules.</GradientHeadline>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground mb-6 max-w-lg">Configure your investment filters in real time. Every toggle instantly recalculates your portfolio alignment.</p>
      </ScrollReveal>

      {/* Read-only summary */}
      <ScrollReveal delay={0.2}>
        <div className="flex items-center gap-8 mb-12">
          <ESGScoreRing score={score} size={120} strokeWidth={5} />
          <div className="space-y-2">
            <div><p className="text-xs text-muted-foreground">Compatibility</p><p className="text-2xl font-light tabular-nums">{compatibility}%</p></div>
            <div><p className="text-xs text-muted-foreground">Qualifying</p><p className="text-2xl font-light tabular-nums">{mockHoldings.length - excluded.length}/{mockHoldings.length}</p></div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full bg-white text-gray-900 flex flex-col overflow-y-auto">
            <div className="pt-10 px-3 pb-1">
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-center mb-2">Preferences</p>
              <div className="flex justify-center mb-2">
                <ESGScoreRing score={score} size={56} strokeWidth={3} />
              </div>
            </div>

            <div className="px-3 flex-1 space-y-0.5">
              {/* Exclusion toggles */}
              <p className="text-[9px] text-gray-400 uppercase tracking-wider mt-1">Exclusions</p>
              <IOSToggle label="🛢️ Fossil Fuel" checked={fossilFuel} onChange={setFossilFuel} />
              <IOSToggle label="🔫 Weapons & Defense" checked={weapons} onChange={setWeapons} />
              <IOSToggle label="🚬 Tobacco" checked={tobacco} onChange={setTobacco} />
              <IOSToggle label="🐇 Animal Testing" checked={animalTesting} onChange={setAnimalTesting} />
              <IOSToggle label="☪️ Shariah Compliant" checked={shariah} onChange={setShariah} />

              <div className="h-px bg-gray-100 my-1.5" />
              <p className="text-[9px] text-gray-400 uppercase tracking-wider">Thresholds</p>

              {/* Sliders */}
              <div onClick={(e) => e.stopPropagation()} className="space-y-2 py-1">
                <div>
                  <div className="flex justify-between text-[9px] mb-0.5"><span>Gender Diversity</span><span className="tabular-nums">{genderDiversity[0]}%</span></div>
                  <Slider value={genderDiversity} onValueChange={setGenderDiversity} min={0} max={100} step={5} className="w-full" />
                </div>
                <div>
                  <div className="flex justify-between text-[9px] mb-0.5"><span>Carbon Cap</span><span>{["Low", "Med", "High"][carbonCap[0]]}</span></div>
                  <Slider value={carbonCap} onValueChange={setCarbonCap} min={0} max={2} step={1} className="w-full" />
                </div>
                <div>
                  <div className="flex justify-between text-[9px] mb-0.5"><span>ESG Strictness</span><span className="tabular-nums">{strictness[0]}/10</span></div>
                  <Slider value={strictness} onValueChange={setStrictness} min={1} max={10} step={1} className="w-full" />
                </div>
              </div>

              <div className="h-px bg-gray-100 my-1.5" />
              <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">Philosophy</p>
              <FilterToggleGroup compact options={["Impact-First", "Balanced", "Returns-First"]} selected={philosophy} onChange={setPhilosophy} className="justify-center" />
            </div>

            {/* Bottom stats */}
            <div className="px-3 pb-3 pt-2 grid grid-cols-2 gap-1.5">
              <div className="bg-emerald-50 rounded-lg p-2 text-center border border-emerald-100">
                <p className="text-[8px] text-gray-500">Compatibility</p>
                <p className="text-sm font-medium text-emerald-600">{compatibility}%</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-2 text-center border border-amber-100">
                <p className="text-[8px] text-gray-500">Qualifying</p>
                <p className="text-sm font-medium text-amber-600">{mockHoldings.length - excluded.length}/{mockHoldings.length}</p>
              </div>
            </div>
          </div>
        </IPhoneMockup>
      </ScrollReveal>
    </SectionLayout>
  );
};

export default PreferencesSection;
