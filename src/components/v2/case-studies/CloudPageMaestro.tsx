import OutlineButton from "@/components/v2/primitives/OutlineButton";
import CodeBlock from "@/components/v2/primitives/CodeBlock";

const CloudPageMaestro = () => (
  <article>
    <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
      <OutlineButton href="https://github.com/MetalHacker01/CloudPage_Maestro">[ github ↗ ]</OutlineButton>
    </div>

    <h2 className="mono accent" style={{ fontSize: "1.25rem", marginBottom: 12 }}>## the problem</h2>
    <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.65, marginBottom: 16 }}>
      SFMC CloudPages does most things one at a time. Publish a single page. Move a single page. Download a single asset. On a real client engagement with hundreds of landing pages spread across dozens of campaigns, "one at a time" is the difference between a 20-minute task and a half-day.
    </p>
    <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.65, marginBottom: 32 }}>
      CloudPage Maestro adds batch operations to CloudPages (publish, unpublish, move, search, sort, export) at the speed of SFMC's bulk V2 endpoint instead of the click-once-wait-three-seconds UI.
    </p>

    <h2 className="mono accent" style={{ fontSize: "1.25rem", marginBottom: 12 }}>## what it does</h2>
    <ul style={{ listStyle: "none", padding: 0, marginBottom: 32 }}>
      {[
        "Bulk publish / unpublish / move for landing pages and code resources",
        "Folder picker with the full SFMC category tree",
        "Search across name, content, description, folder; filter by asset type",
        "Export All to CSV (every asset enriched with status, URL, last-modified, folder breadcrumb)",
        "Download All as ZIP, with landing page HTML and code resources, folder tree preserved",
        "Single-asset download icon on every row",
        "Real-time token status badges with auto-recovery on 401",
        "Hover any published URL to see a live iframe preview",
        "Dark / light theme; resizable panel; keyboard shortcuts for power users",
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
      code={`content.js (panel UI, ~6,400 lines)
   │
   │   ▶ list reads:  cookie-only auth, no CSRF needed
   │   ▶ writes:      auto-captures CSRF token from page,
   │                   recaptures on 401
   │
   ├─ Bulk V2 endpoint  ──► hydrates status + URL for every
   │                          landing page in a single call
   │
   ├─ Concurrent enrichment (batches of 10) for items the
   │   V2 endpoint doesn't cover
   │
   └─ Smart cache with TTL on enrichment results`}
      caption="Cookie-only reads, CSRF-aware writes, concurrent everything"
    />

    <h2 className="mono accent" style={{ fontSize: "1.25rem", marginBottom: 12 }}>## what i learned</h2>
    <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.65, marginBottom: 16 }}>
      The biggest perf win came from killing the "ghost tab" pattern I started with (opening a hidden SFMC tab to capture CSRF tokens). Cookie-only reads are dramatically faster on panel open, no 15-second wait, no flicker. I only need CSRF when actually writing.
    </p>
    <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.65, marginBottom: 32 }}>
      The ZIP export was the feature I underestimated. Once you can export the whole landing page tree to disk, the panel becomes a real backup tool, not just a batch operations toy. Clients ask for "all our landing pages" surprisingly often.
    </p>

    <h2 className="mono accent" style={{ fontSize: "1.25rem", marginBottom: 12 }}>## stack</h2>
    <div className="mono muted" style={{ fontSize: "0.875rem" }}>
      MV3 (chrome + firefox) · vanilla JS · cookie-only auth · jszip · concurrent batching · no build step
    </div>
  </article>
);

export default CloudPageMaestro;
