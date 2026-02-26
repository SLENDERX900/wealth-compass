import { motion } from "framer-motion";

interface GradientBorderCardProps {
  children: React.ReactNode;
  className?: string;
  hoverLift?: boolean;
}

const GradientBorderCard = ({ children, className = "", hoverLift = true }: GradientBorderCardProps) => (
  <motion.div
    className={`relative rounded-xl bg-card gradient-border overflow-hidden ${className}`}
    whileHover={hoverLift ? { y: -3, transition: { duration: 0.25 } } : undefined}
  >
    {children}
  </motion.div>
);

export default GradientBorderCard;
