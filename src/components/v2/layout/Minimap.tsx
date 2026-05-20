type Item = { id: string; number: string; label: string };

const items: Item[] = [
  { id: "about",      number: "01", label: "about" },
  { id: "experience", number: "02", label: "experience" },
  { id: "projects",   number: "03", label: "projects" },
  { id: "certs",      number: "04", label: "certs" },
  { id: "ai",         number: "05", label: "ai" },
  { id: "contact",    number: "06", label: "contact" },
];

type Props = { activeId: string };

const Minimap = ({ activeId }: Props) => (
  <aside
    aria-label="section minimap"
    className="hide-md"
    style={{
      width: 88,
      borderLeft: "1px solid var(--v2-line)",
      background: "var(--v2-bg-surface)",
      padding: "14px 0",
      fontFamily: "var(--v2-font-mono)",
      fontSize: "0.7rem",
      color: "var(--v2-text-muted)",
      flexShrink: 0,
      overflowY: "auto",
    }}
  >
    {items.map((it) => {
      const isActive = activeId === it.id;
      return (
        <a
          key={it.id}
          href={`#${it.id}`}
          style={{
            display: "block",
            padding: "6px 12px 6px 14px",
            color: isActive ? "var(--v2-accent)" : "var(--v2-text-muted)",
            textDecoration: "none",
            borderLeft: isActive ? "2px solid var(--v2-accent)" : "2px solid transparent",
            transition: "color var(--v2-dur) var(--v2-ease)",
          }}
        >
          <span className="dim" style={{ marginRight: 4 }}>{it.number}</span>
          {it.label}
        </a>
      );
    })}
  </aside>
);

export default Minimap;
