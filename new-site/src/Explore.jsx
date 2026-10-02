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
  articleCategories,
  articleUrl,
  filterArticles,
} from "./articles.mjs";
import approvedComments from "./approved-comments.json";
import { commentFormData, validateComment } from "./comments.mjs";
import { CONTACT_ENDPOINT, sendInquiry } from "./contact-service.mjs";

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
  };
  return (
    <img
      className={className}
      src={photoUrl(name)}
      alt={alt ?? descriptions[name]}
      width={name === "ultrasound" ? 1000 : 1100}
      height={name === "ultrasound" ? 667 : 1650}
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
  return (
    <article className="resource-card">
      <a href={articleUrl(item)}>
        <div className="resource-image">
          <Photo name={item.image} />
        </div>
        <div className="resource-copy">
          <div className="article-meta">
            <span>{item.category}</span>
            <span>{item.minutes} min read</span>
          </div>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
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
            Quality equipment.
            <br />
            <span>Within reach.</span>
          </h1>
          <p>
            We procure, support, and service hospital equipment across almost
            every department—with wholesale and charitable pricing.
          </p>
          <div className="action-row">
            <Action href="/offerings.html">Browse equipment</Action>
            <Action href="/contact.html" secondary>
              Ask for a quote
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
          <a className="text-link" href="/offerings.html">
            View all equipment
            <ArrowRight size={20} />
          </a>
        </div>
        <div className="category-grid">
          {categories.map((category) => {
            const Icon = icons[category.id];
            return (
              <a
                key={category.id}
                className="category-tile"
                href={"/offerings.html?category=" + category.id}
              >
                <Icon size={32} />
                <h3>{category.name}</h3>
                <ArrowUpRight size={20} />
              </a>
            );
          })}
        </div>
      </section>
      <section
        className="home-help content-width"
        aria-label="Advice and support"
      >
        <a className="help-card" href="/articles.html">
          <Photo name="ultrasound" />
          <div>
            <h2>Make a confident choice.</h2>
            <p>Simple guides to buying medical equipment.</p>
            <span>
              Explore buying guides <ArrowRight size={20} />
            </span>
          </div>
        </a>
        <a className="help-card help-card-service" href="/services.html">
          <div>
            <h2>Help beyond the purchase.</h2>
            <p>Equipment questions, parts, and service support.</p>
            <span>
              See how we can help <ArrowRight size={20} />
            </span>
          </div>
          <Tools size={54} />
        </a>
      </section>
    </>
  );
}

export function NewContactBand() {
  return (
    <section className="contact-invitation content-width">
      <h2>Let’s find what you need.</h2>
      <Action href="/contact.html">Talk to our team</Action>
    </section>
  );
}

