# GospelCO React + Tailwind Vercel Build

This folder refactors the supplied GospelCO company site into a React + Vite + Tailwind v4 frontend with the homepage redesigned around a white hero, charcoal scroll-over sections, strategic case studies, core capabilities and direct WhatsApp enquiries.

## Brand system preserved

The source values in `assets/css/company.css` were kept:

- Background: `#101012`
- Panel: `#17171b`
- Secondary panel: `#1d1b22`
- Text: `#f5f2f7`
- Muted text: `#b7b2bd`
- Purple: `#8b20ee`
- Purple highlight: `#bd55ff`
- Accent purple: `#7700D7`
- Limited green accent: `#07D200`
- Font: Poppins (400, 500, 600, 700)
- No serif fonts; all typography uses Poppins

No additional font family or brand palette was introduced. Existing source gradients were reused; new sections use the same tokens.

## WhatsApp handling

`src/data/services.js` configures WhatsApp as `2349034013236`. All WhatsApp actions use this shared helper; confirm the number is the intended business line before launch.

Core WhatsApp enquiry messages:
- `Hi GospelCO, I want to start a project.`
- `Hi GospelCO, I need Flyer & Social Design.`
- `Hi GospelCO, I need Music Cover Art.`
- `Hi GospelCO, I need an AI Video Advert.`
- `Hi GospelCO, tell me about your content retainer.`
- `Hi GospelCO, I need a website.`
- `Hi GospelCO, I need brand strategy help.`
- `Hi GospelCO, I want to ask about the monthly retainer.`
- `Hi GospelCO, I want to book a CONSULT session.`
- `Hi GospelCO, let's start a project.`
- `Hi GospelCO, I'd like to make an enquiry.`

## Pages

- `/` — company homepage
- `/services/graphic-design/index.html`
- `/services/music-cover-art/index.html`
- `/services/ai-video-adverts/index.html`
- `/services/video-editing/index.html`
- `/services/web-design/index.html`
- `/services/brand-strategy/index.html`
- `/privacy-policy.html`
- `/studio-policy.html`
- `/content-disclaimer.html`
- `/credits-ai-disclosure.html`

The policy pages remain static HTML so their long text and legal anchors keep working; the associated source CSS/logo assets are kept under `public/assets/`.

## Run locally

1. Install Node.js (LTS) if needed.
2. Extract this ZIP.
3. Open the extracted folder in VS Code.
4. Open Terminal in the project folder and run:

```bash
npm install
npm run dev
```

5. Open the local URL Vite prints (usually `http://localhost:5173`).
6. Build before deploying:

```bash
npm run build
npm run preview
```

## Deploy to Vercel

Import the project folder or its GitHub repository into Vercel. Framework should be detected as Vite. Use:
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The included `vercel.json` rewrites service and cart URLs to the React entry point so direct navigation and refresh work. Static policy pages and assets remain normal files.

After validating the preview, connect the purchased `.com.ng` domain in Vercel and follow its current DNS instructions. Keep the Netlify deployment unchanged until the new production domain, HTTPS, and every primary link have been tested.

## Why the image box feels less basic

The founder portrait now sits inside a layered frame with an offset outline, restrained purple ambient light reused from the existing palette, a compact studio label and a small floating strategy chip. The portrait gently breathes on desktop and scales slightly on hover. Continuous motion is disabled on mobile, and all motion is disabled for `prefers-reduced-motion` users.

## Motion/performance choices

- Section reveals use a 150ms transition.
- Small cards/buttons use 150ms hover transitions.
- No scroll parallax is used.
- Backdrop blur is disabled on small screens and touch devices.
- Below-the-fold images use WebP variants and lazy loading.
- The current cart uses browser `localStorage`; it is not a payment gateway, account system, or server-synced cart.

## Before launch

- Replace the placeholder WhatsApp number only after confirming the correct number; all messages are preserved in code.
- Check all prices/packages and any turnaround claims.
- Replace placeholder case-study imagery and copy with approved material and verifiable outcomes.
- Confirm the founder portrait may be used as supplied.
- Confirm all social links, legal pages and contact details.
- Test 320px, 360px, 390px, tablet and desktop sizes.
- Verify each cart add/update/remove and WhatsApp summary.
- Run `npm run build` and review the Vercel preview before assigning the `.com.ng` domain.

## Implementation note

The source bundle has not been deployed to Vercel by this process. This is the project folder prepared for local testing and deployment by the site owner.

## Local build verification note

The source and public-asset paths were checked in the prepared folder. Package installation/build could not be executed in the authoring environment because npm registry requests timed out, so do run `npm install` and `npm run build` locally or let Vercel install/build from the repository before production launch. Do not treat the package as already deployed or as a successful production build until that build succeeds.


## Final brand rebuild notes
- Strict website palette: #120023, #000000, #28004D, #7700D7, white, and #B8B8B8. No green accent is used.
- Typography: Poppins 400/500/600/700 only.
- WhatsApp number configured as 2349034013236; review and confirm before launch.
- Sitemap: https://gospelco.com.ng/sitemap.xml; robots.txt is included. Cart is excluded from indexing.
- Install dependencies with `npm install`, then run `npm run build`.
- The trust row uses service categories rather than unverifiable client counts or third-party logos.

## Homepage image placeholders

See [`docs/IMAGE-FILE-NAMES.md`](docs/IMAGE-FILE-NAMES.md) for the exact file names and public asset paths. The homepage includes optional placeholders for `hero_visual.png`, `company1.png`–`company3.png`, and `casestudy_image1.png`–`casestudy_image4.png`. Add files at the documented paths to replace the designed empty placeholders.

The shopping cart and checkout-style UI have been removed. Service and strategy CTAs go directly to WhatsApp.
