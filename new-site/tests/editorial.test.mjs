import test from 'node:test';
import assert from 'node:assert/strict';
import { equipment } from '../src/catalog.mjs';
import { articles } from '../src/articles.mjs';
import { researchGuides } from '../src/research-guides.generated.mjs';
import { equipmentGuidance, opinionArticles } from '../src/editorial-guidance.mjs';
import { editorialSources } from '../src/editorial-sources.mjs';
import { guideLinksForEquipment } from '../src/buying-guides.mjs';
import { shareContent } from '../src/sharing.mjs';

test('every equipment category has substantive, sourced selection guidance', () => {
  assert.deepEqual(equipmentGuidance.map(g => g.id).sort(), equipment.map(e => e.id).sort());
  for (const guide of [...equipmentGuidance, ...opinionArticles]) {
    assert.equal(guide.takeaways.length, 3, guide.id);
    assert.equal(new Set(guide.takeaways).size, 3);
    assert.ok(guide.title && guide.socialTitle && guide.socialDescription, guide.id);
    assert.ok(guide.sections.length >= 4, guide.id);
    for (const section of guide.sections) {
      assert.ok(section.text.split(/\s+/).length >= 45, `${guide.id}: ${section.title}`);
      for (const source of section.sources) assert.ok(editorialSources[source], source);
    }
    for (const source of guide.sources) assert.ok(editorialSources[source], source);
    assert.ok(guide.checklist.length >= 4, guide.id);
  }
});

test('all five perspectives are integrated without losing existing resources', () => {
  assert.equal(articles.length, 15 + researchGuides.length);
  assert.equal(new Set(articles.map(a => a.id)).size, articles.length);
  for (const opinion of opinionArticles) {
    const article = articles.find(a => a.id === opinion.id);
    assert.ok(article.image && article.kind === 'opinion');
    assert.ok(article.sections.length >= 4, article.id);
    assert.equal(article.sectionSources.length, article.sections.length, article.id);
    for (const [index, [heading, text]] of article.sections.entries()) {
      assert.ok(heading && text.split(/\s+/).length >= 45, `${article.id}: ${heading}`);
      for (const source of article.sectionSources[index]) assert.ok(editorialSources[source], source);
    }
    for (const id of article.related) assert.ok(equipment.some(e => e.id === id));
  }
});

test('revised resource pages retain resolvable references and further reading', () => {
  for (const article of articles.filter(article => article.kind !== 'research-guide')) {
    for (const source of [...(article.sources || []), ...(article.sectionSources || []).flat()]) assert.ok(editorialSources[source], `${article.id}: ${source}`);
    for (const entry of article.entries || []) for (const source of entry.sources) assert.ok(editorialSources[source], `${article.id}/${entry.id}: ${source}`);
    for (const id of article.relatedArticles || []) assert.ok(articles.some(other => other.id === id && other.id !== article.id), `${article.id}: ${id}`);
  }
});

test('secondary learning topics are discoverable from their equipment pages', () => {
  assert.ok(guideLinksForEquipment('ekg').length >= 3);
  assert.ok(guideLinksForEquipment('laboratory').length >= 3);
  for (const item of equipment) assert.ok(guideLinksForEquipment(item.id).length > 0);
});

test('sharing uses clean production URLs and correctly encoded content', () => {
  const result = shareContent({ path: '/equipment/ultrasound.html?email=private#details', title: 'Probes & price?', summary: 'Compare before buying.' });
  assert.equal(result.url, 'https://medmissionsupplies.com/equipment/ultrasound.html');
  assert.equal(result.image, '/assets/social/equipment-ultrasound.jpg');
  assert.equal(shareContent({path:'/resources/the-price-of-a-working-service.html',title:'Compare'}).image, '/assets/social/article-the-price-of-a-working-service.jpg');
  assert.ok(result.caption.includes('Probes & price?\n\nCompare before buying.'));
  for (const [, link] of result.links) {
    assert.ok(!link.includes('private'));
    const parsed = new URL(link);
    assert.equal(parsed.protocol, 'https:');
    assert.ok([...parsed.searchParams.values()].some(v => v.includes(result.url)));
  }
  assert.throws(() => shareContent({ path: 'https://other.example/a', title: 'Wrong site' }));
});
