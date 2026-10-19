import React, { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Search, Checkmark } from "@carbon/icons-react";
import OptimizedImage from "./OptimizedImage.jsx";
import ShareTools from "./ShareTools.jsx";
import { equipment, equipmentUrl, photoUrl } from "./catalog.mjs";
import { researchGuides } from "./research-guide-index.generated.mjs";
import { articles } from "./articles.mjs";
import { matchesGuideSearch } from "./guide-search.mjs";

const resourceUrl = (item) => `/resources/${item.id}.html`;
const external = (url) => /^https?:\/\//i.test(url || "");
const sourceAnchor = (id) => `reference-${String(id).replace(/[^a-zA-Z0-9_-]/g, "-")}`;
const displayDate = (value) => {
  if (!value) return "";
  const date = new Date(`${String(value).slice(0, 10)}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
};

function GuideImage({ item, eager = false, className = "", sizes }) {
  if (!item.image) return null;
  return <OptimizedImage className={className} src={photoUrl(item.image)}
    alt={item.photo?.alt || item.photo?.caption || `${item.sheet?.title || item.title} equipment example`}
    style={{ objectFit: item.photo?.preventUpscaling ? "scale-down" : item.photo?.fit === "cover" ? "cover" : "contain" }}
    sizes={sizes || "(max-width: 620px) 92vw, (max-width: 950px) 45vw, 380px"}
    loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} />;
}

function References({ ids, sources }) {
  const matches = [...new Set(ids || [])].map(id => sources.find(s => s.id === id)).filter(s => s && external(s.url));
  if (!matches.length) return null;
  return <div className="rg-inline-references"><span>Sources:</span>{matches.map(source =>
    <a key={source.id} href={`#${sourceAnchor(source.id)}`}>{source.publisher || source.title}</a>
  )}</div>;
}

