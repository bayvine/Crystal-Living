import { asText, type ImageField, type LinkField, type RichTextField } from "@prismicio/client";

export type SliceLike = {
  primary?: Record<string, unknown>;
  items?: Array<Record<string, unknown>>;
};

export function richTextAsText(field: unknown, fallback = "") {
  if (!Array.isArray(field)) {
    return fallback;
  }

  return asText(field as RichTextField) || fallback;
}

export function keyText(field: unknown, fallback = "") {
  return typeof field === "string" && field.trim().length > 0 ? field : fallback;
}

export function imageField(field: unknown) {
  if (field && typeof field === "object" && "url" in field) {
    return field as ImageField;
  }

  return null;
}

export function linkField(field: unknown) {
  if (field && typeof field === "object") {
    return field as LinkField;
  }

  return null;
}
