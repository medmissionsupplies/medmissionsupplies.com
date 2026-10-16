import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CAMPAIGN_KEY, CAMPAIGN_TTL, rememberCampaign, readCampaign, currentCampaign, captureCurrentCampaign, campaignPrivacyAllowed } from '../src/campaign-reference.mjs';
const makeStorage = () => {
  const data = new Map();
  return { getItem: k => data.get(k) ?? null, setItem: (k,v) => data.set(k,v), removeItem: k => data.delete(k) };
};
const tagged = '?utm_source=google&utm_medium=cpc&utm_campaign=msd_m01';
test('authorized campaign survives untagged navigation but expires without renewal', () => {
  const storage = makeStorage(), start = 100;
  rememberCampaign(tagged, storage, start);
  assert.equal(rememberCampaign('?equipment=Ultrasound', storage, start + 100), 'msd_m01');
  assert.equal(readCampaign(storage, start + CAMPAIGN_TTL), null);
});
test('stores only an allowlisted code and expiry, never raw query data', () => {
  const storage = makeStorage();
  rememberCampaign(tagged + '&gclid=secret&email=person@example.com&utm_term=sensitive', storage, 100);
  assert.deepEqual(JSON.parse(storage.getItem(CAMPAIGN_KEY)), {code:'msd_m01',expiresAt:100+CAMPAIGN_TTL});
});
test('an unrelated or duplicate campaign does not inherit stale attribution', () => {
  for (const query of ['?utm_campaign=other','?utm_source=meta&utm_medium=cpc&utm_campaign=msd_m01', tagged+'&utm_campaign=other']) {
    const storage = makeStorage(); rememberCampaign(tagged, storage, 100);
    assert.equal(rememberCampaign(query, storage, 101), null);
    assert.equal(readCampaign(storage, 102), null);
  }
});
test('corrupt, unapproved and artificially long-lived records fail closed', () => {
  for(const value of ['not json',JSON.stringify({code:'arbitrary',expiresAt:200}),JSON.stringify({code:'msd_m01',expiresAt:CAMPAIGN_TTL*10})]) {
    const storage=makeStorage(); storage.setItem(CAMPAIGN_KEY,value);
    assert.equal(readCampaign(storage,100),null);
  }
});
test('blocked browser storage and server rendering do not break the contact route', () => {
  const storage={getItem(){throw Error('blocked')},setItem(){throw Error('blocked')},removeItem(){throw Error('blocked')}};
  assert.doesNotThrow(()=>rememberCampaign(tagged,storage,100));
  assert.equal(readCampaign(storage,100),null);
  assert.equal(currentCampaign(),null);
});

test('existing organic links retain separate fixed references through the quote journey', () => {
  for (const [source, expected] of [['facebook','mms_facebook_organic'],['linkedin','mms_linkedin_organic']]) {
    const storage = makeStorage();
    const query = `?utm_source=${source}&utm_medium=organic_social&utm_campaign=medmission_organic_oct2026&utm_content=card_a`;
    assert.equal(rememberCampaign(query, storage, 100), expected);
    assert.equal(rememberCampaign('?equipment=ultrasound', storage, 101), expected);
    assert.deepEqual(JSON.parse(storage.getItem(CAMPAIGN_KEY)), {code:expected,expiresAt:100+CAMPAIGN_TTL});
    assert.equal(readCampaign(storage, 100+CAMPAIGN_TTL), null);
  }
});

test('a paid label cannot be assigned to organic traffic or an unknown source', () => {
  for (const query of [
    '?utm_source=facebook&utm_medium=organic_social&utm_campaign=msd_m01',
    '?utm_source=linkedin&utm_medium=cpc&utm_campaign=medmission_organic_oct2026',
    '?utm_source=unknown&utm_medium=organic_social&utm_campaign=medmission_organic_oct2026',
    '?utm_source=facebook&utm_source=linkedin&utm_medium=organic_social&utm_campaign=medmission_organic_oct2026',
  ]) {
    const storage=makeStorage(); rememberCampaign(tagged,storage,100);
    assert.equal(rememberCampaign(query,storage,101),null);
    assert.equal(readCampaign(storage,102),null);
  }
});

test('privacy signals remove stored references and do not attach one to inquiries', () => {
  const previous=globalThis.window;
  try {
    for (const navigator of [{globalPrivacyControl:true},{doNotTrack:'1'},{doNotTrack:'yes'}]) {
      const storage=makeStorage();
      globalThis.window={navigator,sessionStorage:storage,location:{search:tagged}};
      rememberCampaign(tagged,storage);
      assert.equal(currentCampaign(),null);
      assert.equal(storage.getItem(CAMPAIGN_KEY),null);
      captureCurrentCampaign();
      assert.equal(storage.getItem(CAMPAIGN_KEY),null);
      assert.equal(campaignPrivacyAllowed(navigator),false);
    }
    assert.equal(campaignPrivacyAllowed({doNotTrack:'0'}),true);
  } finally {
    if (previous === undefined) delete globalThis.window;
    else globalThis.window=previous;
  }
});

test('a failed organic replacement cannot retain an older paid reference', () => {
  const storage=makeStorage();
  rememberCampaign(tagged,storage,100);
  const writeBlocked={...storage,setItem(){throw Error('quota exceeded')}};
  assert.equal(rememberCampaign('?utm_source=facebook&utm_medium=organic_social&utm_campaign=medmission_organic_oct2026',writeBlocked,101),null);
  assert.equal(readCampaign(storage,102),null);
});
