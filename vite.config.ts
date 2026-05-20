import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "node:fs";
import os from "node:os";
import { writeBuildArtifacts } from "./scripts/generate-markdown";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    {
      name: "v2-markdown-generator",
      apply: "build" as const,
      closeBundle() {
        const outDir = "dist";
        writeBuildArtifacts(outDir);
        console.log("[v2] Generated index.md / index.txt for /v2");
      },
    },
    {
      name: "v2-markdown-dev-server",
      apply: "serve" as const,
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url ?? "";
          const mdMatch = url.match(/^\/v2(\/projects\/[^/]+)?\/index\.(md|txt)$/);
          if (!mdMatch) return next();
          try {
            const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "v2-md-"));
            writeBuildArtifacts(tmpRoot);
            const target = path.join(tmpRoot, url);
            if (!fs.existsSync(target)) {
              res.statusCode = 404;
              res.end("not found");
              return;
            }
            const body = fs.readFileSync(target, "utf8");
            res.setHeader(
              "Content-Type",
              mdMatch[2] === "md" ? "text/markdown; charset=utf-8" : "text/plain; charset=utf-8"
            );
            res.statusCode = 200;
            res.end(body);
          } catch (err) {
            res.statusCode = 500;
            res.end(String(err));
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
