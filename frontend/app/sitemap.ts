import type { MetadataRoute } from "next";
import { services } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://antenapro.hr";
  const staticRoutes = ["", "/o-nama", "/projekti", "/kontakt", "/politika-privatnosti", "/pravila-o-kolacicima"];
  return [
    ...staticRoutes.map((route, index) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: index === 0 ? "weekly" as const : "monthly" as const, priority: index === 0 ? 1 : route === "/kontakt" ? .9 : .7 })),
    ...services.map((service) => ({ url: `${base}/usluge/${service.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .85 })),
  ];
}
