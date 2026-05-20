import AsciiRule from "@/components/v2/primitives/AsciiRule";
import MonoBadge from "@/components/v2/primitives/MonoBadge";
import { ai } from "@/v2/content/ai";

const AI = () => (
  <section id="ai" aria-labelledby="ai-heading">
    <AsciiRule number="05" label="ai.md" />
    <h2 id="ai-heading" className="mono accent" style={{ fontSize: "1.5rem", marginBottom: 16 }}>
      # ai
    </h2>

    {ai.paragraphs.map((p, i) => (
      <p
        key={i}
        style={{
          fontFamily: "var(--v2-font-sans)",
          fontSize: "1rem",
          lineHeight: 1.65,
          marginBottom: 16,
        }}
      >
        {p}
      </p>
    ))}

    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "16px 0 24px" }}>
      {ai.certs.map((c) => (
        <MonoBadge key={c} variant="accent">{c}</MonoBadge>
      ))}
    </div>

    <div className="mono muted" style={{ fontSize: "0.8125rem", marginBottom: 8 }}>
      currently exploring:
    </div>
    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
      {ai.currentlyExploring.map((item, i) => (
        <li key={i} className="mono" style={{ fontSize: "0.875rem", marginBottom: 4, color: "var(--v2-text)" }}>
          <span className="dim">·</span> {item}
        </li>
      ))}
    </ul>

    <p
      style={{
        fontFamily: "var(--v2-font-sans)",
        fontStyle: "italic",
        fontSize: "0.9375rem",
        color: "var(--v2-text-muted)",
      }}
    >
      {ai.closingLine}
    </p>
  </section>
);

export default AI;
