import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IPhoneMockupProps {
  children: React.ReactNode;
  className?: string;
  expandable?: boolean;
}

const IPhoneMockup = ({ children, className = "", expandable = true }: IPhoneMockupProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        className={`relative z-40 cursor-pointer ${className}`}
        animate={expanded ? { scale: 1.15 } : { scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => expandable && setExpanded(!expanded)}
        style={{ animation: "shadow-pulse 4s ease-in-out infinite" }}
      >
        {/* Phone frame */}
        <div className="relative w-[280px] md:w-[300px] rounded-[44px] border-[6px] border-foreground/10 bg-foreground/5 p-2 shadow-lg shadow-aurora-cyan/10">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-foreground/10 rounded-b-2xl z-10" />

          {/* Screen */}
          <div className="relative w-full aspect-[9/19.5] rounded-[36px] bg-card overflow-hidden">
            {children}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-foreground/20 rounded-full" />
        </div>
      </motion.div>
    </>
  );
};

export default IPhoneMockup;
