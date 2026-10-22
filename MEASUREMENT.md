# First-party website totals — October 22, 2026

Public pages load `/__metrics/v1/client.js` from the same origin. A separate private collector on the existing VPS accepts fixed daily aggregate events; nginx serves the script and write-only endpoint outside application releases. Source and deployment instructions are maintained in `medmissionsupplies/medmissionsupplies.com`, `deploy/first-party-metrics/`. Do not remove those scoped nginx includes during application deployments.

The report contains daily public-page/article views, article-link clicks, source buckets and useful-outcome stages. It contains no answers, trait scores, contacts, user IDs, query strings or individual histories. Privacy signals disable optional counting. Page views and browser-tab visits are not unique humans, clicks are not revenue, and App Store clicks are not installs. Existing campaign counters and cumulative Bible legacy article opens remain separate series.

Use `?traffic_test=1` once in every staff/test browser on each host. An on-page badge confirms the browser-local flag; new events use the separate test bucket. Use `?traffic_test=0` to clear it. Do not reset historical counters. Newly created or imported data must not be described as historical visitor traffic. Pairbond and account-deletion workflows are excluded. Only the two authorized assessment frontends may be redeployed.

The dashboard is private and refreshed on demand over existing SSH. No monitoring automation, advertising pixel, external analytics subscription or public report endpoint is introduced.
