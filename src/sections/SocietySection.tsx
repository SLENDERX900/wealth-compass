import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";
import PhoneNavBar from "@/components/aurora/PhoneNavBar";

const projects = [
  { id: 1, name: "Marina Solar Farm", region: "Marina Bay", category: "Clean Energy", status: "Completed", x: 62, y: 52, funding: "$12.4M", impact: "Powers 2,400 homes" },
  { id: 2, name: "Tuas Desalination Plant", region: "Tuas", category: "Water", status: "Funded", x: 15, y: 62, funding: "$8.2M", impact: "Saves 120ML/year" },
  { id: 3, name: "Punggol Eco-Town", region: "Punggol", category: "Green Buildings", status: "In Progress", x: 72, y: 25, funding: "$45M", impact: "Carbon-neutral district" },
  { id: 4, name: "Lazarus Reef Restoration", region: "Sentosa", category: "Marine", status: "Funded", x: 55, y: 78, funding: "$3.1M", impact: "12 hectares restored" },
  { id: 5, name: "Jurong Solar Array", region: "Jurong", category: "Clean Energy", status: "In Progress", x: 25, y: 45, funding: "$22M", impact: "Powers 8,000 homes" },
  { id: 6, name: "Semakau Living Lab", region: "Semakau", category: "Marine", status: "Completed", x: 52, y: 90, funding: "$5.6M", impact: "Biodiversity +40%" },
];

const catColors: Record<string, string> = { "Clean Energy": "#22c55e", Water: "#3b82f6", "Green Buildings": "#f59e0b", Marine: "#06b6d4" };

