GOSPELCO SITE — 4 FILE FIX

Why the service pages were broken:
src/App.jsx used <ChevronRight /> on line 252 but never imported it.
Every service page crashed to a blank screen. Nothing else was wrong.

FILE 1 — src/App.jsx
Replace the lucide-react import block line 5-7 with:

import {
  ArrowUpRight, BriefcaseBusiness, Check, Compass, Crown, Handshake,
  Menu, ShieldCheck, TrendingUp, X, Globe, Video, Palette, Sparkles, ChevronRight
} from "lucide-react";

(the only change is adding ChevronRight)

FILE 2 — src/data/services.js
Every service path must drop the /index.html suffix:
  /services/graphic-design/index.html     -> /services/graphic-design
  /services/music-cover-art/index.html    -> /services/music-cover-art
  /services/ai-video-adverts/index.html   -> /services/ai-video-adverts
  /services/video-editing/index.html      -> /services/video-editing
  /services/web-design/index.html         -> /services/web-design
  /services/brand-strategy/index.html     -> /services/brand-strategy

FILE 3 — vercel.json
Add a redirect so old links keep working:

{
  "redirects": [
    { "source": "/services/:slug/index.html", "destination": "/services/:slug", "permanent": true }
  ],
  "rewrites": [
    { "source": "/services/(.*)", "destination": "/index.html" },
    { "source": "/cart/(.*)", "destination": "/index.html" }
  ]
}

FILE 4 — public/sitemap.xml
Use clean URLs (no /index.html). A corrected sitemap.xml is included in this folder.

TESTED: I built the project with these changes and loaded all 6 service pages in
headless Chrome. Every page renders its own title and H1, zero JS errors.

NOT FIXED YET (next step): true prerendering so Google sees real HTML.
