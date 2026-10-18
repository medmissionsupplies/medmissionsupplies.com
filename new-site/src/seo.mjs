import { routes, metadata } from './routes.mjs';
import { equipment } from './catalog.mjs';
import { articles } from './articles.mjs';
import { socialContentFor, socialImagePath, socialImageSize } from './social-metadata.mjs';

export const siteUrl = 'https://medmissionsupplies.com';
export function pageSeo(page) {
  const route = routes.find(item => item.key === page);
  if (!route) return null;
  const item = route.equipmentId ? equipment.find(item => item.id === route.equipmentId) : route.articleId ? articles.find(item => item.id === route.articleId) : null;
  const url = siteUrl + route.path;
  const social = socialContentFor(route, item);
  const image = new URL(socialImagePath(route.key), siteUrl).href;
  // Editorial review is a modification, never a made-up publication date.
  const reviewed = item?.updated ?? item?.reviewedAt;
  const modified = route.articleId && /^\d{4}-\d{2}-\d{2}$/.test(reviewed ?? '') ? reviewed : null;
  const breadcrumbs = [{ name: 'Home', item: siteUrl + '/index.html' }];
  if (route.articleId) breadcrumbs.push({ name: 'Buying guides', item: siteUrl + '/articles.html' });
  if (route.equipmentId) breadcrumbs.push({ name: 'Equipment', item: siteUrl + '/offerings.html' });
  if (route.key !== 'index') breadcrumbs.push({ name: route.title, item: url });
  const graph = [
    { '@type': 'Organization', '@id': siteUrl + '/#organization', name: 'Med Mission Supplies', url: siteUrl },
    { '@type': 'WebSite', '@id': siteUrl + '/#website', name: 'Med Mission Supplies', url: siteUrl, publisher: { '@id': siteUrl + '/#organization' } },
    { '@type': route.articleId ? 'Article' : ['offerings', 'articles'].includes(route.key) || route.equipmentId ? 'CollectionPage' : 'WebPage', '@id': url + '#page', url, name: route.title, ...(route.articleId ? { headline: route.title, author: { '@id': siteUrl + '/#organization' }, mainEntityOfPage: url, articleSection: item.category, ...(modified ? { dateModified: modified } : {}) } : {}), description: route.description, image, inLanguage: 'en-US', isPartOf: { '@id': siteUrl + '/#website' }, publisher: { '@id': siteUrl + '/#organization' }, ...(!route.articleId ? { breadcrumb: { '@id': url + '#breadcrumbs' } } : {}) },
    { '@type': 'BreadcrumbList', '@id': url + '#breadcrumbs', itemListElement: breadcrumbs.map((entry, index) => ({ '@type': 'ListItem', position: index + 1, ...entry })) },
  ];
  return { ...metadata[page], url, modified, image, imageWidth: socialImageSize.width, imageHeight: socialImageSize.height, imageType: socialImageSize.type, imageAlt: social.alt, socialTitle: social.title, socialDescription: social.description, type: route.articleId ? 'article' : 'website', schema: { '@context': 'https://schema.org', '@graph': graph } };
}

// Static HTML and enhanced navigation use exactly the same metadata contract.
export function socialMetaEntries(info) {
  return [
    ...Object.entries({
      'og:title': info.socialTitle,
      'og:description': info.socialDescription,
      'og:url': info.url,
      'og:type': info.type,
      'og:site_name': 'Med Mission Supplies',
      'og:locale': 'en_US',
      'og:image': info.image,
      'og:image:secure_url': info.image,
      'og:image:type': info.imageType,
      'og:image:width': String(info.imageWidth),
      'og:image:height': String(info.imageHeight),
      'og:image:alt': info.imageAlt,
    }).map(([property, content]) => ({ property, content })),
    ...Object.entries({
      'twitter:card': 'summary_large_image',
      'twitter:title': info.socialTitle,
      'twitter:description': info.socialDescription,
      'twitter:image': info.image,
      'twitter:image:alt': info.imageAlt,
    }).map(([name, content]) => ({ name, content })),
  ];
}

export function syncPageSeo(doc, page) {
  const info = pageSeo(page);
  if (!info) return;
  doc.querySelector('link[rel="canonical"]')?.setAttribute('href', info.url);
  for (const { property, name, content } of socialMetaEntries(info)) {
    doc.querySelector(`meta[${property ? 'property' : 'name'}="${property ?? name}"]`)?.setAttribute('content', content);
  }
  const structured = doc.querySelector('#page-structured-data');
  if (structured) structured.textContent = JSON.stringify(info.schema).replace(/</g, '\\u003c');
}
