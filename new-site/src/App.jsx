import React, { useState, useRef } from 'react';
import { CONTACT_ENDPOINT, sendInquiry } from './contact-service.mjs';
import {
  Button, Grid, Column, ClickableTile, Header, HeaderName, HeaderNavigation,
  HeaderMenuItem, HeaderMenuButton, SideNav, SideNavItems, SideNavLink,
  SkipToContent, Theme, TextInput, TextArea, InlineNotification, Breadcrumb, BreadcrumbItem,
} from '@carbon/react';
import {
  ArrowRight, ArrowUpRight, Delivery, Earth, Partnership, Scan, View,
  Favorite, ImageMedical, Education, Chat, Time, LogoLinkedin, Checkmark,
} from '@carbon/icons-react';

const navigation = [
  ['index', 'Home'], ['offerings', 'Our Offerings'], ['about', 'About & Team'],
  ['employment', 'Employment'], ['contact', 'Contact Us'],
];
export const pageFromPath = path => {
  const part = path.split('/').filter(Boolean).pop()?.replace(/\.html$/, '') || 'index';
  return navigation.some(([id]) => id === part) ? part : 'not-found';
};

const offerings = [
  { id: 'ultrasound', title: 'Ultrasound equipment', model: 'SonoSite M-Turbo', icon: Scan, summary: 'Portable imaging for care beyond the hospital.', description: 'Portable ultrasound systems selected for durability and clear imaging, supporting maternal health, emergency diagnostics, and routine screenings in remote locations.' },
  { id: 'endoscopy', title: 'Endoscopy systems', model: 'Olympus GIF-160', icon: View, summary: 'A clearer view. A more confident next step.', description: 'Endoscopy systems and interchangeable scopes for gastrointestinal and ENT procedures. Compact equipment helps mission clinics access essential visualization tools without excessive bulk.' },
  { id: 'ekg', title: 'EKG machines', model: 'ZOLL M Series', icon: Favorite, summary: 'Practical tools for essential cardiac assessment.', description: 'Equipment options for cardiac assessment, with portability and everyday use in mind. Talk with us about the setup your clinic needs.' },
  { id: 'xray', title: 'Portable X-ray units', model: 'MinXray HF100/200', icon: ImageMedical, summary: 'Essential radiography. Wherever care happens.', description: 'Portable X-ray units with digital imaging panels, selected for low-power operation and simple setup in field hospitals and rural clinics without fixed imaging infrastructure.' },
];

function SiteHeader({ page }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigationRef = useRef(null);
  const closeMenu = () => { setOpen(false); menuRef.current?.focus(); };
  React.useEffect(() => {
    if (open) navigationRef.current?.querySelector('a')?.focus();
  }, [open]);
  React.useEffect(() => {
    const desktop = window.matchMedia('(min-width: 66rem)');
    const resetMenu = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', resetMenu);
    return () => desktop.removeEventListener('change', resetMenu);
  }, []);
  return <>
    <Header aria-label="Med Mission Supplies" className="site-header" onKeyDown={event => { if (event.key === 'Escape' && open) { event.preventDefault(); closeMenu(); } }}>
      <SkipToContent href="#main-content" />
      <HeaderMenuButton ref={menuRef} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="mobile-navigation" aria-expanded={open} isActive={open} onClick={() => setOpen(!open)} />
      <HeaderName href="/index.html" prefix="" className="brand">
        <img src="/assets/mms-logo.png" alt="" width="56" height="56" />
        <span>Med Mission<span className="brand-second">Supplies</span></span>
      </HeaderName>
      <HeaderNavigation aria-label="Main navigation">
        {navigation.map(([id, label]) => <HeaderMenuItem key={id} href={`/${id}.html`} isCurrentPage={page === id} aria-current={page === id ? 'page' : undefined}>{label}</HeaderMenuItem>)}
      </HeaderNavigation>
      <div className="header-purpose">Equipment with purpose.</div>
      <SideNav ref={navigationRef} id="mobile-navigation" aria-label="Mobile navigation" aria-hidden={!open} expanded={open} isPersistent={false} addFocusListeners={false} addMouseListeners={false} onOverlayClick={closeMenu} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget) && event.relatedTarget !== menuRef.current) setOpen(false); }}>
        <SideNavItems>{navigation.map(([id, label]) => <SideNavLink key={id} href={`/${id}.html`} isActive={page === id} aria-current={page === id ? 'page' : undefined} onClick={closeMenu}>{label}</SideNavLink>)}</SideNavItems>
      </SideNav>
    </Header>
  </>;
}

