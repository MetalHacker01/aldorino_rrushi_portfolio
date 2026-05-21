import type { SiteMeta } from "./types";

export const SITE_ORIGIN = "https://aldorino.is-a.dev";

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

export const url = (path: string = "/"): string =>
  `${SITE_ORIGIN}${path.startsWith("/") ? path : "/" + path}`;
