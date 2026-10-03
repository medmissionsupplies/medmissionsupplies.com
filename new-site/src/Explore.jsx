import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Scan,
  Favorite,
  Microscope,
  Hospital,
  Tools,
  Checkmark,
} from "@carbon/icons-react";
import {
  categories,
  equipment,
  categoryFor,
  equipmentUrl,
  photoUrl,
  filterEquipment,
  catalogState,
} from "./catalog.mjs";
import {
  articles,
  articleUrl,
} from "./articles.mjs";
import approvedComments from "./approved-comments.json";
import { commentFormData, validateComment } from "./comments.mjs";
import { CONTACT_ENDPOINT, sendInquiry } from "./contact-service.mjs";
import { referencePhotos } from "./reference-photos.mjs";
import { buyingGuides, guideForEquipment } from "./buying-guides.mjs";
import { guideSources } from "./guide-sources.mjs";

const icons = {
  imaging: Scan,
  surgical: Tools,
  "critical-care": Favorite,
  diagnostics: Microscope,
  hospital: Hospital,
};
export function Action({ children, href, secondary = false }) {
  return (
    <a className={`mms-action${secondary ? " secondary" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={20} />
    </a>
  );
}
export function Photo({ name, className = "", eager = false, alt }) {
  const descriptions = {
    ultrasound: "Ultrasound system in an examination room",
    anesthesia: "Anesthesia workstation and patient monitor in a hospital",
    "operating-room": "Procedure room with an examination table and lighting",
    laboratory: "Laboratory instruments and a technician’s gloved hand",
    "equipment-detail": "Controls and keyboard of an ultrasound system",
    xray: "C-arm X-ray system beside a radiolucent operating table",
    "ct-mri": "MRI scanner and patient table in an imaging room",
    endoscopy: "Endoscopy tower and examination equipment in a procedure room",
    ventilators: "Hospital ventilator with screen and breathing circuit",
    ekg: "Patient monitor with display and controls",
    neonatal: "Empty infant incubator on a wheeled stand",
    sterilization: "Stainless steel hospital autoclave",
    beds: "Adjustable hospital bed with side rails and controls",
    dialysis: "Dialysis machine with display and fluid-handling components",
    refrigeration: "Refrigerator used in vaccine-temperature research",
    histology: "Leica rotary microtome for specimen sectioning",
  };
  const dimensions = {
    xray: [3872, 2592],
    "ct-mri": [2254, 2056],
    endoscopy: [2978, 2036],
    ventilators: [1129, 1096],
    ekg: [3264, 2448],
    neonatal: [4363, 3823],
    sterilization: [1811, 2717],
    beds: [3264, 2448],
  };
  const [width, height] =
    dimensions[name] ?? (name === "ultrasound" ? [1000, 667] : [1100, 1650]);
  return (
    <img
      className={className}
      data-photo={name}
      src={photoUrl(name)}
      alt={alt ?? referencePhotos[name]?.alt ?? descriptions[name]}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
    />
  );
}
export function SectionHead({ title, href, link }) {
  return (
    <div className="section-heading-row">
      <h2>{title}</h2>
      {href && (
        <a className="text-link" href={href}>
          {link}
          <ArrowRight size={20} />
        </a>
      )}
    </div>
  );
}

export function EquipmentCard({ item }) {
  const Icon = icons[item.category];
  return (
    <article className="catalog-card" id={item.id}>
      <a href={equipmentUrl(item)} aria-label={"Explore " + item.title}>
        <div
          className={
            "card-image" + (!item.image ? " equipment-illustration" : "")
          }
        >
          {item.image ? <Photo name={item.image} /> : <Icon size={64} />}
        </div>
        <div className="card-copy">
          <h3>{item.title}</h3>
          <ArrowUpRight size={20} />
          <p>{item.summary}</p>
        </div>
      </a>
    </article>
  );
}

export function ArticleCard({ item }) {
  const invitations = {
    imaging: ["Imaging", "Which imaging system fits your hospital?", "Explore imaging"],
    surgical: ["Surgery", "Build a theatre that works together.", "Explore surgical equipment"],
    "critical-care": ["Patient care", "What does your bedside setup need?", "Explore patient care"],
    diagnostics: ["Diagnostics", "Look beyond the analyzer’s price.", "Explore diagnostics"],
    hospital: ["Hospital essentials", "Plan the systems behind the care.", "Explore the essentials"],
  };
  const [label, title, action] = invitations[item.department] ?? [
    "Mission clinics", "What belongs in your clinic?", "Plan your clinic",
  ];
  return (
    <article className="resource-card">
      <a href={articleUrl(item)}>
        <div className="resource-image">
          <Photo name={item.image} />
        </div>
        <div className="resource-copy">
          <div className="article-meta"><span>{label}</span></div>
          <h3>{title}</h3>
          <p>{item.summary}</p>
          <span className="card-invitation">{action}<ArrowUpRight size={20} /></span>
        </div>
      </a>
    </article>
  );
}

export function NewHome() {
  return (
    <>
      <section className="home-intro content-width">
        <div className="home-intro-copy">
          <h1>
            More care.
            <br />
            <span>Within reach.</span>
          </h1>
          <p>
            Quality equipment for almost every hospital department, at wholesale
            and charitable prices. We procure it, support it, and service it.
          </p>
          <div className="quote-assurance"><Checkmark size={18} />Lowest quote guaranteed.</div>
          <div className="action-row">
            <Action href="/offerings.html">Find equipment</Action>
            <Action href="/contact.html" secondary>
              Get a quote
            </Action>
          </div>
        </div>
        <div className="home-intro-image">
          <Photo name="anesthesia" eager />
        </div>
      </section>
      <section
        className="home-equipment content-width"
        aria-labelledby="home-equipment-heading"
      >
        <div className="section-heading-row">
          <h2 id="home-equipment-heading">What do you need?</h2>
          <a className="text-link" href="/offerings.html?category=all">
            View all equipment
            <ArrowRight size={20} />
          </a>
        </div>
        <div className="category-grid">
          {categories.map((category) => {
            const photo = {
              imaging: "reference/ultrasound-portable",
              surgical: "reference/anesthesia-workstation",
              "critical-care": "reference/patient-monitor",
              diagnostics: "reference/chemistry",
              hospital: "reference/autoclave",
            }[category.id];
            return (
              <a
                key={category.id}
                className="category-tile"
                href={"/offerings.html?category=" + category.id}
              >
                <div className="category-photo"><Photo name={photo} /></div>
                <h3>{category.name}</h3>
                <ArrowUpRight size={20} />
              </a>
            );
          })}
        </div>
      </section>
      <AdvisoryOptions />
    </>
  );
}

export function AdvisoryOptions() {
  return (
    <section className="advisory-options content-width" aria-label="Free equipment advice and purchasing support">
      <a className="advisory-card" href="/contact.html?topic=physician">
        <span className="advisory-label">Complimentary consultation</span>
        <h2>Physician to physician.</h2>
        <p>Speak directly with a physician about equipment choices and your department’s needs. Free of charge.</p>
        <span className="text-link">Request a consultation <ArrowUpRight size={18} /></span>
      </a>
      <a className="advisory-card" href="/contact.html?topic=materials">
        <span className="advisory-label">Complimentary support</span>
        <h2>Materials management.</h2>
        <p>Get free help with equipment lists, sourcing, and purchasing decisions for your facility.</p>
        <span className="text-link">Discuss your equipment needs <ArrowUpRight size={18} /></span>
      </a>
    </section>
  );
}

export function ExploreHero({
  title,
  description,
  back,
  backLabel,
  image = "equipment-detail",
  compact = false,
  action,
}) {
  return (
    <header
      className={`page-banner content-width${compact ? " compact-banner" : ""}`}
    >
      <div className="page-banner-copy">
        {back && (
          <a className="back-link" href={back}>
            <ArrowRight size={16} />
            {backLabel}
          </a>
        )}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {action && <Action href={action[1]}>{action[0]}</Action>}
      </div>
      <div className="page-banner-media">
        <Photo name={image} eager />
      </div>
    </header>
  );
}

function useFilters(search) {
  const parse = catalogState;
  const [filters, setFilters] = useState(() => parse(search));
  useEffect(() => {
    const sync = () => setFilters(parse(window.location.search));
    if (search === undefined) sync();
    else setFilters(parse(search));
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [search]);
  function update(next) {
    const value = { ...filters, ...next };
    setFilters(value);
    const url = new URL(window.location.href);
    url.searchParams.set("category", value.category);
    value.query
      ? url.searchParams.set("q", value.query)
      : url.searchParams.delete("q");
    url.hash = "";
    window.history.replaceState(window.history.state, "", url);
  }
  return [filters, update];
}
export function EquipmentCatalog({ search }) {
  const [filters, update] = useFilters(search);
  const results = filterEquipment(filters);
  const buyingGuide = buyingGuides.find(
    (guide) => guide.department === filters.category,
  );
  return (
    <>
      <ExploreHero
        title="What will you equip next?"
        description="One replacement or a whole department. Explore the options, then tell us what you need."
        image="anesthesia"
      />
      <section className="content-width catalog-section">
        <div className="filter-tabs" aria-label="Equipment categories">
          {[...categories, { id: "all", name: "All equipment" }].map(
            (category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={filters.category === category.id}
                onClick={() => update({ category: category.id })}
              >
                {category.name}
                <span>
                  {category.id === "all"
                    ? equipment.length
                    : equipment.filter((item) => item.category === category.id)
                        .length}
                </span>
              </button>
            ),
          )}
        </div>
        <div className="catalog-context">
          <p className="results-count" role="status">
            {results.length} equipment {results.length === 1 ? "area" : "areas"}
            {filters.category !== "all"
              ? ` in ${categoryFor(filters.category).name}`
              : ""}
          </p>
          {buyingGuide && (
            <a className="text-link" href={articleUrl(buyingGuide)}>
              What to know before you buy <ArrowUpRight size={18} />
            </a>
          )}
        </div>
        <noscript>
          <p>
            Enable JavaScript to switch departments, or browse every equipment
            page in the links below.
          </p>
          <ul>
            {equipment.map((item) => (
              <li key={item.id}>
                <a href={equipmentUrl(item)}>{item.title}</a>
              </li>
            ))}
          </ul>
        </noscript>
        <div className="catalog-grid">
          {results.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
        {!results.length && (
          <div className="empty-results">
            <Search size={32} />
            <h2>No matching equipment.</h2>
            <p>
              Tell us what you need. Our sourcing range goes beyond this
              catalogue.
            </p>
            <button
              type="button"
              className="plain-button"
              onClick={() => update({ category: "all", query: "" })}
            >
              Clear filters
            </button>
            <a href="/contact.html">Ask us about equipment</a>
          </div>
        )}
        <div className="catalog-note">
          <p>Looking for something else?</p>
          <a className="text-link" href="/contact.html">
            Send us your equipment list <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </>
  );
}

export function EquipmentDetail({ item }) {
  const Icon = icons[item.category],
    category = categoryFor(item.category);
  const related = equipment
    .filter((other) => other.category === item.category && other.id !== item.id)
    .slice(0, 3);
  const guideLink = guideForEquipment(item.id);
  return (
    <>
      <div className="content-width detail-back">
        <a
          className="back-link"
          href={"/offerings.html?category=" + item.category}
        >
          <ArrowRight size={16} />
          {category.name}
        </a>
      </div>
      <section className="equipment-overview equipment-banner content-width">
        <figure
          className={
            "detail-photo" + (!item.image ? " equipment-illustration" : "")
          }
        >
          {item.image ? <Photo name={item.image} eager /> : <Icon size={120} />}
          {item.image && (
            <figcaption>
              Category image. Your quote confirms the actual equipment.
            </figcaption>
          )}
        </figure>
        <div className="equipment-summary">
          <h1>{item.title}</h1>
          <p>{item.summary}</p>
          <span className="pricing-label">Wholesale & charitable pricing · Lowest quote guaranteed.</span>
          <div className="action-row">
            <Action
              href={"/contact.html?equipment=" + encodeURIComponent(item.title)}
            >
              Get a quote
            </Action>
            <a
              className="text-link"
              href={
                "/contact.html?equipment=" +
                encodeURIComponent(item.title) +
                "&topic=service"
              }
            >
              Get service help
              <ArrowRight size={18} />
            </a>
          </div>
          <p className="small-note">
            Sourced to order. Availability, condition, and service options are
            confirmed for your request.
          </p>
        </div>
      </section>
      {guideLink && (
        <div className="equipment-guide-link content-width">
          <div>
            <strong>Compare options and ownership costs.</strong>
          </div>
          <a
            className="text-link"
            href={`${articleUrl(guideLink.guide)}#${guideLink.entry.id}`}
          >
            What to know before you buy <ArrowUpRight size={20} />
          </a>
        </div>
      )}
      <div className="detail-information content-width">
        <details className="equipment-disclosure">
          <summary>
            Equipment details <span>+</span>
          </summary>
          <div className="disclosure-content">
            <div className="equipment-facts">
              <div>
                <h2>Options to discuss</h2>
                <ul>
                  {item.includes.map((text) => (
                    <li key={text}>
                      <Checkmark size={18} />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2>What to consider</h2>
                <ul>
                  {item.considerations.map((text) => (
                    <li key={text}>
                      <Checkmark size={18} />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </details>
        <ListingComments item={item} />
      </div>
      {!!related.length && (
        <section className="content-width related-equipment">
          <SectionHead title="Related equipment" />
          <div className="related-equipment-links">
            {related.map((other) => (
              <a key={other.id} href={equipmentUrl(other)}>{other.title}<ArrowUpRight size={18} /></a>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function ListingComments({ item }) {
  const comments = approvedComments
    .filter((comment) => comment.listing === item.id)
    .sort((a, b) => b.date.localeCompare(a.date));
  const [state, setState] = useState("idle"),
    [errors, setErrors] = useState({});
  const guard = useRef(false),
    statusRef = useRef(null);
  useEffect(() => {
    if (["success", "error"].includes(state)) statusRef.current?.focus();
  }, [state]);
  async function submit(event) {
    event.preventDefault();
    if (guard.current) return;
    const form = event.currentTarget;
    const values = {
      ...Object.fromEntries(new FormData(form)),
      listing: item.id,
    };
    const validation = validateComment(values);
    setErrors(validation);
    if (Object.keys(validation).length) {
      form.elements.namedItem(Object.keys(validation)[0])?.focus();
      return;
    }
    if (values._gotcha) return;
    guard.current = true;
    setState("sending");
    try {
      await sendInquiry(commentFormData(values));
      setState("success");
      form.reset();
    } catch {
      setState("error");
    } finally {
      guard.current = false;
    }
  }
  return (
    <section
      className="listing-comments"
      id="comments"
      aria-labelledby="comments-title"
    >
      {!!comments.length && <div className="comments-heading">
        <h2 id="comments-title">
          Questions & comments
          {comments.length > 0 && <span> ({comments.length})</span>}
        </h2>
      </div>}
      {comments.length ? (
        <ol className="approved-comments">
          {comments.map((comment) => (
            <li key={comment.id}>
              <div>
                <strong>{comment.name}</strong>
                <time dateTime={comment.date}>
                  {new Date(`${comment.date}T12:00:00Z`).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      timeZone: "UTC",
                    },
                  )}
                </time>
              </div>
              <p>{comment.message}</p>
              {comment.reply && (
                <div className="mms-reply">
                  <strong>Med Mission Supplies</strong>
                  <p>{comment.reply}</p>
                </div>
              )}
            </li>
          ))}
        </ol>
      ) : null}
      <details className="comment-disclosure">
        <summary id={comments.length ? undefined : "comments-title"}>
          {comments.length ? "Write a question or comment" : "Questions & comments"} <span>+</span>
        </summary>
        <p className="comment-review-note">
          MMS reviews comments before publication. For pricing or private
          details,{" "}
          <a href={"/contact.html?equipment=" + encodeURIComponent(item.title)}>
            contact our team
          </a>
          .
        </p>
        {state === "success" ? (
          <div
            className="comment-success"
            role="status"
            ref={statusRef}
            tabIndex={-1}
          >
            <Checkmark size={28} />
            <h3>Comment received for review.</h3>
            <p>
              It will appear here if approved and published by MMS. Your email
              address will stay private.
            </p>
            <button
              type="button"
              className="plain-button"
              onClick={() => setState("idle")}
            >
              Write another comment
            </button>
          </div>
        ) : (
          <form
            className="comment-form"
            action={CONTACT_ENDPOINT}
            method="post"
            onSubmit={submit}
            aria-busy={state === "sending"}
          >
            <input
              type="hidden"
              name="submission_type"
              value="listing_comment"
            />
            <input type="hidden" name="listing_id" value={item.id} />
            <input
              type="hidden"
              name="_subject"
              value={`Listing comment for review: ${item.title}`}
            />
            <label className="honeypot" aria-hidden="true">
              Leave this blank
              <input name="_gotcha" tabIndex={-1} autoComplete="off" />
            </label>
            <div className="comment-fields">
              <label htmlFor="comment-name">
                Display name <span>(required)</span>
                <input
                  id="comment-name"
                  name="name"
                  required
                  maxLength={80}
                  autoComplete="nickname"
                  aria-invalid={!!errors.name}
                  aria-describedby={
                    errors.name ? "comment-name-error" : undefined
                  }
                />
                {errors.name && (
                  <span className="field-error" id="comment-name-error">
                    {errors.name}
                  </span>
                )}
              </label>
              <label htmlFor="comment-email">
                Email <span>(private, required)</span>
                <input
                  id="comment-email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "comment-email-error" : undefined
                  }
                />
                {errors.email && (
                  <span className="field-error" id="comment-email-error">
                    {errors.email}
                  </span>
                )}
              </label>
            </div>
            <label htmlFor="comment-message">
              Your comment <span>(required)</span>
              <textarea
                id="comment-message"
                name="message"
                required
                maxLength={2000}
                rows={5}
                aria-invalid={!!errors.message}
                aria-describedby="comment-guidance"
              />
            </label>
            <p id="comment-guidance" className="small-note">
              Up to 2,000 characters. Please leave out patient information,
              order details, and other private information.
            </p>
            {errors.message && <p className="field-error">{errors.message}</p>}
            <label className="consent-label">
              <input type="checkbox" name="consent" value="yes" required />I
              agree that my display name and comment may be published after
              review. My email will not be published.
            </label>
            {errors.consent && <p className="field-error">{errors.consent}</p>}
            {state === "error" && (
              <p
                className="form-error"
                role="alert"
                ref={statusRef}
                tabIndex={-1}
              >
                We couldn’t confirm delivery. Your comment is still here. Please
                try again.
              </p>
            )}
            <button
              className="mms-action"
              type="submit"
              disabled={state === "sending"}
            >
              {state === "sending" ? "Submitting…" : "Submit for review"}
              <ArrowRight size={20} />
            </button>
          </form>
        )}
      </details>
    </section>
  );
}

export function Articles() {
  return (
    <>
      <ExploreHero
        title="Know your equipment."
        description="Choose an area to explore. Learn what the equipment does, how the options differ, and what to check."
        image="ultrasound"
        action={["Ask our team", "/contact.html"]}
      />
      <section className="content-width articles-section">
        <div className="resource-grid">
          {articles.filter((item) => item.kind === "buying-guide").map((item) => (
            <ArticleCard item={item} key={item.id} />
          ))}
        </div>
        <section className="planning-guides" aria-labelledby="planning-guides-title">
          <h2 id="planning-guides-title">Make your next step easier.</h2>
          <div className="planning-guide-links">
            {articles.filter((item) => item.kind !== "buying-guide").map((item) => (
              <a key={item.id} href={articleUrl(item)}>
                <span>{item.title}</span><ArrowUpRight size={18} />
              </a>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
export function ArticleDetail({ item }) {
  if (item.kind === "buying-guide") return <BuyingGuide item={item} />;
  return (
    <>
      <ExploreHero
        eyebrow={item.category}
        title={item.title}
        description={item.summary}
        back="/articles.html"
        backLabel="Explore & learn"
        image={item.image}
      />
      <article className="content-width article-layout">
        <div className="article-body">
          <p className="article-intro">{item.intro}</p>
          {item.sections.map(([title, text], i) => (
            <section id={`section-${i + 1}`} key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
          <div className="article-checklist">
            <h2>Before you inquire</h2>
            <ul>
              {item.checklist.map((text) => (
                <li key={text}>
                  <Checkmark size={20} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="article-next">
            <Action href="/contact.html">Talk to our team</Action>
          </div>
        </div>
        <aside className="article-aside">
          <h2>On this page</h2>
          <nav aria-label="Article contents">
            {item.sections.map(([title], i) => (
              <a key={title} href={`#section-${i + 1}`}>
                {title}
              </a>
            ))}
          </nav>
          <div>
            <h2>Related equipment</h2>
            {item.related.map((id) => {
              const listing = equipment.find((e) => e.id === id);
              return (
                <a
                  className="related-link"
                  key={id}
                  href={equipmentUrl(listing)}
                >
                  {listing.title}
                  <ArrowUpRight size={18} />
                </a>
              );
            })}
          </div>
          <a
            className="text-link"
            href="/articles.html"
          >
            Explore more advice
            <ArrowRight size={18} />
          </a>
        </aside>
      </article>
    </>
  );
}

function GuideContents({ item }) {
  return (
    <nav aria-label="Equipment on this page">
      {item.entries.map((entry) => (
        <a key={entry.id} href={`#${entry.id}`}>
          {entry.title}
        </a>
      ))}
      <a href="#purchase-checklist">Your quote checklist</a>
    </nav>
  );
}

export function BuyingGuide({ item }) {
  return (
    <>
      <ExploreHero
        title={item.title}
        image={item.image}
        back="/articles.html"
        backLabel="Explore & learn"
      />
      <div className="guide-introduction content-width">
        <div>
          <p>{item.intro}</p>
        </div>
        <p className="guide-scope">
          Photos show example models. Your clinical and technical teams should
          approve the exact equipment and its current support.
        </p>
      </div>
      <details className="guide-mobile-contents content-width">
        <summary>
          Jump to equipment <span>+</span>
        </summary>
        <GuideContents item={item} />
      </details>
      <div className="guide-layout content-width">
        <article
          className="guide-items"
          aria-label="Equipment buying considerations"
        >
          {item.entries.map((entry) => {
            const listing = equipment.find((e) => e.id === entry.listing);
            return (
              <section className="guide-item" id={entry.id} key={entry.id}>
                <div className="guide-item-top">
                  <figure>
                    <Photo name={entry.image} />
                  </figure>
                  <div>
                    <h2>{entry.title}</h2>
                    <p>{entry.summary}</p>
                  </div>
                </div>
                <details className="guide-item-details">
                  <summary>
                    How it works & what to compare <span aria-hidden="true">+</span>
                  </summary>
                  <div className="guide-item-body">
                    <div className="equipment-explanation">
                      <h3>The basics</h3>
                      <p>{entry.explanation}</p>
                    </div>
                    <div className="guide-options">
                      {entry.options.map(([title, text]) => (
                        <div key={title}>
                          <h3>{title}</h3>
                          <p>{text}</p>
                        </div>
                      ))}
                    </div>
                    <h3>Before you buy</h3>
                    <ol>
                      {entry.checks.map((text) => (
                        <li key={text}>{text}</li>
                      ))}
                    </ol>
                    <p className="guide-cost">
                      <strong>Budget for the whole package.</strong>{" "}
                      {entry.cost}
                    </p>
                    <div className="guide-sources">
                      <span>Technical references</span>
                      {entry.sources.map((id) => (
                        <a key={id} href={guideSources[id][1]}>
                          {guideSources[id][0]} <ArrowUpRight size={13} />
                        </a>
                      ))}
                    </div>
                    <div className="guide-item-actions">
                      <a className="text-link" href={`/contact.html?equipment=${encodeURIComponent(listing.title)}`}>
                        Ask about {entry.title.toLowerCase()}<ArrowRight size={18} />
                      </a>
                      <a href={equipmentUrl(listing)}>Equipment & service options</a>
                    </div>
                  </div>
                </details>
              </section>
            );
          })}
          <section className="guide-purchase-checklist" id="purchase-checklist">
            <h2>Your quote checklist</h2>
            <ul>
              {item.checklist.map((text) => (
                <li key={text}>
                  <Checkmark size={18} />
                  {text}
                </li>
              ))}
            </ul>
            <Action href="/contact.html?topic=procure">
              Discuss your equipment list
            </Action>
          </section>
        </article>
        <aside className="guide-sidebar">
          <h2>On this page</h2>
          <GuideContents item={item} />
          <div>
            <a className="text-link" href="/contact.html">
              Talk to MMS <ArrowUpRight size={17} />
            </a>
          </div>
        </aside>
      </div>
      <div className="guide-return content-width">
        <a className="text-link" href="/articles.html">More equipment advice<ArrowRight size={18} /></a>
        <p className="small-note">References reviewed {new Date(`${item.reviewed}T12:00:00Z`).toLocaleDateString("en-US", {
          month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
        })}.</p>
      </div>
    </>
  );
}

export function Services() {
  return (
    <>
      <ExploreHero
        title="Expertise behind every equipment decision."
        description="Hospital-wide procurement, support, and service. Free advice for physicians and materials management teams."
        image="equipment-detail"
      />
      <div className="content-width services-grid">
        {[
          [
            "procure",
            "Find the right equipment",
            "Share your equipment list, budget, and destination. We’ll help you explore the options.",
            "Browse equipment",
            "/offerings.html",
            "ultrasound",
          ],
          [
            "service",
            "Get it working again",
            "Tell us your equipment model and the issue. We’ll discuss parts, repairs, and service options.",
            "Tell us what’s happening",
            "/contact.html?topic=service",
            "anesthesia",
          ],
        ].map(([id, title, description, label, href, photo]) => (
          <section className="service-card" id={id} key={id}>
            <Photo name={photo} />
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
              <a className="text-link" href={href}>
                {label}
                <ArrowRight size={20} />
              </a>
            </div>
          </section>
        ))}
      </div>
      <AdvisoryOptions />
      <section className="pricing-panel content-width" id="pricing">
        <div>
          <h2>Lowest quote. Guaranteed.</h2>
          <p>
            Wholesale pricing for hospitals and clinics. Charitable pricing for
            mission-driven projects.
          </p>
        </div>
        <Action href="/contact.html?topic=quote">
          Request a quote
        </Action>
      </section>
    </>
  );
}
