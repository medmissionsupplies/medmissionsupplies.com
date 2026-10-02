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
  Delivery,
  Partnership,
  Checkmark,
  Chat,
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
export function Label({ children }) {
  return <p className="kicker">{children}</p>;
}
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
export function SectionHead({ eyebrow, title, description, href, link }) {
  return (
    <div className="editorial-heading">
      <div>
        <Label>{eyebrow}</Label>
        <h2>{title}</h2>
      </div>
      <div>
        {description && <p>{description}</p>}
        {href && (
          <a className="text-link" href={href}>
            {link}
            <ArrowRight size={20} />
          </a>
        )}
      </div>
    </div>
  );
}

export function EquipmentCard({ item }) {
  const category = categoryFor(item.category),
    Icon = icons[item.category];
  return (
    <article className="catalog-card" id={item.id}>
      <a
        className="card-main"
        href={equipmentUrl(item)}
        aria-label={`Explore ${item.title}`}
      >
        <div
          className={`card-image ${!item.image ? "equipment-illustration" : ""}`}
        >
          {item.image ? (
            <Photo name={item.image} />
          ) : (
            <>
              <Icon size={76} />
              <span>Hospital equipment</span>
            </>
          )}
          <span className="image-tag">Sourced to your needs</span>
        </div>
        <div className="card-copy">
          <span className="card-category">{category.name}</span>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <span className="card-link">
            Explore equipment
            <ArrowUpRight size={20} />
          </span>
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
          <span className="card-link">
            Read the guide
            <ArrowUpRight size={20} />
          </span>
        </div>
      </a>
    </article>
  );
}

