import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";

const holdings = [
  { name: "Tesla Inc", provider: "Syfe", class: "Equities", esg: "A", value: 42000, return: 12.4 },
  { name: "SG Green Bond", provider: "DBS", class: "Bonds", esg: "A+", value: 35000, return: 4.2 },
  { name: "Vanguard ESG", provider: "Tiger", class: "ETFs", esg: "B+", value: 28000, return: 8.7 },
  { name: "CleanTech Fund", provider: "StashAway", class: "Alts", esg: "A", value: 22000, return: 15.1 },
  { name: "Asia Sustainable", provider: "Syfe", class: "Equities", esg: "B", value: 18000, return: 6.3 },
  { name: "SG REIT Green", provider: "DBS", class: "REITs", esg: "B+", value: 15000, return: 5.8 },
];

const providers = ["Syfe", "StashAway", "DBS", "Tiger"];
const COLORS = ["hsl(155 100% 75%)", "hsl(46 97% 64%)", "hsl(200 80% 70%)", "hsl(280 60% 70%)", "hsl(20 80% 65%)", "hsl(340 70% 70%)"];
const esgColors: Record<string, string> = { "A+": "#22c55e", A: "#4ade80", "B+": "#facc15", B: "#fb923c" };

const PortfolioSection = () => {
  const [activeProviders, setActiveProviders] = useState<string[]>([...providers]);
  const [groupBy, setGroupBy] = useState("Provider");
  const [showESG, setShowESG] = useState(true);

  const toggleProvider = (p: string) => {
    setActiveProviders((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
  };

  const filtered = holdings.filter((h) => activeProviders.includes(h.provider));
  const total = filtered.reduce((s, h) => s + h.value, 0);

  const chartData = useMemo(() => {
    const key = groupBy === "Provider" ? "provider" : groupBy === "Asset" ? "class" : "esg";
    const groups: Record<string, number> = {};
    filtered.forEach((h) => { groups[h[key as keyof typeof h] as string] = (groups[h[key as keyof typeof h] as string] || 0) + h.value; });
    return Object.entries(groups).map(([name, value]) => ({ name, value }));
  }, [filtered, groupBy]);

  return (
    <SectionLayout id="portfolio">
      <ScrollReveal><SectionLabel label="PORTFOLIO" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="One View." underline className="mb-4">All Your Wealth. One View.</GradientHeadline>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground mb-4 max-w-lg">Aggregate holdings across Syfe, StashAway, DBS, Tiger Brokers — and score them all for ESG alignment.</p>
      </ScrollReveal>

      {/* Read-only total */}
      <ScrollReveal delay={0.2}>
        <p className="text-3xl font-light mb-12">${total.toLocaleString()} <span className="text-sm text-muted-foreground">total portfolio</span></p>
      </ScrollReveal>

      <ScrollReveal delay={0.3} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full bg-white text-gray-900 flex flex-col">
            <div className="pt-10 px-3 pb-1">
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-center mb-2">Portfolio</p>

              {/* Provider tabs */}
              <div className="flex gap-0.5 overflow-x-auto pb-1" onClick={(e) => e.stopPropagation()}>
                {providers.map((p) => (
                  <button key={p} onClick={(e) => { e.stopPropagation(); toggleProvider(p); }}
                    className={`flex-shrink-0 text-[9px] px-2 py-1 rounded-lg border transition-all ${
                      activeProviders.includes(p) ? "bg-gray-50 border-gray-300 font-medium" : "border-gray-200 opacity-40"
                    }`}>{p}</button>
                ))}
              </div>

              {/* Grouping */}
              <FilterToggleGroup compact options={["Provider", "Asset", "ESG"]} selected={groupBy} onChange={setGroupBy} className="mt-1 justify-center" />
            </div>

            {/* Mini pie */}
            <div className="px-3" onClick={(e) => e.stopPropagation()}>
              <ResponsiveContainer width="100%" height={100}>
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={28} outerRadius={45} dataKey="value" strokeWidth={2} stroke="#fff">
                    {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Legend */}
              <div className="flex flex-wrap gap-1 justify-center mb-1">
                {chartData.map((d, i) => (
                  <span key={d.name} className="text-[8px] flex items-center gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                    {d.name}
                  </span>
                ))}
              </div>
            </div>

            {/* ESG toggle */}
            <div className="px-3 mb-1" onClick={(e) => e.stopPropagation()}>
              <button onClick={(e) => { e.stopPropagation(); setShowESG(!showESG); }}
                className={`text-[8px] px-2 py-0.5 rounded-full border transition-all ${showESG ? "bg-emerald-50 border-emerald-200" : "border-gray-200"}`}>
                {showESG ? "🟢" : "○"} ESG Badges
              </button>
            </div>

            {/* Holdings list */}
            <div className="flex-1 px-3 pb-3 overflow-y-auto space-y-1">
              {filtered.map((h) => (
                <div key={h.name} className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
                  <div className="flex items-center gap-1.5">
                    {showESG && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: esgColors[h.esg] || "#ccc" }} />}
                    <div>
                      <p className="text-[10px] font-medium">{h.name}</p>
                      <p className="text-[8px] text-gray-400">{h.class} · {h.provider}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] tabular-nums">${(h.value / 1000).toFixed(0)}k</p>
                    <p className="text-[8px] text-emerald-500">+{h.return}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </IPhoneMockup>
      </ScrollReveal>
    </SectionLayout>
  );
};

export default PortfolioSection;
