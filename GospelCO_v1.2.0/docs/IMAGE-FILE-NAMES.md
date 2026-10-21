# GospelCO image filenames and locations

Place image files at these exact paths in the project. Keep the filename and extension exactly as shown (extensions are case-sensitive on many hosts).

## Service cards and service detail pages

Folder: `public/assets/images/services/`

| Service image | Exact filename | Full project path |
|---|---|---|
| AI creative services | `ai.png` | `public/assets/images/services/ai.png` |
| Branding | `branding.jpg` | `public/assets/images/services/branding.jpg` |
| Flyers and social design | `flyer.jpg` | `public/assets/images/services/flyer.jpg` |
| Motion design | `motion.jpg` | `public/assets/images/services/motion.jpg` |
| Video production/editing | `video.jpg` | `public/assets/images/services/video.jpg` |
| Website design/development | `website.jpg` | `public/assets/images/services/website.jpg` |

The service cards and service detail pages use these same image paths, so one file per service is enough.

## Other image assets currently referenced

| Where it appears | Exact filename | Full project path |
|---|---|---|
| Founder/portrait image | `founder.jpg` | `public/assets/images/hero/founder.jpg` |
| Main logo/favicon | `logo.png` | `public/assets/images/logo/logo.png` |
| Text logo variant | `gospelco_text_logo.png` | `public/assets/images/logo/gospelco_text_logo.png` |
| White logo variant | `logo-white.svg` | `public/assets/images/logo/logo-white.svg` |

An older sample portfolio image is also included at `public/assets/images/portfolio/project1.webp`; it is not currently referenced by the live React interface. You do not need to add a replacement for it unless you decide to use it in a portfolio section.

## Replacing an image

Keep the same filename and put the replacement file in the exact folder listed above. For example, replace `public/assets/images/services/ai.png` with your new AI service image named `ai.png`. Do not put these files in `src/`; Vite serves the files in `public/` from the site root.
