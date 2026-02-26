import { motion } from "framer-motion";

interface FilterToggleGroupProps {
  options: string[];
  selected: string | string[];
  onChange: (value: string) => void;
  multi?: boolean;
  className?: string;
}

const FilterToggleGroup = ({ options, selected, onChange, multi = false, className = "" }: FilterToggleGroupProps) => {
  const isSelected = (opt: string) =>
    multi ? (selected as string[]).includes(opt) : selected === opt;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
            ${isSelected(opt) ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {isSelected(opt) && (
            <motion.div
              layoutId={multi ? undefined : "filter-active"}
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
