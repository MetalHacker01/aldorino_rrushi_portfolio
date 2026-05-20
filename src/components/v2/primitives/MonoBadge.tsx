import type { ReactNode } from "react";

type Variant = "default" | "accent" | "green" | "red";

type Props = {
  children: ReactNode;
  variant?: Variant;
};

const variantColor: Record<Variant, { border: string; color: string }> = {
  default: { border: "var(--v2-line-strong)", color: "var(--v2-text-muted)" },
  accent:  { border: "var(--v2-accent)",      color: "var(--v2-accent)" },
  green:   { border: "var(--v2-signal-green)", color: "var(--v2-signal-green)" },
  red:     { border: "var(--v2-signal-red)",  color: "var(--v2-signal-red)" },
};

const MonoBadge = ({ children, variant = "default" }: Props) => {
  const c = variantColor[variant];
  return (
    <span
      className="mono"
      style={{
        display: "inline-block",
        border: `1px solid ${c.border}`,
        color: c.color,
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        padding: "2px 8px",
        borderRadius: 0,
        background: "transparent",
        lineHeight: 1.4,
      }}
    >
      {children}
    </span>
  );
};

export default MonoBadge;
