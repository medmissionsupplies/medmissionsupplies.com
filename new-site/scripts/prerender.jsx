import React from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile } from 'node:fs/promises';
import { App } from '../src/App.jsx';

for (const page of ['index', 'offerings', 'about', 'employment', 'contact']) {
  const file = new URL(`../dist/${page}.html`, import.meta.url);
  const html = await readFile(file, 'utf8');
  await writeFile(file, html.replace('<html lang="en">', `<html lang="en" data-page="${page}">`).replace('<div id="root"></div>', `<div id="root">${renderToString(<App page={page} />)}</div>`));
}
const index = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const notFound = index.replace('data-page="index"', 'data-page="not-found"').replace('<head>', '<head><base href="/" />').replace(/<title>.*?<\/title>/, '<title>Page not found | Med Mission Supplies</title>').replace(/<div id="root">[\s\S]*<\/div>/, `<div id="root">${renderToString(<App page="not-found" />)}</div>`);
await writeFile(new URL('../dist/404.html', import.meta.url), notFound);
console.log('Pre-rendered all five pages and the 404 page.');
