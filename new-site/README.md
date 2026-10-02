# Med Mission Supplies website

The active React/Carbon website lives in `new-site/`. The original HTML and marketing files in the parent directory are preserved.

## Run and verify

Use Node.js 24 (matching CI):

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

The build produces a portable static website in `dist/`: 23 pages, 22 directory aliases, a 404 page, a sitemap, and third-party licenses. The normal original `.html` URLs still work. New detail pages live under `/equipment/` and `/resources/`. No application server is required. The existing Nginx configuration serves the generated files and returns a real 404 for missing paths.

The footer displays the package version. Bump it before preparing a new release.

## Version 1.1 design playground

The site now centers MMS's hospital-wide procurement, support, and service offering, with wholesale and charitable pricing. The visual direction uses navy, blue, white, and gold accents, editorial typography, and locally served equipment photography. The compact homepage has three sections: the main offering, five equipment categories, and a contact invitation. Services and articles have dedicated pages. The original Carbon navigation, contact form, team information, reduced-motion behavior, and page navigation remain in place.

- 12 equipment areas across 5 categories, with individual pages, related equipment, search, URL-backed filters, and contextual quote/service links.
- A dedicated Procure / Support / Service page and charitable-pricing paths.
- 4 complete equipment planning articles, with category/search filters, contents links, related listings, and individual metadata.
- Moderated questions and comments on each equipment page. Submissions go to the existing Formspree service. Staff review and publish approved public text with a subsequent site release. This is not automatic real-time publication; see [the moderation workflow](docs/listing-comments.md).
- Real stock photographs, clearly presented as category illustrations rather than MMS inventory or facilities. Credits and license links are in [Photography.txt](licenses/Photography.txt). The catalogue does not invent prices, stock levels, service warranties, or customer testimonials.

## Contact and comment delivery

Both forms use the established endpoint `https://formspree.io/f/xkgrvweb`. Delivery and spam filtering depend on the existing Formspree account configuration and limits. A success state requires an accepted HTTP response; errors retain visitor input, duplicate clicks are guarded, and stalled submissions time out.

Quote and service links prefill the contact form using an allowlisted equipment category or topic. Both forms also have native HTML actions for visitors without JavaScript; interactive catalogue and article filters require JavaScript. Static article, equipment, and contact content remains readable without it.

No real contact messages or comments were sent during development. Browser form tests intercepted requests and simulated service responses. Live Formspree delivery and a staffed moderation process must be verified before the comment feature is relied on in production.

## Content maintenance

- `src/catalog.mjs`: equipment categories, descriptions, and listing relationships.
- `src/articles.mjs`: article text, categories, and related equipment.
- `src/routes.mjs`: shared page registry, metadata, and route resolution.
- `src/Explore.jsx`: home, equipment, services, articles, and moderated comment UI.
- `src/App.jsx`: shared shell, original pages, and contact form.
- `src/editorial.css`: the shared responsive design; `src/compact-home.css` controls the shorter homepage; `src/styles.scss` retains Carbon and original page foundations.
- `src/approved-comments.json`: approved public comments only; never add email addresses or raw form exports.
- `scripts/prerender.jsx`: static HTML generation from the shared route registry.
- `scripts/verify.mjs`: local links, anchors, assets, all content pages, team, and form checks.

Article text is original planning guidance for review by MMS, not manufacturer instructions or a promise of equipment availability. Any equipment configuration, charitable pricing, or service commitment should be confirmed for the individual request.

## Validation and release

Unit tests cover contact transport, comments/moderation, catalogue and article relationships, route resolution, and page navigation/history. The production build checks all 46 generated HTML files and local references. Browser QA includes desktop and mobile layouts, category/search behavior, article navigation, contact prefilling, comment success/failure recovery, and mobile menu dismissal.

Work on feature branches. **The current `.github/workflows/deploy.yml` deploys pushes to `main`.** Some older deployment notes predate that automation; do not push to `main` merely to share a preview. This playground changes neither production configuration nor DNS, mail, Cloudflare, or the NAS. See the existing deployment documentation before any authorized release.

IBM Carbon/icons use Apache-2.0; IBM Plex uses the SIL Open Font License. Licenses are included in the built site.
