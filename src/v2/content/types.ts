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
