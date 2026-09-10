# Med Mission Supplies content and asset audit

Audited 2026-09-10. Source: the five HTML files and assets in `/Users/meeting-stone/Documents/GitHub/medmissionsupplies.com`. The old site was read only; no old files were changed. No `AGENTS.md` was found in the repository or its ancestor directories checked through `/Users`.

## Existing information architecture

The main navigation, in its existing order, is:

| Label | Old path | Actual content/function |
| --- | --- | --- |
| Home | `index.html` | Mission introduction, selected example equipment, link to contact |
| Our Offerings | `offerings.html` | Four categories: ultrasound, endoscopy/scopes, EKG, portable X-ray; contact links |
| About & Team | `about.html` | Mission, partnerships/training/support, four staff names and roles |
| Employment | `employment.html` | General recruiting message and company LinkedIn link; no actual listed vacancies |
| Contact Us | `contact.html` | Working HTML POST form integration with Formspree |

All pages share a large image-only header, centered navigation, main content, and logo/copyright footer. These are structural references only. The rebuild can retain the same page inventory and purposeful cross-links without copying the old layout or styling.

## Business content that is present in the source

- Brand spelling: **Med Mission Supplies** (plural “Supplies”).
- Audience: mission hospitals, remote clinics, rural clinics, and other mission projects serving regions with limited resources.
- Source headline: “Empowering Healthcare in Remote Regions.”
- Mission: help caregivers obtain reliable, portable medical equipment while keeping costs and logistics manageable.
- Approach: lower overhead; refurbished and portable equipment; focus on durability, transport, straightforward setup, and minimal maintenance.
- Founders' stated background: hands-on experience in medical equipment and shipping support for mission hospitals and remote clinics.
- Partnership services explicitly mentioned: hands-on training, ongoing remote support, and helping local teams operate and maintain devices independently.
- Source contact response language: “We strive to respond within 48 hours” / “We aim to respond within 48 hours.” Preserve as an aim, not a guaranteed SLA.
- No founding year, location, charity/nonprofit status, donation mechanism, certifications, service metrics, countries served, partner organizations, testimonials, case studies, business hours, public email address, or telephone number is supplied. Do not fabricate these.

## Offerings

These are examples from existing site copy, not a verified current inventory. It is appropriate to frame them as example systems and invite a conversation about suitability and availability.

| Category | Example systems in old copy | Other source detail |
| --- | --- | --- |
| Ultrasound Equipment | SonoSite mTurbo and similar portable systems | Portability/durability; maternal health, emergency diagnostics, routine screenings |
| Endoscopy Systems & Scopes | Olympus GIF-160 endoscopy system; interchangeable scopes | Gastrointestinal and ENT procedures; compact visualization equipment |
| EKG Machines | Zoll M Series | Old copy says pre-tested/calibrated and intended for field conditions |
| X-ray Units | MinXray HF100/200 | Old copy describes portable units with digital imaging panels, low-power operation, simple setup |

Avoid adding fresh clinical, performance, compatibility, stock, or warranty claims. “GIF-160” and “Zoll M Series” naming is inherited from the source rather than independently fact-checked product taxonomy. Category-level descriptions and qualified examples avoid expanding those claims.

The offering images are generic remote Wikimedia images, not photos of actual MMS inventory:

- `https://commons.wikimedia.org/wiki/Special:FilePath/Echographe_(Toshiba_Aplio).jpg`
- `https://commons.wikimedia.org/wiki/Special:FilePath/Storz_Endoscopy_Unit.png`
- `https://commons.wikimedia.org/wiki/Special:FilePath/Defibrillator_monitor_Lifepak_12.jpg`
- `https://commons.wikimedia.org/wiki/Special:FilePath/Mobile_X-ray_machine.jpg`

The old alt text acknowledges them as generic. They have no embedded attribution in the old page. There are no local product photographs. Carbon icons or carefully labeled illustrations are suitable alternatives that avoid implying they show stocked devices.

## Team

Retain these exact facts; no biographies or additional credentials are supplied:

| Person | Role |
| --- | --- |
| Lynette Hwang | Founder & CEO |
| Vincent Larkin | Director of Operations |
| John Landman | Assistant Programmer |

**Omit William Grayson, Biomed Technician, per the user's explicit instruction.** His files exist in `images/william.jpg` and `images/william.webp`, but must not appear in the new site. The old team page actually uses the company logo for all portraits, despite the presence of those files. There are no usable portraits of the three retained people. Initial-based or typographic staff cards would be more honest than invented portraits.

## Contact integration

The existing integration is a plain HTML form:

