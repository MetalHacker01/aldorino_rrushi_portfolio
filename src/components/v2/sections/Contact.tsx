import AsciiRule from "@/components/v2/primitives/AsciiRule";
import OutlineButton from "@/components/v2/primitives/OutlineButton";
import { contact } from "@/v2/content/contact";
import { siteMeta } from "@/v2/content/siteMeta";

const Contact = () => (
  <section id="contact" aria-labelledby="contact-heading">
    <AsciiRule number="06" label="contact.sh" />
    <h2 id="contact-heading" className="mono accent" style={{ fontSize: "1.5rem", marginBottom: 16 }}>
      # contact
    </h2>

    <div
      style={{
        border: "1px solid var(--v2-line-strong)",
        background: "var(--v2-bg-elevated)",
        padding: "16px 20px",
        fontFamily: "var(--v2-font-mono)",
        fontSize: "0.875rem",
        marginBottom: 24,
      }}
    >
      {contact.map((c) => (
        <div key={c.command} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "6px 0" }}>
          <span style={{ color: "var(--v2-signal-green)", minWidth: 12 }}>$</span>
          <span style={{ color: "var(--v2-accent)", minWidth: 96 }}>{c.command}</span>
          {c.href === "#" ? (
            <span style={{ color: "var(--v2-text)" }}>{c.value}</span>
          ) : (
            <a
              href={c.href}
              style={{ color: "var(--v2-text)", textDecoration: "underline", textDecorationColor: "var(--v2-text-dim)" }}
            >
              {c.value}
            </a>
          )}
        </div>
      ))}
    </div>

    <OutlineButton href={`mailto:${siteMeta.email}`} variant="primary">
      [ start a conversation ]
    </OutlineButton>
  </section>
);

export default Contact;
