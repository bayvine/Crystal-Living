import { PrismicRichText } from "@prismicio/react";
import type { RichTextField } from "@prismicio/client";
import { keyText, richTextAsText, type SliceLike } from "@/lib/prismicFields";

type TextBlockProps = {
  slice: SliceLike;
};

export default function TextBlock({ slice }: TextBlockProps) {
  const primary = slice.primary || {};
  const body = Array.isArray(primary.body) && primary.body.length ? primary.body : null;

  return (
    <section className="bg-black px-5 py-20 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <p className="font-sans text-xs uppercase tracking-[0.28em] text-white/45">
          {keyText(primary.eyebrow, "Studio note")}
        </p>
        <div className="max-w-4xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">
          {body ? (
            <PrismicRichText field={body as RichTextField} />
          ) : (
            <p>{richTextAsText(primary.body, "A flexible dark editorial section for positioning, manifesto copy, or service framing.")}</p>
          )}
        </div>
      </div>
    </section>
  );
}
