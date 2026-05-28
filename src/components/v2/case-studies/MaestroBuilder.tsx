import OutlineButton from "@/components/v2/primitives/OutlineButton";
import CodeBlock from "@/components/v2/primitives/CodeBlock";

const MaestroBuilder = () => (
  <article>
    <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
      <OutlineButton href="https://github.com/MetalHacker01/MaestroBuilder">[ github ↗ ]</OutlineButton>
    </div>

    <h2 className="mono accent" style={{ fontSize: "1.25rem", marginBottom: 12 }}>## the problem</h2>
    <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.65, marginBottom: 16 }}>
      We had an internal jQuery-era tool that produced 75 hand-tuned email modules across four .json files. Adding a new module meant editing two of them and praying the preview didn't fall over in Outlook. The output rendered fine in Gmail, broke on Outlook 2007, and had no dark-mode support.
    </p>
    <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.65, marginBottom: 32 }}>
      Maestro Builder is the rewrite: ~30 typed modules, a real live preview, bulletproof Outlook (VML roundrects, mso-padding-alt everywhere), opt-in dark mode that emits HSL-derived per-instance variants, and Mailjet test sends in two clicks.
    </p>

    <h2 className="mono accent" style={{ fontSize: "1.25rem", marginBottom: 12 }}>## live preview</h2>
    <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "0.9375rem", lineHeight: 1.55, color: "var(--v2-text-muted)", marginBottom: 12 }}>
      This iframe renders a real Maestro-built email, served as static HTML. Sandboxed, no JS, no network. Resize your window to see the responsive behavior. Toggle your OS dark-mode setting to see the dark-mode-aware styles.
    </p>
    <div style={{ border: "1px solid var(--v2-line-strong)", background: "#ffffff", marginBottom: 32 }}>
      <iframe
        src="/v2/case-studies/maestro-builder/preview.html"
        title="Maestro Builder rendered email preview"
        sandbox="allow-same-origin"
        style={{ width: "100%", height: 720, border: 0, display: "block" }}
      />
    </div>

    <h2 className="mono accent" style={{ fontSize: "1.25rem", marginBottom: 12 }}>## what it does</h2>
    <ul style={{ listStyle: "none", padding: 0, marginBottom: 32 }}>
      {[
        "30 production-ready modules (preheaders, logos, heroes with VML overlays, three-column features, product cards, app-store badges, footers)",
        "Live preview canvas with click-to-select bridging to the property panel",
        "Bulletproof Outlook via <v:roundrect> and <v:image>+<v:rect> overlay patterns",
        "Opt-in dark mode with per-instance HSL transforms and [data-ogsc]/[data-ogsb] Outlook.com mirrors",
        "Mailjet send-test in two clicks with humanized errors; htmltest.email fallback when Mailjet is unavailable",
        "Inline WYSIWYG (Tiptap) for rich-text edits inside the property panel",
        "Live MJML warnings panel from the last render",
      ].map((b, i) => (
        <li key={i} style={{ display: "flex", gap: 10, marginBottom: 6, fontFamily: "var(--v2-font-sans)" }}>
          <span className="mono dim">·</span>
          <span style={{ fontSize: "0.9375rem", lineHeight: 1.55 }}>{b}</span>
        </li>
      ))}
    </ul>

    <h2 className="mono accent" style={{ fontSize: "1.25rem", marginBottom: 12 }}>## architecture</h2>
    <CodeBlock
      lang="text"
      code={`User edits  ─►  Zustand store ([instances])
                 │
                 ▼
       POST /api/render
                 │
                 ▼  buildMjml() concatenates module.render(props)
                    + mb-uid-{uid} class markers for click-to-select
                    and per-instance dark-mode CSS
                 │
                 ▼  wrapMjml() adds the MJML shell:
                    • meta color-scheme (Apple Mail opt-in)
                    • @media (prefers-color-scheme: dark) rules
                    • [data-ogsc] / [data-ogsb] (Outlook.com)
                 │
                 ▼  mjml2html() compiles bulletproof HTML
                 │
                 ├─►  iframe srcdoc  (live preview)
                 └─►  download  /  Mailjet  /  htmltest.email`}
      caption="Render pipeline: Zustand → buildMjml → wrapMjml → mjml2html"
    />

    <h2 className="mono accent" style={{ fontSize: "1.25rem", marginBottom: 12 }}>## what i learned</h2>
    <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.65, marginBottom: 16 }}>
      The Outlook hero overlay (&lt;v:image&gt;+&lt;v:rect&gt;) does not nest a &lt;v:roundrect&gt; child cleanly. Three days of debugging to find out that the overlay button has to be a flat-table button on Outlook, square corners and all. The README ships with that limitation documented honestly, because pretending it's solved would burn the next person.
    </p>
    <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.65, marginBottom: 16 }}>
      Mailjet's error codes (mj-XXXX) are unhelpful at runtime. Wrapping them with humanizeMailjetError() and surfacing actionable guidance ("verify this sender first", "your account is on validation hold") turned the send-test dialog from a black box into a useful tool.
    </p>
    <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.65, marginBottom: 32 }}>
      Building emails for Outlook in 2026 still pays off. A surprising share of enterprise inboxes are Outlook 2016/2019/365 desktop with all the same VML quirks. The "bulletproof" patterns aren't decorative.
    </p>

    <h2 className="mono accent" style={{ fontSize: "1.25rem", marginBottom: 12 }}>## stack</h2>
    <div className="mono muted" style={{ fontSize: "0.875rem" }}>
      Next.js 16 · React 19 · TypeScript · Tailwind v4 · @dnd-kit · Tiptap · Zustand · MJML · Mailjet · Vercel
    </div>
  </article>
);

export default MaestroBuilder;
