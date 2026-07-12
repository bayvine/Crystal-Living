import { SliceZone } from "@prismicio/react";
import AboutRachel from "@/components/AboutRachel";
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
      <AboutRachel />
    </main>
  );
}
