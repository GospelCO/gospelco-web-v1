import { useEffect, useState, type ReactNode } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import {
  ArrowUpRight, Menu, X, Globe, Video, Palette, Sparkles, ChevronRight
} from "lucide-react";
import { services, waUrl, type Service } from "./data/services";

const START_MESSAGE = "Hi GospelCO, I want to book a strategy call.";
const FINAL_MESSAGE = "Hi GospelCO, let's build a system for my business.";
const ENQUIRY_MESSAGE = "Hi GospelCO, I'd like to make an enquiry.";

function Meta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      const createdMeta = document.createElement("meta");
      createdMeta.name = "description";
      document.head.appendChild(createdMeta);
      meta = createdMeta;
    }
    meta.content = description;
  }, [title, description]);
  return null;
}

function PageMotion() {
  const { pathname } = useLocation();
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hash = window.location.hash;
    window.requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1));
        if (target) target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        else window.scrollTo({ top: 0, behavior: "auto" });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    });
    const targets = document.querySelectorAll("[data-reveal]");
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  return <header className="site-header redesigned-header">
    <Link className="brand brand-wordmark" to="/" aria-label="GospelCO home"><img src="/assets/images/logo/logo-white.svg" alt="GospelCO" /></Link>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
      <span>{open ? "Close" : "Menu"}</span>{open ? <X size={18} /> : <Menu size={18} />}
    </button>
    <nav id="main-nav" className={open ? "open" : ""}>
      <a href="/#case-studies" onClick={() => setOpen(false)}>Growth system</a>
      <a href="/#capabilities" onClick={() => setOpen(false)}>Capabilities</a>
      <a href="/#approach" onClick={() => setOpen(false)}>Our approach</a>
      <a className="nav-cta" href={waUrl(START_MESSAGE)}>Book a strategy call <ArrowUpRight size={14} /></a>
    </nav>
  </header>;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="eyebrow"><span className="eyebrow-dot" />{children}</p>;
}

