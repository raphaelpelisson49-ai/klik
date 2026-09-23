import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { LOCALES } from "@/i18n/locales";

const PATHS = ["", "/calculadora", "/aviso-legal", "/privacidad", "/cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PATHS) {
    const languages = Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
    );

    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/calculadora" ? 0.9 : 0.5,
        alternates: { languages },
      });
    }
  }

  return entries;
}
