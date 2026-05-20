# Portfolio v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a parallel portfolio at `/v2` with a terminal-IDE aesthetic, MarTech-first positioning, three flagship case studies, and a build-time AI-readable markdown layer — leaving v1 at `/` fully untouched.

**Architecture:** Single Vite + React + TypeScript app. New `/v2` route tree (Home, three case studies). All v2 code lives under `src/v2/` and `src/components/v2/`. Content lives in `src/v2/content/` as TS modules — these are the single source of truth read by both the visual components AND a build-time Vite plugin that generates `dist/v2/index.md` and `dist/v2/index.txt`. v1 is not modified.

**Tech Stack:** Vite 7 · React 18 · TypeScript 5.8 · Tailwind CSS 3.4 · shadcn/ui (existing) · react-router-dom 6.30 (existing) · `shiki` (new, build-time code highlighting) · `react-helmet-async` (new, per-route head)

**Reference spec:** [docs/superpowers/specs/2026-05-20-portfolio-v2-design.md](../specs/2026-05-20-portfolio-v2-design.md)

**No git commits.** Per user instruction, the entire plan runs without any `git commit` or `git push` steps. All work is staged in the working tree only. The user will review locally via `npm run dev` and decide when to commit/push.

**Testing approach:** This codebase has no existing test infrastructure. The plan uses **lightweight in-browser verification** for visual components and **standalone Node sanity scripts** for pure data + build-time generators. We don't add a unit test framework — that's out of scope. Each visual task ends with a specific manual verification step on `http://localhost:8080/v2`.

---

## File Structure (locked at start)

### New files

```
src/
├── pages/v2/
│   ├── Home.tsx
│   └── ProjectCaseStudy.tsx
├── components/v2/
│   ├── layout/
│   │   ├── IDEShell.tsx
│   │   ├── TitleBar.tsx
│   │   ├── Explorer.tsx
│   │   ├── Minimap.tsx
│   │   ├── StatusBar.tsx
│   │   └── BootSequence.tsx
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Certifications.tsx
│   │   ├── AI.tsx
│   │   └── Contact.tsx
│   ├── primitives/
│   │   ├── AsciiRule.tsx
│   │   ├── MonoBadge.tsx
│   │   ├── OutlineButton.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── HoverPeek.tsx
│   │   └── SectionEyebrow.tsx
│   └── case-studies/
│       ├── SfmcScout.tsx
│       ├── CloudPageMaestro.tsx
│       └── MaestroBuilder.tsx
└── v2/
    ├── content/
    │   ├── siteMeta.ts
    │   ├── about.ts
    │   ├── experience.ts
    │   ├── projects.ts
    │   ├── certifications.ts
    │   ├── ai.ts
    │   ├── contact.ts
    │   └── types.ts
    ├── hooks/
    │   ├── useActiveSection.ts
    │   ├── useLatestCommit.ts
    │   └── useBootSeen.ts
    ├── data/
    │   └── latest-commit.json
    └── styles/
        └── v2.css
public/
├── llms.txt
└── v2/
    └── case-studies/
        ├── sfmc-scout/                # screenshots
        ├── cloudpage-maestro/         # screenshots
        └── maestro-builder/
            ├── (screenshots)
            └── preview.html           # pre-rendered MJML email
scripts/
├── generate-markdown.ts
└── fetch-latest-commit.ts
vercel.json
```

### Modified files (only these — v1 routes untouched)

