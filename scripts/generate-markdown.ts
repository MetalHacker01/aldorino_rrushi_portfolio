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

export const writeBuildArtifacts = (outDir: string) => {
  const md = buildMarkdown();
  const txt = stripMarkdown(md);

  const indexMdPath = path.join(outDir, "v2", "index.md");
  const indexTxtPath = path.join(outDir, "v2", "index.txt");
  fs.mkdirSync(path.dirname(indexMdPath), { recursive: true });
  fs.writeFileSync(indexMdPath, md, "utf8");
  fs.writeFileSync(indexTxtPath, txt, "utf8");

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
