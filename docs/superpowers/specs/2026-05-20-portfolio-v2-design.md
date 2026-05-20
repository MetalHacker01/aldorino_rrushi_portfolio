# Portfolio v2 — Design Spec

**Date:** 2026-05-20
**Author:** Aldorino Rrushi (via brainstorming session with Claude)
**Status:** Approved, ready for implementation planning
**Target route:** `/v2` (becomes `/` once approved post-launch)
**Repo:** `martech-maestro-folio` (existing Vite + React + TypeScript + Tailwind + shadcn/ui)

---

## 1. Why v2

v1 ships and works, but it reads as a generic dark-mode-cyan-glow developer template. It hides the most important thing about Aldorino: he's a **MarTech Solution Engineer who also ships real software** — a rare combination that's the actual differentiator. v2 reframes the site around that positioning, adds the three flagship open-source tools as proper case studies, introduces an AI section anchored by real certifications, and ships an AI-readable layer so anyone can paste the Vercel URL into a chat and get the full content as markdown.

v1 stays untouched at `/`. v2 lives at `/v2` until approved for the swap.

---

## 2. Positioning

### Identity stack (in order of weight)
1. **MarTech Solution Engineer / Consultant** — primary. SFMC + Eloqua + Marketo + Responsys + Unica. 7+ years across enterprise programs.
2. **Software engineer** — differentiator. Most MarTech consultants can't code at this level. The three flagship open-source projects (SFMC Scout, CloudPage Maestro, Maestro Builder) are the proof.
3. **AI enthusiast (Agentforce + AI Associate certified)** — emerging. Forward arrow for the next 18 months.

### Hero one-liner
> **I make marketing platforms do what they couldn't.**

### Hero sub (two-sentence positioning)
> I'm a Salesforce Marketing Cloud (and Eloqua, Marketo, Responsys, Unica) solution engineer with 7+ years across enterprise programs. The difference is I also ship software — when a platform hits its limit, I extend it instead of working around it.

### Voice
Plainspoken engineer. Direct, specific, technical, lightly opinionated. No "transforming", no "cutting-edge", no "passionate". Reads as a consultant who respects the reader's time.

---

## 3. Information Architecture

### Sitemap

```
/                              ← existing v1, untouched
/v2                            ← IDE shell, file-tree nav, scroll sections
  ├─ about.md                  (the consultant + the differentiator)
  ├─ experience.json           (4 roles, expandable per role)
  ├─ projects/                 (ordered: scout · cpm · maestro · sto)
  │   ├─ sfmc-scout            ★ signature
  │   ├─ cloudpage-maestro
  │   ├─ maestro-builder
  │   └─ sfmc-sto-activity     ◌ in development
  ├─ certs.txt                 (7× Salesforce + 2 HubSpot, badge wall)
  ├─ ai.md                     (Agentforce + AI Associate + currently exploring)
  └─ contact.sh

/v2/projects/sfmc-scout        ← long-form case study
/v2/projects/cloudpage-maestro
/v2/projects/maestro-builder
/v2/index.md                   ← build-time generated, AI-readable
/v2/index.txt                  ← build-time generated, plain text
/v2/projects/<slug>/index.md   ← per-project AI-readable
```

### Projects section ordering (locked)

| Order | Project | Tier | Status |
|---|---|---|---|
| 1 | SFMC Scout | open source · MIT | ★ signature |
| 2 | CloudPage Maestro | open source · MIT | ★ |
| 3 | Maestro Builder | open source · MIT + attribution | ★ |
| 4 | SFMC STO Activity | open source · MIT | ◌ in development |

Section intro copy: *"Open-source tools I've built — every one of them was born from a real client engagement where SFMC's UI or limits got in the way. All MIT-licensed. All used in production."*

The old "SFMC Custom Journey Activity" from v1 is **dropped** (was a learning test). The Oracle Eloqua / Adobe Marketo Extensions from v1's CustomSolutions are also dropped from v2 as standalone cards — they live as capabilities mentioned in About + Experience.

