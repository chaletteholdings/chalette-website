# Chalette · Command Room — Marketing Site

Single-file static site for **Chalette · Command Room · AI for the people who run the business**.
Deployed to Cloudflare (static assets, `wrangler.jsonc`) at `chaletteholdings.com`, auto-deployed on push to `main`.

## Structure

- `index.html` — the entire site. One file: all sections (home, work, examples, security, about)
  are `data-page` divs with `#hash` routing. CSS and JS are inline. Inline data-URI favicon.
- `samples/` — example deliverable PDFs (fully fictional) shown in the Examples gallery.
- `samples/thumbs/` — gallery thumbnail images for each example.
- `docs/Command-Room-Security-Overview.pdf` — linked from the Security section.

Canonical editing source lives in the Command Room workspace at `_CURRENT/Website/`;
`index.html` here is the deployed copy. The prior multi-page build is in git history before this commit.

## Preview locally

Open `index.html` directly, or `python -m http.server 8000` then visit `http://localhost:8000`.
