import type { MetadataRoute } from "next";

const BASE = "https://joachimdemuth.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE}/projects`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/music`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/photos`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
