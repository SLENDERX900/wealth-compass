import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";

const screens = ["Dashboard", "Impact", "Portfolio", "ESG Analysis", "Preferences", "Projections", "Rewards"];
const features = ["Aggregated portfolio view", "Real-time ESG scoring", "Greenwashing detection", "Scenario modeling", "Smart behavioral nudges", "Advisor collaboration", "Impact-linked rewards"];
const reviews = ['"Finally, an app that aligns my money with my values." — Sarah, 28', '"The greenwashing detection is a game changer." — Marcus, 35', '"Beautiful, simple, and actually useful." — Priya, 31'];
const specs = ["React + TypeScript", "Real-time data processing", "Bank-grade encryption", "MAS compliant architecture", "Multi-language support"];

const ClosingSection = () => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [infoTab, setInfoTab] = useState("Features");
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => setCurrentScreen((p) => (p + 1) % screens.length), 3000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const replay = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24" id="closing">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 50% at 50% 50%, hsla(155,100%,80%,0.05) 0%, hsla(46,97%,64%,0.05) 50%, transparent 80%)"
      }} />

      <div className="relative mx-auto max-w-4xl px-6 md:px-8 text-center">
        <ScrollReveal><SectionLabel label="AURORA" /></ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 gradient-text-animated">
            The Future of Sustainable Wealth.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-lg text-muted-foreground mb-8">For Singapore's Next Generation.</p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="h-[1px] w-full max-w-md mx-auto mb-12" style={{ background: "linear-gradient(90deg, transparent, hsl(155 100% 80%), hsl(46 97% 64%), transparent)" }} />
        </ScrollReveal>

        {/* Phone with all controls inside */}
        <ScrollReveal delay={0.25} className="flex justify-center mb-8">
          <IPhoneMockup>
            <div className="h-full bg-white text-gray-900 flex flex-col">
              <div className="pt-10 px-4">
                <div className="w-12 h-12 rounded-xl mx-auto mb-2" style={{ background: "linear-gradient(135deg, hsl(155 100% 80%), hsl(46 97% 64%))" }} />
                <p className="text-sm font-medium text-center">Aurora</p>
                <p className="text-[10px] text-gray-400 text-center">★★★★★ 4.9</p>
              </div>

              {/* Carousel */}
              <div className="flex-1 flex items-center justify-center px-4">
                <motion.div key={currentScreen} className="bg-gray-50 rounded-xl p-4 w-full text-center"
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
                  <p className="text-xs font-medium">{screens[currentScreen]}</p>
                  <p className="text-[10px] text-gray-400 mt-1">Screen {currentScreen + 1} of {screens.length}</p>
                </motion.div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-1 py-2" onClick={(e) => e.stopPropagation()}>
                {screens.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setCurrentScreen(i); setAutoPlay(false); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentScreen ? "bg-emerald-400 w-3" : "bg-gray-300"}`} />
                ))}
              </div>

              {/* Controls inside phone */}
              <div className="px-3 pb-1" onClick={(e) => e.stopPropagation()}>
                <FilterToggleGroup compact options={["Auto", "Manual"]} selected={autoPlay ? "Auto" : "Manual"} onChange={(v) => setAutoPlay(v === "Auto")} className="justify-center mb-1" />
                <FilterToggleGroup compact options={["Features", "Reviews", "Specs"]} selected={infoTab} onChange={setInfoTab} className="justify-center" />
              </div>

              {/* Info content inside phone */}
              <div className="px-3 pb-3 max-h-24 overflow-y-auto">
                {infoTab === "Features" && features.map((f) => <p key={f} className="text-[9px] text-gray-500 py-0.5">• {f}</p>)}
                {infoTab === "Reviews" && reviews.map((r) => <p key={r} className="text-[9px] text-gray-500 py-0.5 italic">{r}</p>)}
                {infoTab === "Specs" && specs.map((s) => <p key={s} className="text-[9px] text-gray-500 py-0.5">• {s}</p>)}
              </div>
            </div>
          </IPhoneMockup>
        </ScrollReveal>

        {/* Language toggle stays on page */}
        <ScrollReveal delay={0.3}>
          <FilterToggleGroup options={["English", "中文", "Bahasa Melayu"]} selected={language} onChange={setLanguage} className="justify-center mb-6" />
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <button onClick={replay}
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-80"
            style={{ background: "linear-gradient(135deg, hsl(155 100% 80%), hsl(46 97% 64%))", color: "hsl(0 0% 10%)" }}>
            Replay Journey ↑
          </button>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <p className="text-xs text-muted-foreground mt-12">
            {language === "English" ? "A BNP Paribas Singapore Initiative" : language === "中文" ? "法国巴黎银行新加坡倡议" : "Inisiatif BNP Paribas Singapura"}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ClosingSection;
