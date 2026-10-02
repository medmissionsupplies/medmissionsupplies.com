import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { validateApprovedComments } from "../src/comments.mjs";

// Run only after a staff member has reviewed the submission and its consent.
export async function publishComment(input, destination) {
  const review = JSON.parse(await readFile(input, "utf8"));
  if (review.approved !== true || review.publication_consent !== true)
    throw new Error(
      "Staff approval and visitor publication consent are both required.",
    );
  validateApprovedComments([review.comment]);
  const existing = validateApprovedComments(
    JSON.parse(await readFile(destination, "utf8")),
  );
  if (existing.some((comment) => comment.id === review.comment.id))
    throw new Error(
      "Comment ID already published; review an edit directly in approved-comments.json.",
    );
  await writeFile(
    destination,
    JSON.stringify(
      validateApprovedComments([...existing, review.comment]),
      null,
      2,
    ) + "\n",
  );
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const input = process.argv[process.argv.indexOf("--input") + 1];
  if (!process.argv.includes("--input") || !input)
    throw new Error(
      "Usage: npm run comments:publish -- --input path/to/reviewed-comment.json",
    );
  await publishComment(
    input,
    new URL("../src/approved-comments.json", import.meta.url),
  );
  console.log(
    "Approved comment added. Run tests and build, review the diff, then publish the site when authorized.",
  );
}
