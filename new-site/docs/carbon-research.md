# IBM Carbon research for the MedMissionSupplies rebuild

Research completed September 10, 2026, using the official Carbon documentation and Carbon GitHub repository. This report translates the research into implementation decisions for a public marketing website. Recommendations specific to MMS are design judgments, rather than claims that Carbon prescribes a particular site composition.

## Recommended direction

Use actual Carbon React components, IBM Plex Sans, the 2x Grid, expressive typography, and semantic theme tokens. Preserve the supplied MMS artwork and derive the brand colors from it. Compose a clean editorial website with strong alignment, ample whitespace, flat surfaces, and clear navigation. A branded White theme with selective dark sections is a good fit; the dark sections need a coherent inverse theme for text, controls, focus, and hover states.

Carbon is broader than a component library: its foundations include grid, color, type, spacing, motion, icons, and behavior. Applying these foundations to the page composition is what makes the implementation consistent. The user-requested starting points explain this relationship: [Designing get started](https://carbondesignsystem.com/designing/get-started/), [Developing get started](https://carbondesignsystem.com/developing/get-started/), and the [Carbon repository](https://github.com/carbon-design-system/carbon).

## React setup and source of truth

- Install `@carbon/react`, which includes components, styles, and an icons entry point. Import components from `@carbon/react` and icons from `@carbon/react/icons`.
- Compile Sass in the build pipeline. The documented all-component stylesheet entry is `@use '@carbon/react';`; selective imports such as `@use '@carbon/react/scss/components/button';` are also supported.
- Vite is explicitly among the supported build-pipeline examples. Use one global Carbon stylesheet and compose site styles around it. [React framework setup](https://carbondesignsystem.com/developing/frameworks/react/)
- The repository's React package declared version `1.116.0` when inspected; the documentation footer showed `^1.115.0`. A repository `main` version is not, by itself, proof of a published release. Resolve the stable release at installation and retain its lockfile. Current source peer ranges accept React and React DOM 16.8.6, 17.0.1, 18.2.0, or 19.0.0 series, corresponding `react-is`, and Sass `^1.33.0`. [Current package manifest](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/react/package.json)

## Brand theming

Carbon supplies White, Gray 10, Gray 90, and Gray 100 themes. White is the React default. Themes alter values while preserving token roles, so a brand does not need IBM blue everywhere. Configure a theme through Sass before consuming the styles, or emit theme variables within appropriate scopes. Avoid recoloring components with arbitrary selectors when a semantic token expresses the intended change. [Theme overview](https://carbondesignsystem.com/elements/themes/overview/)

The theme package supports Sass configuration, CSS custom-property emission, and contextual theming. React users normally do not need to install the themes package independently. For MMS, centralize brand values in a small theme map and make dark regions use a complete appropriate token context. This is an implementation recommendation based on the supported theming model. [Theme code](https://carbondesignsystem.com/elements/themes/code/)

Recommended roles to inspect: `background`, `background-brand`, `layer-01`, `text-primary`, `text-secondary`, `text-inverse`, `link-primary`, `link-primary-hover`, `link-inverse`, `icon-interactive`, `border-interactive`, and `focus`. Keep neutral layers, success, warning, and error roles meaningful. Component tokens belong to their component, not unrelated decoration. [Color token reference](https://carbondesignsystem.com/elements/color/tokens/)

Buttons also need coherent `button-primary`, `button-primary-hover`, `button-primary-active`, `text-on-color`, and `icon-on-color` values, plus intact `focus` and `focus-inset`. A brand override must cover interaction states, not only the resting background. Tertiary and ghost styles have separate token relationships. [Button style reference](https://carbondesignsystem.com/components/button/style/)

## Typography

IBM Plex is Carbon's typeface. Expressive typography is intended for editorial and marketing content; productive typography suits dense task-focused interfaces. Expressive headings respond to viewport width, while productive headings stay fixed. This supports large, light-weight page titles paired with compact, readable navigation and form controls. [Typography overview](https://carbondesignsystem.com/elements/typography/overview/)

Use `body-02` for reading copy (16px / 24px), `body-compact-02` for short expressive copy (16px / 22px), and `label-02` for suitable supporting text (14px / 18px). Keep long paragraphs left-aligned. `fluid-heading-05` or `fluid-heading-06` suit prominent page headings, while `heading-03` and `heading-04` provide stable component headings. Fluid display/heading styles are intended for open page layouts, not constrained card interiors. [Type sets](https://carbondesignsystem.com/elements/typography/type-sets/)

Prefer type helpers over individually recreating size, line-height, weight, and spacing. The `type.type-style(...)` mixin accepts a second `true` argument to enable fluid behavior. For example, a page title can use `type.type-style('fluid-heading-05', true)`, while paragraphs can use `type.type-style('body-02')`. Verify the helper through the installed package's Sass entry points. [Typography code](https://carbondesignsystem.com/elements/typography/code/)

## Grid, spacing, and responsive layout

Carbon's 2x Grid uses an 8px mini unit, fluid divisions, fixed padding, and shared alignment lines. The standard breakpoint map is:

| Breakpoint | Width | Columns |
| --- | ---: | ---: |
| Small | 320px / 20rem | 4 |
| Medium | 672px / 42rem | 8 |
| Large | 1056px / 66rem | 16 |
| X-Large | 1312px / 82rem | 16 |
| Max | 1584px / 99rem | 16 |

Standard inner padding is 16px, giving a 32px full gutter between padded columns. Closely related content may use a gutterless treatment. Page margins and padding stay fixed within each breakpoint while columns scale. Fluid grids suit editorial content and images. For MMS, align hero copy, section headings, and tile contents to consistent grid lines; stack the major content blocks on small screens. Test both standard breakpoints and intermediate widths. [2x Grid](https://carbondesignsystem.com/elements/2x-grid/overview/)

Useful spacing tokens are `spacing-03` = 8px, `spacing-05` = 16px, `spacing-06` = 24px, `spacing-07` = 32px, `spacing-09` = 48px, `spacing-10` = 64px, `spacing-11` = 80px, and `spacing-12` = 96px. Tokens themselves are fixed; a layout may select different scale steps at breakpoints. Carbon's `Stack` supports consistent vertical or horizontal grouping. Recommendation: 64–96px between major desktop sections, smaller scale steps on mobile, and 16–32px within related groups. [Spacing](https://carbondesignsystem.com/elements/spacing/overview/)

## Navigation

The UI shell header supports site identity, persistent links, and optional side navigation. Header links move to a side menu at narrow widths. Use concise destination names. Dropdown labels act as controls, not simultaneous page links; dropdowns open on click and close on selection, outside click, or another click on their label. The hamburger is needed when there is collapsible navigation. Include a first-focusable skip link targeting main content. [UI shell header](https://carbondesignsystem.com/components/UI-shell-header/usage/)

For this site, use the MMS logo as identity and preserve the existing page inventory. Keep active-page indication, desktop navigation, and mobile navigation consistent. Close the mobile menu after navigation and retain a sensible keyboard focus sequence. These are implementation decisions drawn from the navigation and accessibility guidance.

## Buttons, links, and tiles

Use one principal high-emphasis action per screen; lower-priority actions should use tertiary or ghost emphasis. Carbon's secondary button is intended for a negative companion action such as cancellation. Button text is left-aligned, with a related icon on the right. Match sizes within a group, keep action labels specific, and put the principal action first on full-page left-aligned layouts. [Button usage](https://carbondesignsystem.com/components/button/usage/)

Navigation should retain link semantics. Carbon links support page changes, anchor jumps, email, and telephone destinations. Use meaningful labels, underlined inline links, and consistent destination icons: commonly ArrowRight for internal navigation and Launch for external destinations. A visual call to action that navigates must still expose a real link destination. [Link usage](https://carbondesignsystem.com/components/link/usage/)

Use `Tile` for a content group that may contain its own links, and `ClickableTile` when the entire surface is one navigation target. Clickable tiles must not contain nested links or buttons. An arrow at the bottom right signals navigation. This is particularly appropriate for product/service category entry points. Team profiles without a destination should remain content rather than pretend to be interactive. [Tile usage](https://carbondesignsystem.com/components/tile/usage/)

## Forms and disclosure

Use a real `form`, visible descriptive labels, declared requirements, and helper text for format instructions. Native field types and suitable Carbon `TextInput`/`TextArea` components support the basics. Validate on blur or submission, use specific inline errors, and use an inline notification for whole-form or server errors. Keep the action below the fields and label it for the actual result. Disable duplicate submission while processing and show progress when needed. [Forms pattern](https://carbondesignsystem.com/patterns/forms-pattern/)

MMS recommendation: collect only necessary inquiry details, preserve phone/email alternatives, and make submission feedback truthful about what actually happened. A front-end preview without a delivery integration must not announce that an inquiry was sent. This is a product implementation requirement, not a Carbon feature.

If existing reference content warrants an accordion, use it for optional, related detail. Avoid hiding essential information or content everyone is expected to read. Standard accordions allow independent expansion; titles should have a suitable heading level and consistent end-aligned chevrons. Avoid nested scrolling panels. Do not add FAQs merely to use this component. [Accordion usage](https://carbondesignsystem.com/components/accordion/usage/)

## Accessibility and motion

Carbon components follow IBM's accessibility checklist, based on WCAG AA and other standards, but a composed page still needs review. Readable language, sensible hierarchy, and meaningful image alternatives are part of the experience. [Accessibility overview](https://carbondesignsystem.com/guidelines/accessibility/overview/)

Check custom MMS colors against their actual backgrounds: normal text needs 4.5:1 contrast; large text and meaningful control boundaries need 3:1. Never use color as the only state indicator. Text over photography needs adequate contrast everywhere it appears. [Accessible color](https://carbondesignsystem.com/guidelines/accessibility/color/)

Use semantic landmarks, native links/buttons, descriptive link labels, and meaningful alt text. Decorative images should have empty alt text. Prefer SVG icons, retain focus indicators, and support keyboard equivalents for mouse interactions. [Developer accessibility](https://carbondesignsystem.com/guidelines/accessibility/developers/)

The tab sequence should follow the meaningful document order, with a visible focus state. All interactive features must work by keyboard. Use landmarks so assistive technology can jump between page regions. [Keyboard accessibility](https://carbondesignsystem.com/guidelines/accessibility/keyboard/)

Carbon includes microinteraction motion. Productive movement is subtle and quick; expressive motion is reserved for occasional important moments. Avoid bounce or purely decorative movement. The productive standard curve is `cubic-bezier(0.2, 0, 0.38, 0.9)`, with 70/110ms fast tokens and 150/240ms moderate tokens. Recommendation: retain component feedback, use modest hover transitions, and honor reduced-motion preferences with static alternatives. [Motion](https://carbondesignsystem.com/elements/motion/overview/)

## Practical verification for this build

Before delivery, verify every preserved page and destination, desktop/mobile navigation, keyboard focus, contact form behavior, image sizing, and visible text at narrow widths. Check the rendered brand states and typography rather than assuming a successful compile guarantees a correct design. Load only the image assets used by the rebuilt site, preserve their aspect ratios, and keep responsive image dimensions stable. These checks are specific implementation recommendations for the MMS rebuild.