function Home() {
  const growthSystem = [
    { number: "01", label: "CLARIFY", title: "Start with the right question.", body: "Get clear on your offer, audience and priorities before deciding what to make.", path: "/services/brand-strategy", link: "Explore brand strategy" },
    { number: "02", label: "BUILD", title: "Make the brand work harder.", body: "Bring identity and digital touchpoints into a consistent, useful experience.", path: "/services/web-design", link: "Explore web design" },
    { number: "03", label: "SUSTAIN", title: "Create with a clear purpose.", body: "Plan the visual and video content that helps your business show up consistently.", path: "/services/video-editing", link: "Explore content" }
  ];
  return <div className="redesign-site">
    <Meta title="Branding, Website Design & Social Media Content | GospelCO" description="GospelCO provides branding and brand identity design, business website design, video editing and social media content production for growing businesses." />
    <Header />
    <main>
      <section className="new-hero" id="top">
        <div className="wrap new-hero-grid">
          <div className="new-hero-copy" data-reveal>
            <SectionLabel>Strategy · Brand · Digital</SectionLabel>
            <h1>Branding, Website Design <span>&amp; Content for Growing Businesses</span></h1>
            <p className="new-hero-lead">GospelCO helps businesses build a stronger brand, create professional websites and produce marketing content that reaches the right customers. We combine clear strategy with practical creative work to help your business grow.</p>
            <div className="actions"><a className="btn btn-primary" href={waUrl(START_MESSAGE)}>Plan your next move <ArrowUpRight size={16}/></a><a className="btn btn-outline dark-outline" href="#capabilities">Explore capabilities <ChevronRight size={15}/></a></div>
            <p className="new-hero-note"><span className="purple-dot"/> Clear scope. Considered creative. Built around your brief.</p>
          </div>
          <div className="studio-visual" data-reveal>
            <img src="/assets/images/hero/hero-image.webp" alt="GospelCO creative portrait representing the brand and digital studio" width="736" height="736" loading="eager" />
            <div className="studio-visual-shade" />
            <div className="studio-visual-caption"><span>GOSPELCO / STUDIO</span><span>STRATEGY INTO SYSTEMS</span></div>
            <div className="studio-visual-note"><span>THE WORK</span><strong>Clarity <i>→</i> Identity <i>→</i> Digital</strong></div>
          </div>
        </div>
      </section>

      <section className="brand-trust" aria-label="GospelCO areas of work">
        <div className="wrap brand-trust-inner"><span>Brand strategy</span><i/><span>Visual identity</span><i/><span>Web experiences</span><i/><span>Content production</span></div>
      </section>

      <section className="new-section case-section" id="case-studies">
        <div className="wrap"><div className="new-section-heading" data-reveal><SectionLabel>A clear growth approach</SectionLabel><h2>A Clear Strategy for <span>Your Brand and Marketing</span></h2><p>Branding, digital marketing and content decisions work better when they are made with the same business priorities and practical growth goals in mind.</p></div>
          <div className="growth-grid">{growthSystem.map((item)=><article className="growth-card" key={item.number} data-reveal>
            <div className="growth-card-top"><span>{item.number}</span><span>{item.label}</span></div><h3>{item.title}</h3><p>{item.body}</p><Link className="text-link" to={item.path}>{item.link} <ChevronRight size={14}/></Link>
          </article>)}</div>
        </div>
      </section>

      <section className="new-section capabilities-section" id="capabilities">
        <div className="wrap"><div className="new-section-heading" data-reveal><SectionLabel>Core capabilities</SectionLabel><h2>Our Branding, Website <span>and Content Services</span></h2><p>Choose business website design, brand identity design or social media content production for your next project. We will confirm the scope, deliverables and next steps before work begins.</p></div>
          <div className="capability-grid">
            <article data-reveal><span className="capability-icon"><Globe size={23}/></span><span className="capability-number">01 / WEBSITE DESIGN</span><div className="capability-art capability-art-web"><img src="/assets/images/services/website_services.png" alt="Professional website displayed on a laptop and smartphone" loading="lazy"/></div><h3>Business website design</h3><ul><li>Business websites and landing pages</li><li>Portfolio and service experiences</li><li>Responsive design and agreed integrations</li></ul><div className="capability-actions"><a className="text-link" href={waUrl("Hi GospelCO, I'd like to discuss a website for my business.")}><span className="purple-dot" aria-hidden="true"/>Discuss a website</a><Link className="learn-more" to="/services/web-design">Explore web design <ChevronRight size={13}/></Link></div></article>
            <article data-reveal><span className="capability-icon"><Video size={23}/></span><span className="capability-number">02 / VIDEO &amp; CONTENT</span><div className="capability-art capability-art-video"><img src="/assets/images/services/Video_Services.png" alt="Video editing and social media content production presentation" loading="lazy"/><div className="video-phone" aria-hidden="true"><span>GOSPELCO</span><i/><i/><i/></div></div><h3>Video editing and social media content</h3><ul><li>Short-form video editing</li><li>AI-assisted advert concepts</li><li>Structured monthly content support</li></ul><div className="capability-actions"><a className="text-link" href={waUrl("Hi GospelCO, I'd like to discuss content production for my business.")}><span className="purple-dot" aria-hidden="true"/>Discuss content</a><Link className="learn-more" to="/services/video-editing">Explore content <ChevronRight size={13}/></Link></div></article>
            <article data-reveal><span className="capability-icon"><Palette size={23}/></span><span className="capability-number">03 / BRAND IDENTITY</span><div className="capability-art capability-art-brand"><img src="/assets/images/services/branding_services.png" alt="Branding and identity design presentation" loading="lazy"/></div><h3>Branding and brand identity design</h3><ul><li>Visual identity and design assets</li><li>Campaign and social graphics</li><li>Music cover art and packaging</li></ul><div className="capability-actions"><a className="text-link" href={waUrl("Hi GospelCO, I'd like to discuss brand identity and design.")}><span className="purple-dot" aria-hidden="true"/>Discuss brand design</a><Link className="learn-more" to="/services/graphic-design">Explore design <ChevronRight size={13}/></Link></div></article>
          </div>
        </div>
      </section>

      <section className="new-section values-section" id="approach"><div className="wrap values-panel" data-reveal><div className="values-symbol"><Sparkles size={34}/></div><div><SectionLabel>Our approach</SectionLabel><h2>How We Work: <span>Plan, Create and Improve</span></h2><p>We start by understanding your business, audience, priorities and constraints. From there, we use marketing strategy and practical creative work to shape a clear scope across branding, website design and social media content.</p><div className="studio-introduction"><div className="studio-photo-slot" role="img" aria-label="Reserved space for a real photograph of the GospelCO workspace"><span>GospelCO Studio</span></div><p>A focused creative studio for strategy, design and digital production. A real workspace photograph can be added here when available.</p></div><a className="btn btn-primary" href={waUrl("Hi GospelCO, I'd like to discuss the priorities for my business.")}>Let's discuss your goals <ArrowUpRight size={15}/></a></div></div></section>

      <section className="new-final-cta"><div className="wrap" data-reveal><SectionLabel>Ready for the next stage?</SectionLabel><h2>Let's Grow <span>Your Business</span></h2><p>Tell us about your business, the customers you want to reach and where you want to grow next.</p><a className="btn btn-primary" href={waUrl(FINAL_MESSAGE)}>Start a WhatsApp conversation <ArrowUpRight size={16}/></a></div></section>
    </main>
    <Footer />
    <FloatingWhatsApp />
  </div>;
}

