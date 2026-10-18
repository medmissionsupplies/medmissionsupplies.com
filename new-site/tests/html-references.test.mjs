import test from 'node:test';
import assert from 'node:assert/strict';
import { localReference } from '../scripts/html-references.mjs';

test('rendered HTML entities do not turn external credits into local fragments', () => {
  assert.equal(localReference('https://commons.wikimedia.org/wiki/File:Children&#x27;s_photo.jpg', 'resources/pediatric-echo.html'), null);
  assert.equal(localReference('https://example.org/guide#section-1', 'articles.html'), null);
  assert.equal(localReference('mailto:team@example.org', 'articles.html'), null);
  assert.deepEqual(localReference('#sources', 'resources/quote-gaps.html'), { path: 'resources/quote-gaps.html', fragment: 'sources' });
  assert.deepEqual(localReference('/resources/quote-gaps.html?a=1&amp;b=2#section-4', 'articles.html'), { path: 'resources/quote-gaps.html', fragment: 'section-4' });
  assert.deepEqual(localReference('/assets/a%20b.webp', 'articles.html'), { path: 'assets/a b.webp', fragment: '' });
});
