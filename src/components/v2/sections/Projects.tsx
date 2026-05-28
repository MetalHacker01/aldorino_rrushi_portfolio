import { Link } from "react-router-dom";
import AsciiRule from "@/components/v2/primitives/AsciiRule";
import MonoBadge from "@/components/v2/primitives/MonoBadge";
import OutlineButton from "@/components/v2/primitives/OutlineButton";
import { projects } from "@/v2/content/projects";

const Projects = () => (
  <section id="projects" aria-labelledby="projects-heading">
    <AsciiRule number="03" label="projects/" />
    <h2 id="projects-heading" className="mono accent" style={{ fontSize: "1.5rem", marginBottom: 16 }}>
      # projects
    </h2>
    <p
      style={{
        fontFamily: "var(--v2-font-sans)",
        fontSize: "1rem",
        lineHeight: 1.65,
        marginBottom: 24,
        color: "var(--v2-text-muted)",
      }}
    >
      Open-source tools I've built. Every one of them was born from a real client engagement where SFMC's UI or limits got in the way. All MIT-licensed. All used in production.
    </p>

    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {projects.map((p) => (
        <article
          key={p.slug}
          style={{
            border: "1px solid var(--v2-line)",
            padding: 20,
            background: "var(--v2-bg-surface)",
          }}
        >
          <header style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
              <span className="mono dim" style={{ fontSize: "0.8125rem" }}>~/projects/</span>
              <h3 className="mono" style={{ fontSize: "1.125rem", color: "var(--v2-accent)", margin: 0 }}>{p.slug}</h3>
              {p.signature && <MonoBadge variant="accent">★ signature</MonoBadge>}
              {p.status === "in-development" && <MonoBadge variant="red">◌ in development</MonoBadge>}
              {p.status === "shipped" && <MonoBadge variant="green">● shipped</MonoBadge>}
              <MonoBadge>{p.license}</MonoBadge>
            </div>
          </header>

          <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.55, marginBottom: 12 }}>
            {p.hook}
          </p>

          {p.stats.length > 0 && (
            <div className="mono muted" style={{ fontSize: "0.8125rem", marginBottom: 12 }}>
              {p.stats.join(" · ")}
            </div>
          )}

          {p.bullets.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
              {p.bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 10, marginBottom: 6, fontFamily: "var(--v2-font-sans)" }}>
                  <span className="mono dim">·</span>
                  <span style={{ fontSize: "0.9375rem", lineHeight: 1.55 }}>{b}</span>
                </li>
              ))}
            </ul>
          )}

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {p.caseStudyHref && (
              <Link
                to={p.caseStudyHref}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: "0.875rem",
                  textTransform: "lowercase",
                  padding: "8px 14px",
                  border: "1px solid var(--v2-accent)",
                  color: "var(--v2-accent)",
                  textDecoration: "none",
                  borderRadius: 0,
                  transition: "background var(--v2-dur) var(--v2-ease)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--v2-accent-soft)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                [ read case study → ]
              </Link>
            )}
            <OutlineButton href={p.githubUrl} variant="secondary">[ github ↗ ]</OutlineButton>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default Projects;
