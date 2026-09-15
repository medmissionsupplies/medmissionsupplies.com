import test from 'node:test';
import assert from 'node:assert/strict';
import { installPageNavigation, pageKey } from '../src/page-navigation.mjs';

const tick = () => new Promise(resolve => setImmediate(resolve));
function browser({ url = 'https://mms.test/', native = false, supported = true, reduced = false, deferred = false, failRender = false } = {}) {
  const handlers = new Map();
  const listen = (name, fn) => handlers.set(name, [...(handlers.get(name) ?? []), fn]);
  const unlisten = (name, fn) => handlers.set(name, handlers.get(name)?.filter(item => item !== fn));
  const emit = (name, event) => handlers.get(name)?.forEach(fn => fn(event));
  const renders = [], transitions = [], redirects = [], scrolls = [];
  const entries = [{ url, state: { unrelated: true } }];
  let index = 0, draft;
  class Element {
    constructor(href, options) { this.href = new URL(href, location.href).href; Object.assign(this, options); }
    closest(selector) { return selector === 'a[href]' ? this : null; }
    hasAttribute(name) { return Boolean(this[name]); }
  }
  const location = { href: url, assign: href => redirects.push(href), replace: href => redirects.push(href), reload: () => redirects.push(location.href) };
  const history = {
    get state() { return entries[index].state; }, scrollRestoration: 'auto',
    replaceState(state, _, href) { entries[index] = { state, url: href ?? location.href }; if (href) location.href = href; },
    pushState(state, _, href) { entries.splice(++index); entries.push({ state, url: href }); location.href = href; },
  };
  const motion = { matches: reduced, addEventListener: listen, removeEventListener: unlisten };
  const win = { location, history, Element, scrollX: 0, scrollY: 0, matchMedia: () => motion, addEventListener: listen, removeEventListener: unlisten, scrollTo: options => { scrolls.push(options); win.scrollY = options.top; } };
  if (native) win.CSSViewTransitionRule = class {};
  const description = { setAttribute: (_, value) => { description.content = value; } };
  const doc = {
    title: 'Home', visibilityState: 'visible', documentElement: { dataset: {} },
    addEventListener: listen, removeEventListener: unlisten,
    querySelector: selector => selector === '.contact-form' ? (draft ? { elements: { namedItem: name => ({ value: draft[name] }) } } : null) : description,
    getElementById: id => ({ focus() {}, scrollIntoView: options => scrolls.push({ anchor: id, ...options }) }),
  };
  if (supported) doc.startViewTransition = update => {
    let run;
    const updateCallbackDone = new Promise((resolve, reject) => { run = () => { try { update(); resolve(); } catch (error) { reject(error); } }; });
    const transition = { ready: Promise.resolve(), updateCallbackDone, finished: updateCallbackDone, skipped: false, skipTransition() { this.skipped = true; }, run };
    transitions.push(transition);
    if (!deferred) queueMicrotask(run);
    return transition;
  };
  const metadata = Object.fromEntries(['index', 'about', 'offerings', 'contact', 'employment'].map(page => [page, { title: page, description: `${page} description` }]));
  installPageNavigation({ win, doc, metadata, render: route => { if (failRender) throw Error('render failed'); renders.push(route); draft = route.draft; } });
  return { win, doc, entries, transitions, renders, redirects, scrolls, motion, emit,
    setDraft(value) { draft = value; },
    async click(href, options = {}) {
      const { target, download, ...eventOptions } = options;
      const event = { button: 0, defaultPrevented: false, target: new Element(href, { target, download }), preventDefault() { this.defaultPrevented = true; }, ...eventOptions };
      emit('click', event); await tick(); return event.defaultPrevented;
    },
    async back() { index--; location.href = entries[index].url; emit('popstate', { state: history.state }); await tick(); },
    async forward() { index++; location.href = entries[index].url; emit('popstate', { state: history.state }); await tick(); },
    async fragment(hash) {
      await this.click(hash);
      history.pushState(null, '', new URL(hash, location.href).href);
      emit('popstate', { state: null });
      emit('hashchange', {});
      await tick();
    },
  };
}

test('Firefox changes page and metadata within one transition and preserves unrelated history state', async () => {
  const page = browser();
  assert.equal(await page.click('/offerings.html#ultrasound'), true);
  assert.equal(page.transitions.length, 1);
  assert.equal(page.renders[0].page, 'offerings');
  assert.equal(page.doc.title, 'offerings');
  assert.equal(page.doc.querySelector('meta').content, 'offerings description');
  assert.equal(page.entries.length, 2);
  assert.equal(page.win.history.state.unrelated, true);
  assert.equal(page.scrolls.at(-1).anchor, 'ultrasound');
});

