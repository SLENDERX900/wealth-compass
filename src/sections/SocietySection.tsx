import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";

const projects = [
  { id: 1, name: "Marina Solar Farm", category: "Clean Energy", status: "Completed", x: 55, y: 45, funding: "$12.4M", impact: "Powers 2,400 homes" },
  { id: 2, name: "Tuas Water Reclamation", category: "Water", status: "Funded", x: 25, y: 65, funding: "$8.2M", impact: "Saves 120ML/year" },
  { id: 3, name: "Punggol Eco-Town", category: "Green Buildings", status: "In Progress", x: 70, y: 30, funding: "$45M", impact: "Carbon-neutral district" },
  { id: 4, name: "Lazarus Reef Restoration", category: "Marine Conservation", status: "Funded", x: 50, y: 75, funding: "$3.1M", impact: "12 hectares restored" },
  { id: 5, name: "Jurong Island Solar", category: "Clean Energy", status: "In Progress", x: 15, y: 55, funding: "$22M", impact: "Powers 8,000 homes" },
  { id: 6, name: "Semakau Living Lab", category: "Marine Conservation", status: "Completed", x: 45, y: 85, funding: "$5.6M", impact: "Biodiversity +40%" },
];

const SocietySection = () => {
  const [categories, setCategories] = useState<string[]>(["Clean Energy", "Water", "Green Buildings", "Marine Conservation"]);
  const [viewMode, setViewMode] = useState("Map");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

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
        <p className="text-muted-foreground mb-8 max-w-lg">Track exactly where your investments create positive impact across Singapore.</p>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap gap-4 mb-8">
          <FilterToggleGroup options={["Clean Energy", "Water", "Green Buildings", "Marine Conservation"]} selected={categories} onChange={toggleCategory} multi />
          <FilterToggleGroup options={["Map", "List"]} selected={viewMode} onChange={setViewMode} />
          <FilterToggleGroup options={["All", "Funded", "In Progress", "Completed"]} selected={statusFilter} onChange={setStatusFilter} />
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <ScrollReveal delay={0.25}>
          {viewMode === "Map" ? (
            <div className="relative aspect-[4/3] bg-secondary/30 rounded-2xl overflow-hidden border border-border">
              {/* Simple Singapore outline */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-20">
                <path d="M20,40 Q30,30 50,35 Q70,25 80,40 Q85,50 75,60 Q65,70 50,65 Q35,70 25,60 Q15,50 20,40Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
              <AnimatePresence>
                {filtered.map((p) => (
                  <motion.button
                    key={p.id}
                    className="absolute w-3 h-3 rounded-full cursor-pointer z-10"
                    style={{ left: `${p.x}%`, top: `${p.y}%`, background: "linear-gradient(135deg, hsl(155 100% 80%), hsl(46 97% 64%))" }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.5 }}
                    onClick={() => setSelectedProject(selectedProject === p.id ? null : p.id)}
                  />
                ))}
              </AnimatePresence>
              <AnimatePresence>
                {selectedProject && (() => {
                  const p = projects.find((pr) => pr.id === selectedProject);
                  if (!p) return null;
                  return (
                    <motion.div
                      key={p.id}
                      className="absolute bottom-4 left-4 right-4 bg-card rounded-xl p-4 shadow-lg border-l-2"
                      style={{ borderLeftColor: "hsl(155 100% 80%)" }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                    >
                      <p className="font-medium text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{p.category} · {p.status}</p>
                      <div className="flex justify-between mt-2 text-xs">
                        <span>{p.funding}</span>
                        <span className="text-muted-foreground">{p.impact}</span>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((p) => (
                <motion.div key={p.id} className="bg-card rounded-lg p-4 border border-border" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.category}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">{p.status}</span>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>{p.funding}</span>
                    <span>{p.impact}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.35} className="flex justify-center">
          <IPhoneMockup>
            <div className="h-full p-4 bg-white text-gray-900 flex flex-col gap-2">
              <p className="pt-8 text-[10px] uppercase tracking-widest opacity-50 text-center">Impact Map</p>
              <div className="relative flex-1 bg-gray-50 rounded-lg overflow-hidden">
                {filtered.slice(0, 4).map((p) => (
                  <div key={p.id} className="absolute w-2 h-2 rounded-full bg-emerald-400" style={{ left: `${p.x}%`, top: `${p.y}%` }} />
                ))}
              </div>
              <div className="text-[10px] text-gray-500 text-center">{filtered.length} active projects</div>
            </div>
          </IPhoneMockup>
        </ScrollReveal>
      </div>
    </SectionLayout>
  );
};

export default SocietySection;
