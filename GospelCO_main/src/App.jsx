import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import {
  ArrowUpRight, BriefcaseBusiness, Check, Compass, Crown, Handshake,
  Menu, ShieldCheck, TrendingUp, X, Globe, Video, Palette, Sparkles
} from "lucide-react";
import { services, waUrl } from "./data/services.js";

const START_MESSAGE = "Hi GospelCO, I want to book a strategy call.";
const RETAINER_MESSAGE = "Hi GospelCO, I want to ask about the monthly retainer.";
const CONSULT_MESSAGE = "Hi GospelCO, I want to book a strategy session.";
const FINAL_MESSAGE = "Hi GospelCO, let's build a system for my business.";
const ENQUIRY_MESSAGE = "Hi GospelCO, I'd like to make an enquiry.";

function Doodle({ kind = "shield", className = "" }) {
  const shared = { strokeWidth: 1.15, "aria-hidden": true };
  const map = {
    crown: Crown,
    shield: ShieldCheck,
    compass: Compass,
    briefcase: BriefcaseBusiness,
    growth: TrendingUp,
    trending: TrendingUp,
    handshake: Handshake,
  };
  const Icon = map[kind] || ShieldCheck;
  const reducedMotion = useReducedMotion();
  const animate = !reducedMotion && ["doodle-shield", "doodle-compass", "problem-doodle", "final-doodle"].some((name) => className.includes(name));
  return <motion.span className={`doodle-motion ${className}`} aria-hidden="true" animate={animate ? { y: [-10, 10, -10], scale: [0.95, 1.05, 0.95] } : undefined} transition={animate ? { duration: 6, ease: "easeInOut", repeat: Infinity } : undefined}><Icon {...shared} className="doodle" /></motion.span>;
}

function Meta({ title, description }) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
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
    <Link className="brand brand-wordmark" to="/" aria-label="GospelCO home"><span>G</span>ospelCO<sup>TM</sup></Link>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
      <span>{open ? "Close" : "Menu"}</span>{open ? <X size={18} /> : <Menu size={18} />}
    </button>
    <nav id="main-nav" className={open ? "open" : ""}>
      <a href="/#case-studies" onClick={() => setOpen(false)}>Case studies</a>
      <a href="/#capabilities" onClick={() => setOpen(false)}>Capabilities</a>
      <a href="/#approach" onClick={() => setOpen(false)}>Our approach</a>
      <a className="nav-cta" href={waUrl(START_MESSAGE)}>Book a strategy call <ArrowUpRight size={14} /></a>
    </nav>
  </header>;
}

function SectionLabel({ children }) {
  return <p className="eyebrow"><span className="eyebrow-dot" />{children}</p>;
}

function HeroArtwork() {
  return <div className="hero-art-wrap" data-reveal>
    <Doodle kind="shield" className="doodle-shield" />
    <Doodle kind="compass" className="doodle-compass" />
    <div className="portrait-frame-back" />
    <div className="hero-art">
      <div className="art-glow" />
      <div className="portrait-topline"><span>GOSPELCO / STUDIO</span><span>01—06</span></div>
      <div className="portrait-photo-wrap">
        <img className="portrait-photo" src="/assets/images/hero/founder.jpg" alt="Olámide Gospel, founder and creative lead at GospelCO" fetchPriority="high" />
        <span className="portrait-index">GC°</span>
      </div>
      <div className="art-caption"><span>FOUNDER-LED CREATIVE</span><span>IDEAS → IMPACT</span></div>
    </div>
    <div className="portrait-chip"><span className="chip-signal" /><span><strong>Strategy first.</strong><small>Design built around the brief.</small></span><Doodle kind="crown" /></div>
    <span className="portrait-outline" aria-hidden="true" />
  </div>;
}

function TypedHeadline() {
  const phrase = "win customers.";
  const reducedMotion = useReducedMotion();
  const [typed, setTyped] = useState(reducedMotion ? phrase : "");
  useEffect(() => {
    if (reducedMotion) { setTyped(phrase); return undefined; }
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTyped(phrase.slice(0, index));
      if (index >= phrase.length) window.clearInterval(timer);
    }, 80);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);
  return <h1>We help your business <span className="typed-accent">{typed}<span className="typing-cursor" aria-hidden="true">|</span></span></h1>;
}

