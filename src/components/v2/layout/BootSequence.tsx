import { useEffect, useState } from "react";

type Props = { onDone: () => void };

const lines = [
  "booting portfolio v2.0.0",
  "loading file system...   ok",
  "mounting 4 projects...   ok",
  "verifying 7 certs...     ok",
  "ready.",
];

const BootSequence = ({ onDone }: Props) => {
  const [shown, setShown] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (shown >= lines.length) {
      const t = setTimeout(() => {
        setHide(true);
        setTimeout(onDone, 300);
      }, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((n) => n + 1), 550);
    return () => clearTimeout(t);
  }, [shown, onDone]);

  useEffect(() => {
    const skip = () => {
      setHide(true);
      setTimeout(onDone, 200);
    };
    window.addEventListener("scroll", skip, { once: true, passive: true });
    window.addEventListener("click", skip, { once: true });
    return () => {
      window.removeEventListener("scroll", skip);
      window.removeEventListener("click", skip);
    };
  }, [onDone]);

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--v2-bg-app)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: hide ? 0 : 1,
        transition: "opacity 300ms var(--v2-ease)",
        pointerEvents: hide ? "none" : "auto",
      }}
    >
      <div
        className="mono"
        style={{ color: "var(--v2-text-muted)", fontSize: "0.9rem", lineHeight: 1.8, minWidth: 340 }}
      >
        {lines.slice(0, shown).map((l, i) => (
          <div key={i}>
            <span style={{ color: "var(--v2-signal-green)" }}>$</span> {l}
          </div>
        ))}
        {shown < lines.length && <span className="cursor-block" />}
      </div>
    </div>
  );
};

export default BootSequence;