function Footer() {
  return <footer className="site-footer"><div className="wrap footer-top">
    <div className="footer-brand-column"><Link className="brand brand-wordmark footer-brand" to="/"><img src="/assets/images/logo/logo-white.svg" alt="GospelCO" /></Link><p>Visual brand company based in Sango Ota, serving brands nationwide.</p></div>
    <div><strong>Explore</strong><a href="/#capabilities">Capabilities</a><a href="/#case-studies">Growth system</a><a href={waUrl(ENQUIRY_MESSAGE)}>Start a project</a></div>
    <div><strong>Company</strong><a href="/#approach">Our approach</a><a href="/studio-policy.html">Studio policy</a><a href="/content-disclaimer.html">Content disclaimer</a><a href="/credits-ai-disclosure.html">Credits & AI disclosure</a><a href="/privacy-policy.html">Privacy policy</a></div>
    <div><strong>Connect</strong><a href="https://www.instagram.com/gospelco.ng/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.pinterest.com/gospelco_/" target="_blank" rel="noopener noreferrer">Pinterest</a><a href={waUrl(ENQUIRY_MESSAGE)}>WhatsApp</a></div>
  </div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} GospelCO. All rights reserved.</span><span>Designed with purpose. Built for business.</span></div></footer>;
}

function FloatingWhatsApp() {
  return <a className="floating-wa" href={waUrl(START_MESSAGE)} aria-label="Start a project on WhatsApp"><span className="float-label">Start a project</span><ArrowUpRight size={16} /></a>;
}

function PageWrap({ children }: { children: ReactNode }) {
  return <div className="redesign-page"><Header />{children}<Footer /><FloatingWhatsApp /></div>;
}