function Home() {
  const cases = [
    { image: "casestudy_image1.png", title: "FMCG Brand Identity & Packaging", metric: "Eminent Bites — End-to-End Corporate Identity & Shelf-Ready Packaging Design.", body: "We developed a complete, premium visual identity system—from logo architecture to commercial packaging—to position a major Nigerian snack brand for market dominance." },
    { image: "casestudy_image2.png", title: "EdTech Lead Generation Funnel", metric: "350+ Targeted Leads & 10 Student Sign-ups for a Tech Academy.", body: "Engineered a high-impact AI cinematic video trailer combined with a high-conversion registration page to drive high-ticket educational signups." },
    { image: "casestudy_image3.png", title: "Nationwide Retail & eCommerce Setup", metric: "Multi-Channel Retail Launch — 12+ Organic Nationwide Sales Without Massive Ad Spend.", body: "Built a high-performance eCommerce website, synced it seamlessly with Google Shopping, and designed high-conversion marketing banners that captured cold customers from different states across Nigeria." },
    { image: "casestudy_image4.png", title: "Personal Brand Engine", metric: "Premium Virtual Assistant Platform — High-Trust Global Positioning Portfolio.", body: "Crafted a clean, professional, premium portfolio website built to position an independent service provider for international and premium clientele." }
  ];
  return <div className="redesign-site">
    <Meta title="GospelCO | Creative Growth Systems for Businesses" description="GospelCO builds strategic brand identities, websites, video content and digital systems designed to help Nigerian businesses attract customers." />
    <Header />
    <main>
      <section className="new-hero" id="top">
        <div className="hero-doodle-canvas" aria-hidden="true"><span className="doodle-cross">＋</span><span className="doodle-circle"/><span className="doodle-grid"/><span className="doodle-squiggle">〰</span><span className="doodle-triangle">△</span></div>
        <div className="wrap new-hero-grid">
          <div className="new-hero-copy" data-reveal>
            <SectionLabel>Strategy · Creative · Growth</SectionLabel>
            <h1>We Don't Just Create Visuals. <span>We Build Systems That Bring You Customers.</span></h1>
            <p className="new-hero-lead">Every business has unique needs. Whether you need high-conversion eCommerce websites, Google Shopping setups, professional video editing, or cutting-edge AI video ads—we engineer bespoke digital assets that turn Nigerian browsers into paying buyers.</p>
            <div className="actions"><a className="btn btn-primary" href="#case-studies">View Our Case Studies <ArrowUpRight size={16}/></a><a className="btn btn-outline dark-outline" href={waUrl(START_MESSAGE)}>Book a Strategy Call <ArrowUpRight size={15}/></a></div>
            <p className="new-hero-note"><span className="green-dot"/> Built around your goals, audience and business model.</p>
          </div>
          <div className="new-hero-visual" data-reveal aria-label="Hero visual placeholder">
            {/* Hero visual placeholder: hero_visual.png — add the image at public/assets/images/hero/hero_visual.png */}
            <img src="/assets/images/hero/hero_visual.png" alt="" onError={(e)=>{e.currentTarget.style.display="none"}} />
            <div className="visual-placeholder-content"><span className="visual-orbit orbit-one"/><span className="visual-orbit orbit-two"/><div className="visual-monogram">G<span>CO</span></div><p>STRATEGY INTO SYSTEMS</p><small>Hero image placeholder · hero_visual.png</small></div>
            <span className="visual-corner visual-corner-tl"/><span className="visual-corner visual-corner-br"/>
          </div>
        </div>
      </section>

      <section className="brand-trust" aria-labelledby="brand-trust-title">
        <div className="wrap"><p id="brand-trust-title">Trusted by forward-thinking brands across Nigeria</p><div className="brand-logo-row">
          {/* Brand placeholder: company1.png — public/assets/images/brands/company1.png */}<div className="brand-logo-box"><img src="/assets/images/brands/company1.png" alt="Brand logo 1" onLoad={(e)=>{e.currentTarget.parentElement.querySelector("span").style.display="none"}} onError={(e)=>{e.currentTarget.style.display="none"}}/><span>company1.png</span></div>
          {/* Brand placeholder: company2.png — public/assets/images/brands/company2.png */}<div className="brand-logo-box"><img src="/assets/images/brands/company2.png" alt="Brand logo 2" onLoad={(e)=>{e.currentTarget.parentElement.querySelector("span").style.display="none"}} onError={(e)=>{e.currentTarget.style.display="none"}}/><span>company2.png</span></div>
          {/* Brand placeholder: company3.png — public/assets/images/brands/company3.png */}<div className="brand-logo-box"><img src="/assets/images/brands/company3.png" alt="Brand logo 3" onLoad={(e)=>{e.currentTarget.parentElement.querySelector("span").style.display="none"}} onError={(e)=>{e.currentTarget.style.display="none"}}/><span>company3.png</span></div>
        </div></div>
      </section>

      <section className="new-section case-section" id="case-studies">
        <div className="wrap"><div className="new-section-heading" data-reveal><SectionLabel>Selected projects</SectionLabel><h2>Real Work. <span>Real Numbers.</span> Real Results.</h2><p>Strategic creative work connects brand presentation with the action you want customers to take.</p></div>
          <div className="case-grid">{cases.map((item, i)=><article className="new-case-card" key={item.image} data-reveal>
            <div className="case-image-placeholder" data-image-filename={item.image}>
              {/* Case-study image placeholder: add the matching file to public/assets/images/casestudies/ when ready. */}
              <img src={`/assets/images/casestudies/${item.image}`} alt="" loading="lazy" onError={(e)=>{e.currentTarget.style.display="none"}} />
            </div>
            <div className="new-case-copy"><span className="case-category">CASE STUDY / 0{i+1}</span><h3>{item.title}</h3><h4>{item.metric}</h4><p>{item.body}</p><a href={waUrl(`Hi GospelCO, I'd like to discuss a project similar to: ${item.title}.`)} className="text-link">Discuss a similar project <ArrowUpRight size={15}/></a></div>
          </article>)}</div>
        </div>
      </section>

      <section className="new-section capabilities-section" id="capabilities">
        <div className="wrap"><div className="new-section-heading" data-reveal><SectionLabel>Core capabilities</SectionLabel><h2>Bespoke Digital Solutions, <span>Driven by Strategy.</span></h2><p>We don't force generic templates onto your business. Your goals dictate our tools. We combine human craftsmanship with AI speed to build what you actually need.</p></div>
          <div className="capability-grid">
            <article data-reveal><span className="capability-icon"><Globe size={23}/></span><span className="capability-number">01 / DIGITAL</span><h3>High-Conversion Web Engineering</h3><ul><li>Custom Business Websites</li><li>Portfolio Development</li><li>Google Shopping Integration &amp; SEO</li></ul><a className="text-link" href={waUrl("Hi GospelCO, I'd like to discuss web engineering for my business.")}>Discuss web engineering <ArrowUpRight size={14}/></a></article>
            <article data-reveal><span className="capability-icon"><Video size={23}/></span><span className="capability-number">02 / VIDEO</span><h3>Video Production &amp; Creative Direction</h3><ul><li>High-End Post-Production</li><li>Professional Video Editing</li><li>AI Cinematic Teasers &amp; Ad Trailers</li></ul><a className="text-link" href={waUrl("Hi GospelCO, I'd like to discuss video production for my business.")}>Discuss video production <ArrowUpRight size={14}/></a></article>
            <article data-reveal><span className="capability-icon"><Palette size={23}/></span><span className="capability-number">03 / IDENTITY</span><h3>Brand Architecture &amp; Identity</h3><ul><li>Product Packaging Design</li><li>Corporate Logo Systems</li><li>Marketing Banner Assets</li><li>Brand Guidelines</li></ul><a className="text-link" href={waUrl("Hi GospelCO, I'd like to discuss brand identity for my business.")}>Discuss brand identity <ArrowUpRight size={14}/></a></article>
          </div>
        </div>
      </section>

      <section className="new-section values-section" id="approach"><div className="wrap values-panel" data-reveal><div className="values-symbol"><Sparkles size={34}/></div><div><SectionLabel>Our approach</SectionLabel><h2>Your Business Needs Are Unique. <span>Our Strategy Reflects That.</span></h2><p>We understand that what works for a snack food company won’t work for a professional service provider. That’s why we offer custom scopes. We sit down with you, audit your current bottlenecks, and blend real video editing, web development, and digital marketing to solve your exact problems.</p><a className="btn btn-primary" href={waUrl("Hi GospelCO, I'd like to audit my current business bottlenecks and discuss a custom strategy.")}>Let's discuss your goals <ArrowUpRight size={15}/></a></div></div></section>

      <section className="new-final-cta"><div className="wrap" data-reveal><SectionLabel>Ready for the next stage?</SectionLabel><h2>Ready to Stop Blending In? <span>Let's Build Your System.</span></h2><p>Tell us where your business is today and what you want it to achieve next.</p><a className="btn btn-primary" href={waUrl(FINAL_MESSAGE)}>Start a WhatsApp Conversation <ArrowUpRight size={16}/></a></div></section>
    </main>
    <Footer />
    <FloatingWhatsApp />
  </div>;
}