export function PhotoCredit({ photo, compact = false }) {
  if (!photo) return null;
  const caption = photo.captionContext || photo.caption;
  const normalized = (text) => String(text || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const additionalNote = photo.modelMatchNote && normalized(photo.modelMatchNote) !== normalized(caption) &&
    !normalized(caption).includes(normalized(photo.modelMatchNote)) ? photo.modelMatchNote : "";
  const content = <>
    {caption && <span className="rg-photo-caption">{caption}</span>}
    <span>{external(photo.sourcePage) ? <a href={photo.sourcePage} target="_blank" rel="noopener noreferrer">{photo.photographer || "Photo source"}</a> : photo.photographer}
      {photo.license && <> · {external(photo.licenseUrl) ? <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">{photo.license}</a> : photo.license}</>}</span>
    {photo.creditNote && <span>{photo.creditNote}</span>}
    {additionalNote && <details><summary>About this photograph</summary><p>{additionalNote}</p></details>}
  </>;
  return <figcaption className="rg-photo-credit">{compact ? <details><summary>Photo & credit</summary>{content}</details> : content}</figcaption>;
}

export function ResearchLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const isEquipmentGuide = item => item.librarySection === "equipment" || item.equipmentId;
  const guides = useMemo(() => researchGuides.filter(isEquipmentGuide), []);
  const decisions = useMemo(() => [
    ...researchGuides.filter(item => !isEquipmentGuide(item)),
    ...articles.filter(item => item.kind !== "research-guide").map(item => ({
      ...item, categoryId: item.department || "decisions",
    })),
  ], []);
  const categories = [...new Map(researchGuides.map(item => [item.categoryId, item.category])).entries()];
  const matches = item => (category === "all" || item.categoryId === category) && matchesGuideSearch(item, query);
  const visible = guides.filter(matches);
  const visibleDecisions = decisions.filter(matches);
  return <div className="rg-library content-width">
    <header className="rg-library-heading">
      <div><span className="rg-kicker">The MMS Equipment Compendium</span><h1>Equipment buying guides.</h1>
        <p>What to choose, where to spend, and what to check before you buy. Start with the equipment your hospital needs.</p></div>
    </header>
    <section className="rg-equipment-library" aria-labelledby="rg-equipment-heading">
      <div className="rg-library-controls">
        <h2 id="rg-equipment-heading">Find a guide</h2>
        <div className="rg-filter-fields">
          <label className="rg-search"><span className="rg-visually-hidden">Search all buying guides</span><Search size={19} aria-hidden="true" />
            <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Equipment or buying question" />
          </label>
          <label className="rg-category"><span className="rg-visually-hidden">Filter guides by topic</span>
            <select value={category} onChange={event => setCategory(event.target.value)}><option value="all">All topics</option>
              {categories.map(([id, name]) => <option key={id} value={id}>{name}</option>)}
            </select>
          </label>
        </div>
      </div>
      <p className="rg-result-count" role="status">{visible.length + visibleDecisions.length} guides & articles{category !== "all" || query ? " found" : " · Equipment, buying decisions & ownership"}</p>
      <div className="rg-guide-grid">{visible.map(item => <article className="rg-guide-card" key={item.id}>
        <a href={resourceUrl(item)}><div className="rg-guide-card-photo"><GuideImage item={item} /></div>
          <div className="rg-guide-card-copy"><span className="rg-card-category">{item.category}</span><h3>{item.sheet?.title || item.title}</h3>
            <p>{item.sheet?.summary || item.summary}</p><span className="rg-card-link">Read the guide <ArrowRight size={18} aria-hidden="true" /></span></div>
        </a>
      </article>)}</div>
      {!visible.length && !visibleDecisions.length && <div className="rg-no-results"><h3>No guides match that search.</h3><p>Try an equipment name, or view all topics.</p><button type="button" onClick={() => { setQuery(""); setCategory("all"); }}>Show all guides</button></div>}
    </section>
    {!!visibleDecisions.length && <section className="rg-decision-library" aria-labelledby="rg-decisions-heading">
      <div className="rg-section-heading"><span className="rg-kicker">Go deeper</span><h2 id="rg-decisions-heading">Solve the next buying decision.</h2><p>Compare specific equipment packages, plan the installation, and weigh the costs of keeping a service running.</p></div>
      <div className="rg-decision-grid">{visibleDecisions.map((item, index) => <article className="rg-decision-card" key={item.id}>
        <a href={resourceUrl(item)}><span className="rg-decision-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div><h3>{item.title}</h3><p>{item.sheet?.summary || item.summary}</p><span className="rg-card-link">{item.kind === "opinion" ? "Read the perspective" : "Read the guide"} <ArrowRight size={18} aria-hidden="true" /></span></div>
        </a>
      </article>)}</div>
    </section>}
    <aside className="rg-library-note"><h2>Advice built around a working service.</h2><p>Our guides compare clinical fit, complete costs and practical support. Manufacturer specifications, dated supplier offers and published guidance are linked in each article. Confirm the exact package and local service before ordering.</p><a href="/contact.html?topic=procure">Discuss your equipment list <ArrowUpRight size={17} aria-hidden="true" /></a></aside>
  </div>;
}

function AtAGlance({ item, sources }) {
  const sheet = item.sheet;
  if (!sheet) return null;
  const broadClinicalGroups = new Set(["oxygen", "neonatal", "laboratory", "point-of-care", "clinical-essentials"]);
  const alternativeLabel = broadClinicalGroups.has(item.equipmentId || item.research?.id) ? "Consider alternatives when" : "Spend more when";
  const points = [["Start here", sheet.firstChoice], [alternativeLabel, sheet.upgradeWhen], ["Watch the budget", sheet.budgetWatch], ["Check the support", sheet.supportCheck]].filter(([, text]) => text);
  return <section className="rg-at-a-glance" aria-labelledby="rg-glance-heading" id="guide-sheet">
    <div className="rg-sheet-heading"><div><span className="rg-kicker">Your buying summary</span><h2 id="rg-glance-heading">The decision at a glance.</h2></div></div>
    <dl className="rg-sheet-points">{points.map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl>
    {!!sheet.askSupplier?.length && <div className="rg-sheet-questions"><h3>Questions for your quote</h3><ol>{sheet.askSupplier.map((question, index) => <li key={index}>{question}</li>)}</ol></div>}
    <References ids={sheet.sourceIds} sources={sources} />
  </section>;
}

function ModelComparison({ research, sources }) {
  if (!research.quickCompare?.length && !research.choices?.length) return null;
  const fields = [["Best for", "bestFor"], ["Why consider it", "why"], ["The trade-off", "tradeoff"], ["Price & package", "price"], ["Support", "support"]];
  const shared = new Map(fields.filter(([, key]) => research.choices?.length > 1 &&
    research.choices[0][key] && research.choices.every(choice => choice[key] === research.choices[0][key]))
    .map(([label, key]) => [key, { label, text: research.choices[0][key] }]));
  return <section className="rg-models" id="model-comparison" aria-labelledby="rg-models-heading"><h2 id="rg-models-heading">Compare the options.</h2>
    {!!research.quickCompare?.length && <div className="rg-comparison">{research.quickCompare.map((option, index) => <div className="rg-comparison-row" key={index}>
      <h3>{option.option}</h3><dl><div><dt>Capability</dt><dd>{option.capability}</dd></div><div><dt>Best fit</dt><dd>{option.bestFit}</dd></div><div><dt>Cost to watch</dt><dd>{option.costDriver}</dd></div></dl>
    </div>)}</div>}
    {!!research.choices?.length && <details className="rg-model-details"><summary>{research.kind === "feature" ? "Option notes, costs & support" : "Model notes, pricing & support"} <span>{research.choices.length} options</span></summary>
      <div>{shared.size > 0 && <div className="rg-model-note rg-shared-comparison"><h3>For every option</h3><dl>{[...shared.values()].map(({ label, text }) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl></div>}
      {research.choices.map((choice, index) => <section className="rg-model-note" key={index}><h3>{choice.model}</h3>{choice.position && <p className="rg-model-position">{choice.position}</p>}
        <dl>{fields.filter(([, key]) => choice[key] && !shared.has(key)).map(([label, key]) => <div key={key}><dt>{label}</dt><dd>{choice[key]}</dd></div>)}</dl>
        <References ids={choice.sourceIds} sources={sources} />
      </section>)}</div>
    </details>}
  </section>;
}

function BuyingVisual({ visual }) {
  if (visual?.type !== "cost-comparison" || !visual.rows?.length || !visual.columns?.length) return null;
  const maximum = Math.max(...visual.rows.flatMap(row => row.values));
  const amount = new Intl.NumberFormat("en-US", { style: "currency", currency: visual.unit || "USD", maximumFractionDigits: 0 });
  return <figure className="rg-buying-visual">
    <h3>{visual.title}</h3>
    <div className="rg-visual-scroll" role="region" aria-label={visual.title} tabIndex={0}>
      <table><thead><tr><th scope="col">{visual.rowHeader || "Package"}</th>{visual.columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr></thead>
        <tbody>{visual.rows.map(row => <tr key={row.label}><th scope="row">{row.label}</th>{row.values.map((value, index) => <td key={index}>
          <span className="rg-value-bar" aria-hidden="true" style={{ width: `${maximum ? value / maximum * 100 : 0}%` }} /><strong>{amount.format(value)}</strong>
        </td>)}</tr>)}</tbody></table>
    </div>
    <figcaption>{visual.caption}</figcaption>
  </figure>;
}

export function ResearchArticle({ item }) {
  if (!item) return null;
  const research = item.research || {};
  const sources = research.sources || [];
  const publicSources = sources.filter(source => external(source.url));
  const sections = item.sections || [];
  const reviewed = displayDate(item.reviewedAt);
  const related = (item.related || []).map(id => equipment.find(entry => entry.id === id)).filter(Boolean);
  const listing = equipment.find(entry => entry.id === item.equipmentId);
  const inquiryUrl = '/contact.html?' + new URLSearchParams({ topic: 'procure', ...(listing ? { equipment: listing.title } : { guide: item.id }) });
  const specialistTopics = {
    xray: ["c-arm-detectors", "dr-retrofit", "pacs-image-workflow"],
    "ct-mri": ["ct-tube-budget", "mri-site-readiness", "end-of-support"],
    ultrasound: ["ultrasound-probes", "pacs-image-workflow"],
    infusion: ["infusion-consumables", "replacement-parts"],
    sterilization: ["sterile-processing-workflow", "equipment-handover"],
    oxygen: ["facility-oxygen", "equipment-power"],
    laboratory: ["equipment-software-support", "maintenance-records"],
    anesthesia: ["equipment-power", "equipment-handover"],
  };
  const parentTopics = {
    "c-arm-detectors": "xray", "dr-retrofit": "xray",
    "ct-tube-budget": "ct-mri", "mri-site-readiness": "ct-mri", "ultrasound-probes": "ultrasound",
  };
  const articleKey = item.research?.id || item.key || item.id;
  const relatedTopicKeys = specialistTopics[item.equipmentId] || [];
  const findGuide = (key) => researchGuides.find(guide => guide.id === key || guide.key === key || guide.research?.id === key);
  const focusedGuides = relatedTopicKeys.map(findGuide).filter(Boolean);
  if (parentTopics[articleKey]) {
    const parent = researchGuides.find(guide => guide.equipmentId === parentTopics[articleKey]);
    if (parent) focusedGuides.push(parent);
  }
  if (item.equipmentId && focusedGuides.length < 3) {
    const serviceGuide = findGuide("service-contracts");
    if (serviceGuide) focusedGuides.push(serviceGuide);
  }
  focusedGuides.push(...(research.related || []).map(findGuide).filter(Boolean));
  const relatedGuides = [...new Map(focusedGuides.filter(guide => guide.id !== item.id).map(guide => [guide.id, guide])).values()].slice(0, 3);
  const hasModels = !!research.quickCompare?.length || !!research.choices?.length;
  return <div className="rg-article content-width">
    <a className="rg-back" href="/articles.html"><ArrowRight size={16} aria-hidden="true" />Equipment buying guides</a>
    <header className={`rg-article-heading${item.image ? " rg-with-photo" : ""}`}>
      <div className="rg-article-title"><span className="rg-kicker">{item.category || "Equipment buying advice"}{item.minutes ? ` · ${item.minutes} min read` : ""}</span><h1>{item.title}</h1><p>{item.summary}</p>
        {reviewed && <span className="rg-reviewed">Editorially reviewed <time dateTime={String(item.reviewedAt).slice(0, 10)}>{reviewed}</time></span>}
      </div>
      {item.image && <figure className="rg-article-photo"><div><GuideImage item={item} eager sizes="(max-width: 760px) 92vw, 470px" /></div><PhotoCredit photo={item.photo} /></figure>}
    </header>
    <AtAGlance item={item} sources={sources} />
    <ShareTools path={resourceUrl(item)} title={research.social?.title || item.title} summary={research.social?.description || item.summary} />
    <div className="rg-article-layout">
      <article className="rg-article-body" aria-label="Full equipment guide">
        {sections.map(([heading, text], index) => {
          const section = research.sections?.[index];
          const paragraphs = section?.paragraphs || String(text || "").split(/\n\s*\n/).filter(Boolean);
          const showVisual = research.visual?.insertAfterHeading ? heading === research.visual.insertAfterHeading : index === 3;
          return <React.Fragment key={`${heading}-${index}`}><section className="rg-body-section" id={`section-${index + 1}`}><h2>{heading}</h2>{paragraphs.map((paragraph, pIndex) => <p key={pIndex}>{paragraph}</p>)}<References ids={section?.sourceIds} sources={sources} /></section>{showVisual && <BuyingVisual visual={research.visual} />}</React.Fragment>;
        })}
        <ModelComparison research={research} sources={sources} />
        {research.ownership && <section className="rg-ownership" id="ownership-cost"><span className="rg-kicker">Beyond the purchase price</span><h2>Budget for the complete service.</h2>
          {research.ownership.equation && <p>{research.ownership.equation}</p>}
          {!!research.ownership.drivers?.length && <ul>{research.ownership.drivers.map((driver, index) => <li key={index}>{driver}</li>)}</ul>}
        </section>}
        {!!research.checklist?.length && <section className="rg-checklist" id="purchase-checklist"><h2>Before you commit.</h2><ul>{research.checklist.map((text, index) => <li key={index}><Checkmark size={19} aria-hidden="true" /><span>{text}</span></li>)}</ul></section>}
        {(research.questions?.length > 0 || research.gaps?.length > 0 || research.legacy?.assessment) && <details className="rg-evidence-notes"><summary>Further checks & evidence limits</summary>
          {!!research.questions?.length && <><h3>Questions to resolve</h3><ul>{research.questions.map((text, index) => <li key={index}>{text}</li>)}</ul></>}
          {!!research.gaps?.length && <><h3>What the evidence does not establish</h3><ul>{research.gaps.map((text, index) => <li key={index}>{text}</li>)}</ul></>}
          {research.legacy?.assessment && <><h3>Earlier equipment recommendations</h3><p>{research.legacy.assessment}</p></>}
        </details>}
        <GuideInquiry href={inquiryUrl} />
        {!!publicSources.length && <section className="rg-source-list" id="sources"><h2>Sources & supporting evidence.</h2><p className="rg-sources-intro">The specifications and guidance behind this comparison. Confirm the current configuration, support and delivered cost for any equipment you are considering.</p>
          <ol>{publicSources.map(source => <li id={sourceAnchor(source.id)} key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<ArrowUpRight size={14} aria-hidden="true" /></a><span>{source.publisher}{source.kind ? ` · ${source.kind}` : ""}{source.accessed ? ` · checked ${displayDate(source.accessed)}` : ""}</span>{source.evidence && <p>{source.evidence}</p>}</li>)}</ol>
        </section>}
      </article>
      <aside className="rg-article-aside"><nav aria-label="On this page"><h2>In this guide</h2>{item.sheet && <a href="#guide-sheet">The decision at a glance</a>}{sections.map(([heading], index) => <a href={`#section-${index + 1}`} key={index}>{heading}</a>)}{hasModels && <a href="#model-comparison">Compare the options</a>}{research.ownership && <a href="#ownership-cost">Whole-service costs</a>}{!!publicSources.length && <a href="#sources">Sources & evidence</a>}</nav>
        {!!relatedGuides.length && <div className="rg-related"><h2>More on this purchase</h2>{relatedGuides.map(guide => <a key={guide.id} href={resourceUrl(guide)}>{guide.sheet?.title || guide.title}<ArrowRight size={15} aria-hidden="true" /></a>)}</div>}
        {!!related.length && <div className="rg-related"><h2>Equipment & support</h2>{related.map(listing => <a key={listing.id} href={equipmentUrl(listing)}>{listing.title}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</div>}
      </aside>
    </div>
  </div>;
}

export function GuideInquiry({ href }) {
  return <aside className="rg-article-contact" aria-label="Discuss this purchase with MMS">
    <h2>Compare your options with MMS.</h2>
    <p>Share your equipment list, destination and budget. We can help you compare the complete package and plan your next step.</p>
    <a className="mms-action" href={href}>Discuss this purchase with MMS <ArrowUpRight size={18} aria-hidden="true" /></a>
  </aside>;
}
