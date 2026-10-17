# MMS equipment buying guides

The public library at `/articles.html` combines 23 equipment guides with 23 focused purchasing, setup and ownership guides. Each has an original short buying sheet, detailed editorial analysis, source notes, a one-page PDF and a social preview. Existing resource URLs remain available.

## Evidence and scope

The October 2026 review uses primary manufacturer documentation, WHO/IAEA/UNICEF material, documented seller offers and identified historical notes. A seller's asking price is not a delivered quotation or independent reliability evidence. Each article explains missing evidence and configuration or destination dependencies. Guidance supports purchasing review; it does not replace clinical acceptance or local technical requirements.

The reference review indexed 646 public Block Imaging resources, including 26 Guide-tagged resources and 53 Pricing Info resources. This is an index and topic audit, not a claim to have read every full article. Nine selected public articles were read in full. All 26 public guide landing pages were checked; gated full guides were not obtained or copied. Public competitor material informed topic selection and questions, not a paragraph-by-paragraph rewrite. Manufacturer and independent primary sources support the MMS conclusions.

## Content pipeline

`src/research-guides.generated.mjs` is the checked-in public content record. `scripts/import-research-guides.py SOURCE_DIRECTORY` imports the reviewed editorial JSON and approved photographs. It requires 46 unique guides and coverage for all 23 equipment categories. The original research working files remain outside the production release. The compact browser index is separate from per-article data modules, so visitors load only the article they open. Static prerendering resolves the same data before rendering; every article remains complete without JavaScript.

`scripts/generate-guide-pdfs.py` generates the checked-in individual one-page PDFs and combined booklet in `public/guidesheets/`. It requires ReportLab and pypdf; Python is not needed by production or CI. The combined compendium has two linked contents pages and 46 bookmarked guide sheets. Render and inspect PDF changes before committing them.

Photography permissions, source links and honest model/category captions appear with each guide. `licenses/Equipment-guide-photography.txt` retains the credits. Do not relabel an illustrative or archive image as a shortlisted model. Website images pass through the existing responsive WebP pipeline. Crawler share cards remain optimized JPEG for compatibility.

## Release checks

Run `npm test` and `npm run build`. The build verifies every local page and anchor, responsive image candidate, canonical URL, share metadata and card. Review the library and representative long guides on desktop and mobile, check PDF pagination and download links, and verify the deployed commit marker after the existing GitHub deployment succeeds.
