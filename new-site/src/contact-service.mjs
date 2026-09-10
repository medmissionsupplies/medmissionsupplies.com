export const CONTACT_ENDPOINT = 'https://formspree.io/f/xkgrvweb';

/** Submit through the existing MMS form service. A rejected request never clears user input. */
export async function sendInquiry(data, { fetchImpl = globalThis.fetch, timeoutMs = 20000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(CONTACT_ENDPOINT, {
      method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal,
    });
    if (!response.ok) throw new Error('The form service did not accept the message.');
  } finally {
    clearTimeout(timer);
  }
}