- `src/App.tsx` — add 4 new routes
- `src/index.css` — `@import "./v2/styles/v2.css";` line (scoped via class root, doesn't leak)
- `vite.config.ts` — register markdown generator plugin
- `package.json` — add `shiki`, `react-helmet-async`, add `prebuild` script for commit fetcher

---

## Phase 0: Scaffolding & Dependencies

### Task 0.1: Install new dependencies

**Files:**
- Modify: `package.json` (via npm)
- Modify: `package-lock.json` (regenerated)

- [ ] **Step 1: Install runtime + build dependencies**

Run:
```bash
npm install shiki@^1.24.0 react-helmet-async@^2.0.5
```

Expected: both packages installed, `package.json` updated, no peer-dep warnings beyond existing ones.

- [ ] **Step 2: Verify install**

Run:
```bash
npm ls shiki react-helmet-async
```
Expected output: both listed with their versions, no `UNMET DEPENDENCY`.

- [ ] **Step 3: Verify existing build still passes**

Run:
```bash
npm run build
```
Expected: build succeeds, `dist/` populated. (No code changes yet — just confirming new deps don't break v1.)

---

### Task 0.2: Create v2 folder skeleton

**Files:**
- Create: empty directories listed below (with a `.gitkeep` file in each to ensure they're tracked)

- [ ] **Step 1: Create directories**

Run (PowerShell, since shell is PowerShell):
```powershell
$dirs = @(
  'src/pages/v2',
  'src/components/v2/layout',
  'src/components/v2/sections',
  'src/components/v2/primitives',
  'src/components/v2/case-studies',
  'src/v2/content',
  'src/v2/hooks',
  'src/v2/data',
  'src/v2/styles',
  'public/v2/case-studies/sfmc-scout',
  'public/v2/case-studies/cloudpage-maestro',
  'public/v2/case-studies/maestro-builder',
  'scripts'
)
foreach ($d in $dirs) { New-Item -ItemType Directory -Force -Path $d | Out-Null }
```

Expected: All 14 directories exist. `Get-ChildItem src/v2 -Recurse -Directory` lists `content`, `hooks`, `data`, `styles`.

---

### Task 0.3: Add v2 design-token CSS

**Files:**
- Create: `src/v2/styles/v2.css`
- Modify: `src/index.css` — append one `@import` line at the top

- [ ] **Step 1: Create v2.css**

Create `src/v2/styles/v2.css` with the full v2 token set scoped to `.v2-root`:

```css
/* v2 design tokens — scoped to .v2-root so they never leak into v1 */
.v2-root {
  /* Palette */
  --v2-bg-app: #0E0E10;
  --v2-bg-surface: #141416;
  --v2-bg-elevated: #1A1A1D;
  --v2-text: #E8E6E1;
  --v2-text-muted: #8A8580;
  --v2-text-dim: #4E4B47;
  --v2-accent: #F2A65A;
  --v2-accent-soft: rgba(242, 166, 90, 0.12);
  --v2-signal-green: #7DDB6D;
  --v2-signal-red: #E5484D;
  --v2-line: #1F1F22;
  --v2-line-strong: #2A2A2E;

  /* Fonts */
  --v2-font-mono: 'JetBrains Mono', 'IBM Plex Mono', 'Consolas', monospace;
  --v2-font-sans: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;

  /* Motion */
  --v2-ease: cubic-bezier(0.2, 0, 0, 1);
  --v2-dur: 200ms;

  background-color: var(--v2-bg-app);
  color: var(--v2-text);
  font-family: var(--v2-font-sans);
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}

.v2-root .mono { font-family: var(--v2-font-mono); }
.v2-root .muted { color: var(--v2-text-muted); }
.v2-root .dim { color: var(--v2-text-dim); }
.v2-root .accent { color: var(--v2-accent); }

@keyframes v2-cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.v2-root .cursor-block::after {
  content: '█';
  margin-left: 2px;
  color: var(--v2-accent);
  animation: v2-cursor-blink 1s steps(1) infinite;
}

@media (prefers-reduced-motion: reduce) {
  .v2-root * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Import v2.css from src/index.css**

Open `src/index.css`, add at the very top (line 1, before `@tailwind`):
```css
@import "./v2/styles/v2.css";
```

- [ ] **Step 3: Verify import compiles**

Run:
```bash
npm run dev
```
Expected: dev server starts on port 8080 (or whatever Vite picks), no CSS parse errors in terminal. Then Ctrl+C the dev server.

---

### Task 0.4: Register Google Fonts (JetBrains Mono + Inter)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add font preconnect + stylesheet to index.html**

Open `index.html`. Find the existing `<head>` block. Add immediately above `</head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Verify dev server loads fonts**

Run:
```bash
npm run dev
```
Open `http://localhost:8080/`, open DevTools Network tab, refresh. Expected: fonts.googleapis.com + fonts.gstatic.com requests return 200.

Ctrl+C dev server.

---

## Phase 1: Content (single source of truth)

### Task 1.1: Define content type contracts

**Files:**
- Create: `src/v2/content/types.ts`

- [ ] **Step 1: Write types.ts**

Create `src/v2/content/types.ts`:

```ts
export type SiteMeta = {
  name: string;
  role: string;
  taglineHero: string;
  location: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  githubHandle: string;
  trailheadUrl: string;
  version: string;
};

export type AboutContent = {
  paragraphs: string[];
  languages: { name: string; level: string }[];
};

export type Role = {
  title: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  technologies: string[];
};

export type Project = {
  slug: string;
  name: string;
  status: "shipped" | "in-development";
  signature?: boolean;
  license: string;
  hook: string;
  stats: string[];
  bullets: string[];
  githubUrl: string;
  caseStudyHref?: string;
};

export type Certification = {
  name: string;
  short: string;
  type: string;
  category: string;
  imagePath: string;
  provider: "Salesforce" | "HubSpot";
};

export type AIContent = {
  paragraphs: string[];
  certs: string[];
  currentlyExploring: string[];
  closingLine: string;
};

export type ContactItem = {
  command: string;
  value: string;
  href: string;
};
```

---

### Task 1.2: Site meta

**Files:**
- Create: `src/v2/content/siteMeta.ts`

- [ ] **Step 1: Write siteMeta.ts**

```ts
import type { SiteMeta } from "./types";

export const siteMeta: SiteMeta = {
  name: "Aldorino Rrushi",
  role: "Solution Engineer — Marketing Automation · Software · AI",
  taglineHero: "I make marketing platforms do what they couldn't.",
  location: "Tirana, Albania",
  email: "aldorino.rrushi@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/aldorino-rrushi",
  githubUrl: "https://github.com/MetalHacker01",
  githubHandle: "MetalHacker01",
  trailheadUrl: "https://www.salesforce.com/trailblazer/arrushi",
  version: "2.0.0",
};
```

---

### Task 1.3: About content

**Files:**
- Create: `src/v2/content/about.ts`

- [ ] **Step 1: Write about.ts**

```ts
import type { AboutContent } from "./types";

export const about: AboutContent = {
  paragraphs: [
    "I'm a solution engineer at MarketOne International, working with Salesforce Marketing Cloud, Oracle Eloqua, Adobe Marketo, Oracle Responsys, and HCL Unica. Seven-plus years across enterprise programs. M.Eng Computer Engineering from the Polytechnic University of Tirana. Tirana-based, remote-global.",
    "Most MarTech consultants stop where the platform stops. I ship software when the platform stops — so the engagement actually delivers what was promised, not what was technically possible inside the UI. The open-source tools in this site are the proof.",
    "Where I'm heading: agentic MarTech. Agentforce, AI-driven journeys, predictive sends. Already Salesforce-certified for Agentforce and AI Associate. Treating it as the next eighteen months of the craft.",
  ],
  languages: [
    { name: "Albanian", level: "native" },
    { name: "English", level: "professional" },
    { name: "Italian", level: "professional" },
    { name: "French", level: "elementary" },
  ],
};
```

---

### Task 1.4: Experience content

**Files:**
- Create: `src/v2/content/experience.ts`

- [ ] **Step 1: Write experience.ts**

```ts
import type { Role } from "./types";

export const experience: Role[] = [
  {
    title: "Solution Engineer",
    company: "MarketOne International",
    period: "2024-10 → present",
    location: "Remote",
    summary:
      "SFMC subject-matter expert across enterprise programs. Translate complex business requirements into scalable automation solutions and own the technical narrative with clients.",
    achievements: [
      "Serve as SFMC subject-matter expert, translating business requirements into scalable solutions",
      "Partner with cross-functional teams to deliver advanced marketing automation programs",
      "Oversee day-to-day development of marketing automation workflows",
      "Lead client discussions on SFMC utilization for enhanced customer experience",
    ],
    technologies: ["Salesforce Marketing Cloud", "Marketing Automation", "Client Relations", "Team Leadership"],
  },
  {
    title: "SFMC Developer / Web Developer",
    company: "MarketOne International",
    period: "2022-03 → 2024-10",
    location: "Remote",
    summary:
      "Led complex SFMC campaigns end-to-end. Heavy AMPscript and SSJS for personalisation, SQL for segmentation, and custom web tooling that made client engagements ship on time.",
    achievements: [
      "Developed customised solutions using AMPscript and SSJS for campaign optimisation",
      "Used SQL queries for sophisticated audience segmentation and targeting",
      "Built custom websites and solutions using HTML, CSS, JavaScript, Python",
      "Created API solutions in Oracle Eloqua and Adobe Marketo for data management",
      "Conducted code reviews and provided technical guidance to junior developers",
    ],
    technologies: ["AMPscript", "SSJS", "SQL", "JavaScript", "Python", "RESTful APIs", "Oracle Eloqua", "Adobe Marketo"],
  },
  {
    title: "Technical Lead",
    company: "Assist Digital",
    period: "2018 → 2022-03",
    location: "Tirana, Albania",
    summary:
      "Led a 10–15-person Marketing Automation team on large-scale programs for enterprise clients. Day-to-day across SFMC, Eloqua, Responsys, and Unica.",
    achievements: [
      "Leading Marketing Automation team of 10–15 members",
      "Working on large-scale projects for Mopar FCA, Luxottica, and Maserati",
      "Extensive knowledge of Salesforce Marketing Cloud, Oracle Eloqua, Oracle Responsys, HCL Unica",
    ],
    technologies: ["Salesforce Marketing Cloud", "Oracle Eloqua", "Oracle Responsys", "HCL Unica", "Team Management"],
  },
  {
    title: "Marketing Automation Analyst",
    company: "Assist Digital",
    period: "2018-04 → 2019-12",
    location: "Tirana, Albania",
    summary:
      "Personalisation and journey work for EMEA programs. Built and launched campaigns across every country in the region for FCA Group.",
    achievements: [
      "Created pages for all EMEA region countries for FCA Group",
      "Developed highly personalised and responsive emails and landing pages",
      "Designed and configured complex digital campaigns and customer journeys",
      "Analysed campaign performance including segmentation, deliverability, and conversion rates",
    ],
    technologies: ["Oracle Eloqua", "Salesforce Marketing Cloud", "Email Marketing", "Performance Analytics"],
  },
];
```

---

### Task 1.5: Projects content

**Files:**
- Create: `src/v2/content/projects.ts`

- [ ] **Step 1: Write projects.ts**

```ts
import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "sfmc-scout",
    name: "SFMC Scout",
    status: "shipped",
    signature: true,
    license: "MIT",
    hook: "Side panel that injects into SFMC. Search everything, generate reports, deploy snippets — without leaving the platform.",
    stats: ["MV3 chrome+firefox", "cookie+csrf auth", "5 search sources", "6 reports"],
    bullets: [
      "Universal search across Data Extensions, Automations, Journeys, Assets, Activities — results stream in progressively as each source responds",
      "Browse automations and journeys with rich status pills, inline detail cards, and one-click open in Automation Studio or Journey Builder",
      "Save reusable AMPscript / SSJS / SQL snippets and deploy them directly into open SFMC Ace editors",
    ],
    githubUrl: "https://github.com/MetalHacker01/SFMC_Scout",
    caseStudyHref: "/v2/projects/sfmc-scout",
  },
  {
    slug: "cloudpage-maestro",
    name: "CloudPage Maestro",
    status: "shipped",
    license: "MIT",
    hook: "Batch operations for SFMC CloudPages. Publish, unpublish, move, search, sort, export — at the speed of the bulk endpoint, not the UI.",
    stats: ["MV3", "cookie-only auth", "bulk V2 endpoint", "ZIP export with folder tree"],
    bullets: [
      "Bulk publish / unpublish / move across landing pages and code resources, with the full SFMC category tree as the folder picker",
      "Export every asset to CSV (fully enriched) or a ZIP that preserves the SFMC folder structure",
      "Hover any published landing page URL to see a live iframe preview without opening another tab",
    ],
    githubUrl: "https://github.com/MetalHacker01/CloudPage_Maestro",
    caseStudyHref: "/v2/projects/cloudpage-maestro",
  },
  {
    slug: "maestro-builder",
    name: "Maestro Builder",
    status: "shipped",
    license: "MIT + attribution",
    hook: "Drag-and-drop visual builder for bulletproof responsive HTML emails. Outlook 2007 onward, dark-mode-aware, real Mailjet test sends.",
    stats: ["next.js 16", "30 modules", "mjml", "vml bulletproof", "zustand"],
    bullets: [
      "Live preview canvas — click any module in the rendered email to select it; the right panel re-renders with that module's typed properties",
      "Bulletproof Outlook via <v:roundrect> buttons and <v:image> + <v:rect> overlay-on-photo hero pattern, all derived from Litmus + Email-on-Acid references",
      "Send a test in two clicks via Mailjet, with friendly error guidance for the validation-hold and sender-not-verified states",
    ],
    githubUrl: "https://github.com/MetalHacker01/MaestroBuilder",
    caseStudyHref: "/v2/projects/maestro-builder",
  },
  {
    slug: "sfmc-sto-activity",
    name: "SFMC STO Activity",
    status: "in-development",
    license: "MIT",
    hook: "Custom Send Time Optimization activity for always-on SFMC journeys (where native STO doesn't work).",
    stats: ["sfmc custom activity", "in development"],
    bullets: [],
    githubUrl: "https://github.com/MetalHacker01/SFMC_STO_CustomActivity",
  },
];
```

---

### Task 1.6: Certifications content

**Files:**
- Create: `src/v2/content/certifications.ts`

- [ ] **Step 1: Write certifications.ts**

```ts
import type { Certification } from "./types";

export const certifications: Certification[] = [
  {
    name: "Salesforce Certified Agentforce Specialist",
    short: "Agentforce Specialist",
    type: "Latest",
    category: "AI & Automation",
    imagePath: "/images/certifications/SF_AgentForce_Specialit_Cert.jpg",
    provider: "Salesforce",
  },
  {
    name: "Salesforce Certified AI Associate",
    short: "AI Associate",
    type: "AI",
    category: "Artificial Intelligence",
    imagePath: "/images/certifications/SF_AI_Associate_Cert.jpg",
    provider: "Salesforce",
  },
  {
    name: "Salesforce Certified Marketing Cloud Engagement Consultant",
    short: "MC Engagement Consultant",
    type: "Consultant",
    category: "Marketing Cloud",
    imagePath: "/images/certifications/SFMC_Consultant_Cert.jpg",
    provider: "Salesforce",
  },
  {
    name: "Salesforce Certified Marketing Cloud Engagement Developer",
    short: "MC Engagement Developer",
    type: "Developer",
    category: "Marketing Cloud",
    imagePath: "/images/certifications/SFMC_Developer_Cert.jpg",
    provider: "Salesforce",
  },
  {
    name: "Salesforce Certified Marketing Cloud Engagement Administrator",
    short: "MC Engagement Admin",
    type: "Administrator",
    category: "Marketing Cloud",
    imagePath: "/images/certifications/SFMC_Admin_Cert.jpg",
    provider: "Salesforce",
  },
  {
    name: "Salesforce Certified Marketing Cloud Email Specialist",
    short: "MC Email Specialist",
    type: "Specialist",
    category: "Marketing Cloud",
    imagePath: "/images/certifications/SFMC_EmailSpecialist_Cert.jpg",
    provider: "Salesforce",
  },
  {
    name: "Salesforce Certified Platform Foundations",
    short: "Platform Foundations",
    type: "Platform",
    category: "Core Platform",
    imagePath: "/images/certifications/SF_Associate_Cert.jpg",
    provider: "Salesforce",
  },
  {
    name: "HubSpot Marketing Software",
    short: "HubSpot Marketing Software",
    type: "Marketing",
    category: "HubSpot",
    imagePath: "",
    provider: "HubSpot",
  },
  {
    name: "HubSpot Email Marketing",
    short: "HubSpot Email Marketing",
    type: "Email",
    category: "HubSpot",
    imagePath: "",
    provider: "HubSpot",
  },
];
```

---

### Task 1.7: AI section content

**Files:**
- Create: `src/v2/content/ai.ts`

- [ ] **Step 1: Write ai.ts**

```ts
import type { AIContent } from "./types";

export const ai: AIContent = {
  paragraphs: [
    "Marketing automation platforms are getting AI primitives baked in. Agentforce on Salesforce. Predictive sends. AI-driven journey decisioning. The platforms that win the next five years are the ones that turn those primitives into measurable program outcomes — and that's the work I'm leaning into.",
    "I'm not an AI researcher. I'm a MarTech engineer who's certified in Salesforce's AI stack (Agentforce Specialist + AI Associate) and treating agentic systems as the next evolution of the work I already do — orchestrating customer experience across channels.",
  ],
  certs: ["Salesforce Certified Agentforce Specialist", "Salesforce Certified AI Associate"],
  currentlyExploring: [
    "agentforce on real customer journeys",
    "claude code as a daily driver for SFMC dev work",
    "genai-assisted ampscript / ssjs authoring",
    "llm-driven content variants inside journey decision splits",
  ],
  closingLine: "Enthusiast learning fast — not an 'AI expert'. The honesty matters.",
};
```

---

### Task 1.8: Contact content

**Files:**
- Create: `src/v2/content/contact.ts`

- [ ] **Step 1: Write contact.ts**

```ts
import type { ContactItem } from "./types";
import { siteMeta } from "./siteMeta";

export const contact: ContactItem[] = [
  { command: "mailto",   value: siteMeta.email,         href: `mailto:${siteMeta.email}` },
  { command: "linkedin", value: "/in/aldorino-rrushi",  href: siteMeta.linkedinUrl },
  { command: "github",   value: "/MetalHacker01",       href: siteMeta.githubUrl },
  { command: "location", value: "tirana, albania (remote, global)", href: "#" },
];
```

---

### Task 1.9: Content sanity check

**Files:**
- Create: `scripts/check-content.ts`

- [ ] **Step 1: Write check-content.ts**

```ts
import { siteMeta } from "../src/v2/content/siteMeta";
import { about } from "../src/v2/content/about";
import { experience } from "../src/v2/content/experience";
import { projects } from "../src/v2/content/projects";
import { certifications } from "../src/v2/content/certifications";
import { ai } from "../src/v2/content/ai";
import { contact } from "../src/v2/content/contact";

const errors: string[] = [];

if (!siteMeta.email.includes("@")) errors.push("siteMeta.email is invalid");
if (about.paragraphs.length === 0) errors.push("about.paragraphs is empty");
if (experience.length !== 4) errors.push(`experience should have 4 roles, has ${experience.length}`);
if (projects.length !== 4) errors.push(`projects should have 4 entries, has ${projects.length}`);
if (projects[0].slug !== "sfmc-scout") errors.push("projects[0] must be sfmc-scout");
if (projects[1].slug !== "cloudpage-maestro") errors.push("projects[1] must be cloudpage-maestro");
if (projects[2].slug !== "maestro-builder") errors.push("projects[2] must be maestro-builder");
if (projects[3].slug !== "sfmc-sto-activity") errors.push("projects[3] must be sfmc-sto-activity");
const sfCerts = certifications.filter((c) => c.provider === "Salesforce");
if (sfCerts.length !== 7) errors.push(`Salesforce certs should be 7, has ${sfCerts.length}`);
const hsCerts = certifications.filter((c) => c.provider === "HubSpot");
if (hsCerts.length !== 2) errors.push(`HubSpot certs should be 2, has ${hsCerts.length}`);
if (ai.certs.length !== 2) errors.push("ai.certs should have 2 entries");
if (contact.length !== 4) errors.push("contact should have 4 items");

if (errors.length > 0) {
  console.error("Content check FAILED:");
  errors.forEach((e) => console.error(" - " + e));
  process.exit(1);
}
console.log("Content check OK");
```

- [ ] **Step 2: Run the check**

Run:
```bash
npx tsx scripts/check-content.ts
```

Expected output: `Content check OK`. If `tsx` is not available, install with `npm install -D tsx` first.

---

## Phase 2: Routing & shell skeleton

### Task 2.1: Add v2 routes to App.tsx

**Files:**
- Modify: `src/App.tsx`
- Create: `src/pages/v2/Home.tsx` (stub)
- Create: `src/pages/v2/ProjectCaseStudy.tsx` (stub)

- [ ] **Step 1: Create Home.tsx stub**

Create `src/pages/v2/Home.tsx`:

```tsx
const Home = () => {
  return (
    <div className="v2-root">
      <div style={{ padding: "24px", fontFamily: "var(--v2-font-mono)" }}>
        <h1>v2 — scaffolding</h1>
        <p className="muted">If you can read this in JetBrains Mono, the v2 shell is loading.</p>
      </div>
    </div>
  );
};

export default Home;
```

- [ ] **Step 2: Create ProjectCaseStudy.tsx stub**

Create `src/pages/v2/ProjectCaseStudy.tsx`:

```tsx
import { useParams } from "react-router-dom";

const ProjectCaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div className="v2-root">
      <div style={{ padding: "24px", fontFamily: "var(--v2-font-mono)" }}>
        <h1>case study: {slug}</h1>
      </div>
    </div>
  );
};

export default ProjectCaseStudy;
```

- [ ] **Step 3: Wire routes in App.tsx**

Open `src/App.tsx`. Add the two new imports above the existing `Portfolio` import:
```tsx
import V2Home from "./pages/v2/Home";
import V2Case from "./pages/v2/ProjectCaseStudy";
```

Inside the `<Routes>` block, add these route lines BEFORE the catch-all `<Route path="*" ... />`:
```tsx
<Route path="/v2" element={<V2Home />} />
<Route path="/v2/projects/:slug" element={<V2Case />} />
```

- [ ] **Step 4: Verify routes in browser**

Run:
```bash
npm run dev
```

Open `http://localhost:8080/v2` — expected: "v2 — scaffolding" heading on near-black background, off-white text in JetBrains Mono.

Open `http://localhost:8080/v2/projects/sfmc-scout` — expected: "case study: sfmc-scout".

Open `http://localhost:8080/` — expected: v1 portfolio unchanged.

Ctrl+C dev server.

---

### Task 2.2: AsciiRule primitive

**Files:**
- Create: `src/components/v2/primitives/AsciiRule.tsx`

- [ ] **Step 1: Write AsciiRule.tsx**

```tsx
type Props = {
  number: string;
  label: string;
};

const AsciiRule = ({ number, label }: Props) => {
  return (
    <div
      role="separator"
      aria-label={`section ${number}: ${label}`}
      className="mono"
      style={{
        color: "var(--v2-text-muted)",
        fontSize: "0.875rem",
        margin: "64px 0 32px",
        userSelect: "none",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: "var(--v2-line-strong)" }}>═══════════ </span>
      <span style={{ color: "var(--v2-accent)" }}>{number}</span>
      <span style={{ color: "var(--v2-text-muted)" }}> / {label} </span>
      <span style={{ color: "var(--v2-line-strong)" }}>═══════════════════════════════════════════════</span>
    </div>
  );
};

export default AsciiRule;
```

---

### Task 2.3: MonoBadge primitive

**Files:**
- Create: `src/components/v2/primitives/MonoBadge.tsx`

- [ ] **Step 1: Write MonoBadge.tsx**

```tsx
import type { ReactNode } from "react";

type Variant = "default" | "accent" | "green" | "red";

type Props = {
  children: ReactNode;
  variant?: Variant;
};

const variantColor: Record<Variant, { border: string; color: string }> = {
  default: { border: "var(--v2-line-strong)", color: "var(--v2-text-muted)" },
  accent:  { border: "var(--v2-accent)",      color: "var(--v2-accent)" },
  green:   { border: "var(--v2-signal-green)", color: "var(--v2-signal-green)" },
  red:     { border: "var(--v2-signal-red)",  color: "var(--v2-signal-red)" },
};

const MonoBadge = ({ children, variant = "default" }: Props) => {
  const c = variantColor[variant];
  return (
    <span
      className="mono"
      style={{
        display: "inline-block",
        border: `1px solid ${c.border}`,
        color: c.color,
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        padding: "2px 8px",
        borderRadius: 0,
        background: "transparent",
        lineHeight: 1.4,
      }}
    >
      {children}
    </span>
  );
};

export default MonoBadge;
```

---

### Task 2.4: OutlineButton primitive

**Files:**
- Create: `src/components/v2/primitives/OutlineButton.tsx`

- [ ] **Step 1: Write OutlineButton.tsx**

```tsx
import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

type AsAnchor = CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps>;
type AsButton = CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

const styleFor = (variant: "primary" | "secondary"): React.CSSProperties => ({
  display: "inline-block",
  fontFamily: "var(--v2-font-mono)",
  fontSize: "0.875rem",
  textTransform: "lowercase",
  letterSpacing: "0.02em",
  padding: "10px 16px",
  border: `1px solid ${variant === "primary" ? "var(--v2-accent)" : "var(--v2-line-strong)"}`,
  color: variant === "primary" ? "var(--v2-accent)" : "var(--v2-text)",
  background: "transparent",
  textDecoration: "none",
  cursor: "pointer",
  transition: `background ${"var(--v2-dur)"} ${"var(--v2-ease)"}, color ${"var(--v2-dur)"} ${"var(--v2-ease)"}`,
  borderRadius: 0,
});

const OutlineButton = (props: AsAnchor | AsButton) => {
  const { variant = "primary", children, ...rest } = props;
  const baseStyle = styleFor(variant);

  if ("href" in props && props.href !== undefined) {
    return (
      <a
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={props.href}
        style={baseStyle}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "var(--v2-accent-soft)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
        }}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      style={baseStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--v2-accent-soft)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
```

---

### Task 2.5: SectionEyebrow primitive

**Files:**
- Create: `src/components/v2/primitives/SectionEyebrow.tsx`

- [ ] **Step 1: Write SectionEyebrow.tsx**

```tsx
type Props = {
  number: string;
  label: string;
};

const SectionEyebrow = ({ number, label }: Props) => (
  <div
    className="mono"
    style={{
      position: "sticky",
      top: 0,
      background: "var(--v2-bg-app)",
      color: "var(--v2-text-muted)",
      fontSize: "0.75rem",
      letterSpacing: "0.05em",
      padding: "8px 0",
      borderBottom: "1px solid var(--v2-line)",
      zIndex: 10,
      textTransform: "lowercase",
    }}
  >
    <span style={{ color: "var(--v2-accent)" }}>§{number}</span> {label}
  </div>
);

export default SectionEyebrow;
```

---

### Task 2.6: HoverPeek primitive (wraps shadcn HoverCard)

**Files:**
- Create: `src/components/v2/primitives/HoverPeek.tsx`

- [ ] **Step 1: Write HoverPeek.tsx**

```tsx
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
```

---

### Task 2.7: CodeBlock primitive (Shiki at build, plain at runtime)

**Files:**
- Create: `src/components/v2/primitives/CodeBlock.tsx`

- [ ] **Step 1: Write CodeBlock.tsx**

```tsx
import { useEffect, useState } from "react";

type Props = {
  code: string;
  lang?: string;
  caption?: string;
};

const CodeBlock = ({ code, lang = "ts", caption }: Props) => {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { codeToHtml } = await import("shiki");
        const result = await codeToHtml(code, {
          lang,
          theme: "github-dark-default",
        });
        if (!cancelled) setHtml(result);
      } catch {
        if (!cancelled) setHtml(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return (
    <figure style={{ margin: "16px 0" }}>
      <div
        style={{
          background: "var(--v2-bg-elevated)",
          border: "1px solid var(--v2-line-strong)",
          padding: "16px",
          overflowX: "auto",
          fontFamily: "var(--v2-font-mono)",
          fontSize: "0.8125rem",
          lineHeight: 1.55,
        }}
      >
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre style={{ margin: 0, whiteSpace: "pre", color: "var(--v2-text)" }}>{code}</pre>
        )}
      </div>
      {caption && (
        <figcaption className="mono muted" style={{ fontSize: "0.75rem", marginTop: 6 }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default CodeBlock;
```

---

## Phase 3: IDE shell layout

### Task 3.1: TitleBar

**Files:**
- Create: `src/components/v2/layout/TitleBar.tsx`

- [ ] **Step 1: Write TitleBar.tsx**

```tsx
import { siteMeta } from "@/v2/content/siteMeta";

const TitleBar = () => (
  <header
    role="banner"
    style={{
      height: 36,
      borderBottom: "1px solid var(--v2-line)",
      background: "var(--v2-bg-surface)",
      display: "flex",
      alignItems: "center",
      padding: "0 14px",
      gap: 14,
      flexShrink: 0,
    }}
  >
    <div style={{ display: "flex", gap: 6 }} aria-hidden="true">
      <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#E5484D" }} />
      <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#F5A623" }} />
      <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#7DDB6D" }} />
    </div>
    <div className="mono" style={{ fontSize: "0.8125rem", color: "var(--v2-text-muted)" }}>
      aldorino@martech ── ~/portfolio
    </div>
    <div style={{ flex: 1 }} />
    <div className="mono dim" style={{ fontSize: "0.75rem" }}>v{siteMeta.version}</div>
  </header>
);

export default TitleBar;
```

---

### Task 3.2: Explorer (file tree)

**Files:**
- Create: `src/components/v2/layout/Explorer.tsx`

- [ ] **Step 1: Write Explorer.tsx**

```tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import HoverPeek from "@/components/v2/primitives/HoverPeek";
import { projects } from "@/v2/content/projects";

type FileItem = { id: string; label: string; href: string; preview: string[]; external?: boolean };

const files: FileItem[] = [
  { id: "about",    label: "about.md",         href: "#about",         preview: ["solution engineer at marketone", "sfmc · eloqua · marketo · responsys · unica", "7+ years · m.eng comp. eng.", "tirana, remote-global"] },
  { id: "experience", label: "experience.json", href: "#experience",   preview: ["4 roles in reverse-chron order", "click to expand each row", "tech stack tagged per role", "covers 2018 → present"] },
  { id: "projects", label: "projects/",        href: "#projects",      preview: ["open-source field tools", "scout · cpm · maestro · sto", "all MIT, all production-used"] },
  { id: "certs",    label: "certs.txt",        href: "#certs",         preview: ["7× salesforce-certified", "ai associate · agentforce specialist", "mc consultant · developer · admin", "email specialist · platform foundations"] },
  { id: "ai",       label: "ai.md",            href: "#ai",            preview: ["agentic martech direction", "agentforce + ai associate certified", "currently exploring..."] },
  { id: "contact",  label: "contact.sh",       href: "#contact",       preview: ["mailto + linkedin + github", "tirana, remote-global", "available for engagements"] },
];

type Props = { activeId?: string };

const Explorer = ({ activeId }: Props) => {
  const [projectsOpen, setProjectsOpen] = useState(true);

  return (
    <nav
      aria-label="file explorer"
      style={{
        width: 240,
        borderRight: "1px solid var(--v2-line)",
        background: "var(--v2-bg-surface)",
        padding: "14px 0",
        fontFamily: "var(--v2-font-mono)",
        fontSize: "0.8125rem",
        flexShrink: 0,
        overflowY: "auto",
      }}
    >
      <div className="mono dim" style={{ padding: "0 16px 8px", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        explorer
      </div>
      <div className="mono muted" style={{ padding: "4px 16px" }}>~ aldorino</div>
      {files.map((f) => {
        const isActive = activeId === f.id;
        const isProjects = f.id === "projects";

        const row = (
          <a
            href={f.href}
            style={{
              display: "block",
              padding: "5px 16px 5px 24px",
              color: isActive ? "var(--v2-accent)" : "var(--v2-text)",
              textDecoration: "none",
              borderLeft: isActive ? "2px solid var(--v2-accent)" : "2px solid transparent",
              transition: "background var(--v2-dur) var(--v2-ease)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--v2-accent-soft)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            onClick={(e) => {
              if (isProjects) {
                e.preventDefault();
                setProjectsOpen((v) => !v);
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            <span style={{ marginRight: 6, color: isActive ? "var(--v2-accent)" : "var(--v2-text-muted)" }}>
              {isProjects ? (projectsOpen ? "▾" : "▸") : (isActive ? "▸" : " ")}
            </span>
            {f.label}
          </a>
        );

        return (
          <div key={f.id}>
            <HoverPeek trigger={row} lines={f.preview} />
            {isProjects && projectsOpen && (
              <div>
                {projects.map((p) => {
                  const projLine = (
                    <Link
                      to={p.caseStudyHref ?? p.githubUrl}
                      style={{
                        display: "block",
                        padding: "4px 16px 4px 48px",
                        color: "var(--v2-text-muted)",
                        textDecoration: "none",
                        fontSize: "0.8125rem",
                        transition: "color var(--v2-dur) var(--v2-ease), background var(--v2-dur) var(--v2-ease)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--v2-accent)";
                        e.currentTarget.style.background = "var(--v2-accent-soft)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--v2-text-muted)";
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      • {p.slug}
                    </Link>
                  );
                  return (
                    <HoverPeek
                      key={p.slug}
                      trigger={projLine}
                      lines={[p.hook, "", ...p.stats.map((s) => "· " + s)]}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Explorer;
```

---

### Task 3.3: useActiveSection hook

**Files:**
- Create: `src/v2/hooks/useActiveSection.ts`

- [ ] **Step 1: Write useActiveSection.ts**

```ts
import { useEffect, useState } from "react";

export const useActiveSection = (ids: string[]): string => {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
};
```

---

### Task 3.4: StatusBar

**Files:**
- Create: `src/components/v2/layout/StatusBar.tsx`

- [ ] **Step 1: Write StatusBar.tsx**

```tsx
import { useEffect, useState } from "react";
import { certifications } from "@/v2/content/certifications";

type Props = { activeId: string; latestCommit?: string };

const today = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const sectionNumber: Record<string, string> = {
  about: "01",
  experience: "02",
  projects: "03",
  certs: "04",
  ai: "05",
  contact: "06",
};

const StatusBar = ({ activeId, latestCommit }: Props) => {
  const [date, setDate] = useState(today());
  useEffect(() => {
    const t = setInterval(() => setDate(today()), 60_000);
    return () => clearInterval(t);
  }, []);

  const sfCount = certifications.filter((c) => c.provider === "Salesforce").length;
  const num = sectionNumber[activeId] ?? "01";

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--v2-line)",
        background: "var(--v2-bg-surface)",
        height: 28,
        display: "flex",
        alignItems: "center",
        padding: "0 14px",
        fontFamily: "var(--v2-font-mono)",
        fontSize: "0.75rem",
        color: "var(--v2-text-muted)",
        gap: 14,
        flexShrink: 0,
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      <span style={{ color: "var(--v2-signal-green)" }}>●</span>
      <span>main</span>
      <span className="dim">·</span>
      <span>{sfCount}× certified</span>
      <span className="dim">·</span>
      <span><span style={{ color: "var(--v2-accent)" }}>§{num}</span> {activeId || "about"}</span>
      <span className="dim">·</span>
      <span>{date}</span>
      {latestCommit && (
        <>
          <span className="dim">·</span>
          <span className="hide-md" style={{ overflow: "hidden", textOverflow: "ellipsis", maxWidth: 360 }}>
            last commit: {latestCommit}
          </span>
        </>
      )}
      <span style={{ flex: 1 }} />
      <span className="dim">made in tirana</span>
      <span className="dim">·</span>
      <span className="dim">deployed via vercel</span>
    </footer>
  );
};

export default StatusBar;
```

- [ ] **Step 2: Add `.hide-md` responsive class to v2.css**

Open `src/v2/styles/v2.css`. Append at the end of the file:

```css
@media (max-width: 1023px) {
  .v2-root .hide-md { display: none; }
}
@media (max-width: 767px) {
  .v2-root .hide-sm { display: none; }
}
```

---

### Task 3.5: Minimap

**Files:**
- Create: `src/components/v2/layout/Minimap.tsx`

- [ ] **Step 1: Write Minimap.tsx**

```tsx
type Item = { id: string; number: string; label: string };

const items: Item[] = [
  { id: "about",      number: "01", label: "about" },
  { id: "experience", number: "02", label: "experience" },
  { id: "projects",   number: "03", label: "projects" },
  { id: "certs",      number: "04", label: "certs" },
  { id: "ai",         number: "05", label: "ai" },
  { id: "contact",    number: "06", label: "contact" },
];

type Props = { activeId: string };

const Minimap = ({ activeId }: Props) => (
  <aside
    aria-label="section minimap"
    className="hide-md"
    style={{
      width: 88,
      borderLeft: "1px solid var(--v2-line)",
      background: "var(--v2-bg-surface)",
      padding: "14px 0",
      fontFamily: "var(--v2-font-mono)",
      fontSize: "0.7rem",
      color: "var(--v2-text-muted)",
      flexShrink: 0,
      overflowY: "auto",
    }}
  >
    {items.map((it) => {
      const isActive = activeId === it.id;
      return (
        <a
          key={it.id}
          href={`#${it.id}`}
          style={{
            display: "block",
            padding: "6px 12px 6px 14px",
            color: isActive ? "var(--v2-accent)" : "var(--v2-text-muted)",
            textDecoration: "none",
            borderLeft: isActive ? "2px solid var(--v2-accent)" : "2px solid transparent",
            transition: "color var(--v2-dur) var(--v2-ease)",
          }}
        >
          <span className="dim" style={{ marginRight: 4 }}>{it.number}</span>
          {it.label}
        </a>
      );
    })}
  </aside>
);

