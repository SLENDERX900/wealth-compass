import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";

const holdings = [
  { name: "Tesla Inc", provider: "Syfe", class: "Equities", esg: "A", value: 42000, return: 12.4, risk: "Medium" },
  { name: "Singapore Green Bond", provider: "DBS Vickers", class: "Bonds", esg: "A+", value: 35000, return: 4.2, risk: "Low" },
  { name: "Vanguard ESG ETF", provider: "Tiger Brokers", class: "ETFs", esg: "B+", value: 28000, return: 8.7, risk: "Low" },
  { name: "CleanTech Fund", provider: "StashAway", class: "Alternatives", esg: "A", value: 22000, return: 15.1, risk: "High" },
  { name: "Asia Sustainable Equity", provider: "Syfe", class: "Equities", esg: "B", value: 18000, return: 6.3, risk: "Medium" },
  { name: "SG REIT Green", provider: "DBS Vickers", class: "REITs", esg: "B+", value: 15000, return: 5.8, risk: "Medium" },
];

const providers = ["Syfe", "StashAway", "DBS Vickers", "Tiger Brokers"];
const COLORS = ["hsl(155 100% 75%)", "hsl(46 97% 64%)", "hsl(200 80% 70%)", "hsl(280 60% 70%)", "hsl(20 80% 65%)", "hsl(340 70% 70%)"];
const esgColors: Record<string, string> = { "A+": "#22c55e", A: "#4ade80", "B+": "#facc15", B: "#fb923c", C: "#ef4444" };

const PortfolioSection = () => {
  const [activeProviders, setActiveProviders] = useState<string[]>([...providers]);
  const [groupBy, setGroupBy] = useState("By Provider");
  const [sortBy, setSortBy] = useState("Financial Return");
  const [showESG, setShowESG] = useState(true);

  const toggleProvider = (p: string) => {
    setActiveProviders((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
  };

  const filtered = holdings.filter((h) => activeProviders.includes(h.provider));

  const chartData = useMemo(() => {
    const key = groupBy === "By Provider" ? "provider" : groupBy === "By Asset Class" ? "class" : "esg";
    const groups: Record<string, number> = {};
    filtered.forEach((h) => { groups[h[key as keyof typeof h] as string] = (groups[h[key as keyof typeof h] as string] || 0) + h.value; });
    return Object.entries(groups).map(([name, value]) => ({ name, value }));
  }, [filtered, groupBy]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "Financial Return") return b.return - a.return;
      if (sortBy === "ESG Score") return a.esg.localeCompare(b.esg);
      return a.risk.localeCompare(b.risk);
    });
  }, [filtered, sortBy]);

  return (
    <SectionLayout id="portfolio">
      <ScrollReveal><SectionLabel label="PORTFOLIO" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="One View." underline className="mb-4">All Your Wealth. One View.</GradientHeadline>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap gap-2 mb-4">
          {providers.map((p) => (
            <button key={p} onClick={() => toggleProvider(p)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200
                ${activeProviders.includes(p) ? "border-aurora-cyan/40 bg-aurora-cyan/10 text-foreground" : "border-border text-muted-foreground opacity-50"}`}
            >{p}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mb-8">
          <FilterToggleGroup options={["By Provider", "By Asset Class", "By ESG Rating"]} selected={groupBy} onChange={setGroupBy} />
          <FilterToggleGroup options={["Financial Return", "ESG Score", "Risk Level"]} selected={sortBy} onChange={setSortBy} />
          <button onClick={() => setShowESG(!showESG)}
            className={`px-4 py-1.5 rounded-full text-sm transition-all ${showESG ? "bg-aurora-cyan/15 text-foreground" : "text-muted-foreground"}`}
          >{showESG ? "Hide" : "Show"} ESG Badges</button>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <ScrollReveal delay={0.25}>
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value" strokeWidth={2} stroke="hsl(var(--background))">
                  {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full space-y-1 mt-4">
              {sorted.map((h) => (
                <div key={h.name} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-secondary/50 transition-colors text-sm">
                  <div className="flex items-center gap-2">
                    {showESG && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: esgColors[h.esg] }} />}
                    <span>{h.name}</span>
                  </div>
                  <span className="tabular-nums text-muted-foreground">${h.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35} className="flex justify-center">
          <IPhoneMockup>
            <div className="h-full p-4 bg-white text-gray-900 flex flex-col gap-2">
              <p className="pt-8 text-[10px] uppercase tracking-widest opacity-50 text-center">Portfolio</p>
              <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5 overflow-x-auto">
                {activeProviders.map((p) => (
                  <button key={p} className="flex-shrink-0 text-[9px] px-2 py-1 rounded-md bg-white shadow-sm">{p}</button>
                ))}
              </div>
              <div className="flex-1 space-y-1 mt-2">
                {sorted.slice(0, 4).map((h) => (
                  <div key={h.name} className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
                    <div>
                      <p className="text-[10px] font-medium">{h.name}</p>
                      <p className="text-[9px] text-gray-400">{h.class}</p>
                    </div>
                    <span className="text-[10px] tabular-nums">{h.return > 0 ? "+" : ""}{h.return}%</span>
                  </div>
                ))}
              </div>
            </div>
          </IPhoneMockup>
        </ScrollReveal>
      </div>
    </SectionLayout>
  );
};

export default PortfolioSection;
