type Props = {
  number: string;
  label: string;
};

const AsciiRule = ({ number, label }: Props) => {
  return (
    <div
      role="separator"
      aria-label={`section ${number}: ${label}`}
      className="mono"
      style={{
        color: "var(--v2-text-muted)",
        fontSize: "0.875rem",
        margin: "64px 0 32px",
        userSelect: "none",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: "var(--v2-line-strong)" }}>═══════════ </span>
      <span style={{ color: "var(--v2-accent)" }}>{number}</span>
      <span style={{ color: "var(--v2-text-muted)" }}> / {label} </span>
      <span style={{ color: "var(--v2-line-strong)" }}>═══════════════════════════════════════════════</span>
    </div>
  );
};

export default AsciiRule;
