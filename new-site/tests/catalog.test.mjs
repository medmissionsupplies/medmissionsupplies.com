import test from "node:test";
import assert from "node:assert/strict";
import {
  categories,
  equipment,
  catalogState,
  filterEquipment,
} from "../src/catalog.mjs";
import {
  articleCategories,
  articles,
  filterArticles,
} from "../src/articles.mjs";
import { resolvePage, routes } from "../src/routes.mjs";
import { buyingGuides, guideForEquipment } from "../src/buying-guides.mjs";
import { guideSources } from "../src/guide-sources.mjs";

test("every equipment and article page resolves directly and via directory aliases", () => {
  assert.equal(new Set(routes.map((route) => route.key)).size, routes.length);
  for (const route of routes) {
    assert.equal(resolvePage(route.path), route.key);
    assert.equal(
      resolvePage(route.path.replace(".html", "/index.html")),
      route.key,
    );
  }
  for (const path of [
    "/equipment/missing.html",
    "/resources/no-guide.html",
    "/made-up",
    "/equipment/ultrasound.html/extra",
  ])
    assert.equal(resolvePage(path), null);
});
test("equipment categories cover all listings and search combines category and all terms", () => {
  assert.equal(
    categories.flatMap((category) => filterEquipment({ category: category.id }))
      .length,
    equipment.length,
  );
  assert.deepEqual(
    filterEquipment({
      category: "imaging",
      query: "  PORTABLE ultrasound ",
    }).map((item) => item.id),
    ["ultrasound"],
  );
  assert.equal(
    filterEquipment({ category: "surgical", query: "ultrasound" }).length,
    0,
  );
  assert.deepEqual(catalogState("?category=wrong&q=ECG"), {
    category: "imaging",
    query: "",
  });
  assert.deepEqual(catalogState("?category=critical-care&q=missing"), { category: "critical-care", query: "" });
  assert.equal(catalogState("?category=all").category, "all");
  assert.equal(filterEquipment({ query: "ECG" })[0].id, "ekg");
});
test("article categories, search, sections, and related equipment remain connected", () => {
  assert.equal(
    articleCategories.flatMap((category) => filterArticles({ category }))
      .length,
    articles.length,
  );
  assert.equal(
    filterArticles({ category: "Service & support", query: "request" }).length,
    1,
  );
  assert.equal(
    filterArticles({ category: "Mission planning", query: "MRI scanner" }).length,
    0,
  );
  assert.ok(filterArticles({ query: "tonometer" }).some(article => article.id === "mission-clinic-equipment-guide"));
  for (const article of articles) {
    assert.ok(article.kind === "buying-guide" ? article.entries.length >= 4 : article.sections.length >= 4);
    for (const id of article.related)
      assert.ok(equipment.some((item) => item.id === id));
  }
});

test("every equipment listing has a connected, sourced buying guide", () => {
  for (const listing of equipment) {
    const match = guideForEquipment(listing.id);
    assert.ok(match, `Missing buying advice for ${listing.id}`);
    assert.ok(articles.includes(match.guide));
    assert.equal(match.entry.listing, listing.id);
  }
  for (const guide of buyingGuides) {
    assert.equal(new Set(guide.entries.map(entry => entry.id)).size, guide.entries.length);
    for (const entry of guide.entries) {
      assert.ok(entry.image);
      assert.ok(entry.sources.length);
      assert.ok(equipment.some(listing => listing.id === entry.listing));
      for (const id of entry.sources) {
        assert.ok(guideSources[id], `Missing source ${id}`);
        assert.equal(new URL(guideSources[id][1]).protocol, "https:");
      }
    }
  }
});
