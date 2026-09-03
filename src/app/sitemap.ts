import type { MetadataRoute } from "next";
import { articulos } from "@/lib/articles";

const BASE = "https://biblioteca.perpetuo.global";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    ...articulos.map((a) => ({
      url: `${BASE}/articulo/${a.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
