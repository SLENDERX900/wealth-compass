interface GradientHeadlineProps {
  children: React.ReactNode;
  highlight?: string;
  className?: string;
  underline?: boolean;
}

const GradientHeadline = ({ children, highlight, className = "", underline = false }: GradientHeadlineProps) => {
  if (!highlight) {
    return <h2 className={`text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground leading-[1.1] ${className}`}>{children}</h2>;
  }

  const text = typeof children === "string" ? children : "";
  const parts = text.split(highlight);

  return (
    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground leading-[1.1] ${className}`}>
      {parts[0]}
      <span className="relative inline-block">
        <span className="gradient-text-animated">{highlight}</span>
        {underline && (
          <span
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
            style={{
              background: "linear-gradient(90deg, hsl(155 100% 80%), hsl(46 97% 64%))",
              animation: "draw-underline 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          />
        )}
      </span>
      {parts[1] || ""}
    </h2>
  );
};

export default GradientHeadline;
