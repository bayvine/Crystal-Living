import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient, hasPrismicRepository } from "@/prismicio";
import { components } from "@/slices";

type PageProps = {
  params: Promise<{
    uid: string;
  }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  if (!hasPrismicRepository) {
    return [];
  }

  try {
    const client = createClient();
    const pages = await client.getAllByType("page");

    return pages.map((page) => ({
      uid: page.uid
    }));
  } catch {
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  if (!hasPrismicRepository) {
    notFound();
  }

  const { uid } = await params;
  let page;

  try {
    const client = createClient();
    page = await client.getByUID("page", uid);
  } catch {
    notFound();
  }

  return (
    <main>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}