export function ExploreHero({ title, description, back, backLabel }) {
  return (
    <header className="page-intro content-width">
      {back && (
        <a className="back-link" href={back}>
          <ArrowRight size={16} />
          {backLabel}
        </a>
      )}
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}

function useFilters(search, type) {
  const parse = (value) => {
    if (type === "equipment") return catalogState(value);
    const params = new URLSearchParams(value),
      category = params.get("category");
    return {
      category: articleCategories.includes(category) ? category : "all",
      query: (params.get("q") || "").slice(0, 160),
    };
  };
  const [filters, setFilters] = useState(() => parse(search));
  useEffect(() => {
    const sync = () => setFilters(parse(window.location.search));
    if (search === undefined) sync();
    else setFilters(parse(search));
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [search, type]);
  function update(next) {
    const value = { ...filters, ...next };
    setFilters(value);
    const url = new URL(window.location.href);
    value.category === "all"
      ? url.searchParams.delete("category")
      : url.searchParams.set("category", value.category);
    value.query
      ? url.searchParams.set("q", value.query)
      : url.searchParams.delete("q");
    url.hash = "";
    window.history.replaceState(window.history.state, "", url);
  }
  return [filters, update];
}
export function EquipmentCatalog({ search }) {
  const [filters, update] = useFilters(search, "equipment");
  const results = filterEquipment(filters);
  return (
    <>
      <ExploreHero
        eyebrow="OUR EQUIPMENT"
        title="Find your equipment."
        description="Explore our range. Ask us for availability, options, and a price for your facility."
      />
      <section className="content-width catalog-section">
        <div className="catalog-toolbar">
          <label className="search-field">
            <Search size={20} />
            <span className="sr-only">Search equipment</span>
            <input
              type="search"
              placeholder="Search equipment…"
              value={filters.query}
              maxLength={160}
              onChange={(e) => update({ query: e.target.value })}
            />
          </label>
        </div>
        <div className="filter-tabs" aria-label="Equipment categories">
          {[{ id: "all", name: "All equipment" }, ...categories].map(
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
        <p className="results-count" role="status">
          {results.length} equipment {results.length === 1 ? "area" : "areas"}
          {filters.category !== "all"
            ? ` in ${categoryFor(filters.category).name}`
            : ""}
        </p>
        <noscript>
          <p>
            All equipment is shown below. Enable JavaScript to use search and
            category filters.
          </p>
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
              Try a broader search, or tell us what you need. Our sourcing range
              goes beyond this catalogue.
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
      <section className="equipment-overview content-width">
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
          <span className="pricing-label">Wholesale & charitable pricing</span>
          <div className="action-row">
            <Action
              href={"/contact.html?equipment=" + encodeURIComponent(item.title)}
            >
              Ask for a quote
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
      <div className="detail-information content-width">
        <details className="equipment-disclosure">
          <summary>
            Equipment details <span>+</span>
          </summary>
          <div className="disclosure-content">
            <p>{item.text}</p>
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
          <div className="catalog-grid">
            {related.map((other) => (
              <EquipmentCard key={other.id} item={other} />
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
      <div className="comments-heading">
        <h2 id="comments-title">
          Questions & comments
          {comments.length > 0 && <span> ({comments.length})</span>}
        </h2>
      </div>
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
        <summary>
          Write a question or comment <span>+</span>
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

export function Articles({ search }) {
  const [filters, update] = useFilters(search, "articles");
  const results = filterArticles(filters);
  return (
    <>
      <ExploreHero
        eyebrow="THE RESOURCE LIBRARY"
        title="Medical equipment guides."
        description="Straightforward guides to buying, planning, and caring for medical equipment."
      />
      <section className="content-width articles-section">
        <div className="catalog-toolbar">
          <label className="search-field">
            <Search size={20} />
            <span className="sr-only">Search articles</span>
            <input
              type="search"
              placeholder="Search articles…"
              value={filters.query}
              maxLength={160}
              onChange={(e) => update({ query: e.target.value })}
            />
          </label>
        </div>
        <div className="filter-tabs" aria-label="Article categories">
          {["all", ...articleCategories].map((category) => (
            <button
              type="button"
              key={category}
              aria-pressed={filters.category === category}
              onClick={() => update({ category })}
            >
              {category === "all" ? "All articles" : category}
            </button>
          ))}
        </div>
        <p className="results-count" role="status">
          {results.length} {results.length === 1 ? "article" : "articles"}
        </p>
        <noscript>
          <p>
            All articles are shown. Enable JavaScript to use search and category
            filters.
          </p>
        </noscript>
        <div className="resource-grid">
          {results.map((item) => (
            <ArticleCard item={item} key={item.id} />
          ))}
        </div>
        {!results.length && (
          <div className="empty-results">
            <h2>No matching articles.</h2>
            <p>Try another topic or clear your filters.</p>
            <button
              type="button"
              className="plain-button"
              onClick={() => update({ category: "all", query: "" })}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
      <NewContactBand />
    </>
  );
}
export function ArticleDetail({ item }) {
  return (
    <>
      <ExploreHero
        eyebrow={item.category}
        title={item.title}
        description={item.summary}
        back="/articles.html"
        backLabel="Resources"
      />
      <article className="content-width article-layout">
        <div className="article-body">
          <div className="article-byline">
            <span>Med Mission Supplies</span>
            <span>{item.minutes} min read</span>
          </div>
          <Photo name={item.image} className="article-cover" eager />
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
            <h2>Ready to ask a question?</h2>
            <Action href="/contact.html">Talk to our team</Action>
          </div>
        </div>
        <aside className="article-aside">
          <h2>In this guide</h2>
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
            href={`/articles.html?category=${encodeURIComponent(item.category)}`}
          >
            More in {item.category}
            <ArrowRight size={18} />
          </a>
        </aside>
      </article>
      <section className="more-guides content-width">
        <h2>Keep reading</h2>
        {articles
          .filter((other) => other.id !== item.id)
          .map((other) => (
            <a key={other.id} href={articleUrl(other)}>
              {other.title}
              <ArrowUpRight size={20} />
            </a>
          ))}
      </section>
    </>
  );
}

export function Services() {
  return (
    <>
      <ExploreHero
        title="The right equipment. The right support."
        description="From finding a system to keeping it working, start with the help you need."
      />
      <div className="content-width services-grid">
        {[
          [
            "procure",
            "Find equipment",
            "Source a single system or a whole department around your requirements and budget.",
            "Browse equipment",
            "/offerings.html",
            "ultrasound",
          ],
          [
            "support",
            "Get equipment support",
            "Ask about accessories, compatibility, delivery, or setup. We’ll help you find the next step.",
            "Ask a question",
            "/contact.html?topic=support",
            "equipment-detail",
          ],
          [
            "service",
            "Arrange a service",
            "Tell us your equipment model and the issue. We’ll discuss parts, repairs, and service options.",
            "Request service help",
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
      <section className="pricing-panel content-width" id="pricing">
        <div>
          <h2>More room in your budget.</h2>
          <p>
            Wholesale pricing for hospitals and clinics. Charitable pricing for
            mission-driven projects.
          </p>
        </div>
        <Action href="/contact.html?topic=charitable">
          Discuss your project
        </Action>
      </section>
    </>
  );
}
