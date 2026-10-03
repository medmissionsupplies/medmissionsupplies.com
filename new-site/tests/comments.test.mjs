import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { join, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import {
  commentFormData,
  validateComment,
  validateApprovedComments,
} from "../src/comments.mjs";
import { publishComment } from "../scripts/publish-comment.mjs";
const submission = {
  listing: "ultrasound",
  name: " Example visitor ",
  email: "visitor@example.test",
  message: " Are compatible probes available? ",
  consent: "yes",
};
const comment = {
  id: "test-comment-1",
  listing: "ultrasound",
  name: "Example visitor",
  message: "Are compatible probes available?",
  date: "2026-10-02",
};

test("comments route to the real form service with listing context and explicit consent", () => {
  const data = commentFormData(submission);
  assert.equal(data.get("listing_id"), "ultrasound");
  assert.equal(data.get("publication_consent"), "yes");
  assert.equal(data.get("submission_type"), "listing_comment");
  assert.equal(data.get("name"), "Example visitor");
  assert.equal(data.get("message"), comment.message);
});
test("invalid submissions cannot be prepared for delivery", () => {
  for (const change of [
    { listing: "missing" },
    { name: "  " },
    { email: "invalid" },
    { message: " " },
    { message: "x".repeat(2001) },
    { consent: "" },
  ]) {
    assert.ok(
      Object.keys(validateComment({ ...submission, ...change })).length,
    );
    assert.throws(() => commentFormData({ ...submission, ...change }));
  }
});
test("publication rejects private fields, invalid dates, unknown listings, and duplicates", () => {
  assert.deepEqual(validateApprovedComments([comment]), [comment]);
  for (const change of [
    { email: "private@example.test" },
    { status: "pending" },
    { listing: "wrong" },
    { date: "2026-02-30" },
    { id: "<script>" },
    { id: undefined },
  ])
    assert.throws(() => validateApprovedComments([{ ...comment, ...change }]));
  assert.throws(() => validateApprovedComments([comment, comment]));
});
test("staff approval publishes durable public data and refuses missing consent or repeated imports", async () => {
  const dir = await mkdtemp(join(tmpdir(), "mms-comment-test-"));
  const input = join(dir, "review.json"),
    destination = join(dir, "approved.json");
  try {
    await writeFile(destination, "[]");
    await writeFile(
      input,
      JSON.stringify({ approved: true, publication_consent: false, comment }),
    );
    await assert.rejects(publishComment(input, destination));
    assert.equal(await readFile(destination, "utf8"), "[]");
    await writeFile(
      input,
      JSON.stringify({ approved: true, publication_consent: true, comment }),
    );
    await publishComment(input, destination);
    assert.deepEqual(JSON.parse(await readFile(destination, "utf8")), [
      comment,
    ]);
    await assert.rejects(publishComment(input, destination));
  } finally {
    if (
      !resolve(dir).startsWith(resolve(tmpdir()) + sep) ||
      !dir.includes("mms-comment-test-")
    )
      throw new Error("Unsafe test cleanup path");
    await rm(dir, { recursive: true });
  }
});
