import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";
import { Slider } from "@/components/ui/slider";
import PhoneNavBar from "@/components/aurora/PhoneNavBar";

const generateProjection = (years: number, rate: number, volatility: number, seed: number) => {
  const data = [];
  let val = 100000;
  let r = seed;
  for (let i = 0; i <= years; i++) {
    data.push({ year: 2025 + i, value: Math.round(val) });
    r = (r * 9301 + 49297) % 233280;
    val *= 1 + rate + ((r / 233280) - 0.5) * volatility;
  }
  return data;
};

const ScenariosSection = () => {
  const [horizon, setHorizon] = useState([20]);
  const [pathways, setPathways] = useState({ "1.5°C": true, "2°C": true, "3°C": false });
  const [outlook, setOutlook] = useState("Base");
  const [showRisk, setShowRisk] = useState(false);
  const [valueType, setValueType] = useState("Nominal");
  const [activeNav, setActiveNav] = useState("invest");

  const outlookM = outlook === "Optimistic" ? 1.3 : outlook === "Pessimistic" ? 0.7 : 1;
  const inflAdj = valueType === "Real" ? 0.97 : 1;

  const data = useMemo(() => {
    const y = horizon[0];
    const p15 = generateProjection(y, 0.08 * outlookM * inflAdj, 0.04, 42);
    const p2 = generateProjection(y, 0.06 * outlookM * inflAdj, 0.06, 99);
    const p3 = generateProjection(y, 0.03 * outlookM * inflAdj, 0.08, 7);
    return p15.map((d, i) => ({ year: d.year, "1.5°C": d.value, "2°C": p2[i]?.value || 0, "3°C": p3[i]?.value || 0 }));
  }, [horizon, outlookM, inflAdj]);

  const togglePathway = (p: string) => setPathways((prev) => ({ ...prev, [p]: !prev[p as keyof typeof prev] }));

  const lastRow = data[data.length - 1];

  return (
    <SectionLayout wash="gold" id="projections">
      <ScrollReveal><SectionLabel label="PROJECTIONS" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="See Your Future" underline className="mb-4">See Your Future</GradientHeadline>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground mb-6 max-w-lg">Model your portfolio across climate scenarios. Compare 1.5°C, 2°C, and 3°C pathways over up to 30 years.</p>
      </ScrollReveal>

      {/* Read-only large chart */}
      <ScrollReveal delay={0.2}>
        <div className="bg-card rounded-2xl border border-border p-6 mb-12 relative overflow-hidden">
          {showRisk && <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-destructive/5 z-0" />}
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="g15" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(155 100% 80%)" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(155 100% 80%)" stopOpacity={0} /></linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(46 97% 64%)" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(46 97% 64%)" stopOpacity={0} /></linearGradient>
                <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(0 80% 65%)" stopOpacity={0.2} /><stop offset="100%" stopColor="hsl(0 80% 65%)" stopOpacity={0} /></linearGradient>
              </defs>
              <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              {pathways["1.5°C"] && <Area type="monotone" dataKey="1.5°C" stroke="hsl(155 100% 75%)" fill="url(#g15)" strokeWidth={2} />}
              {pathways["2°C"] && <Area type="monotone" dataKey="2°C" stroke="hsl(46 97% 64%)" fill="url(#g2)" strokeWidth={2} />}
              {pathways["3°C"] && <Area type="monotone" dataKey="3°C" stroke="hsl(0 80% 65%)" fill="url(#g3)" strokeWidth={2} />}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ScrollReveal>

      {/* Phone with ALL controls */}
      <ScrollReveal delay={0.3} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full bg-white text-gray-900 flex flex-col">
            {activeNav === "invest" ? (
              <>
            <div className="pt-10 px-3 pb-1">
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-center mb-2">Projections</p>

              {/* Pathway chips */}
              <div className="flex gap-1 justify-center mb-1" onClick={(e) => e.stopPropagation()}>
                {(["1.5°C", "2°C", "3°C"] as const).map((p) => (
                  <button key={p} onClick={(e) => { e.stopPropagation(); togglePathway(p); }}
                    className={`text-[9px] px-2 py-0.5 rounded-full border transition-all ${
                      pathways[p] ? "bg-gray-50 border-gray-300 font-medium" : "border-gray-200 opacity-40"
                    }`}>
                    <span className="inline-block w-1.5 h-1.5 rounded-full mr-0.5" style={{
                      background: p === "1.5°C" ? "hsl(155 100% 75%)" : p === "2°C" ? "hsl(46 97% 64%)" : "hsl(0 80% 65%)"
                    }} />
                    {p}
                  </button>
                ))}
              </div>

              {/* Outlook */}
              <FilterToggleGroup compact options={["Optimistic", "Base", "Pessimistic"]} selected={outlook} onChange={setOutlook} className="justify-center mb-1" />

              {/* Time horizon slider */}
              <div className="px-1" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between text-[8px] text-gray-400 mb-0.5"><span>Horizon</span><span>{horizon[0]}yr</span></div>
                <Slider value={horizon} onValueChange={setHorizon} min={5} max={30} step={5} />
              </div>

              {/* Toggles */}
              <div className="flex gap-1 mt-1 justify-center" onClick={(e) => e.stopPropagation()}>
                <FilterToggleGroup compact options={["Nominal", "Real"]} selected={valueType} onChange={setValueType} />
                <button onClick={(e) => { e.stopPropagation(); setShowRisk(!showRisk); }}
                  className={`text-[8px] px-2 py-0.5 rounded-full border ${showRisk ? "bg-red-50 border-red-200" : "border-gray-200"}`}>
                  Risk
                </button>
              </div>
            </div>

            {/* Mini chart */}
            <div className="px-1 mt-1" onClick={(e) => e.stopPropagation()}>
              <ResponsiveContainer width="100%" height={110}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="mg15" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(155 100% 80%)" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(155 100% 80%)" stopOpacity={0} /></linearGradient>
                    <linearGradient id="mg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(46 97% 64%)" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(46 97% 64%)" stopOpacity={0} /></linearGradient>
                    <linearGradient id="mg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(0 80% 65%)" stopOpacity={0.2} /><stop offset="100%" stopColor="hsl(0 80% 65%)" stopOpacity={0} /></linearGradient>
                  </defs>
                  <XAxis dataKey="year" tick={{ fontSize: 7 }} stroke="#d1d5db" tickLine={false} axisLine={false} />
                  <YAxis hide />
                  {pathways["1.5°C"] && <Area type="monotone" dataKey="1.5°C" stroke="hsl(155 100% 75%)" fill="url(#mg15)" strokeWidth={1.5} />}
                  {pathways["2°C"] && <Area type="monotone" dataKey="2°C" stroke="hsl(46 97% 64%)" fill="url(#mg2)" strokeWidth={1.5} />}
                  {pathways["3°C"] && <Area type="monotone" dataKey="3°C" stroke="hsl(0 80% 65%)" fill="url(#mg3)" strokeWidth={1.5} />}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Projected values */}
            <div className="px-3 pb-3 mt-auto space-y-1">
              {Object.entries(pathways).filter(([_, on]) => on).map(([path]) => {
                const val = lastRow?.[path as keyof typeof lastRow] as number || 0;
                const color = path === "1.5°C" ? "bg-emerald-50 border-emerald-200" : path === "2°C" ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";
                return (
                  <div key={path} className={`flex justify-between items-center rounded-lg p-2 border ${color}`}>
                    <span className="text-[10px] font-medium">{path}</span>
                    <span className="text-[11px] tabular-nums font-medium">${(val / 1000).toFixed(0)}k</span>
                  </div>
                );
              })}
            </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center pt-10">
                <p className="text-[11px] text-gray-400 capitalize">{activeNav} screen</p>
              </div>
            )}
            <PhoneNavBar activeTab={activeNav} onTabChange={setActiveNav} />
          </div>
        </IPhoneMockup>
      </ScrollReveal>
    </SectionLayout>
  );
};

export default ScenariosSection;
