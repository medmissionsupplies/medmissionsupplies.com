import { legacyArticleRevisions } from "./legacy-article-revisions.generated.mjs";

// One reviewed copy serves category pages, article routes and equipment links.
export const buyingGuides = legacyArticleRevisions.filter(article => article.kind === "buying-guide");

export function guideForEquipment(id) {
  for (const guide of buyingGuides) {
    const entry = guide.entries.find((entry) => entry.listing === id);
    if (entry) return { guide, entry };
  }
  return null;
}

export function guideLinksForEquipment(equipmentId) {
  return buyingGuides.flatMap((guide) =>
    guide.entries
      .filter((entry) => entry.listing === equipmentId)
      .map((entry) => ({ guide, entry })),
  );
}