export function NewHome() {
  return (
    <div className="compact-home">
      <section className="editorial-hero">
        <div className="hero-layout content-width">
          <div className="editorial-hero-copy">
            <Label>
              <span className="status-dot" /> EQUIPMENT WITH PURPOSE
            </Label>
            <h1>
              Hospital equipment.
              <br />
              <em>Human purpose.</em>
            </h1>
            <p>
              We procure, support, and service almost every major type of
              hospital capital equipment—with wholesale and charitable pricing.
            </p>
            <div className="hero-actions">
              <Action href="/offerings.html">Explore equipment</Action>
              <a className="text-link" href="/contact.html">
                Talk to our team
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
          <div className="editorial-hero-photo">
            <Photo name="anesthesia" eager />
            <div className="compact-photo-caption">
              From operating rooms to everyday essentials.
            </div>
          </div>
        </div>
        <nav
          className="compact-services content-width"
          aria-label="How MMS helps"
        >
          {[
            ["procure", "Procure", "Equipment to fit your needs", Delivery],
            ["support", "Support", "Help beyond the purchase", Partnership],
            ["service", "Service", "Parts, repairs & coordination", Tools],
          ].map(([id, title, description, Icon]) => (
            <a href={"/services.html#" + id} key={id}>
              <Icon size={24} />
              <span>
                <strong>{title}</strong>
                <span>{description}</span>
              </span>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      </section>
      <section
        className="compact-equipment content-width"
        aria-labelledby="home-equipment-heading"
      >
        <div className="compact-heading">
          <div>
            <Label>EXPLORE OUR RANGE</Label>
            <h2 id="home-equipment-heading">What are you looking for?</h2>
          </div>
          <a className="text-link" href="/offerings.html">
            View all equipment
            <ArrowRight size={20} />
          </a>
        </div>
        <div className="compact-categories">
          {categories.map((category) => {
            const Icon = icons[category.id];
            const count = equipment.filter(
              (item) => item.category === category.id,
            ).length;
            return (
              <a
                key={category.id}
                href={"/offerings.html?category=" + category.id}
                className="compact-category"
              >
                <div className="compact-category-image">
                  {category.image ? (
                    <Photo name={category.image} />
                  ) : (
                    <Icon size={48} />
                  )}
                </div>
                <div>
                  <h3>{category.name}</h3>
                  <span>
                    {count} equipment {count === 1 ? "area" : "areas"}
                  </span>
                </div>
                <ArrowUpRight className="category-arrow" size={18} />
              </a>
            );
          })}
        </div>
        <div className="compact-resources">
          <span>Planning a purchase or a service request?</span>
          <a href="/articles.html">
            Browse our practical guides
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
      <section className="compact-contact">
        <div className="content-width">
          <div>
            <h2>One system. A whole hospital.</h2>
            <p>
              Send us your equipment list, destination, and budget. We’ll help
              with the next step.
            </p>
          </div>
          <Action href="/contact.html">Tell us what you need</Action>
        </div>
      </section>
    </div>
  );
}

export function NewContactBand() {
  return (
    <section className="new-contact-band">
      <div className="content-width">
        <div>
          <Label>LET’S PUT YOUR PLANS IN MOTION</Label>
          <h2>
            What does your
            <br />
            hospital need?
          </h2>
        </div>
        <div>
          <p>
            A single system. A service question. A whole new department.
            <br />
            Start with a conversation.
          </p>
          <Action href="/contact.html">Talk to our team</Action>
        </div>
      </div>
    </section>
  );
}

export function ExploreHero({ eyebrow, title, description, back, backLabel }) {
  return (
    <section className="explore-hero">
      <div className="content-width">
        <nav className="simple-breadcrumb" aria-label="Breadcrumb">
          <a href="/index.html">Home</a>
          <span>/</span>
          {back ? (
            <>
              <a href={back}>{backLabel}</a>
              <span>/</span>
              <span aria-current="page">{eyebrow}</span>
            </>
          ) : (
            <span aria-current="page">{eyebrow}</span>
          )}
        </nav>
        <Label>{eyebrow}</Label>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
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
        title={
          <>
            Across departments.
            <br />
            <em>Around your needs.</em>
          </>
        }
        description="We procure, support, and service almost every major type of hospital capital equipment. Explore our range, then tell us what you’re looking for."
      />
      <section className="content-width catalog-section">
        <div className="catalog-toolbar">
          <div>
            <Label>FIND YOUR EQUIPMENT</Label>
            <p>
              Wholesale & charitable pricing · Availability confirmed by quote
            </p>
          </div>
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
          <Partnership size={32} />
          <div>
            <h2>Don’t see what you need?</h2>
            <p>
              This is a starting point. Send us your equipment list, preferred
              specifications, and destination—we’ll explore the possibilities
              with you.
            </p>
          </div>
          <Action href="/contact.html">Send us your list</Action>
        </div>
      </section>
      <NewContactBand />
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
      <ExploreHero
        eyebrow={category.name}
        title={item.title}
        description={item.summary}
        back={`/offerings.html?category=${item.category}`}
        backLabel="Equipment"
      />
      <section className="content-width equipment-page">
        <div className="equipment-page-main">
          <figure
            className={`detail-photo ${!item.image ? "equipment-illustration" : ""}`}
          >
            {item.image ? (
              <Photo name={item.image} eager />
            ) : (
              <Icon size={130} />
            )}
            {item.image && (
              <figcaption>
                Category photograph for illustration. The equipment offered will
                be confirmed in your quote.
              </figcaption>
            )}
          </figure>
          <Label>BUILT AROUND YOUR REQUIREMENTS</Label>
          <h2>Let’s find the right fit.</h2>
          <p>{item.text}</p>
          <div className="equipment-facts">
            <div>
              <h3>What we can discuss</h3>
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
              <h3>Useful details to share</h3>
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
          <ListingComments item={item} />
        </div>
        <aside className="equipment-sidebar">
          <Label>LET’S TALK EQUIPMENT</Label>
          <h2>
            One request.
            <br />
            Real support.
          </h2>
          <p>
            Tell us your specification, destination, and budget. We’ll discuss
            sourcing, support, and service options.
          </p>
          <Action
            href={`/contact.html?equipment=${encodeURIComponent(item.title)}`}
          >
            Request a quote
          </Action>
          <a
            className="text-link"
            href={`/contact.html?equipment=${encodeURIComponent(item.title)}&topic=service`}
          >
            Ask about service
            <ArrowRight size={18} />
          </a>
          <div className="sidebar-note">
            <Favorite size={22} />
            <p>
              <strong>Wholesale & charitable pricing</strong>Discuss pricing for
              your organization and project.
            </p>
          </div>
          <p className="small-note">
            This is a sourcing category, not a live stock listing. Availability,
            condition, accessories, service coverage, and pricing are confirmed
            for each request.
          </p>
        </aside>
      </section>
      {!!related.length && (
        <section className="content-width editorial-section">
          <SectionHead eyebrow="KEEP EXPLORING" title="Related equipment" />
          <div className="catalog-grid">
            {related.map((other) => (
              <EquipmentCard key={other.id} item={other} />
            ))}
          </div>
        </section>
      )}
      <NewContactBand />
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
        <Chat size={28} />
        <div>
          <Label>EQUIPMENT CONVERSATION</Label>
          <h2 id="comments-title">
            Questions & comments <span>({comments.length})</span>
          </h2>
        </div>
      </div>
      <p>
        Share a question or experience about this equipment. Comments are
        reviewed by MMS before publication. For a quote or an urgent service
        request,{" "}
        <a href={`/contact.html?equipment=${encodeURIComponent(item.title)}`}>
          contact our team directly
        </a>
        .
      </p>
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
      ) : (
        <div className="no-comments">
          No published comments yet. Start the conversation below.
        </div>
      )}
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
          <input type="hidden" name="submission_type" value="listing_comment" />
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
            Up to 2,000 characters. Please leave out patient information, order
            details, and other private information.
          </p>
          {errors.message && <p className="field-error">{errors.message}</p>}
          <label className="consent-label">
            <input type="checkbox" name="consent" value="yes" required />I agree
            that my display name and comment may be published after review. My
            email will not be published.
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
        title={
          <>
            Knowledge for
            <br />
            <em>the next step.</em>
          </>
        }
        description="Practical starting points for equipment sourcing, service conversations, and mission planning. Written to help you ask better questions."
      />
      <section className="content-width editorial-section">
        <div className="catalog-toolbar">
          <div>
            <Label>BROWSE OUR GUIDES</Label>
            <p>Procurement, support, and the bigger picture.</p>
          </div>
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
            <span>Med Mission Supplies · Equipment guide</span>
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
            <Label>TAKE THIS INTO YOUR NEXT CONVERSATION</Label>
            <h2>Your preparation checklist</h2>
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
            <h2>Let’s talk about your project.</h2>
            <p>Share your equipment list or support question with our team.</p>
            <Action href="/contact.html">Start a conversation</Action>
          </div>
        </div>
        <aside className="article-aside">
          <Label>IN THIS GUIDE</Label>
          <nav aria-label="Article contents">
            {item.sections.map(([title], i) => (
              <a key={title} href={`#section-${i + 1}`}>
                {title}
              </a>
            ))}
          </nav>
          <div>
            <Label>RELATED EQUIPMENT</Label>
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
      <section className="resources-home editorial-section">
        <div className="content-width">
          <SectionHead eyebrow="KEEP READING" title="More practical guidance" />
          <div className="resource-grid">
            {articles
              .filter((other) => other.id !== item.id)
              .map((other) => (
                <ArticleCard key={other.id} item={other} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Services() {
  return (
    <>
      <ExploreHero
        eyebrow="YOUR EQUIPMENT PARTNER"
        title={
          <>
            Procure. Support.
            <br />
            <em>Service.</em>
          </>
        }
        description="Almost every major type of hospital capital equipment. One conversation that considers the purchase and the care that comes after it."
      />
      <div className="content-width services-page">
        {[
          [
            "procure",
            "01",
            "Procure",
            "The right starting point.",
            "From a single replacement to a department equipment list, we help explore sourcing options around your specification, budget, and destination.",
            [
              "Equipment sourcing and configuration",
              "Wholesale and charitable pricing discussions",
              "Accessories, documentation, and logistics planning",
            ],
            "ultrasound",
          ],
          [
            "support",
            "02",
            "Support",
            "A person to work through it with.",
            "Your questions matter before and after a purchase. Talk with us about equipment details, compatibility, logistics, and the next practical step.",
            [
              "Equipment and accessory questions",
              "Coordination around delivery and setup",
              "Ongoing communication and support planning",
            ],
            "equipment-detail",
          ],
          [
            "service",
            "03",
            "Service",
            "Think beyond the delivery.",
            "Tell us about the equipment you have and the help you need. We can discuss parts, repairs, and service coordination, with scope and availability confirmed for your request.",
            [
              "Parts and repair inquiries",
              "Service requirements and coordination",
              "Equipment lifecycle and replacement planning",
            ],
            "anesthesia",
          ],
        ].map(([id, number, title, subtitle, description, list, photo]) => (
          <section className="service-detail" id={id} key={id}>
            <Photo name={photo} />
            <div>
              <Label>
                {number} / {title.toUpperCase()}
              </Label>
              <h2>{subtitle}</h2>
              <p>{description}</p>
              <ul>
                {list.map((text) => (
                  <li key={text}>
                    <Checkmark size={20} />
                    {text}
                  </li>
                ))}
              </ul>
              <Action href={`/contact.html?topic=${id}`}>
                Talk to us about {title.toLowerCase()}
              </Action>
            </div>
          </section>
        ))}
        <section className="pricing-panel" id="pricing">
          <div>
            <Label>PRICING WITH PURPOSE</Label>
            <h2>
              Wholesale for your budget.
              <br />
              <em>Charitable for your mission.</em>
            </h2>
          </div>
          <div>
            <p>
              Tell us about your organization, project, and available budget.
              We’ll explore wholesale options and charitable pricing for
              mission-driven work. Pricing and availability are confirmed for
              each request.
            </p>
            <a className="text-link" href="/contact.html?topic=charitable">
              Discuss your project
              <ArrowRight size={20} />
            </a>
          </div>
        </section>
      </div>
      <NewContactBand />
    </>
  );
}
