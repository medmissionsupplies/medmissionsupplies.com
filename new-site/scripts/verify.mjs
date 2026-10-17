import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pageSeo, socialMetaEntries } from '../src/seo.mjs';
import sharp from 'sharp';
import { routes } from '../src/routes.mjs';
import { equipment } from '../src/catalog.mjs';
import { articles } from '../src/articles.mjs';
import { researchGuides } from '../src/research-guides.generated.mjs';

const root = resolve(import.meta.dirname, '../dist');
const pages = [...routes.map(route => route.path.slice(1, -5)), '404'];
let links = 0;
const rendered = new Map();
for (const page of pages) rendered.set(`${page}.html`, await readFile(resolve(root, `${page}.html`), 'utf8'));
for (const page of pages.filter(page => page !== 'index' && page !== '404')) {
  const html = await readFile(resolve(root, page, 'index.html'), 'utf8');
  assert.equal(html, rendered.get(`${page}.html`), `${page}: short URL differs from the original page`);
  rendered.set(`${page}/index.html`, html);
}
for (const [file, html] of rendered) {
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: expected exactly one h1`);
  assert.ok(html.includes('id="main-content"'), `${file}: missing main landmark`);
  assert.ok(html.includes('Skip to main content'), `${file}: missing skip link`);
  assert.ok(!html.includes('William Grayson'), `${file}: removed employee still present`);
  // Philips' verified FRx product URL literally ends in /undefined; it is not a rendering error.
  const checkedHtml = html.replaceAll('https://www.philips.com.ph/healthcare/product/HC861304/undefined', 'verified-philips-product');
  assert.ok(!/\bundefined\b/.test(checkedHtml), `${file}: undefined content`);
  for (const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
    const url = match[1].replace(/&amp;/g, '&');
    if (/^(https?:|data:|mailto:|tel:)/.test(url)) continue;
    const target = new URL(url, `https://mms.invalid/${file}`).pathname.slice(1);
    if (!target) continue;
    await access(resolve(root, target));
    links++;
  }
  for (const match of html.matchAll(/href="([^"#?]*)#([^"]+)"/g)) {
    const destination = match[1] ? new URL(match[1], `https://mms.invalid/${file}`).pathname.slice(1) : file;
    const targetHtml = rendered.get(destination);
    assert.ok(targetHtml?.includes(`id="${match[2]}"`), `${file}: broken anchor ${match[0]}`);
  }
}
const team = rendered.get('about.html');
const escapedText = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#x27;');
for (const guide of researchGuides) {
  const html=rendered.get(`resources/${guide.id}.html`);
  assert.ok(rendered.get('articles.html').includes(`/resources/${guide.id}.html`), guide.id + ': not discoverable in library');
  for (const value of [guide.sheet.firstChoice,guide.sheet.upgradeWhen,guide.sheet.budgetWatch,guide.sheet.supportCheck,...guide.sheet.askSupplier]) assert.ok(html.includes(escapedText(value)), guide.id + ': missing buying-sheet content');
  assert.ok(html.includes(`datetime="${guide.reviewedAt}"`) || html.includes(`dateTime="${guide.reviewedAt}"`), guide.id + ': missing review date');
  assert.ok(html.includes(`/guidesheets/${guide.id}.pdf`), guide.id + ': missing download');
}
for (const item of equipment) {
  const html = rendered.get(`equipment/${item.id}.html`);
  assert.ok(html.includes(item.title.replaceAll('&', '&amp;')), `Missing equipment ${item.id}`);
  assert.ok(html.includes('id="comments"'), `Missing comments for ${item.id}`);
  assert.ok(html.includes('name="listing_id" value="' + item.id + '"'), `Wrong comment listing ${item.id}`);
}
for (const article of articles) {
  const html = rendered.get(`resources/${article.id}.html`);
  for (let i = 1; i <= article.sections.length; i++) assert.ok(html.includes(`id="section-${i}"`), `Missing article section ${article.id}/${i}`);
  for (const entry of article.entries || []) {
    assert.ok(entry.explanation?.length > 40 && html.includes('The basics'), `Missing equipment explanation ${article.id}/${entry.id}`);
    assert.ok(html.includes(`id="${entry.id}"`), `Missing buying guide item ${article.id}/${entry.id}`);
    assert.ok(html.includes('Technical references'), `Missing buying guide citations ${article.id}`);
  }
}
assert.ok(!rendered.get('offerings.html').includes('Search equipment'), 'Broad equipment search was restored');
const catalog = rendered.get('offerings.html');
assert.ok(!catalog.includes('class="filter-tabs"'), 'Equipment must be visible without filter tabs');
assert.equal((catalog.match(/class="catalog-card"/g) || []).length, equipment.length, 'Catalog must render every equipment card');
for (const item of equipment) assert.ok(catalog.includes(`id="${item.id}"`), `Catalog hides ${item.id}`);
for (const name of ['Lynette Hwang', 'Vincent Larkin', 'John Landman', 'Jon Hurt', 'Bravin Ratinpal', 'Keitur Rolando', 'Ryan Nguyen']) assert.ok(team.includes(name), `Missing team member ${name}`);
const form = rendered.get('contact.html');
assert.ok(form.includes('action="https://formspree.io/f/xkgrvweb"'), 'Contact integration changed');
for (const name of ['name', 'email', 'message']) {
  const field = form.match(new RegExp(`<(?:input|textarea)\\b[^>]*name="${name}"[^>]*>`))?.[0];
  assert.ok(field && /\brequired(?:="")?[\s>]/.test(field), `Missing required ${name} field`);
}
for (const file of await readdir(resolve(root, 'assets'))) {
  if (!file.endsWith('.css')) continue;
  const css = await readFile(resolve(root, 'assets', file), 'utf8');
  assert.ok(!css.includes('~@ibm'), 'Unresolved font paths');
  for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
    if (/^(data:|https?:)/.test(match[1])) continue;
    const path = new URL(match[1], `https://mms.invalid/assets/${file}`).pathname.slice(1);
    await access(resolve(root, decodeURIComponent(path)));
  }
}
for (const match of rendered.get('404.html').matchAll(/(?:href|src)="([^"#]+)"/g)) {
  assert.ok(/^(\/|https?:|data:|mailto:|tel:)/.test(match[1]), `404 needs root-aware paths: ${match[1]}`);
}
for (const license of ['Carbon-Apache-2.0.txt', 'IBM-Plex-OFL.txt']) await access(resolve(root, 'licenses', license));
console.log(`Verified ${rendered.size} rendered pages, ${links} local references, fonts, page anchors, team content, contact integration, and licenses.`);

for (const route of routes) {
  const html = rendered.get(route.path.slice(1));
  const seo = pageSeo(route.key);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, route.path + ': exactly one canonical');
  assert.ok(html.includes('href="' + seo.url + '"'), route.path + ': canonical differs');
  const schema = JSON.parse(html.match(/<script id="page-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema['@graph'][2].url, seo.url);
  assert.ok(!schema['@graph'][2].datePublished, route.path + ': no invented publication date');
  for (const { property, name, content } of socialMetaEntries(seo)) {
    const attribute = property ? 'property' : 'name';
    const key = property ?? name;
    const matches = [...html.matchAll(new RegExp(`<meta ${attribute}="${key}" content="([^"]*)"`, 'g'))];
    const escaped = content.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    assert.equal(matches.length, 1, `${route.path}: exactly one ${key}`);
    assert.equal(matches[0][1], escaped, `${route.path}: stale ${key}`);
  }
  const preview = await readFile(resolve(root, new URL(seo.image).pathname.slice(1)));
  const image = await sharp(preview).metadata();
  assert.equal(image.format, 'jpeg', route.path + ': crawler-compatible JPEG');
  assert.equal(image.width, 1200, route.path + ': share image width');
  assert.equal(image.height, 630, route.path + ': share image height');
  assert.ok(preview.length <= 220 * 1024, route.path + ': social preview exceeds 220 KB');
}
assert.ok((await readFile(resolve(root, 'robots.txt'), 'utf8')).includes('Sitemap: https://medmissionsupplies.com/sitemap.xml'));
console.log(`Verified canonical URLs, all OG/X fields, optimized 1200×630 share cards, structured data and robots across all ${routes.length} canonical pages.`);

// Check every generated source candidate, including ones selected only on phones.
let webpCandidates = 0;
for (const [file, html] of rendered) {
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    const attributes = Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
    if (attributes.src?.endsWith('.svg')) continue;
    assert.match(attributes.src, /^\/media\/optimized\/[^/]+\.webp$/, file + ': unoptimized image');
    const sourceSet = attributes.srcset ?? attributes.srcSet;
    assert.ok(sourceSet && attributes.sizes, file + ': missing responsive image sizes');
    for (const candidate of sourceSet.split(',')) {
      const url = candidate.trim().split(/\s+/)[0];
      const bytes = await readFile(resolve(root, url.slice(1)));
      assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', url);
      assert.equal(bytes.toString('ascii', 8, 12), 'WEBP', url);
      webpCandidates++;
    }
  }
}
console.log(`Verified ${webpCandidates} rendered responsive WebP references.`);
