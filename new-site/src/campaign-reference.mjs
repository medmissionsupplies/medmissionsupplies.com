// First-party, session-only label for the single authorized acquisition test.
// Never retain arbitrary URLs, ad click IDs, search terms or visitor identifiers.
export const CAMPAIGN_KEY = 'mms-campaign-reference';
export const CAMPAIGN_TTL = 30 * 60 * 1000;
const allowed = new Set(['msd_m01']);

export function readCampaign(storage, now = Date.now()) {
  try {
    const entry = JSON.parse(storage.getItem(CAMPAIGN_KEY) || 'null');
    if (entry && allowed.has(entry.code) && Number.isFinite(entry.expiresAt)
      && entry.expiresAt > now && entry.expiresAt <= now + CAMPAIGN_TTL) return entry.code;
    storage.removeItem(CAMPAIGN_KEY);
  } catch { /* Unavailable storage must never interrupt an inquiry. */ }
  return null;
}

export function rememberCampaign(search, storage, now = Date.now()) {
  const params = new URLSearchParams(search);
  if (!params.has('utm_campaign') && !params.has('utm_source') && !params.has('utm_medium'))
    return readCampaign(storage, now);
  const code = params.get('utm_campaign');
  const valid = allowed.has(code) && params.get('utm_source') === 'google'
    && params.get('utm_medium') === 'cpc'
    && ['utm_campaign', 'utm_source', 'utm_medium'].every(key => params.getAll(key).length === 1);
  try {
    if (valid) storage.setItem(CAMPAIGN_KEY, JSON.stringify({ code, expiresAt: now + CAMPAIGN_TTL }));
    else storage.removeItem(CAMPAIGN_KEY);
  } catch { /* Fail closed; the form remains usable without attribution. */ }
  return valid ? code : null;
}

export function currentCampaign() {
  try { return readCampaign(window.sessionStorage); } catch { return null; }
}

export function captureCurrentCampaign() {
  try { rememberCampaign(window.location.search, window.sessionStorage); } catch { /* No browser storage. */ }
}