function ServiceCard({ service, index }) {
  return <motion.article className={`service-card ${service.featured ? "featured" : ""}`} data-reveal initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.6, delay: index * 0.04 }}>
    <div className="service-media"><img src={service.image} alt={service.imageAlt} loading="lazy"/><span className="media-number">{String(index + 1).padStart(2, "0")}</span></div>
    <div className="service-body"><span className="service-no">{service.number}{service.featured && <small>FEATURED</small>}</span><h3>{service.name}</h3><p>{service.short}</p>
      <div className="card-actions"><Link className="text-link" to={service.path}>Learn more <ArrowUpRight size={13}/></Link></div>
      <a className="card-order" href={waUrl(`Hi GospelCO, I'd like to discuss ${service.name}.`)}>Discuss on WhatsApp <ArrowUpRight size={13}/></a>
    </div>
  </motion.article>;
}

function Footer() {
  return <footer className="site-footer"><div className="wrap footer-top">
    <div className="footer-brand-column"><Link className="brand brand-wordmark footer-brand" to="/"><span>G</span>ospelCO<sup>TM</sup></Link><p>Visual brand company based in Sango Ota, serving brands nationwide.</p></div>
    <div><strong>Explore</strong><a href="/#capabilities">Capabilities</a><a href="/#case-studies">Case studies</a><a href={waUrl(ENQUIRY_MESSAGE)}>Start a project</a></div>
    <div><strong>Company</strong><a href="/#approach">Our approach</a><a href="/studio-policy.html">Studio policy</a><a href="/content-disclaimer.html">Content disclaimer</a><a href="/credits-ai-disclosure.html">Credits & AI disclosure</a><a href="/privacy-policy.html">Privacy policy</a></div>
    <div><strong>Connect</strong><a href="https://www.instagram.com/gospelco.ng/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.pinterest.com/gospelco_/" target="_blank" rel="noopener noreferrer">Pinterest</a><a href={waUrl(ENQUIRY_MESSAGE)}>WhatsApp</a></div>
  </div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} GospelCO. All rights reserved.</span><span>Designed with purpose. Built for business.</span></div></footer>;
}

