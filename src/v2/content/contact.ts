import type { ContactItem } from "./types";
import { siteMeta } from "./siteMeta";

export const contact: ContactItem[] = [
  { command: "mailto",   value: siteMeta.email,         href: `mailto:${siteMeta.email}` },
  { command: "linkedin", value: "/in/aldorino-rrushi",  href: siteMeta.linkedinUrl },
  { command: "github",   value: "/MetalHacker01",       href: siteMeta.githubUrl },
  { command: "location", value: "tirana, albania (remote, global)", href: "#" },
];
