import { SliceZone } from "@prismicio/react";
import AnimatedHero from "@/components/AnimatedHero";
import { createClient, hasPrismicRepository } from "@/prismicio";
import { components } from "@/slices";

export const revalidate = 60;

const featuredWork = [
  {
    title: "Residential identity",
    meta: "Brand system / Web / Launch",
    tone: "Editorial"
  },
  {
    title: "Wellness retreat",
    meta: "Content model / Motion / Netlify",
    tone: "Immersive"
  },
  {
    title: "Founder studio",
    meta: "Prismic slices / Next.js / GSAP",
    tone: "Personal"
  }
];

async function getPrismicHome() {
  if (!hasPrismicRepository) {
    return null;
  }

  try {
    const client = createClient();
    return await client.getSingle("home");
  } catch {
    return null;
  }
}

export default async function Home() {
  const page = await getPrismicHome();

  if (page?.data?.slices?.length) {
    return (
      <main>
        <SliceZone slices={page.data.slices} components={components} />
      </main>
    );
  }

  return (
    <main>
      <AnimatedHero
        eyebrow="Next / GSAP / Prismic / Netlify"
        heading="Crystal Living"
        body="A refined starter for a personal brand, studio, or editorial portfolio with content managed in Prismic and deploys wired for Netlify."
      />

      <section id="work" className="px-5 pb-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl border-t border-black/10 pt-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.28em] text-lavender">
                Selected work
              </p>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
                Designed to become a CMS-led portfolio quickly.
              </h2>
            </div>
            <div className="grid gap-4">
              {featuredWork.map((item) => (
                <article
                  key={item.title}
                  className="grid gap-4 border-b border-black/10 py-6 sm:grid-cols-[1fr_auto] sm:items-end"
                >
                  <div>
                    <p className="font-serif text-2xl font-semibold">{item.title}</p>
                    <p className="mt-2 text-black/58">{item.meta}</p>
                  </div>
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-black/45">
                    {item.tone}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="studio" className="bg-black px-5 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
          <h2 className="text-4xl font-semibold leading-tight sm:text-6xl">
            Replace the starter copy with Prismic slices when your repository is connected.
          </h2>
          <div className="space-y-5 text-lg leading-8 text-white/70">
            <p>
              This scaffold includes a Home singleton, repeatable pages, shared slices,
              preview routing, webhook revalidation, and Netlify build settings.
            </p>
            <p>
              Use the README steps to push this folder to GitHub, import it in Netlify,
              and connect Slice Machine to Prismic.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