test('native transitions and unsupported browsers keep ordinary navigation; reduced motion skips animation', async () => {
  for (const options of [{ native: true }, { supported: false }]) {
    const page = browser(options);
    assert.equal(await page.click('/about.html'), false);
    assert.equal(page.renders.length, 0);
  }
  const page = browser({ reduced: true });
  assert.equal(await page.click('/about.html'), true);
  assert.equal(page.transitions.length, 0);
  assert.equal(page.renders[0].page, 'about');
});

test('aliases stay on the current page; fragments, query changes, modifiers and external links retain native behavior', async () => {
  const page = browser({ url: 'https://mms.test/about.html' });
  for (const href of ['/about', '/about/', '/about/index.html']) assert.equal(await page.click(href), true);
  for (const [href, options] of [['/about.html#team', {}], ['/about.html?view=team', {}], ['/contact.html', { ctrlKey: true }], ['/contact.html', { target: '_blank' }], ['/contact.html', { download: true }], ['https://external.test/', {}]]) assert.equal(await page.click(href, options), false);
  assert.equal(page.renders.length, 0);
  assert.equal(pageKey('/contact/index.html'), 'contact');
});

test('rapid clicks cancel stale callbacks before they can change page or history', async () => {
  const page = browser({ deferred: true });
  await page.click('/about.html');
  await page.click('/employment.html');
  assert.equal(page.transitions[0].skipped, true);
  page.transitions[0].run();
  assert.equal(page.renders.length, 0);
  page.transitions[1].run();
  await tick();
  assert.equal(page.renders.length, 1);
  assert.equal(page.renders[0].page, 'employment');
  assert.equal(page.entries.length, 2);
});

test('Back/Forward restore scroll and the contact draft without pushing extra entries', async () => {
  const page = browser();
  page.win.scrollY = 650;
  await page.click('/contact.html?equipment=Ultrasound%20equipment');
  page.setDraft({ name: 'Test name', email: 'test@example.invalid', message: 'Unsent draft' });
  page.win.scrollY = 240;
  await page.click('/employment.html');
  await page.back();
  assert.equal(page.renders.at(-1).draft.message, 'Unsent draft');
  assert.equal(page.renders.at(-1).search, '?equipment=Ultrasound%20equipment');
  assert.equal(page.scrolls.at(-1).top, 240);
  await page.back();
  assert.equal(page.renders.at(-1).page, 'index');
  assert.equal(page.scrolls.at(-1).top, 650);
  await page.forward();
  assert.equal(page.renders.at(-1).page, 'contact');
  assert.equal(page.entries.length, 3);
});

test('render failure uses native navigation to the requested destination', async () => {
  const page = browser({ failRender: true });
  await page.click('/about.html');
  assert.deepEqual(page.redirects, ['https://mms.test/about.html']);
});

test('native fragment entries with null state do not reload or remount the form', async () => {
  const page = browser({ url: 'https://mms.test/contact.html' });
  page.setDraft({ name: 'Test', message: 'Keep this draft' });
  page.win.scrollY = 240;
  await page.fragment('#main-content');
  assert.equal(page.redirects.length, 0);
  assert.equal(page.renders.length, 0);
  await page.back();
  assert.equal(page.scrolls.at(-1).top, 240);
  assert.equal(page.redirects.length, 0);
  assert.equal(page.renders.length, 0);
});

test('hashchange during a pending Back transition keeps the destination history entry', async () => {
  const page = browser({ deferred: true });
  await page.click('/offerings.html#ultrasound');
  page.transitions.at(-1).run(); await tick();
  const target = page.win.history.state.mms.entry;
  await page.click('/about.html');
  page.transitions.at(-1).run(); await tick();
  await page.back();
  page.emit('hashchange', {});
  page.transitions.at(-1).run(); await tick();
  assert.equal(page.win.history.state.mms.entry, target);
  assert.equal(page.renders.at(-1).entry, target);
});

test('clicking the destination during Back does not cancel its pending render', async () => {
  const page = browser({ deferred: true });
  await page.click('/about.html');
  page.transitions.at(-1).run(); await tick();
  await page.back();
  await page.click('/index.html');
  page.transitions.at(-1).run(); await tick();
  assert.equal(page.renders.at(-1).page, 'index');
  assert.equal(page.doc.title, 'index');
  assert.equal(page.entries.length, 2);
});
