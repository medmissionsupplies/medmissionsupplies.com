import React, { useEffect, useState } from 'react';
import { Copy, Share, ArrowUpRight, Download } from '@carbon/icons-react';
import { shareContent } from './sharing.mjs';

export default function ShareTools({ path, title, summary }) {
  const data = shareContent({ path, title, summary });
  const [native, setNative] = useState(false);
  const [status, setStatus] = useState('');
  const [manual, setManual] = useState('');
  useEffect(() => { setNative(typeof navigator.share === 'function'); }, []);
  useEffect(() => { setStatus(''); setManual(''); }, [path]);
  async function copy(value, message) {
    try {
      await navigator.clipboard.writeText(value);
      setManual(''); setStatus(message);
    } catch {
      setManual(value); setStatus('Select and copy the text below.');
    }
  }
  async function nativeShare() {
    try { await navigator.share({ title: data.title, text: data.text, url: data.url }); }
    catch (error) { if (error.name !== 'AbortError') setStatus('Use Copy link or choose a network below.'); }
  }
  return <div className="share-tools" aria-label="Share this guide">
    <span className="share-label">Worth passing on?</span>
    <button type="button" onClick={() => copy(data.url, 'Link copied.')}><Copy size={18} />Copy link</button>
    {native && <button type="button" onClick={nativeShare}><Share size={18} />Share</button>}
    <details className="share-networks">
      <summary><Share size={18} />Share this guide</summary>
      <div className="share-menu">
        {data.links.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight size={16} /></a>)}
        <button type="button" onClick={() => copy(data.caption, 'Post text and link copied.')}>Copy post text</button>
        {data.image && <a href={data.image} download>Save share image<Download size={16} /></a>}
      </div>
    </details>
    <span className="share-status" role="status">{status}</span>
    {manual && <label className="share-manual">Text to copy<textarea readOnly value={manual} onFocus={(event) => event.currentTarget.select()} /></label>}
  </div>;
}
