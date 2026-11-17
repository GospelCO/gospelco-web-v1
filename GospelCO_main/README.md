# GospelCO website

GospelCO is a React 18, TypeScript and Vite website for a strategy-led brand and digital growth studio. The homepage connects strategy, brand identity, websites and content without publishing unverified client outcomes or testimonials.

## Architecture

- `src/App.tsx` contains the homepage, shared navigation/footer and service detail pages.
- `src/data/services.ts` is the source for service routes, prices, deliverables, FAQs and WhatsApp enquiry messages.
- `src/entry-server.tsx` and `scripts/prerender.ts` generate the homepage and six service pages at build time.
- `public/*.html` contains the four standalone policy and disclosure pages.
- `public/assets/` contains the existing brand and service imagery.

The homepage and service pages share the black, deep-purple, white and muted-gray palette. Motion respects `prefers-reduced-motion`; below-the-fold service imagery is lazy-loaded. Client logos and case-study claims are not shown unless approved and verifiable.

## Pages

- `/` — homepage
- `/services/graphic-design`
- `/services/music-cover-art`
- `/services/ai-video-adverts`
- `/services/video-editing`
- `/services/web-design`
- `/services/brand-strategy`
- `/privacy-policy.html`
- `/studio-policy.html`
- `/content-disclaimer.html`
- `/credits-ai-disclosure.html`

Service enquiries use the shared WhatsApp URL helper in `src/data/services.ts`. The configured number is `2349034013236`; confirm it before launch.

## Run and build

Use Node.js `>=22.12.0`:

```bash
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` runs the TypeScript check, creates the client and server bundles, and prerenders all seven React routes. Vercel uses `npm run build` and `dist` as configured in `vercel.json`; static legal pages and assets remain regular files.

## Launch checks

- Confirm the WhatsApp number, service prices, social links and contact details.
- Publish client names, logos, project images or measurable results only with permission and evidence.
- Check the site at phone, tablet and desktop widths and test every primary CTA and service link.
- Review the deployment preview before changing production DNS.
