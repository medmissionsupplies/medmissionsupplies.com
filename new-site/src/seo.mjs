import { routes, metadata } from './routes.mjs';
import { equipment, photoUrl } from './catalog.mjs';
import { articles } from './articles.mjs';

export const siteUrl = 'https://medmissionsupplies.com';
export function pageSeo(page) {
  const route = routes.find(item => item.key === page);
  if (!route) return null;
  const item = route.equipmentId ? equipment.find(item => item.id === route.equipmentId) : route.articleId ? articles.find(item => item.id === route.articleId) : null;
  const url = siteUrl + route.path;
  const image = new URL(photoUrl(item?.image ?? 'operating-room'), siteUrl).href;
  const graph = [
    { '@type': 'Organization', '@id': siteUrl + '/#organization', name: 'Med Mission Supplies', url: siteUrl },
    { '@type': 'WebSite', '@id': siteUrl + '/#website', name: 'Med Mission Supplies', url: siteUrl, publisher: { '@id': siteUrl + '/#organization' } },
    { '@type': route.articleId ? 'Article' : route.key === 'offerings' || route.equipmentId ? 'CollectionPage' : 'WebPage', '@id': url + '#page', url, name: route.title, ...(route.articleId ? { headline: route.title } : {}), description: route.description, image, isPartOf: { '@id': siteUrl + '/#website' }, publisher: { '@id': siteUrl + '/#organization' } },
  ];
  return { ...metadata[page], url, image, type: route.articleId ? 'article' : 'website', schema: { '@context': 'https://schema.org', '@graph': graph } };
}

export function syncPageSeo(doc, page) {
  const info = pageSeo(page);
  if (!info) return;
  doc.querySelector('link[rel="canonical"]')?.setAttribute('href', info.url);
  for (const [name, value] of Object.entries({ 'og:title': info.title, 'og:description': info.description, 'og:url': info.url, 'og:image': info.image, 'og:type': info.type })) {
    doc.querySelector(`meta[property="${name}"]`)?.setAttribute('content', value);
  }
  for (const [name, value] of Object.entries({ 'twitter:title': info.title, 'twitter:description': info.description, 'twitter:image': info.image })) {
    doc.querySelector(`meta[name="${name}"]`)?.setAttribute('content', value);
  }
  const structured = doc.querySelector('#page-structured-data');
  if (structured) structured.textContent = JSON.stringify(info.schema).replace(/</g, '\\u003c');
}