export default Minimap;
```

---

### Task 3.6: BootSequence + useBootSeen hook

**Files:**
- Create: `src/v2/hooks/useBootSeen.ts`
- Create: `src/components/v2/layout/BootSequence.tsx`

- [ ] **Step 1: Write useBootSeen.ts**

```ts
import { useEffect, useState } from "react";

const COOKIE_NAME = "seen_v2";
const COOKIE_DAYS = 180;

const readCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : null;
};

const writeCookie = (name: string, value: string, days: number) => {
  if (typeof document === "undefined") return;
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
};

export const useBootSeen = () => {
  const [shouldBoot, setShouldBoot] = useState<boolean>(false);

  useEffect(() => {
    const seen = readCookie(COOKIE_NAME);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!seen && !reduce) {
      setShouldBoot(true);
    }
  }, []);

  const markSeen = () => {
    writeCookie(COOKIE_NAME, "1", COOKIE_DAYS);
    setShouldBoot(false);
  };

  return { shouldBoot, markSeen };
};
```

- [ ] **Step 2: Write BootSequence.tsx**

```tsx
import { useEffect, useState } from "react";

type Props = { onDone: () => void };

const lines = [
  "booting portfolio v2.0.0",
  "loading file system...   ok",
  "mounting 4 projects...   ok",
  "verifying 7 certs...     ok",
  "ready.",
];

