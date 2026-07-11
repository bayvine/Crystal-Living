import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { imageField, keyText, linkField, richTextAsText, type SliceLike } from "@/lib/prismicFields";

type HeroSliceProps = {
  slice: SliceLike;
};

export default function Hero({ slice }: HeroSliceProps) {
  const primary = slice.primary || {};
  const heading = richTextAsText(primary.heading, "Crystal Living");
  const eyebrow = keyText(primary.eyebrow, "Studio edit");
  const subheading = richTextAsText(
    primary.subheading,
    "A motion-forward editorial system for a personal brand, studio, or creative practice."
  );
  const ctaLabel = keyText(primary.cta_label, "View work");
  const ctaLink = linkField(primary.cta_link);
  const image = imageField(primary.image);

  return (
    <section className="grid min-h-screen gap-12 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-10">
      <div className="flex max-w-5xl flex-col justify-center">
        <p className="font-sans text-xs uppercase tracking-[0.32em] text-lavender">
          {eyebrow}
        </p>
        <h1 className="mt-5 text-balance text-[clamp(4rem,13vw,11rem)] font-semibold leading-[0.84]">
          {heading}
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-8 text-black/65">{subheading}</p>
        {ctaLink ? (
          <PrismicNextLink
            field={ctaLink}
            className="mt-8 inline-flex h-12 w-fit items-center rounded-full bg-black px-6 text-sm font-semibold text-white"
          >
            {ctaLabel}
          </PrismicNextLink>
        ) : null}
      </div>

      <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-highlight-lavender">
        {image?.url ? (
          <PrismicNextImage field={image} fill className="object-cover" />
        ) : (
          <div className="absolute inset-8 rounded-[45%] bg-[linear-gradient(145deg,var(--color-lavender),var(--color-highlight-lavender)_48%,var(--color-cream))]" />
        )}
      </div>
    </section>
  );
}