---

## 4. Visual Design System

### Palette — warm phosphor (dark)

| Token | Value | Use |
|---|---|---|
| `--bg-app` | `#0E0E10` | Background, near-black warm undertone |
| `--bg-surface` | `#141416` | Panels (file tree, side rails, code blocks) |
| `--bg-elevated` | `#1A1A1D` | Modals, hover states |
| `--text` | `#E8E6E1` | Body, warm off-white |
| `--text-muted` | `#8A8580` | Paths, captions, status bar |
| `--text-dim` | `#4E4B47` | Tree separators, inactive items |
| `--accent` | `#F2A65A` | Amber — links, focus rings, current-file marker |
| `--accent-soft` | `#F2A65A20` | Amber 12% — hover backgrounds |
| `--signal-green` | `#7DDB6D` | "Active" / "shipped" status |
| `--signal-red` | `#E5484D` | "In development" / errors |
| `--line` | `#1F1F22` | Hairline borders |
| `--line-strong` | `#2A2A2E` | Panel dividers |

No gradients. No glows. No infinite-loop animations.

### Typography

| Token | Stack | Use |
|---|---|---|
| Mono (primary) | `JetBrains Mono`, `IBM Plex Mono`, `Consolas`, monospace | File tree, status bar, code, eyebrows, labels |
| Sans (body) | `Inter`, `system-ui`, sans-serif | Long-form paragraphs only |
| Display | `Inter` 800 weight, tracking -0.02em | Hero headline only |

Mono is the dominant voice — it earns the IDE feel. Sans is used *only* for prose of 3+ sentences. No serifs.

### Type scale (rem)

| Token | Size | Line-height | Use |
|---|---|---|---|
| `xs` | 0.75 | 1.4 | Status bar, tree paths, captions |
| `sm` | 0.875 | 1.5 | Code blocks, badges, tree files |
| `base` | 1.0 | 1.6 | Body |
| `lg` | 1.125 | 1.55 | Section intros |
| `xl` | 1.5 | 1.3 | Section headings |
| `2xl` | 2.0 | 1.2 | Subsection headings |
| `4xl` | 3.0 | 1.05 | Hero headline (mobile) |
| `6xl` | 4.5 | 1.0 | Hero headline (≥ lg) |

