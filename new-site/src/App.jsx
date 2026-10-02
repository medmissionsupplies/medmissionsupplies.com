import React, { useState, useRef } from "react";
import { version } from "../package.json";
import { CONTACT_ENDPOINT, sendInquiry } from "./contact-service.mjs";
import { pageKey } from "./page-navigation.mjs";
import {
  Button,
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderMenuButton,
  SideNav,
  SideNavItems,
  SideNavLink,
  SkipToContent,
  Theme,
  TextInput,
  TextArea,
  InlineNotification,
} from "@carbon/react";
import { ArrowRight, ArrowUpRight, Time, Checkmark } from "@carbon/icons-react";

import {
  Action,
  ExploreHero,
  NewHome,
  EquipmentCatalog,
  EquipmentDetail,
  Articles,
  ArticleDetail,
  Services,
  Photo,
} from "./Explore.jsx";
import { equipment } from "./catalog.mjs";
import { articles } from "./articles.mjs";
import { routes } from "./routes.mjs";

const navigation = [
  ["offerings", "Equipment"],
  ["services", "Services"],
  ["articles", "Buying guides"],
  ["about", "About us"],
  ["contact", "Contact"],
];
export const pageFromPath = (path) => pageKey(path) || "not-found";

function SiteHeader({ page }) {
  const activePage = page.startsWith("equipment-")
    ? "offerings"
    : page.startsWith("article-")
      ? "articles"
      : page;
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigationRef = useRef(null);
  const closeMenu = () => {
    setOpen(false);
    menuRef.current?.focus();
  };
  React.useEffect(() => {
    setOpen(false);
  }, [page]);
  React.useEffect(() => {
    if (open) navigationRef.current?.querySelector("a")?.focus();
  }, [open]);
  React.useEffect(() => {
    const desktop = window.matchMedia("(min-width: 66rem)");
    const resetMenu = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", resetMenu);
    return () => desktop.removeEventListener("change", resetMenu);
  }, []);
  return (
    <>
      <Header
        aria-label="Med Mission Supplies"
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            event.preventDefault();
            closeMenu();
          }
        }}
      >
        <SkipToContent href="#main-content" />
        <HeaderMenuButton
          ref={menuRef}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-controls="mobile-navigation"
          aria-expanded={open}
          isActive={open}
          onClick={() => setOpen(!open)}
        />
        <HeaderName href="/index.html" prefix="" className="brand">
          <img src="/assets/mms-logo.png" alt="" width="56" height="56" />
          <span>
            Med Mission<span className="brand-second">Supplies</span>
          </span>
        </HeaderName>
        <HeaderNavigation aria-label="Main navigation">
          {navigation
            .filter(([id]) => id !== "contact")
            .map(([id, label]) => (
              <HeaderMenuItem
                key={id}
                href={`/${id}.html`}
                isCurrentPage={activePage === id}
                aria-current={activePage === id ? "page" : undefined}
              >
                {label}
              </HeaderMenuItem>
            ))}
        </HeaderNavigation>
        <a className="header-quote" href="/contact.html">
          Get in touch <ArrowUpRight size={18} />
        </a>
        <SideNav
          ref={navigationRef}
          id="mobile-navigation"
          aria-label="Mobile navigation"
          aria-hidden={!open}
          expanded={open}
          isPersistent={false}
          addFocusListeners={false}
          addMouseListeners={false}
          onOverlayClick={closeMenu}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget) &&
              event.relatedTarget !== menuRef.current
            )
              setOpen(false);
          }}
        >
          <SideNavItems>
            {navigation.map(([id, label]) => (
              <SideNavLink
                key={id}
                href={`/${id}.html`}
                isActive={activePage === id}
                aria-current={activePage === id ? "page" : undefined}
                onClick={closeMenu}
              >
                {label}
              </SideNavLink>
            ))}
          </SideNavItems>
        </SideNav>
      </Header>
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="clean-footer">
      <div className="content-width">
        <div className="footer-topline">
          <a className="footer-logo" href="/index.html">
            <img src="/assets/mms-logo.png" alt="" width="40" height="40" />
            Med Mission Supplies
          </a>
          <nav aria-label="Footer">
            <a href="/about.html">About us</a>
            <a href="/employment.html">Careers</a>
            <a href="/articles.html">Buying guides</a>
            <a href="/contact.html">Contact</a>
            <a
              href="https://www.linkedin.com/company/med-mission-supplies"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              <ArrowUpRight size={14} />
            </a>
          </nav>
        </div>
        <p>
          © {new Date().getFullYear()} Med Mission Supplies{" "}
          <span className="site-version">v{version}</span>
          <a className="photo-credits" href="/licenses/Photography.txt">
            Photo credits
          </a>
        </p>
      </div>
    </footer>
  );
}

