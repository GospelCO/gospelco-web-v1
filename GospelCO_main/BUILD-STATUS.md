# Build status — homepage redesign

- Updated the homepage copy and section sequence to match the supplied redesign compendium.
- Added a white hero with purple doodle canvas and a right-column `hero_visual.png` placeholder.
- Added trusted-brand placeholders (`company1.png`, `company2.png`, `company3.png`).
- Added four blank case-study image containers with exact image filenames documented in `docs/IMAGE-FILE-NAMES.md`.
- Added three-column core capabilities, brand values, and final WhatsApp CTA.
- Removed cart route, cart icons, add-to-cart controls, cart/checkout UI, and outdated privacy-policy descriptions.
- Updated service pages to use direct WhatsApp enquiries rather than cart actions.
- Kept purple `#7700D7` primary and restrained green `#07D200` accents.
- JSX syntax transpilation check passed using TypeScript's JSX parser.
- A full Vite production build was not run: `npm install --no-audit --no-fund` timed out in this environment. Run `npm install` then `npm run build` locally before deployment.
