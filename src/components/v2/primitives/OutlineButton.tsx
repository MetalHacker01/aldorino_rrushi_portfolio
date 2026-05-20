import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

type AsAnchor = CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps>;
type AsButton = CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

const styleFor = (variant: "primary" | "secondary"): CSSProperties => ({
  display: "inline-block",
  fontFamily: "var(--v2-font-mono)",
  fontSize: "0.875rem",
  textTransform: "lowercase",
  letterSpacing: "0.02em",
  padding: "10px 16px",
  border: `1px solid ${variant === "primary" ? "var(--v2-accent)" : "var(--v2-line-strong)"}`,
  color: variant === "primary" ? "var(--v2-accent)" : "var(--v2-text)",
  background: "transparent",
  textDecoration: "none",
  cursor: "pointer",
  transition: "background var(--v2-dur) var(--v2-ease), color var(--v2-dur) var(--v2-ease)",
  borderRadius: 0,
});

const OutlineButton = (props: AsAnchor | AsButton) => {
  const { variant = "primary", children, ...rest } = props;
  const baseStyle = styleFor(variant);

  if ("href" in props && props.href !== undefined) {
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        {...anchorRest}
        href={props.href}
        style={baseStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--v2-accent-soft)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        {children}
      </a>
    );
  }
  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      {...buttonRest}
      style={baseStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--v2-accent-soft)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