const BootSequence = ({ onDone }: Props) => {
  const [shown, setShown] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (shown >= lines.length) {
      const t = setTimeout(() => {
        setHide(true);
        setTimeout(onDone, 300);
      }, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((n) => n + 1), 550);
    return () => clearTimeout(t);
  }, [shown, onDone]);

  useEffect(() => {
    const skip = () => {
      setHide(true);
      setTimeout(onDone, 200);
    };
    window.addEventListener("scroll", skip, { once: true, passive: true });
    window.addEventListener("click", skip, { once: true });
    return () => {
      window.removeEventListener("scroll", skip);
      window.removeEventListener("click", skip);
    };
  }, [onDone]);

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--v2-bg-app)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: hide ? 0 : 1,
        transition: "opacity 300ms var(--v2-ease)",
        pointerEvents: hide ? "none" : "auto",
      }}
    >
      <div
        className="mono"
        style={{ color: "var(--v2-text-muted)", fontSize: "0.9rem", lineHeight: 1.8, minWidth: 340 }}
      >
        {lines.slice(0, shown).map((l, i) => (
          <div key={i}>
            <span style={{ color: "var(--v2-signal-green)" }}>$</span> {l}
          </div>
        ))}
        {shown < lines.length && <span className="cursor-block" />}
      </div>
    </div>
  );
};

export default BootSequence;
```

---

### Task 3.7: useLatestCommit hook + placeholder JSON

**Files:**
- Create: `src/v2/data/latest-commit.json`
- Create: `src/v2/hooks/useLatestCommit.ts`

- [ ] **Step 1: Write latest-commit.json placeholder**

```json
{ "message": "init: v2 scaffolding", "sha": "", "date": "" }
```

- [ ] **Step 2: Write useLatestCommit.ts**

```ts
import data from "@/v2/data/latest-commit.json";

export const useLatestCommit = (): string => {
  const msg = (data as { message?: string }).message ?? "";
  if (!msg) return "";
  return msg.length > 60 ? msg.slice(0, 57) + "..." : msg;
};
```

---

### Task 3.8: IDEShell composer

**Files:**
- Create: `src/components/v2/layout/IDEShell.tsx`

- [ ] **Step 1: Write IDEShell.tsx**

```tsx
import { useState, type ReactNode } from "react";
import TitleBar from "./TitleBar";
import Explorer from "./Explorer";
import Minimap from "./Minimap";
import StatusBar from "./StatusBar";
import BootSequence from "./BootSequence";
import { useActiveSection } from "@/v2/hooks/useActiveSection";
import { useBootSeen } from "@/v2/hooks/useBootSeen";
import { useLatestCommit } from "@/v2/hooks/useLatestCommit";

const SECTION_IDS = ["about", "experience", "projects", "certs", "ai", "contact"];

