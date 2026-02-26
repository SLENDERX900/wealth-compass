interface SectionLayoutProps {
  children: React.ReactNode;
  className?: string;
  wash?: "cyan" | "gold" | "none";
  id?: string;
}

const SectionLayout = ({ children, className = "", wash = "none", id }: SectionLayoutProps) => {
  const washClass = wash === "cyan" ? "section-cyan-wash" : wash === "gold" ? "section-gold-wash" : "";

  return (
    <section id={id} className={`relative py-28 md:py-36 lg:py-40 ${washClass} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {children}
      </div>
    </section>
  );
};

export default SectionLayout;
