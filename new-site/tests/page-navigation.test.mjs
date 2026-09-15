import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../src/page-navigation.js', import.meta.url), 'utf8');
function browser({ url = 'https://mms.test/', referrer = '', type = 'navigate', native = false, reduced = false, blockedStorage = false, storage = new Map() } = {}) {
  const attributes = new Map();
  const events = {};
  const listen = (name, fn) => { events[name] = fn; };
  const motion = { matches: reduced, addEventListener: listen };
  class Element {
    constructor(href, options = {}) { this.href = new URL(href, url).href; Object.assign(this, options); }
    closest() { return this; }
    hasAttribute(name) { return Boolean(this[name]); }
  }
  const window = { location: { href: url }, matchMedia: () => motion, addEventListener: listen };
  if (native) window.CSSViewTransitionRule = class {};
  runInNewContext(source, {
    window, Element, URL, Date,
    document: { referrer, addEventListener: listen, documentElement: { setAttribute: (k, v) => attributes.set(k, v), removeAttribute: k => attributes.delete(k) } },
    performance: { getEntriesByType: () => [{ type }] },
    sessionStorage: {
      getItem: k => { if (blockedStorage) throw Error('blocked'); return storage.get(k) ?? null; },
      setItem: (k, v) => { if (blockedStorage) throw Error('blocked'); storage.set(k, v); },
      removeItem: k => storage.delete(k),
    },
  });
  return { attributes, storage, events, click(href, options = {}) {
    const { download, target, ...eventOptions } = options;
    const event = { button: 0, target: new Element(href, { download, target }), defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...eventOptions };
    events.click(event);
    return event.defaultPrevented;
  } };
}

test('Firefox internal links navigate immediately and animate the destination once', () => {
  const first = browser();
  assert.equal(first.click('/offerings.html#ultrasound'), false);
  const second = browser({ url: 'https://mms.test/offerings/#ultrasound', storage: first.storage });
  assert.equal(second.attributes.get('data-page-entry'), 'slide');
  assert.equal(second.storage.size, 0);
  second.events.animationend({ animationName: 'mms-page-in', target: { matches: () => true } });
  assert.equal(second.attributes.size, 0);
});

test('current-page aliases stay put while sections, queries, and modified links stay native', () => {
  const page = browser({ url: 'https://mms.test/about.html' });
  for (const href of ['/about', '/about/', '/about/index.html', '/about.html']) assert.equal(page.click(href), true);
  for (const [href, options] of [['/about.html#team', {}], ['/about.html?view=team', {}], ['/about.html', { ctrlKey: true }], ['/about.html', { metaKey: true }], ['/about.html', { button: 1 }]]) {
    assert.equal(page.click(href, options), false);
  }
  for (const options of [{ download: true }, { target: '_blank' }, { shiftKey: true }, { defaultPrevented: true }]) {
    const link = browser();
    link.click('/contact.html', options);
    assert.equal(link.storage.size, 0);
  }
  assert.equal(page.storage.size, 0);
});

test('native transitions, reduced motion, reloads, and history do not get a fallback slide', () => {
  for (const options of [{ native: true }, { reduced: true }, { type: 'reload' }, { type: 'back_forward' }]) {
    const page = browser({ url: 'https://mms.test/contact.html', referrer: 'https://mms.test/about.html', ...options });
    assert.equal(page.attributes.size, 0);
  }
  const page = browser({ url: 'https://mms.test/contact.html', referrer: 'https://mms.test/about.html' });
  page.events.pagehide();
  page.events.pageshow({ persisted: true });
  assert.equal(page.attributes.size, 0);
});

test('blocked storage still navigates; stale markers and external referrers do not animate', () => {
  const page = browser({ blockedStorage: true, url: 'https://mms.test/contact.html', referrer: 'https://mms.test/about.html' });
  assert.equal(page.attributes.get('data-page-entry'), 'slide');
  assert.equal(page.click('/offerings.html'), false);
  page.events.change();
  assert.equal(page.attributes.size, 0);
  const storage = new Map([['mms-page-entry', JSON.stringify({ destination: 'index', time: Date.now() - 16000 })]]);
  assert.equal(browser({ storage }).attributes.size, 0);
  assert.equal(browser({ referrer: 'https://external.test/about.html' }).attributes.size, 0);
});
