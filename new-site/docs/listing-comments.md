# Moderated listing comments

The website remains a static site. Each equipment page has a comment form using the existing MMS Formspree endpoint. Pending submissions are held by that service, not in a visitor's browser. Nothing is published automatically. No backend, browser-storage substitute, or fabricated comments have been added.

## Review a submission

In the existing Formspree dashboard/inbox, look for `submission_type=listing_comment` and the subject `Listing comment for review: …`. The submission includes `listing_id`, visitor name, email, message, and publication consent. JavaScript submissions include `publication_consent=yes`; native submissions include the required `consent=yes` checkbox.

The website says “received for review” only after the form service accepts the request. A failed or timed-out request keeps the visitor's input and offers retry. Service-side spam filtering, delivery, and submission limits continue to depend on the existing Formspree account. Client validation is for usability; staff must independently review all fields and consent because requests can be forged.

Review the text, display name, relevance, and consent. Omit private details, patient information, email addresses, order information, and spam. Contact the visitor privately if changes require their approval. Do not publish pending submissions or copy a full Formspree export into this repository.

## Publish an approved comment

Create a temporary JSON file outside the repository after review, using this shape (example data only):

```json
{
  "approved": true,
  "publication_consent": true,
  "comment": {
    "id": "unique-comment-id",
    "listing": "ultrasound",
    "name": "Approved display name",
    "message": "Approved public text",
    "date": "2026-10-02",
    "reply": "Optional public reply from MMS."
  }
}
```

Then run:

```sh
npm run comments:publish -- --input /path/to/reviewed-comment.json
npm test
npm run build
```

The importer updates `src/approved-comments.json`. It requires staff approval and consent, rejects unknown/private fields and duplicate IDs, and validates the listing. Names and messages render as escaped plain text. Only this approved public data is bundled with the site. The build validates it again.

Review the diff and publish through the existing website release process when authorized. A comment becomes visible after that site release, not immediately after import. The current GitHub workflow deploys pushes to `main`; use a feature branch for review. Editing or removing a published comment similarly requires updating the public JSON and releasing the site.

This is a manual staff moderation workflow, not a real-time discussion service or a moderation dashboard. A staffed review process is needed before enabling it on the production site. Visitors seeking a quote or urgent service are directed to the private contact form.

## Testing

Unit tests cover consent, listing context, private-field rejection, dates, duplicate IDs, and durable approved publication. Browser checks intercept Formspree requests before transmission and simulate rejection and acceptance. No live comments or contact messages are sent by these tests.
