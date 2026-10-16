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
  const graph = [
    { '@type': 'Organization', '@id': siteUrl + '/#organization', name: 'Med Mission Supplies', url: siteUrl },
    { '@type': 'WebSite', '@id': siteUrl + '/#website', name: 'Med Mission Supplies', url: siteUrl, publisher: { '@id': siteUrl + '/#organization' } },
    { '@type': route.articleId ? 'Article' : route.key === 'offerings' || route.equipmentId ? 'CollectionPage' : 'WebPage', '@id': url + '#page', url, name: route.title, ...(route.articleId ? { headline: route.title } : {}), description: route.description, image, isPartOf: { '@id': siteUrl + '/#website' }, publisher: { '@id': siteUrl + '/#organization' } },
  ];
  return { ...metadata[page], url, image, imageWidth: socialImageSize.width, imageHeight: socialImageSize.height, imageType: socialImageSize.type, imageAlt: social.alt, socialTitle: social.title, socialDescription: social.description, type: route.articleId ? 'article' : 'website', schema: { '@context': 'https://schema.org', '@graph': graph } };
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
