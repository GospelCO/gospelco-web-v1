import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { render, ROUTES } from "../dist-ssr/entry-server.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const escape = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

let ok = 0;
for (const route of ROUTES) {
  let html;
  try {
    html = render(route.path);
  } catch (error) {
    console.error("render failed for", route.path, error);
    process.exitCode = 1;
    continue;
  }

  let page = template
    .replace('<div id="root"></div>', '<div id="root">' + html + "</div>")
    .replace(/<title>[\s\S]*?<\/title>/, "<title>" + escape(route.title) + "</title>")
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      '<meta name="description" content="' + escape(route.description) + '" />'
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      '<meta property="og:title" content="' + escape(route.title) + '" />'
    );

  const outDir = route.path === "/" ? dist : path.join(dist, route.path.replace(/^\//, ""));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), page);
  ok += 1;
  console.log("prerendered", route.path, "->", path.relative(dist, path.join(outDir, "index.html")));
}

console.log("prerendered " + ok + " of " + ROUTES.length + " routes");
