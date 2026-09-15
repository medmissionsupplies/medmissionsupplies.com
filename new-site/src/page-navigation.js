// Inlined in <head> so the fallback is selected before the first page paint.
(() => {
  const root = document.documentElement;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fallback = !('CSSViewTransitionRule' in window);
  const storageKey = 'mms-page-entry';
  const current = new URL(window.location.href);
  const pageKey = pathname => {
    if (pathname === '/' || pathname === '/index.html') return 'index';
    return pathname.match(/^\/(offerings|about|employment|contact)(?:\.html|\/(?:index\.html)?)?$/)?.[1] ?? pathname;
  };
  const destinationKey = url => `${pageKey(url.pathname)}${url.search}`;
  const clear = () => root.removeAttribute('data-page-entry');

  // Storage is optional: privacy settings must never prevent normal navigation.
  let pending;
  try {
    pending = JSON.parse(sessionStorage.getItem(storageKey));
    sessionStorage.removeItem(storageKey);
  } catch { /* Normal navigation still works when storage is unavailable. */ }

  const navigation = performance.getEntriesByType('navigation')[0];
  const recentClick = pending?.destination === destinationKey(current)
    && Date.now() - pending.time >= 0 && Date.now() - pending.time < 15000;
  let internalArrival = false;
  try {
    const previous = new URL(document.referrer);
    internalArrival = previous.origin === current.origin && pageKey(previous.pathname) !== pageKey(current.pathname);
  } catch { /* Direct visits have no referrer. */ }
  if (fallback && !motion.matches && navigation?.type === 'navigate' && (recentClick || internalArrival)) {
    root.setAttribute('data-page-entry', 'slide');
  }

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link || link.hasAttribute('download') || (link.target && link.target.toLowerCase() !== '_self')) return;
    const from = new URL(window.location.href);
    const destination = new URL(link.href, from);
    if (destination.origin !== from.origin) return;

    if (pageKey(destination.pathname) === pageKey(from.pathname)) {
      if ((!destination.search || destination.search === from.search) && (!destination.hash || destination.hash === from.hash)) event.preventDefault();
      return;
    }
    if (!fallback || motion.matches || !['index', 'offerings', 'about', 'employment', 'contact'].includes(pageKey(destination.pathname))) return;
    try {
      sessionStorage.setItem(storageKey, JSON.stringify({ destination: destinationKey(destination), time: Date.now() }));
    } catch { /* The same-origin referrer can also enable the arrival slide. */ }
  });

  document.addEventListener('animationend', event => {
    if (event.animationName === 'mms-page-in' && event.target.matches('.page-content')) clear();
  });
  window.addEventListener('pagehide', clear);
  window.addEventListener('pageshow', event => { if (event.persisted) clear(); });
  motion.addEventListener('change', clear);
})();
