const normalize = value => String(value || '').toLowerCase().replace(/\bx[ -]?ray\b/g, 'xray');

export function matchesGuideSearch(item, query) {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  const text = normalize([item.title, item.summary, item.sheet?.title, item.sheet?.summary, item.searchTerms,
    ...(item.entries || []).flatMap(entry => [entry.title, entry.summary]),
  ].filter(Boolean).join(' '));
  const words = new Set(text.split(/[^a-z0-9]+/).filter(Boolean));
  return terms.every(term => /^[a-z0-9]{1,3}$/.test(term) ? words.has(term) : text.includes(term));
}
