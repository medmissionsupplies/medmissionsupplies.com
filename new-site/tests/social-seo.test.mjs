import test from 'node:test';
import assert from 'node:assert/strict';
import { routes, metadata } from '../src/routes.mjs';
import { equipmentGuidance } from '../src/editorial-guidance.mjs';
import { pageSeo, socialMetaEntries, syncPageSeo, siteUrl } from '../src/seo.mjs';
import { socialContentFor, socialImagePath } from '../src/social-metadata.mjs';

test('every canonical page has a unique absolute share image and complete OG/X metadata', () => {
  const images = new Set(), descriptions = new Set();
  for (const route of routes) {
    const seo = pageSeo(route.key);
    assert.equal(seo.url, siteUrl + route.path);
    assert.equal(seo.title, metadata[route.key].title, 'Preserve the document title and equipment identity');
    assert.equal(seo.image, siteUrl + socialImagePath(route.key));
    assert.equal(seo.imageWidth, 1200);
    assert.equal(seo.imageHeight, 630);
    assert.equal(seo.imageType, 'image/jpeg');
    assert.ok(seo.socialTitle.length > 15 && seo.socialTitle.length <= 100, route.key);
    assert.ok(seo.socialDescription.length >= 60 && seo.socialDescription.length <= 240, route.key);
    assert.ok(seo.imageAlt.includes('Med Mission Supplies'));
    assert.ok(!images.has(seo.image), `Repeated card for ${route.key}`);
    assert.ok(!descriptions.has(seo.socialDescription), `Repeated share description for ${route.key}`);
    images.add(seo.image);
    descriptions.add(seo.socialDescription);
    const fields = Object.fromEntries(socialMetaEntries(seo).map(entry => [entry.property ?? entry.name, entry.content]));
    assert.equal(fields['og:url'], seo.url);
    assert.equal(fields['og:type'], route.articleId ? 'article' : 'website');
    assert.equal(fields['og:title'], fields['twitter:title']);
    assert.equal(fields['og:description'], fields['twitter:description']);
    assert.equal(fields['og:image'], fields['twitter:image']);
    assert.equal(fields['og:image:alt'], fields['twitter:image:alt']);
    assert.equal(fields['twitter:card'], 'summary_large_image');
    assert.equal(fields['og:image:width'], '1200');
    assert.equal(fields['og:image:height'], '630');
    assert.equal(fields['og:image:type'], 'image/jpeg');
    const page = seo.schema['@graph'][2];
    assert.equal(page.url, seo.url);
    assert.equal(page.image, seo.image);
    assert.ok(!('datePublished' in page), 'Do not turn a review date into a publication claim');
    assert.ok(!('offers' in page) && !('aggregateRating' in page));
    if (route.articleId) {
      assert.equal(page.author['@id'], siteUrl + '/#organization');
      assert.equal(page.mainEntityOfPage, seo.url);
      assert.match(page.dateModified, /^\d{4}-\d{2}-\d{2}$/);
    }
    const crumbs = seo.schema['@graph'].find(node => node['@type'] === 'BreadcrumbList');
    assert.equal(crumbs.itemListElement.at(-1).item, seo.url);
    assert.equal(crumbs.itemListElement[0].position, 1);
  }
});

test('equipment uses reviewed social copy while item-specific overrides remain available', () => {
  for (const guidance of equipmentGuidance) {
    assert.equal(pageSeo(`equipment-${guidance.id}`).socialTitle, guidance.socialTitle);
    assert.equal(pageSeo(`equipment-${guidance.id}`).socialDescription, guidance.socialDescription);
  }
  const content = socialContentFor({ key: 'article-custom', articleId: 'custom', title: 'Original title', description: 'Original description' }, {
    title: 'Example', image: 'ultrasound', kind: 'opinion', socialTitle: 'A specific social title', socialDescription: 'A specific social description', socialHeadline: 'A short hook', socialStrapline: 'A clear supporting line',
  });
  assert.equal(content.title, 'A specific social title');
  assert.equal(content.description, 'A specific social description');
  assert.equal(content.headline, 'A short hook');
  assert.equal(content.strapline, 'A clear supporting line');
  assert.equal(content.label, 'MMS perspective');
});

test('enhanced navigation replaces every share field together, including return navigation', () => {
  const nodes = new Map();
  const doc = { querySelector(selector) {
    if (!nodes.has(selector)) nodes.set(selector, { setAttribute(name, value) { this[name] = value; } });
    return nodes.get(selector);
  } };
  for (const key of ['equipment-ultrasound', 'article-the-price-of-a-working-service', 'equipment-ultrasound']) {
    syncPageSeo(doc, key);
    const seo = pageSeo(key);
    assert.equal(doc.querySelector('link[rel="canonical"]').href, seo.url);
    for (const { property, name, content } of socialMetaEntries(seo)) {
      assert.equal(doc.querySelector(`meta[${property ? 'property' : 'name'}="${property ?? name}"]`).content, content);
    }
    assert.deepEqual(JSON.parse(doc.querySelector('#page-structured-data').textContent), seo.schema);
  }
  const previousSize = nodes.size;
  syncPageSeo(doc, 'not-found');
  assert.equal(pageSeo('not-found'), null);
  assert.equal(nodes.size, previousSize, 'Missing routes must not invent share metadata');
});
