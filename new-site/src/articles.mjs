import { researchGuides } from "./research-guide-index.generated.mjs";
import { legacyArticleRevisions } from "./legacy-article-revisions.generated.mjs";

export const articleCategories = [
  "Imaging & radiology",
  "Surgery & anesthesia",
  "Critical & patient care",
  "Laboratory & diagnostics",
  "Hospital essentials",
  "Procurement",
  "Service & support",
  "Mission planning",
  "Procurement & service",
];
export const articles = [...researchGuides, ...legacyArticleRevisions];

export const articleUrl = (article) => `/resources/${article.id}.html`;
export function filterArticles({ category = "all", query = "" } = {}) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return articles.filter(
    (item) =>
      (category === "all" || category === item.category) &&
      terms.every((term) =>
        [item.title, item.summary, item.category,
          ...(item.entries ?? []).flatMap((entry) => [
            entry.title, entry.summary, ...entry.options.flat(),
            ...entry.checks, entry.cost,
          ]),
        ].join(" ")
          .toLowerCase()
          .includes(term),
      ),
  );
}
