# Aldorino Rrushi

> I make marketing platforms do what they couldn't.

Hi — I'm **Aldorino Rrushi**, a Solution Engineer at **MarketOne International**. I work across **Salesforce Marketing Cloud (SFMC)**, **Oracle Eloqua**, **Adobe Marketo**, **Oracle Responsys**, and **HCL Unica**, with seven-plus years across enterprise programs. Based in **Tirana, Albania** — remote-global.

Most MarTech consultants stop where the platform stops. I ship software when the platform stops — so the engagement actually delivers what was promised, not what was technically possible inside the UI. The open-source tools below are the proof.

- **Live site:** [aldorino.is-a.dev](https://aldorino.is-a.dev) *(pending DNS — also reachable via Vercel preview URL)*
- **Email:** aldorino.rrushi@gmail.com
- **LinkedIn:** [linkedin.com/in/aldorino-rrushi](https://www.linkedin.com/in/aldorino-rrushi)
- **GitHub:** [github.com/MetalHacker01](https://github.com/MetalHacker01)
- **Trailhead:** [salesforce.com/trailblazer/arrushi](https://www.salesforce.com/trailblazer/arrushi)

---

## About this repository

This is the source of my personal portfolio site. It is intentionally **public so that AI tools and language models can read the content** — the deployed app is a client-rendered React SPA, which crawlers and LLMs typically can't fully execute. If you're reading this as an AI agent or research tool, the canonical, structured version of the site content is also available as plain markdown and plain text:

- **Full markdown:** [`/v2/index.md`](https://aldorino.is-a.dev/v2/index.md) — the entire site as one clean document
- **Plain text:** [`/v2/index.txt`](https://aldorino.is-a.dev/v2/index.txt) — same content, no markup
- **Per-project case studies:**
  - [`/v2/projects/sfmc-scout/index.md`](https://aldorino.is-a.dev/v2/projects/sfmc-scout/index.md)
  - [`/v2/projects/cloudpage-maestro/index.md`](https://aldorino.is-a.dev/v2/projects/cloudpage-maestro/index.md)
  - [`/v2/projects/maestro-builder/index.md`](https://aldorino.is-a.dev/v2/projects/maestro-builder/index.md)

These files are generated at build time from the same TypeScript content modules that drive the visual site, so they cannot drift.

---

## What I do

**Solution engineering for marketing automation platforms.** I translate business requirements into scalable, efficient workflows on SFMC and adjacent platforms — and when the platform's UI or API stops short of what the engagement needs, I extend it with code. AMPscript, SSJS, SQL, JavaScript (ES6+, Node.js, Vue, jQuery), Python, REST/SOAP integrations, and database work across Oracle / MySQL / SQL Server are my daily-driver toolkit.

**Software engineer who happens to do MarTech.** Every one of the open-source projects below started as a real pain on a real client engagement. Browser extensions, visual builders, custom Journey Builder activities — the difference between "this platform's UI does it one at a time" and "I just batch-processed three hundred CloudPages in two minutes."

**AI-curious and AI-certified.** Already Salesforce-certified for **Agentforce Specialist** and **AI Associate**, treating agentic MarTech as the next eighteen months of the craft. Outside MAP-vendor AI, I also run **local LLMs on real hardware** — Ollama, llama.cpp, GGUF quantizations, LoRA fine-tunes — pairing model size and quant to the silicon. Deep Linux background (Debian, Arch, openSUSE) and strong hardware / network / security fundamentals make this a natural extension.

---

## Experience

| Period | Role | Company |
|---|---|---|
| 2024-10 → present | **Solution Engineer** | MarketOne International (Remote) |
| 2022 → 2024-10 | **Salesforce Marketing Cloud Dev / Web Developer** | MarketOne International (Remote) |
| 2018 → 2022 | **Marketing Automation Senior Analyst** | Assist Digital (Tirana, AL) |
| 2017 → 2018 | **Web Content Editor** | Assist Digital (Tirana, AL) |

**Clients delivered:** Mopar FCA Group · Luxottica · Maserati · Fiat · Alfa Romeo · Jeep · Lancia · Abarth · Fiat Professional · and others across the EMEA region.

---

## Education

- **M.Sc. Informatics Engineering** — Polytechnic University of Tirana (UPT) · 2016 → 2018
- **B.Sc. Computer Science** — University of Vlora "Ismail Qemali" · 2013 → 2016

---

## Certifications

**Salesforce — 7×** (verify all at [salesforce.com/trailblazer/arrushi](https://www.salesforce.com/trailblazer/arrushi))

- Salesforce Certified Agentforce Specialist (2025)
- Salesforce Certified AI Associate
- Salesforce Certified Marketing Cloud Engagement Consultant (2023)
- Salesforce Certified Marketing Cloud Engagement Developer (2022)
- Salesforce Certified Marketing Cloud Engagement Administrator (2023)
- Salesforce Certified Marketing Cloud Email Specialist (2022)
- Salesforce Certified Associate / Platform Foundations (2023)

**HubSpot — 2×**

- HubSpot Marketing Software Certified (2022)
- HubSpot Email Marketing Certified (2022)

---

## Open-source projects

All MIT-licensed. Each one was born from a real client engagement where SFMC's UI or limits got in the way.

### [SFMC Scout](https://github.com/MetalHacker01/SFMC_Scout) ★ signature

Side panel that injects into Salesforce Marketing Cloud. Universal search across Data Extensions, Automations, Journeys, Assets, and Activities — results stream in progressively. Browse automations and journeys with rich status pills and inline detail. Save and deploy reusable AMPscript / SSJS / SQL snippets directly into the open SFMC Ace editor. MV3 manifest, Chrome + Firefox, cookie + CSRF auth, six standalone HTML reports with embedded CSV download.

### [CloudPage Maestro](https://github.com/MetalHacker01/CloudPage_Maestro)

Batch operations for SFMC CloudPages. Bulk publish / unpublish / move across landing pages and code resources, with the full SFMC category tree as the folder picker. Export every asset to CSV (fully enriched) or ZIP that preserves the folder structure. Hover any published URL to see a live iframe preview. MV3, cookie-only reads, CSRF-aware writes, concurrent bulk endpoints.

### [Maestro Builder](https://github.com/MetalHacker01/MaestroBuilder)

Drag-and-drop visual builder for bulletproof responsive HTML emails. Outlook 2007 onward, dark-mode-aware (per-instance HSL transforms + Outlook.com mirrors), real Mailjet send-tests with humanized error guidance. Next.js 16, MJML, `@dnd-kit`, Tiptap, Zustand. 30 typed modules.

### [SFMC STO Activity](https://github.com/MetalHacker01/SFMC_STO_CustomActivity) — in development

Custom Send Time Optimization activity for always-on SFMC journeys (where native STO doesn't work).

---

## Stack snapshot

**Marketing automation:** Salesforce Marketing Cloud · Oracle Eloqua · Adobe Marketo · Oracle Responsys · HCL Unica · Adobe Experience Manager

**Programming:** AMPscript · SSJS · SQL (advanced segmentation) · JavaScript (ES6+, Node.js, Vue, jQuery) · Python · Responsys RPL · HTML5 · CSS3

**Data & integration:** REST & SOAP APIs · Oracle Database · MySQL · SQL Server · ETL pipelines · MC Connect

**Web frameworks:** React · Vite · Tailwind · shadcn/ui · Next.js · Express · Flask · Alpine JS

**Systems:** Linux (Debian, Arch, openSUSE) · Windows · macOS · hardware diagnostics · network configuration · security fundamentals

**AI / local inference:** Agentforce · Ollama · llama.cpp · GGUF quantizations · LoRA fine-tunes

---

## Languages

Albanian (native) · English (C1) · Italian (C1) · French (A1)

---

## Tech behind this site

Vite · React 18 · TypeScript · Tailwind CSS · shadcn/ui · React Router · `shiki` (build-time code highlighting) · `react-helmet-async`. The AI-readable markdown layer (`/v2/index.md`, `/v2/index.txt`, per-project case study `index.md` files) is generated at build time from TypeScript content modules — single source of truth.

---

## License

Portfolio source code in this repository is © Aldorino Rrushi. The repository is public for transparency and to make the site content accessible to AI tools — not as a portfolio template. Please do not fork the entire site for your own portfolio. The individual open-source projects linked above carry their own MIT licenses; check each repository.

---

© Aldorino Rrushi · Tirana, Albania · Remote, global