### Spacing rhythm

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px`. No arbitrary values. Configured as Tailwind theme tokens.

### Component patterns

- **Cards / panels** — 1px `--line` border, `--bg-surface` fill, 0 radius (4px max for interactive). No shadows.
- **Buttons** — outline only. Primary: 1px amber border, transparent fill, hover fills `--accent-soft`. Secondary: 1px `--line` border, transparent. Mono lowercase labels: `[ contact ]` style.
- **Badges** — flat 1px outline, mono uppercase, no fill. Color denotes meaning (amber = active link, green = shipped, red = WIP).
- **Section dividers** — ASCII rules: `═════════ 02 / experience.json ═════════`. Sticky on scroll as section eyebrow.
- **Code blocks** — `--bg-elevated`, 1px border, mono, Shiki at build time (single accent color, not full rainbow).

### Motion budget

All transitions ≤ 200ms with `cubic-bezier(0.2, 0, 0, 1)`.

- Hover: opacity + border color shift only, never scale > 1.02
- Section enter: opacity 0 → 1, 8px translate-y, 300ms, once per session
- No infinite-loop animations. The cursor block `█` in the hero blinks at 1Hz; that's the only running animation.
- `prefers-reduced-motion: reduce` skips all entrance animations and the boot sequence.

---

## 5. IDE Shell & Navigation

### Desktop (≥ 1024px) layout

```
┌── titlebar ─────────────────────────────────────────────────────────┐
│  ●●●  aldorino@martech ── ~/portfolio                          v2.0 │
├──────────────┬───────────────────────────────────────┬──────────────┤
│  EXPLORER    │           CONTENT (scroll)            │   MINIMAP    │
│              │                                       │              │
│  ~ aldorino  │   ═════════ 01 / about.md ═════════   │   ▎ 01       │
│  ▸ about.md  │                                       │   ▎ 02       │
│  ▸ exp.json  │   [content sections, sans for prose]  │   ▎ 03 ◀ you │
│  ▾ projects/ │                                       │   ▎ 04       │
│    • scout   │                                       │   ▎ 05       │
│    • cpm     │                                       │   ▎ 06       │
│    • maestro │                                       │              │
│    • sto                                              │              │
│  ▸ certs.txt │                                       │              │
│  ▸ ai.md     │                                       │              │
│  ▸ contact   │                                       │              │
├──────────────┴───────────────────────────────────────┴──────────────┤
│ ● main · 7× certified · §03 projects · 2026-05-20 · last commit:    │
│   feat: ship scout v2.3 · made in tirana · deployed via vercel      │
└─────────────────────────────────────────────────────────────────────┘
```

### Regions

**Explorer (left, ~240px, sticky)**
- Each entry is a real `<a href="#section">` — keyboard tabbable, screen-reader readable, works with JS off.
- Current section gets amber `▸` cursor + amber filename.
- Hover any file → 4-line content peek popover anchored to the right. Pure mouse, no keys.
- `projects/` starts expanded so all four are visible.
- Clicking a project entry navigates to `/v2/projects/<slug>` (case study page), not scroll.

**Content column (center, max 720px reading width)**
- Single vertical scroll. Sections separated by ASCII rules.
- Section eyebrows stick to the top of the content column on scroll.
- Reading width ≈ 65–70 character mono lines. Wide content (screenshots, code) escapes via `<Wide>` wrapper.

**Minimap (right, ~80px, sticky, ≥ 1280px only)**
- Tiny labels per section. Current section highlighted amber. Click jumps.
- Pure utility + flavor; nothing breaks below 1280px.

**Status bar (bottom, sticky, full width)**

Real data, not flavor:
- `● main` — build-time constant
- `7× certified` — from same content module as `certs.txt`
- `§NN <section>` — current section by IntersectionObserver (runtime)
- `<today>` — `new Date()` (runtime)
- `last commit: <msg>` — GitHub API for `MetalHacker01/martech-maestro-folio`, fetched at build, written to JSON, read at runtime
- `made in tirana · deployed via vercel` — flavor footer

### Responsive

| Breakpoint | Behavior |
|---|---|
| ≥ 1280px | Full 3-column shell |
| 1024–1279px | Shell minus minimap |
| 768–1023px | Explorer becomes icon-only rail, expands on click |
| < 768px | Explorer becomes hamburger drawer; minimap hidden; status bar truncates to `● 7× certs · <today> · vercel` |

### Boot animation

First visit only, cookie `seen_v2=1` (180-day expiry). ~3 seconds total, skippable by any scroll/click:

```
booting portfolio v2.0.0
loading file system...   ok
mounting 4 projects...   ok
verifying 7 certs...     ok
ready.
```

Then IDE chrome fades in over 300ms. Respects `prefers-reduced-motion: reduce` (skips entirely).

### Routing

- `/` — existing v1 (untouched)
- `/v2` — IDE shell home
- `/v2/projects/sfmc-scout`
- `/v2/projects/cloudpage-maestro`
- `/v2/projects/maestro-builder`
- `/v2/index.md`, `/v2/index.txt` — static, generated at build
- `/v2/projects/<slug>/index.md`, `.txt` — per-project, generated at build

---

## 6. Section-by-section content shape

### `01 — about.md`

Three short paragraphs in body sans (≤ 140 words total):
1. **Who.** Solution Engineer at MarketOne International. SFMC + Eloqua + Marketo + Responsys + Unica. 7+ years. Tirana, remote-global. M.Eng Computer Engineering, Polytechnic University of Tirana.
2. **Differentiator.** Most MarTech consultants stop where the platform stops. I ship software when the platform stops — so the engagement actually delivers what was promised.
3. **Direction.** Agentic MarTech: Agentforce, AI-driven journeys, predictive sends. Already certified (Agentforce Specialist + AI Associate). Treating it as the next 18 months of the craft.

**Side panel (or trailing strip):** languages as a single mono line — `Albanian · English (pro) · Italian (pro) · French (elem)`. No pill badges.

### `02 — experience.json`

Rendered like a JSON file the visitor is reading. Four entries in reverse chronological order. Each collapsed row shows role + company + period in mono. Click expands inline to:
- 2-sentence summary in sans
- Bulleted achievements (mono bullets, sans text)
- Technologies as flat outline badges

Roles (data — copy to be tightened in implementation):
1. **Solution Engineer** — MarketOne International — 2024-10 → present
2. **SFMC Developer / Web Developer** — MarketOne International — 2022-03 → 2024-10
3. **Technical Lead** — Assist Digital — 2018 → 2022-03
4. **Marketing Automation Analyst** — Assist Digital — 2018-04 → 2019-12

### `03 — projects/`

Section intro paragraph as locked above. Four rows:

**Row 1 — `sfmc-scout` ★ signature**
- Hook: *"Side panel that injects into SFMC. Search everything, generate reports, deploy snippets — without leaving the platform."*
- Stats line: `MV3 chrome+firefox · cookie+csrf auth · 5 search sources · 6 reports`
- 3-bullet preview: universal search · automations + journeys browsing · snippet deploy into Ace editor
- CTAs: `[ read case study → ]` `[ github ↗ ]`
- Card click → `/v2/projects/sfmc-scout`

**Row 2 — `cloudpage-maestro`**
- Hook: *"Batch operations for SFMC CloudPages. Publish, unpublish, move, search, sort, export — at the speed of the bulk endpoint, not the UI."*
- Stats: `MV3 · cookie-only auth · bulk V2 endpoint · ZIP export with folder tree`
- Bullets: bulk publish/move/unpublish · CSV + ZIP exports · hover URL preview
- Card click → `/v2/projects/cloudpage-maestro`

**Row 3 — `maestro-builder`**
- Hook: *"Drag-and-drop visual builder for bulletproof responsive HTML emails. Outlook 2007 onward, dark-mode-aware, Mailjet test sends."*
- Stats: `next.js 16 · 30 modules · mjml · vml bulletproof · zustand`
- Bullets: live preview canvas · bulletproof VML for Outlook · real Mailjet send-test
- Card click → `/v2/projects/maestro-builder`

**Row 4 — `sfmc-sto-activity` ◌ in development**
- Hook: *"Custom Send Time Optimization activity for always-on SFMC journeys (where native STO doesn't work)."*
- Single line, red WIP badge, `[ github ↗ ]` only. No case study page yet.

### Case study page template (`/v2/projects/<slug>`)

Same IDE shell. Content column structure:

```
═════════ projects/<slug>.md ═════════

