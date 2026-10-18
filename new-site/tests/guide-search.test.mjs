import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesGuideSearch } from '../src/guide-search.mjs';

test('short modality names do not match unrelated fragments of ordinary words', () => {
  assert.equal(matchesGuideSearch({title:'Equipment selection',summary:'Practical buying advice'}, 'CT'), false);
  assert.equal(matchesGuideSearch({title:'PET/CT: prove the tracer route'}, 'CT'), true);
  assert.equal(matchesGuideSearch({title:'Cardiac CT',summary:'Compare the complete package'}, 'package CT'), true);
  assert.equal(matchesGuideSearch({title:'Digital X-ray systems'}, 'x ray'), true);
  assert.equal(matchesGuideSearch({title:'Imaging guide',entries:[{title:'MRI systems'}]}, 'MRI'), true);
  assert.equal(matchesGuideSearch({title:'Infusion pumps'}, 'MRI'), false);
});
