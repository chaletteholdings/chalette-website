# Chalette Command Room — Marketing Site

Editorial long-scroll marketing site for **Chalette · Command Room · AI Chief of Staff**.
Static HTML + CSS, no build step, deployed to Cloudflare Pages → `chaletteholdings.com`.

## Preview locally

```powershell
cd C:\Users\asdas\repos\chalette-website
python -m http.server 8000
# open http://localhost:8000
```

Or just double-click `index.html` — fonts load from Google CDN, no server strictly required.

## Pages

| File | URL | Purpose |
|---|---|---|
| `index.html` | `/` | Main landing page. Hero → 5 promises → How it works → Audience → Engagement → Final CTA. |
| `security.html` | `/security.html` | Plain-English security page. Linked from top nav. Most visitors land here from "Security". |
| `security-detail.html` | `/security-detail.html` | Long-form IT/security-review page. Linked from the simple page + footer. Written to survive an IT review. |

## Stylesheet architecture

| File | Role |
|---|---|
| `assets/chalette.css` | **Design tokens** — colors, type scale, spacing, motion. Reusable across any page. |
| `assets/landing.css` | Page-specific styles for `index.html` (hero, promises grid, steps, audience, engagement, final-CTA, footer, nav, buttons). |
| `assets/article.css` | Long-form article styles used by `security.html` and `security-detail.html` (prose, blockquote, IT checklist, FAQ, breadcrumb). |

New pages should import `chalette.css` + the appropriate page-styles file (`landing.css` for landing-style, `article.css` for long-form).

## Project structure

```
chalette-website/
  index.html                # Landing page
  security.html             # Simple security page (nav-linked)
  security-detail.html      # Detailed IT/security page
  README.md
  .gitignore
  assets/
    chalette.css            # Design tokens (colors, type, spacing)
    landing.css             # Landing-page styles
    article.css             # Long-form article styles
    favicon.svg
    logo-lockup.svg         # Nav + footer wordmark (light)
    logo-lockup-reversed.svg
    mark.svg                # Standalone mark (light)
    mark-reversed.svg
```

## Content sources of truth

| Content | Source doc |
|---|---|
| Five promises | `_hq/PRODUCT_STRATEGY_v3.md:22-26` (Cowork workspace) |
| Hero positioning | `command-room/README.md` + `references/HOW_COMMAND_ROOM_WORKS.md` |
| `security.html` body | `deliverables/Chalette_Security_Page_Simple_2026-05-24.md` (Cowork) |
| `security-detail.html` body | `deliverables/Chalette_Security_Page_Revised_2026-05-24.md` (Cowork) |

If product positioning changes, update those sources first, then re-render the pages.

## Deploy

**Host:** Cloudflare Pages
**Repo:** `chaletteholdings/chalette-website` (this repo)
**Domain:** `chaletteholdings.com`

### Setup (one-time)

1. In Cloudflare dashboard: Workers & Pages → Create application → Pages → Connect to Git
2. Pick this repo. Build settings — leave all blank (framework: None, build command: empty, output: `/`).
3. Deploy. Cloudflare gives you a `chalette-website.pages.dev` URL.
4. Add custom domain `chaletteholdings.com` in the Pages project → Custom domains. If DNS is on Cloudflare, wiring is automatic; if not, add the CNAME at your registrar.

### Ongoing

Every push to `main` auto-redeploys in ~30 seconds. No CI/CD config needed.

## Open TODOs

- [ ] **Wire `#book` to a real booking flow.** Currently anchors to itself (5 occurrences across pages). Pick Cal.com / Calendly / HubSpot, replace `href="#book"` everywhere.
- [ ] **OG image.** `assets/og-image.png` (1200×630) for social shares. Meta tags reference it but the file doesn't exist.
- [ ] **Canonical URL.** Add `<link rel="canonical">` and `og:url` once the production domain is live.
- [ ] **Font licensing.** Currently pulls Cormorant Garamond from Google Fonts — substitution for a licensed Garamond / GT Sectra / Canela cut per the design-system note. Decide if Cormorant ships or budget for the licensed cut.
- [ ] **Analytics + consent.** Plausible / GA4 / Fathom — pick one. Cookie banner if GA4.
- [ ] **Remove "Status: revised draft, 2026-05-24" footnote on `security-detail.html`** (currently signals "draft" to reviewers; safe to strip once content is signed off).
- [ ] **Customer-name scrub of the plugin source** before extending the "read the plugin's Markdown files on request" invitation (per security memo Open Item #6).

## Design provenance

Hero, promises, audience, engagement designed in claude.ai/design (export 2026-05-24). Iterated through 25+ edits with M to land on current content and structure. Security pages built from fact-checked source markdown in the Cowork workspace.
