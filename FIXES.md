# FIXES — chronological log

Discipline log per `~/.claude/CLAUDE.md`. Lead with the problem so future-me can grep for it. Read the "Never regress to" line before touching the same area.

---

## 2026-05-20 — Explorer file-tree click did nothing

**Problem:** Clicking any file in the left explorer (about.md, experience.json, etc.) didn't scroll to the section. Looked dead.
**Root cause:** Explorer entries used native `<a href="#section">` anchors, but the section elements live inside `<main style={{overflowY:"auto"}}>` in `IDEShell.tsx`. The browser scrolls the document for anchor links, not nested scroll containers — so the click did nothing visible because `main` never received a scroll command.
**Fix:** [src/components/v2/layout/Explorer.tsx](src/components/v2/layout/Explorer.tsx) — added `handleClick` that calls `e.preventDefault()` then `document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" })`. `scrollIntoView` finds the nearest scrollable ancestor (main) and scrolls it. URL hash is updated via `history.replaceState` for shareable links. Same pattern reused in [src/components/v2/layout/MobileBottomNav.tsx](src/components/v2/layout/MobileBottomNav.tsx).
**Verified by:** Clicked each entry in dev — section scrolled into view smoothly, status bar `§NN <section>` indicator updated correctly.
**Never regress to:** Using native `<a href="#id">` for in-page nav when the page has a nested scroll container. Either kill the nested scroll, or use programmatic `scrollIntoView`. Don't mix.

---

## 2026-05-20 — `hide-sm` / `hide-md` responsive classes ignored

**Problem:** On mobile widths the desktop Explorer was still visible, despite having `className="hide-sm"`. Mobile design completely broken.
**Root cause:** The wrapper `<div className="hide-sm" style={{display:"flex"}}>` set inline `display: flex`. Inline styles have higher specificity than any media-query CSS rule, so `.hide-sm { display: none; }` could never win at narrow widths.
**Fix:** Two changes:
1. [src/v2/styles/v2.css](src/v2/styles/v2.css) — added `!important` to all `.hide-sm` / `.hide-md` / `.show-sm-only` rules to defend against future inline-style accidents.
2. [src/components/v2/layout/IDEShell.tsx](src/components/v2/layout/IDEShell.tsx) — removed the unnecessary inline `display: flex` from the Explorer wrapper. The flex layout of the parent doesn't depend on this child's display value.
**Verified by:** Resized DevTools to 375px width — Explorer correctly hidden, MobileBottomNav correctly visible, identity strip stays.
**Never regress to:** Adding inline `display: ...` on any element that also needs to be hidden via a media-query class. Either use a class for layout AND visibility, or accept the `!important` shield is doing real work.

---
