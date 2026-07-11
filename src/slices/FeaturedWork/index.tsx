import { keyText, richTextAsText, type SliceLike } from "@/lib/prismicFields";

type FeaturedWorkProps = {
  slice: SliceLike;
};

const fallbackItems = [
  {
    title: "Residential identity",
    meta: "Brand system / Web / Launch"
  },
  {
    title: "Wellness retreat",
    meta: "Content model / Motion / Netlify"
  }
];

export default function FeaturedWork({ slice }: FeaturedWorkProps) {
  const primary = slice.primary || {};
  const items = slice.items?.length ? slice.items : fallbackItems;

  return (
    <section className="px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl border-t border-black/10 pt-10">
        <p className="font-sans text-xs uppercase tracking-[0.28em] text-lavender">
          {keyText(primary.eyebrow, "Selected work")}
        </p>
        <div className="mt-5 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
            {richTextAsText(primary.heading, "Recent projects with room for story and motion.")}
          </h2>
          <div className="grid gap-4">
            {items.map((item, index) => (
              <article
                key={`${keyText(item.title, "Project")}-${index}`}
                className="border-b border-black/10 py-6"
              >
                <p className="font-serif text-2xl font-semibold">{keyText(item.title, "Project title")}</p>
                <p className="mt-2 text-black/58">{keyText(item.meta, "Discipline / Scope")}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
