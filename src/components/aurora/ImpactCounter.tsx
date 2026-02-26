import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface ImpactCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

const ImpactCounter = ({ value, suffix = "", prefix = "", decimals = 0, duration = 1500, className = "" }: ImpactCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(current.toFixed(decimals));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, decimals, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}{display}{suffix}
    </span>
  );
};

export default ImpactCounter;
