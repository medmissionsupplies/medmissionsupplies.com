import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sendInquiry, CONTACT_ENDPOINT } from '../src/contact-service.mjs';

test('sends the original form fields to the existing MMS endpoint and accepts a successful response', async () => {
  const data = new FormData();
  data.set('name', 'Test User'); data.set('email', 'test@example.com'); data.set('message', 'Equipment inquiry');
  let calls = 0;
  await sendInquiry(data, { fetchImpl: async (url, options) => {
    calls++;
    assert.equal(url, CONTACT_ENDPOINT);
    assert.equal(options.method, 'POST');
    assert.equal(options.headers.Accept, 'application/json');
    assert.equal(options.body, data);
    return { ok: true };
  } });
  assert.equal(calls, 1);
});

test('propagates a rejected service response without altering the message', async () => {
  const data = new FormData(); data.set('message', 'Keep this message');
  await assert.rejects(sendInquiry(data, { fetchImpl: async () => ({ ok: false, status: 422 }) }), /did not accept/);
  assert.equal(data.get('message'), 'Keep this message');
});

test('propagates network failure so the interface cannot report false success', async () => {
  await assert.rejects(sendInquiry(new FormData(), { fetchImpl: async () => { throw new TypeError('Network unavailable'); } }), /Network unavailable/);
});

test('aborts a stalled submission to let the user retry', async () => {
  await assert.rejects(sendInquiry(new FormData(), { timeoutMs: 10, fetchImpl: (_, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => reject(new DOMException('Request timed out', 'AbortError')), { once: true });
  }) }), { name: 'AbortError' });
});
