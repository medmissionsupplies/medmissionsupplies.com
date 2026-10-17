import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { equipment, photoUrl } from '../src/catalog.mjs';
import { researchGuides } from '../src/research-guides.generated.mjs';
import { articles } from '../src/articles.mjs';

const publicRoot = resolve(import.meta.dirname, '../public');
test('every equipment listing has one original, sourced buying guide and printable sheet', () => {
  assert.equal(researchGuides.length, 46);
  const expected = [...equipment.map(e => e.id+'-buying-guide'), 'free-equipment','quote-gaps','hospital-ready','repair-or-replace','one-or-two','c-arm-detectors','ct-tube-budget','ultrasound-probes','service-contracts','mri-site-readiness','dr-retrofit'];
  expected.push('pacs-image-workflow','equipment-power','replacement-parts','equipment-shipping','end-of-support','rent-or-buy','equipment-handover','maintenance-records','infusion-consumables','sterile-processing-workflow','facility-oxygen','equipment-software-support');
  assert.deepEqual(researchGuides.map(g => g.id).sort(), expected.sort());
  assert.deepEqual(researchGuides.filter(g => g.equipmentId).map(g => g.equipmentId).sort(), equipment.map(e => e.id).sort());
  assert.equal(new Set(researchGuides.map(g => g.id)).size, researchGuides.length);
  for (const g of researchGuides) {
    assert.ok(articles.some(a => a.id === g.id), g.id);
    const sources = new Set(g.research.sources.map(s => s.id));
    assert.equal(sources.size, g.research.sources.length, g.id + ': duplicate source IDs');
    for (const field of ['title', 'summary', 'firstChoice', 'upgradeWhen', 'budgetWatch', 'supportCheck']) assert.ok(g.sheet[field]?.trim(), g.id + ': ' + field);
    assert.equal(g.sheet.askSupplier.length, 3, g.id);
    assert.equal(new Set(g.sheet.askSupplier).size, 3, g.id);
    assert.ok(g.sheet.sourceIds.length > 0, g.id);
    const references = [...g.sheet.sourceIds, ...g.research.sections.flatMap(s => s.sourceIds || []), ...g.research.choices.flatMap(c => c.sourceIds || [])];
    for (const ref of references) assert.ok(sources.has(ref), g.id + ': missing source ' + ref);
    for (const source of g.research.sources) assert.match(source.url, /^(https:\/\/|archive:historical-equipment-material$)/, g.id);
    assert.ok(existsSync(resolve(publicRoot, photoUrl(g.image).slice(1))), g.id + ': missing photograph');
    assert.ok(g.photo.caption && g.photo.license && g.photo.sourcePage, g.id + ': missing photo attribution');
    const pdf=readFileSync(resolve(publicRoot, 'guidesheets', g.id+'.pdf'));
    assert.equal(pdf.subarray(0, 5).toString(), '%PDF-', g.id + ': missing PDF');
  }
  assert.ok(existsSync(resolve(publicRoot, 'guidesheets/mms-buying-guide-sheets.pdf')));
});

test('public research excludes legacy branding, local paths and fabricated availability claims', () => {
  const content=JSON.stringify(researchGuides);
  assert.doesNotMatch(content, /giving\s*tree|C:\\|C:\/Users|localhost|127\.0\.0\.1/i);
  for(const g of researchGuides) {
    assert.ok(g.research.sections.length >= 3, g.id);
    assert.ok((g.research.checklist ?? g.research.questions)?.length >= 3, g.id);
    assert.match(g.reviewedAt, /^2026-10-1[67]$/);
  }
});
