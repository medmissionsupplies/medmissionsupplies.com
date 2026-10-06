import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CAMPAIGN_KEY, CAMPAIGN_TTL, rememberCampaign, readCampaign, currentCampaign } from '../src/campaign-reference.mjs';
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
