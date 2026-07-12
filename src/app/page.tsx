import { SliceZone } from "@prismicio/react";
import AnimatedHero from "@/components/AnimatedHero";
import ScrollStory from "@/components/ScrollStory";
import { createClient, hasPrismicRepository } from "@/prismicio";
import { components } from "@/slices";

export const revalidate = 60;

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
      <AnimatedHero />
      <ScrollStory />

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
