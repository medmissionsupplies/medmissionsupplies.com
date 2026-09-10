import React from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { App } from '../src/App.jsx';

for (const page of ['index', 'offerings', 'about', 'employment', 'contact']) {
  const file = new URL(`../dist/${page}.html`, import.meta.url);
  const html = await readFile(file, 'utf8');
  const rendered = html.replace('<html lang="en">', `<html lang="en" data-page="${page}">`).replace('<div id="root"></div>', `<div id="root">${renderToString(<App page={page} />)}</div>`);
  await writeFile(file, rendered);
  if (page !== 'index') {
    const directory = new URL(`../dist/${page}/`, import.meta.url);
    await mkdir(directory, { recursive: true });
    await writeFile(new URL('index.html', directory), rendered);
  }
}
const index = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const notFound = index.replace('data-page="index"', 'data-page="not-found"').replace(/<title>.*?<\/title>/, '<title>Page not found | Med Mission Supplies</title>').replace(/<div id="root">[\s\S]*<\/div>/, `<div id="root">${renderToString(<App page="not-found" />)}</div>`);
await writeFile(new URL('../dist/404.html', import.meta.url), notFound);
await cp(new URL('../licenses/', import.meta.url), new URL('../dist/licenses/', import.meta.url), { recursive: true });
console.log('Pre-rendered all five pages, four short-URL aliases, and the 404 page; copied licenses.');
