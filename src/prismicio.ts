import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import prismicConfig from "../prismic.config.json";

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME || prismicConfig.repositoryName;

export const hasPrismicRepository = Boolean(repositoryName);

export const routes: prismic.ClientConfig["routes"] = [
  {
    type: "home",
    path: "/"
  },
  {
    type: "page",
    path: "/:uid"
  }
];

type CreateClientConfig = prismicNext.CreateClientConfig & {
  fetchOptions?: RequestInit;
};

export function createClient(config: CreateClientConfig = {}) {
  const client = prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] } }
        : { next: { revalidate: 5 } },
    ...config
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
}
