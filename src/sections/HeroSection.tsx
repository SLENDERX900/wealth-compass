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

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Radial gradient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 40% 50%, hsla(155,100%,80%,0.08) 0%, transparent 70%)"
      }} />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
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
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed mb-8">
                Navigate your financial life with conviction. Sustainable investing, simplified for Singapore's next generation.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-3">
                <FilterToggleGroup
                  options={["Light", "Dark"]}
                  selected={appTheme === "light" ? "Light" : "Dark"}
                  onChange={(v) => setAppTheme(v === "Light" ? "light" : "dark")}
                />
                <FilterToggleGroup
                  options={["Detailed", "Compact"]}
                  selected={viewMode === "detailed" ? "Detailed" : "Compact"}
                  onChange={(v) => setViewMode(v === "Detailed" ? "detailed" : "compact")}
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right — iPhone mockup */}
          <ScrollReveal delay={0.3} className="flex justify-center lg:justify-end">
            <IPhoneMockup>
              <div className={`h-full p-4 flex flex-col gap-3 transition-colors duration-300 ${appTheme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
                <div className="pt-8 text-center">
                  <p className="text-[10px] uppercase tracking-widest opacity-50 mt-2">Portfolio Value</p>
                  <p className="text-2xl font-light mt-1">$284,520</p>
                  <p className="text-[10px] text-emerald-500">+2.4% today</p>
                </div>
                <div className="flex justify-center my-2">
                  <ESGScoreRing score={78} size={80} strokeWidth={4} />
                </div>
                {viewMode === "detailed" ? (
                  <div className="space-y-2 px-2">
                    {[["Equities", "$142,260", "+3.1%"], ["Bonds", "$85,356", "+0.8%"], ["Alternatives", "$56,904", "+1.9%"]].map(([name, val, change]) => (
                      <div key={name} className={`flex justify-between text-[11px] py-2 px-3 rounded-lg ${appTheme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
                        <span>{name}</span>
                        <span className="tabular-nums">{val} <span className="text-emerald-500">{change}</span></span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-1 px-2 text-center">
                    {[["EQ", "+3.1%"], ["BD", "+0.8%"], ["ALT", "+1.9%"]].map(([label, val]) => (
                      <div key={label} className={`text-[10px] py-2 rounded-lg ${appTheme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
                        <p className="font-medium">{label}</p>
                        <p className="text-emerald-500">{val}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-auto flex gap-1 px-2 pb-2">
                  {["Invest", "Transfer", "Insights"].map((btn) => (
                    <button
                      key={btn}
                      onClick={(e) => { e.stopPropagation(); setActiveScreen(btn.toLowerCase()); }}
                      className={`flex-1 text-[10px] py-2 rounded-lg transition-all ${
                        activeScreen === btn.toLowerCase()
                          ? "bg-gradient-to-r from-aurora-cyan/30 to-aurora-gold/30 font-medium"
                          : appTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    >
                      {btn}
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
