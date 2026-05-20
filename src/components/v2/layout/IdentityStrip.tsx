const IdentityStrip = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "10px 16px",
      background: "var(--v2-bg-app)",
      borderBottom: "1px solid var(--v2-line)",
      flexShrink: 0,
      overflow: "hidden",
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
      <div
        className="mono"
        style={{
          fontSize: "0.95rem",
          letterSpacing: "0.06em",
          fontWeight: 600,
          color: "var(--v2-accent)",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        ALDORINO RRUSHI
      </div>
      <div
        className="mono muted"
        style={{
          fontSize: "0.75rem",
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        solution engineer <span className="dim">·</span> martech <span className="dim">·</span> software <span className="dim">·</span> ai
      </div>
    </div>
    <div style={{ flex: 1 }} />
    <div className="mono muted hide-md" style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}>
      <span style={{ color: "var(--v2-accent)" }}>★</span> 7× salesforce-certified
      <span className="dim"> · </span>
      tirana, AL
    </div>
  </div>
);

export default IdentityStrip;
