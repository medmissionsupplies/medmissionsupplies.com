// First-party, session-only labels for approved paid and organic links.
// Never retain arbitrary URLs, ad click IDs, search terms or visitor identifiers.
export const CAMPAIGN_KEY = 'mms-campaign-reference';
export const CAMPAIGN_TTL = 30 * 60 * 1000;
const campaignRoutes = new Map([
  ['google/cpc/msd_m01', 'msd_m01'],
  ['facebook/organic_social/medmission_organic_oct2026', 'mms_facebook_organic'],
  ['linkedin/organic_social/medmission_organic_oct2026', 'mms_linkedin_organic'],
]);
const allowed = new Set(campaignRoutes.values());

export function campaignPrivacyAllowed(browserNavigator) {
  return browserNavigator?.globalPrivacyControl !== true
    && browserNavigator?.doNotTrack !== '1'
    && browserNavigator?.doNotTrack !== 'yes';
}

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
  const code = campaignRoutes.get(`${params.get('utm_source')}/${params.get('utm_medium')}/${params.get('utm_campaign')}`);
  const valid = Boolean(code)
    && ['utm_campaign', 'utm_source', 'utm_medium'].every(key => params.getAll(key).length === 1);
  try {
    if (valid) storage.setItem(CAMPAIGN_KEY, JSON.stringify({ code, expiresAt: now + CAMPAIGN_TTL }));
    else storage.removeItem(CAMPAIGN_KEY);
  } catch {
    // A rejected replacement must not leave an earlier paid label attached.
    try { storage.removeItem(CAMPAIGN_KEY); } catch { /* Storage remains unavailable. */ }
    return null;
  }
  return valid ? code : null;
}

export function currentCampaign() {
  try {
    if (!campaignPrivacyAllowed(window.navigator)) {
      window.sessionStorage.removeItem(CAMPAIGN_KEY);
      return null;
    }
    return readCampaign(window.sessionStorage);
  } catch { return null; }
}

export function captureCurrentCampaign() {
  try {
    if (!campaignPrivacyAllowed(window.navigator)) {
      window.sessionStorage.removeItem(CAMPAIGN_KEY);
      return;
    }
    rememberCampaign(window.location.search, window.sessionStorage);
  } catch { /* No browser storage. */ }
}
