import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";
import PhoneNavBar from "@/components/aurora/PhoneNavBar";

const advisors = [
  { id: 1, name: "Sarah Chen", initials: "SC", specialty: "Sustainable Equities", credentials: ["CFA Charterholder", "GSIA Certified", "10+ years ESG"], formal: ["I recommend reallocating 15% toward renewable energy funds.", "Your risk assessment indicates moderate exposure."], casual: ["I'd suggest moving 15% into renewables — great upside!", "Your risk looks manageable, nothing to worry about!"] },
  { id: 2, name: "Marcus Tan", initials: "MT", specialty: "Green Bonds", credentials: ["FRM Certified", "Bloomberg ESG Analyst"], formal: ["The new SG green bond offers attractive risk-adjusted yield.", "I suggest a 5% allocation to green bonds."], casual: ["SG's new green bonds look solid — worth a look!", "Maybe put 5% into green bonds? The yield is sweet."] },
  { id: 3, name: "Priya Sharma", initials: "PS", specialty: "Impact Investing", credentials: ["SASB FSA", "UN PRI Signatory Advisor"], formal: ["Your impact metrics show strong SDG 7 and 13 alignment.", "I recommend the CleanTech thematic basket."], casual: ["Your portfolio is really making a difference!", "The CleanTech basket could be a great fit."] },
];

const AdvisorSection = () => {
  const [advisor, setAdvisor] = useState(advisors[0]);
  const [tab, setTab] = useState("Chat");
  const [showCredentials, setShowCredentials] = useState(false);
  const [tone, setTone] = useState<"Formal" | "Casual">("Formal");
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [activeNav, setActiveNav] = useState("insights");

  const messages = tone === "Formal" ? advisor.formal : advisor.casual;

  return (
    <SectionLayout wash="gold" id="advisory">
      <ScrollReveal><SectionLabel label="ADVISORY" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="Always Close." underline className="mb-4">Your Advisor. Always Close.</GradientHeadline>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground mb-6 max-w-lg">Aurora connects you with certified ESG advisors who understand your values. Chat, call, or schedule — all within the app.</p>
      </ScrollReveal>

      {/* Read-only advisor highlight */}
      <ScrollReveal delay={0.2}>
        <div className="bg-card rounded-xl border border-border p-4 max-w-sm mb-12">
          <p className="text-sm font-medium">{advisor.name}</p>
          <p className="text-xs text-muted-foreground">{advisor.specialty}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full bg-white text-gray-900 flex flex-col">
            {activeNav === "insights" ? (
              <>
            <div className="pt-10 px-3 pb-1">
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-center mb-2">Advisor</p>

              {/* Advisor avatars */}
              <div className="flex gap-2 justify-center mb-2" onClick={(e) => e.stopPropagation()}>
                {advisors.map((a) => (
                  <button key={a.id} onClick={(e) => { e.stopPropagation(); setAdvisor(a); setChatMessages([]); }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-medium transition-all border-2 ${
                      advisor.id === a.id ? "border-emerald-400 bg-gradient-to-br from-emerald-100 to-amber-100" : "border-gray-200 bg-gray-50"
                    }`}>{a.initials}</button>
                ))}
              </div>

              {/* Profile header */}
              <div className="bg-gray-50 rounded-xl p-2 flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-200 to-amber-200 flex items-center justify-center text-[10px] font-medium">{advisor.initials}</div>
                <div>
                  <p className="text-[10px] font-medium">{advisor.name}</p>
                  <p className="text-[8px] text-gray-400">{advisor.specialty}</p>
                </div>
              </div>

              {/* Credentials */}
              <button onClick={(e) => { e.stopPropagation(); setShowCredentials(!showCredentials); }}
                className="text-[8px] text-gray-400 underline mb-1">{showCredentials ? "Hide" : "Show"} Credentials</button>
              <AnimatePresence>
                {showCredentials && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-1">
                    {advisor.credentials.map((c) => (
                      <p key={c} className="text-[8px] text-gray-400 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-amber-400" />{c}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tab bar */}
              <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5" onClick={(e) => e.stopPropagation()}>
                {["Chat", "Video", "Schedule"].map((t) => (
                  <button key={t} onClick={(e) => { e.stopPropagation(); setTab(t); }}
                    className={`flex-1 text-[9px] py-1.5 rounded-md transition-all ${tab === t ? "bg-white shadow-sm font-medium" : ""}`}>{t}</button>
                ))}
              </div>

              {/* Tone toggle */}
              <FilterToggleGroup compact options={["Formal", "Casual"]} selected={tone} onChange={(v) => setTone(v as "Formal" | "Casual")} className="justify-center mt-1" />
            </div>

            {/* Chat area */}
            <div className="flex-1 px-3 mt-2 space-y-1.5 overflow-y-auto">
              {tab === "Chat" && (
                <>
                  <div className="bg-gray-50 rounded-xl rounded-tl-sm p-2 text-[10px] max-w-[85%]">{messages[0]}</div>
                  {chatMessages.map((m, i) => (
                    <motion.div key={i} className="rounded-xl rounded-tr-sm p-2 text-[10px] max-w-[85%] ml-auto text-white"
                      style={{ background: "linear-gradient(135deg, hsl(155 100% 75%), hsl(46 97% 64%))" }}
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                      {m}
                    </motion.div>
                  ))}
                  {chatMessages.length > 0 && (
                    <motion.div className="bg-gray-50 rounded-xl rounded-tl-sm p-2 text-[10px] max-w-[85%]"
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                      {messages[1]}
                    </motion.div>
                  )}
                </>
              )}
              {tab === "Video" && <div className="flex-1 flex items-center justify-center text-[10px] text-gray-400">📹 Video call ready</div>}
              {tab === "Schedule" && <div className="flex-1 flex items-center justify-center text-[10px] text-gray-400">📅 Select a time slot</div>}
            </div>

            {/* Quick replies */}
            {tab === "Chat" && (
              <div className="px-3 pb-3 pt-1 flex gap-1 flex-wrap" onClick={(e) => e.stopPropagation()}>
                {["Tell me more", "My risk?", "Schedule call"].map((opt) => (
                  <button key={opt} onClick={(e) => { e.stopPropagation(); setChatMessages((p) => [...p, opt]); }}
                    className="text-[8px] px-2 py-1 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50">{opt}</button>
                ))}
              </div>
            )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center pt-10">
                <p className="text-[11px] text-gray-400 capitalize">{activeNav} screen</p>
              </div>
            )}
            <PhoneNavBar activeTab={activeNav} onTabChange={setActiveNav} />
          </div>
        </IPhoneMockup>
      </ScrollReveal>
    </SectionLayout>
  );
};

export default AdvisorSection;