function FloatingWhatsApp() {
  return <a className="floating-wa" href={waUrl(START_MESSAGE)} aria-label="Start a project on WhatsApp"><span className="float-label">Start a project</span><ArrowUpRight size={16} /></a>;
}

function PageWrap({ children }) {
  return <><Header />{children}<Footer /><FloatingWhatsApp /></>;
}

function CaseStudy({ service }) {
  const [open, setOpen] = useState(false);
  return <article className={`case-study ${open ? "open" : ""}`} data-reveal>
    <div className="case-study-media"><img src={service.image} alt={service.imageAlt} loading="lazy"/><span className="case-stamp">PROJECT STORY</span></div>
    <div className="case-study-content"><div className="case-kicker">{service.name}</div><h3>Selected work &amp; <em>process.</em></h3><p className="case-summary">This section is ready for an approved project example, the brief, the creative approach and a verifiable result.</p>
      <button className="read-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? "Read less ↑" : "Read case study →"}</button>
      {open && <div className="case-details"><p><strong>Brief:</strong> Add the client's approved brief or the problem the project set out to solve.</p><p><strong>Approach:</strong> Explain the key design or production decisions and what GospelCO delivered.</p><p><strong>Outcome:</strong> Publish only results you can verify and have permission to share. Until then, describe the deliverables rather than inventing metrics.</p><p className="fine-print">Replace the placeholder image and copy before presenting this as a completed client case study.</p></div>}
    </div>
  </article>;
}

function ServicePage({ service }) {
  return <>
    <Meta title={`${service.name} | GospelCO`} description={service.intro} />
    <PageWrap>
      <main className="service-page">
        <section className="hero wrap service-hero">
          <div className="hero-copy" data-reveal><SectionLabel>GospelCO service · {service.number.split("/")[1]?.trim()}</SectionLabel><h1>{service.name} that <em>works for your brand.</em></h1><p className="lead">{service.intro}</p>
            <div className="actions"><a className="btn btn-primary" href={waUrl(service.needMessage)}>Order via WhatsApp <ArrowUpRight size={14}/></a><a className="btn btn-quiet" href="#pricing">View price <ChevronRight size={14}/></a></div>
            <p className="micro-proof"><span className="purple-dot"/> Scope and deadline confirmed before production.</p>
          </div>
          <div className="service-hero-art" data-reveal><div className="art-glow"/><div className="service-image-frame"><img src={service.image} alt={service.imageAlt} fetchPriority="high"/><span className="image-edge-label">GOSPELCO / {service.number.split("/")[0].trim()}</span></div><div className="art-caption"><span>CREATIVE SERVICE</span><span>BUILT AROUND THE BRIEF</span></div></div>
        </section>
        <section className="section wrap">
          <div className="section-intro" data-reveal><SectionLabel>The offer</SectionLabel><h2>What you <em>get.</em></h2><p>{service.processDetail}</p></div>
          <div className="deliverable-grid">{service.deliverables.map((item, i) => <article key={item} data-reveal><b>{String(i+1).padStart(2,"0")}</b><Check size={15}/><p>{item}</p></article>)}</div>
        </section>
        <section className="section service-price-section" id="pricing"><div className="wrap"><div className="section-head" data-reveal><div><SectionLabel>Pricing guide</SectionLabel><h2>Start with <em>{service.priceLabel}.</em></h2></div><p>Starting price shown for guidance. Final price depends on scope and confirmed deliverables.</p></div>
          <div className="price-panel" data-reveal><div><span className="price-eyebrow">{service.name}</span><h3>{service.priceLabel}<small>+ / starting point</small></h3><p>{service.priceUnit}. See the agreed quote for exact scope, timing, rights and inclusions.</p></div><div className="price-actions"><a className="btn btn-primary" href={waUrl(service.orderMessage)}>Discuss this service <ArrowUpRight size={14}/></a></div></div>
        </div></section>
        <section className="section wrap"><div className="section-head" data-reveal><div><SectionLabel>Related work</SectionLabel><h2>Examples &amp; <em>case studies.</em></h2></div><p>Project stories stay on the page for this service, keeping the experience focused and easy to explore.</p></div><CaseStudy service={service}/></section>
        <section className="section wrap process service-process"><div data-reveal><SectionLabel>How it works</SectionLabel><h2>Clear process. <em>Better projects.</em></h2><p>The same company-wide workflow, adapted to the service and brief.</p></div><div className="steps"><article data-reveal><span>01</span><h3>Brief &amp; discovery</h3><p>{service.processDetail}</p></article><article data-reveal><span>02</span><h3>Create the first draft</h3><p>We work to the agreed deliverables and provide a draft or review point appropriate to this service.</p></article><article data-reveal><span>03</span><h3>Review &amp; revise</h3><p>Give clear feedback within the agreed revision rounds and scope.</p></article><article data-reveal><span>04</span><h3>Final handoff</h3><p>Receive the agreed final files after approval and the payment terms have been met.</p></article></div></section>
        <section className="section wrap"><div className="section-intro" data-reveal><SectionLabel>Frequently asked</SectionLabel><h2>Before we <em>start.</em></h2></div><div className="faq-list">{service.faqs.map(([question, answer]) => <details key={question} data-reveal><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
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
