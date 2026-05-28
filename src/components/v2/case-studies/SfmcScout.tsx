import OutlineButton from "@/components/v2/primitives/OutlineButton";
import CodeBlock from "@/components/v2/primitives/CodeBlock";

const SfmcScout = () => (
  <article>
    <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
      <OutlineButton href="https://github.com/MetalHacker01/SFMC_Scout">[ github ↗ ]</OutlineButton>
    </div>

    <h2 className="mono accent" style={{ fontSize: "1.25rem", marginBottom: 12 }}>## the problem</h2>
    <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.65, marginBottom: 16 }}>
      Working SFMC every day means tab-juggling: Email Studio for Data Extensions, Automation Studio for SQL queries, Journey Builder for journeys, Content Builder for assets. Searching across them requires opening four different UIs. Generating a report is a Data Views export at best, a manual screenshot pile at worst. Snippet reuse means a shared OneNote and copy-paste.
    </p>
    <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.65, marginBottom: 32 }}>
      I wanted one panel that injects into SFMC, finds anything, generates real reports, and deploys reusable snippets into the active editor. No backend, no OAuth dance, no extra credentials, just my existing SFMC session and the platform's internal APIs.
    </p>

    <h2 className="mono accent" style={{ fontSize: "1.25rem", marginBottom: 12 }}>## what it does</h2>
    <ul style={{ listStyle: "none", padding: 0, marginBottom: 32 }}>
      {[
        "Universal search across Data Extensions, Automations, Journeys, Assets, Activities. Results stream in progressively as each source responds",
        "Automation browser with color-coded status pills, expandable step-by-step views, syntax-highlighted SQL/SSJS",
        "Journey browser with version, HTS flag, channel, trigger type, entry source DE, humanized schedule",
        "Data Extension tools (search, create, import, export, full HTML reports)",
        "Reports (Automations / Journeys / Assets / Activities / DEs) as standalone HTML pages with embedded CSV download, sortable columns, live filter",
        "Snippet library to save, tag, and deploy AMPscript, SSJS, SQL directly into the open Ace editor",
        "Light + dark theme, persistent across sessions",
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
      code={`browser tab (SFMC page)
   │
   ├─ content.js  ──► injects side panel into the host page
   │                  builds UI, handles user interactions
   │                  passes API requests to background
   │
   ├─ background.js ──► service worker
   │                    captures cookies + CSRF token passively
   │                    proxies fetch calls (CORS bypass)
   │                    auto-retries on 401 / token refresh
   │
   └─ handlers/    ──► per-domain handlers (DE, Activities, etc.)
                      parse internal API responses
                      normalize across SFMC's many legacy formats`}
      caption="MV3 architecture, no backend, runs entirely in the user's browser"
    />

    <h2 className="mono accent" style={{ fontSize: "1.25rem", marginBottom: 12 }}>## what i learned</h2>
    <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.65, marginBottom: 16 }}>
      Building inside someone else's UI is a different discipline than building your own. CSP boundaries, host-page CSS leakage, MV3 service-worker lifecycle quirks, the fact that SFMC's "internal" APIs are barely documented and change shapes between StackKey instances. Every one of those was a multi-day rabbit hole.
    </p>
    <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.65, marginBottom: 16 }}>
      What surprised me: SFMC's bulk endpoints (the ones the platform's own UI uses) are dramatically faster than the public Fuel APIs. Finding them required reading network traffic in DevTools for hours. The reward is a panel that lists 800 automations in under a second.
    </p>
    <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.65, marginBottom: 32 }}>
      What I'd do again: ship the report views as standalone HTML pages with embedded CSV. They work offline once opened. They survive the user closing the extension. That's a durable artifact, not just a screen.
    </p>

    <h2 className="mono accent" style={{ fontSize: "1.25rem", marginBottom: 12 }}>## stack</h2>
    <div className="mono muted" style={{ fontSize: "0.875rem" }}>
      MV3 (chrome + firefox) · vanilla JS · service worker + content script · CSP-safe · no build step · ~10k lines
    </div>
  </article>
);

export default SfmcScout;
