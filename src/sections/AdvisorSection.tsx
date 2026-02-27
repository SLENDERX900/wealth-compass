import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Video, Phone, MonitorUp, Send, Star, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";

const advisors = [
  {
    id: 1, name: "Sarah Chen", initials: "SC", specialty: "Sustainable Equities",
    credentials: ["CFA Charterholder", "GSIA Certified", "10+ years ESG"],
    rating: 4.9, clients: 128,
    chatHistory: {
      Formal: [
        { from: "advisor", text: "Good morning. Based on your updated ESG preferences, I recommend reallocating 15% toward renewable energy funds.", time: "9:02 AM" },
        { from: "user", text: "What would be the risk-adjusted return on that allocation?", time: "9:04 AM" },
        { from: "advisor", text: "The projected Sharpe ratio is 1.2, significantly above the benchmark. Your portfolio's carbon intensity would decrease by 30%.", time: "9:05 AM" },
        { from: "user", text: "That sounds promising. What about the impact on my overall ESG score?", time: "9:07 AM" },
        { from: "advisor", text: "Your ESG composite would improve from 78 to 85. I can prepare a detailed scenario model for your review.", time: "9:08 AM" },
      ],
      Casual: [
        { from: "advisor", text: "Hey! Saw your updated values -- I think we can make some great moves with renewables.", time: "9:02 AM" },
        { from: "user", text: "Sounds interesting! What kind of returns are we looking at?", time: "9:04 AM" },
        { from: "advisor", text: "Pretty solid -- Sharpe ratio of 1.2 and your carbon footprint drops by 30%. Win-win!", time: "9:05 AM" },
        { from: "user", text: "Nice! And my ESG score?", time: "9:07 AM" },
        { from: "advisor", text: "Goes from 78 to 85! Want me to build a scenario model so you can see it all?", time: "9:08 AM" },
      ],
    },
    schedule: [
      { day: "Mon", slots: [{ time: "9:00 AM", available: true }, { time: "11:00 AM", available: false }, { time: "2:00 PM", available: true }, { time: "4:00 PM", available: true }] },
      { day: "Tue", slots: [{ time: "9:00 AM", available: false }, { time: "11:00 AM", available: true }, { time: "2:00 PM", available: false }, { time: "4:00 PM", available: true }] },
      { day: "Wed", slots: [{ time: "9:00 AM", available: true }, { time: "11:00 AM", available: true }, { time: "2:00 PM", available: true }, { time: "4:00 PM", available: false }] },
      { day: "Thu", slots: [{ time: "9:00 AM", available: true }, { time: "11:00 AM", available: false }, { time: "2:00 PM", available: true }, { time: "4:00 PM", available: true }] },
      { day: "Fri", slots: [{ time: "9:00 AM", available: false }, { time: "11:00 AM", available: true }, { time: "2:00 PM", available: false }, { time: "4:00 PM", available: false }] },
    ],
  },
  {
    id: 2, name: "Marcus Tan", initials: "MT", specialty: "Green Bonds",
    credentials: ["FRM Certified", "Bloomberg ESG Analyst"],
    rating: 4.8, clients: 96,
    chatHistory: {
      Formal: [
        { from: "advisor", text: "The new SG green bond offers attractive risk-adjusted yield at 4.2% with a AA ESG rating.", time: "10:15 AM" },
        { from: "user", text: "How does it compare to the existing bond allocation?", time: "10:17 AM" },
        { from: "advisor", text: "It outperforms by 80bps while maintaining lower carbon intensity. The duration risk is well-contained.", time: "10:18 AM" },
        { from: "user", text: "I'd like a 5% allocation. Can you proceed?", time: "10:20 AM" },
        { from: "advisor", text: "Absolutely. I will execute the trade and update your portfolio dashboard by end of day.", time: "10:21 AM" },
      ],
      Casual: [
        { from: "advisor", text: "Hey! SG just dropped a new green bond -- 4.2% yield with top-tier ESG rating!", time: "10:15 AM" },
        { from: "user", text: "How's it stack up against what I have now?", time: "10:17 AM" },
        { from: "advisor", text: "80bps better and cleaner. Duration looks manageable too.", time: "10:18 AM" },
        { from: "user", text: "Let's do 5%. Go for it!", time: "10:20 AM" },
        { from: "advisor", text: "Done! I'll have your dashboard updated by EOD. Nice pick!", time: "10:21 AM" },
      ],
    },
    schedule: [
      { day: "Mon", slots: [{ time: "9:00 AM", available: false }, { time: "11:00 AM", available: true }, { time: "2:00 PM", available: true }, { time: "4:00 PM", available: false }] },
      { day: "Tue", slots: [{ time: "9:00 AM", available: true }, { time: "11:00 AM", available: false }, { time: "2:00 PM", available: true }, { time: "4:00 PM", available: true }] },
      { day: "Wed", slots: [{ time: "9:00 AM", available: true }, { time: "11:00 AM", available: true }, { time: "2:00 PM", available: false }, { time: "4:00 PM", available: true }] },
      { day: "Thu", slots: [{ time: "9:00 AM", available: false }, { time: "11:00 AM", available: true }, { time: "2:00 PM", available: true }, { time: "4:00 PM", available: false }] },
      { day: "Fri", slots: [{ time: "9:00 AM", available: true }, { time: "11:00 AM", available: false }, { time: "2:00 PM", available: true }, { time: "4:00 PM", available: true }] },
    ],
  },
  {
    id: 3, name: "Priya Sharma", initials: "PS", specialty: "Impact Investing",
    credentials: ["SASB FSA", "UN PRI Signatory Advisor"],
    rating: 4.9, clients: 74,
    chatHistory: {
      Formal: [
        { from: "advisor", text: "Your impact metrics show strong SDG 7 and SDG 13 alignment. Current portfolio contributes to 2.4 tonnes CO2 avoided.", time: "2:30 PM" },
        { from: "user", text: "Can we increase our impact on clean water initiatives?", time: "2:32 PM" },
        { from: "advisor", text: "I recommend the CleanWater Impact Fund -- it directly finances SDG 6 projects across Southeast Asia.", time: "2:33 PM" },
        { from: "user", text: "What is the expected financial return?", time: "2:35 PM" },
        { from: "advisor", text: "7.8% annualized with strong downside protection. The fund has a 5-star Morningstar sustainability rating.", time: "2:36 PM" },
      ],
      Casual: [
        { from: "advisor", text: "Your portfolio is making a real difference! SDG 7 and 13 are looking great -- 2.4 tonnes CO2 avoided!", time: "2:30 PM" },
        { from: "user", text: "Love that! Can we do more for clean water?", time: "2:32 PM" },
        { from: "advisor", text: "Totally! The CleanWater Impact Fund is perfect -- funds SDG 6 projects across Southeast Asia.", time: "2:33 PM" },
        { from: "user", text: "What kind of returns?", time: "2:35 PM" },
        { from: "advisor", text: "7.8% annualized with solid downside protection. 5-star Morningstar sustainability rating too!", time: "2:36 PM" },
      ],
    },
    schedule: [
      { day: "Mon", slots: [{ time: "9:00 AM", available: true }, { time: "11:00 AM", available: true }, { time: "2:00 PM", available: false }, { time: "4:00 PM", available: true }] },
      { day: "Tue", slots: [{ time: "9:00 AM", available: false }, { time: "11:00 AM", available: true }, { time: "2:00 PM", available: true }, { time: "4:00 PM", available: false }] },
      { day: "Wed", slots: [{ time: "9:00 AM", available: true }, { time: "11:00 AM", available: false }, { time: "2:00 PM", available: true }, { time: "4:00 PM", available: true }] },
      { day: "Thu", slots: [{ time: "9:00 AM", available: true }, { time: "11:00 AM", available: true }, { time: "2:00 PM", available: false }, { time: "4:00 PM", available: true }] },
      { day: "Fri", slots: [{ time: "9:00 AM", available: false }, { time: "11:00 AM", available: false }, { time: "2:00 PM", available: true }, { time: "4:00 PM", available: false }] },
    ],
  },
];

