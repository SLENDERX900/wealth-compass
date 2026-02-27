import { motion } from "framer-motion";

interface FilterToggleGroupProps {
  options: string[];
  selected: string | string[];
  onChange: (value: string) => void;
  multi?: boolean;
  compact?: boolean;
  className?: string;
}

const FilterToggleGroup = ({ options, selected, onChange, multi = false, compact = false, className = "" }: FilterToggleGroupProps) => {
  const isSelected = (opt: string) =>
    multi ? (selected as string[]).includes(opt) : selected === opt;

  return (
    <div className={`flex flex-wrap ${compact ? "gap-1" : "gap-2"} ${className}`} onClick={(e) => e.stopPropagation()}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={(e) => { e.stopPropagation(); onChange(opt); }}
          className={`relative rounded-full font-medium transition-all duration-200
            ${compact ? "px-2 py-0.5 text-[9px]" : "px-4 py-1.5 text-sm"}
            ${isSelected(opt) ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {isSelected(opt) && (
            <motion.div
              layoutId={multi ? undefined : compact ? "filter-compact" : "filter-active"}
              className="absolute inset-0 rounded-full"
              style={{ background: "linear-gradient(90deg, hsla(155,100%,80%,0.15), hsla(46,97%,64%,0.15))" }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
          <span className="relative z-10">{opt}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterToggleGroup;
