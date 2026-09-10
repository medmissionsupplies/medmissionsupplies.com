import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../dist');
const pages = ['index', 'offerings', 'about', 'employment', 'contact', '404'];
let links = 0;
const rendered = new Map();
for (const page of pages) rendered.set(`${page}.html`, await readFile(resolve(root, `${page}.html`), 'utf8'));
for (const [file, html] of rendered) {
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: expected exactly one h1`);
  assert.ok(html.includes('id="main-content"'), `${file}: missing main landmark`);
  assert.ok(html.includes('Skip to main content'), `${file}: missing skip link`);
  assert.ok(!html.includes('William Grayson'), `${file}: removed employee still present`);
  assert.ok(!/\bundefined\b/.test(html), `${file}: undefined content`);
  for (const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
    const url = match[1].replace(/&amp;/g, '&');
    if (/^(https?:|data:|mailto:|tel:)/.test(url)) continue;
    const target = url.split(/[?#]/)[0].replace(/^\.\//, '').replace(/^\//, '');
    if (!target) continue;
    await access(resolve(root, target));
    links++;
  }
  for (const match of html.matchAll(/href="([^"#?]*)#([^"]+)"/g)) {
    const destination = match[1] || file;
    const targetHtml = rendered.get(destination);
    assert.ok(targetHtml?.includes(`id="${match[2]}"`), `${file}: broken anchor ${match[0]}`);
  }
}
const team = rendered.get('about.html');
for (const name of ['Lynette Hwang', 'Vincent Larkin', 'John Landman']) assert.ok(team.includes(name), `Missing team member ${name}`);
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
    await access(resolve(root, 'assets', decodeURIComponent(match[1])));
  }
}
assert.ok(rendered.get('404.html').includes('<base href="/"'), '404 needs root-aware asset paths');
console.log(`Verified ${pages.length} rendered pages, ${links} local references, fonts, page anchors, team content, and contact integration.`);