```html
<form action="https://formspree.io/f/xkgrvweb" method="POST">
```

Its form field names are `name`, `email`, and `message`; all are required. `email` uses HTML input type `email`. The page states Formspree powers the form. There is no JavaScript, API key, spam-protection widget, local backend, or custom response handling in the repository. Preserve the known endpoint. Do not send a real message during testing. A mock request can verify successful submission states, and invalid/network states should also be considered if an AJAX flow is added.

No public address, phone number, or email exists in the five source files. A direct contact form and equipment inquiry deep links are therefore the appropriate contact routes.

## Employment

Existing company LinkedIn URL:

`https://www.linkedin.com/company/med-mission-supplies`

The old page says job listings will appear when available and invites visitors to view the LinkedIn page. It does not list a specific role or provide an application form. Do not invent openings, salaries, benefits, application requirements, or a claim of active hiring. A clear company LinkedIn CTA and general expression-of-interest contact route are supported.

## Brand image inventory

| File | Pixels | Notes |
| --- | --- | --- |
| `Marketing/MMS Logo.png` | 1024 × 1024 | User's preferred source for colors; transparent background; colored seal |
| `Marketing/MMS Banner Center.png` | 1536 × 1024 | Opaque royal-blue field; small white seal near lower center; tan bottom band |
| `Marketing/MMS Banner.png` | 1536 × 1024 | Alternate banner |
| `Marketing/MMS White Logo.png` | 1500 × 1000 | White mark on transparent background with substantial side margins |
| `Marketing/MMS Light Blue Logo.png` | 1500 × 1000 | Alternate light-blue mark |
| `Marketing/MMS Flag.png` | 1500 × 1000 | Flag asset |
| `Marketing/MMS Flag Royal Variant.png` | 1500 × 1000 | Alternate flag asset |
| `Marketing/GoogleLogo.png` | 320 × 132 | Unrelated visual; no need to use |
| `Marketing/PM PNG.png` | 1375 × 677 | Other marketing image; not needed for primary branding |
| `images/MMS_Logo.png` and `.webp` | 1024 × 1024 | Existing old-site color logo versions |
| `images/MMS_White_Logo.png` and `.webp` | 1500 × 1000 | Existing old-site white logo versions |
| `images/mms.ico` | 48 × 48 | Existing favicon |
| `images/william.jpg` and `.webp` | 1048 × 1368 | Former employee; exclude from rebuild |

The exact existing filenames differ slightly in order/capitalization from the user's shorthand (“mms logo white.png” is `Marketing/MMS White Logo.png`). Use the actual files.

### Palette sampled from the user's preferred logo

The logo is textured, so it contains many close colors. Representative median RGB values sampled from visible opaque areas are:

| Role | Hex |
| --- | --- |
| Deep navy | `#092B45` |
| Gold | `#FBBA27` |
| Warm cream | `#FEEFC6` |
| Globe blue | `#337698` |
| Red cross accent | `#E34734` |

These are measured approximations, not documented brand standards. They are closer to the preferred logo than the old CSS palette (`#274E78`, `#3461A2`, `#BEA070`, `#FFD700`). A restrained navy/cream/gold brand system should carry the main interface. Red can remain part of the seal and be reserved for semantic error use elsewhere.

### Visual fit considerations

- The colored seal's nontransparent bounding box is `(75, 67)` to `(949, 950)` within 1024 × 1024. It works well on cream or white with `object-fit: contain`.
- The white mark's nontransparent bounding box is `(303, 51)` to `(1222, 945)` within 1500 × 1000. Its transparent side margins make it look smaller than the colored seal at the same CSS width. Account for this without altering the source file.
- The center banner is a 3:2 full field, not a conventional short wide website banner. Cropping it to a short hero can remove the lower-centered mark or leave empty space. It works best as a deliberate cropped brand panel with tested object positioning, or on a tall section where the original composition is retained.
- No local mission-clinic, shipping, equipment, or retained-team photography is present. Do not describe generated/stock images as actual MMS operations.

## Implementation recommendations to preserve content fidelity

1. Preserve all five main routes and descriptive page titles.
2. Use the actual Carbon components for navigation, forms, buttons, and structured offerings, with accessible brand token overrides.
3. Give the home page clear links to offerings and contact, and make equipment inquiry CTAs carry the relevant category into the contact page.
4. Keep team presentation to the three supplied names and roles.
5. Keep Formspree connected to the existing endpoint, with no real test message sent.
6. Use LinkedIn as the employment destination, without suggesting unverified open positions.
7. Keep the old HTML, CSS, and image directories intact; build and document the replacement separately.
