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