function Eyebrow({ children, light = false }) { return <p className={`eyebrow${light ? ' eyebrow-light' : ''}`}>{children}</p>; }

function ContactBand() {
  return <Theme theme="g100" className="contact-band dark-region">
    <Grid className="site-grid">
      <Column sm={4} md={5} lg={11}><Eyebrow light>LET’S TALK ABOUT YOUR MISSION</Eyebrow><h2>Good care starts with<br />the right support.</h2></Column>
      <Column sm={4} md={3} lg={5} className="contact-band-action"><p>Tell us what your clinic needs.<br />We’re here to help you find a way forward.</p><Button href="/contact.html" renderIcon={ArrowRight} className="gold-button">Start a conversation</Button></Column>
    </Grid>
  </Theme>;
}

function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-top site-width">
      <a className="footer-brand" href="/index.html"><img src="/assets/mms-logo-white.png" alt="" width="88" height="59" /><span>Med Mission Supplies<span>Supporting care. Expanding possibilities.</span></span></a>
      <a className="footer-social" href="https://www.linkedin.com/company/med-mission-supplies" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <LogoLinkedin size={20} /><span className="sr-only"> (opens in a new tab)</span></a>
    </div>
    <div className="footer-bottom site-width"><p>© {new Date().getFullYear()} Med Mission Supplies</p><nav aria-label="Footer navigation">{navigation.slice(1).map(([id, label]) => <a key={id} href={`/${id}.html`}>{label}</a>)}</nav></div>
  </footer>;
}

function Home() {
  return <>
    <Theme theme="g100" className="home-hero dark-region">
      <Grid className="site-grid hero-grid">
        <Column sm={4} md={5} lg={9} className="hero-copy">
          <Eyebrow light>FOR MISSION HOSPITALS & REMOTE CLINICS</Eyebrow>
          <h1>Better equipment.<br /><span>Greater reach.</span></h1>
          <p className="hero-description">Reliable medical tools for the places that need them most. We help you navigate equipment and logistics, so you can focus on caring for your community.</p>
          <div className="button-row"><Button href="/offerings.html" renderIcon={ArrowRight} className="gold-button">Explore our offerings</Button><Button kind="ghost" href="/about.html" className="light-ghost">Our mission</Button></div>
        </Column>
        <Column sm={4} md={3} lg={7} className="hero-seal">
          <div className="seal-frame"><img src="/assets/mms-logo.png" alt="Med Mission Supplies — medical care with a global mission" width="1024" height="1024" fetchPriority="high" /></div>
          <p>Supporting care, wherever you serve.</p>
        </Column>
      </Grid>
      <div className="hero-principles site-width"><span><Delivery size={24} />Portable equipment</span><span><Earth size={24} />A mission that reaches further</span><span><Partnership size={24} />Support beyond delivery</span></div>
    </Theme>
    <section className="offerings-overview section-space" aria-labelledby="offerings-heading">
      <Grid className="site-grid section-heading"><Column sm={4} md={4} lg={8}><Eyebrow>01 / OUR OFFERINGS</Eyebrow><h2 id="offerings-heading">Essential tools.<br />Extraordinary purpose.</h2></Column><Column sm={4} md={4} lg={8} className="section-intro"><p>Durable, portable equipment. Straightforward setup. Every recommendation starts with the realities of your clinic.</p><a className="text-link" href="/offerings.html">View all equipment <ArrowRight size={20} /></a></Column></Grid>
      <Grid className="site-grid equipment-grid">{offerings.map(({ id, title, model, icon: Icon, summary }, i) => <Column sm={4} md={4} lg={4} key={id}>
        <ClickableTile href={`/offerings.html#${id}`} className="equipment-tile"><div className="tile-top"><Icon size={32} /><span>0{i + 1}</span></div><h3>{title}</h3><p>{summary}</p><div className="tile-bottom"><span>{model}</span><ArrowRight size={24} /></div></ClickableTile>
      </Column>)}</Grid>
    </section>
    <section className="mission-section" aria-labelledby="mission-heading"><Grid className="site-grid">
      <Column sm={4} md={3} lg={7} className="mission-image"><img src="/assets/mms-banner-center.png" alt="The Med Mission Supplies seal on our blue and gold banner" width="1536" height="1024" loading="lazy" /></Column>
      <Column sm={4} md={5} lg={9} className="mission-copy"><Eyebrow>02 / WHY WE’RE HERE</Eyebrow><h2 id="mission-heading">More than equipment.<br />A partner in your mission.</h2><p>We’re founded by people with hands-on experience in medical equipment and shipping support for mission hospitals and remote clinics.</p><p>By keeping overhead low and making thoughtful use of refurbished, portable equipment, we help caregivers access the tools they need. Practical equipment guidance and ongoing remote support help local teams plan for everyday use.</p><a className="text-link" href="/about.html">Get to know Med Mission Supplies <ArrowRight size={20} /></a></Column>
    </Grid></section>
    <ContactBand />
  </>;
}

