import { useState } from "react";
import { LineChart, ArrowUpRight, Lightbulb, Wallet, Activity } from "lucide-react";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import ESGScoreRing from "@/components/aurora/ESGScoreRing";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";

// 1. ADDED: Dummy data dictionary for the interactive time ranges
const timeData = {
  "1D": { balance: "$284,520", percent: "+2.4%", amount: "+$6,828" },
  "1W": { balance: "$281,400", percent: "+1.1%", amount: "+$3,120" },
  "1M": { balance: "$275,800", percent: "+3.2%", amount: "+$8,720" },
  "YTD": { balance: "$248,500", percent: "+14.5%", amount: "+$36,020" },
  "ALL": { balance: "$150,000", percent: "+89.6%", amount: "+$134,520" },
};

const HeroSection = () => {
  const [appTheme, setAppTheme] = useState<"light" | "dark">("light");
  const [viewMode, setViewMode] = useState<"detailed" | "compact">("detailed");
  // 2. UPDATED: Tell TypeScript this state maps to our dictionary keys
  const [timeRange, setTimeRange] = useState<keyof typeof timeData>("1D");
  const [activeScreen, setActiveScreen] = useState("portfolio");

  const dark = appTheme === "dark";
  
  // 3. ADDED: Grab the current stats based on what the user clicked
  const currentStats = timeData[timeRange];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 40% 50%, hsla(155,100%,80%,0.08) 0%, transparent 70%)"
      }} />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Editorial */}
          <div className="relative z-10">
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
                Tap the phone to explore Aurora's dashboard — toggle themes, switch time horizons, and interact with real-time portfolio data.
              </p>
            </ScrollReveal>
          </div>

          {/* Right — iPhone Mockup */}
          <ScrollReveal delay={0.3} className="flex justify-center lg:justify-end">
            <IPhoneMockup>
              <div className={`relative z-50 pointer-events-auto h-full w-full flex flex-col transition-colors duration-300 ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
                
                {/* Status bar & Top Toggles */}
                <div className="pt-10 px-4 pb-2 relative z-[60]">
                  <div className="flex gap-2 mb-4 cursor-pointer">
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

                  {/* Portfolio Value Header (Dynamic) */}
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className={`text-[10px] uppercase tracking-widest font-semibold mb-1 ${dark ? 'text-gray-400' : 'text-gray-500 opacity-50'}`}>Total Balance</p>
                      <p className="text-3xl font-light tracking-tight transition-all duration-300">{currentStats.balance}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-emerald-500 font-medium flex items-center justify-end gap-1 transition-all duration-300">
                        <Activity size={12} />
                        {currentStats.percent}
                      </p>
                      <p className={`text-[10px] transition-all duration-300 ${dark ? 'text-gray-400' : 'opacity-60'}`}>{currentStats.amount} {timeRange}</p>
                    </div>
                  </div>

                  {/* Interactive Time Range Selector */}
                  <div className={`flex justify-between px-1 py-1 rounded-lg mb-2 ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    {(Object.keys(timeData) as Array<keyof typeof timeData>).map((range) => (
                      <button
                        key={range}
                        onPointerDown={(e) => { 
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          setTimeRange(range); 
                        }}
                        // 4. FIX: Updated hover states for dark mode visibility
                        className={`text-[10px] px-2 py-1 rounded-md transition-all font-medium ${
                          timeRange === range 
                            ? (dark ? 'bg-gray-600 text-white shadow-sm' : 'bg-white text-gray-900 shadow-sm') 
                            : (dark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-900')
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>

                  {/* Mini sparkline */}
                  <svg viewBox="0 0 120 24" className="w-full h-8 mb-1 pointer-events-none transition-all duration-300">
                    <polyline
                      points="0,18 15,16 30,14 45,17 60,12 75,10 90,8 105,11 120,6"
                      fill="none"
                      stroke="hsl(155 100% 75%)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(155 100% 75%)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="hsl(155 100% 75%)" stopOpacity="0" />
                    </linearGradient>
                    <polygon
                      points="0,18 15,16 30,14 45,17 60,12 75,10 90,8 105,11 120,6 120,24 0,24"
                      fill="url(#spark-grad)"
                    />
                  </svg>
                </div>

                {/* DYNAMIC MIDDLE SECTION */}
                <div className="flex-1 px-4 overflow-y-auto no-scrollbar relative z-[50]">
                  
                  {activeScreen === "portfolio" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      {/* ESG Ring */}
                      <div className="flex justify-center my-2 pointer-events-none">
                        <ESGScoreRing score={78} size={72} strokeWidth={4} />
                      </div>

                      {/* Holdings List */}
                      <div className="mt-2 pb-2">
                        {viewMode === "detailed" ? (
                          <div className="space-y-2">
                            {[
                              ["Equities", "$142,260", "+3.1%", "hsl(155 100% 75%)"],
                              ["Bonds", "$85,356", "+0.8%", "hsl(46 97% 64%)"],
                              ["Alternatives", "$56,904", "+1.9%", "hsl(200 80% 70%)"],
                            ].map(([name, val, change, color]) => (
                              // 5. FIX: Made detailed boxes legible in dark mode
                              <div key={name} className={`flex justify-between items-center text-[12px] py-2.5 px-3 rounded-xl border transition-colors ${dark ? "bg-gray-800/80 border-gray-700 text-gray-100" : "bg-gray-50 border-gray-100 text-gray-900"}`}>
                                <div className="flex items-center gap-2.5">
                                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                                  <span className="font-medium">{name}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="tabular-nums font-semibold">{val}</span>
                                  <span className="text-[10px] text-emerald-500">{change}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 gap-2 pb-2">
                            {[
                              ["EQ", "+3.1%", "hsl(155 100% 75%)"],
                              ["BD", "+0.8%", "hsl(46 97% 64%)"],
                              ["ALT", "+1.9%", "hsl(200 80% 70%)"],
                            ].map(([label, val, color]) => (
                              // 6. FIX: Made compact boxes legible in dark mode
                              <div key={label} className={`text-[11px] py-3 rounded-xl border text-center transition-colors ${dark ? "bg-gray-800/80 border-gray-700 text-gray-100" : "bg-gray-50 border-gray-100 text-gray-900"}`}>
                                <div className="w-2 h-2 rounded-full mx-auto mb-1.5" style={{ background: color }} />
                                <p className="font-semibold">{label}</p>
                                <p className="text-emerald-500 mt-0.5">{val}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeScreen === "invest" && (
                    <div className="animate-in fade-in flex items-center justify-center h-full opacity-50 text-[11px]">
                      Invest Dashboard Coming Soon
                    </div>
                  )}

                  {activeScreen === "transfer" && (
                    <div className="animate-in fade-in flex items-center justify-center h-full opacity-50 text-[11px]">
                      Transfer Screen Coming Soon
                    </div>
                  )}

                  {activeScreen === "insights" && (
                    <div className="animate-in fade-in flex items-center justify-center h-full opacity-50 text-[11px]">
                      AI Insights Coming Soon
                    </div>
                  )}

                </div>

                {/* Bottom tab bar - Professional Icons */}
                <div className={`flex justify-between px-4 pb-5 pt-3 border-t relative z-[9999] cursor-pointer ${dark ? 'border-gray-800 bg-gray-900/90' : 'border-gray-100 bg-white/90'} backdrop-blur-md`}>
                  {[
                    { id: "portfolio", label: "Portfolio", icon: Wallet },
                    { id: "invest", label: "Invest", icon: LineChart },
                    { id: "transfer", label: "Transfer", icon: ArrowUpRight },
                    { id: "insights", label: "Insights", icon: Lightbulb },
                  ].map((btn) => {
                    const Icon = btn.icon;
                    const isActive = activeScreen === btn.id;
                    return (
                      <button
                        key={btn.id}
                        onPointerDown={(e) => { 
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          setActiveScreen(btn.id); 
                        }}
                        // 7. FIX: Updated bottom bar text to pop better in dark mode
                        className={`flex flex-col items-center gap-1 min-w-[50px] transition-colors ${
                          isActive 
                            ? (dark ? "text-emerald-400" : "text-emerald-600") 
                            : (dark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600")
                        }`}
                      >
                        <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                        <span className="text-[9px] font-medium">{btn.label}</span>
                      </button>
                    );
                  })}
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
