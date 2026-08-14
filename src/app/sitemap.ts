import type { MetadataRoute } from "next";
import { getAllMovieSlugs } from "@/data/movies";
import { getBaseUrl } from "@/lib/env";

const baseUrl = getBaseUrl() || "https://www.cineplaza.demo.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", changeFrequency: "daily" as const, priority: 1 },
    { path: "/programacao", changeFrequency: "daily" as const, priority: 0.95 },
    { path: "/filmes", changeFrequency: "daily" as const, priority: 0.9 },
    ...getAllMovieSlugs().map((slug) => ({
      path: `/filmes/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { path: "/cardapio", changeFrequency: "weekly" as const, priority: 0.75 },
    { path: "/o-cineplaza", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/cookies", changeFrequency: "monthly" as const, priority: 0.4 },
    {
      path: "/politica-de-privacidade",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    { path: "/termos-de-uso", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl.replace(/\/$/, "")}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
