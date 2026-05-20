import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import type { ReactNode } from "react";

type Props = {
  trigger: ReactNode;
  lines: string[];
};

const HoverPeek = ({ trigger, lines }: Props) => (
  <HoverCard openDelay={150} closeDelay={50}>
    <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
    <HoverCardContent
      side="right"
      align="start"
      sideOffset={8}
      style={{
        background: "var(--v2-bg-elevated)",
        border: "1px solid var(--v2-line-strong)",
        borderRadius: 0,
        padding: "12px 16px",
        color: "var(--v2-text-muted)",
        fontFamily: "var(--v2-font-mono)",
        fontSize: "0.8125rem",
        lineHeight: 1.5,
        boxShadow: "none",
        maxWidth: 360,
      }}
    >
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </HoverCardContent>
  </HoverCard>
);

export default HoverPeek;
