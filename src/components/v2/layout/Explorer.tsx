import { useState } from "react";
import { Link } from "react-router-dom";
import HoverPeek from "@/components/v2/primitives/HoverPeek";
import { projects } from "@/v2/content/projects";

type FileItem = { id: string; label: string; preview: string[] };

const files: FileItem[] = [
  { id: "about",      label: "about.md",        preview: ["solution engineer at marketone", "sfmc · eloqua · marketo · responsys · unica", "msc informatics engineering · upt", "tirana, remote-global"] },
  { id: "experience", label: "experience.json", preview: ["4 roles in reverse-chron order", "click to expand each row", "tech stack tagged per role", "covers 2017 → present"] },
  { id: "projects",   label: "projects/",       preview: ["open-source field tools", "scout · cpm · maestro · sto", "all MIT, all production-used"] },
  { id: "certs",      label: "certs.txt",       preview: ["7× salesforce-certified", "ai associate · agentforce specialist", "mc consultant · developer · admin", "email specialist · platform foundations"] },
  { id: "ai",         label: "ai.md",           preview: ["agentic martech direction", "agentforce + ai associate certified", "local llms on real hardware"] },
  { id: "contact",    label: "contact.sh",      preview: ["mailto + linkedin + github", "tirana, remote-global", "available for engagements"] },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  if (typeof history !== "undefined" && history.replaceState) {
    history.replaceState(null, "", `#${id}`);
  }
};

type Props = { activeId?: string; onNavigate?: () => void };

const Explorer = ({ activeId, onNavigate }: Props) => {
  const [projectsOpen, setProjectsOpen] = useState(true);

  const handleClick = (id: string, isProjects: boolean) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (isProjects) setProjectsOpen((v) => !v);
    scrollTo(id);
    onNavigate?.();
  };

  return (
    <nav
      aria-label="file explorer"
      style={{
        width: 240,
        height: "100%",
        borderRight: "1px solid var(--v2-line)",
        background: "var(--v2-bg-surface)",
        padding: "14px 0",
        fontFamily: "var(--v2-font-mono)",
        fontSize: "0.8125rem",
        flexShrink: 0,
        overflowY: "auto",
      }}
    >
      <div className="mono dim" style={{ padding: "0 16px 8px", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        explorer
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 16px 10px" }}>
        <img
          src="/images/profilePic.png"
          alt=""
          aria-hidden="true"
          style={{
            width: 22,
            height: 22,
            objectFit: "cover",
            border: "1px solid var(--v2-line-strong)",
            borderRadius: "50%",
            flexShrink: 0,
          }}
        />
        <span className="mono" style={{ color: "var(--v2-text-muted)" }}>
          ~ <span style={{ color: "var(--v2-accent)" }}>aldorino</span>
        </span>
      </div>
      {files.map((f) => {
        const isActive = activeId === f.id;
        const isProjects = f.id === "projects";

        const row = (
          <a
            href={`#${f.id}`}
            style={{
              display: "block",
              padding: "5px 16px 5px 24px",
              color: isActive ? "var(--v2-accent)" : "var(--v2-text)",
              textDecoration: "none",
              borderLeft: isActive ? "2px solid var(--v2-accent)" : "2px solid transparent",
              transition: "background var(--v2-dur) var(--v2-ease)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--v2-accent-soft)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            onClick={handleClick(f.id, isProjects)}
          >
            <span style={{ marginRight: 6, color: isActive ? "var(--v2-accent)" : "var(--v2-text-muted)" }}>
              {isProjects ? (projectsOpen ? "▾" : "▸") : (isActive ? "▸" : " ")}
            </span>
            {f.label}
          </a>
        );

        return (
          <div key={f.id}>
            <HoverPeek trigger={row} lines={f.preview} />
            {isProjects && projectsOpen && (
              <div>
                {projects.map((p) => {
                  const projLine = (
                    <Link
                      to={p.caseStudyHref ?? p.githubUrl}
                      style={{
                        display: "block",
                        padding: "4px 16px 4px 48px",
                        color: "var(--v2-text-muted)",
                        textDecoration: "none",
                        fontSize: "0.8125rem",
                        transition: "color var(--v2-dur) var(--v2-ease), background var(--v2-dur) var(--v2-ease)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--v2-accent)";
                        e.currentTarget.style.background = "var(--v2-accent-soft)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--v2-text-muted)";
                        e.currentTarget.style.background = "transparent";
                      }}
                      onClick={() => onNavigate?.()}
                    >
                      • {p.slug}
                    </Link>
                  );
                  return (
                    <HoverPeek
                      key={p.slug}
                      trigger={projLine}
                      lines={[p.hook, "", ...p.stats.map((s) => "· " + s)]}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Explorer;
