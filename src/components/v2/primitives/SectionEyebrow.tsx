type Props = {
  number: string;
  label: string;
};

const SectionEyebrow = ({ number, label }: Props) => (
  <div
    className="mono"
    style={{
      position: "sticky",
      top: 0,
      background: "var(--v2-bg-app)",
      color: "var(--v2-text-muted)",
      fontSize: "0.75rem",
      letterSpacing: "0.05em",
      padding: "8px 0",
      borderBottom: "1px solid var(--v2-line)",
      zIndex: 10,
      textTransform: "lowercase",
    }}
  >
    <span style={{ color: "var(--v2-accent)" }}>§{number}</span> {label}
  </div>
);

export default SectionEyebrow;
