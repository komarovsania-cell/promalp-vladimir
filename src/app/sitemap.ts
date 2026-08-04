import type { MetadataRoute } from "next";
import { featuredServices } from "@/data/featured";

const BASE_URL = "https://xn--80adsjkdjohk.xn--p1ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes: MetadataRoute.Sitemap = featuredServices.map((s) => ({
    url: `${BASE_URL}/uslugi/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...serviceRoutes,
  ];
}
