import React, { useEffect, useMemo, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import {
  BriefcaseBusiness, Check, ChevronRight, Compass, Crown, Handshake,
  Menu, ShieldCheck, ShoppingCart, TrendingUp, X, ArrowUpRight
} from "lucide-react";
import { services, waUrl } from "./data/services.js";

const CART_KEY = "gospelcoProjectCart";
const START_MESSAGE = "Hi GospelCO, I want to start a project.";
const RETAINER_MESSAGE = "Hi GospelCO, I want to ask about the monthly retainer.";
const CONSULT_MESSAGE = "Hi GospelCO, I want to book a CONSULT session.";
const FINAL_MESSAGE = "Hi GospelCO, let's start a project.";
const ENQUIRY_MESSAGE = "Hi GospelCO, I'd like to make an enquiry.";

function readCart() {
  try {
    const value = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}
function saveCart(items) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch { /* Continue gracefully if browser storage is unavailable. */ }
  window.dispatchEvent(new CustomEvent("gospelco:cart-updated"));
}
function useCartCount() {
  const [count, setCount] = useState(() => readCart().length);
  useEffect(() => {
    const update = () => setCount(readCart().length);
    window.addEventListener("gospelco:cart-updated", update);
    window.addEventListener("storage", update);
    update();
    return () => {
      window.removeEventListener("gospelco:cart-updated", update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return count;
}
function addToCart(name, price, button) {
  const cart = readCart();
  const existing = cart.find((item) => item.name === name);
  if (existing) existing.qty += 1;
  else cart.push({ name, price: Number(price || 0), qty: 1 });
  saveCart(cart);
  if (button) {
    const previous = button.textContent;
    button.textContent = "✓ Added";
    button.classList.add("is-added");
    window.setTimeout(() => {
      button.textContent = previous;
      button.classList.remove("is-added");
    }, 900);
  }
}
function formatNaira(value) {
  return `₦${Number(value || 0).toLocaleString("en-NG")}`;
}

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
  return <Icon {...shared} className={`doodle ${className}`} />;
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
  const count = useCartCount();
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  return <header className="site-header">
    <Link className="brand" to="/" aria-label="GospelCO home"><img src="/assets/images/logo/logo-white.svg" alt="GospelCO" /></Link>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
      <span>{open ? "Close" : "Menu"}</span>{open ? <X size={18} /> : <Menu size={18} />}
    </button>
    <nav id="main-nav" className={open ? "open" : ""}>
      <a href="/#services" onClick={() => setOpen(false)}>Services</a>
      <a href="/#process" onClick={() => setOpen(false)}>How it works</a>
      <a href="/#retainer" onClick={() => setOpen(false)}>Retainer</a>
      <a href="/#about" onClick={() => setOpen(false)}>About</a>
      <Link className="cart-link" to="/cart/index.html" onClick={() => setOpen(false)} aria-label={`Project cart, ${count} item types`}>
        <ShoppingCart size={15} strokeWidth={1.8} /> Cart <span>{count}</span>
      </Link>
      <a className="nav-cta" href={waUrl(START_MESSAGE)}>Let's talk <ArrowUpRight size={14} /></a>
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
        <img className="portrait-photo" src="/assets/images/hero/hero-image.webp" alt="Olámide Gospel, founder and creative lead at GospelCO" fetchPriority="high" />
        <span className="portrait-index">GC°</span>
      </div>
      <div className="art-caption"><span>FOUNDER-LED CREATIVE</span><span>IDEAS → IMPACT</span></div>
    </div>
    <div className="portrait-chip"><span className="chip-signal" /><span><strong>Strategy first.</strong><small>Design built around the brief.</small></span><Doodle kind="crown" /></div>
    <span className="portrait-outline" aria-hidden="true" />
  </div>;
}

function Home() {
  return <>
    <Meta title="GospelCO | Visuals, Websites & AI Video Adverts" description="GospelCO is a visual brand company based in Sango Ota, Ogun State, creating graphics, websites, branding and AI video adverts for businesses across Nigeria." />
    <Header />
    <main>
      <section className="hero wrap">
        <div className="hero-copy" data-reveal>
          <SectionLabel>Visual brand company · Nigeria</SectionLabel>
          <h1>We build visuals that <em>help your business win customers.</em></h1>
          <p className="lead">Branding, websites, graphics and AI video adverts for small brands ready to look professional and market themselves with confidence.</p>
          <div className="actions">
            <a className="btn btn-primary" href="#services">Explore packages <span>↘</span></a>
            <a className="btn btn-quiet" href={waUrl(START_MESSAGE)}>Chat on WhatsApp <ArrowUpRight size={14}/></a>
          </div>
          <p className="micro-proof"><span className="green-dot" /> Based in Sango Ota · Serving brands nationwide</p>
        </div>
        <HeroArtwork />
      </section>
      <section className="trust-strip" aria-label="GospelCO approach">
        <div className="wrap trust-inner"><span>DESIGN WITH PURPOSE</span><i/><span>BUILT FOR SMALL BRANDS</span><i/><span>CREATIVE + DIGITAL</span><i/><span>BASED IN OGUN, NIGERIA</span></div>
      </section>
      <section className="section wrap problem" id="problem">
        <div className="section-intro" data-reveal><SectionLabel>The real problem</SectionLabel><h2>Why customers <em>scroll past</em> your brand.</h2><p>Good products can be overlooked when the way they show up online feels unclear or inconsistent.</p></div>
        <Doodle kind="crown" className="problem-doodle" />
        <div className="problem-grid">
          <article data-reveal><b>01</b><h3>Scattered visuals</h3><p>Different styles across every post make your brand harder to recognise and trust.</p></article>
          <article data-reveal><b>02</b><h3>Wrong content mix</h3><p>Not every business needs another flyer. The right format depends on what you sell.</p></article>
          <article data-reveal><b>03</b><h3>Generic presentation</h3><p>Your business deserves visuals shaped around your offer—not a one-size-fits-all template.</p></article>
        </div>
      </section>
      <section className="section services-section" id="services">
        <div className="wrap">
          <div className="section-head" data-reveal><div><SectionLabel>What we do</SectionLabel><h2>Creative services. <em>Clear purpose.</em></h2></div><p>Choose one service or combine several for a more consistent brand.</p></div>
          <div className="service-grid">
            {services.map((service, index) => <ServiceCard service={service} key={service.id} index={index} />)}
          </div>
          <p className="cart-hint">Building a bigger project? Add multiple services to your <Link to="/cart/index.html">project cart ↗</Link></p>
        </div>
      </section>
      <section className="section wrap process" id="process">
        <div className="section-head" data-reveal><div><SectionLabel>A clear process</SectionLabel><h2>How GospelCO <em>works.</em></h2></div><p>Professional from first message to final handoff.</p></div>
        <div className="steps">
          <article data-reveal><span>01</span><h3>Tell us what you need</h3><p>Share your business, goals, timeline and budget.</p></article>
          <article data-reveal><span>02</span><h3>We plan the approach</h3><p>We clarify the brief and recommend the right deliverables.</p></article>
          <article data-reveal><span>03</span><h3>We create and refine</h3><p>We design or build, then refine within the agreed scope.</p></article>
          <article data-reveal><span>04</span><h3>You launch</h3><p>Receive the agreed files or website handoff and put them to work.</p></article>
        </div>
        <Doodle kind="handshake" className="process-doodle" />
      </section>
      <section className="section wrap retainer" id="retainer">
        <div className="retainer-panel" data-reveal>
          <Doodle kind="growth" className="retainer-doodle" />
          <div className="retainer-copy"><SectionLabel>Monthly content plan</SectionLabel><h2>Show up consistently. <em>Without the scramble.</em></h2><p>A practical content bundle for small brands that need regular creative support.</p><a className="btn btn-primary" href={waUrl(RETAINER_MESSAGE)}>Ask about the retainer <ArrowUpRight size={14}/></a></div>
          <div className="retainer-details"><div className="price">₦60,000 <small>/ month</small></div><ul><li>12 social graphics / flyers</li><li>8 short video edits / reels</li><li>Content calendar + caption ideas</li><li>2 revision rounds per design</li><li>Use your plan across platforms</li></ul><p className="fine-print">Website development excluded. Scope, schedule and asset requirements confirmed before payment.</p></div>
        </div>
      </section>
      <section className="section wrap consult" id="consult">
        <div data-reveal><SectionLabel>Start with clarity</SectionLabel><h2>Not sure what your brand needs <em>first?</em></h2><p>Book a 30-minute strategy session to prioritise your content, visual direction and next steps.</p></div>
        <div className="consult-action" data-reveal><strong>₦10,000 <small>/ 30 minutes</small></strong><span>Credited toward a qualifying package if agreed before booking.</span><a className="btn btn-outline" href={waUrl(CONSULT_MESSAGE)}>Book a strategy call <ArrowUpRight size={14}/></a></div>
      </section>
      <section className="section wrap about" id="about">
        <div className="about-mark" data-reveal>G<span>CO</span></div>
        <div data-reveal><SectionLabel>About GospelCO</SectionLabel><h2>A creative partner for brands <em>building their next chapter.</em></h2><p>GospelCO is a visual brand company based in Sango Ota, Ogun State, creating graphics, websites and AI video adverts for small brands across Nigeria. Founded by Olámide Gospel.</p><a className="text-link" href="/studio-policy.html">Read our studio policy <ArrowUpRight size={13}/></a></div>
        <Doodle kind="briefcase" className="about-doodle" />
      </section>
      <section className="final-cta">
        <Doodle kind="trending" className="final-doodle" />
        <div className="wrap" data-reveal><SectionLabel>Have a project in mind?</SectionLabel><h2>Let's make your next move <em>look the part.</em></h2><a className="btn btn-light" href={waUrl(FINAL_MESSAGE)}>Start a project on WhatsApp <ArrowUpRight size={14}/></a></div>
      </section>
    </main>
    <Footer />
    <FloatingWhatsApp />
  </>;
}

function ServiceCard({ service, index }) {
  return <article className={`service-card ${service.featured ? "featured" : ""}`} data-reveal>
    <div className="service-media"><img src={service.image} alt={service.imageAlt} loading="lazy"/><span className="media-number">{String(index + 1).padStart(2, "0")}</span></div>
    <div className="service-body">
      <span className="service-no">{service.number}{service.featured && <small>FEATURED</small>}</span>
      <h3>{service.name}</h3><p>{service.short}</p>
      <div className="card-actions"><Link className="text-link" to={service.path}>Learn more <ArrowUpRight size={13}/></Link><button type="button" className="mini-cart" onClick={(event) => addToCart(service.name, service.price, event.currentTarget)}>＋ Cart</button></div>
      <a className="card-order" href={waUrl(service.cardMessage)}>Order via WhatsApp <ArrowUpRight size={13}/></a>
    </div>
  </article>;
}

function Footer() {
  return <footer className="site-footer"><div className="wrap footer-top">
    <div className="footer-brand-column"><Link className="brand footer-brand" to="/"><img src="/assets/images/logo/logo-white.svg" alt="GospelCO" /></Link><p>Visual brand company based in Sango Ota, serving brands nationwide.</p></div>
    <div><strong>Explore</strong><a href="/#services">Services</a><a href="/#retainer">Monthly retainer</a><Link to="/cart/index.html">Project cart</Link></div>
    <div><strong>Company</strong><a href="/#about">About GospelCO</a><a href="/studio-policy.html">Studio policy</a><a href="/content-disclaimer.html">Content disclaimer</a><a href="/credits-ai-disclosure.html">Credits & AI disclosure</a><a href="/privacy-policy.html">Privacy policy</a></div>
    <div><strong>Connect</strong><a href="https://www.instagram.com/gospelco.ng/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.pinterest.com/gospelco_/" target="_blank" rel="noopener noreferrer">Pinterest</a><a href={waUrl(ENQUIRY_MESSAGE)}>WhatsApp</a></div>
  </div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} GospelCO. All rights reserved.</span><span>Designed with purpose. Built for business.</span></div></footer>;
}

function FloatingWhatsApp() {
  return <a className="floating-wa" href={waUrl(START_MESSAGE)} aria-label="Start a project on WhatsApp"><span className="wa-mark">✳</span><span className="float-label">Start a project</span></a>;
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
  const cartCount = useCartCount();
  return <>
    <Meta title={`${service.name} | GospelCO`} description={service.intro} />
    <PageWrap>
      <main className="service-page">
        <section className="hero wrap service-hero">
          <div className="hero-copy" data-reveal><SectionLabel>GospelCO service · {service.number.split("/")[1]?.trim()}</SectionLabel><h1>{service.name} that <em>works for your brand.</em></h1><p className="lead">{service.intro}</p>
            <div className="actions"><a className="btn btn-primary" href={waUrl(service.needMessage)}>Order via WhatsApp <ArrowUpRight size={14}/></a><a className="btn btn-quiet" href="#pricing">View price <ChevronRight size={14}/></a><Link className="btn btn-quiet" to="/cart/index.html"><ShoppingCart size={14}/> Project cart <span className="cart-count-inline">{cartCount}</span></Link></div>
            <p className="micro-proof"><span className="green-dot"/> Scope and deadline confirmed before production.</p>
          </div>
          <div className="service-hero-art" data-reveal><div className="art-glow"/><div className="service-image-frame"><img src={service.image} alt={service.imageAlt} fetchPriority="high"/><span className="image-edge-label">GOSPELCO / {service.number.split("/")[0].trim()}</span></div><div className="art-caption"><span>CREATIVE SERVICE</span><span>BUILT AROUND THE BRIEF</span></div></div>
        </section>
        <section className="section wrap">
          <div className="section-intro" data-reveal><SectionLabel>The offer</SectionLabel><h2>What you <em>get.</em></h2><p>{service.processDetail}</p></div>
          <div className="deliverable-grid">{service.deliverables.map((item, i) => <article key={item} data-reveal><b>{String(i+1).padStart(2,"0")}</b><Check size={15}/><p>{item}</p></article>)}</div>
        </section>
        <section className="section service-price-section" id="pricing"><div className="wrap"><div className="section-head" data-reveal><div><SectionLabel>Pricing guide</SectionLabel><h2>Start with <em>{service.priceLabel}.</em></h2></div><p>Starting price shown for guidance. Final price depends on scope and confirmed deliverables.</p></div>
          <div className="price-panel" data-reveal><div><span className="price-eyebrow">{service.name}</span><h3>{service.priceLabel}<small>+ / starting point</small></h3><p>{service.priceUnit}. See the agreed quote for exact scope, timing, rights and inclusions.</p></div><div className="price-actions"><button className="btn btn-primary" onClick={(event) => addToCart(service.name, service.price, event.currentTarget)}>＋ Add to project cart</button><a className="btn btn-quiet" href={waUrl(service.orderMessage)}>Order this service <ArrowUpRight size={14}/></a></div></div>
        </div></section>
        <section className="section wrap"><div className="section-head" data-reveal><div><SectionLabel>Related work</SectionLabel><h2>Examples &amp; <em>case studies.</em></h2></div><p>Project stories stay on the page for this service, keeping the experience focused and easy to explore.</p></div><CaseStudy service={service}/></section>
        <section className="section wrap process service-process"><div data-reveal><SectionLabel>How it works</SectionLabel><h2>Clear process. <em>Better projects.</em></h2><p>The same company-wide workflow, adapted to the service and brief.</p></div><div className="steps"><article data-reveal><span>01</span><h3>Brief &amp; discovery</h3><p>{service.processDetail}</p></article><article data-reveal><span>02</span><h3>Create the first draft</h3><p>We work to the agreed deliverables and provide a draft or review point appropriate to this service.</p></article><article data-reveal><span>03</span><h3>Review &amp; revise</h3><p>Give clear feedback within the agreed revision rounds and scope.</p></article><article data-reveal><span>04</span><h3>Final handoff</h3><p>Receive the agreed final files after approval and the payment terms have been met.</p></article></div></section>
        <section className="section wrap"><div className="section-intro" data-reveal><SectionLabel>Frequently asked</SectionLabel><h2>Before we <em>start.</em></h2></div><div className="faq-list">{service.faqs.map(([question, answer]) => <details key={question} data-reveal><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
        <section className="final-cta"><div className="wrap" data-reveal><SectionLabel>Start a project</SectionLabel><h2>Let's make this work for <em>your brand.</em></h2><p>Send your brief and we will confirm scope, availability, next steps and the final quote before work begins.</p><div className="actions center-actions"><a className="btn btn-primary" href={waUrl(service.discussMessage)}>Discuss this service <ArrowUpRight size={14}/></a><Link className="btn btn-quiet" to="/cart/index.html">Review project cart <ShoppingCart size={14}/></Link></div></div></section>
      </main>
    </PageWrap>
  </>;
}

function ProjectCart() {
  const [cart, setCart] = useState(() => readCart());
  const [note, setNote] = useState("");
  useEffect(() => {
    document.title = "Project Cart | GospelCO";
    const update = () => setCart(readCart());
    window.addEventListener("gospelco:cart-updated", update);
    return () => window.removeEventListener("gospelco:cart-updated", update);
  }, []);
  const total = useMemo(() => cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1), 0), [cart]);
  function change(index, delta) {
    const next = readCart();
    if (!next[index]) return;
    next[index].qty = Number(next[index].qty || 1) + delta;
    if (next[index].qty <= 0) next.splice(index, 1);
    saveCart(next); setCart(next); setNote("");
  }
  function remove(index) {
    const next = readCart(); next.splice(index, 1); saveCart(next); setCart(next); setNote("Item removed.");
  }
  function sendToWhatsApp() {
    if (!cart.length) { setNote("Add at least one service before continuing."); return; }
    const lines = cart.map((item) => `• ${item.name} × ${item.qty} — ${formatNaira(item.price * item.qty)}`).join("\n");
    const message = `Hi GospelCO, I'd like to discuss this project:\n${lines}\nIndicative total: ${formatNaira(total)}\nPlease confirm scope and next steps.`;
    window.open(waUrl(message), "_blank", "noopener,noreferrer");
  }
  return <><Meta title="Project Cart | GospelCO" description="Review selected GospelCO services and send your project summary for confirmation."/><PageWrap><main className="cart-page wrap"><div className="cart-heading" data-reveal><SectionLabel>Your project</SectionLabel><h1>Build your <em>project.</em></h1><p>Select services, review the indicative total, then send the summary to GospelCO. This is an enquiry cart, not a payment checkout.</p></div>
    {!cart.length ? <div className="cart-empty" data-reveal><ShoppingCart size={26}/><h2>Your project is empty.</h2><p>Add one or more services to start assembling your brief.</p><Link className="btn btn-primary" to="/#services">Explore services</Link></div> : <div className="cart-list" data-reveal>{cart.map((item,index)=><article className="cart-item" key={`${item.name}-${index}`}><div className="cart-item-main"><strong>{item.name}</strong><span>{formatNaira(item.price)} each</span></div><div className="cart-controls"><button type="button" onClick={()=>change(index,-1)} aria-label={`Decrease ${item.name} quantity`}>−</button><span>{item.qty}</span><button type="button" onClick={()=>change(index,1)} aria-label={`Increase ${item.name} quantity`}>＋</button><button type="button" className="remove-item" onClick={()=>remove(index)} aria-label={`Remove ${item.name}`}>Remove</button></div></article>)}<div className="cart-total"><span>Indicative total</span><strong>{formatNaira(total)}</strong></div><p className="cart-disclaimer">Final scope, availability and quotation will be confirmed by GospelCO before payment.</p><div className="actions"><button className="btn btn-primary" type="button" onClick={sendToWhatsApp}>Send project to WhatsApp <ArrowUpRight size={14}/></button><button className="btn btn-quiet" type="button" onClick={()=>{saveCart([]);setCart([]);setNote("Cart cleared.")}}>Clear cart</button><Link className="btn btn-quiet" to="/#services">Add more services</Link></div>{note && <p className="cart-status" role="status">{note}</p>}</div>}
    </main></PageWrap></>;
}

function NotFound() {
  return <PageWrap><main className="cart-page wrap"><SectionLabel>Page not found</SectionLabel><h1>Let's get you <em>back on track.</em></h1><p>The page may have moved. Explore the services from the homepage.</p><Link className="btn btn-primary" to="/">Back to GospelCO</Link></main></PageWrap>;
}

export default function App() {
  return <><PageMotion/><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/index.html" element={<Home/>}/>
    {services.map((service) => <Route key={service.id} path={service.path} element={<ServicePage service={service}/>}/>)}
    <Route path="/cart/index.html" element={<ProjectCart/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes></>;
}
