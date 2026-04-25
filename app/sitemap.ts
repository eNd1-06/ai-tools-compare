import type { MetadataRoute } from "next";
import { tools, categories } from "@/data/tools";
import { vsPairs, getVsSlug } from "@/data/vs-pairs";

const BASE_URL = "https://ai-tools-compare-ten.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/vs`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/articles`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/ranking`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/recommend`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/compare/${cat.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const vsPages: MetadataRoute.Sitemap = vsPairs.map((pair) => ({
    url: `${BASE_URL}/vs/${getVsSlug(pair.slugA, pair.slugB)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...toolPages, ...categoryPages, ...vsPages];
}