# <Project Name>

[ ↗ github ]   [ ↗ docs (if any) ]

## The problem
2 short paragraphs. Concrete consulting-pain story that motivated the build.

## What it does
Grouped bullet list of capabilities.

## Screenshots
2–4 wide-format screenshots from /screenshots in the source repo, copied to /public/v2/case-studies/<slug>/ at build time.

## Architecture
ASCII or simple inline SVG diagram of the data flow.

## Highlight code
1–2 real code snippets via Shiki. Captioned.

## What I learned
3 short paragraphs. Honest reflection — hard parts, surprises, what to keep.

## Stack
Mono line summary.

[ ↩ back to projects ]
```

**Maestro Builder exception:** the "Screenshots" section is replaced (or augmented) with a live `<iframe>` rendering of a pre-rendered MJML email from Maestro Builder. Static `.html` file shipped to `/public/v2/case-studies/maestro-builder/preview.html`, sandboxed iframe with no JS, no network. Real bulletproof HTML rendering inline. Highest-impact "magical" element on the site.

### `04 — certs.txt`

- One-sentence intro: *"7× Salesforce-certified. AI + MarTech focus."*
- Badge grid: 3 per row desktop, 2 tablet, 1 mobile. Each badge: small logo + abbreviated cert name. Click opens modal with full cert image (using existing `/public/images/certifications/`).
- Trailing mono line: `also: HubSpot Marketing Software · HubSpot Email Marketing`
- Single link: `[ verify on trailhead ↗ ]` → `https://www.salesforce.com/trailblazer/arrushi`

