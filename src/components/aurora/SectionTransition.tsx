import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type TransitionVariant = "gradient-wipe" | "fade-blur" | "parallax-reveal";

interface SectionTransitionProps {
  variant?: TransitionVariant;
  className?: string;
}

const SectionTransition = ({ variant = "gradient-wipe", className = "" }: SectionTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  if (variant === "gradient-wipe") {
    const x = useTransform(scrollYProgress, [0.1, 0.9], ["-100%", "200%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
      <div ref={ref} className={`relative h-24 md:h-32 overflow-hidden pointer-events-none ${className}`}>
        <motion.div
          className="absolute inset-y-0 w-[60%]"
          style={{ x, opacity }}
        >
          <div className="h-full w-full flex items-center">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[hsl(155,100%,80%)] to-transparent opacity-60" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="h-8 w-full bg-gradient-to-r from-transparent via-[hsla(155,100%,80%,0.06)] to-transparent blur-xl" />
          </div>
        </motion.div>
        {/* Subtle center dot */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{
            opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]),
            background: "linear-gradient(135deg, hsl(155 100% 80%), hsl(46 97% 64%))",
          }}
        />
      </div>
    );
  }

  if (variant === "fade-blur") {
    const blur = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 4, 0]);
    const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [1, 1.02, 1]);
    const lineOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.3, 0]);

    return (
      <div ref={ref} className={`relative h-24 md:h-32 overflow-hidden pointer-events-none ${className}`}>
        <motion.div
          className="absolute inset-0"
          style={{
            filter: useTransform(blur, (v) => `blur(${v}px)`),
            scale,
          }}
        >
          <div className="h-full w-full bg-gradient-to-b from-transparent via-[hsla(46,97%,64%,0.03)] to-transparent" />
        </motion.div>
        {/* Horizontal expansion line */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[hsl(var(--border))] to-transparent"
          style={{
            width: useTransform(scrollYProgress, [0.2, 0.5, 0.8], ["0%", "70%", "0%"]),
            opacity: lineOpacity,
          }}
        />
      </div>
    );
  }

  if (variant === "parallax-reveal") {
    const clipProgress = useTransform(scrollYProgress, [0.15, 0.85], [0, 100]);
    const shimmerX = useTransform(scrollYProgress, [0.1, 0.9], ["-100%", "200%"]);

    return (
      <div ref={ref} className={`relative h-24 md:h-32 overflow-hidden pointer-events-none ${className}`}>
        {/* Diagonal reveal wipe */}
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: useTransform(clipProgress, (v) => `polygon(0 0, ${v}% 0, ${Math.max(0, v - 30)}% 100%, 0 100%)`),
            background: "linear-gradient(135deg, hsla(155,100%,80%,0.04), hsla(46,97%,64%,0.04))",
          }}
        />
        {/* Moving shimmer line */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-32 h-px"
          style={{
            x: shimmerX,
            background: "linear-gradient(90deg, transparent, hsl(46 97% 64% / 0.4), transparent)",
          }}
        />
      </div>
    );
  }

  return null;
};

export default SectionTransition;