type Props = {
  children: ReactNode;
  showSidebars?: boolean;
};

const IDEShell = ({ children, showSidebars = true }: Props) => {
  const activeId = useActiveSection(SECTION_IDS);
  const { shouldBoot, markSeen } = useBootSeen();
  const latestCommit = useLatestCommit();
  const [mobileExplorerOpen, setMobileExplorerOpen] = useState(false);

  return (
    <div
      className="v2-root"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "var(--v2-bg-app)",
        color: "var(--v2-text)",
      }}
    >
      {shouldBoot && <BootSequence onDone={markSeen} />}

      <TitleBar />

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {showSidebars && (
          <>
            <div className="hide-sm">
              <Explorer activeId={activeId} />
            </div>
            {mobileExplorerOpen && (
              <div
                role="dialog"
                aria-modal="true"
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.6)",
                  zIndex: 50,
                  display: "flex",
                }}
                onClick={() => setMobileExplorerOpen(false)}
              >
                <div onClick={(e) => e.stopPropagation()}>
                  <Explorer activeId={activeId} />
                </div>
              </div>
            )}
          </>
        )}

        <main
          style={{
            flex: 1,
            overflowY: "auto",
            minWidth: 0,
            padding: "0 24px",
          }}
        >
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 0" }}>{children}</div>
        </main>

        {showSidebars && <Minimap activeId={activeId} />}
      </div>

      <StatusBar activeId={activeId} latestCommit={latestCommit} />

      <button
        className="hide-md"
        aria-label="open explorer"
        onClick={() => setMobileExplorerOpen(true)}
        style={{
          position: "fixed",
          top: 8,
          right: 12,
          padding: "4px 10px",
          background: "var(--v2-bg-elevated)",
          border: "1px solid var(--v2-line-strong)",
          color: "var(--v2-text)",
          fontFamily: "var(--v2-font-mono)",
          fontSize: "0.75rem",
          cursor: "pointer",
          zIndex: 40,
        }}
      >
        ☰ files
      </button>
    </div>
  );
};

export default IDEShell;
```

- [ ] **Step 2: Wire IDEShell into Home.tsx stub for verification**

Replace `src/pages/v2/Home.tsx` with:

```tsx
import IDEShell from "@/components/v2/layout/IDEShell";

const Home = () => (
  <IDEShell>
    <div id="about" style={{ minHeight: "60vh" }}>
      <h1 className="mono" style={{ color: "var(--v2-accent)" }}>about</h1>
      <p>section 01 — about (placeholder)</p>
    </div>
    <div id="experience" style={{ minHeight: "60vh" }}>
      <h1 className="mono">experience</h1>
    </div>
    <div id="projects" style={{ minHeight: "60vh" }}>
      <h1 className="mono">projects</h1>
    </div>
    <div id="certs" style={{ minHeight: "60vh" }}>
      <h1 className="mono">certs</h1>
    </div>
    <div id="ai" style={{ minHeight: "60vh" }}>
      <h1 className="mono">ai</h1>
    </div>
    <div id="contact" style={{ minHeight: "60vh" }}>
      <h1 className="mono">contact</h1>
    </div>
  </IDEShell>
);

export default Home;
```

- [ ] **Step 3: Verify shell renders**

Run `npm run dev`. Open `http://localhost:8080/v2`. Expect:
1. Boot sequence runs (~3 seconds), then fades to IDE shell.
2. Titlebar shows the three colored dots and `aldorino@martech ── ~/portfolio` and `v2.0.0`.
3. Explorer on left with 6 entries + projects expanded showing 4 sub-items.
4. Main content shows the six placeholder section headings.
5. Minimap on right (only if window ≥ 1280px) shows 6 numbered items.
6. Status bar at bottom shows `● main · 7× certified · §01 about · <today> · last commit: init: v2 scaffolding · made in tirana · deployed via vercel`.
7. Scrolling updates the active section in explorer and status bar.
8. Refresh the page — boot sequence is skipped on second visit (cookie is set).

To re-test boot: clear cookies for localhost, refresh.

Ctrl+C dev server.

---

## Phase 4: Home page sections

### Task 4.1: Hero (above About)

**Files:**
- Create: `src/components/v2/sections/Hero.tsx`

- [ ] **Step 1: Write Hero.tsx**

```tsx
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
    <h1
      style={{
        fontFamily: "var(--v2-font-sans)",
        fontWeight: 800,
        fontSize: "clamp(2rem, 5vw, 4.5rem)",
        lineHeight: 1.05,
        letterSpacing: "-0.02em",
        marginBottom: 16,
      }}
    >
      {siteMeta.taglineHero}
      <span className="cursor-block" aria-hidden="true" />
    </h1>
    <p className="mono muted" style={{ fontSize: "0.9rem", marginBottom: 24 }}>
      aldorino rrushi · solution engineer · marketing automation · software · ai
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
```

---

### Task 4.2: About section

**Files:**
- Create: `src/components/v2/sections/About.tsx`

- [ ] **Step 1: Write About.tsx**

```tsx
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
```

---

### Task 4.3: Experience section

**Files:**
- Create: `src/components/v2/sections/Experience.tsx`

- [ ] **Step 1: Write Experience.tsx**

```tsx
import { useState } from "react";
import AsciiRule from "@/components/v2/primitives/AsciiRule";
import MonoBadge from "@/components/v2/primitives/MonoBadge";
import { experience } from "@/v2/content/experience";

const Experience = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="experience" aria-labelledby="experience-heading">
      <AsciiRule number="02" label="experience.json" />
      <h2 id="experience-heading" className="mono accent" style={{ fontSize: "1.5rem", marginBottom: 16 }}>
        # experience
      </h2>
      <p className="mono muted" style={{ fontSize: "0.8125rem", marginBottom: 24 }}>
        // click any row to expand
      </p>

      <div style={{ borderTop: "1px solid var(--v2-line)" }}>
        {experience.map((role, idx) => {
          const isOpen = openIndex === idx;
          return (
            <article
              key={idx}
              style={{ borderBottom: "1px solid var(--v2-line)" }}
            >
              <button
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                style={{
                  width: "100%",
                  padding: "16px 0",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 16,
                  textAlign: "left",
                  color: "var(--v2-text)",
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: "0.875rem",
                  flexWrap: "wrap",
                }}
              >
                <span>
                  <span style={{ color: "var(--v2-accent)", marginRight: 8 }}>
                    {isOpen ? "▾" : "▸"}
                  </span>
                  <strong style={{ fontWeight: 600 }}>{role.title}</strong>
                  <span className="dim" style={{ margin: "0 8px" }}>@</span>
                  <span>{role.company}</span>
                </span>
                <span className="muted">{role.period}</span>
              </button>

              {isOpen && (
                <div style={{ padding: "0 0 24px 20px" }}>
                  <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 12 }}>
                    {role.summary}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                    {role.achievements.map((a, i) => (
                      <li key={i} style={{ display: "flex", gap: 10, marginBottom: 6, fontFamily: "var(--v2-font-sans)" }}>
                        <span className="mono dim">·</span>
                        <span style={{ fontSize: "0.9375rem", lineHeight: 1.55 }}>{a}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {role.technologies.map((t) => (
                      <MonoBadge key={t}>{t}</MonoBadge>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
```

---

### Task 4.4: Projects section

**Files:**
- Create: `src/components/v2/sections/Projects.tsx`

- [ ] **Step 1: Write Projects.tsx**

```tsx
import { Link } from "react-router-dom";
import AsciiRule from "@/components/v2/primitives/AsciiRule";
import MonoBadge from "@/components/v2/primitives/MonoBadge";
import OutlineButton from "@/components/v2/primitives/OutlineButton";
import { projects } from "@/v2/content/projects";

const Projects = () => (
  <section id="projects" aria-labelledby="projects-heading">
    <AsciiRule number="03" label="projects/" />
    <h2 id="projects-heading" className="mono accent" style={{ fontSize: "1.5rem", marginBottom: 16 }}>
      # projects
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
      Open-source tools I've built — every one of them was born from a real client engagement where SFMC's UI or limits got in the way. All MIT-licensed. All used in production.
    </p>

    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {projects.map((p) => (
        <article
          key={p.slug}
          style={{
            border: "1px solid var(--v2-line)",
            padding: 20,
            background: "var(--v2-bg-surface)",
          }}
        >
          <header style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
              <span className="mono dim" style={{ fontSize: "0.8125rem" }}>~/projects/</span>
              <h3 className="mono" style={{ fontSize: "1.125rem", color: "var(--v2-accent)", margin: 0 }}>{p.slug}</h3>
              {p.signature && <MonoBadge variant="accent">★ signature</MonoBadge>}
              {p.status === "in-development" && <MonoBadge variant="red">◌ in development</MonoBadge>}
              {p.status === "shipped" && <MonoBadge variant="green">● shipped</MonoBadge>}
              <MonoBadge>{p.license}</MonoBadge>
            </div>
          </header>

          <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.55, marginBottom: 12 }}>
            {p.hook}
          </p>

          {p.stats.length > 0 && (
            <div className="mono muted" style={{ fontSize: "0.8125rem", marginBottom: 12 }}>
              {p.stats.join(" · ")}
            </div>
          )}

          {p.bullets.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
              {p.bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 10, marginBottom: 6, fontFamily: "var(--v2-font-sans)" }}>
                  <span className="mono dim">·</span>
                  <span style={{ fontSize: "0.9375rem", lineHeight: 1.55 }}>{b}</span>
                </li>
              ))}
            </ul>
          )}

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {p.caseStudyHref && (
              <Link
                to={p.caseStudyHref}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: "0.875rem",
                  textTransform: "lowercase",
                  padding: "8px 14px",
                  border: "1px solid var(--v2-accent)",
                  color: "var(--v2-accent)",
                  textDecoration: "none",
                  borderRadius: 0,
                  transition: "background var(--v2-dur) var(--v2-ease)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--v2-accent-soft)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                [ read case study → ]
              </Link>
            )}
            <OutlineButton href={p.githubUrl} variant="secondary">[ github ↗ ]</OutlineButton>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default Projects;
```

---

### Task 4.5: Certifications section

**Files:**
- Create: `src/components/v2/sections/Certifications.tsx`

- [ ] **Step 1: Write Certifications.tsx**

```tsx
import { useState } from "react";
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
```

---

### Task 4.6: AI section

**Files:**
- Create: `src/components/v2/sections/AI.tsx`

- [ ] **Step 1: Write AI.tsx**

```tsx
import AsciiRule from "@/components/v2/primitives/AsciiRule";
import MonoBadge from "@/components/v2/primitives/MonoBadge";
import { ai } from "@/v2/content/ai";

const AI = () => (
  <section id="ai" aria-labelledby="ai-heading">
    <AsciiRule number="05" label="ai.md" />
    <h2 id="ai-heading" className="mono accent" style={{ fontSize: "1.5rem", marginBottom: 16 }}>
      # ai
    </h2>

    {ai.paragraphs.map((p, i) => (
      <p
        key={i}
        style={{
          fontFamily: "var(--v2-font-sans)",
          fontSize: "1rem",
          lineHeight: 1.65,
          marginBottom: 16,
        }}
      >
        {p}
      </p>
    ))}

    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "16px 0 24px" }}>
      {ai.certs.map((c) => (
        <MonoBadge key={c} variant="accent">{c}</MonoBadge>
      ))}
    </div>

    <div className="mono muted" style={{ fontSize: "0.8125rem", marginBottom: 8 }}>
      currently exploring:
    </div>
    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
      {ai.currentlyExploring.map((item, i) => (
        <li key={i} className="mono" style={{ fontSize: "0.875rem", marginBottom: 4, color: "var(--v2-text)" }}>
          <span className="dim">·</span> {item}
        </li>
      ))}
    </ul>

    <p
      style={{
        fontFamily: "var(--v2-font-sans)",
        fontStyle: "italic",
        fontSize: "0.9375rem",
        color: "var(--v2-text-muted)",
      }}
    >
      {ai.closingLine}
    </p>
  </section>
);

export default AI;
```

