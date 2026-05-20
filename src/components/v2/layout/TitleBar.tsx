import { siteMeta } from "@/v2/content/siteMeta";

const TitleBar = () => (
  <header
    role="banner"
    style={{
      height: 36,
      borderBottom: "1px solid var(--v2-line)",
      background: "var(--v2-bg-surface)",
      display: "flex",
      alignItems: "center",
      padding: "0 14px",
      gap: 14,
      flexShrink: 0,
    }}
  >
    <div style={{ display: "flex", gap: 6 }} aria-hidden="true">
      <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#E5484D" }} />
      <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#F5A623" }} />
      <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#7DDB6D" }} />
    </div>
    <div className="mono" style={{ fontSize: "0.8125rem", color: "var(--v2-text-muted)" }}>
      <span>~/portfolio</span>
      <span className="dim"> ── </span>
      <span>main</span>
    </div>
    <div style={{ flex: 1 }} />
    <div className="mono dim hide-sm" style={{ fontSize: "0.75rem" }}>v{siteMeta.version}</div>
  </header>
);

export default TitleBar;
