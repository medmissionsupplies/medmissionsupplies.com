import React from "react";
import { renderToString } from "react-dom/server";
import { readFile, writeFile, mkdir, cp } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { App } from "../src/App.jsx";
import { routes, metadata } from "../src/routes.mjs";
import { pageSeo } from "../src/seo.mjs";
import { validateApprovedComments } from "../src/comments.mjs";

validateApprovedComments(
  JSON.parse(
    await readFile(
      new URL("../src/approved-comments.json", import.meta.url),
      "utf8",
    ),
  ),
);
const template = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
const escape = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
function render(page, meta, path) {
  const seo = pageSeo(page);
  const canonical = path ? `https://medmissionsupplies.com${path}` : null;
  return template
    .replace('<html lang="en">', `<html lang="en" data-page="${page}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?\s*>/,
      `<meta name="description" content="${escape(meta.description)}" />`,
    )
    .replace(
      "</head>",
      `${canonical ? `<link rel="canonical" href="${canonical}" /><meta property="og:title" content="${escape(meta.title)}" /><meta property="og:description" content="${escape(meta.description)}" /><meta property="og:url" content="${canonical}" /><meta property="og:image" content="${escape(seo.image)}" /><meta property="og:type" content="${page.startsWith("article-") ? "article" : "website"}" />` : '<meta name="robots" content="noindex" />'}${seo ? `<meta property="og:site_name" content="Med Mission Supplies" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${escape(meta.title)}" /><meta name="twitter:description" content="${escape(meta.description)}" /><meta name="twitter:image" content="${escape(seo.image)}" /><script id="page-structured-data" type="application/ld+json">${JSON.stringify(seo.schema).replace(/</g, "\\u003c")}</script>` : ""}</head>`,
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${renderToString(<App page={page} />)}</div>`,
    );
}
for (const route of routes) {
  const html = render(route.key, metadata[route.key], route.path);
  const file = new URL(`../dist${route.path}`, import.meta.url);
  await mkdir(dirname(fileURLToPath(file)), { recursive: true });
  await writeFile(file, html);
  if (route.key !== "index") {
    const directory = new URL(
      `../dist${route.path.replace(/\.html$/, "/")}`,
      import.meta.url,
    );
    await mkdir(directory, { recursive: true });
    await writeFile(new URL("index.html", directory), html);
  }
}
await writeFile(
  new URL("../dist/404.html", import.meta.url),
  render("not-found", {
    title: "Page not found | Med Mission Supplies",
    description:
      "Find equipment, resources, and support at Med Mission Supplies.",
  }),
);
await writeFile(
  new URL("../dist/sitemap.xml", import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>https://medmissionsupplies.com${route.path}</loc></url>`).join("")}</urlset>`,
);
await cp(
  new URL("../licenses/", import.meta.url),
  new URL("../dist/licenses/", import.meta.url),
  { recursive: true },
);
console.log(
  `Pre-rendered ${routes.length} pages, ${routes.length - 1} aliases, 404, sitemap, and licenses.`,
);

await writeFile(new URL("../dist/robots.txt", import.meta.url), "User-agent: *\nAllow: /\n\nSitemap: https://medmissionsupplies.com/sitemap.xml\n");
