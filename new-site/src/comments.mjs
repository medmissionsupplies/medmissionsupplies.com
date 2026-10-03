import { equipment } from "./catalog.mjs";

export function validateComment({ listing, name, email, message, consent }) {
  const errors = {};
  if (!equipment.some((item) => item.id === listing))
    errors.listing = "Choose a valid equipment listing.";
  if (!name?.trim() || name.trim().length > 80)
    errors.name = "Enter a display name (up to 80 characters).";
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address.";
  if (!message?.trim() || message.trim().length > 2000)
    errors.message = "Enter a comment (up to 2,000 characters).";
  if (consent !== "yes") errors.consent = "Agree to publication after review.";
  return errors;
}

export function commentFormData(values) {
  const errors = validateComment(values);
  if (Object.keys(errors).length) throw new Error(Object.values(errors)[0]);
  const item = equipment.find((item) => item.id === values.listing);
  const data = new FormData();
  data.set("name", values.name.trim());
  data.set("email", values.email.trim());
  data.set("message", values.message.trim());
  data.set("_subject", `Listing comment for review: ${item.title}`);
  data.set("submission_type", "listing_comment");
  data.set("listing_id", item.id);
  data.set(
    "listing_url",
    `https://medmissionsupplies.com/equipment/${item.id}.html`,
  );
  data.set("publication_consent", "yes");
  return data;
}

// Strict allowlist: private submission fields must never enter the public bundle.
export function validateApprovedComments(comments) {
  if (!Array.isArray(comments))
    throw new Error("Approved comments must be an array.");
  const ids = new Set();
  const allowed = ["id", "listing", "name", "message", "date", "reply"];
  for (const item of comments) {
    if (Object.keys(item).some((key) => !allowed.includes(key)))
      throw new Error("Unapproved or private comment fields.");
    if (
      typeof item.id !== "string" ||
      !/^[a-zA-Z0-9-]{1,100}$/.test(item.id) ||
      ids.has(item.id)
    )
      throw new Error("Invalid or duplicate comment ID.");
    ids.add(item.id);
    if (!equipment.some((listing) => listing.id === item.listing))
      throw new Error("Unknown comment listing.");
    for (const [field, max] of [
      ["name", 80],
      ["message", 2000],
    ])
      if (
        typeof item[field] !== "string" ||
        !item[field].trim() ||
        item[field].length > max
      )
        throw new Error(`Invalid comment ${field}.`);
    if (
      typeof item.date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(item.date) ||
      !Number.isFinite(Date.parse(item.date)) ||
      new Date(item.date).toISOString().slice(0, 10) !== item.date
    )
      throw new Error("Invalid comment date.");
    if (
      item.reply !== undefined &&
      (typeof item.reply !== "string" || item.reply.length > 4000)
    )
      throw new Error("Invalid comment reply.");
  }
  return comments;
}
