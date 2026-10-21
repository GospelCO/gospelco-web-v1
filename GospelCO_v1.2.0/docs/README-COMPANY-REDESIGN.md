# GospelCO Company Website — compact mobile-first build

## What's included
- Company-style homepage with compact sections and six service cards.
- Each service card includes **Order via WhatsApp**, **Add to Cart**, and **Learn More**.
- Six individual service pages, with AI Video Adverts as the flagship page template.
- Shared browser-based project cart. It sends the selected services to WhatsApp; it does not collect payments.
- Uses existing GospelCO logo and image assets from the supplied source package.
- Compact mobile card layouts, responsive breakpoints, restrained purple hover glow, purple details and reduced-motion support.

## IMPORTANT: before publishing
1. The rebuilt React site uses `2349034013236` in `src/data/services.js` as the shared WhatsApp number. Confirm the intended business line before launch.
2. Confirm every listed price and scope. Prices are draft values from the supplied brief. The cart uses indicative base prices and is not a checkout.
3. Confirm Instagram URL and any business details.
4. Replace case-study placeholders with approved real work and verified results. Never publish fabricated reviews or metrics.
5. Confirm legal policy pages in the package before launch. If they are absent, add them and update footer links.
6. Review all imagery for ownership/licensing and replace placeholder/service images as needed.
7. Test mobile widths (320, 360, 375, 390, 414px), tablet and desktop. Check navigation, WhatsApp, cart, and every service link.

## Editing basics
- Homepage: `index.html`
- Global styling: `assets/css/company.css`
- Menu/cart behavior: `assets/js/company.js`
- Shared cart: `cart/index.html`
- Service pages: `services/<service-name>/index.html`
- Images: `assets/images/`

This is a static HTML/CSS/JS site intended for GitHub + Netlify. The cart uses localStorage in the visitor's browser and is not synced between devices. Online payments would require a separate payment-provider integration and server-side verification.


## Policy refresh — 20 October 2026

The refreshed public pages are:
- `privacy-policy.html` — website/contact data, client project data, service providers, AI-tool processing, localStorage cart, external fonts/links, privacy rights, transfers, retention and website-client data roles.
- `studio-policy.html` — default direct-project terms: quotes, payments, client duties, revisions, timelines, cancellations, ownership/licensing, AI services, websites/SEO limits, portfolio rights, liability/disputes and freelance-platform rules.
- `content-disclaimer.html` — rights and licensing for third-party images, sports/fan posters, client assets, AI-generated/assisted materials, synthetic media and takedown/correction requests.
- `credits-ai-disclosure.html` — short disclosure/credit templates plus an asset-license record checklist.
- `CREDITS-AND-AI-DISCLOSURE-GUIDE.md` — copy-ready snippets for use in social captions, service pages, case studies and client handover notes.
- `LEGAL-RESEARCH-NOTES.md` — key primary/platform sources consulted and drafting assumptions.

### Before relying on these as final legal terms
1. Confirm the legal contracting name and registration status to appear on quotes/invoices. “GospelCO” is used as the brand name in these templates; do not imply incorporation unless accurate.
2. Confirm the contact email is actively monitored.
3. Replace the demo WhatsApp number throughout the website and cart.
4. Confirm actual data flows: hosting, Google Fonts, cart localStorage, any analytics/pixels, forms, AI vendors, payment processors and client portals. Update the Privacy Policy when the stack changes.
5. Put project-specific scope, price, deadline, revision count, support period, source files and rights/licence terms in each accepted quote.
6. Use a separate data-processing agreement where GospelCO processes a client's end-user personal data on the client's behalf and one is required.
7. Do not post third-party/sports/football images merely because a disclaimer or credit line is present; get permission/licence or use suitable original material.
8. Freelance-platform engagements must follow the platform's live terms, order rules and dispute process. Do not use website terms to bypass platform rules.
9. Have a qualified Nigerian lawyer review these terms before they are treated as a final contract or used for higher-risk/regulatory work.

### Data and payment behaviour in this static build
- The project cart stores selected service names, indicative prices and quantities in the visitor's browser localStorage; it is not a payment checkout and it is not synced to a server/account.
- Clicking the WhatsApp order action opens a WhatsApp link containing the message the visitor chose to send. The visitor should review the message before sending.
- Google Fonts is loaded from Google's servers in the current HTML heads.
- Analytics/ad pixels are not described as active in the policy unless you add and enable them. If you do, review consent and notice requirements and update the policy before launch.
