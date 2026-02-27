import { useState } from "react";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import ESGScoreRing from "@/components/aurora/ESGScoreRing";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";

const HeroSection = () => {
  const [appTheme, setAppTheme] = useState<"light" | "dark">("light");
  const [viewMode, setViewMode] = useState<"detailed" | "compact">("detailed");
  const [activeScreen, setActiveScreen] = useState("home");

  const dark = appTheme === "dark";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 40% 50%, hsla(155,100%,80%,0.08) 0%, transparent 70%)"
      }} />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — editorial */}
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
                Tap the phone to explore Aurora's dashboard — toggle themes, switch views, and interact with real-time portfolio data.
              </p>
            </ScrollReveal>
          </div>

          {/* Right — iPhone mockup with ALL controls inside */}
          <ScrollReveal delay={0.3} className="flex justify-center lg:justify-end">
            <IPhoneMockup>
              <div className={`relative z-50 pointer-events-auto h-full w-full flex flex-col transition-colors duration-300 ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
                
                {/* Status bar area */}
                <div className="pt-10 px-4 pb-2 relative z-[60]">
                  {/* Theme & View toggles (Fixed for Lovable Canvas) */}
                  <div className="flex gap-2 mb-3 cursor-pointer">
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

                  {/* Mini sparkline */}
                  <svg viewBox="0 0 120 24" className="w-full h-5 mb-1 pointer-events-none">
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

                  <p className="text-[10px] uppercase tracking-widest opacity-50">Portfolio Value</p>
                  <p className="text-2xl font-light mt-0.5">$284,520</p>
                  <p className="text-[10px] text-emerald-500 font-medium">+2.4% today · +$6,828</p>
                </div>

                {/* DYNAMIC MIDDLE SECTION */}
                <div className="flex-1 px-3 overflow-y-auto no-scrollbar relative z-[50]">
                  
                  {/* View 1: HOME/PORTFOLIO */}
                  {activeScreen === "home" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      {/* ESG Ring */}
                      <div className="flex justify-center my-2 pointer-events-none">
                        <ESGScoreRing score={78} size={72} strokeWidth={4} />
                      </div>

                      {/* Holdings */}
                      {viewMode === "detailed" ? (
                        <div className="space-y-1.5 pb-2">
                          {[
                            ["Equities", "$142,260", "+3.1%", "hsl(155 100% 75%)"],
                            ["Bonds", "$85,356", "+0.8%", "hsl(46 97% 64%)"],
                            ["Alternatives", "$56,904", "+1.9%", "hsl(200 80% 70%)"],
                          ].map(([name, val, change, color]) => (
                            <div key={name} className={`flex justify-between items-center text-[11px] py-2 px-3 rounded-xl ${dark ? "bg-gray-800" : "bg-gray-50"}`}>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                                <span>{name}</span>
                              </div>
                              <span className="tabular-nums">{val} <span className="text-emerald-500">{change}</span></span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-1.5 pb-2">
                          {[
                            ["EQ", "+3.1%", "hsl(155 100% 75%)"],
                            ["BD", "+0.8%", "hsl(46 97% 64%)"],
                            ["ALT", "+1.9%", "hsl(200 80% 70%)"],
                          ].map(([label, val, color]) => (
                            <div key={label} className={`text-[10px] py-2.5 rounded-xl text-center ${dark ? "bg-gray-800" : "bg-gray-50"}`}>
                              <div className="w-1.5 h-1.5 rounded-full mx-auto mb-1" style={{ background: color }} />
                              <p className="font-medium">{label}</p>
                              <p className="text-emerald-500">{val}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* View 2: INVEST (Placeholder) */}
                  {activeScreen === "invest" && (
                    <div className="animate-in fade-in flex items-center justify-center h-full opacity-50 text-[11px]">
                      Invest Dashboard Coming Soon
                    </div>
                  )}

                  {/* View 3: TRANSFER (Placeholder) */}
                  {activeScreen === "transfer" && (
                    <div className="animate-in fade-in flex items-center justify-center h-full opacity-50 text-[11px]">
                      Transfer Screen Coming Soon
                    </div>
                  )}

                  {/* View 4: INSIGHTS (Placeholder) */}
                  {activeScreen === "insights" && (
                    <div className="animate-in fade-in flex items-center justify-center h-full opacity-50 text-[11px]">
                      AI Insights Coming Soon
                    </div>
                  )}

                </div>

                {/* Bottom tab bar (Fixed for Lovable Canvas & Added Home Tab) */}
                <div className="flex gap-1 px-3 pb-3 pt-2 relative z-[9999] cursor-pointer">
                  {[
                    { label: "Home", icon: "🏠" },
                    { label: "Invest", icon: "📈" },
                    { label: "Transfer", icon: "↗️" },
                    { label: "Insights", icon: "💡" },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      onPointerDown={(e) => { 
                        e.preventDefault();
                        e.stopPropagation(); 
                        setActiveScreen(btn.label.toLowerCase()); 
                      }}
                      className={`flex-1 text-[10px] py-2 rounded-xl transition-all flex flex-col items-center gap-0.5 ${
                        activeScreen === btn.label.toLowerCase()
                          ? "font-medium"
                          : dark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      style={activeScreen === btn.label.toLowerCase() ? {
                        background: "linear-gradient(135deg, hsla(155,100%,80%,0.2), hsla(46,97%,64%,0.2))"
                      } : undefined}
                    >
                      <span className="text-xs">{btn.icon}</span>
                      {btn.label}
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