import { useState } from "react";
import { Wallet, BarChart2, ArrowRightLeft, Lightbulb, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import ESGScoreRing from "@/components/aurora/ESGScoreRing";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";

const HeroSection = () => {
  const [appTheme, setAppTheme] = useState<"light" | "dark">("light");
  const [viewMode, setViewMode] = useState<"detailed" | "compact">("detailed");
  const [activeScreen, setActiveScreen] = useState("portfolio");
  const [timeRange, setTimeRange] = useState("1D");

  const dark = appTheme === "dark";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 40% 50%, hsla(155,100%,80%,0.08) 0%, transparent 70%)"
      }} />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — editorial */}
          <div>
            <ScrollReveal>
              <SectionLabel label="AURORA · SUSTAINABLE WEALTH" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <GradientHeadline highlight="Personalized." className="mb-6">
                Simple. Powerful. Personalized.
              </GradientHeadline>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed mb-4">
                Navigate your financial life with conviction. Sustainable investing, simplified for Singapore's next generation.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="text-sm text-muted-foreground/70 max-w-md">
                Tap the phone to explore Aurora's dashboard — toggle themes, switch views, and interact with real-time portfolio data.
              </p>
            </ScrollReveal>
          </div>

          {/* Right — iPhone mockup with ALL controls inside */}
          <ScrollReveal delay={0.3} className="flex justify-center lg:justify-end">
            <IPhoneMockup>
              <div className={`h-full flex flex-col transition-colors duration-300 ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
                {/* Status bar area */}
                <div className="pt-10 px-4 pb-2">
                  {/* Theme & View toggles */}
                  <div className="flex gap-2 mb-3" onClick={(e) => e.stopPropagation()}>
                    <FilterToggleGroup compact
                      options={["Light", "Dark"]}
                      selected={appTheme === "light" ? "Light" : "Dark"}
                      onChange={(v) => setAppTheme(v === "Light" ? "light" : "dark")}
                    />
                    <FilterToggleGroup compact
                      options={["Detailed", "Compact"]}
                      selected={viewMode === "detailed" ? "Detailed" : "Compact"}
                      onChange={(v) => setViewMode(v === "Detailed" ? "detailed" : "compact")}
                    />
                  </div>

                  {/* Portfolio Headers */}
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest opacity-50">Portfolio Value</p>
                      <p className="text-2xl font-light mt-0.5">$284,520</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-emerald-500 font-medium flex items-center justify-end gap-1">
                        <TrendingUp size={12} /> +2.4%
                      </p>
                      <p className="text-[10px] opacity-60">+$6,828 {timeRange}</p>
                    </div>
                  </div>

                  {/* NEW: Safe Time Range Selector */}
                  <div className="flex justify-between gap-1 mb-3" onClick={(e) => e.stopPropagation()}>
                    {["1D", "1W", "1M", "YTD", "ALL"].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`flex-1 text-[9px] py-1.5 rounded-md font-medium transition-colors ${
                          timeRange === range 
                            ? (dark ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900") 
                            : (dark ? "text-gray-400" : "text-gray-500")
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>

                  {/* Mini sparkline */}
                  <svg viewBox="0 0 120 24" className="w-full h-6 mb-1">
                    <polyline
                      points="0,18 15,16 30,14 45,17 60,12 75,10 90,8 105,11 120,6"
                      fill="none"
                      stroke="hsl(155 100% 75%)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(155 100% 75%)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="hsl(155 100% 75%)" stopOpacity="0" />
                    </linearGradient>
                    <polygon
                      points="0,18 15,16 30,14 45,17 60,12 75,10 90,8 105,11 120,6 120,24 0,24"
                      fill="url(#spark-grad)"
                    />
                  </svg>
                </div>

                {/* ESG Ring */}
                <div className="flex justify-center my-2">
                  <ESGScoreRing score={78} size={72} strokeWidth={4} />
                </div>

                {/* Holdings */}
                <div className="flex-1 px-3 overflow-hidden">
                  {viewMode === "detailed" ? (
                    <div className="space-y-1.5">
                      {[
                        ["Equities", "$142,260", "+3.1%", "hsl(155 100% 75%)"],
                        ["Bonds", "$85,356", "+0.8%", "hsl(46 97% 64%)"],
                        ["Alternatives", "$56,904", "+1.9%", "hsl(200 80% 70%)"],
                      ].map(([name, val, change, color]) => (
                        <div key={name} className={`flex justify-between items-center text-[11px] py-2 px-3 rounded-xl border ${dark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-100"}`}>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                            <span className="font-medium">{name}</span>
                          </div>
                          <span className="tabular-nums">{val} <span className="text-emerald-500 ml-1">{change}</span></span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        ["EQ", "+3.1%", "hsl(155 100% 75%)"],
                        ["BD", "+0.8%", "hsl(46 97% 64%)"],
                        ["ALT", "+1.9%", "hsl(200 80% 70%)"],
                      ].map(([label, val, color]) => (
                        <div key={label} className={`text-[10px] py-2.5 rounded-xl text-center border ${dark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-100"}`}>
                          <div className="w-1.5 h-1.5 rounded-full mx-auto mb-1" style={{ background: color }} />
                          <p className="font-medium">{label}</p>
                          <p className="text-emerald-500">{val}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom tab bar - SAFE implementation */}
                <div className="flex gap-1 px-3 pb-4 pt-2 border-t border-gray-200/20">
                  {[
                    { id: "portfolio", label: "Portfolio", icon: <Wallet size={16} strokeWidth={2} /> },
                    { id: "invest", label: "Invest", icon: <BarChart2 size={16} strokeWidth={2} /> },
                    { id: "transfer", label: "Transfer", icon: <ArrowRightLeft size={16} strokeWidth={2} /> },
                    { id: "insights", label: "Insights", icon: <Lightbulb size={16} strokeWidth={2} /> },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={(e) => { e.stopPropagation(); setActiveScreen(btn.id); }}
                      className={`flex-1 py-2 rounded-xl transition-all flex flex-col items-center gap-1 ${
                        activeScreen === btn.id
                          ? (dark ? "text-emerald-400" : "text-emerald-600")
                          : (dark ? "text-gray-400 hover:text-gray-300" : "text-gray-400 hover:text-gray-600")
                      }`}
                      style={activeScreen === btn.id ? {
                        background: "linear-gradient(135deg, hsla(155,100%,80%,0.15), hsla(46,97%,64%,0.1))"
                      } : undefined}
                    >
                      {btn.icon}
                      <span className="text-[9px] font-medium">{btn.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </IPhoneMockup>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
