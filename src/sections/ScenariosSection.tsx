import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";
import { Slider } from "@/components/ui/slider";

const generateProjection = (years: number, rate: number, volatility: number) => {
  const data = [];
  let val = 100000;
  for (let i = 0; i <= years; i++) {
    data.push({ year: 2025 + i, value: Math.round(val) });
    val *= 1 + rate + (Math.random() - 0.5) * volatility;
  }
  return data;
};

const ScenariosSection = () => {
  const [horizon, setHorizon] = useState([20]);
  const [pathways, setPathways] = useState({ "1.5°C": true, "2°C": true, "3°C": false });
  const [outlook, setOutlook] = useState("Base Case");
  const [showRisk, setShowRisk] = useState(false);
  const [showOpportunity, setShowOpportunity] = useState(false);
  const [includeCarbonTax, setIncludeCarbonTax] = useState(false);
  const [valueType, setValueType] = useState("Nominal");

  const outlookMultiplier = outlook === "Optimistic" ? 1.3 : outlook === "Pessimistic" ? 0.7 : 1;
  const inflationAdj = valueType === "Inflation-Adjusted" ? 0.97 : 1;
  const carbonAdj = includeCarbonTax ? 0.98 : 1;

  const data = useMemo(() => {
    const years = horizon[0];
    const p15 = generateProjection(years, 0.08 * outlookMultiplier * inflationAdj * carbonAdj, 0.04);
    const p2 = generateProjection(years, 0.06 * outlookMultiplier * inflationAdj * carbonAdj, 0.06);
    const p3 = generateProjection(years, 0.03 * outlookMultiplier * inflationAdj * carbonAdj, 0.08);

    return p15.map((d, i) => ({
      year: d.year,
      "1.5°C": d.value,
      "2°C": p2[i]?.value || 0,
      "3°C": p3[i]?.value || 0,
    }));
  }, [horizon, outlookMultiplier, inflationAdj, carbonAdj]);

  const togglePathway = (p: string) => {
    setPathways((prev) => ({ ...prev, [p]: !prev[p as keyof typeof prev] }));
  };

  return (
    <SectionLayout wash="gold" id="projections">
      <ScrollReveal><SectionLabel label="PROJECTIONS" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="See Your Future" underline className="mb-4">See Your Future</GradientHeadline>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex gap-2">
            {["1.5°C", "2°C", "3°C"].map((p) => (
              <button key={p} onClick={() => togglePathway(p)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${pathways[p as keyof typeof pathways] ? "bg-aurora-cyan/15 text-foreground" : "text-muted-foreground"}`}
              >{p}</button>
            ))}
          </div>
          <FilterToggleGroup options={["Optimistic", "Base Case", "Pessimistic"]} selected={outlook} onChange={setOutlook} />
          <FilterToggleGroup options={["Nominal", "Inflation-Adjusted"]} selected={valueType} onChange={setValueType} />
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setShowRisk(!showRisk)} className={`px-3 py-1.5 rounded-full text-sm transition-all ${showRisk ? "bg-red-500/15 text-foreground" : "text-muted-foreground"}`}>Stranded Asset Risk</button>
          <button onClick={() => setShowOpportunity(!showOpportunity)} className={`px-3 py-1.5 rounded-full text-sm transition-all ${showOpportunity ? "bg-emerald-500/15 text-foreground" : "text-muted-foreground"}`}>Transition Opportunities</button>
          <button onClick={() => setIncludeCarbonTax(!includeCarbonTax)} className={`px-3 py-1.5 rounded-full text-sm transition-all ${includeCarbonTax ? "bg-aurora-gold/15 text-foreground" : "text-muted-foreground"}`}>Carbon Tax Impact</button>
        </div>
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2"><span>Time Horizon</span><span className="tabular-nums">{horizon[0]} years</span></div>
          <Slider value={horizon} onValueChange={setHorizon} min={5} max={30} step={5} />
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-3 gap-8">
        <ScrollReveal delay={0.3} className="lg:col-span-2">
          <div className="bg-card rounded-2xl border border-border p-6 relative overflow-hidden">
            {showRisk && <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-red-500/5 z-0" />}
            {showOpportunity && <div className="absolute left-1/4 top-0 bottom-0 w-1/4 bg-emerald-500/5 z-0" />}
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="grad15" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(155 100% 80%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(155 100% 80%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(46 97% 64%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(46 97% 64%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="grad3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0 80% 65%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(0 80% 65%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                {pathways["1.5°C"] && <Area type="monotone" dataKey="1.5°C" stroke="hsl(155 100% 75%)" fill="url(#grad15)" strokeWidth={2} />}
                {pathways["2°C"] && <Area type="monotone" dataKey="2°C" stroke="hsl(46 97% 64%)" fill="url(#grad2)" strokeWidth={2} />}
                {pathways["3°C"] && <Area type="monotone" dataKey="3°C" stroke="hsl(0 80% 65%)" fill="url(#grad3)" strokeWidth={2} />}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4} className="flex justify-center">
          <IPhoneMockup>
            <div className="h-full p-4 bg-white text-gray-900 flex flex-col gap-3">
              <p className="pt-8 text-[10px] uppercase tracking-widest opacity-50 text-center">Projections</p>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-lg font-light">{horizon[0]}-Year Outlook</p>
                <p className="text-[10px] text-gray-500">{outlook}</p>
              </div>
              <div className="flex-1 space-y-2 mt-2">
                {Object.entries(pathways).filter(([_, on]) => on).map(([path]) => {
                  const lastVal = data[data.length - 1]?.[path as keyof (typeof data)[0]] as number || 0;
                  return (
                    <div key={path} className="bg-gray-50 rounded-lg p-2 flex justify-between text-[11px]">
                      <span>{path} Pathway</span>
                      <span className="tabular-nums">${(lastVal / 1000).toFixed(0)}k</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </IPhoneMockup>
        </ScrollReveal>
      </div>
    </SectionLayout>
  );
};

export default ScenariosSection;