### `05 — ai.md`

- 2 paragraphs framing AI as the natural next evolution for MarTech (Agentforce, AI-driven decisioning, predictive sends).
- Two certs called out inline: Agentforce Specialist · AI Associate.
- Mono bullet list `currently exploring:` (3–4 items, editable monthly).
- Closes with one honest line: enthusiast learning fast, not "AI expert".

### `06 — contact.sh`

Treated as a shell script. Four lines, each a real link:

```sh
$ mailto      aldorino.rrushi@gmail.com
$ linkedin    /in/aldorino-rrushi
$ github      /MetalHacker01
$ location    tirana, albania (remote, global)
```

Below: single CTA `[ start a conversation ]` → mailto.
No hype-card. The shell-script aesthetic *is* the CTA.

---

## 7. AI-readable layer (the special bit)

### Generation

A Vite plugin (`scripts/generate-markdown.ts`) runs at build:
1. Imports all content modules from `src/v2/content/`
2. Renders one canonical Markdown document
3. Writes to `dist/v2/index.md`
4. Strips Markdown to plain text wrapped at 80 columns
5. Writes to `dist/v2/index.txt`
6. Repeats for each case study → `dist/v2/projects/<slug>/index.md` + `.txt`

### Served as proper MIME types via `vercel.json`

```jsonc
{
  "headers": [
    { "source": "/v2/index.md",                    "headers": [{ "key": "Content-Type", "value": "text/markdown; charset=utf-8" }] },
    { "source": "/v2/index.txt",                   "headers": [{ "key": "Content-Type", "value": "text/plain; charset=utf-8" }] },
    { "source": "/v2/projects/(.*)/index.md",      "headers": [{ "key": "Content-Type", "value": "text/markdown; charset=utf-8" }] },
    { "source": "/v2/projects/(.*)/index.txt",     "headers": [{ "key": "Content-Type", "value": "text/plain; charset=utf-8" }] }
  ]
}
```

### `llms.txt` at the site root

```
# llms.txt — AI agent guidance for aldorinorrushi.com
User-agent: *
Allow: /v2/index.md
Allow: /v2/index.txt
Allow: /v2/projects/*/index.md
Allow: /v2/projects/*/index.txt
Sitemap: /v2/index.md
```

Anyone (human or AI) hits the Vercel URL → gets the polished site.
Anyone (or any AI) hits `<vercel-url>/v2/index.md` → gets the entire content as clean Markdown.

---

## 8. Tech stack

### No new framework
Stay inside Vite + React 18 + TypeScript + Tailwind + shadcn/ui. v2 is a new route, not a new app.

### New dependencies
- `shiki` — code syntax highlighting at build time, zero runtime JS cost
- `react-helmet-async` — per-route `<title>` + `<meta>` + Open Graph tags

That's it. Existing shadcn/ui (Dialog, HoverCard, Tooltip) covers the rest.

### Single source of truth

All content lives in `src/v2/content/` as TypeScript modules. Visual components and the Markdown generator both read from these. They cannot drift.

### File structure

