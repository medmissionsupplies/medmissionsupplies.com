import React, { useEffect, useState } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { App, pageFromPath } from './App.jsx';
import { installPageNavigation } from './page-navigation.mjs';
import './styles.scss';

// Derive metadata from the same HTML files served to direct visits and crawlers.
const metadata = Object.fromEntries(Object.entries(import.meta.glob('../*.html', { query: '?raw', import: 'default', eager: true })).map(([path, html]) => {
  const page = path.split('/').pop().replace('.html', '');
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return [page, { title: doc.title, description: doc.querySelector('meta[name="description"]')?.content ?? '' }];
}));
function ClientApp() {
  const [route, setRoute] = useState(() => ({ page: document.documentElement.dataset.page || pageFromPath(window.location.pathname), search: undefined, entry: 'initial' }));
  useEffect(() => installPageNavigation({
    metadata,
    render: next => flushSync(() => setRoute(next)),
  }), []);
  return <App page={route.page} search={route.search} entry={route.entry} contactDraft={route.draft} />;
}
const root = document.getElementById('root');
const app = <ClientApp />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
