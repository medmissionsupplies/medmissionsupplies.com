# Med Mission Supplies website

The active React/Carbon website lives in `new-site/`. Original HTML and marketing files in the parent directory are preserved.

## Run and verify

Use Node.js 24 (matching CI):

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

The build produces a portable static site in `dist/`: 40 pages, 39 directory aliases, a 404 page, sitemap, and third-party licenses. Original `.html` URLs still work. Detail pages live under `/equipment/` and `/resources/`. No application server is required. Existing Nginx configuration serves these files and returns a real 404 for missing paths.

The footer displays the package version. Bump it before preparing a release.

## Version 1.5 design playground

MMS's hospital-wide procurement, support, and service offering is central, with wholesale and charitable pricing. Navy, clear blue actions, white reading surfaces, and amber offer buttons create a professional identity. Straight photo banners, simple corners, consistent equipment cards, and clear inquiry links carry that identity across every page.

The homepage and services page offer free physician-to-physician equipment consultation and free materials management support. Each has a dedicated prefilled inquiry path. The owner-provided lowest-quote guarantee appears on the homepage, equipment details, services, and contact page. No additional guarantee conditions or clinical services have been invented.

The homepage shows six actual equipment types in two desktop rows, with direct detail links and a prominent “View all 23 equipment types” button. Free advisory offers sit on dark panels with amber request buttons. Navigation distinguishes the equipment catalog, how MMS helps, and equipment advice. Learning actions explain what visitors will understand or compare; their descriptions remain visible on phones.

- All 23 illustrated equipment areas are visible together under 5 department headings, with detail pages, related equipment, and quote/service links. No equipment search or filter tabs. Every card is present in static HTML, including visits with older category query strings. Detail-page back links point to the corresponding department heading.
- Photo banners on equipment, services, about, careers, contact, and reading pages. The contact form stays prominent. Longer listing details and comments use native disclosures.
- Equipment advice is a permanent reference, not an article feed. Six illustrated department/mission collections cover 35 equipment topics; four planning pages support project and service inquiries. There is no search box, topic dropdown, count, or publication-date header.
- Every equipment topic explains the basics before presenting options, purchase checks, ownership costs, official references, and inquiry links. Every listing links directly to relevant explanations. Desktop contents links and a mobile jump menu help visitors reach the equipment they need.
- Moderated comments use the existing Formspree service. Staff publish approved public text with a later release; see [the moderation workflow](docs/listing-comments.md).

The prior streamlining remains: compact planning/related links, short summaries, and one contact form. See the [whole-site review](docs/website-review.md) for findings and validation.

Photographs illustrate categories or example models, not MMS stock or facilities. Local photos have descriptive alternative text and [individual credits](licenses/Photography.txt), linked from each footer. The catalog does not invent prices, inventory, warranties, rankings, hands-on reviews, or testimonials.

## Buying guide content

The supplied review documents informed the item-by-item structure and example photography. Older prices, rankings, and first-person experience claims were not carried over. Equipment explanations and purchasing considerations use manufacturer documentation and NIH, WHO, FDA, and CDC resources checked on October 2, 2026; linked references appear within each item's expanded details.

Guides are procurement guidance for MMS review. Clinical and technical teams must approve the actual specification. Sources describe particular products or workflows and do not certify every model pictured. Examples can be older; current support, condition, compatibility, availability, and the quoted package require verification for each purchase.

Before public release, MMS should review the editorial guidance and confirm publication rights for supplied reference images. Original filenames are recorded in `src/reference-photos.mjs` and `licenses/Photography.txt`. Keep source links and per-guide review dates current when revising advice.

## Contact and comment delivery

Both forms use the established endpoint `https://formspree.io/f/xkgrvweb`. Delivery and spam filtering depend on the account configuration and limits. Success requires an accepted HTTP response; errors retain input, duplicate clicks are guarded, and stalled submissions time out.

Quote and service links prefill contact using allowlisted equipment or topics. Forms have native HTML actions for visitors without JavaScript. The complete catalog, static content, and equipment explanations remain readable without it.

No real messages or comments were sent during development. Browser form tests intercepted requests and simulated responses. Live Formspree delivery and staffed moderation must be verified before relying on comments in production.

## Content maintenance

- `src/catalog.mjs` and `src/additional-equipment.mjs`: equipment categories, descriptions, photos, and relationships.
- `src/articles.mjs`: planning pages and the combined content registry. Legacy filtering helpers remain available to callers; Learn presents all sections directly.
- `src/equipment-basics.mjs`: plain-language introductions for all 35 equipment topics.
- `src/buying-guides.mjs`: department guides, item comparisons, checklists, source IDs, and review dates.
- `src/guide-sources.mjs`: official reference labels and URLs.
- `src/reference-photos.mjs`: supplied photo descriptions and original filenames.
- `src/routes.mjs`: page registry, metadata, and route resolution.
- `src/Explore.jsx`: home, equipment, services, guides, and comments.
- `src/App.jsx`: shared shell, original pages, and contact form.
- `src/editorial.css`: responsive design; `src/styles.scss` loads Carbon and local IBM Plex fonts.
- `src/approved-comments.json`: approved public comments only, never email addresses or raw form exports.
- `scripts/prerender.jsx`: static generation from the route registry.
- `scripts/verify.mjs`: local links, guide anchors, assets, content, team, and form checks.

## Validation and release

Unit tests cover contact transport, comments/moderation, catalog and guide relationships, legacy filtering helpers, routes, and page/history navigation. The build checks all 80 HTML outputs, local references, and equipment explanations. Browser QA covers all 40 pages at 320px, 768px, and 1440px, the direct learning links, equipment categories, expanded explanations, and inquiry prefilling. Earlier tests also checked form error recovery and mobile navigation.

Work on feature branches. **The current `.github/workflows/deploy.yml` deploys pushes to `main`.** Older notes predate that automation; do not push to `main` to share a preview. This playground changes neither production configuration nor DNS, mail, Cloudflare, or the NAS. Follow deployment documentation only for an authorized release.

IBM Carbon/icons use Apache-2.0; IBM Plex uses the SIL Open Font License. Licenses are included in the built site.
