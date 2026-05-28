import { useParams, Link, Navigate } from "react-router-dom";
import IDEShell from "@/components/v2/layout/IDEShell";
import { projects } from "@/v2/content/projects";
import SfmcScout from "@/components/v2/case-studies/SfmcScout";
import CloudPageMaestro from "@/components/v2/case-studies/CloudPageMaestro";
import MaestroBuilder from "@/components/v2/case-studies/MaestroBuilder";
import RouteSeo from "@/v2/seo/RouteSeo";
import { projectSoftwareSchema } from "@/v2/seo/personSchema";
import { siteMeta } from "@/v2/content/siteMeta";

const ProjectCaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  if (!project || !project.caseStudyHref) return <Navigate to="/" replace />;

  const body = (() => {
    switch (slug) {
      case "sfmc-scout": return <SfmcScout />;
      case "cloudpage-maestro": return <CloudPageMaestro />;
      case "maestro-builder": return <MaestroBuilder />;
      default: return null;
    }
  })();

  const schema = projectSoftwareSchema(slug ?? "");

  return (
    <>
      <RouteSeo
        title={`${project.name} case study · ${siteMeta.name}`}
        description={project.hook}
        path={`/projects/${project.slug}`}
        ogType="article"
        jsonLd={schema ? [schema] : undefined}
      />
      <IDEShell showSidebars={false}>
        <div className="mono muted" style={{ fontSize: "0.8125rem", marginBottom: 8 }}>
          <Link to="/" style={{ color: "var(--v2-text-muted)", textDecoration: "none" }}>
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
            to="/#projects"
            className="mono"
            style={{ color: "var(--v2-accent)", textDecoration: "none", fontSize: "0.875rem" }}
          >
            [ ↩ back to projects ]
          </Link>
        </div>
      </IDEShell>
    </>
  );
};

export default ProjectCaseStudy;
