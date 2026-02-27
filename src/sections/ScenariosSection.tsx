import { useState, useMemo, useCallback } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, ReferenceDot } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";
import { Slider } from "@/components/ui/slider";

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

const pathwayColors = {
  "1.5\u00b0C": { stroke: "hsl(155 100% 75%)", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", label: "Paris Agreement Target", dot: "#4ade80" },
  "2\u00b0C": { stroke: "hsl(46 97% 64%)", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", label: "Moderate Warming", dot: "#fbbf24" },
  "3\u00b0C": { stroke: "hsl(0 80% 65%)", bg: "bg-red-50", border: "border-red-200", text: "text-red-700", label: "High-Risk Scenario", dot: "#f87171" },
};

/* ---------- Custom Recharts Tooltip ---------- */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl px-4 py-3 shadow-lg min-w-[160px]">
      <p className="text-xs font-medium text-foreground mb-2">Year {label}</p>
      {payload.map((entry: any) => {
        const key = entry.dataKey as keyof typeof pathwayColors;
        const color = pathwayColors[key];
        const startVal = 100000;
        const delta = ((entry.value - startVal) / startVal * 100).toFixed(1);
        return (
          <div key={entry.dataKey} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
              <span className="text-xs text-muted-foreground">{entry.dataKey}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium tabular-nums">${(entry.value / 1000).toFixed(0)}k</span>
              <span className={`text-[10px] ml-1 ${Number(delta) >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                {Number(delta) >= 0 ? "+" : ""}{delta}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ---------- Custom Active Dot ---------- */
const PulsingDot = (props: any) => {
  const { cx, cy, stroke } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill={stroke} opacity={0.2}>
        <animate attributeName="r" from="4" to="12" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={4} fill={stroke} stroke="white" strokeWidth={2} />
    </g>
  );
};

/* ---------- Annotation Card ---------- */
const AnnotationCard = ({ pathway, value, year }: { pathway: string; value: number; year: number }) => {
  const color = pathwayColors[pathway as keyof typeof pathwayColors];
  if (!color) return null;
  const delta = ((value - 100000) / 100000 * 100).toFixed(1);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      className={`${color.bg} ${color.border} border rounded-xl p-3 min-w-[140px]`}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className="w-2 h-2 rounded-full" style={{ background: color.dot }} />
        <span className={`text-[10px] font-semibold ${color.text}`}>{pathway}</span>
      </div>
      <p className="text-[9px] text-muted-foreground mb-1.5">{color.label}</p>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-semibold tabular-nums">${(value / 1000).toFixed(0)}k</span>
        <span className={`text-[10px] font-medium ${Number(delta) >= 0 ? "text-emerald-600" : "text-red-500"}`}>
          {Number(delta) >= 0 ? "+" : ""}{delta}%
        </span>
      </div>
      <p className="text-[8px] text-muted-foreground mt-1">Portfolio value in {year}</p>
    </motion.div>
  );
};

const ScenariosSection = () => {
  const [horizon, setHorizon] = useState([20]);
  const [pathways, setPathways] = useState({ "1.5\u00b0C": true, "2\u00b0C": true, "3\u00b0C": false });
  const [outlook, setOutlook] = useState("Base");
  const [showRisk, setShowRisk] = useState(false);
  const [valueType, setValueType] = useState("Nominal");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const outlookM = outlook === "Optimistic" ? 1.3 : outlook === "Pessimistic" ? 0.7 : 1;
  const inflAdj = valueType === "Real" ? 0.97 : 1;

  const data = useMemo(() => {
    const y = horizon[0];
    const p15 = generateProjection(y, 0.08 * outlookM * inflAdj, 0.04, 42);
    const p2 = generateProjection(y, 0.06 * outlookM * inflAdj, 0.06, 99);
    const p3 = generateProjection(y, 0.03 * outlookM * inflAdj, 0.08, 7);
    return p15.map((d, i) => ({ year: d.year, "1.5\u00b0C": d.value, "2\u00b0C": p2[i]?.value || 0, "3\u00b0C": p3[i]?.value || 0 }));
  }, [horizon, outlookM, inflAdj]);

  const togglePathway = (p: string) => setPathways((prev) => ({ ...prev, [p]: !prev[p as keyof typeof prev] }));

  const hoveredRow = hoveredIndex !== null ? data[hoveredIndex] : null;
  const displayRow = hoveredRow || data[data.length - 1];
  const displayYear = hoveredRow ? hoveredRow.year : data[data.length - 1]?.year;

  /* Milestone years for reference lines */
  const milestoneYears = useMemo(() => {
    const years = [2030, 2040, 2050].filter((y) => y >= 2025 && y <= 2025 + horizon[0]);
    return years;
  }, [horizon]);

  const handleChartMouseMove = useCallback((state: any) => {
    if (state?.activeTooltipIndex !== undefined) {
      setHoveredIndex(state.activeTooltipIndex);
    }
  }, []);

  const handleChartMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <SectionLayout wash="gold" id="projections">
      <ScrollReveal><SectionLabel label="PROJECTIONS" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="See Your Future" underline className="mb-4">See Your Future</GradientHeadline>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground mb-8 max-w-lg">Model your portfolio across climate scenarios. Hover over the chart to explore projections across 1.5C, 2C, and 3C pathways.</p>
      </ScrollReveal>

      {/* Desktop: side-by-side | Mobile: stacked */}
      <ScrollReveal delay={0.2}>
        <div className="grid lg:grid-cols-[1fr,auto] gap-8 lg:gap-12 items-start">
          {/* LEFT: Large Interactive Chart */}
          <div className="bg-card rounded-2xl border border-border p-6 relative overflow-hidden">
            {showRisk && <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-destructive/5 z-0" />}

            {/* Hovered Year Indicator */}
            <AnimatePresence>
              {hoveredRow && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute top-3 right-6 z-10"
                >
                  <span className="text-xs font-medium text-muted-foreground">Viewing: </span>
                  <span className="text-sm font-semibold gradient-text tabular-nums">{hoveredRow.year}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={data}
                onMouseMove={handleChartMouseMove}
                onMouseLeave={handleChartMouseLeave}
              >
                <defs>
                  <linearGradient id="g15" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(155 100% 80%)" stopOpacity={0.35} /><stop offset="100%" stopColor="hsl(155 100% 80%)" stopOpacity={0.02} /></linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(46 97% 64%)" stopOpacity={0.35} /><stop offset="100%" stopColor="hsl(46 97% 64%)" stopOpacity={0.02} /></linearGradient>
                  <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(0 80% 65%)" stopOpacity={0.2} /><stop offset="100%" stopColor="hsl(0 80% 65%)" stopOpacity={0} /></linearGradient>
                  <filter id="glow15"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                  <filter id="glow2"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>

                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 11 }}
                  stroke="hsl(var(--muted-foreground))"
                  tickLine={false}
                  axisLine={{ strokeWidth: 1, stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  tickLine={false}
                  axisLine={false}
                  width={55}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(var(--border))", strokeDasharray: "4 4" }} />

                {/* Milestone reference lines */}
                {milestoneYears.map((y) => (
                  <ReferenceLine
                    key={y}
                    x={y}
                    stroke="hsl(var(--border))"
                    strokeDasharray="3 6"
                    label={{ value: String(y), position: "top", fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                  />
                ))}

                {pathways["1.5\u00b0C"] && (
                  <Area
                    type="monotone"
                    dataKey="1.5\u00b0C"
                    stroke="hsl(155 100% 75%)"
                    fill="url(#g15)"
                    strokeWidth={hoveredIndex !== null ? 3 : 2}
                    activeDot={<PulsingDot />}
                    dot={false}
                    style={{ filter: hoveredIndex !== null ? "url(#glow15)" : "none", transition: "filter 0.3s" }}
                  />
                )}
                {pathways["2\u00b0C"] && (
                  <Area
                    type="monotone"
                    dataKey="2\u00b0C"
                    stroke="hsl(46 97% 64%)"
                    fill="url(#g2)"
                    strokeWidth={hoveredIndex !== null ? 3 : 2}
                    activeDot={<PulsingDot />}
                    dot={false}
                    style={{ filter: hoveredIndex !== null ? "url(#glow2)" : "none", transition: "filter 0.3s" }}
                  />
                )}
                {pathways["3\u00b0C"] && (
                  <Area
                    type="monotone"
                    dataKey="3\u00b0C"
                    stroke="hsl(0 80% 65%)"
                    fill="url(#g3)"
                    strokeWidth={hoveredIndex !== null ? 3 : 2}
                    activeDot={<PulsingDot />}
                    dot={false}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>

            {/* Annotation cards for 1.5 and 2 degree */}
            <div className="flex flex-wrap gap-3 mt-4">
              <AnimatePresence mode="wait">
                {pathways["1.5\u00b0C"] && (
                  <AnnotationCard
                    key={`15-${displayYear}`}
                    pathway="1.5\u00b0C"
                    value={(displayRow?.["1.5\u00b0C"] as number) || 0}
                    year={displayYear}
                  />
                )}
              </AnimatePresence>
              <AnimatePresence mode="wait">
                {pathways["2\u00b0C"] && (
                  <AnnotationCard
                    key={`2-${displayYear}`}
                    pathway="2\u00b0C"
                    value={(displayRow?.["2\u00b0C"] as number) || 0}
                    year={displayYear}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Synced Phone Mockup */}
          <div className="flex justify-center lg:sticky lg:top-24">
            <IPhoneMockup>
              <div className="h-full bg-white text-gray-900 flex flex-col">
                <div className="pt-10 px-3 pb-1">
                  <p className="text-[10px] uppercase tracking-widest opacity-50 text-center mb-1">Projections</p>

                  {/* Year indicator synced to hover */}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={displayYear}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="text-center text-lg font-semibold tabular-nums mb-1"
                      style={{ background: "linear-gradient(135deg, hsl(155 100% 75%), hsl(46 97% 64%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                    >
                      {displayYear}
                    </motion.p>
                  </AnimatePresence>

                  {/* Pathway chips */}
                  <div className="flex gap-1 justify-center mb-1" onClick={(e) => e.stopPropagation()}>
                    {(["1.5\u00b0C", "2\u00b0C", "3\u00b0C"] as const).map((p) => (
                      <button key={p} onClick={(e) => { e.stopPropagation(); togglePathway(p); }}
                        className={`text-[9px] px-2 py-0.5 rounded-full border transition-all ${
                          pathways[p] ? "bg-gray-50 border-gray-300 font-medium" : "border-gray-200 opacity-40"
                        }`}>
                        <span className="inline-block w-1.5 h-1.5 rounded-full mr-0.5" style={{
                          background: p === "1.5\u00b0C" ? "hsl(155 100% 75%)" : p === "2\u00b0C" ? "hsl(46 97% 64%)" : "hsl(0 80% 65%)"
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

                {/* Mini chart with hover sync cursor */}
                <div className="px-1 mt-1 relative" onClick={(e) => e.stopPropagation()}>
                  <ResponsiveContainer width="100%" height={100}>
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="mg15" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(155 100% 80%)" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(155 100% 80%)" stopOpacity={0} /></linearGradient>
                        <linearGradient id="mg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(46 97% 64%)" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(46 97% 64%)" stopOpacity={0} /></linearGradient>
                        <linearGradient id="mg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(0 80% 65%)" stopOpacity={0.2} /><stop offset="100%" stopColor="hsl(0 80% 65%)" stopOpacity={0} /></linearGradient>
                      </defs>
                      <XAxis dataKey="year" tick={{ fontSize: 7 }} stroke="#d1d5db" tickLine={false} axisLine={false} />
                      <YAxis hide />
                      {/* Synced cursor line from main chart hover */}
                      {hoveredRow && (
                        <ReferenceLine x={hoveredRow.year} stroke="hsl(155 100% 75%)" strokeDasharray="2 2" strokeWidth={1} />
                      )}
                      {pathways["1.5\u00b0C"] && <Area type="monotone" dataKey="1.5\u00b0C" stroke="hsl(155 100% 75%)" fill="url(#mg15)" strokeWidth={1.5} dot={false} />}
                      {pathways["2\u00b0C"] && <Area type="monotone" dataKey="2\u00b0C" stroke="hsl(46 97% 64%)" fill="url(#mg2)" strokeWidth={1.5} dot={false} />}
                      {pathways["3\u00b0C"] && <Area type="monotone" dataKey="3\u00b0C" stroke="hsl(0 80% 65%)" fill="url(#mg3)" strokeWidth={1.5} dot={false} />}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Projected values -- synced to hovered or final year */}
                <div className="px-3 pb-3 mt-auto space-y-1">
                  <p className="text-[8px] text-gray-400 text-center mb-0.5">
                    {hoveredRow ? `Projected at ${hoveredRow.year}` : `Final value at ${data[data.length - 1]?.year}`}
                  </p>
                  {Object.entries(pathways).filter(([_, on]) => on).map(([path]) => {
                    const val = (displayRow?.[path as keyof typeof displayRow] as number) || 0;
                    const pColor = pathwayColors[path as keyof typeof pathwayColors];
                    const delta = ((val - 100000) / 100000 * 100).toFixed(1);
                    return (
                      <motion.div
                        key={`${path}-${displayYear}`}
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 1 }}
                        className={`flex justify-between items-center rounded-lg p-2 border ${pColor.bg} ${pColor.border}`}
                      >
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: pColor.dot }} />
                          <span className="text-[10px] font-medium">{path}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] tabular-nums font-semibold">${(val / 1000).toFixed(0)}k</span>
                          <span className={`text-[9px] tabular-nums ${Number(delta) >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                            {Number(delta) >= 0 ? "+" : ""}{delta}%
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </IPhoneMockup>
          </div>
        </div>
      </ScrollReveal>
    </SectionLayout>
  );
};

export default ScenariosSection;
