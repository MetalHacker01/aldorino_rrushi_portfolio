import { siteMeta } from "@/v2/content/siteMeta";
import OutlineButton from "@/components/v2/primitives/OutlineButton";

const Hero = () => (
  <section
    aria-label="hero"
    style={{ padding: "48px 0 64px", borderBottom: "1px solid var(--v2-line)" }}
  >
    <div className="mono muted" style={{ fontSize: "0.8125rem", marginBottom: 16 }}>
      <span style={{ color: "var(--v2-signal-green)" }}>$</span> whoami
    </div>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 28,
        flexWrap: "wrap-reverse",
        marginBottom: 16,
      }}
    >
      <div style={{ flex: "1 1 320px", minWidth: 0 }}>
        <h1
          style={{
            fontFamily: "var(--v2-font-sans)",
            fontWeight: 800,
            fontSize: "clamp(1.85rem, 4.8vw, 4.25rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {siteMeta.taglineHero}
          <span className="cursor-block" aria-hidden="true" />
        </h1>
      </div>

      <div style={{ flexShrink: 0 }}>
        <div
          className="v2-avatar-frame"
          tabIndex={0}
          aria-label="Aldorino Rrushi portrait (hover or focus to reveal full colour)"
        >
          <div className="v2-avatar">
            <img src="/images/profilePic.png" alt="Aldorino Rrushi portrait" />
          </div>
          <span
            className="mono dim"
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: -22,
              right: 0,
              fontSize: "0.7rem",
              letterSpacing: "0.04em",
            }}
          >
            ~/avatar.png
          </span>
        </div>
      </div>
    </div>

    <p className="mono muted" style={{ fontSize: "0.9rem", marginBottom: 24, marginTop: 36 }}>
      aldorino rrushi <span className="dim">·</span> solution engineer <span className="dim">·</span> marketing automation <span className="dim">·</span> software <span className="dim">·</span> ai
    </p>
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <OutlineButton href={`mailto:${siteMeta.email}`} variant="primary">[ start a conversation ]</OutlineButton>
      <OutlineButton href="/ARrushi_Curriculum.pdf" variant="secondary">[ download cv ↗ ]</OutlineButton>
      <OutlineButton href={siteMeta.githubUrl} variant="secondary">[ github ↗ ]</OutlineButton>
      <OutlineButton href={siteMeta.linkedinUrl} variant="secondary">[ linkedin ↗ ]</OutlineButton>
    </div>
  </section>
);

export default Hero;
