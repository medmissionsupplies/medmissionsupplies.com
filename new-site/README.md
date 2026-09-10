# Med Mission Supplies — Carbon rebuild

The replacement website lives entirely in this directory. The original HTML pages, stylesheet, images, and Marketing folder in the parent directory are unchanged.

## Run locally

Use Node.js 22.12+ (or a supported newer release), then run these commands from this directory:

```sh
npm ci
npm run dev
```

## Build and verify

```sh
npm test
npm run build
npm run preview
```

The build creates a portable static website in `dist/`, with pre-rendered HTML for all five pages, four short-URL aliases, a 404 page, and third-party licenses. No application runtime is required.

The normal page URLs remain `index.html`, `offerings.html`, `about.html`, `employment.html`, and `contact.html`. Directory index copies also serve `/offerings/`, `/about/`, `/employment/`, and `/contact/`; the web server can redirect the corresponding paths without a trailing slash. Assets and internal links use paths from the domain root so every entry point loads the correct page. Configure the host to return `404.html` with HTTP 404 for missing URLs; do not use a fallback to `index.html`.

See [NAS deployment](deploy/README.md) and the accompanying NGINX configuration for hosting and rollback details.

## Design and implementation

- Actual IBM Carbon React 1.116.0 components: UI shell, responsive navigation, grid, buttons, clickable tiles, breadcrumbs, text inputs, text area, and inline notification.
- IBM Plex Sans is bundled and served locally. Only the required Carbon component styles are included.
- Brand colors sampled from `Marketing/MMS Logo.png`: navy `#092B45`, gold `#FBBA27`, cream `#FEEFC6`, blue `#337698`, and the logo’s red accent `#E34734`.
- Supplied logo, white logo, and centered banner are copied without altering the originals. Team members use initials because no current staff portraits were provided.
- Five original pages are preserved. William Grayson is absent from the rebuilt team page. Equipment models are examples, not a live inventory feed.
- Responsive breakpoints follow Carbon. Navigation includes skip links, current-page states, mobile expansion state, Escape dismissal, and focus-exit dismissal. Reduced motion preferences are honored.

See [Carbon research](docs/carbon-research.md) for the 25 official documentation references and [content audit](docs/content-audit.md) for source material.

## Contact form

The existing Formspree endpoint is preserved: `https://formspree.io/f/xkgrvweb`. The form collects the same required name, email, and message fields. Equipment inquiry links can prefill the message. Client-side submission provides progress, confirms success only after an accepted response, preserves text on errors, and times out stalled requests. Pre-rendered HTML also supports native form submission without JavaScript.

Delivery continues to depend on the existing Formspree account configuration and limits. No test messages were sent. The transport tests use simulated success, rejection, network failure, and timeout responses.

## Validation

`npm run build` verifies rendered pages, heading and landmark presence, local asset paths including fonts, internal links and anchors, retained staff, and the original form endpoint. `npm test` verifies the form transport. A source review also covered content fidelity, navigation focus, responsive styles, and text contrast.

Browser review covered all five pages at 320, 768, 1056, and 1600 CSS pixels, with additional visual checks at 390 and 1440 pixels. The pages have no horizontal overflow at these sizes, primary buttons retain their 48-pixel height, and no broken images or browser console errors were observed. Interactive checks verified menu opening and focus, Escape dismissal, focus-exit dismissal, desktop keyboard order, equipment inquiry prefilling, and required-field validation. No live messages were sent.

The layout corrections include Carbon's required layout styles, logo alignment, consistent content gutters, the contact form's column placement and mobile reading order, About-page spacing, compact mobile heroes and breadcrumbs, and hidden-menu visibility.

## Main files

- `src/App.jsx`: shared shell and all five page components.
- `src/styles.scss`: Carbon styles, MMS tokens, page composition, and responsive styles.
- `src/contact-service.mjs`: contact form delivery.
- `scripts/prerender.jsx`: static page generation.
- `.openai/hosting.json`: identity for the separate owner-private Sites review copy.

IBM Carbon and Carbon icons are Apache-2.0 licensed; IBM Plex uses the SIL Open Font License. Their licenses are included in `licenses/`.
