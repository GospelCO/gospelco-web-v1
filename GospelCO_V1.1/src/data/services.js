export const WHATSAPP_NUMBER = "2340000000000"; // Kept exactly as configured in the supplied source. Replace only when GospelCO confirms the live number.

export function waUrl(message = "Hi GospelCO, I want to start a project.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const services = [
  {
    id: "flyer",
    path: "/services/graphic-design/index.html",
    image: "/assets/images/services/flyer.webp",
    imageAlt: "GospelCO graphic design and social campaign work",
    number: "01 / DESIGN",
    name: "Flyer & Social Design",
    short: "Clear, premium graphics for promotions, campaigns and everyday social content.",
    intro: "Flyer and social designs that give your offer a clear visual hierarchy across social and print.",
    price: 5000,
    priceLabel: "₦5,000",
    priceUnit: "per design starting point",
    deliverables: ["One designed flyer or social graphic", "Agreed sizes and export-ready files", "Two revision rounds within the approved brief", "Print and social formats as agreed"],
    processDetail: "We confirm the offer, audience, copy, size and deadline before production begins.",
    cardMessage: "Hi GospelCO, I need Flyer & Social Design.",
    needMessage: "Hi GospelCO, I need Quick Flyer & Social Design.",
    orderMessage: "Hi GospelCO, I want to order Quick Flyer & Social Design.",
    discussMessage: "Hi GospelCO, I'd like to discuss Quick Flyer & Social Design.",
    faqs: [
      ["What do I need to send?", "Send the purpose of the design, final text, size or platform, brand assets and any reference material you have rights to use."],
      ["How do revisions work?", "Two revision rounds are included for refinements within the approved brief. A new direction or added deliverable may require a revised quote."],
      ["Can I get print-ready files?", "Yes, where print output is part of the agreed scope. Confirm the print size and printer specifications at kickoff."]
    ]
  },
  {
    id: "music",
    path: "/services/music-cover-art/index.html",
    image: "/assets/images/services/branding.webp",
    imageAlt: "GospelCO cover art and visual design work",
    number: "02 / MUSIC",
    name: "Music Cover Art",
    short: "Release-ready artwork for DJs and emerging artists, with clean platform-friendly exports.",
    intro: "Cover artwork shaped around the artist, sound and release mood—not a generic one-size-fits-all graphic.",
    price: 8000,
    priceLabel: "₦8,000",
    priceUnit: "per cover starting point",
    deliverables: ["Cover artwork for the agreed release", "Platform-ready export sizes", "Two revision rounds within the approved brief", "Final file handoff after payment terms are met"],
    processDetail: "We confirm the artist name, release title, mood, references, required text and target platforms first.",
    cardMessage: "Hi GospelCO, I need Music Cover Art.",
    needMessage: "Hi GospelCO, I need Music Cover Art.",
    orderMessage: "Hi GospelCO, I want to order Music Cover Art.",
    discussMessage: "Hi GospelCO, I'd like to discuss Music Cover Art.",
    faqs: [
      ["Which release platforms can you prepare for?", "We prepare agreed export sizes for the platforms specified in your brief. Tell us where the artwork will be distributed before production."],
      ["Can I request a particular mood?", "Yes. Send visual references and describe the mood, genre and audience. References are for direction; they are not automatically cleared for reuse."],
      ["Are all source files included?", "Editable/source files are included only when stated in the quote or package." ]
    ]
  },
  {
    id: "ai-video",
    path: "/services/ai-video-adverts/index.html",
    image: "/assets/images/services/ai.webp",
    imageAlt: "AI-assisted video advert concept visual",
    number: "03 / AI VIDEO",
    featured: true,
    name: "AI Video Adverts",
    short: "Turn product information and approved assets into an engaging short-form advert concept.",
    intro: "AI-assisted visual storytelling for businesses that need a more dynamic way to introduce a product or offer.",
    price: 10000,
    priceLabel: "₦10,000",
    priceUnit: "per advert starting point",
    deliverables: ["Script direction based on the approved brief", "AI-assisted visuals and motion where suitable", "Voiceover options and captions as agreed", "Export for the agreed social platforms"],
    processDetail: "We confirm product facts, claims, target audience, assets, tone, aspect ratio and intended placements before production.",
    cardMessage: "Hi GospelCO, I need an AI Video Advert.",
    needMessage: "Hi GospelCO, I need AI Video Advert.",
    orderMessage: "Hi GospelCO, I want to order AI Video Advert.",
    discussMessage: "Hi GospelCO, I'd like to discuss AI Video Advert.",
    faqs: [
      ["Do I need to provide a product photo?", "Provide product photos, logo, offer details and any required brand assets. If the brief needs new visuals, we'll confirm what can be generated and what is included."],
      ["Can AI-generated content guarantee sales or virality?", "No. The service creates an advert asset; performance depends on the offer, audience, distribution, platform and many factors beyond production."],
      ["Will you disclose AI involvement?", "We will identify AI-assisted or synthetic elements where appropriate, follow applicable platform disclosure requirements, and confirm any special disclosure needs in the brief."]
    ]
  },
  {
    id: "video",
    path: "/services/video-editing/index.html",
    image: "/assets/images/services/video.webp",
    imageAlt: "Short-form video editing creative preview",
    number: "04 / CONTENT",
    name: "Video Editing & Retainers",
    short: "Short-form edits and a structured monthly content plan for brands that publish consistently.",
    intro: "A repeatable content workflow for brands that want a steadier publishing rhythm without handling every edit themselves.",
    price: 60000,
    priceLabel: "₦60,000",
    priceUnit: "per month · draft retainer plan",
    deliverables: ["12 social graphics or flyers", "8 short video edits or reels", "Content calendar and caption ideas", "Two revision rounds per design", "Website development excluded"],
    processDetail: "We agree the monthly content plan, content supply dates, formats, review windows and publishing responsibilities before the retainer begins.",
    cardMessage: "Hi GospelCO, tell me about your content retainer.",
    needMessage: "Hi GospelCO, I need Video Editing / Retainer.",
    orderMessage: "Hi GospelCO, I want to order Video Editing / Retainer.",
    discussMessage: "Hi GospelCO, I'd like to discuss Video Editing / Retainer.",
    faqs: [
      ["Does the monthly plan include website work?", "No. Website development is excluded from this draft content plan and would be quoted separately."],
      ["What do I need to supply?", "Provide agreed footage, product or brand information, required copy, access to approved assets and timely feedback."],
      ["Can the monthly quantity change?", "Any change to quantities, formats or revision scope should be confirmed in a revised monthly agreement before work begins."]
    ]
  },
  {
    id: "web",
    path: "/services/web-design/index.html",
    image: "/assets/images/services/web-design.webp",
    imageAlt: "Website design and development preview",
    number: "05 / WEB",
    name: "Web Design & Development",
    short: "Mobile-first websites that explain your offer, establish credibility and make it easy to enquire.",
    intro: "Purposeful websites for businesses that need a more credible online presence and clearer customer journey.",
    price: 70000,
    priceLabel: "₦70,000",
    priceUnit: "landing-page starting point",
    deliverables: ["Landing page baseline from ₦70,000", "Full business websites from ₦120,000", "Responsive layout and contact pathways", "Basic SEO structure and agreed integrations", "Hosting, domain and third-party licences quoted separately unless included"],
    processDetail: "We confirm pages, content, features, integrations, domain/hosting responsibilities, handover requirements and support scope before development.",
    cardMessage: "Hi GospelCO, I need a website.",
    needMessage: "Hi GospelCO, I need Web Design & Development.",
    orderMessage: "Hi GospelCO, I want to order Web Design & Development.",
    discussMessage: "Hi GospelCO, I'd like to discuss Web Design & Development.",
    faqs: [
      ["Does the price include domain and hosting?", "Not by default. Domain, hosting, paid plugins, third-party services and renewals are itemised or confirmed in the project quote."],
      ["Will the site work on mobile?", "Responsive behaviour is part of the intended build and should be tested across phone, tablet and desktop widths before handoff."],
      ["Is ongoing maintenance included?", "Only for the period and tasks written into the agreed package or contract. Additional maintenance can be scoped separately."]
    ]
  },
  {
    id: "strategy",
    path: "/services/brand-strategy/index.html",
    image: "/assets/images/services/motion.webp",
    imageAlt: "Brand strategy and creative direction preview",
    number: "06 / STRATEGY",
    name: "Brand Strategy & Consulting",
    short: "Clarify your visual direction and content priorities before investing in more production.",
    intro: "A focused strategy session to help you decide what to improve first and how to organise your next steps.",
    price: 10000,
    priceLabel: "₦10,000",
    priceUnit: "per 30-minute session",
    deliverables: ["30-minute strategy session", "Content and visual priorities", "Practical next steps based on your business type", "Fee credited toward a qualifying package only if agreed before booking"],
    processDetail: "Bring a short description of your business, audience, current marketing and main challenge. We use the session to prioritise—not to promise a guaranteed growth result.",
    cardMessage: "Hi GospelCO, I need brand strategy help.",
    needMessage: "Hi GospelCO, I need Brand Strategy Consultation.",
    orderMessage: "Hi GospelCO, I want to order Brand Strategy Consultation.",
    discussMessage: "Hi GospelCO, I'd like to discuss Brand Strategy Consultation.",
    faqs: [
      ["Is this a guaranteed marketing plan?", "It's a focused advisory session to identify priorities and practical next steps, not a guarantee of sales, reach or business growth."],
      ["Can the fee be deducted from a later project?", "Only when the credit is explicitly agreed before booking and recorded in the relevant quote or confirmation."],
      ["What should I bring?", "Bring your business description, audience, examples of current content, goals and the questions you want answered."]
    ]
  }
];

export const getServiceByPath = (path) => services.find((service) => service.path === path);