```
martech-maestro-folio/
├── src/
│   ├── pages/
│   │   ├── Portfolio.tsx              # v1, untouched
│   │   ├── NotFound.tsx               # untouched
│   │   └── v2/
│   │       ├── Home.tsx               # IDE shell + scroll sections
│   │       └── ProjectCaseStudy.tsx   # parameterized by slug
│   ├── components/
│   │   └── v2/
│   │       ├── layout/
│   │       │   ├── IDEShell.tsx
│   │       │   ├── TitleBar.tsx
│   │       │   ├── Explorer.tsx
│   │       │   ├── Minimap.tsx
│   │       │   ├── StatusBar.tsx
│   │       │   └── BootSequence.tsx
│   │       ├── sections/
│   │       │   ├── About.tsx
│   │       │   ├── Experience.tsx
│   │       │   ├── Projects.tsx
│   │       │   ├── Certifications.tsx
│   │       │   ├── AI.tsx
│   │       │   └── Contact.tsx
│   │       ├── primitives/
│   │       │   ├── AsciiRule.tsx
│   │       │   ├── MonoBadge.tsx
│   │       │   ├── OutlineButton.tsx
│   │       │   ├── CodeBlock.tsx
│   │       │   ├── HoverPeek.tsx
│   │       │   └── SectionEyebrow.tsx
│   │       └── case-studies/
│   │           ├── SfmcScout.tsx
│   │           ├── CloudPageMaestro.tsx
│   │           └── MaestroBuilder.tsx
│   ├── v2/
│   │   ├── content/
│   │   │   ├── about.ts
│   │   │   ├── experience.ts
│   │   │   ├── projects.ts
│   │   │   ├── certifications.ts
│   │   │   ├── ai.ts
│   │   │   ├── contact.ts
│   │   │   └── siteMeta.ts
│   │   ├── hooks/
│   │   │   ├── useActiveSection.ts    # IntersectionObserver
│   │   │   ├── useLatestCommit.ts     # reads build-time JSON
│   │   │   └── useBootSeen.ts         # cookie check
│   │   ├── data/
│   │   │   └── latest-commit.json     # generated at build
│   │   └── styles/
│   │       └── v2.css                 # scoped tokens, no leak into v1
│   └── App.tsx                        # adds 4 new routes
├── public/
│   ├── llms.txt
│   └── v2/
│       └── case-studies/
│           ├── sfmc-scout/            # screenshots
│           ├── cloudpage-maestro/     # screenshots
│           └── maestro-builder/
│               └── preview.html       # pre-rendered MJML email
├── scripts/
│   ├── generate-markdown.ts           # build-time .md + .txt generator
│   └── fetch-latest-commit.ts         # build-time GitHub API → JSON
├── vite.config.ts                     # register markdown plugin
├── vercel.json                        # MIME types for .md, .txt
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-05-20-portfolio-v2-design.md  # this file
```

### Build-time vs runtime split

| Concern | When | Why |
|---|---|---|
| `index.md` + `index.txt` generation | Build (Vite plugin) | Static files, perfectly cacheable |
| Code syntax highlighting (Shiki) | Build | Zero runtime cost |
| Latest commit fetch | Build script writes JSON | One API call per build, not per visit |
| Section screenshots copy | Build script | Sourced from each project repo |
| Active section indicator | Runtime (IntersectionObserver) | Live on scroll |
| Today's date in status bar | Runtime (`new Date()`) | Trivial |
| File-tree hover preview | Runtime (shadcn HoverCard) | Mouse-driven |
| Boot sequence | Runtime + cookie | First-visit gating |

### Performance budget
- Lighthouse target: ≥ 95 Performance, 100 Accessibility, ≥ 95 SEO/Best Practices
- Home page JS bundle ≤ 120 KB gzipped
- LCP < 1.5s on 4G simulated (hero is text-only, no large image)
- Fonts (JetBrains Mono + Inter) loaded with `font-display: swap`, preconnected to Google Fonts

### Accessibility
- All file-tree links are real `<a href="#section">` — tabbable, screen-reader compatible, work with JS off
- Boot sequence respects `prefers-reduced-motion: reduce`
- Amber `#F2A65A` on `#0E0E10` measures ~7.1 contrast ratio (passes AAA)
- All mono badges have `aria-label` with readable name
- Modal cert images have descriptive `alt` text

