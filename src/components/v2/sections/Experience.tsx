import { useState } from "react";
import AsciiRule from "@/components/v2/primitives/AsciiRule";
import MonoBadge from "@/components/v2/primitives/MonoBadge";
import { experience } from "@/v2/content/experience";

const Experience = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="experience" aria-labelledby="experience-heading">
      <AsciiRule number="02" label="experience.json" />
      <h2 id="experience-heading" className="mono accent" style={{ fontSize: "1.5rem", marginBottom: 16 }}>
        # experience
      </h2>
      <p className="mono muted" style={{ fontSize: "0.8125rem", marginBottom: 24 }}>
        // click any row to expand
      </p>

      <div style={{ borderTop: "1px solid var(--v2-line)" }}>
        {experience.map((role, idx) => {
          const isOpen = openIndex === idx;
          return (
            <article
              key={idx}
              style={{ borderBottom: "1px solid var(--v2-line)" }}
            >
              <button
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                style={{
                  width: "100%",
                  padding: "16px 0",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 16,
                  textAlign: "left",
                  color: "var(--v2-text)",
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: "0.875rem",
                  flexWrap: "wrap",
                }}
              >
                <span>
                  <span style={{ color: "var(--v2-accent)", marginRight: 8 }}>
                    {isOpen ? "▾" : "▸"}
                  </span>
                  <strong style={{ fontWeight: 600 }}>{role.title}</strong>
                  <span className="dim" style={{ margin: "0 8px" }}>@</span>
                  <span>{role.company}</span>
                </span>
                <span className="muted">{role.period}</span>
              </button>

              {isOpen && (
                <div style={{ padding: "0 0 24px 20px" }}>
                  <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 12 }}>
                    {role.summary}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                    {role.achievements.map((a, i) => (
                      <li key={i} style={{ display: "flex", gap: 10, marginBottom: 6, fontFamily: "var(--v2-font-sans)" }}>
                        <span className="mono dim">·</span>
                        <span style={{ fontSize: "0.9375rem", lineHeight: 1.55 }}>{a}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {role.technologies.map((t) => (
                      <MonoBadge key={t}>{t}</MonoBadge>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
