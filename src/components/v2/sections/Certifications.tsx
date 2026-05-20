import AsciiRule from "@/components/v2/primitives/AsciiRule";
import OutlineButton from "@/components/v2/primitives/OutlineButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { certifications } from "@/v2/content/certifications";
import { siteMeta } from "@/v2/content/siteMeta";

const Certifications = () => {
  const sf = certifications.filter((c) => c.provider === "Salesforce");
  const hs = certifications.filter((c) => c.provider === "HubSpot");

  return (
    <section id="certs" aria-labelledby="certs-heading">
      <AsciiRule number="04" label="certs.txt" />
      <h2 id="certs-heading" className="mono accent" style={{ fontSize: "1.5rem", marginBottom: 16 }}>
        # certs
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
        7× Salesforce-certified. AI + MarTech focus.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {sf.map((cert) => (
          <Dialog key={cert.name}>
            <DialogTrigger asChild>
              <button
                style={{
                  border: "1px solid var(--v2-line-strong)",
                  background: "var(--v2-bg-surface)",
                  padding: 14,
                  textAlign: "left",
                  cursor: "pointer",
                  color: "var(--v2-text)",
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: "0.8125rem",
                  borderRadius: 0,
                  transition: "border-color var(--v2-dur) var(--v2-ease), background var(--v2-dur) var(--v2-ease)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--v2-accent)";
                  e.currentTarget.style.background = "var(--v2-accent-soft)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--v2-line-strong)";
                  e.currentTarget.style.background = "var(--v2-bg-surface)";
                }}
              >
                <div className="mono dim" style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                  {cert.type} · {cert.category}
                </div>
                <div style={{ fontWeight: 500 }}>{cert.short}</div>
                <div className="mono muted" style={{ fontSize: "0.7rem", marginTop: 8 }}>
                  → view certificate
                </div>
              </button>
            </DialogTrigger>
            <DialogContent style={{ maxWidth: 720, background: "var(--v2-bg-elevated)", border: "1px solid var(--v2-line-strong)", borderRadius: 0, color: "var(--v2-text)" }}>
              <DialogHeader>
                <DialogTitle style={{ fontFamily: "var(--v2-font-mono)", color: "var(--v2-accent)" }}>
                  {cert.name}
                </DialogTitle>
              </DialogHeader>
              <img
                src={cert.imagePath}
                alt={cert.name}
                style={{ width: "100%", maxHeight: "70vh", objectFit: "contain", background: "#fff", marginTop: 8 }}
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>

      <div className="mono muted" style={{ fontSize: "0.8125rem", marginBottom: 16 }}>
        also: {hs.map((c, i) => (
          <span key={c.name}>
            {i > 0 && <span className="dim"> · </span>}
            {c.short}
          </span>
        ))}
      </div>

      <OutlineButton href={siteMeta.trailheadUrl} variant="secondary">[ verify on trailhead ↗ ]</OutlineButton>
    </section>
  );
};

export default Certifications;
