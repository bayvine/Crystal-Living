import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import smConfig from "../slicemachine.config.json";

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME || smConfig.repositoryName;

export const hasPrismicRepository =
  Boolean(repositoryName) && repositoryName !== "your-prismic-repo";

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