const SocietySection = () => {
  const [categories, setCategories] = useState<string[]>(["Clean Energy", "Water", "Green Buildings", "Marine"]);
  const [viewMode, setViewMode] = useState("Map");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState("insights");

  const toggleCategory = (cat: string) => {
    setCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
  };

  const filtered = projects.filter(
    (p) => categories.includes(p.category) && (statusFilter === "All" || p.status === statusFilter)
  );

  return (
    <SectionLayout id="society">
      <ScrollReveal><SectionLabel label="SOCIETY" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="Real Change." className="mb-4">Your Money. Real Change.</GradientHeadline>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground mb-6 max-w-lg">Track exactly where your investments create positive impact across Singapore.</p>
      </ScrollReveal>

      {/* Editorial project cards */}
      <ScrollReveal delay={0.2}>
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {projects.slice(0, 3).map((p) => (
            <div key={p.id} className="bg-card rounded-xl border border-border p-4 border-l-[3px]" style={{ borderLeftColor: catColors[p.category] }}>
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{p.region} · {p.category}</p>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{p.funding}</span><span>{p.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* iPhone with map + controls */}
      <ScrollReveal delay={0.3} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full bg-white text-gray-900 flex flex-col">
            {activeNav === "insights" ? (
              <>
            <div className="pt-10 px-3 pb-1">
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-center mb-2">Impact Map</p>
              {/* Category chips */}
              <div className="flex gap-1 overflow-x-auto pb-1" onClick={(e) => e.stopPropagation()}>
                {["Clean Energy", "Water", "Green Buildings", "Marine"].map((cat) => (
                  <button key={cat} onClick={(e) => { e.stopPropagation(); toggleCategory(cat); }}
                    className={`flex-shrink-0 text-[8px] px-2 py-0.5 rounded-full border transition-all flex items-center gap-1 ${
                      categories.includes(cat) ? "border-gray-300 bg-gray-50" : "border-gray-200 opacity-40"
                    }`}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: catColors[cat] }} />
                    {cat}
                  </button>
                ))}
              </div>
              {/* View + Status */}
              <div className="flex gap-1 mt-1" onClick={(e) => e.stopPropagation()}>
                <FilterToggleGroup compact options={["Map", "List"]} selected={viewMode} onChange={setViewMode} />
                <FilterToggleGroup compact options={["All", "Funded", "In Progress"]} selected={statusFilter} onChange={setStatusFilter} />
              </div>
            </div>

            {/* Map or List */}
            <div className="flex-1 px-3 pb-3 relative">
              {viewMode === "Map" ? (
                <div className="relative w-full h-full bg-gradient-to-b from-cyan-50/50 to-blue-50/30 rounded-xl overflow-hidden">
                  {/* Detailed Singapore SVG outline */}
                  <svg viewBox="0 0 200 130" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                    <path d="M30,55 Q35,42 50,38 Q58,35 70,33 Q80,30 95,28 Q110,26 125,30 Q135,32 145,38 Q155,42 165,50 Q170,55 168,62 Q165,70 155,75 Q145,80 130,82 Q120,84 108,80 Q100,78 92,80 Q85,82 75,80 Q65,78 55,75 Q45,72 38,65 Q32,60 30,55Z"
                      fill="hsla(155,100%,80%,0.08)" stroke="hsl(155 100% 75%)" strokeWidth="0.8" />
                    {/* Sentosa */}
                    <path d="M95,88 Q100,85 108,86 Q112,88 108,90 Q103,92 97,90 Q94,89 95,88Z"
                      fill="hsla(155,100%,80%,0.08)" stroke="hsl(155 100% 75%)" strokeWidth="0.5" />
                    {/* Region labels */}
                    <text x="40" y="52" fontSize="4" fill="#9ca3af" fontFamily="sans-serif">Jurong</text>
                    <text x="55" y="40" fontSize="4" fill="#9ca3af" fontFamily="sans-serif">Bukit Timah</text>
                    <text x="120" y="50" fontSize="4" fill="#9ca3af" fontFamily="sans-serif">Marina Bay</text>
                    <text x="135" y="35" fontSize="4" fill="#9ca3af" fontFamily="sans-serif">Punggol</text>
                    <text x="25" y="68" fontSize="4" fill="#9ca3af" fontFamily="sans-serif">Tuas</text>
                    <text x="95" y="96" fontSize="4" fill="#9ca3af" fontFamily="sans-serif">Sentosa</text>
                    <text x="105" y="108" fontSize="3.5" fill="#9ca3af" fontFamily="sans-serif">{'Semakau \u2192'}</text>
                  </svg>

                  {/* Project dots */}
                  <AnimatePresence>
                    {filtered.map((p) => (
                      <motion.button
                        key={p.id}
                        className="absolute z-10 flex items-center justify-center"
                        style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        onClick={(e) => { e.stopPropagation(); setSelectedProject(selectedProject === p.id ? null : p.id); }}
                      >
                        <span className="w-3 h-3 rounded-full border-2 border-white shadow-md"
                          style={{ background: catColors[p.category] }} />
                      </motion.button>
                    ))}
                  </AnimatePresence>

                  {/* Detail card */}
                  <AnimatePresence>
                    {selectedProject && (() => {
                      const p = projects.find((pr) => pr.id === selectedProject);
                      if (!p) return null;
                      return (
                        <motion.div key={p.id}
                          className="absolute bottom-2 left-2 right-2 bg-white rounded-xl p-3 shadow-lg border-l-[3px] z-20"
                          style={{ borderLeftColor: catColors[p.category] }}
                          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
                          onClick={(e) => e.stopPropagation()}>
                          <p className="text-[11px] font-medium">{p.name}</p>
                          <p className="text-[9px] text-gray-400 mt-0.5">{p.region} · {p.status}</p>
                          <div className="flex justify-between mt-1.5 text-[9px]">
                            <span className="font-medium">{p.funding}</span>
                            <span className="text-gray-500">{p.impact}</span>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="space-y-1.5 overflow-y-auto h-full">
                  {filtered.map((p) => (
                    <div key={p.id} className="bg-gray-50 rounded-xl p-2.5 border-l-[3px]" style={{ borderLeftColor: catColors[p.category] }}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-medium">{p.name}</p>
                          <p className="text-[9px] text-gray-400">{p.region}</p>
                        </div>
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-gray-200">{p.status}</span>
                      </div>
                      <div className="flex justify-between mt-1 text-[9px] text-gray-500">
                        <span>{p.funding}</span><span>{p.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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

export default SocietySection;
