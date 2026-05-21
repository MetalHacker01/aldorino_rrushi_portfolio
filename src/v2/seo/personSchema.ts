import { SITE_ORIGIN, siteMeta } from "@/v2/content/siteMeta";
import { certifications } from "@/v2/content/certifications";
import { projects } from "@/v2/content/projects";

export const personSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteMeta.name,
  givenName: "Aldorino",
  familyName: "Rrushi",
  url: SITE_ORIGIN,
  image: `${SITE_ORIGIN}/images/profilePic.png`,
  jobTitle: "Solution Engineer",
  description:
    "Salesforce Marketing Cloud solution engineer at MarketOne International. 7+ years across enterprise marketing automation programs (SFMC, Eloqua, Marketo, Responsys, Unica). Ships open-source software when platforms hit their limits.",
  worksFor: {
    "@type": "Organization",
    name: "MarketOne International",
    url: "https://www.marketone.com",
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Polytechnic University of Tirana",
      url: "https://upt.al",
    },
    {
      "@type": "EducationalOrganization",
      name: "University of Vlora \"Ismail Qemali\"",
      url: "https://univlora.edu.al",
    },
  ],
  knowsAbout: [
    "Salesforce Marketing Cloud",
    "Marketing Automation",
    "Oracle Eloqua",
    "Adobe Marketo",
    "Oracle Responsys",
    "HCL Unica",
    "AMPscript",
    "SSJS",
    "SQL",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "Salesforce Agentforce",
    "Email Marketing",
    "Customer Journey Orchestration",
    "Local Large Language Models",
    "LLM Fine-Tuning",
    "Linux",
    "Browser Extension Development",
  ],
  hasCredential: certifications.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: c.name,
    recognizedBy: {
      "@type": "Organization",
      name: c.provider,
    },
  })),
  sameAs: [
    siteMeta.linkedinUrl,
    siteMeta.githubUrl,
    siteMeta.trailheadUrl,
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tirana",
    addressCountry: "AL",
  },
  nationality: {
    "@type": "Country",
    name: "Albania",
  },
  knowsLanguage: ["Albanian", "English", "Italian", "French"],
  email: `mailto:${siteMeta.email}`,
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${siteMeta.name} — Portfolio`,
  url: SITE_ORIGIN,
  inLanguage: "en",
  author: { "@id": `${SITE_ORIGIN}/#person` },
});

export const projectSoftwareSchema = (slug: string) => {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return null;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: p.name,
    description: p.hook,
    codeRepository: p.githubUrl,
    programmingLanguage: p.stats.join(", "),
    license: `https://spdx.org/licenses/MIT.html`,
    author: {
      "@type": "Person",
      name: siteMeta.name,
      url: SITE_ORIGIN,
    },
    url: p.caseStudyHref ? `${SITE_ORIGIN}${p.caseStudyHref}` : p.githubUrl,
  };
};
