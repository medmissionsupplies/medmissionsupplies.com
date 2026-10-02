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
    category: "all",
    query: "ECG",
  });
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
    filterArticles({ category: "Mission planning", query: "purchase" }).length,
    0,
  );
  for (const article of articles) {
    assert.ok(article.sections.length >= 4);
    for (const id of article.related)
      assert.ok(equipment.some((item) => item.id === id));
  }
});
