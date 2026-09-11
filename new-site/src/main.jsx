import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App, pageFromPath } from './App.jsx';
import './styles.scss';

const pageKey = pathname => {
  if (pathname === '/' || pathname === '/index.html') return 'index';
  return pathname.match(/^\/(offerings|about|employment|contact)(?:\.html|\/(?:index\.html)?)?$/)?.[1] ?? pathname;
};

// Keep active-page links usable without reloading or replaying the page slide.
document.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!link || link.hasAttribute('download') || (link.target && link.target.toLowerCase() !== '_self')) return;

  const current = new URL(window.location.href);
  const destination = new URL(link.href, current);
  if (destination.origin !== current.origin) return;
  if (destination.search && destination.search !== current.search) return;
  if (destination.hash && destination.hash !== current.hash) return;
  if (pageKey(destination.pathname) === pageKey(current.pathname)) event.preventDefault();
});

const root = document.getElementById('root');
const app = <App page={document.documentElement.dataset.page || pageFromPath(window.location.pathname)} />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