---

## 9. Out of scope (explicitly)

- No CMS — content is TypeScript modules, edits go through PRs
- No backend — everything is static, deployed via Vercel
- No analytics changes — keep existing `@vercel/analytics` + `@vercel/speed-insights`
- No light mode in v1 of v2 — warm phosphor dark only. Light mode is a follow-up.
- No keyboard shortcuts, no command palette, no typed-input navigation — all interaction is click/scroll/hover (locked decision from brainstorm)
- No infinite-loop animations — the v1 pulse-glow / scaling / shimmering aesthetics are explicitly killed
- No replacement of v1's `/` route until v2 is approved post-launch — v2 lives at `/v2` first
- No retroactive cleanup of v1 components — they stay in `src/components/portfolio/` untouched

---

## 10. Acceptance criteria

The implementation is done when:

1. **`/v2` loads** with full IDE shell (titlebar, explorer, content, minimap on desktop, status bar)
2. **All six top-level sections render** with content sourced from `src/v2/content/`
3. **Status bar** shows real today's date, real current section indicator, real latest commit from build-time JSON
4. **Three case study pages** load at `/v2/projects/sfmc-scout`, `/cloudpage-maestro`, `/maestro-builder`, each with full template content
5. **Maestro Builder case study** includes a sandboxed iframe rendering a real pre-rendered MJML email
6. **`/v2/index.md` and `/v2/index.txt`** are accessible, served with correct MIME types, and contain the entire site content
7. **Per-case-study `.md` and `.txt`** files exist for the three flagship projects
8. **`llms.txt`** is present at site root and lists the four AI-readable paths
9. **Boot sequence** runs on first visit (no cookie), is skipped on subsequent visits (cookie present)
10. **Responsive behavior** matches the breakpoint table (desktop / tablet / mobile)
11. **Lighthouse scores** meet the performance budget
12. **v1 at `/`** is completely untouched and still works

---

## 11. Decisions log (so future-me remembers why)

| Decision | Rationale |
|---|---|
| Single Vite app, `/v2` sub-route | Avoid second Vercel project; easy to compare v1 vs v2; easy swap when ready |
| Terminal-IDE aesthetic | Signals "technical consultant who codes" — Aldorino's actual differentiator |
| Warm amber palette, not cyan/green | Differentiates from the sea of cyan-glow dev portfolios; matches the consultant-not-just-dev positioning |
| MarTech-first content hierarchy | Aldorino's primary role is Solution Engineer; dev/AI are evidence, not lede (corrected mid-brainstorm) |
| Hero line: "I make marketing platforms do what they couldn't" | Outcome-led, speaks directly to MAP buyers who've hit platform limits |
| All four projects open-source/MIT (no field-tools vs OSS split) | Per Aldorino's correction — the three flagships are both field-born AND OSS |
| Projects order: Scout → CPM → Maestro → STO | Per Aldorino's explicit ordering: Scout is the best |
| Build-time markdown generation | Single source of truth; AI-readable layer can't drift from visual site |
| `llms.txt` shipped | Emerging convention for AI agents; trivial to maintain |
| Pre-rendered MJML iframe in Maestro case study | Highest-impact passive magic; directly proves the MarTech value |
| No keyboard nav, no typed commands | Aldorino's explicit constraint: users click and scroll, no input requirements |
| Status bar with real GitHub commit | The "alive" feel without fakery |
| Mono dominant, sans for prose only | Earns IDE feel without sacrificing readability for long-form content |
| v1 stays at `/` until swap is approved | Zero-risk rollout; A/B comparable; one-line swap when ready |

---

## 12. Next step

After Aldorino approves this spec, invoke the `superpowers:writing-plans` skill to break it into a phased implementation plan (likely 4–6 phases: scaffolding → IDE shell → sections → case studies → AI-readable layer + llms.txt → polish + Lighthouse).