---

### Task 4.7: Contact section

**Files:**
- Create: `src/components/v2/sections/Contact.tsx`

- [ ] **Step 1: Write Contact.tsx**

```tsx
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
```

---

### Task 4.8: Wire all sections into Home

**Files:**
- Modify: `src/pages/v2/Home.tsx`

- [ ] **Step 1: Replace Home.tsx with the full composition**

```tsx
import IDEShell from "@/components/v2/layout/IDEShell";
import Hero from "@/components/v2/sections/Hero";
import About from "@/components/v2/sections/About";
import Experience from "@/components/v2/sections/Experience";
import Projects from "@/components/v2/sections/Projects";
import Certifications from "@/components/v2/sections/Certifications";
import AI from "@/components/v2/sections/AI";
import Contact from "@/components/v2/sections/Contact";

const Home = () => (
  <IDEShell>
    <Hero />
    <About />
    <Experience />
    <Projects />
    <Certifications />
    <AI />
    <Contact />
  </IDEShell>
);

export default Home;
```

- [ ] **Step 2: Verify full home page renders**

Run `npm run dev`. Open `http://localhost:8080/v2`. Expect:
1. Hero with the tagline + 4 CTA buttons.
2. All six sections rendered with real content (no "placeholder" labels).
3. Experience rows expand/collapse on click; first row is open by default.
4. Projects shows 4 cards in correct order: sfmc-scout, cloudpage-maestro, maestro-builder, sfmc-sto-activity.
5. Clicking a certification badge opens a modal with the cert image.
6. Status bar updates section indicator as you scroll.
7. Explorer file tree highlights the current section.
8. No console errors.

Ctrl+C dev server.

---

## Phase 5: Case study pages

### Task 5.1: Case study layout shell

**Files:**
- Modify: `src/pages/v2/ProjectCaseStudy.tsx`

- [ ] **Step 1: Replace ProjectCaseStudy.tsx**

```tsx
import { useParams, Link, Navigate } from "react-router-dom";
import IDEShell from "@/components/v2/layout/IDEShell";
import { projects } from "@/v2/content/projects";
import SfmcScout from "@/components/v2/case-studies/SfmcScout";
import CloudPageMaestro from "@/components/v2/case-studies/CloudPageMaestro";
import MaestroBuilder from "@/components/v2/case-studies/MaestroBuilder";

const ProjectCaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  if (!project || !project.caseStudyHref) return <Navigate to="/v2" replace />;

  const body = (() => {
    switch (slug) {
      case "sfmc-scout": return <SfmcScout />;
      case "cloudpage-maestro": return <CloudPageMaestro />;
      case "maestro-builder": return <MaestroBuilder />;
      default: return null;
    }
  })();

  return (
    <IDEShell showSidebars={false}>
      <div className="mono muted" style={{ fontSize: "0.8125rem", marginBottom: 8 }}>
        <Link to="/v2" style={{ color: "var(--v2-text-muted)", textDecoration: "none" }}>
          ← back
        </Link>
        <span className="dim"> / </span>
        projects / {project.slug}.md
      </div>
      <h1 style={{
        fontFamily: "var(--v2-font-sans)",
        fontWeight: 800,
        fontSize: "clamp(1.75rem, 4vw, 3rem)",
        letterSpacing: "-0.02em",
        marginBottom: 12,
      }}>
        {project.name}
      </h1>
      <p style={{
        fontFamily: "var(--v2-font-sans)",
        fontSize: "1.125rem",
        lineHeight: 1.55,
        color: "var(--v2-text-muted)",
        marginBottom: 32,
      }}>
        {project.hook}
      </p>
      {body}
      <div style={{ marginTop: 48, borderTop: "1px solid var(--v2-line)", paddingTop: 16 }}>
        <Link
          to="/v2#projects"
          className="mono"
          style={{ color: "var(--v2-accent)", textDecoration: "none", fontSize: "0.875rem" }}
        >
          [ ↩ back to projects ]
        </Link>
      </div>
    </IDEShell>
  );
};

export default ProjectCaseStudy;
```

---

### Task 5.2: SFMC Scout case study

**Files:**
- Create: `src/components/v2/case-studies/SfmcScout.tsx`

- [ ] **Step 1: Write SfmcScout.tsx**

```tsx
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
      I wanted one panel that injects into SFMC, finds anything, generates real reports, and deploys reusable snippets into the active editor. No backend, no OAuth dance, no extra credentials — just my existing SFMC session and the platform's internal APIs.
    </p>

    <h2 className="mono accent" style={{ fontSize: "1.25rem", marginBottom: 12 }}>## what it does</h2>
    <ul style={{ listStyle: "none", padding: 0, marginBottom: 32 }}>
      {[
        "Universal search across Data Extensions, Automations, Journeys, Assets, Activities — results stream in progressively as each source responds",
        "Automation browser with color-coded status pills, expandable step-by-step views, syntax-highlighted SQL/SSJS",
        "Journey browser with version, HTS flag, channel, trigger type, entry source DE, humanized schedule",
        "Data Extension tools — search, create, import, export, full HTML reports",
        "Reports (Automations / Journeys / Assets / Activities / DEs) as standalone HTML pages with embedded CSV download, sortable columns, live filter",
        "Snippet library — save / tag / deploy AMPscript, SSJS, SQL directly into the open Ace editor",
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
      Building inside someone else's UI is a different discipline than building your own. CSP boundaries, host-page CSS leakage, MV3 service-worker lifecycle quirks, the fact that SFMC's "internal" APIs are barely documented and change shapes between StackKey instances — every one of those was a multi-day rabbit hole.
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
```

---

### Task 5.3: CloudPage Maestro case study

**Files:**
- Create: `src/components/v2/case-studies/CloudPageMaestro.tsx`

- [ ] **Step 1: Write CloudPageMaestro.tsx**

```tsx
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
      CloudPage Maestro adds batch operations to CloudPages — publish, unpublish, move, search, sort, export — all at the speed of SFMC's bulk V2 endpoint instead of the click-once-wait-three-seconds UI.
    </p>

    <h2 className="mono accent" style={{ fontSize: "1.25rem", marginBottom: 12 }}>## what it does</h2>
    <ul style={{ listStyle: "none", padding: 0, marginBottom: 32 }}>
      {[
        "Bulk publish / unpublish / move for landing pages and code resources",
        "Folder picker with the full SFMC category tree",
        "Search across name, content, description, folder; filter by asset type",
        "Export All to CSV — every asset enriched with status, URL, last-modified, folder breadcrumb",
        "Download All as ZIP — landing page HTML + code resources, folder tree preserved",
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
      The biggest perf win came from killing the "ghost tab" pattern I started with — opening a hidden SFMC tab to capture CSRF tokens. Cookie-only reads are dramatically faster on panel open, no 15-second wait, no flicker. I only need CSRF when actually writing.
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
```

---

### Task 5.4: Maestro Builder case study + iframe preview

**Files:**
- Create: `src/components/v2/case-studies/MaestroBuilder.tsx`
- Create: `public/v2/case-studies/maestro-builder/preview.html`

- [ ] **Step 1: Write a minimal preview.html**