/* --- Typing indicator --- */
const TypingIndicator = () => (
  <div className="flex items-center gap-0.5 px-2 py-1.5 bg-gray-50 rounded-xl rounded-tl-sm w-fit">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-1 h-1 rounded-full bg-gray-400"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

/* --- Video Call UI --- */
const VideoCallUI = ({ advisor }: { advisor: typeof advisors[0] }) => {
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCallDuration((d) => d + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex-1 flex flex-col">
      {/* Main video area */}
      <div className="flex-1 relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mx-2 mt-1 overflow-hidden">
        {/* Advisor avatar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400/30 to-amber-400/30 border-2 border-white/20 flex items-center justify-center">
            <span className="text-lg font-semibold text-white/90">{advisor.initials}</span>
          </div>
        </div>
        {/* Status */}
        <div className="absolute top-2 left-2 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[8px] text-white/70">Connected</span>
          <span className="text-[8px] text-white/50 tabular-nums">{formatTime(callDuration)}</span>
        </div>
        {/* Self-view PIP */}
        <div className="absolute bottom-2 right-2 w-12 h-16 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 border border-white/10 flex items-center justify-center">
          <span className="text-[8px] text-white/50">You</span>
        </div>
        {/* Advisor name overlay */}
        <div className="absolute bottom-2 left-2">
          <p className="text-[9px] text-white/80 font-medium">{advisor.name}</p>
          <p className="text-[7px] text-white/50">{advisor.specialty}</p>
        </div>
      </div>
      {/* Control bar */}
      <div className="flex items-center justify-center gap-3 py-2.5 px-4">
        {[
          { Icon: Mic, label: "Mute", bg: "bg-gray-100" },
          { Icon: Video, label: "Camera", bg: "bg-gray-100" },
          { Icon: MonitorUp, label: "Share", bg: "bg-gray-100" },
          { Icon: Phone, label: "End", bg: "bg-red-100 text-red-600" },
        ].map(({ Icon, label, bg }) => (
          <button key={label} className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center transition-all hover:scale-105`} onClick={(e) => e.stopPropagation()}>
            <Icon className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>
    </div>
  );
};

/* --- Schedule UI --- */
const ScheduleUI = ({ advisor }: { advisor: typeof advisors[0] }) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-col px-2 mt-1 overflow-y-auto">
      {/* Week header */}
      <div className="grid grid-cols-5 gap-0.5 mb-1.5">
        {advisor.schedule.map((d) => (
          <div key={d.day} className="text-center">
            <p className="text-[8px] font-semibold text-gray-500">{d.day}</p>
          </div>
        ))}
      </div>
      {/* Time slots grid */}
      {[0, 1, 2, 3].map((slotIdx) => (
        <div key={slotIdx} className="grid grid-cols-5 gap-0.5 mb-0.5">
          {advisor.schedule.map((d) => {
            const slot = d.slots[slotIdx];
            if (!slot) return <div key={d.day} />;
            const slotKey = `${d.day}-${slot.time}`;
            const isSelected = selectedSlot === slotKey;
            return (
              <button
                key={slotKey}
                onClick={(e) => { e.stopPropagation(); slot.available && setSelectedSlot(isSelected ? null : slotKey); }}
                className={`text-[7px] py-1.5 rounded-md transition-all text-center ${
                  isSelected
                    ? "text-white font-medium"
                    : slot.available
                    ? "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                    : "bg-gray-50 text-gray-300 border border-gray-100 cursor-not-allowed"
                }`}
                style={isSelected ? { background: "linear-gradient(135deg, hsl(155 100% 75%), hsl(46 97% 64%))" } : undefined}
                disabled={!slot.available}
              >
                {slot.time.replace(" AM", "a").replace(" PM", "p")}
              </button>
            );
          })}
        </div>
      ))}
      {/* Advisor info + confirm */}
      <div className="mt-auto px-1 pb-2">
        <div className="bg-gray-50 rounded-lg p-2 mb-1.5">
          <p className="text-[9px] font-medium">{advisor.name}</p>
          <p className="text-[8px] text-gray-400">{advisor.specialty}</p>
        </div>
        <button
          onClick={(e) => e.stopPropagation()}
          className={`w-full text-[10px] font-medium py-2 rounded-xl transition-all ${
            selectedSlot
              ? "text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          style={selectedSlot ? { background: "linear-gradient(135deg, hsl(155 100% 75%), hsl(46 97% 64%))" } : undefined}
          disabled={!selectedSlot}
        >
          {selectedSlot ? "Confirm Booking" : "Select a time slot"}
        </button>
      </div>
    </div>
  );
};

const AdvisorSection = () => {
  const [advisor, setAdvisor] = useState(advisors[0]);
  const [tab, setTab] = useState("Chat");
  const [showCredentials, setShowCredentials] = useState(false);
  const [tone, setTone] = useState<"Formal" | "Casual">("Formal");
  const [showTyping, setShowTyping] = useState(true);

  const chatMessages = advisor.chatHistory[tone];

  /* Simulated typing indicator */
  useEffect(() => {
    setShowTyping(true);
    const timer = setTimeout(() => setShowTyping(false), 2000);
    return () => clearTimeout(timer);
  }, [advisor.id, tone]);

  return (
    <SectionLayout wash="gold" id="advisory">
      <ScrollReveal><SectionLabel label="ADVISORY" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="Always Close." underline className="mb-4">Your Advisor. Always Close.</GradientHeadline>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground mb-6 max-w-lg">Aurora connects you with certified ESG advisors who understand your values. Chat, call, or schedule -- all within the app.</p>
      </ScrollReveal>

      {/* Read-only advisor cards row */}
      <ScrollReveal delay={0.2}>
        <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
          {advisors.map((a) => (
            <button
              key={a.id}
              onClick={() => { setAdvisor(a); setShowTyping(true); }}
              className={`flex-shrink-0 bg-card rounded-xl border p-4 min-w-[200px] text-left transition-all ${
                advisor.id === a.id ? "border-aurora-cyan/30 ring-1 ring-aurora-cyan/20" : "border-border"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium border-2 ${
                  advisor.id === a.id ? "border-emerald-400 bg-gradient-to-br from-emerald-100 to-amber-100" : "border-gray-200 bg-gray-50"
                }`}>{a.initials}</div>
                <div>
                  <p className="text-sm font-medium">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.specialty}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-amber-400 fill-amber-400" />{a.rating}</span>
                <span>{a.clients} clients</span>
                <span className="flex items-center gap-0.5"><ShieldCheck className="w-3 h-3 text-emerald-500" />MAS</span>
              </div>
            </button>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full bg-white text-gray-900 flex flex-col">
            <div className="pt-10 px-3 pb-1">
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-center mb-2">Advisor</p>

              {/* Advisor avatars */}
              <div className="flex gap-2 justify-center mb-2" onClick={(e) => e.stopPropagation()}>
                {advisors.map((a) => (
                  <button key={a.id} onClick={(e) => { e.stopPropagation(); setAdvisor(a); }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-medium transition-all border-2 ${
                      advisor.id === a.id ? "border-emerald-400 bg-gradient-to-br from-emerald-100 to-amber-100" : "border-gray-200 bg-gray-50"
                    }`}>{a.initials}</button>
                ))}
              </div>

              {/* Profile header */}
              <div className="bg-gray-50 rounded-xl p-2 flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-200 to-amber-200 flex items-center justify-center text-[10px] font-medium">{advisor.initials}</div>
                <div className="flex-1">
                  <p className="text-[10px] font-medium">{advisor.name}</p>
                  <p className="text-[8px] text-gray-400">{advisor.specialty}</p>
                </div>
                <div className="flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                  <span className="text-[8px] font-medium">{advisor.rating}</span>
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

              {/* Tone toggle (only for Chat) */}
              {tab === "Chat" && (
                <FilterToggleGroup compact options={["Formal", "Casual"]} selected={tone} onChange={(v) => setTone(v as "Formal" | "Casual")} className="justify-center mt-1" />
              )}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {tab === "Chat" && (
                <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
                  {/* Chat messages */}
                  <div className="flex-1 px-3 mt-1.5 space-y-1.5 overflow-y-auto">
                    {chatMessages.map((msg, i) => (
                      <motion.div
                        key={`${tone}-${i}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={msg.from === "advisor" ? "max-w-[88%]" : "max-w-[88%] ml-auto"}
                      >
                        <div
                          className={`rounded-xl p-2 text-[10px] leading-relaxed ${
                            msg.from === "advisor"
                              ? "bg-gray-50 rounded-tl-sm text-gray-800"
                              : "rounded-tr-sm text-white"
                          }`}
                          style={msg.from === "user" ? { background: "linear-gradient(135deg, hsl(155 100% 75%), hsl(46 97% 64%))" } : undefined}
                        >
                          {msg.text}
                        </div>
                        <p className={`text-[7px] text-gray-300 mt-0.5 ${msg.from === "user" ? "text-right" : ""}`}>{msg.time}</p>
                      </motion.div>
                    ))}
                    {/* Typing indicator */}
                    {showTyping && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <TypingIndicator />
                      </motion.div>
                    )}
                  </div>
                  {/* Input bar */}
                  <div className="px-3 pb-3 pt-1.5 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 bg-gray-50 rounded-full px-3 py-1.5" onClick={(e) => e.stopPropagation()}>
                      <span className="flex-1 text-[9px] text-gray-400">Type a message...</span>
                      <button className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(155 100% 75%), hsl(46 97% 64%))" }}>
                        <Send className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {tab === "Video" && (
                <motion.div key="video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
                  <VideoCallUI advisor={advisor} />
                </motion.div>
              )}

              {tab === "Schedule" && (
                <motion.div key="schedule" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
                  <ScheduleUI advisor={advisor} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </IPhoneMockup>
      </ScrollReveal>
    </SectionLayout>
  );
};

export default AdvisorSection;
