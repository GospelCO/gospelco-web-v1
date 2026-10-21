# Build status

The JSX/JavaScript syntax was checked locally and `package.json` plus `public/sitemap.xml` were validated. The final palette pass preserves restrained `#07D200` green accents for small status/proof details; purple remains the primary accent. A full Vite production build could not be completed in the editing environment because `npm install` timed out before dependencies finished installing.

Before deployment, run:

```bash
npm install
npm run build
npm run preview
```

Vercel settings:
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: leave blank / auto-detect

Confirm the WhatsApp business number `2349034013236` is correct before publishing.
