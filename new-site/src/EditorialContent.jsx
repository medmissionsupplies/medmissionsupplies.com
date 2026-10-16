import React from 'react';
import { ArrowUpRight, Checkmark } from '@carbon/icons-react';
import { editorialSources } from './editorial-sources.mjs';
import ShareTools from './ShareTools.jsx';

export function Takeaways({ items = [] }) {
  if (!items.length) return null;
  return <div className="editorial-takeaways">
    <h2>The decision in brief</h2>
    <ol>{items.map((text, index) => <li key={text}><span aria-hidden="true">0{index + 1}</span><p>{text}</p></li>)}</ol>
  </div>;
}

export function SourceLinks({ ids = [] }) {
  if (!ids.length) return null;
  return <div className="editorial-inline-sources"><span>Reference:</span>{ids.map(id => {
    const source = editorialSources[id];
    return source && <a key={id} href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ArrowUpRight size={14} /></a>;
  })}</div>;
}

export function SourceNotes({ ids = [] }) {
  if (!ids.length) return null;
  return <details className="editorial-references">
    <summary>Sources & reading notes</summary>
    <p>Purchasing guidance for discussion with your clinical and technical teams. Manufacturer references describe example models, not equipment currently offered for sale.</p>
    <ul>{[...new Set(ids)].map(id => {
      const source = editorialSources[id];
      return source && <li key={id}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ArrowUpRight size={14} /></a>{source.checked && <span>Source checked {source.checked}</span>}</li>;
    })}</ul>
  </details>;
}

export function EquipmentEditorial({ item, listing, guideLinks }) {
  const path = `/equipment/${listing.id}.html`;
  return <section className="equipment-editorial content-width" aria-labelledby="equipment-guidance-title">
    <ShareTools path={path} title={item.socialTitle || item.title} summary={item.socialDescription || item.summary} />
    <div className="editorial-heading"><span className="editorial-kicker">The buying decision</span><h2 id="equipment-guidance-title">{item.title || `${listing.title}: what to compare`}</h2><p>{item.summary}</p></div>
    <Takeaways items={item.takeaways} />
    <div className="equipment-editorial-layout">
      <article className="editorial-chapters" aria-label={`${listing.title} purchasing guidance`}>
        {item.sections.map((section, index) => <section id={`buying-${index + 1}`} key={section.title}>
          <span className="chapter-number" aria-hidden="true">0{index + 1}</span><div><h3>{section.title}</h3><p>{section.text}</p><SourceLinks ids={section.sources} /></div>
        </section>)}
        <details className="editorial-service-note"><summary>Preparing a service request?</summary><p>{item.service}</p></details>
        <SourceNotes ids={item.sources} />
      </article>
      <aside className="editorial-checklist"><span className="editorial-kicker">Keep this with your quote</span><h3>Your comparison checklist</h3><ul>{item.checklist.map(text => <li key={text}><Checkmark size={20} /><span>{text}</span></li>)}</ul>
        {!!guideLinks.length && <div className="editorial-further"><h3>Explore the equipment</h3>{guideLinks.map(({guide, entry}) => <a key={entry.id} href={`/resources/${guide.id}.html#${entry.id}`}>{entry.title}<ArrowUpRight size={16} /></a>)}</div>}
      </aside>
    </div>
  </section>;
}
