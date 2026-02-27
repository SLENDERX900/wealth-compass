import { useState } from "react";
import { LineChart, ArrowUpRight, Lightbulb, Wallet, Activity } from "lucide-react";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import ESGScoreRing from "@/components/aurora/ESGScoreRing";

const HeroSection = () => {
  const [appTheme, setAppTheme] = useState<"light" | "dark">("dark");
  const [viewMode, setViewMode] = useState<"detailed" | "compact">("compact");
  const [timeRange, setTimeRange] = useState("1D");
  const [activeScreen, setActiveScreen] = useState("portfolio");

  const dark = appTheme === "dark";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 40% 50%, hsla(155,100%,80%,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left -- Editorial */}
          <div className="relative z-10">
            <ScrollReveal>
              <SectionLabel label="AURORA \u00B7 SUSTAINABLE WEALTH" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <GradientHeadline highlight="Personalized." className="mb-6">
                Simple. Powerful. Personalized.
              </GradientHeadline>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed mb-4">
                Navigate your financial life with conviction. Sustainable
                investing, simplified for Singapore's next generation.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="text-sm text-muted-foreground/70 max-w-md">
                Tap the phone to explore Aurora's dashboard &mdash; toggle
                themes, switch time horizons, and interact with real-time
                portfolio data.
              </p>
            </ScrollReveal>
          </div>

          {/* Right -- iPhone Mockup */}
          <ScrollReveal delay={0.3} className="flex justify-center lg:justify-end">
            <IPhoneMockup>
              <div
                className={`relative z-50 pointer-events-auto h-full w-full flex flex-col transition-colors duration-300 ${
                  dark
                    ? "bg-[#0b1120] text-white"
                    : "bg-[#f8f8f8] text-gray-900"
                }`}
              >
                {/* Top toggles */}
                <div className="pt-10 px-4 pb-2 relative z-[60]">
                  <div className="flex gap-1.5 mb-4">
                    {/* Theme toggle */}
                    <ThemeToggle
                      options={["Light", "Dark"]}
                      selected={dark ? "Dark" : "Light"}
                      onChange={(v) =>
                        setAppTheme(v === "Light" ? "light" : "dark")
                      }
                      dark={dark}
                    />
                    {/* View mode toggle */}
                    <ThemeToggle
                      options={["Detailed", "Compact"]}
                      selected={viewMode === "detailed" ? "Detailed" : "Compact"}
                      onChange={(v) =>
                        setViewMode(v === "Detailed" ? "detailed" : "compact")
                      }
                      dark={dark}
                    />
                  </div>

                  {/* Portfolio value header */}
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p
                        className={`text-[10px] uppercase tracking-widest font-semibold mb-1 ${
                          dark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Total Balance
                      </p>
                      <p className="text-3xl font-light tracking-tight tabular-nums">
                        $284,520
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-emerald-500 font-medium flex items-center justify-end gap-1">
                        <Activity size={12} />
                        +2.4%
                      </p>
                      <p
                        className={`text-[10px] ${
                          dark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        +$6,828 {timeRange}
                      </p>
                    </div>
                  </div>

                  {/* Time range selector */}
                  <div
                    className={`flex justify-between px-1 py-1 rounded-lg mb-3 ${
                      dark ? "bg-[#151d2e]" : "bg-gray-100"
                    }`}
                  >
                    {["1D", "1W", "1M", "YTD", "ALL"].map((range) => (
                      <button
                        key={range}
                        onPointerDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setTimeRange(range);
                        }}
                        className={`text-[10px] px-3 py-1 rounded-md transition-all font-medium ${
                          timeRange === range
                            ? dark
                              ? "bg-[#1e2a3e] text-white shadow-sm"
                              : "bg-white text-gray-900 shadow-sm"
                            : dark
                            ? "text-gray-500 hover:text-gray-300"
                            : "text-gray-400 hover:text-gray-700"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>

                  {/* Sparkline chart */}
                  <svg
                    viewBox="0 0 200 40"
                    className="w-full h-10 mb-1 pointer-events-none"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="spark-fill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="hsl(155 100% 75%)"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="hsl(155 100% 75%)"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="0,30 20,28 40,26 60,24 80,28 100,20 120,18 140,14 160,16 180,10 200,8 200,40 0,40"
                      fill="url(#spark-fill)"
                    />
                    <polyline
                      points="0,30 20,28 40,26 60,24 80,28 100,20 120,18 140,14 160,16 180,10 200,8"
                      fill="none"
                      stroke="hsl(155 100% 70%)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Dynamic middle section */}
                <div className="flex-1 px-4 overflow-y-auto no-scrollbar relative z-[50]">
                  {activeScreen === "portfolio" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      {/* ESG Ring */}
                      <div className="flex justify-center my-3 pointer-events-none">
                        <ESGScoreRing score={78} size={80} strokeWidth={5} />
                      </div>

                      {/* Holdings */}
                      <div className="mt-2 pb-2">
                        {viewMode === "detailed" ? (
                          <DetailedHoldings dark={dark} />
                        ) : (
                          <CompactHoldings dark={dark} />
                        )}
                      </div>
                    </div>
                  )}

                  {activeScreen === "invest" && (
                    <PlaceholderScreen label="Invest Dashboard Coming Soon" />
                  )}

                  {activeScreen === "transfer" && (
                    <PlaceholderScreen label="Transfer Screen Coming Soon" />
                  )}

                  {activeScreen === "insights" && (
                    <PlaceholderScreen label="AI Insights Coming Soon" />
                  )}
                </div>

                {/* Bottom tab bar */}
                <div
                  className={`flex justify-between px-4 pb-5 pt-3 border-t relative z-[9999] cursor-pointer backdrop-blur-md ${
                    dark
                      ? "border-[#1a2235] bg-[#0b1120]/90"
                      : "border-gray-100 bg-[#f8f8f8]/90"
                  }`}
                >
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
                        className={`flex flex-col items-center gap-1 min-w-[50px] transition-colors ${
                          isActive
                            ? "text-emerald-500"
                            : dark
                            ? "text-gray-500 hover:text-gray-300"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        <Icon
                          size={20}
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                        <span className="text-[9px] font-medium">
                          {btn.label}
                        </span>
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

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ThemeToggle({
  options,
  selected,
  onChange,
  dark,
}: {
  options: string[];
  selected: string;
  onChange: (v: string) => void;
  dark: boolean;
}) {
  return (
    <div
      className={`flex rounded-full p-0.5 ${
        dark ? "bg-[#151d2e]" : "bg-gray-200/70"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {options.map((opt) => {
        const active = opt === selected;
        return (
          <button
            key={opt}
            onClick={(e) => {
              e.stopPropagation();
              onChange(opt);
            }}
            className={`relative px-2.5 py-0.5 text-[9px] font-medium rounded-full transition-all duration-200 ${
              active
                ? dark
                  ? "bg-[#1e2a3e] text-white shadow-sm"
                  : "bg-white text-gray-900 shadow-sm"
                : dark
                ? "text-gray-500 hover:text-gray-300"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function DetailedHoldings({ dark }: { dark: boolean }) {
  const items = [
    {
      name: "Equities",
      value: "$142,260",
      change: "+3.1%",
      color: "hsl(155 100% 75%)",
    },
    {
      name: "Bonds",
      value: "$85,356",
      change: "+0.8%",
      color: "hsl(46 97% 64%)",
    },
    {
      name: "Alternatives",
      value: "$56,904",
      change: "+1.9%",
      color: "hsl(200 80% 70%)",
    },
  ];

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.name}
          className={`flex justify-between items-center text-[12px] py-2.5 px-3 rounded-xl border transition-colors ${
            dark
              ? "bg-[#131b2e]/60 border-[#1e2a3e]"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: item.color }}
            />
            <span className="font-medium">{item.name}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="tabular-nums font-semibold">{item.value}</span>
            <span className="text-[10px] text-emerald-500">{item.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CompactHoldings({ dark }: { dark: boolean }) {
  const items = [
    { label: "EQ", change: "+3.1%", color: "hsl(155 100% 75%)" },
    { label: "BD", change: "+0.8%", color: "hsl(46 97% 64%)" },
    { label: "ALT", change: "+1.9%", color: "hsl(200 80% 70%)" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 pb-2">
      {items.map((item) => (
        <div
          key={item.label}
          className={`text-center py-3.5 rounded-xl border transition-colors ${
            dark
              ? "bg-[#131b2e]/60 border-[#1e2a3e]"
              : "bg-white border-gray-200"
          }`}
        >
          <div
            className="w-2 h-2 rounded-full mx-auto mb-2"
            style={{ background: item.color }}
          />
          <p className="font-bold text-[12px]">{item.label}</p>
          <p className="text-emerald-500 text-[11px] mt-0.5">{item.change}</p>
        </div>
      ))}
    </div>
  );
}

function PlaceholderScreen({ label }: { label: string }) {
  return (
    <div className="animate-in fade-in flex items-center justify-center h-full opacity-50 text-[11px]">
      {label}
    </div>
  );
}

export default HeroSection;
