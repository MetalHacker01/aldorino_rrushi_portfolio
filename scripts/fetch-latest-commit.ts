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
