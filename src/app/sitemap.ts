import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site";

// Static export has no server to generate this per-request.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.6 },
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
