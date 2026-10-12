# Chalette · Command Room: Marketing Site

Static site for **Chalette · Command Room**. Deployed to Cloudflare (static assets, `wrangler.jsonc`) at
`chaletteholdings.com`, auto-deployed on push to `main`.

## Structure

- `index.html` (Home), `command-room.html` (The Product), `working-sessions.html` (The Service),
  `results.html` (Results), `about.html` (About), `security.html` (Security, linked from About and The Service),
  `partners.html` (Partners, in the footer), `book.html` (Book a working session). CSS and the homepage animation are inline.
- `share.png`: the image for link previews.
- `samples/` and `docs/`: earlier example PDFs and the security overview PDF, kept so existing links keep working.

Canonical editing source is the Chalette Rebrand folder (`site/build_site.py` then `site/build_pages.py`);
the pages here are deployed copies. The previous single-file site is in git history before this commit.

## Preview locally

`python -m http.server 8000`, then visit `http://localhost:8000`.
