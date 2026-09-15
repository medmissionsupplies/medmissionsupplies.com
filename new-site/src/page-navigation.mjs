export const pageKey = pathname => {
  if (pathname === '/' || pathname === '/index.html') return 'index';
  return pathname.match(/^\/(offerings|about|employment|contact)(?:\.html|\/(?:index\.html)?)?$/)?.[1] ?? null;
};

// Enhance Firefox with same-document snapshots. Other browsers keep their
// cross-document transitions, and ordinary links remain the no-JavaScript path.
export function installPageNavigation({ render, metadata, prepare = async () => {}, win = window, doc = document }) {
  const motion = win.matchMedia('(prefers-reduced-motion: reduce)');
  const enhanced = typeof doc.startViewTransition === 'function' && !('CSSViewTransitionRule' in win);
  const snapshots = new Map();
  let serial = 0;
  let request = 0;
  let transition;
  let rendered = new URL(win.location.href);
  let entry = win.history.state?.mms?.entry ?? `mms-${Date.now()}-${serial++}`;
  const newEntry = () => `mms-${Date.now()}-${serial++}`;
  const stateWith = key => ({ ...win.history.state, mms: { entry: key } });
  const snapshot = () => {
    const form = doc.querySelector('.contact-form');
    const draft = form ? Object.fromEntries(['name', 'email', 'message'].map(name => [name, form.elements.namedItem(name)?.value ?? ''])) : undefined;
    snapshots.set(entry, { left: win.scrollX, top: win.scrollY, draft });
  };
  const scroll = (url, saved) => {
    if (saved) win.scrollTo({ left: saved.left, top: saved.top, behavior: 'instant' });
    else {
      let anchor;
      try { anchor = url.hash && doc.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { /* Invalid fragments stay at the top. */ }
      if (anchor) anchor.scrollIntoView({ behavior: 'instant', block: 'start' });
      else win.scrollTo({ left: 0, top: 0, behavior: 'instant' });
    }
  };

  if (enhanced) {
    win.history.replaceState(stateWith(entry), '');
    win.history.scrollRestoration = 'manual';
  }

  async function navigate(url, { historyEntry } = {}) {
    const token = ++request;
    transition?.skipTransition();
    snapshot();
    const saved = historyEntry ? snapshots.get(historyEntry) : undefined;
    const key = historyEntry ?? newEntry();
    let committed = false;
    try {
      await prepare(pageKey(url.pathname));
      if (token !== request) return;
      const update = () => {
        // Skipping an animation does not cancel its pending DOM callback.
        if (token !== request) return;
        if (!historyEntry) win.history.pushState(stateWith(key), '', url.href);
        entry = key;
        const page = pageKey(url.pathname);
        const info = metadata[page];
        doc.title = info.title;
        doc.querySelector('meta[name="description"]')?.setAttribute('content', info.description);
        doc.documentElement.dataset.page = page;
        render({ page, search: url.search, entry: key, draft: saved?.draft });
        rendered = url;
        scroll(url, saved);
        doc.getElementById('main-content')?.focus({ preventScroll: true });
        committed = true;
      };
      if (motion.matches || doc.visibilityState === 'hidden') update();
      else {
        const active = doc.startViewTransition(update);
        transition = active;
        // A skipped or unsupported snapshot is harmless once content updates.
        active.ready.catch(() => {});
        active.finished.catch(() => {}).finally(() => { if (transition === active) transition = undefined; });
        await active.updateCallbackDone;
      }
    } catch {
      if (token !== request || committed) return;
      // Retain ordinary navigation if preparing or rendering a page fails.
      if (win.location.href === url.href) win.location.replace(url.href);
      else win.location.assign(url.href);
    }
  }

  function click(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof win.Element ? event.target.closest('a[href]') : null;
    if (!link || link.hasAttribute('download') || (link.target && link.target.toLowerCase() !== '_self')) return;
    const from = new URL(win.location.href);
    const url = new URL(link.href, from);
    if (url.origin !== from.origin) return;
    const samePage = (pageKey(url.pathname) ?? url.pathname) === (pageKey(from.pathname) ?? from.pathname);
    if (samePage) {
      if ((!url.search || url.search === from.search) && (!url.hash || url.hash === from.hash)) {
        event.preventDefault();
        // During Back/Forward the address changes before the DOM snapshot does.
        // A click on that destination must not cancel its pending render.
        if (!enhanced || (pageKey(rendered.pathname) === pageKey(from.pathname) && rendered.search === from.search)) {
          ++request;
          transition?.skipTransition();
        }
      } else {
        if (enhanced && (pageKey(rendered.pathname) !== pageKey(from.pathname) || rendered.search !== from.search)) {
          event.preventDefault();
          void navigate(url);
          return;
        }
        // Hash navigation keeps its native focus and history behavior.
        if (enhanced && url.search === from.search) snapshot();
        ++request;
        transition?.skipTransition();
      }
      return;
    }
    if (!enhanced || !pageKey(url.pathname)) return;
    event.preventDefault();
    void navigate(url);
  }

  function popstate(event) {
    if (!enhanced) return;
    const url = new URL(win.location.href);
    if (!pageKey(url.pathname)) {
      ++request;
      transition?.skipTransition();
      win.location.reload();
      return;
    }
    if (pageKey(url.pathname) === pageKey(rendered.pathname) && url.search === rendered.search) {
      ++request;
      transition?.skipTransition();
      const target = event.state?.mms?.entry;
      if (target && target !== entry) snapshot();
      // Native fragment entries may have null state; they still use this DOM.
      entry = !target || (target === entry && url.hash !== rendered.hash) ? newEntry() : target;
      win.history.replaceState(stateWith(entry), '');
      rendered = url;
      scroll(url, snapshots.get(entry));
      return;
    }
    if (!event.state?.mms?.entry) {
      stop();
      win.location.reload();
      return;
    }
    void navigate(url, { historyEntry: event.state.mms.entry });
  }
  const hashchange = () => {
    if (!enhanced || win.location.href === rendered.href) return;
    const url = new URL(win.location.href);
    // Cross-page history traversal fires hashchange before the snapshot update.
    // Its destination entry belongs to popstate and must not be replaced here.
    if (pageKey(url.pathname) !== pageKey(rendered.pathname) || url.search !== rendered.search) return;
    entry = newEntry();
    win.history.replaceState(stateWith(entry), '');
    rendered = url;
  };
  const stop = () => { ++request; transition?.skipTransition(); };
  const hide = () => { if (enhanced) { snapshot(); win.history.scrollRestoration = 'auto'; } stop(); };
  const show = () => { if (enhanced) win.history.scrollRestoration = 'manual'; };
  const motionChanged = () => transition?.skipTransition();
  const interrupt = event => {
    if (event.target instanceof win.Element && event.target.closest('.cds--header__menu-trigger')) transition?.skipTransition();
  };
  doc.addEventListener('click', click);
  doc.addEventListener('click', interrupt);
  win.addEventListener('popstate', popstate);
  win.addEventListener('hashchange', hashchange);
  win.addEventListener('pagehide', hide);
  win.addEventListener('pageshow', show);
  motion.addEventListener('change', motionChanged);
  return () => {
    stop();
    doc.removeEventListener('click', click);
    doc.removeEventListener('click', interrupt);
    win.removeEventListener('popstate', popstate);
    win.removeEventListener('hashchange', hashchange);
    win.removeEventListener('pagehide', hide);
    win.removeEventListener('pageshow', show);
    motion.removeEventListener('change', motionChanged);
    if (enhanced) win.history.scrollRestoration = 'auto';
  };
}
