import AsciiRule from "@/components/v2/primitives/AsciiRule";
import { about } from "@/v2/content/about";

const About = () => (
  <section id="about" aria-labelledby="about-heading">
    <AsciiRule number="01" label="about.md" />
    <h2 id="about-heading" className="mono accent" style={{ fontSize: "1.5rem", marginBottom: 16 }}>
      # about
    </h2>

    {about.paragraphs.map((p, i) => (
      <p
        key={i}
        style={{
          fontFamily: "var(--v2-font-sans)",
          fontSize: "1rem",
          lineHeight: 1.65,
          marginBottom: 16,
          color: "var(--v2-text)",
        }}
      >
        {p}
      </p>
    ))}

    <div className="mono muted" style={{ fontSize: "0.8125rem", marginTop: 24 }}>
      languages:{" "}
      {about.languages.map((l, i) => (
        <span key={l.name}>
          {i > 0 && <span className="dim"> · </span>}
          {l.name} <span className="dim">({l.level})</span>
        </span>
      ))}
    </div>
  </section>
);

export default About;
