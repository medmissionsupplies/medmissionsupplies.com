import React, { useState, useRef } from "react";
import { version } from "../package.json";
import { CONTACT_ENDPOINT, sendInquiry } from "./contact-service.mjs";
import { pageKey } from "./page-navigation.mjs";
import {
  Button,
  Grid,
  Column,
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
  Breadcrumb,
  BreadcrumbItem,
} from "@carbon/react";
import {
  ArrowRight,
  ArrowUpRight,
  Delivery,
  Partnership,
  Education,
  Chat,
  Time,
  LogoLinkedin,
  Checkmark,
} from "@carbon/icons-react";

import {
  NewHome,
  EquipmentCatalog,
  EquipmentDetail,
  Articles,
  ArticleDetail,
  Services,
  NewContactBand,
  Photo,
} from "./Explore.jsx";
import { equipment } from "./catalog.mjs";
import { articles } from "./articles.mjs";
import { routes } from "./routes.mjs";

const navigation = [
  ["index", "Home"],
  ["offerings", "Equipment"],
  ["services", "Our Services"],
  ["articles", "Resources"],
  ["about", "Our Story"],
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
          {navigation.map(([id, label]) => (
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
          Let’s talk equipment <ArrowUpRight size={18} />
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

function Eyebrow({ children, light = false }) {
  return (
    <p className={`eyebrow${light ? " eyebrow-light" : ""}`}>{children}</p>
  );
}

function ContactBand() {
  return <NewContactBand />;
}

function SiteFooter() {
  return (
    <footer className="site-footer redesigned-footer">
      <div className="content-width footer-main">
        <div className="footer-identity">
          <a className="footer-brand" href="/index.html">
            <img
              src="/assets/mms-logo-white.png"
              alt=""
              width="88"
              height="59"
            />
            <span>Med Mission Supplies</span>
          </a>
          <p>
            Hospital equipment. Human purpose.
            <br />
            Procurement, support, and service
            <br />
            for the places that care.
          </p>
          <a
            className="footer-social"
            href="https://www.linkedin.com/company/med-mission-supplies"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find us on LinkedIn <LogoLinkedin size={18} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <nav aria-label="Explore">
          <h2>Explore</h2>
          <a href="/offerings.html">Equipment</a>
          <a href="/services.html">Our services</a>
          <a href="/articles.html">Resources & articles</a>
        </nav>
        <nav aria-label="Med Mission Supplies">
          <h2>Med Mission Supplies</h2>
          <a href="/about.html">Our story & team</a>
          <a href="/employment.html">Join our team</a>
          <a href="/contact.html">Get in touch</a>
        </nav>
        <div className="footer-purpose">
          <span>
            GOOD EQUIPMENT.
            <br />
            GREATER POSSIBILITIES.
          </span>
          <a href="/contact.html?topic=charitable">
            Ask about charitable pricing <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      <div className="content-width footer-bottom">
        <p>
          © {new Date().getFullYear()} Med Mission Supplies{" "}
          <span className="site-version">v{version}</span>
        </p>
        <p>Procure. Support. Service.</p>
      </div>
    </footer>
  );
}

function PageHero({ page, eyebrow, title, description, children }) {
  return (
    <Theme theme="g100" className="page-hero dark-region">
      <Grid className="site-grid">
        <Column sm={4} md={8} lg={16}>
          <Breadcrumb noTrailingSlash className="page-breadcrumb">
            <BreadcrumbItem href="/index.html">Home</BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              {navigation.find(([id]) => id === page)?.[1]}
            </BreadcrumbItem>
          </Breadcrumb>
        </Column>
        <Column sm={4} md={5} lg={10} className="page-hero-copy">
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          <p>{description}</p>
        </Column>
        <Column sm={4} md={3} lg={6} className="page-hero-aside">
          {children || (
            <Photo
              name={page === "about" ? "operating-room" : "equipment-detail"}
              className="page-hero-photo"
              eager
            />
          )}
        </Column>
      </Grid>
    </Theme>
  );
}

function About() {
  return (
    <>
      <PageHero
        page="about"
        eyebrow="ABOUT MED MISSION SUPPLIES"
        title={
          <>
            The mission is care.
            <br />
            <span>Our role is support.</span>
          </>
        }
        description="We help hospitals and clinics access capital equipment, with procurement, support, and service shaped around the people they care for."
      />
      <section className="about-story section-space">
        <Grid className="site-grid">
          <Column sm={4} md={3} lg={6}>
            <Eyebrow>OUR PURPOSE</Eyebrow>
            <h2>
              So you can focus
              <br />
              on patient care.
            </h2>
          </Column>
          <Column sm={4} md={5} lg={10} className="reading-copy">
            <p>
              Med Mission Supplies was founded with a mission-driven spirit: to
              serve clinics and mission hospitals in underserved regions. Our
              team brings hands-on experience in medical equipment and shipping
              support.
            </p>
            <p>
              We work to reduce the burden of high costs and complicated
              logistics. We source across almost every major hospital equipment
              category, with wholesale pricing and charitable pricing for
              mission-driven projects. Our conversations consider the equipment,
              its destination, and the support needed beyond the purchase.
            </p>
            <p>
              Our commitment continues beyond delivery. Practical equipment
              guidance and ongoing remote support help local teams work through
              setup questions and plan for everyday use.
            </p>
          </Column>
        </Grid>
      </section>
      <section className="values-section" aria-label="Our approach">
        <div className="values-grid site-width">
          {[
            [
              Delivery,
              "Hospital-wide sourcing",
              "Capital equipment across departments, selected around your team’s requirements and your facility’s budget.",
            ],
            [
              Education,
              "Knowledge that stays",
              "Practical equipment information and setup guidance for the people who use it.",
            ],
            [
              Partnership,
              "Lasting partnerships",
              "Ongoing remote support and sustainable relationships built around your community’s needs.",
            ],
          ].map(([Icon, title, text]) => (
            <article className="value-item" key={title}>
              <Icon size={32} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        className="team-section section-space"
        aria-labelledby="team-heading"
      >
        <Grid className="site-grid section-heading">
          <Column sm={4} md={4} lg={8}>
            <Eyebrow>THE PEOPLE BEHIND THE MISSION</Eyebrow>
            <h2 id="team-heading">Meet our team.</h2>
          </Column>
          <Column sm={4} md={4} lg={8} className="section-intro">
            <p>
              A shared commitment to making essential medical equipment more
              accessible.
            </p>
          </Column>
        </Grid>
        <div className="team-grid site-width">
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
      <ContactBand />
    </>
  );
}

function Employment() {
  return (
    <>
      <PageHero
        page="employment"
        eyebrow="WORK WITH PURPOSE"
        title={
          <>
            Bring your skills.
            <br />
            <span>Support a mission.</span>
          </>
        }
        description="We’re building a team that’s passionate about helping caregivers serve communities in need."
      />
      <section className="careers-section section-space">
        <Grid className="site-grid">
          <Column sm={4} md={4} lg={8}>
            <Eyebrow>CAREER OPPORTUNITIES</Eyebrow>
            <h2>
              Your next chapter
              <br />
              could help someone else’s.
            </h2>
            <p className="careers-description">
              Our work connects medical equipment, practical support, and a
              commitment to better access to care. If that purpose speaks to
              you, explore opportunities with Med Mission Supplies.
            </p>
          </Column>
          <Column sm={4} md={4} lg={8} className="careers-aside">
            <div className="opportunity-panel">
              <LogoLinkedin size={40} />
              <Eyebrow>STAY CONNECTED</Eyebrow>
              <h3>Find us on LinkedIn.</h3>
              <p>
                Visit our company page for updates, current opportunities, and
                application details. You can also check back here as our team
                grows.
              </p>
              <Button
                href="https://www.linkedin.com/company/med-mission-supplies"
                target="_blank"
                rel="noopener noreferrer"
                renderIcon={ArrowUpRight}
              >
                Visit our LinkedIn page
                <span className="sr-only"> (opens in a new tab)</span>
              </Button>
            </div>
            <div className="careers-question">
              <h3>A question about our team?</h3>
              <p>We’re happy to hear from people who share our mission.</p>
              <a href="/contact.html" className="text-link">
                Get in touch <ArrowRight size={20} />
              </a>
            </div>
          </Column>
        </Grid>
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
      <h2>Tell us how we can help.</h2>
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
        helperText="Tell us about your facility, equipment, destination, budget, or service needs."
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
      <PageHero
        page="contact"
        eyebrow="LET’S START A CONVERSATION"
        title={
          <>
            Your mission.
            <br />
            <span>Our shared purpose.</span>
          </>
        }
        description="A single system, a hospital department, or an ongoing service need. Tell us what you have in mind."
      />
      <section className="contact-section section-space">
        <Grid className="site-grid">
          <Column sm={4} md={5} lg={8}>
            <ContactForm search={search} draft={draft} />
          </Column>
          <Column
            sm={4}
            md={3}
            lg={{ span: 6, start: 11 }}
            className="contact-information"
          >
            <Eyebrow>CONTACT MED MISSION SUPPLIES</Eyebrow>
            <h2>
              We’re here
              <br />
              to help you care.
            </h2>
            <p>
              Tell us what you need, where you serve, and the challenges you’re
              working through. We’ll help you explore the right equipment and
              support.
            </p>
            <div className="contact-detail">
              <Time size={24} />
              <div>
                <h3>A thoughtful response</h3>
                <p>We aim to respond within 48 hours.</p>
              </div>
            </div>
            <div className="contact-detail">
              <Chat size={24} />
              <div>
                <h3>A helpful conversation</h3>
                <p>
                  Equipment questions, logistics, setup guidance, or ongoing
                  support — we’re happy to talk.
                </p>
              </div>
            </div>
            <a
              className="text-link"
              href="https://www.linkedin.com/company/med-mission-supplies"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn <ArrowUpRight size={20} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Column>
        </Grid>
      </section>
    </>
  );
}

function NotFound() {
  return (
    <section className="not-found section-space site-width">
      <Eyebrow>PAGE NOT FOUND</Eyebrow>
      <h1>Let’s get you back on track.</h1>
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
