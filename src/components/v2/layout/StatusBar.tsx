import { useEffect, useState } from "react";
import { certifications } from "@/v2/content/certifications";

type Props = { activeId: string; latestCommit?: string };

const today = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const sectionNumber: Record<string, string> = {
  about: "01",
  experience: "02",
  projects: "03",
  certs: "04",
  ai: "05",
  contact: "06",
};

const StatusBar = ({ activeId, latestCommit }: Props) => {
  const [date, setDate] = useState(today());
  useEffect(() => {
    const t = setInterval(() => setDate(today()), 60_000);
    return () => clearInterval(t);
  }, []);

  const sfCount = certifications.filter((c) => c.provider === "Salesforce").length;
  const num = sectionNumber[activeId] ?? "01";

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--v2-line)",
        background: "var(--v2-bg-surface)",
        height: 28,
        display: "flex",
        alignItems: "center",
        padding: "0 14px",
        fontFamily: "var(--v2-font-mono)",
        fontSize: "0.75rem",
        color: "var(--v2-text-muted)",
        gap: 14,
        flexShrink: 0,
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      <span style={{ color: "var(--v2-signal-green)" }}>●</span>
      <span>main</span>
      <span className="dim">·</span>
      <span>{sfCount}× certified</span>
      <span className="dim">·</span>
      <span><span style={{ color: "var(--v2-accent)" }}>§{num}</span> {activeId || "about"}</span>
      <span className="dim">·</span>
      <span>{date}</span>
      {latestCommit && (
        <>
          <span className="dim">·</span>
          <span className="hide-md" style={{ overflow: "hidden", textOverflow: "ellipsis", maxWidth: 360 }}>
            last commit: {latestCommit}
          </span>
        </>
      )}
      <span style={{ flex: 1 }} />
      <span className="dim hide-sm">made in tirana, albania</span>
    </footer>
  );
};

export default StatusBar;
