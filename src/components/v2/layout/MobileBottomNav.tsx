type Item = { id: string; label: string };

const items: Item[] = [
  { id: "about",      label: "about" },
  { id: "experience", label: "exp" },
  { id: "projects",   label: "projects" },
  { id: "certs",      label: "certs" },
  { id: "ai",         label: "ai" },
  { id: "contact",    label: "contact" },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

type Props = { activeId: string };

const MobileBottomNav = ({ activeId }: Props) => (
  <nav
    aria-label="section navigation"
    className="show-sm-only"
    style={{
      borderTop: "1px solid var(--v2-line)",
      background: "var(--v2-bg-surface)",
      flexShrink: 0,
      overflowX: "auto",
      WebkitOverflowScrolling: "touch",
      display: "flex",
      gap: 0,
      padding: "6px 8px",
    }}
  >
    {items.map((it) => {
      const isActive = activeId === it.id;
      return (
        <button
          key={it.id}
          onClick={() => scrollTo(it.id)}
          style={{
            flex: "0 0 auto",
            padding: "8px 12px",
            margin: "0 2px",
            background: isActive ? "var(--v2-accent-soft)" : "transparent",
            border: `1px solid ${isActive ? "var(--v2-accent)" : "var(--v2-line-strong)"}`,
            color: isActive ? "var(--v2-accent)" : "var(--v2-text-muted)",
            fontFamily: "var(--v2-font-mono)",
            fontSize: "0.75rem",
            textTransform: "lowercase",
            letterSpacing: "0.04em",
            cursor: "pointer",
            borderRadius: 0,
            transition: "background var(--v2-dur) var(--v2-ease), color var(--v2-dur) var(--v2-ease), border-color var(--v2-dur) var(--v2-ease)",
            whiteSpace: "nowrap",
          }}
        >
          {it.label}
        </button>
      );
    })}
  </nav>
);

export default MobileBottomNav;
