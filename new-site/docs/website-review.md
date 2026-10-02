# Website review — October 2, 2026

## Version 1.3 follow-up

The user found the previous navy/white design sterile and clarified that the educational content should be a permanent website reference rather than an article feed. The new direction uses warm ivory, deep plum, coral, peach, and soft yellow, with stronger typography, shaped photo banners, illustrated department links, and clear inquiry actions throughout.

The navigation now says **Learn**. The collection has six direct equipment choices and four practical planning links, with no search field, topic dropdown, results count, or article-style date header. The existing URLs continue to work.

All 35 equipment topics now begin with a plain-language explanation of what the equipment does. Expanded sections then introduce the options, purchasing checks, ownership costs, references, and inquiry links. Imaging explanations include NIH educational references. Review dates remain in a small note at the end of each page.

Homepage, equipment, service, about, and contact copy now states the visitor's next step more directly. The contact form invites either a question or an equipment list and clarifies that model and budget information are optional.

Validation for this version:

- All 40 pages checked at 320px, 768px, and 1440px: one main heading, no horizontal overflow, no failed loaded images.
- All 35 expanded explanations checked at 320px without overflow.
- Verified direct Learn navigation, mobile menu closing, All equipment after reload, equipment-specific quote prefilling, and required-field validation. No live messages were submitted.
- Checked key palette contrast pairs; darkened the accent so small links on peach meet 4.5:1.
- 22 tests passed; the build verified 80 HTML files and 2,797 local references, including the presence of each equipment explanation.

The earlier findings below describe the preceding streamlining pass; the 1.3 visual direction and Learn navigation supersede its library presentation.

## Findings and changes

The procurement, support, and service message is clear. The main obstacle was repetition: several headings and calls to action restated the same request, while large article cards and related-item photos added unnecessary scrolling.

- Library: six illustrated department/mission cards, followed by four compact planning links. Mobile cards use a small product photo and topic count.
- Guides: all 35 equipment summaries now lead with a concrete purchase consideration. Comparisons, checks, ownership costs, references, and inquiry links remain inside native disclosures. Removed repeated numbering, photo captions, introductory links, and department links at the end.
- Equipment: clearer descriptions and more consistent product photos; compact related links replace large cards. Removed duplicated introduction text from expanded details. Comments remain available in a disclosure.
- Contact: one prominent form beneath its banner. Removed duplicated sales copy and an unverified 48-hour response statement, including the success message.
- Careers: removed a second decorative image and the implication that LinkedIn necessarily lists current vacancies.
- Navigation: All equipment now retains its selection after reload. The homepage's View all equipment link opens all 23 listings.

## Editorial accuracy

The guides are practical procurement checklists, with manufacturer, WHO, FDA, and CDC sources linked per equipment topic. They do not claim first-hand testing, current model rankings, inventory, fixed prices, or universal service coverage.

The review tightened conventional hemodialysis wording, added a phototherapy reference for output checks, and replaced weaker links for ultrasound transducer compatibility, handheld activation, suction, point-of-care cartridges, spirometry, and surgical-table configurations. Existing broad planning articles were reviewed for unsupported promises and technical claims.

Examples of the source checks:

- [Sonosite transducer compatibility](https://www.sonosite.com/products/ultrasound-transducers): probe selection depends on the examination and compatible system.
- [FDA reusable-device reprocessing](https://www.fda.gov/medical-devices/products-and-medical-procedures/reprocessing-reusable-medical-devices): buyers need the correct validated cleaning and reprocessing instructions.
- [CDC dialysis water guidance](https://www.cdc.gov/dialysis-safety/hcp/recommendations-resources/water-use-in-dialysis.html): water-system considerations here apply to conventional hemodialysis.
- [Thermo Fisher centrifuge guide](https://documents.thermofisher.com/TFS-Assets/LPD/Handbooks/centrifuge-buying-guide.pdf): rotor, tubes, required centrifugal force, and temperature belong in the specification.

References often describe particular models. They cannot establish the condition, compatibility, support status, suitability, or contents of an actual offered unit. Qualified receiving teams must approve that configuration. Future model recommendations should use documented MMS experience and current unit-specific evidence.

## Photography

Replaced the green-crate anesthesia photo with a clearer supplied workstation image. The library uses consistent product examples. Histology now shows a rotary microtome, with a recorded Wikimedia credit. Surgical tables now use an image containing an operating table instead of an examination chair. Corrected the digital radiography image description to identify the display shown.

Some supplied examples are older and modest in resolution. They illustrate equipment; they are not photographs of confirmed MMS stock or facilities. Supplied-image publication rights still need confirmation before public release, as recorded in the original playground README. Original equipment photographs would improve authenticity further.

## Validation

- 22 unit tests passed.
- Production build passed: 40 pages, 39 aliases, and a 404 page; 2,790 local references checked.
- All 40 pages inspected in the browser at 320px and 1440px: one main heading each, no horizontal overflow, and no failed loaded images.
- 18 representative pages checked at 768px; desktop and 390px layouts inspected visually.
- All 35 guide disclosures expanded at 320px without horizontal overflow.
- Checked category selection, All equipment after reload, guide category/search/empty results, mobile menu and contents anchors, listing comments disclosure, and guide-to-contact prefilling.
- No real form submissions were sent. Live Formspree delivery is not verified by local tests; approved comments still require staff publication.

This remains a feature-branch playground. Production deployment is not part of this review.
