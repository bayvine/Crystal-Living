import { SliceZone } from "@prismicio/react";
import AboutRachel from "@/components/AboutRachel";
import AnimatedHero from "@/components/AnimatedHero";
import ApproachJourney from "@/components/ApproachJourney";
import BuyerGuide from "@/components/BuyerGuide";
import ContactCTA from "@/components/ContactCTA";
import FAQSection from "@/components/FAQSection";
import ResultsPop from "@/components/ResultsPop";
import ClientStories from "@/components/ClientStories";
import ScrollStory from "@/components/ScrollStory";
import SiteFooter from "@/components/SiteFooter";
import TrustedProfile from "@/components/TrustedProfile";
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
      <main className="w-full overflow-x-clip bg-white [--site-width:100vw]">
        <SliceZone slices={page.data.slices} components={components} />
      </main>
    );
  }

  return (
    <main className="w-full overflow-x-clip bg-white [--site-width:100vw]">
      <AnimatedHero />
      <ScrollStory />
      <AboutRachel />
      <ApproachJourney />
      <ResultsPop />
      <ClientStories />
      <TrustedProfile />
      <BuyerGuide />
      <FAQSection />
      <ContactCTA />
      <SiteFooter />
    </main>
  );
}