Create `public/v2/case-studies/maestro-builder/preview.html` with a bulletproof, self-contained email-style HTML demo (no external resources, no JS):

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>Maestro Builder preview</title>
<style>
  body { margin: 0; background: #fbfaf7; font-family: -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif; color: #0f172a; }
  .wrap { max-width: 600px; margin: 0 auto; background: #ffffff; }
  .pre  { padding: 8px 24px; color: #6b7280; font-size: 12px; }
  .hero { background: #0f172a; color: #ffffff; padding: 48px 32px; }
  .h1   { font-size: 32px; line-height: 1.15; font-weight: 700; margin: 0 0 12px; }
  .h-sub{ font-size: 16px; line-height: 1.5; color: #cbd5e1; margin: 0 0 24px; }
  .btn  { display: inline-block; background: #1d4ed8; color: #ffffff; text-decoration: none; padding: 12px 22px; font-weight: 600; font-size: 15px; border-radius: 8px; }
  .body { padding: 32px; }
  .h2   { font-size: 22px; line-height: 1.25; margin: 0 0 12px; }
  .p    { font-size: 15px; line-height: 1.55; color: #1f2937; margin: 0 0 16px; }
  .stat { display: inline-block; padding: 12px 18px; border: 1px solid #e5e7eb; margin-right: 8px; margin-bottom: 8px; font-size: 13px; color: #1f2937; }
  .ft   { padding: 16px 32px 32px; color: #6b7280; font-size: 12px; line-height: 1.5; border-top: 1px solid #e5e7eb; }
  @media (prefers-color-scheme: dark) {
    body { background: #0a0a0a; }
    .wrap { background: #1e1e1e; }
    .pre, .ft, .h-sub { color: #9ca3af; }
    .p { color: #e8e8e8; }
    .stat { border-color: #2a2a2e; color: #e8e8e8; }
    .hero { background: #0f172a; }
  }
</style>
</head>
<body>
<div class="wrap">
  <div class="pre">View this email in your browser →</div>
  <div class="hero">
    <h1 class="h1">Marketing automation, built like software.</h1>
    <p class="h-sub">A bulletproof email rendered by Maestro Builder, embedded live in this case study.</p>
    <a href="https://github.com/MetalHacker01/MaestroBuilder" class="btn">Read the source</a>
  </div>
  <div class="body">
    <h2 class="h2">Why this iframe is the proof</h2>
    <p class="p">This block is real HTML output. Same MJML pipeline, same VML helpers for Outlook, same dark-mode-aware CSS that Maestro Builder ships when you click "Export". No screenshots — the actual artifact.</p>
    <div>
      <span class="stat">30 modules</span>
      <span class="stat">Outlook 2007+</span>
      <span class="stat">Dark-mode aware</span>
      <span class="stat">Mailjet ready</span>
    </div>
  </div>
  <div class="ft">Sent by Maestro Builder · maestrobuilder.io · This is a demo email rendered inline on aldorinorrushi.com/v2/projects/maestro-builder. Real production emails ship through your ESP of choice.</div>
</div>
</body>
</html>
```

- [ ] **Step 2: Write MaestroBuilder.tsx**

Create `src/components/v2/case-studies/MaestroBuilder.tsx`:

```tsx
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
        "30 production-ready modules — preheaders, logos, heroes with VML overlays, three-column features, product cards, app-store badges, footers",
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
      The Outlook hero overlay (<v:image>+<v:rect>) does not nest a <v:roundrect> child cleanly. Three days of debugging to find out that the overlay button has to be a flat-table button on Outlook, square corners and all. The README ships with that limitation documented honestly — pretending it's solved would burn the next person.
    </p>
    <p style={{ fontFamily: "var(--v2-font-sans)", fontSize: "1rem", lineHeight: 1.65, marginBottom: 16 }}>
      Mailjet's error codes (`mj-XXXX`) are unhelpful at runtime. Wrapping them with `humanizeMailjetError()` and surfacing actionable guidance ("verify this sender first", "your account is on validation hold") turned the send-test dialog from a black box into a useful tool.
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
```

- [ ] **Step 3: Verify each case study renders**

Run `npm run dev`. Open in order:
- `http://localhost:8080/v2/projects/sfmc-scout` — expect full case study page
- `http://localhost:8080/v2/projects/cloudpage-maestro` — full case study
- `http://localhost:8080/v2/projects/maestro-builder` — full case study **with iframe preview rendering a real email layout**
- `http://localhost:8080/v2/projects/sfmc-sto-activity` — should redirect to `/v2` (no case study href)

Verify "← back" link and "[ ↩ back to projects ]" at bottom both work.

Ctrl+C dev server.

---

## Phase 6: AI-readable layer

### Task 6.1: Build-time markdown generator

**Files:**
- Create: `scripts/generate-markdown.ts`

- [ ] **Step 1: Write generate-markdown.ts**

```ts
import fs from "node:fs";
import path from "node:path";
import { siteMeta } from "../src/v2/content/siteMeta";
import { about } from "../src/v2/content/about";
import { experience } from "../src/v2/content/experience";
import { projects } from "../src/v2/content/projects";
import { certifications } from "../src/v2/content/certifications";
import { ai } from "../src/v2/content/ai";
import { contact } from "../src/v2/content/contact";

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const buildMarkdown = (): string => {
  const lines: string[] = [];
  lines.push(`# ${siteMeta.name} — Solution Engineer`);
  lines.push("");
  lines.push(`> ${siteMeta.taglineHero}`);
  lines.push("");
  lines.push(`**${siteMeta.role}**`);
  lines.push(`${siteMeta.location} · Remote, global · ${siteMeta.email}`);
  lines.push("");
  lines.push(`- Email: ${siteMeta.email}`);
  lines.push(`- LinkedIn: ${siteMeta.linkedinUrl}`);
  lines.push(`- GitHub: ${siteMeta.githubUrl}`);
  lines.push(`- Trailhead: ${siteMeta.trailheadUrl}`);
  lines.push("");
  lines.push("---");
  lines.push("");

  lines.push("## About");
  lines.push("");
  about.paragraphs.forEach((p) => { lines.push(p); lines.push(""); });
  lines.push(`**Languages:** ${about.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}`);
  lines.push("");

  lines.push("## Experience");
  lines.push("");
  experience.forEach((r) => {
    lines.push(`### ${r.title} — ${r.company} (${r.period})`);
    lines.push(`*${r.location}*`);
    lines.push("");
    lines.push(r.summary);
    lines.push("");
    r.achievements.forEach((a) => lines.push(`- ${a}`));
    lines.push("");
    lines.push(`**Technologies:** ${r.technologies.join(" · ")}`);
    lines.push("");
  });

  lines.push("## Projects");
  lines.push("");
  lines.push("Open-source tools I've built — every one of them was born from a real client engagement where SFMC's UI or limits got in the way. All MIT-licensed. All used in production.");
  lines.push("");
  projects.forEach((p) => {
    const tags = [
      p.signature ? "★ signature" : null,
      p.status === "in-development" ? "in development" : "shipped",
      p.license,
    ].filter(Boolean).join(" · ");
    lines.push(`### ${p.name} — \`${p.slug}\``);
    lines.push(`*${tags}*`);
    lines.push("");
    lines.push(p.hook);
    lines.push("");
    if (p.stats.length) lines.push(`**Stack:** ${p.stats.join(" · ")}`);
    lines.push("");
    p.bullets.forEach((b) => lines.push(`- ${b}`));
    lines.push("");
    lines.push(`GitHub: ${p.githubUrl}`);
    if (p.caseStudyHref) lines.push(`Case study: ${p.caseStudyHref}`);
    lines.push("");
  });

  lines.push("## Certifications");
  lines.push("");
  certifications.filter((c) => c.provider === "Salesforce").forEach((c) => lines.push(`- ${c.name}`));
  const hs = certifications.filter((c) => c.provider === "HubSpot");
  if (hs.length) {
    lines.push("");
    lines.push("**HubSpot:**");
    hs.forEach((c) => lines.push(`- ${c.name}`));
  }
  lines.push("");
  lines.push(`Verify: ${siteMeta.trailheadUrl}`);
  lines.push("");

  lines.push("## AI");
  lines.push("");
  ai.paragraphs.forEach((p) => { lines.push(p); lines.push(""); });
  lines.push(`**Certifications:** ${ai.certs.join(" · ")}`);
  lines.push("");
  lines.push("**Currently exploring:**");
  ai.currentlyExploring.forEach((c) => lines.push(`- ${c}`));
  lines.push("");
  lines.push(`> ${ai.closingLine}`);
  lines.push("");

  lines.push("## Contact");
  lines.push("");
  contact.forEach((c) => {
    if (c.href === "#") lines.push(`- ${c.command}: ${c.value}`);
    else lines.push(`- ${c.command}: ${c.value} (${c.href})`);
  });
  lines.push("");

  lines.push("---");
  lines.push("");
  lines.push(`*Last generated: ${today()}*`);
  lines.push(`*Source: ${siteMeta.linkedinUrl}, ${siteMeta.githubUrl}*`);

  return lines.join("\n");
};

const stripMarkdown = (md: string): string => {
  const lines = md.split("\n").map((l) => {
    let out = l;
    out = out.replace(/^#{1,6}\s+/, "");
    out = out.replace(/^>\s+/, "");
    out = out.replace(/^[-*]\s+/, "  • ");
    out = out.replace(/\*\*(.+?)\*\*/g, "$1");
    out = out.replace(/\*(.+?)\*/g, "$1");
    out = out.replace(/`([^`]+)`/g, "$1");
    return out;
  });
  return lines.join("\n");
};

const writeBuildArtifacts = (outDir: string) => {
  const md = buildMarkdown();
  const txt = stripMarkdown(md);

  const indexMdPath = path.join(outDir, "v2", "index.md");
  const indexTxtPath = path.join(outDir, "v2", "index.txt");
  fs.mkdirSync(path.dirname(indexMdPath), { recursive: true });
  fs.writeFileSync(indexMdPath, md, "utf8");
  fs.writeFileSync(indexTxtPath, txt, "utf8");

  // Per-project case study files
  projects.filter((p) => p.caseStudyHref).forEach((p) => {
    const dir = path.join(outDir, "v2", "projects", p.slug);
    fs.mkdirSync(dir, { recursive: true });
    const projectMd = [
      `# ${p.name} — ${p.slug}`,
      "",
      `> ${p.hook}`,
      "",
      `**License:** ${p.license}`,
      `**Status:** ${p.status === "in-development" ? "in development" : "shipped"}`,
      "",
      `**Stack:** ${p.stats.join(" · ")}`,
      "",
      ...p.bullets.map((b) => `- ${b}`),
      "",
      `GitHub: ${p.githubUrl}`,
      "",
      `*Last generated: ${today()}*`,
    ].join("\n");
    fs.writeFileSync(path.join(dir, "index.md"), projectMd, "utf8");
    fs.writeFileSync(path.join(dir, "index.txt"), stripMarkdown(projectMd), "utf8");
  });
};

export { writeBuildArtifacts };

// Allow direct invocation: `npx tsx scripts/generate-markdown.ts`
const isDirect = (() => {
  try {
    return import.meta.url === `file://${path.resolve(process.argv[1] ?? "")}`;
  } catch {
    return false;
  }
})();
if (isDirect) {
  const outDir = process.argv[2] ?? "dist";
  writeBuildArtifacts(outDir);
  console.log(`Wrote v2/index.md, v2/index.txt, and per-project files to ${outDir}/`);
}
```

- [ ] **Step 2: Sanity check the generator standalone**

Run:
```bash
mkdir -p tmp-md-check
npx tsx scripts/generate-markdown.ts tmp-md-check
```

Expected files:
- `tmp-md-check/v2/index.md` — contains "I make marketing platforms do what they couldn't.", all section headings, all projects, all certs
- `tmp-md-check/v2/index.txt` — same content, no `#` or `*` markers
- `tmp-md-check/v2/projects/sfmc-scout/index.md`
- `tmp-md-check/v2/projects/cloudpage-maestro/index.md`
- `tmp-md-check/v2/projects/maestro-builder/index.md`

Clean up:
```bash
rm -rf tmp-md-check
```

---

### Task 6.2: Register markdown plugin in Vite config

**Files:**
- Modify: `vite.config.ts`

- [ ] **Step 1: Read existing vite.config.ts**

Read the current contents of `vite.config.ts` to capture the existing structure (use Read tool).

- [ ] **Step 2: Add markdown plugin**

Modify `vite.config.ts`. Add this import near the top with the other imports:

```ts
import { writeBuildArtifacts } from "./scripts/generate-markdown";
```

Add this plugin inline inside `plugins: [...]`:

```ts
{
  name: "v2-markdown-generator",
  apply: "build" as const,
  closeBundle() {
    const outDir = (this as { outDir?: string }).outDir ?? "dist";
    writeBuildArtifacts(outDir);
    console.log("[v2] Generated index.md / index.txt for /v2");
  },
},
```

Also add a dev-mode helper: serve the generated files when running `npm run dev`. Add this as another plugin entry:

```ts
{
  name: "v2-markdown-dev-server",
  apply: "serve" as const,
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const url = req.url ?? "";
      const mdMatch = url.match(/^\/v2(\/projects\/[^/]+)?\/index\.(md|txt)$/);
      if (!mdMatch) return next();
      try {
        const fs = await import("node:fs");
        const path = await import("node:path");
        const os = await import("node:os");
        const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "v2-md-"));
        writeBuildArtifacts(tmpRoot);
        const target = path.join(tmpRoot, url);
        if (!fs.existsSync(target)) {
          res.statusCode = 404;
          res.end("not found");
          return;
        }
        const body = fs.readFileSync(target, "utf8");
        res.setHeader("Content-Type", mdMatch[2] === "md" ? "text/markdown; charset=utf-8" : "text/plain; charset=utf-8");
        res.statusCode = 200;
        res.end(body);
      } catch (err) {
        res.statusCode = 500;
        res.end(String(err));
      }
    });
  },
},
```

- [ ] **Step 3: Verify dev-mode .md serving**

Run `npm run dev`. In another terminal:

```bash
curl -s http://localhost:8080/v2/index.md | head -20
```

Expected: first 20 lines of the markdown file starting with `# Aldorino Rrushi — Solution Engineer`.

```bash
curl -sI http://localhost:8080/v2/index.md | grep -i content-type
```

Expected: `Content-Type: text/markdown; charset=utf-8`.

```bash
curl -s http://localhost:8080/v2/projects/sfmc-scout/index.md | head -10
```

Expected: starts with `# SFMC Scout — sfmc-scout`.

Ctrl+C dev server.

- [ ] **Step 4: Verify build-time generation**

Run:
```bash
npm run build
```

Expected: build succeeds, terminal logs `[v2] Generated index.md / index.txt for /v2`, and the following files exist:
- `dist/v2/index.md`
- `dist/v2/index.txt`
- `dist/v2/projects/sfmc-scout/index.md`
- `dist/v2/projects/sfmc-scout/index.txt`
- `dist/v2/projects/cloudpage-maestro/index.md`
- `dist/v2/projects/cloudpage-maestro/index.txt`
- `dist/v2/projects/maestro-builder/index.md`
- `dist/v2/projects/maestro-builder/index.txt`

Verify with:
```bash
ls dist/v2 dist/v2/projects/sfmc-scout dist/v2/projects/cloudpage-maestro dist/v2/projects/maestro-builder
```

---

### Task 6.3: Build-time latest-commit fetch

**Files:**
- Create: `scripts/fetch-latest-commit.ts`
- Modify: `package.json` (add `prebuild` script)

- [ ] **Step 1: Write fetch-latest-commit.ts**

```ts
import fs from "node:fs";
import path from "node:path";

const REPO = "MetalHacker01/martech-maestro-folio";
const OUT_PATH = path.resolve("src/v2/data/latest-commit.json");

async function main() {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/commits?per_page=1`, {
      headers: { "User-Agent": "portfolio-build", Accept: "application/vnd.github+json" },
    });
    if (!res.ok) {
      console.warn(`[v2] GitHub API returned ${res.status}; keeping existing latest-commit.json`);
      return;
    }
    const data = (await res.json()) as Array<{ commit: { message: string; author: { date: string } }; sha: string }>;
    const c = data[0];
    if (!c) {
      console.warn("[v2] No commits returned; keeping existing latest-commit.json");
      return;
    }
    const message = c.commit.message.split("\n")[0] ?? "";
    const payload = { message, sha: c.sha, date: c.commit.author.date };
    fs.writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + "\n", "utf8");
    console.log(`[v2] Wrote latest-commit.json: ${message}`);
  } catch (err) {
    console.warn(`[v2] Could not fetch latest commit (${String(err)}); keeping existing latest-commit.json`);
  }
}

main();
```

- [ ] **Step 2: Add prebuild script to package.json**

Open `package.json`. In `scripts`, add:
```json
"prebuild": "tsx scripts/fetch-latest-commit.ts"
```

So the scripts block reads (existing lines preserved):
```json
"scripts": {
  "dev": "vite",
  "prebuild": "tsx scripts/fetch-latest-commit.ts",
  "build": "vite build",
  "build:dev": "vite build --mode development",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

Also ensure `tsx` is a devDependency:
```bash
npm install -D tsx
```

- [ ] **Step 3: Verify build fetches commit**

Run:
```bash
npm run build
```

Expected: terminal logs `[v2] Wrote latest-commit.json: <some real commit message>`. Open `src/v2/data/latest-commit.json` and confirm it's updated with a real SHA and date.

If the GitHub API is rate-limited or unreachable, the script warns and the build proceeds with the existing JSON — verify this fail-soft path by running build again with no network change.

---

### Task 6.4: Vercel config + llms.txt + robots.txt

**Files:**
- Create: `vercel.json`
- Create: `public/llms.txt`
- Modify: `public/robots.txt` (if exists; otherwise create)

- [ ] **Step 1: Check existing robots.txt and create vercel.json**

```bash
ls public/robots.txt 2>/dev/null && cat public/robots.txt
```

If it doesn't exist, that's fine — we'll create one.

Create `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/v2/index.md",
      "headers": [{ "key": "Content-Type", "value": "text/markdown; charset=utf-8" }]
    },
    {
      "source": "/v2/index.txt",
      "headers": [{ "key": "Content-Type", "value": "text/plain; charset=utf-8" }]
    },
    {
      "source": "/v2/projects/(.*)/index.md",
      "headers": [{ "key": "Content-Type", "value": "text/markdown; charset=utf-8" }]
    },
    {
      "source": "/v2/projects/(.*)/index.txt",
      "headers": [{ "key": "Content-Type", "value": "text/plain; charset=utf-8" }]
    },
    {
      "source": "/llms.txt",
      "headers": [{ "key": "Content-Type", "value": "text/plain; charset=utf-8" }]
    }
  ]
}
```

- [ ] **Step 2: Create llms.txt**

Create `public/llms.txt`:
```
# llms.txt — AI agent guidance for Aldorino Rrushi's portfolio
User-agent: *
Allow: /v2/index.md
Allow: /v2/index.txt
Allow: /v2/projects/sfmc-scout/index.md
Allow: /v2/projects/sfmc-scout/index.txt
Allow: /v2/projects/cloudpage-maestro/index.md
Allow: /v2/projects/cloudpage-maestro/index.txt
Allow: /v2/projects/maestro-builder/index.md
Allow: /v2/projects/maestro-builder/index.txt

# Preferred entry point for full content
Canonical: /v2/index.md
```

- [ ] **Step 3: Update or create robots.txt**

If `public/robots.txt` exists, append; otherwise create with:

```
User-agent: *
Allow: /
Sitemap: /llms.txt
```

- [ ] **Step 4: Verify in dev**

Run `npm run dev`.
```bash
curl -s http://localhost:8080/llms.txt
```
Expected: contents of llms.txt.

Ctrl+C dev server.

---

## Phase 7: Polish & verification

### Task 7.1: Responsive sanity pass

**Files:** No new files. Visual verification only.

- [ ] **Step 1: Run dev server, open browser**

```bash
npm run dev
```

Open `http://localhost:8080/v2`.

- [ ] **Step 2: Verify breakpoints**

Use DevTools responsive mode. Verify each width:

- **≥ 1280px** — explorer (left, 240px) + content + minimap (right, 88px). Status bar shows latest commit line.
- **1024px** — explorer + content. Minimap hidden. Status bar still shows latest commit.
- **768px** — explorer collapsed; "☰ files" button visible top-right. Content full-width minus padding. Status bar truncates `last commit` line.
- **375px (mobile)** — same as 768px, status bar shows only `● 7× certs · <date> · vercel`.

Click "☰ files" on narrow viewport — drawer slides over content showing the full file tree.

- [ ] **Step 3: Verify reduced-motion**

In DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce". Hard refresh:
- Boot sequence should not appear (skipped).
- Section transitions should be instant.

- [ ] **Step 4: Verify reading width on wide screens**

At 1920px viewport — content column should be max 720px, centered, not stretched edge-to-edge.

Ctrl+C dev server.

---

### Task 7.2: Lighthouse build pass

**Files:** No code changes. Verification only.

- [ ] **Step 1: Build and preview**

```bash
npm run build
npm run preview
```

This serves the build output on `http://localhost:4173` (Vite preview default).

- [ ] **Step 2: Run Lighthouse**

In Chrome DevTools → Lighthouse tab, run audit for `/v2`. Target scores:
- Performance: ≥ 95
- Accessibility: 100
- Best Practices: ≥ 95
- SEO: ≥ 95

Capture the four scores in a note for your own record. If any score drops below target, document the warning — do NOT modify content / structure to chase Lighthouse score (the spec is the source of truth).

- [ ] **Step 3: Run Lighthouse for a case study**

Repeat at `http://localhost:4173/v2/projects/maestro-builder` (the case study with the iframe — most likely to dip on performance).

Ctrl+C the preview server.

---

### Task 7.3: Final manual smoke test

**Files:** No changes. Visual + interaction sweep.

- [ ] **Step 1: Run dev server**

```bash
npm run dev
```

- [ ] **Step 2: Clear cookies and verify boot**

DevTools → Application → Cookies → clear all for `localhost`. Refresh `http://localhost:8080/v2`.
- Boot sequence runs.
- Cookie `seen_v2=1` is set after.
- Refresh again — boot does not run.

- [ ] **Step 3: Click every file in explorer**

- `about.md` → scrolls to and highlights About
- `experience.json` → scrolls to and highlights Experience
- `projects/` → toggles open/closed AND scrolls to Projects
- Each project sub-item → navigates to that case study page
- `certs.txt` → scrolls to Certifications
- `ai.md` → scrolls to AI
- `contact.sh` → scrolls to Contact

- [ ] **Step 4: Click every Experience row**

All four roles expand on click and collapse on click again. Default open: first role.

- [ ] **Step 5: Click every Certification badge**

All 7 Salesforce badges open a modal with the cert image. Modal closes on Escape or backdrop click.

- [ ] **Step 6: Click every project's "[ read case study → ]"**

- sfmc-scout → loads case study, "← back" returns to /v2
- cloudpage-maestro → same
- maestro-builder → same, **iframe renders the email preview**
- sto-activity → has no case study link, only `[ github ↗ ]`

- [ ] **Step 7: Verify links**

- Hero CTAs: mailto, CV download, GitHub, LinkedIn — all open correctly
- Contact section commands: all four links work
- Trailhead link on certs: opens `https://www.salesforce.com/trailblazer/arrushi`
- GitHub links on each project card open the correct repo
- v1 at `/` still works completely unchanged

- [ ] **Step 8: Verify .md is served in dev**

```bash
curl -s http://localhost:8080/v2/index.md | head -40
```
Visually confirm all 6 sections are present, projects are in the correct order.

Ctrl+C dev server.

---

### Task 7.4: Final build sanity

**Files:** No code changes. Final command sweep.

- [ ] **Step 1: Lint**

```bash
npm run lint
```

Expected: passes with no new errors. Pre-existing warnings unchanged.

- [ ] **Step 2: Full production build**

```bash
npm run build
```

Expected:
- Build succeeds.
- Console logs `[v2] Wrote latest-commit.json: ...` from prebuild.
- Console logs `[v2] Generated index.md / index.txt for /v2` from the closeBundle hook.
- `dist/v2/index.md` and `dist/v2/index.txt` exist.
- `dist/v2/projects/<slug>/index.md` + `.txt` exist for each of the three flagships.
- `dist/llms.txt` exists.
- Final bundle JS size ≤ ~120 KB gzipped.

- [ ] **Step 3: Preview build**

```bash
npm run preview
```

Open `http://localhost:4173/v2` — visually verify the v2 site looks identical to dev (no missing fonts, no missing styles).
Open `http://localhost:4173/v2/index.md` — markdown content displays as plain text in the browser.

Ctrl+C preview.

- [ ] **Step 4: Hand off to user for local review**

Tell the user: the plan is fully executed, no commits or pushes have been made, and they can review at `http://localhost:8080/v2` after running `npm run dev`. Per their instruction, all work is local-only — the working tree is dirty but no `git commit` has been run.

---

## Spec coverage check

| Spec section | Covered by tasks |
|---|---|
| 1. Why v2 | Implicit through full implementation |
| 2. Positioning (hero line, sub, voice) | Task 4.1 Hero, Task 1.3 about content |
| 3. IA + sitemap + project ordering | Phase 2 (routing), Phase 4 (projects), Phase 5 (case studies) |
| 4. Visual design system (palette, type, motion) | Task 0.3 (v2.css), Task 0.4 (fonts), Phase 2 primitives |
| 5. IDE shell + responsive + boot | Phase 3 (full layout) |
| 6. Section-by-section content | Phase 4 (all six sections) |
| 6. Case study template + Maestro iframe | Phase 5 (all three case studies) |
| 7. AI-readable layer (.md, .txt, llms.txt) | Phase 6 (full) |
| 8. Tech stack + file structure | Task 0.1, Task 0.2 |
| 9. Out of scope | Enforced by what's NOT in the plan |
| 10. Acceptance criteria | Task 7.3 smoke test maps directly |
| 11. Decisions log | Captured in spec for future reference |

No gaps. No placeholders. No unresolved types — every component referenced is defined in an earlier task within the same phase.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-20-portfolio-v2.md`.

**Per user instruction:** no git commits or pushes will occur during execution. All file changes stay in the working tree until the user reviews locally and explicitly asks to commit.

**Two execution options:**

**1. Subagent-Driven (recommended for a plan this size)** — fresh subagent per task, review between tasks, isolates failures, keeps main context clean

**2. Inline Execution** — execute tasks in this session using `executing-plans`, batch with checkpoints at phase boundaries (faster, but uses main context for every line of code)

Which approach do you want?