function ServicePage({ service }: { service: Service }) {
  const seoTitles: Record<string, string> = {
    flyer: "Graphic Design and Social Media Content | GospelCO",
    music: "Music Cover Art and Brand Identity Design | GospelCO",
    "ai-video": "AI-Assisted Video Editing and Social Media Content | GospelCO",
    video: "Video Editing and Social Media Content Production | GospelCO",
    web: "Business Website Design and Development | GospelCO",
    strategy: "Marketing Strategy and Brand Consulting | GospelCO"
  };
  return <>
    <Meta title={seoTitles[service.id] ?? `${service.name} | GospelCO`} description={service.intro} />
    <PageWrap>
      <main className="service-page">
        <section className="hero wrap service-hero">
          <div className="hero-copy" data-reveal><nav className="service-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/#capabilities">Services</Link><span aria-hidden="true">/</span><span aria-current="page">{service.name}</span></nav><SectionLabel>GospelCO service · {service.number.split("/")[1]?.trim()}</SectionLabel><h1>{service.name} <em>for your brand.</em></h1><p className="lead">{service.intro}</p>
            <div className="actions"><a className="btn btn-primary" href={waUrl(service.needMessage)}>Order via WhatsApp <ArrowUpRight size={14}/></a><a className="btn btn-quiet" href="#pricing">View price <ChevronRight size={14}/></a></div>
            <p className="micro-proof"><span className="purple-dot"/> Scope and deadline confirmed before production.</p>
          </div>
          <div className="service-hero-art" data-reveal><div className="art-glow"/><div className="service-image-frame"><img src={service.image} alt={service.imageAlt} loading="eager"/><span className="image-edge-label">GOSPELCO / {service.number.split("/")[0].trim()}</span></div><div className="art-caption"><span>CREATIVE SERVICE</span><span>BUILT AROUND THE BRIEF</span></div></div>
        </section>
        <section className="section wrap">
          <div className="section-intro" data-reveal><SectionLabel>The offer</SectionLabel><h2>What This Service <em>Includes.</em></h2><p>{service.processDetail}</p></div>
          <div className="deliverable-grid">{service.deliverables.map((item, i) => <article key={item} data-reveal><b>{String(i+1).padStart(2,"0")}</b><span className="green-dot" aria-hidden="true"/><p>{item}</p></article>)}</div>
        </section>
        <section className="section service-price-section" id="pricing"><div className="wrap"><div className="section-head" data-reveal><div><SectionLabel>Pricing guide</SectionLabel><h2>Start with <em>{service.priceLabel}.</em></h2></div><p>Starting price shown for guidance. Final price depends on scope and confirmed deliverables.</p></div>
          <div className="price-panel" data-reveal><div><span className="price-eyebrow">{service.name}</span><h3>{service.priceLabel}<small>+ / starting point</small></h3><p>{service.priceUnit}. See the agreed quote for exact scope, timing, rights and inclusions.</p></div><div className="price-actions"><a className="btn btn-primary" href={waUrl(service.orderMessage)}>Discuss this service <ArrowUpRight size={14}/></a></div></div>
        </div></section>
        <section className="section wrap process service-process"><div data-reveal><SectionLabel>How it works</SectionLabel><h2>Plan, Create <em>and Improve.</em></h2><p>One clear company-wide process, adapted to the service and brief.</p></div><div className="steps"><article data-reveal><span>01</span><h3>Brief &amp; discovery</h3><p>{service.processDetail}</p></article><article data-reveal><span>02</span><h3>Create the first draft</h3><p>We work to the agreed deliverables and provide a draft or review point appropriate to this service.</p></article><article data-reveal><span>03</span><h3>Review &amp; revise</h3><p>Give clear feedback within the agreed revision rounds and scope.</p></article><article data-reveal><span>04</span><h3>Final handoff</h3><p>Receive the agreed final files after approval and the payment terms have been met.</p></article></div></section>
        <section className="section wrap"><div className="section-intro" data-reveal><SectionLabel>Frequently asked</SectionLabel><h2>Before we <em>start.</em></h2></div><div className="faq-list">{service.faqs.map(([question, answer]) => <details key={question} data-reveal><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
        <section className="section wrap other-services">
          <div className="section-head" data-reveal><div><SectionLabel>Keep exploring</SectionLabel><h2>Other <em>services.</em></h2></div><p>Bundled scopes are common. Pick another service, or head back to the full overview on the homepage.</p></div>
          <div className="other-service-grid">{services.filter((s) => s.id !== service.id).map((s) => <Link key={s.id} className="other-service-card" to={s.path}><span className="green-dot" aria-hidden="true"/><span><strong>{s.name}</strong><small>{s.priceLabel} · {s.priceUnit}</small></span><ChevronRight size={15}/></Link>)}</div>
          <div className="capability-actions" style={{marginTop:"22px"}}><Link className="learn-more" to="/">Back to homepage <ChevronRight size={13}/></Link></div>
        </section>
        <section className="final-cta"><div className="wrap" data-reveal><SectionLabel>Start a project</SectionLabel><h2>Let's make this work for <em>your brand.</em></h2><p>Send your brief and we will confirm scope, availability, next steps and the final quote before work begins.</p><div className="actions center-actions"><a className="btn btn-primary" href={waUrl(service.discussMessage)}>Discuss this service <ArrowUpRight size={14}/></a></div></div></section>
      </main>
    </PageWrap>
  </>;
}


function NotFound() {
  return <PageWrap><main className="cart-page wrap"><SectionLabel>Page not found</SectionLabel><h1>Let's get you <em>back on track.</em></h1><p>The page may have moved. Explore the services from the homepage.</p><Link className="btn btn-primary" to="/">Back to GospelCO</Link></main></PageWrap>;
}

export default function App() {
  return <><PageMotion/><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/index.html" element={<Home/>}/>
    {services.map((service) => <Route key={service.id} path={service.path} element={<ServicePage service={service}/>}/>)}
    <Route path="*" element={<NotFound/>}/>
  </Routes></>;
}
