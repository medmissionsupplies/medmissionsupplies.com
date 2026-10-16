const origin = 'https://medmissionsupplies.com';

export function shareContent({ path, title, summary = '' }) {
  const url = new URL(path, origin);
  if (url.origin !== origin) throw new Error('Share destination must be an MMS page');
  url.search = '';
  url.hash = '';
  const canonical = url.href;
  const articlePath = url.pathname.match(/^\/(equipment|resources)\/([a-z0-9-]+)\.html$/);
  const image = articlePath ? `/assets/social/${articlePath[1] === 'resources' ? 'article' : 'equipment'}-${articlePath[2]}.jpg` : null;
  const caption = `${title}\n\n${summary}\n\n${canonical}`;
  return {
    title, text: summary, url: canonical, caption, image,
    links: [
      ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}`],
      ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}`],
      ['WhatsApp', `https://wa.me/?text=${encodeURIComponent(`${title}\n${canonical}`)}`],
      ['X', `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(canonical)}`],
    ],
  };
}