function PageHero({ page, eyebrow, title, description, children }) {
  return <Theme theme="g100" className="page-hero dark-region"><Grid className="site-grid">
    <Column sm={4} md={8} lg={16}><Breadcrumb noTrailingSlash className="page-breadcrumb"><BreadcrumbItem href="/index.html">Home</BreadcrumbItem><BreadcrumbItem isCurrentPage>{navigation.find(([id]) => id === page)?.[1]}</BreadcrumbItem></Breadcrumb></Column>
    <Column sm={4} md={5} lg={10} className="page-hero-copy"><Eyebrow light>{eyebrow}</Eyebrow><h1>{title}</h1><p>{description}</p></Column>
    <Column sm={4} md={3} lg={6} className="page-hero-aside">{children || <img className="page-seal" src="/assets/mms-logo-white.png" alt="" width="1500" height="1000" />}</Column>
  </Grid></Theme>;
}

function Offerings() {
  return <>
    <PageHero page="offerings" eyebrow="EQUIPMENT THAT GOES THE DISTANCE" title={<>The right tools.<br /><span>For your reality.</span></>} description="Medical equipment selected with remote care in mind: portable, practical, and supported by people who understand your mission." />
    <section className="offerings-detail section-space" aria-label="Our equipment">
      <div className="site-width equipment-intro"><p>Explore our core equipment categories.</p><p>Models below are examples of our offerings. Contact us to discuss availability and the right fit for your clinic.</p></div>
      {offerings.map(({ id, title, model, icon: Icon, description }, i) => <article className="equipment-detail site-width" id={id} key={id}>
        <div className="equipment-identity"><span className="detail-number">0{i + 1}</span><Icon size={56} /></div>
        <div className="equipment-description"><h2>{title}</h2><p>{description}</p><a className="text-link" href={`/contact.html?equipment=${encodeURIComponent(title)}`}>Discuss {id === 'xray' ? 'X-ray' : id === 'ekg' ? 'EKG' : id} needs <ArrowRight size={20} /></a></div>
        <div className="model-panel"><span>FEATURED SYSTEM</span><h3>{model}</h3><p>{id === 'ultrasound' ? 'Portable ultrasound' : id === 'endoscopy' ? 'Systems & interchangeable scopes' : id === 'ekg' ? 'Cardiac assessment equipment' : 'Portable digital imaging'}</p></div>
      </article>)}
    </section>
    <section className="support-note site-width"><Partnership size={32} /><div><h2>Expertise first. Always.</h2><p>Our approach is a conversation, not a sales pitch. We’ll help you consider portability, setup, and maintenance so your equipment supports the way you work.</p></div></section>
    <ContactBand />
  </>;
}