function About() {
  return (
    <>
      <ExploreHero
        title="Good equipment. Greater access to care."
        description="We help hospitals and clinics source capital equipment at wholesale and charitable prices."
        image="operating-room"
      />
      <section className="about-story content-width">
        <p>
          Founded to serve clinics and mission hospitals in underserved regions,
          we bring experience in medical equipment, shipping, and ongoing
          support.
        </p>
        <Action href="/contact.html">Meet your equipment partner</Action>
      </section>
      <section
        className="team-section content-width"
        aria-labelledby="team-heading"
      >
        <h2 id="team-heading">The people here to help.</h2>
        <div className="team-grid">
          {[
            ["LH", "Lynette Hwang", "Founder & CEO"],
            ["VL", "Vincent Larkin", "Director of Operations"],
            ["JL", "John Landman", "Assistant Programmer"],
          ].map(([initials, name, role]) => (
            <article className="team-member" key={name}>
              <div className="team-initials" aria-hidden="true">
                {initials}
              </div>
              <div>
                <h3>{name}</h3>
                <p>{role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Employment() {
  return (
    <>
      <ExploreHero
        title="Make your work matter."
        description="Help hospitals and clinics get the equipment and support they need."
        image="laboratory"
      />
      <section className="careers-layout content-width">
        <Photo name="operating-room" />
        <div>
          <h2>Join Med Mission Supplies.</h2>
          <p>
            Explore current opportunities and application details on our
            LinkedIn page.
          </p>
          <Action href="https://www.linkedin.com/company/med-mission-supplies">
            View opportunities
          </Action>
          <a className="text-link" href="/contact.html">
            Ask about our team
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </>
  );
}

export function inquiryFromSearch(search = "") {
  const params = new URLSearchParams(search);
  const requested = params.get("equipment");
  const aliases = {
    "Ultrasound equipment": "Ultrasound systems",
    "EKG machines": "Monitors, ECG & defibrillators",
    "Portable X-ray units": "X-ray & C-arm systems",
  };
  const title = aliases[requested] || requested;
  const topic = params.get("topic");
  if (equipment.some((item) => item.title === title))
    return topic === "service"
      ? "I’d like to discuss service for " +
          title +
          ".\n\nFacility and location:\nManufacturer / model:\nSupport needed:\n"
      : "I’d like to discuss " +
          title +
          ".\n\nFacility and location:\nRequirements and quantity:\nBudget and timing:\n";
  const messages = {
    charitable:
      "I’d like to discuss charitable pricing for our project.\n\nOrganization and mission:\nEquipment needed:\nDestination:\nBudget and timing:\n",
    service:
      "I’d like help with an equipment service request.\n\nManufacturer / model:\nFacility and location:\nSupport needed:\n",
    support:
      "I’d like equipment support.\n\nEquipment and question:\nFacility and location:\n",
    procure:
      "I’d like help procuring hospital equipment.\n\nEquipment list:\nDestination:\nBudget and timing:\n",
  };
  return messages[topic] || "";
}

function ContactForm({ search, draft }) {
  const [state, setState] = useState("idle");
  const [fieldErrors, setFieldErrors] = useState({});
  const [inquiry, setInquiry] = useState(
    () => draft?.message ?? inquiryFromSearch(search),
  );
  const notificationRef = useRef(null);
  const submitting = useRef(false);
  // Direct visits hydrate static HTML first; client navigation already has its query.
  React.useEffect(() => {
    if (search === undefined && !draft)
      setInquiry(inquiryFromSearch(window.location.search));
  }, []);
  React.useEffect(() => {
    if (state === "success" || state === "error")
      notificationRef.current?.focus();
  }, [state]);
  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const errors = {};
    if (!String(data.get("name") || "").trim())
      errors.name = "Enter your name.";
    if (!String(data.get("message") || "").trim())
      errors.message = "Tell us how we can help.";
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      form.elements[Object.keys(errors)[0]].focus();
      return;
    }
    submitting.current = true;
    setState("submitting");
    try {
      await sendInquiry(data);
      setState("success");
      form.reset();
      setInquiry("");
    } catch {
      setState("error");
    } finally {
      submitting.current = false;
    }
  }
  if (state === "success")
    return (
      <div
        className="form-success"
        ref={notificationRef}
        tabIndex={-1}
        role="status"
      >
        <div className="success-mark">
          <Checkmark size={32} />
        </div>
        <h2>Thank you for reaching out.</h2>
        <p>
          Your message has been sent to Med Mission Supplies. We aim to respond
          within 48 hours.
        </p>
        <Button kind="tertiary" onClick={() => setState("idle")}>
          Send another message
        </Button>
      </div>
    );
  return (
    <form
      className="contact-form"
      action={CONTACT_ENDPOINT}
      method="POST"
      onSubmit={submit}
      aria-busy={state === "submitting"}
    >
      <p className="form-intro">All fields are required.</p>
      <TextInput
        id="name"
        name="name"
        labelText="Your name"
        autoComplete="name"
        defaultValue={draft?.name ?? ""}
        required
        maxLength={160}
        invalid={!!fieldErrors.name}
        invalidText={fieldErrors.name}
        onChange={() =>
          setFieldErrors((errors) => ({ ...errors, name: undefined }))
        }
      />
      <TextInput
        id="email"
        name="email"
        type="email"
        labelText="Email address"
        autoComplete="email"
        defaultValue={draft?.email ?? ""}
        required
        maxLength={254}
      />
      <TextArea
        id="message"
        name="message"
        labelText="Your message"
        helperText="Include equipment, location, and budget if you know them."
        rows={6}
        required
        maxLength={6000}
        value={inquiry}
        onChange={(event) => {
          setInquiry(event.target.value);
          setFieldErrors((errors) => ({ ...errors, message: undefined }));
        }}
        invalid={!!fieldErrors.message}
        invalidText={fieldErrors.message}
      />
      {state === "error" && (
        <div ref={notificationRef} tabIndex={-1}>
          <InlineNotification
            kind="error"
            title="We couldn’t confirm delivery."
            subtitle="Your message is still here. Check your connection and try again, or contact us through LinkedIn."
            hideCloseButton
            lowContrast
          />
          <a
            className="text-link form-fallback"
            href="https://www.linkedin.com/company/med-mission-supplies"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open our LinkedIn page <ArrowUpRight size={16} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      )}
      <Button
        type="submit"
        renderIcon={ArrowRight}
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Sending message…" : "Send message"}
      </Button>
    </form>
  );
}

function Contact({ search, draft }) {
  return (
    <>
      <ExploreHero
        title="Let’s find what you need."
        description="Equipment, advice, or service. Start a conversation with our team."
        image="ultrasound"
        compact
      />
      <section className="contact-layout content-width">
        <div className="contact-copy">
          <h2>How can we help?</h2>
          <p>
            Looking for equipment, comparing options, or needing service? Send
            us a message.
          </p>
          <div className="contact-options">
            <span>
              <Checkmark size={20} />
              Equipment & pricing
            </span>
            <span>
              <Checkmark size={20} />
              Service & support
            </span>
            <span>
              <Checkmark size={20} />
              Charitable projects
            </span>
          </div>
          <p className="response-time">
            <Time size={20} />
            We aim to reply within 48 hours.
          </p>
          <a
            className="text-link"
            href="https://www.linkedin.com/company/med-mission-supplies"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn
            <ArrowUpRight size={18} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className="contact-form-panel">
          <ContactForm search={search} draft={draft} />
        </div>
      </section>
    </>
  );
}

function NotFound() {
  return (
    <section className="not-found section-space site-width">
      <h1>Page not found.</h1>
      <p>The page you’re looking for isn’t here.</p>
      <Button href="/index.html" renderIcon={ArrowRight}>
        Go to the homepage
      </Button>
    </section>
  );
}

export function App({
  page = "index",
  search,
  entry = "initial",
  contactDraft,
}) {
  const route = routes.find((item) => item.key === page);
  const Page =
    {
      index: NewHome,
      offerings: EquipmentCatalog,
      services: Services,
      articles: Articles,
      about: About,
      employment: Employment,
      contact: Contact,
    }[page] || NotFound;
  const content = route?.equipmentId ? (
    <EquipmentDetail
      item={equipment.find((item) => item.id === route.equipmentId)}
    />
  ) : route?.articleId ? (
    <ArticleDetail
      item={articles.find((item) => item.id === route.articleId)}
    />
  ) : (
    <Page search={search} draft={contactDraft} />
  );
  return (
    <Theme theme="white" className="mms-site">
      <SiteHeader page={page} />
      <div
        key={entry}
        className={`page-content${page === "index" ? " home-page" : ""}`}
        style={{ viewTransitionName: `mms-${page}` }}
      >
        <main id="main-content" tabIndex={-1}>
          {content}
        </main>
        <SiteFooter />
      </div>
    </Theme>
  );
}
