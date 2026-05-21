import { Helmet } from "react-helmet-async";
import { SITE_ORIGIN, siteMeta } from "@/v2/content/siteMeta";

type Props = {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article" | "profile";
  jsonLd?: object[];
};

const RouteSeo = ({ title, description, path, ogType = "website", jsonLd }: Props) => {
  const canonical = `${SITE_ORIGIN}${path}`;
  const ogImage = `${SITE_ORIGIN}/og-image.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content={`${siteMeta.name} — Portfolio`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Author + theme hints */}
      <meta name="author" content={siteMeta.name} />
      <meta name="theme-color" content="#0E0E10" />
      <meta name="color-scheme" content="dark" />

      {jsonLd?.map((schema, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  );
};

export default RouteSeo;