function About() {
  return <>
    <PageHero page="about" eyebrow="ABOUT MED MISSION SUPPLIES" title={<>The mission is care.<br /><span>Our role is support.</span></>} description="We help clinics and mission hospitals access essential medical tools, with the practical expertise to put them to work." />
    <section className="about-story section-space"><Grid className="site-grid"><Column sm={4} md={3} lg={6}><Eyebrow>OUR PURPOSE</Eyebrow><h2>So you can focus<br />on patient care.</h2></Column><Column sm={4} md={5} lg={10} className="reading-copy"><p>Med Mission Supplies was founded with a mission-driven spirit: to serve clinics and mission hospitals in underserved regions. Our team brings hands-on experience in medical equipment and shipping support.</p><p>We work to reduce the burden of high costs and complicated logistics. By minimizing overhead and making thoughtful use of refurbished, portable equipment, we help our partners access durable tools for the realities of remote care.</p><p>Our commitment continues beyond delivery. Practical equipment guidance and ongoing remote support help local teams work through setup questions and plan for everyday use.</p></Column></Grid></section>
    <section className="values-section" aria-label="Our approach"><div className="values-grid site-width">{[
      [Delivery, 'Practical equipment', 'Portable tools, straightforward setup, and manageable maintenance for clinics working with limited resources.'],
      [Education, 'Knowledge that stays', 'Practical equipment information and setup guidance for the people who use it.'],
      [Partnership, 'Lasting partnerships', 'Ongoing remote support and sustainable relationships built around your community’s needs.'],
    ].map(([Icon, title, text]) => <article className="value-item" key={title}><Icon size={32} /><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="team-section section-space" aria-labelledby="team-heading"><Grid className="site-grid section-heading"><Column sm={4} md={4} lg={8}><Eyebrow>THE PEOPLE BEHIND THE MISSION</Eyebrow><h2 id="team-heading">Meet our team.</h2></Column><Column sm={4} md={4} lg={8} className="section-intro"><p>A shared commitment to making essential medical equipment more accessible.</p></Column></Grid>
      <div className="team-grid site-width">{[
        ['LH', 'Lynette Hwang', 'Founder & CEO'], ['VL', 'Vincent Larkin', 'Director of Operations'], ['JL', 'John Landman', 'Assistant Programmer'],
      ].map(([initials, name, role]) => <article className="team-member" key={name}><div className="team-initials" aria-hidden="true">{initials}</div><div><h3>{name}</h3><p>{role}</p></div></article>)}</div>
    </section>
    <ContactBand />
  </>;
}

function Employment() {
  return <>
    <PageHero page="employment" eyebrow="WORK WITH PURPOSE" title={<>Bring your skills.<br /><span>Support a mission.</span></>} description="We’re building a team that’s passionate about helping caregivers serve communities in need." />
    <section className="careers-section section-space"><Grid className="site-grid"><Column sm={4} md={4} lg={8}><Eyebrow>CAREER OPPORTUNITIES</Eyebrow><h2>Your next chapter<br />could help someone else’s.</h2><p className="careers-description">Our work connects medical equipment, practical support, and a commitment to better access to care. If that purpose speaks to you, explore opportunities with Med Mission Supplies.</p></Column><Column sm={4} md={4} lg={8} className="careers-aside"><div className="opportunity-panel"><LogoLinkedin size={40} /><Eyebrow>STAY CONNECTED</Eyebrow><h3>Find us on LinkedIn.</h3><p>Visit our company page for updates, current opportunities, and application details. You can also check back here as our team grows.</p><Button href="https://www.linkedin.com/company/med-mission-supplies" target="_blank" rel="noopener noreferrer" renderIcon={ArrowUpRight}>Visit our LinkedIn page<span className="sr-only"> (opens in a new tab)</span></Button></div><div className="careers-question"><h3>A question about our team?</h3><p>We’re happy to hear from people who share our mission.</p><a href="/contact.html" className="text-link">Get in touch <ArrowRight size={20} /></a></div></Column></Grid></section>
  </>;
}

function ContactForm() {
  const [state, setState] = useState('idle');
  const [fieldErrors, setFieldErrors] = useState({});
  const [inquiry, setInquiry] = useState('');
  const notificationRef = useRef(null);
  const submitting = useRef(false);
  // Read optional equipment context after hydration so static HTML stays consistent.
  React.useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('equipment');
    if (offerings.some(item => item.title === requested)) {
      const subject = requested.replace(/^[A-Z][a-z]+/, word => word.toLowerCase());
      setInquiry(`I’d like to discuss ${subject} for our clinic.\n\n`);
    }
  }, []);
  React.useEffect(() => {
    if (state === 'success' || state === 'error') notificationRef.current?.focus();
  }, [state]);
  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const errors = {};
    if (!String(data.get('name') || '').trim()) errors.name = 'Enter your name.';
    if (!String(data.get('message') || '').trim()) errors.message = 'Tell us how we can help.';
    setFieldErrors(errors);
    if (Object.keys(errors).length) { form.elements[Object.keys(errors)[0]].focus(); return; }
    submitting.current = true;
    setState('submitting');
    try {
      await sendInquiry(data);
      setState('success');
      form.reset();
      setInquiry('');
    } catch {
      setState('error');
    } finally { submitting.current = false; }
  }
  if (state === 'success') return <div className="form-success" ref={notificationRef} tabIndex={-1} role="status"><div className="success-mark"><Checkmark size={32} /></div><h2>Thank you for reaching out.</h2><p>Your message has been sent to Med Mission Supplies. We aim to respond within 48 hours.</p><Button kind="tertiary" onClick={() => setState('idle')}>Send another message</Button></div>;
  return <form className="contact-form" action={CONTACT_ENDPOINT} method="POST" onSubmit={submit} aria-busy={state === 'submitting'}>
    <h2>Tell us how we can help.</h2><p className="form-intro">All fields are required.</p>
    <TextInput id="name" name="name" labelText="Your name" autoComplete="name" required maxLength={160} invalid={!!fieldErrors.name} invalidText={fieldErrors.name} onChange={() => setFieldErrors(errors => ({ ...errors, name: undefined }))} />
    <TextInput id="email" name="email" type="email" labelText="Email address" autoComplete="email" required maxLength={254} />
    <TextArea id="message" name="message" labelText="Your message" helperText="Tell us about your clinic, equipment needs, or the support you’re looking for." rows={6} required maxLength={6000} value={inquiry} onChange={event => { setInquiry(event.target.value); setFieldErrors(errors => ({ ...errors, message: undefined })); }} invalid={!!fieldErrors.message} invalidText={fieldErrors.message} />
    {state === 'error' && <div ref={notificationRef} tabIndex={-1}><InlineNotification kind="error" title="We couldn’t confirm delivery." subtitle="Your message is still here. Check your connection and try again, or contact us through LinkedIn." hideCloseButton lowContrast /><a className="text-link form-fallback" href="https://www.linkedin.com/company/med-mission-supplies" target="_blank" rel="noopener noreferrer">Open our LinkedIn page <ArrowUpRight size={16} /><span className="sr-only"> (opens in a new tab)</span></a></div>}
    <Button type="submit" renderIcon={ArrowRight} disabled={state === 'submitting'}>{state === 'submitting' ? 'Sending message…' : 'Send message'}</Button>
  </form>;
}

