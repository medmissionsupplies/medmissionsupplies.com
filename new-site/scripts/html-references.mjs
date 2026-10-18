const entities = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' };

export function localReference(attribute, file) {
  const decoded = attribute.replace(/&#(?:x([0-9a-f]+)|([0-9]+));|&(amp|quot|apos|lt|gt);/gi,
    (_, hex, decimal, named) => named ? entities[named.toLowerCase()] : String.fromCodePoint(parseInt(hex || decimal, hex ? 16 : 10)));
  const url = new URL(decoded, `https://mms.invalid/${file}`);
  if (url.origin !== 'https://mms.invalid') return null;
  return { path: decodeURIComponent(url.pathname.slice(1)), fragment: decodeURIComponent(url.hash.slice(1)) };
}
