import React, { lazy, Suspense } from 'react';
import { ResearchArticle } from './ResearchLibrary.jsx';
import { researchPageLoaders } from './research-page-loaders.generated.mjs';

const pages = Object.fromEntries(Object.entries(researchPageLoaders).map(([id, load]) => [
  id, lazy(() => load().then(module => ({ default: () => <ResearchArticle item={module.default} /> }))),
]));
const prerendered = new Map();
// Resolve data before static rendering or enhanced navigation, so complete
// article content is present before restoring scroll or following an anchor.
export async function prepareResearchArticle(id) {
  if (researchPageLoaders[id]) prerendered.set(id, (await researchPageLoaders[id]()).default);
}

export default function ResearchArticleRoute({ item }) {
  const Page = pages[item.id];
  return <Suspense fallback={<section className="content-width rg-article"><h1>{item.title}</h1><p role="status">Opening the guide…</p></section>}>{prerendered.has(item.id) ? <ResearchArticle item={prerendered.get(item.id)} /> : <Page />}</Suspense>;
}