function Contact() {
  return <>
    <PageHero page="contact" eyebrow="LET’S START A CONVERSATION" title={<>Your mission.<br /><span>Our shared purpose.</span></>} description="Whether you’re equipping a remote clinic or planning a mission project, we’re ready to listen." />
    <section className="contact-section section-space"><Grid className="site-grid"><Column sm={4} md={5} lg={8}><ContactForm /></Column><Column sm={4} md={3} lg={{ span: 6, start: 11 }} className="contact-information"><Eyebrow>CONTACT MED MISSION SUPPLIES</Eyebrow><h2>We’re here<br />to help you care.</h2><p>Tell us what you need, where you serve, and the challenges you’re working through. We’ll help you explore the right equipment and support.</p><div className="contact-detail"><Time size={24} /><div><h3>A thoughtful response</h3><p>We aim to respond within 48 hours.</p></div></div><div className="contact-detail"><Chat size={24} /><div><h3>A helpful conversation</h3><p>Equipment questions, logistics, setup guidance, or ongoing support — we’re happy to talk.</p></div></div><a className="text-link" href="https://www.linkedin.com/company/med-mission-supplies" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <ArrowUpRight size={20} /><span className="sr-only"> (opens in a new tab)</span></a></Column></Grid></section>
  </>;
}

function NotFound() {
  return <section className="not-found section-space site-width"><Eyebrow>PAGE NOT FOUND</Eyebrow><h1>Let’s get you back on track.</h1><p>The page you’re looking for isn’t here.</p><Button href="/index.html" renderIcon={ArrowRight}>Go to the homepage</Button></section>;
}

export function App({ page = 'index' }) {
  const Page = { index: Home, offerings: Offerings, about: About, employment: Employment, contact: Contact }[page] || NotFound;
  return <Theme theme="white" className="mms-site"><SiteHeader page={page} /><div className="page-content" style={{ viewTransitionName: `mms-${page}` }}><main id="main-content" tabIndex={-1}><Page /></main><SiteFooter /></div></Theme>;
}
