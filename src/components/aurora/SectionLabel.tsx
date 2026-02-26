interface SectionLabelProps {
  label: string;
}

const SectionLabel = ({ label }: SectionLabelProps) => (
  <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
    {label}
  </span>
);

export default SectionLabel;
