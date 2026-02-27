import { useState } from "react";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import ESGScoreRing from "@/components/aurora/ESGScoreRing";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";

// Safe, standard JavaScript object for the interactive Time Range
const performanceData = {
  "1D": { pct: "+2.4%", abs: "+$6,828", sparkPoints: "0,18 15,16 30,14 45,17 60,12 75,10 90,8 105,11 120,6" },
  "1W": { pct: "+5.1%", abs: "+$13,780", sparkPoints: "0,20 20,18 40,14 60,16 80,10 100,8 120,4" },
  "1M": { pct: "+8.2%", abs: "+$21,550", sparkPoints: "0,22 25,18 50,19 75,12 100,8 120,2" },
  "YTD": { pct: "+14.5%", abs: "+$36,015", sparkPoints: "0,24 30,20 60,12 90,6 120,1" },
  "ALL": { pct: "+42.8%", abs: "+$85,240", sparkPoints: "0,24 20,22 40,16 60,18 80,10 100,4 120,0" }
};

const HeroSection = () => {
  const [appTheme, setAppTheme] = useState<"light" | "dark">("light");
  const [viewMode, setViewMode] = useState<"detailed" | "compact">("detailed");
  const [activeScreen, setActiveScreen] = useState("home");
  // Defaulting to "1D" to match the data keys perfectly
  const [timeRange, setTimeRange] = useState("1D");

  const dark = appTheme === "dark";
  
  // Safely fallback to 1D data if something unexpected happens
  const currentData = performanceData[timeRange as keyof typeof performanceData] || performanceData["1D"];

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
                Tap the phone to explore Aurora's dashboard — toggle themes, switch views, and watch the data react instantly.
              </p>
            </ScrollReveal>
          </div>

          {/* Right — iPhone mockup */}
          <ScrollReveal delay={0.3} className="flex justify-center lg:justify-end">
            <IPhoneMockup>
              <div className={`h-full flex flex-col transition-colors duration-300 ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
                
                {/* Fixed Top Section: Status Bar & Main Chart */}
                <div className="pt-10 px-4 pb-2 shrink-0">
                  <div className="flex gap-2 mb-3" onClick={(e) => e.stopPropagation()}>
                    <FilterToggleGroup compact
                      options={["Light", "Dark"]}
                      selected={appTheme === "light" ? "Light" : "Dark"}
                      onChange={(v) => setAppTheme(v === "Light" ? "light" : "dark")}
                    />
                  </div>

                  {/* Dynamic Portfolio Headers */}
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest opacity-50">Total Balance</p>
                      <p className="text-2xl font-light mt-0.5 transition-all">$284,520</p>
                    </div>
                    <div className="text-right transition-all">
                      <p className="text-[11px] text-emerald-500 font-medium flex items-center justify-end gap-1">
                        <span className="text-[10px]">↑</span> {currentData.pct}
                      </p>
                      <p className="text-[10px] opacity-60">{currentData.abs} {timeRange}</p>
                    </div>
                  </div>

                  {/* Interactive Time Range Selector */}
                  <div className="flex justify-between gap-1 mb-3" onClick={(e) => e.stopPropagation()}>
                    {Object.keys(performanceData).map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`flex-1 text-[9px] py-1.5 rounded-md font-medium transition-all duration-200 ${
                          timeRange === range 
                            ? (dark ? "bg-gray-700 text-white shadow-sm" : "bg-white text-gray-900 shadow-sm border border-gray-200") 
                            : (dark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700 bg-gray-50/50")
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Sparkline */}
                  <svg viewBox="0 0 120 24" className="w-full h-6 mb-1 overflow-visible">
                    <polyline
                      points={currentData.sparkPoints}
                      fill="none"
                      stroke="hsl(155 100% 75%)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-500 ease-in-out"
                    />
                    <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(155 100% 75%)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="hsl(155 100% 75%)" stopOpacity="0" />
                    </linearGradient>
                    <polygon
                      points={`${currentData.sparkPoints} 120,24 0,24`}
                      fill="url(#spark-grad)"
                      className="transition-all duration-500 ease-in-out"
                    />
                  </svg>
                </div>

                {/* DYNAMIC MIDDLE SECTION: Changes based on Tab Bar */}
                <div className="flex-1 px-4 overflow-y-auto no-scrollbar pb-2">
                  
                  {/* View 1: HOME/PORTFOLIO (Default) */}
                  {activeScreen === "home" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-semibold uppercase opacity-50">Holdings</span>
                        <FilterToggleGroup compact
                          options={["Detailed", "Compact"]}
                          selected={viewMode === "detailed" ? "Detailed" : "Compact"}
                          onChange={(v) => setViewMode(v === "Detailed" ? "detailed" : "compact")}
                        />
                      </div>
                      
                      <div className="flex justify-center my-3">
                        <ESGScoreRing score={78} size={64} strokeWidth={4} />
                      </div>

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
                  )}

                  {/* View 2: INVEST */}
                  {activeScreen === "invest" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className={`flex items-center gap-2 p-2 rounded-lg mb-4 ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <span className="text-[12px] ml-1 opacity-50">🔍</span>
                        <span className="text-[10px] opacity-50">Search funds, themes...</span>
                      </div>
                      <p className="text-[10px] font-semibold uppercase opacity-50 mb-2">Curated Themes</p>
                      <div className="space-y-2">
                        <div className={`p-3 rounded-xl border ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
                          <div className="flex justify-between items-start mb-1">
                            <p className="text-[11px] font-medium">Global Clean Energy</p>
                            <span className="text-[9px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">High Match</span>
                          </div>
                          <p className="text-[9px] opacity-60 mb-2">Solar, wind, and smart grid tech.</p>
                          <p className="text-[10px] text-emerald-500 font-medium">+12.4% YTD</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* View 3: TRANSFER */}
                  {activeScreen === "transfer" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col h-full justify-center pt-4">
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <button className="py-4 bg-emerald-500 text-white rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-emerald-600 transition-colors">
                          <span className="text-lg">➕</span>
                          <span className="text-[11px] font-medium">Deposit</span>
                        </button>
                        <button className={`py-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-colors ${dark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                          <span className="text-lg">🏦</span>
                          <span className="text-[11px] font-medium">Withdraw</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* View 4: INSIGHTS */}
                  {activeScreen === "insights" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <p className="text-[10px] font-semibold uppercase opacity-50 mb-2 mt-1">Impact This Month</p>
                      
                      <div className={`p-3 rounded-xl mb-2 flex items-center gap-3 border ${dark ? 'bg-gray-800 border-gray-700' : 'bg-emerald-50/50 border-emerald-100'}`}>
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                          <span className="text-[14px]">🌱</span>
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold text-emerald-600">1.2 Tons CO₂ Offset</p>
                          <p className="text-[9px] opacity-70 mt-0.5">Equivalent to planting 14 trees.</p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom tab bar - Stays Fixed at the bottom */}
                <div className="flex gap-1 px-3 pb-4 pt-2 border-t border-gray-200/20 shrink-0">
                  {[
                    { id: "home", label: "Home", icon: "🏠" },
                    { id: "invest", label: "Invest", icon: "📈" },
                    { id: "transfer", label: "Transfer", icon: "↗️" },
                    { id: "insights", label: "Insights", icon: "💡" },
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
                      <span className="text-xs">{btn.icon}</span>
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
